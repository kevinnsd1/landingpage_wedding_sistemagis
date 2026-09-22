# KisahMagis — Security Documentation

> **Status:** Draft v1.0
> **Product:** KisahMagis
> **Parent Brand:** Sistemagis
> **Document Type:** Security & Hardening Guide for Development
> **Companion to:** `PRD_KisahMagis.md`

---

## 1. Purpose & Scope

This document expands the PRD's high-level "Security Requirements" (§20) into concrete, implementable rules for building and operating KisahMagis: a multi-tenant wedding SaaS where each wedding is a tenant, invitations are public, guest data is personal, and the app runs on a single home server behind Cloudflare Tunnel.

It covers:

- Authentication & session management
- Authorization & multi-tenancy isolation
- Guest personalization tokens
- Input validation & API hardening
- File upload & media storage
- Database security
- Subdomain / host-header handling
- Transport & infrastructure security
- Secrets management
- Logging, monitoring & incident response
- Data privacy (guest PII, Indonesian context)
- A phase-by-phase security checklist mapped to the MVP roadmap

This is a living document. Update it whenever a new module, endpoint type, or data category is introduced.

---

## 2. Threat Model Summary

### 2.1 Trust boundaries

```text
Internet (untrusted)
   │
   ▼
Cloudflare (edge, TLS termination, DDoS mitigation)
   │
Cloudflare Tunnel (authenticated outbound connection — no open inbound port)
   │
   ▼
Home server (semi-trusted perimeter)
   │
   ├── React Router Framework (SSR) — renders public + private UI
   ├── Hono API — all business logic, all authorization decisions
   ├── PostgreSQL — source of truth
   └── Local HDD — media storage
```

Everything left of "Hono API" must be treated as untrusted input. SSR output and API responses are the only trusted things flowing back out.

### 2.2 Actors and what they should and shouldn't reach

| Actor | Can access | Must NOT access |
|---|---|---|
| Anonymous visitor | Published public invitations, RSVP/guestbook submission on those invitations | Any dashboard data, any unpublished wedding, any other wedding's private data |
| Wedding guest (has token) | The one invitation their token belongs to, personalized greeting, their own RSVP record | Other guests' records, guest list, planner/budget/vendor data |
| Wedding owner (couple) | Their own wedding(s) end-to-end (invitation, guests, planner, budget, vendor, media) | Other users' weddings, other users' guest/RSVP/budget data |
| Future collaborators (WO, family) | Only what's explicitly shared, scoped by role | Anything outside their granted scope |
| Platform admin (future) | Support/moderation tooling, audit logs | Direct DB access without audit trail |

### 2.3 Primary risks specific to this product

1. **Horizontal privilege escalation (IDOR)** — every resource is scoped under `wedding_id`; the biggest realistic risk is User A reading/editing User B's wedding by changing an ID in the URL or payload.
2. **Guest token guessing / enumeration** — guest personalization (`?to=<token>`) must not let one guest see another guest's data or let an outsider harvest guest lists.
3. **Subdomain/host-header abuse** — wedding identity is resolved from the `Host` header; this is attacker-controlled input.
4. **Unmoderated public write endpoints** — RSVP and guestbook are public-facing POST endpoints with no login, making them a target for spam/abuse/injection.
5. **Malicious media uploads** — photos and music are user-uploaded and served back to the public; this is the classic upload → stored XSS / path traversal / resource exhaustion vector.
6. **Single small home server** — no WAF, limited compute for rate limiting or scanning, so cheap application-layer controls matter more than they would behind a large cloud stack.
7. **PII at rest** — guest name, phone, email; couple's personal wedding data; budget figures. This is a small system but it does hold real personal data about real people who never signed up for an account.

---

## 3. Authentication

### 3.1 Password handling

- Hash with **Argon2id** (preferred) or **bcrypt** (cost factor ≥ 12) — never MD5/SHA1/plain SHA256.
- Never log raw passwords, even at debug level. Never include `password_hash` in any API response, ever — enforce this with a Zod response schema, not just "remember not to."
- Enforce a minimum password policy (length ≥ 8, reject top-10k common passwords via a static list) rather than complex composition rules.
- Password reset tokens: single-use, short-lived (≤ 30 min), stored hashed (same pattern as guest tokens, §5), invalidate all other reset tokens for that user once one is used.

### 3.2 Sessions / tokens

Pick one pattern and apply it consistently across the whole API — don't mix:

| Option | Notes |
|---|---|
| **JWT (stateless)** | Short-lived access token (15 min) + rotating refresh token stored `httpOnly`, `Secure`, `SameSite=Lax`. Refresh tokens stored hashed in DB so they can be revoked. |
| **Server session (stateful)** | Opaque session ID in an `httpOnly`, `Secure` cookie; session data in PostgreSQL or Redis (only if Redis is introduced). Easiest to revoke instantly — good fit for a small MVP. |

Given the PRD's "start simple" principle and no Redis in the MVP, **a stateful session in PostgreSQL, cookie-based, is the recommended default** — it avoids refresh-token rotation complexity and revocation is a single `DELETE`.

Rules either way:

- Auth cookies: `httpOnly`, `Secure`, `SameSite=Lax` (or `Strict` if the app never needs cross-site POSTs).
- No tokens in URLs, no tokens in `localStorage`/`sessionStorage` for the dashboard session (XSS would trivially steal them).
- Logout must actually invalidate server-side state, not just clear the client cookie.
- Re-authenticate (or require current password) before: changing email, changing password, deleting a wedding, exporting guest data.

### 3.3 Brute force & credential stuffing

- Rate-limit `/api/auth/login` and `/api/auth/register` per IP and per account (e.g. 5 attempts / 5 min, exponential backoff after that).
- Generic error message ("email or password is incorrect") — never reveal whether the email exists.
- Add a CAPTCHA or proof-of-work challenge on register/login if abuse is observed; don't over-engineer this before it's a real problem.

---

## 4. Authorization & Multi-Tenancy Isolation

This is the single most important section for this product, because almost every private resource in KisahMagis is scoped by `wedding_id`, and almost every bug class in a wedding-planner-style app is an IDOR.

### 4.1 Ownership model

```text
User (owner_id)
   └── Wedding (owner_id)
         ├── Invitation
         ├── Guests
         │     └── RSVP
         ├── Guestbook messages
         ├── Planner (boards → columns → tasks)
         ├── Budget items
         ├── Vendors
         └── Media (gallery, music)
```

Every one of these child tables carries `wedding_id`. Every query against them must be scoped by it.

### 4.2 The rule

> **No handler may trust a `wedding_id`, `guest_id`, `task_id`, etc. taken from the URL or request body without first proving the authenticated user owns (or is otherwise authorized for) the parent `wedding_id`.**

Implement this once, centrally — not per-handler:

```text
requireAuth() middleware
   → attaches req.user

requireWeddingOwnership(param: "weddingId") middleware
   → loads wedding by :weddingId
   → 404 if not found (not 403 — don't confirm existence to non-owners)
   → 403 if wedding.owner_id !== req.user.id (and not a granted collaborator)
   → attaches req.wedding for downstream handlers to reuse
```

For nested resources (`/api/guests/:id`, `/api/planner/tasks/:id`), don't authorize by looking at the child row's `wedding_id` in isolation — join through to the wedding and re-run the same ownership check. A guest row's `wedding_id` is itself untrusted until you've confirmed it matches a wedding the user owns.

### 4.3 Concretely, for every new endpoint, ask:

1. Does this touch a `wedding_id`-scoped table? → apply `requireWeddingOwnership`.
2. Does the query filter `WHERE wedding_id = :weddingId AND id = :resourceId`, or does it filter by `id` alone and trust the wedding scoping happened earlier? Prefer **always filtering by both** — defense in depth against a missed middleware call.
3. Is this a list endpoint? Confirm it filters by the authenticated user's own wedding(s), never `SELECT * FROM guests` without a `wedding_id` clause.
4. Is this a public endpoint (invitation, RSVP, guestbook submit)? It should only ever read/write through the **wedding's public status** (`status = 'published'`), never expose draft/unpublished weddings.

### 4.4 Future collaborators / roles (post-MVP)

When multi-user access to one wedding is introduced (e.g. wedding organizer access), add a `wedding_members` table (`wedding_id`, `user_id`, `role`) and update `requireWeddingOwnership` to `requireWeddingAccess(minRole)`. Don't bolt this on ad hoc later — design the ownership check as "authorize against this wedding" from day one so swapping the underlying rule is a one-place change.

---

## 5. Guest Personalization Tokens

The PRD already specifies the right direction (§6.4, §20): tokens must not expose sequential IDs. This section makes it concrete.

### 5.1 Token generation

- Generate with a CSPRNG (e.g. `crypto.randomBytes(24)` base62/base64url-encoded), **not** `Math.random()`, not a UUID derived from predictable input.
- Minimum 128 bits of entropy.
- One token per guest, not shared across guests in the same group.

### 5.2 Token storage

- Store `token_hash` (e.g. SHA-256 or HMAC with a server secret), not the raw token — matches the schema in the PRD (`guests.token_hash`).
- Look up guests by hashing the incoming token and comparing against `token_hash`, so a database read alone never leaks usable tokens.

### 5.3 Token usage

- `GET /api/public/invitations/:slug?to=<token>` (or equivalent) must:
  - Rate-limit by IP to blunt brute-force guessing.
  - Return the same generic response whether the token is invalid or simply missing — don't distinguish "guest not found" from "wedding not found."
  - Only ever resolve a guest **within the wedding identified by the subdomain/slug** — never look up a token globally across all weddings.
- Never include other guests' data in a personalized response — the response for one token must only ever contain that one guest's name/status.
- Guest list, RSVP list, and guestbook moderation are dashboard-only (owner-authenticated) — never exposed via the public token flow.

### 5.4 RSVP submission

- RSVP write endpoint is authorized by the guest token, not by login — but must still validate the token resolves to a guest under the target wedding before writing.
- Rate-limit RSVP submissions per token/IP to prevent one token being used to spam the guestbook or flip RSVP status repeatedly.
- Validate `attendance` is one of the enum values server-side (never trust client enums), `guest_count` is a small positive integer with a sane upper bound (e.g. ≤ 20).

---

## 6. Input Validation & API Hardening

### 6.1 Validation

- Every request body, query param, and route param gets a Zod schema — the PRD already selects Zod; use it as the single source of truth for both validation and (via `z.infer`) types, so the validated shape and the TypeScript type can't drift apart.
- Validate at the API boundary, not just in the UI. The dashboard form validation is a UX nicety; the Zod schema on the Hono handler is the actual security control.
- Reject unknown fields (`.strict()`) on write endpoints rather than silently ignoring them — prevents mass-assignment-style surprises (e.g. a guest submitting `{ ...rsvp, wedding_id: "someone-elses-id" }`).

### 6.2 Output shaping

- Never spread a Drizzle row directly into an API response. Define an explicit response shape (or a Zod schema used both ways) so fields like `password_hash`, `token_hash`, internal flags, or another user's data never leak by accident when a table gains a column later.

### 6.3 Injection

- Drizzle's query builder parameterizes by default — use it as intended; avoid raw SQL string concatenation. Where raw SQL is genuinely needed, use tagged parameterized queries only, never string interpolation of user input.
- JSONB `config` fields (invitation theme config) still need schema validation on write (Zod) even though the column itself is schemaless — an unvalidated JSONB blob is an easy place to smuggle unexpected structure or oversized payloads.

### 6.4 Rate limiting

Apply per-route, not globally — public write endpoints need it most:

| Endpoint class | Suggested limit |
|---|---|
| `/api/auth/login`, `/api/auth/register` | 5 / 5 min / IP |
| `/api/rsvp` (public) | 10 / hour / token, 30 / hour / IP |
| `/api/guestbook` (public write) | Similar to RSVP |
| `/api/upload` | 20 / hour / user |
| Authenticated dashboard reads | Generous, but not unlimited (protects against scripted scraping) |

Without Redis in the MVP, an in-memory token-bucket per process is an acceptable starting point on a single-server deployment — document that it resets on process restart and doesn't share state across multiple Hono instances if that ever changes.

### 6.5 CORS

- The dashboard (`app.kisahmagis.id`) and API should ideally share an origin (API mounted under `/api` behind the same host) to avoid needing permissive CORS at all.
- If the API is served from a separate origin, set an explicit `Access-Control-Allow-Origin` allowlist (`app.kisahmagis.id`, and each `*.kisahmagis.id` invitation subdomain for public GET endpoints only) — never `*` alongside credentialed requests.

### 6.6 Security headers

Set on every response (Hono middleware):

```text
Content-Security-Policy   — restrict script/style/img sources; no inline scripts on dashboard
X-Content-Type-Options: nosniff
X-Frame-Options: DENY (or SAMEORIGIN if the invitation needs to be embeddable)
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=63072000; includeSubDomains (Cloudflare can also set this at the edge)
```

Public invitation pages may need a looser CSP than the dashboard (they load theme assets, embedded music) — scope the policy per route group rather than using one global CSP.

---

## 7. File Upload & Media Storage

The PRD's File Upload requirements (§20) plus concrete implementation:

### 7.1 Validation pipeline

```text
Upload received
   │
   ▼
Check declared MIME type AND actual file signature (magic bytes) — don't trust Content-Type header alone
   │
   ▼
Check extension matches an allowlist (.jpg .jpeg .png .webp for photos; .mp3 .m4a for music)
   │
   ▼
Check file size against a hard limit (photos: a few MB; music: 5–10 MB per the PRD's earlier discussion)
   │
   ▼
Generate a new server-side filename (UUID) — never use the user-supplied filename for the stored path
   │
   ▼
Write to /storage/weddings/{wedding-id}/{category}/{uuid}.{ext}
   │
   ▼
Store metadata (original name, mime, size, path) in the DB — the DB is the source of truth for what a file "is"
```

### 7.2 Path traversal

- Never build a filesystem path by concatenating user input (`../../etc/passwd`-style traversal). Validate `wedding_id` and generated filename are the only path components, both server-controlled.
- The upload handler must resolve the final path and assert it's still inside the expected `wedding_id` directory before writing (defense in depth against a bug elsewhere producing a bad path).

### 7.3 Serving uploaded files

- Serve media from a path/subdomain that cannot execute code (no `.php`, no server-side includes) — static file serving only.
- Consider serving user uploads from a **separate hostname** (e.g. `media.kisahmagis.id` or a `cdn.` prefix) rather than the same origin as the dashboard, so a malicious SVG/HTML upload can't run in the dashboard's origin even if content-sniffing goes wrong. At minimum, force `Content-Disposition` and `X-Content-Type-Options: nosniff` on served media.
- Strip EXIF/GPS metadata from uploaded photos before storage if guest privacy matters (couples' venue photos can leak location data).

### 7.4 Resource exhaustion

- Enforce per-wedding storage quotas (ties into the monetization tiers already planned — free vs. premium gallery/music capacity).
- Reject uploads that exceed size limits at the API layer before the full file is buffered into memory — stream and check size incrementally where the framework allows it.
- Audio files: validate actual duration server-side (don't trust client-reported duration) if duration affects any quota or playback logic.

---

## 8. Subdomain / Host Header Handling

Wedding identity is resolved from the `Host` header (`{slug}.kisahmagis.id`) per PRD §7 — this is attacker-controlled input and needs explicit handling.

- Validate the extracted subdomain against the slug format used at creation time (lowercase, alphanumeric + hyphen, bounded length) before querying the database with it.
- Only resolve slugs for weddings with `status = 'published'` — an unpublished/draft wedding must not be reachable via its subdomain even if the slug is guessed.
- Reject/ignore unrecognized hosts rather than falling through to a default wedding or leaking a stack trace.
- If wildcard DNS/tunnel routing (`*.kisahmagis.id`) means literally any subdomain reaches the app, explicitly 404 for hosts that don't match a known, published slug — don't let "no match" fall through to the `app.kisahmagis.id` dashboard router or vice versa.
- Keep `app.kisahmagis.id` (dashboard) and `*.kisahmagis.id` (public invitations) on genuinely separate routing paths in code, not just "same router, different `if`" — a mistake here is a tenant-isolation bug, not just a routing bug.

---

## 9. Database Security

- Least-privilege DB role for the application (no `SUPERUSER`, no unnecessary `CREATEDB`/`CREATEROLE`).
- Separate credentials for migrations (may need elevated DDL rights) vs. runtime API access if practical; at minimum, don't run the app with the same role used for manual admin `psql` sessions.
- Enforce `NOT NULL` and foreign key constraints matching the ownership model in §4 — let the database itself be a second line of defense against orphaned or misattributed rows, not just application logic.
- Back up regularly (see §13) and **encrypt backups at rest**, especially since they contain guest PII and password hashes.
- If PostgreSQL ever listens beyond `localhost`/the Docker network, require TLS and restrict by IP/firewall — for the MVP's home-server deployment, PostgreSQL should not be reachable from outside the Docker Compose network at all.

---

## 10. Secrets Management

- No secrets in source control — `.env` files are git-ignored; commit a `.env.example` with placeholder keys only.
- Secrets needed: DB credentials, session/JWT signing secret, token-hashing HMAC key, Cloudflare Tunnel credentials, any future third-party API keys (email, WhatsApp).
- Rotate the session/JWT signing secret and guest-token HMAC key independently if either is ever suspected compromised; design the auth/token code so rotation is possible without a full data migration (e.g. support verifying against a previous key for a grace period).
- Docker Compose: use `env_file` / Docker secrets rather than baking credentials into the image or `docker-compose.yml` itself.

---

## 11. Transport & Infrastructure Security

- All public traffic terminates TLS at Cloudflare; Cloudflare Tunnel means the home server has **no open inbound port** — keep it that way rather than also exposing a port for "convenience" during development.
- Enable Cloudflare's proxy (orange-cloud) so the origin IP isn't discoverable, reducing direct-attack surface on the home connection.
- Keep the host OS and Docker images patched; pin base image versions and rebuild periodically rather than trusting `latest` silently drifting.
- Docker Compose: run the API/DB containers as non-root users where the base image supports it; don't mount the Docker socket into the app container.
- Since this is a single home server with no redundancy, an availability incident (power/ISP outage) is also a security-adjacent concern — see backup/DR in §13.

---

## 12. Logging & Monitoring

- Log authentication events (login success/failure, password reset requests), authorization failures (403s — these are your IDOR canary), and rate-limit triggers.
- **Never log**: raw passwords, raw guest tokens, session tokens, full request bodies containing PII, file contents.
- Log enough to investigate an incident (timestamp, IP, user/wedding ID, endpoint, outcome) without becoming a second copy of sensitive data at rest.
- On a single home server, even simple structured logs to a rotated local file (with size caps) are a reasonable MVP starting point; revisit centralized logging if/when the deployment grows.
- Alert (even just to email/WhatsApp) on: repeated auth failures from one IP, repeated 403s from one authenticated user (possible IDOR probing), disk usage approaching capacity (2 GB RAM home server — storage exhaustion is a real risk, not just a theoretical one).

---

## 13. Backups & Disaster Recovery

- Automate PostgreSQL backups (`pg_dump` on a schedule) and store them **off the home server** (encrypted, e.g. pushed to object storage or another machine) — a local-only backup doesn't protect against hardware failure, which is a real risk on a single home server.
- Back up `/storage` (guest photos, music) with the same off-box discipline — this is often-irreplaceable user content.
- Periodically test restoring a backup, not just producing one.
- Document an actual recovery procedure (which secrets/config are needed to bring the stack back up) so a hardware failure doesn't also become a "how did this work again" incident.

---

## 14. Data Privacy (Guest PII)

KisahMagis holds personal data about people (guests) who never created an account and never directly consented to the platform's terms — the couple invited them. Treat this deliberately:

- Collect the minimum guest fields actually needed (name, contact info for personalization, group) — avoid speculative fields "just in case."
- Guestbook messages and RSVP responses are visible to the wedding owner by design, but should not be publicly listable by anyone without the wedding's own token/access (i.e. one guest shouldn't be able to enumerate other guests' wishes through some endpoint that wasn't meant to be a public listing).
- Provide the wedding owner a way to delete guest data (and cascade-delete their RSVP/guestbook entries) — useful both for good practice and for honoring a guest's request relayed through the couple.
- Be aware of Indonesia's Personal Data Protection Law (UU No. 27/2022, **UU PDP**) as the relevant local framework once the product has real users — at minimum this points toward: a privacy notice describing what's collected and why, a lawful basis for processing guest data (here, the couple's legitimate interest in managing their own wedding), and a defined data-retention/deletion path. This section is a pointer, not legal advice — validate specifics with counsel before/around public launch.
- Don't sell, share, or use guest contact data for anything beyond the wedding it was collected for (e.g. no repurposing guest phone numbers for KisahMagis's own marketing).

---

## 15. Dependency & Supply Chain

- Run `npm audit` (or equivalent) in CI; don't let it become a status the team stops reading.
- Pin dependency versions (lockfile committed); review diffs on major version bumps rather than auto-merging.
- Be deliberate about third-party packages in the invitation renderer specifically — that code path renders content editable by wedding owners and displayed to the public, so a compromised or careless dependency there has direct public-facing impact.

---

## 16. Security Checklist by MVP Phase

Mapped to the PRD's roadmap (§31) so security work lands with the feature it protects, not as a separate pass at the end.

### Phase 0 — Foundation
- [ ] Password hashing (Argon2id/bcrypt) wired into registration
- [ ] Session/cookie auth implemented with `httpOnly`, `Secure`, `SameSite`
- [ ] `requireAuth` + `requireWeddingOwnership` middleware built and tested with a "User A can't touch User B's data" test case
- [ ] Zod validation on every route from the start (not retrofitted later)
- [ ] `.env` secrets set up and git-ignored; `.env.example` committed
- [ ] Security headers middleware in place
- [ ] Docker Compose: DB not exposed outside the compose network; containers non-root where possible

### Phase 1 — Wedding & Invitation
- [ ] Subdomain resolution validates slug format and only serves `published` weddings
- [ ] `app.kisahmagis.id` vs `*.kisahmagis.id` routing kept strictly separate in code
- [ ] Music/gallery upload validation pipeline (MIME + magic bytes + size + server-generated filename) in place before upload ships
- [ ] Invitation JSONB config validated with Zod on write

### Phase 2 — Guest & RSVP
- [ ] Guest tokens generated with CSPRNG, stored hashed
- [ ] Public RSVP/guestbook endpoints rate-limited
- [ ] Token lookup scoped to the resolved wedding only, never global
- [ ] Generic error responses for invalid tokens (no enumeration signal)

### Phase 3 — Wedding Management
- [ ] Planner/budget/vendor endpoints all pass through the same ownership middleware as everything else (easy to forget on "internal-feeling" features)
- [ ] Budget/vendor data confirmed not reachable via any public/guest-facing route

### Phase 4 — Product Refinement
- [ ] Rate limiting tuned based on real traffic patterns
- [ ] Backup restore drill performed at least once
- [ ] Dependency audit clean; logging/alerting reviewed
- [ ] Revisit this document — update anything the implementation diverged from

---

## 17. Non-Goals for MVP

Consistent with the PRD's "avoid premature infrastructure" principle, explicitly **not** required at MVP stage:

- WAF / dedicated intrusion detection
- SOC2 / formal compliance program
- Multi-region redundancy
- Automated penetration testing pipeline
- Field-level encryption for non-sensitive columns

These become worth revisiting as usage, team size, or the sensitivity of stored data grows — don't build them preemptively, but don't forget they exist once the product outgrows a single home server.
