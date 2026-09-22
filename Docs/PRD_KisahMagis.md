# KisahMagis — Product Requirements Document

> **Status:** Draft v1.0  
> **Product:** KisahMagis  
> **Parent Brand:** Sistemagis  
> **Document Type:** Product & Technical Requirements Document  
> **Primary Language:** Indonesian

---

# 1. Product Overview

## 1.1 Product Definition

**KisahMagis** adalah digital wedding platform yang membantu pasangan mengelola perjalanan pernikahan secara lebih terstruktur melalui satu sistem yang menggabungkan:

- Digital wedding invitation
- Guest management
- RSVP
- Digital guestbook
- Wedding planner
- Checklist / task management
- Budget management
- Vendor management
- Gallery dan media
- Personalized guest invitation

KisahMagis tidak hanya diposisikan sebagai website undangan digital, tetapi sebagai **sistem manajemen pernikahan digital** yang menghubungkan kebutuhan pasangan sebelum, selama, dan setelah acara.

## 1.2 Product Vision

> **Menyederhanakan persiapan pernikahan menjadi pengalaman digital yang terorganisir, personal, dan penuh makna.**

## 1.3 Product Mission

KisahMagis bertujuan membantu pasangan:

1. Membuat undangan pernikahan yang personal.
2. Mengelola tamu dan RSVP secara terstruktur.
3. Mengorganisasi pekerjaan persiapan pernikahan.
4. Mengontrol anggaran dan vendor.
5. Menghadirkan pengalaman digital yang indah bagi tamu.
6. Mengurangi pekerjaan administratif yang tersebar di berbagai aplikasi.

## 1.4 Product Principles

### Simple
Fitur harus mudah dipahami dan tidak menambah beban administrasi.

### Personal
Setiap wedding harus dapat memiliki identitas, cerita, warna, foto, musik, dan konfigurasi sendiri.

### Systematic
Data dan proses wedding harus tersusun sehingga mudah dikelola.

### Elegant
Antarmuka invitation harus terasa romantis, bersih, modern, dan tidak berlebihan.

### Practical
Teknologi dipilih berdasarkan kebutuhan nyata, bukan sekadar mengikuti tren.

### Scalable by Need
Arsitektur harus dapat berkembang, tetapi tidak melakukan over-engineering pada tahap awal.

---

# 2. Brand Identity

## 2.1 Brand Concept

Nama **KisahMagis** merepresentasikan perpaduan antara:

- **Kisah** — cerita, perjalanan, hubungan, dan momen pasangan.
- **Magis** — pengalaman yang spesial, personal, dan memorable.

Produk harus membuat setiap wedding terasa seperti memiliki **kisah digitalnya sendiri**.

## 2.2 Brand Personality

KisahMagis memiliki karakter:

- Romantic
- Warm
- Elegant
- Personal
- Modern
- Soft
- Magical
- Friendly

Hindari desain yang terlalu:

- Corporate
- Kaku
- Heavy
- Berlebihan
- Terlalu banyak warna
- Terlalu banyak ornament tanpa fungsi

## 2.3 Color Palette

| Name | Hex | Role |
|---|---|---|
| Soft Pink | `#FCBACB` | Primary brand color |
| Off White | `#FCFCFC` | Main background |
| Light Pink | `#FC9FB1` | Secondary accent |
| Pastel Green | `#B9DCA9` | Supporting accent |
| Green | `#74A12E` | Supporting / status accent |
| Cream Yellow | `#FFEAAB` | Highlight / decorative accent |

### Design rule

Tidak semua warna harus digunakan sekaligus.

Palet harus digunakan secara hierarkis:

1. Off White sebagai basis.
2. Pink sebagai identitas utama.
3. Cream sebagai highlight.
4. Green sebagai supporting accent.
5. Darker green digunakan secara terbatas untuk status, emphasis, atau contrast.

## 2.4 Typography

### Primary Brand Font

**Quintessential**

Digunakan untuk:

- Logo-adjacent typography
- Heading tertentu
- Nama pasangan
- Hero / cover invitation
- Decorative typography

### UI Font

Dashboard, form, tabel, planner, dan elemen UI yang padat sebaiknya menggunakan font UI yang lebih readable.

Primary brand font tidak wajib digunakan untuk seluruh UI.

## 2.5 Logo

Logo KisahMagis berupa **line-art berbentuk love/heart**.

Logo akan disimpan sebagai asset source code dan digunakan pada:

- Landing page
- Dashboard
- Invitation
- Authentication
- Email / notification apabila diperlukan
- Brand documentation

Recommended location:

```text
src/
└── assets/
    └── logo/
        └── kisahmagis.svg
```

---

# 3. Problem Statement

Persiapan pernikahan biasanya melibatkan banyak kebutuhan:

- Undangan
- Data tamu
- RSVP
- Checklist
- Budget
- Vendor
- Dokumentasi
- Komunikasi
- Jadwal acara

Data tersebut sering tersebar di:

- Spreadsheet
- Chat
- Notes
- Google Drive
- Aplikasi task management
- Platform invitation terpisah

Akibatnya pasangan dapat mengalami:

- Data tidak terpusat
- Informasi tamu sulit dilacak
- Checklist tercecer
- Budget sulit dipantau
- Perubahan data harus dilakukan di banyak tempat
- Undangan hanya berfungsi sebagai halaman informasi

KisahMagis bertujuan menyatukan kebutuhan tersebut dalam satu platform.

---

# 4. Target Users

## 4.1 Primary User — Wedding Couple

Pasangan yang sedang mempersiapkan pernikahan.

Kebutuhan utama:

- Membuat invitation
- Mengelola tamu
- Mengatur RSVP
- Mengatur checklist
- Mengatur budget
- Mengelola vendor
- Menyimpan foto dan media

## 4.2 Secondary User — Wedding Guest

Tamu yang menerima invitation.

Kebutuhan:

- Melihat informasi pernikahan
- Mengetahui lokasi dan waktu
- Melihat cerita pasangan
- Mengirim RSVP
- Memberikan ucapan
- Melihat gallery
- Menggunakan invitation yang personalized

## 4.3 Future User — Vendor

Vendor dapat menjadi bagian dari ekosistem KisahMagis di tahap selanjutnya.

Contoh:

- Wedding organizer
- Photographer
- Videographer
- Makeup artist
- Venue
- Catering
- Decoration
- Entertainment

---

# 5. Product Scope

## 5.1 MVP

MVP harus berfokus pada fitur yang membentuk fondasi produk:

### Account & Wedding

- Registration
- Login
- Wedding profile
- Couple information
- Wedding date
- Wedding slug

### Digital Invitation

- Invitation theme
- Theme customization
- Couple information
- Event information
- Story
- Gallery
- Music
- RSVP
- Guestbook
- Personalized guest name
- Public invitation URL

### Guest Management

- Add guest
- Edit guest
- Delete guest
- Guest groups
- Guest status
- Personalized invitation token

### RSVP

- Attendance status
- Number of guests
- Guest message
- RSVP record

### Wedding Planner

- Board
- Column
- Task
- Priority
- Due date
- Task status

### Budget

- Budget item
- Category
- Estimated cost
- Actual cost
- Payment status

### Vendor

- Vendor name
- Category
- Contact
- Cost
- Status
- Notes

### Media

- Upload photo
- Gallery
- Music upload
- File metadata

---

# 6. Feature Requirements

# 6.1 Authentication

Users harus dapat:

- Register
- Login
- Logout
- Reset password
- Manage profile

Authorization menggunakan role dan ownership.

User hanya dapat mengakses wedding yang dimilikinya atau yang diberikan akses kepadanya.

---

# 6.2 Wedding Management

Satu user dapat memiliki satu atau beberapa wedding/project sesuai aturan bisnis.

Wedding memiliki data:

```text
id
user_id / owner_id
slug
couple information
wedding date
status
created_at
updated_at
```

Contoh:

```text
Wedding
├── Couple
├── Invitation
├── Guests
├── RSVP
├── Planner
├── Budget
├── Vendors
└── Media
```

---

# 6.3 Digital Invitation

Invitation adalah produk utama yang dapat dilihat oleh publik.

Contoh:

```text
https://andi-sari.kisahmagis.id
```

Invitation harus mendukung:

- Responsive design
- Mobile-first experience
- Theme
- Custom colors
- Custom typography
- Couple profile
- Wedding story
- Event details
- Maps/location
- Countdown
- Gallery
- Music
- RSVP
- Guestbook
- Personalized guest

---

# 6.4 Personalized Invitation

Guest dapat menerima URL seperti:

```text
https://andi-sari.kisahmagis.id/?to=Kx8a91P
```

Token tidak boleh menggunakan ID database secara langsung.

Flow:

```text
Guest URL
    ↓
Token
    ↓
Find guest
    ↓
Find wedding
    ↓
Load invitation
    ↓
Render guest name
```

Contoh:

> Kepada Yth. Bapak Andi

---

# 6.5 Theme System

Theme merupakan kode/template UI yang versioned.

Contoh:

```text
src/themes/
├── serenity/
├── bloom/
└── aurora/
```

Setiap theme memiliki:

```text
theme/
├── components/
├── assets/
├── schema.ts
├── theme.ts
└── index.ts
```

### Theme vs Configuration

Theme menentukan:

> Bagaimana invitation dirender.

Configuration menentukan:

> Apa yang dipilih oleh wedding.

---

# 6.6 Invitation Configuration

Invitation memiliki satu record dengan JSONB configuration.

Contoh:

```json
{
  "theme": {
    "colors": {
      "primary": "#B98B73",
      "secondary": "#E7CFC3",
      "background": "#FFF9F6"
    },
    "fonts": {
      "heading": "Quintessential",
      "body": "Inter"
    }
  },
  "sections": [
    {
      "type": "cover",
      "enabled": true
    },
    {
      "type": "couple",
      "enabled": true
    },
    {
      "type": "story",
      "enabled": true
    },
    {
      "type": "event",
      "enabled": true
    },
    {
      "type": "gallery",
      "enabled": true,
      "layout": "masonry"
    },
    {
      "type": "rsvp",
      "enabled": true
    }
  ]
}
```

Prinsip utama:

> **PostgreSQL menyimpan apa yang wedding miliki; JSONB menyimpan bagaimana invitation tersebut ditampilkan.**

---

# 6.7 Guest Management

Data guest minimal:

```text
id
wedding_id
name
phone
email
group
invitation_token
invitation_status
created_at
updated_at
```

Kemampuan:

- CRUD guest
- Import guest
- Guest grouping
- Search
- Filter
- Invitation status
- RSVP status

---

# 6.8 RSVP

Guest dapat:

- Accept
- Decline
- Maybe / pending jika diperlukan

Data RSVP:

```text
id
guest_id
wedding_id
attendance
guest_count
message
submitted_at
```

---

# 6.9 Digital Guestbook

Guest dapat memberikan:

- Nama
- Ucapan
- Optional attendance information

Owner dapat:

- Melihat ucapan
- Moderasi
- Hide / delete message

---

# 6.10 Gallery

Gallery harus mendukung:

- Multiple images
- Ordering
- Album / category jika diperlukan
- Visibility
- Image metadata

File fisik disimpan pada local HDD pada tahap awal.

Database hanya menyimpan metadata dan path/reference.

---

# 6.11 Music

Setiap invitation dapat memiliki music.

Metadata:

```text
id
wedding_id
file_path
title
artist
duration
created_at
```

Invitation configuration dapat menentukan:

```json
{
  "music": {
    "enabled": true,
    "music_id": "..."
  }
}
```

---

# 6.12 Wedding Planner

Planner menggunakan struktur:

```text
Wedding
└── Planner Board
    └── Columns
        └── Tasks
```

Contoh:

```text
To Do
├── Cari venue
├── Tentukan dekorasi
└── Booking photographer

In Progress
└── Undangan

Done
└── Tentukan tanggal
```

Task:

```text
id
column_id
title
description
priority
start_date
due_date
position
status
created_at
updated_at
```

Tidak membutuhkan realtime/WebSocket pada MVP.

---

# 6.13 Budget

Budget item:

```text
id
wedding_id
category
name
estimated_cost
actual_cost
payment_status
notes
```

Dashboard dapat menampilkan:

- Total estimated
- Total actual
- Remaining
- Paid
- Unpaid
- Category breakdown

---

# 6.14 Vendor

Vendor:

```text
id
wedding_id
name
category
contact
cost
status
notes
```

Vendor dapat dikaitkan dengan budget item.

---

# 7. Invitation URL Architecture

Format utama:

```text
https://[wedding-slug].kisahmagis.id
```

Guest personalization:

```text
https://[wedding-slug].kisahmagis.id/?to=[guest-token]
```

Flow:

```text
HTTP Request
     ↓
Host Header
     ↓
Extract Subdomain
     ↓
wedding-slug
     ↓
Find Wedding
     ↓
Find Invitation
     ↓
Load Theme
     ↓
Load JSONB Configuration
     ↓
Load Wedding Data
     ↓
Render Invitation
```

Subdomain harus divalidasi dan hanya dapat mengarah ke wedding yang published.

---

# 8. System Architecture

## 8.1 Recommended Architecture

```text
                         INTERNET
                             │
                             ▼
                      Cloudflare
                             │
                    Cloudflare Tunnel
                             │
                             ▼
                     HOME SERVER
                             │
              ┌──────────────┴──────────────┐
              │                             │
              ▼                             ▼
     React Router Framework              Hono API
              │                             │
              │                             │
              └──────────────┬──────────────┘
                             │
                             ▼
                        PostgreSQL
                             │
               ┌─────────────┴─────────────┐
               │                           │
               ▼                           ▼
        Relational Data                JSONB
               │                           │
               │                           │
               └─────────────┬─────────────┘
                             │
                             ▼
                         Local HDD
                    Photos / Music / Files
```

## 8.2 Frontend Responsibilities

React Router Framework:

- UI
- Routing
- SSR
- Invitation rendering
- Dashboard
- Form interaction
- Data loading
- Dynamic metadata
- Code splitting

## 8.3 Backend Responsibilities

Hono:

- REST API
- Authentication endpoints
- Authorization
- Business logic
- Validation
- Database access
- File upload
- RSVP
- Guestbook
- Planner
- Budget
- Vendor

---

# 9. Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| Language | TypeScript | Main language |
| UI | React | Component UI |
| Web Framework | React Router Framework Mode | SSR, routing, data loading |
| API | Hono | Lightweight backend API |
| Build | Vite | Build tooling |
| Styling | Tailwind CSS | UI styling |
| Validation | Zod | Runtime validation |
| ORM | Drizzle ORM | PostgreSQL access |
| Database | PostgreSQL | Relational data |
| File Storage | Local HDD | Media |
| Container | Docker Compose | Deployment |
| Tunnel | Cloudflare Tunnel | Public access |
| Source Control | Git | Version control |

---

# 10. Why React Router Framework Mode?

React Router Framework Mode is selected instead of plain React + Vite SPA because public wedding invitations benefit from server rendering.

Benefits:

- SSR
- Dynamic metadata
- Better initial HTML
- Better link previews
- Route-level data loading
- Code splitting
- Form actions
- Type-safe route APIs
- Can still support SPA/static rendering when appropriate

The framework also carries forward many architectural ideas associated with Remix.

---

# 11. Why Hono?

Hono is selected because the backend should remain:

- Lightweight
- TypeScript-first
- Web Standards-based
- Easy to deploy
- Easy to understand
- Suitable for a small server

Hono also provides a clean API boundary between frontend and backend.

---

# 12. Why PostgreSQL?

PostgreSQL is the primary database because KisahMagis has strongly relational data:

```text
User
 └── Wedding
      ├── Invitation
      ├── Guest
      │    └── RSVP
      ├── Planner
      ├── Budget
      ├── Vendor
      └── Files
```

Relational integrity is important for:

- Ownership
- Guest relationships
- RSVP
- Planner
- Budget
- Vendor
- Invitation

JSONB is used selectively for flexible invitation presentation configuration.

---

# 13. JSONB Strategy

JSONB should not be used as the entire database model.

### Relational

Use PostgreSQL columns/tables for:

- Users
- Weddings
- Guests
- RSVP
- Vendors
- Budget
- Planner
- Files
- Invitations

### JSONB

Use JSONB for:

- Theme configuration
- Section configuration
- Appearance
- Animation settings
- Flexible invitation presentation options

This provides flexibility without sacrificing relational integrity.

---

# 14. Database Architecture

## 14.1 Core Tables

```text
users
weddings
invitations
guests
rsvps
guestbook_entries
planner_boards
planner_columns
planner_tasks
budget_items
vendors
wedding_files
invitation_music
```

## 14.2 Relationship

```text
users
  │
  └── weddings
        │
        ├── invitations
        ├── guests
        │     └── rsvps
        ├── guestbook_entries
        ├── planner_boards
        │     └── planner_columns
        │           └── planner_tasks
        ├── budget_items
        ├── vendors
        └── wedding_files
```

---

# 15. Suggested Database Schema

## users

```text
id
name
email
password_hash
created_at
updated_at
```

## weddings

```text
id
owner_id
slug
title
groom_name
bride_name
wedding_date
status
created_at
updated_at
```

## invitations

```text
id
wedding_id
theme_id
theme_version
config JSONB
status
published_at
created_at
updated_at
```

## guests

```text
id
wedding_id
name
phone
email
group_name
token_hash
status
created_at
updated_at
```

## rsvps

```text
id
wedding_id
guest_id
attendance
guest_count
message
submitted_at
```

---

# 16. Theme Versioning

Theme harus memiliki version.

Contoh:

```text
theme_id: serenity
theme_version: 1.0.0
```

Jika theme berubah:

```text
serenity 1.0.0
serenity 1.1.0
serenity 2.0.0
```

Wedding lama tidak boleh berubah secara tidak sengaja hanya karena developer memperbarui theme.

Theme migration harus dilakukan secara eksplisit apabila diperlukan.

---

# 17. Frontend Architecture

Recommended:

```text
src/
├── assets/
│   ├── logo/
│   └── fonts/
│
├── components/
│   ├── ui/
│   ├── forms/
│   └── layout/
│
├── routes/
│   ├── _index.tsx
│   ├── login.tsx
│   ├── register.tsx
│   ├── dashboard.tsx
│   ├── dashboard.weddings.tsx
│   ├── dashboard.planner.tsx
│   ├── dashboard.budget.tsx
│   └── invitation.tsx
│
├── themes/
│   ├── serenity/
│   ├── bloom/
│   └── aurora/
│
├── lib/
├── services/
├── schemas/
└── styles/
```

Actual route structure may be adjusted to the final React Router configuration.

---

# 18. State Management

MVP should avoid unnecessary global state.

Preferred order:

1. React Router loaders/actions
2. Local React state
3. URL state
4. TanStack Query only when server-cache requirements justify it
5. Zustand only if complex client-side global state appears

Redux is not required for the initial product.

---

# 19. API Design

Example API:

```text
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout

GET    /api/weddings
POST   /api/weddings
GET    /api/weddings/:id
PATCH  /api/weddings/:id
DELETE /api/weddings/:id

GET    /api/invitations/:id
PATCH  /api/invitations/:id
POST   /api/invitations/:id/publish

GET    /api/guests
POST   /api/guests
PATCH  /api/guests/:id
DELETE /api/guests/:id

POST   /api/rsvp

GET    /api/planner/tasks
POST   /api/planner/tasks
PATCH  /api/planner/tasks/:id
DELETE /api/planner/tasks/:id

GET    /api/budget
POST   /api/budget
PATCH  /api/budget/:id

GET    /api/vendors
POST   /api/vendors
PATCH  /api/vendors/:id

POST   /api/upload
```

API naming can be refined during implementation.

---

# 20. Security Requirements

## Authentication

Passwords must be hashed using a modern password hashing algorithm.

## Authorization

Every private resource must validate ownership.

Example:

```text
User A
  ↓
Wedding A
  ↓
Guest A
```

User A must not be able to access:

```text
Wedding B
Guest B
```

by simply changing an ID.

## Guest Token

Guest personalization token must not expose sequential database IDs.

Prefer random opaque tokens or hashed tokens.

## File Upload

Validate:

- MIME type
- File extension
- File size
- Filename
- Storage path

Never trust a user-provided filename as a filesystem path.

---

# 21. File Storage

MVP uses local HDD.

Example:

```text
/storage/
├── weddings/
│   ├── {wedding-id}/
│   │   ├── gallery/
│   │   ├── music/
│   │   └── documents/
```

PostgreSQL stores metadata:

```text
id
wedding_id
type
original_name
storage_path
mime_type
size
created_at
```

The application should not store large binary media directly inside PostgreSQL.

---

# 22. Infrastructure

Current target infrastructure:

```text
Home Server
├── ARM Cortex-A53
├── 2 GB RAM
├── 8 GB Internal Storage
└── ~256 GB HDD
```

Public access:

```text
Internet
   ↓
Cloudflare
   ↓
Cloudflare Tunnel
   ↓
Home Server
```

Deployment:

```text
Docker Compose
├── frontend
├── backend
└── postgres
```

The exact number of containers can be reduced if resource monitoring indicates the server is constrained.

---

# 23. Resource Strategy

Because the initial server has only 2 GB RAM, the architecture prioritizes:

- Few services
- Low memory overhead
- No unnecessary background workers
- No microservices
- No Kubernetes
- No Redis unless required
- No message broker
- No CDN dependency
- Local storage
- Simple deployment

Resource usage must be measured in real conditions before production scaling decisions.

---

# 24. Technologies Not Required in MVP

The following are deliberately excluded unless a concrete requirement appears:

### Redis

Not required because:

- No distributed caching requirement
- No queue requirement
- No realtime requirement

### BullMQ

Not required because:

- No heavy asynchronous jobs initially

### WebSocket

Not required because:

- Planner does not require realtime collaboration initially

### Kafka

Not required because:

- Product does not have streaming/data pipeline requirements at MVP stage

### Kubernetes

Not appropriate for initial single-server deployment.

### Object Storage

Local HDD is sufficient initially.

### CDN

Can be introduced later if media traffic grows.

### Microservices

A modular monolith is preferred initially.

---

# 25. SEO and Social Sharing

Public invitations should provide:

- Dynamic title
- Description
- Open Graph metadata
- Preview image
- Canonical URL
- Responsive metadata

Example:

```text
Title:
The Wedding of Andi & Sari

Description:
Dengan penuh kebahagiaan, kami mengundang Anda
untuk hadir dalam hari istimewa kami.

Image:
Invitation preview
```

SSR is important for producing meaningful initial HTML and metadata.

---

# 26. Performance Requirements

Invitation pages should prioritize:

- Fast first render
- Optimized images
- Lazy-loaded gallery
- Minimal JavaScript where possible
- Code splitting
- Responsive images
- Compressed assets
- Efficient database queries

Large media files must not be loaded before they are needed.

---

# 27. UX Principles

## Invitation

Mobile-first.

Primary experience:

```text
Open invitation
      ↓
Cover
      ↓
Open invitation
      ↓
Wedding information
      ↓
Story
      ↓
Event
      ↓
Gallery
      ↓
RSVP
      ↓
Guestbook
```

## Dashboard

Desktop-friendly but responsive.

Primary navigation:

```text
Dashboard
Wedding
Invitation
Guests
Planner
Budget
Vendors
Media
Settings
```

---

# 28. Dashboard Concept

Dashboard provides a quick overview:

```text
Wedding Overview
├── Wedding countdown
├── RSVP summary
├── Guest count
├── Budget summary
├── Upcoming tasks
└── Recent activity
```

The dashboard should prioritize actionable information instead of becoming a collection of decorative charts.

---

# 29. Invitation Editor

The invitation editor should eventually provide a visual configuration experience.

Concept:

```text
┌───────────────────────────────────────────┐
│ Toolbar                                   │
├───────────────┬───────────────────────────┤
│ Configuration │                           │
│               │      Live Preview         │
│ Colors        │                           │
│ Typography    │      Invitation           │
│ Sections      │                           │
│ Gallery       │                           │
│ Music         │                           │
└───────────────┴───────────────────────────┘
```

Configuration can be generated from a theme schema.

Example:

```ts
theme.schema.ts
```

can define:

```text
colors.primary
colors.secondary
fonts.heading
sections.gallery.enabled
sections.gallery.layout
```

This avoids hardcoding every editor control.

---

# 30. Product Data Flow

Example: creating invitation

```text
User
 ↓
Dashboard
 ↓
Invitation Editor
 ↓
Update configuration
 ↓
Hono API
 ↓
Validation
 ↓
PostgreSQL
 ↓
JSONB config
 ↓
Published invitation
```

Guest viewing:

```text
Guest
 ↓
andi-sari.kisahmagis.id
 ↓
React Router SSR
 ↓
Wedding lookup
 ↓
Invitation lookup
 ↓
Theme + Config
 ↓
PostgreSQL
 ↓
Render
 ↓
HTML
 ↓
Browser hydration
```

---

# 31. MVP Roadmap

## Phase 0 — Foundation

- Repository setup
- TypeScript
- React Router
- Hono
- PostgreSQL
- Drizzle
- Docker Compose
- Authentication
- Basic deployment

## Phase 1 — Wedding & Invitation

- Wedding CRUD
- Invitation CRUD
- Theme system
- Theme configuration
- Public invitation
- Subdomain
- SSR
- Basic gallery
- Music

## Phase 2 — Guest & RSVP

- Guest management
- Guest token
- Personalized invitation
- RSVP
- Guestbook

## Phase 3 — Wedding Management

- Planner
- Checklist
- Budget
- Vendors

## Phase 4 — Product Refinement

- Invitation editor
- More themes
- Analytics
- Import/export
- UX refinement
- Performance optimization

---

# 32. Future Development

Potential future features:

## Wedding Marketplace

- Vendor discovery
- Vendor profiles
- Vendor reviews
- Booking

## Photobooth

- Digital photobooth
- Event gallery
- QR-based photo access

## Advanced Guest Management

- QR check-in
- Seating management
- Table assignment
- Guest statistics

## Advanced Invitation

- Multiple invitation styles
- Animation presets
- Video
- Live event information
- Custom domain

## Notification

- Email
- WhatsApp integration
- RSVP reminders
- Event reminders

These features are not part of the initial MVP.

---

# 33. Monetization Direction

Potential model:

### Free

- Limited themes
- Basic invitation
- Limited guest capacity
- KisahMagis branding

### Premium

- Premium themes
- More guests
- Custom music
- More gallery capacity
- Advanced customization
- Guest management
- Planner
- Budget

### Future

- Custom domain
- Vendor marketplace
- Add-on services
- Photobooth
- Wedding packages

Pricing should be validated after MVP usage data is available.

---

# 34. Repository Strategy

Recommended monorepo:

```text
kisahmagis/
├── apps/
│   ├── web/
│   └── api/
│
├── packages/
│   ├── ui/
│   ├── config/
│   ├── types/
│   └── validation/
│
├── storage/
├── docker/
├── docs/
├── docker-compose.yml
└── README.md
```

Possible responsibilities:

```text
apps/web
→ React Router

apps/api
→ Hono

packages/ui
→ Shared UI components

packages/types
→ Shared TypeScript types

packages/validation
→ Shared Zod schemas
```

A monorepo should only be adopted if it remains simpler than separate repositories. The structure can be simplified during the initial implementation.

---

# 35. Development Principles

1. Build the simplest working version first.
2. Avoid premature infrastructure.
3. Keep business data relational.
4. Use JSONB only where flexibility is actually required.
5. Keep themes versioned.
6. Keep invitation rendering independent from the editor.
7. Keep API boundaries clear.
8. Prefer modular monolith architecture.
9. Measure before optimizing.
10. Add infrastructure only when a concrete problem requires it.

---

# 36. Definition of Done — MVP

MVP is considered functional when a user can:

1. Register.
2. Create a wedding.
3. Select an invitation theme.
4. Customize invitation content.
5. Upload photos.
6. Add music.
7. Publish an invitation.
8. Access the invitation through a wedding subdomain.
9. Add guests.
10. Generate personalized guest invitation links.
11. Receive RSVP responses.
12. View guestbook messages.
13. Create planner tasks.
14. Track budget.
15. Manage vendors.
16. Access the application securely over the internet.

---

# 37. Success Metrics

Initial product metrics:

### Invitation

- Number of invitations created
- Number of invitations published
- Invitation views
- Average invitation session duration

### Guest

- Guests added
- Personalized links opened
- RSVP submission rate
- Attendance response distribution

### Wedding Management

- Planner tasks created/completed
- Budget items created
- Vendor records created

### Product

- Active weddings
- Returning users
- Premium conversion
- Storage usage
- Server resource usage

Metrics should be introduced gradually and must not create unnecessary infrastructure complexity.

---

# 38. Architecture Decision Summary

| Decision | Choice | Reason |
|---|---|---|
| Frontend | React | Existing expertise and ecosystem |
| Web Framework | React Router Framework Mode | SSR + routing + data loading |
| Backend | Hono | Lightweight API boundary |
| ORM | Drizzle | Type-safe and lightweight |
| Database | PostgreSQL | Strong relational model |
| Flexible config | JSONB | Theme/invitation customization |
| Media | Local HDD | Low-cost MVP |
| Deployment | Docker Compose | Simple operations |
| Public access | Cloudflare Tunnel | No direct home port exposure |
| Architecture | Modular monolith | Simple and extensible |
| Realtime | None initially | Not required |
| Cache | None initially | Not required |
| Queue | None initially | Not required |
| Kubernetes | None initially | Overkill for current infrastructure |

---

# 39. Final Product Architecture

The target architecture is intentionally simple:

```text
                         ┌─────────────────────┐
                         │      INTERNET       │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │     CLOUDFLARE      │
                         └──────────┬──────────┘
                                    │
                           Cloudflare Tunnel
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────┐
│                    KISAHMAGIS SERVER                    │
│                                                         │
│  ┌─────────────────────┐      ┌──────────────────────┐ │
│  │ React Router        │      │ Hono API             │ │
│  │ Framework           │─────▶│                      │ │
│  │                     │      │ Auth                 │ │
│  │ SSR                 │      │ Wedding              │ │
│  │ Invitation          │      │ Guest                │ │
│  │ Dashboard           │      │ RSVP                 │ │
│  │ Editor              │      │ Planner              │ │
│  └─────────────────────┘      │ Budget               │ │
│                               │ Vendor               │ │
│                               │ Upload               │ │
│                               └──────────┬───────────┘ │
│                                          │             │
│                                          ▼             │
│                               ┌──────────────────────┐ │
│                               │ PostgreSQL            │ │
│                               │                      │ │
│                               │ Relational Data      │ │
│                               │ + JSONB Config       │ │
│                               └──────────┬───────────┘ │
│                                          │             │
│                                          ▼             │
│                               ┌──────────────────────┐ │
│                               │ Local HDD             │ │
│                               │                      │ │
│                               │ Photos               │ │
│                               │ Music                │ │
│                               │ Other Media          │ │
│                               └──────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

# 40. Core Architectural Principle

KisahMagis should be developed as a **modular monolith first**.

The system should have clear modules:

```text
Authentication
Wedding
Invitation
Theme
Guest
RSVP
Guestbook
Planner
Budget
Vendor
Media
```

but they do not need to become separate microservices.

The guiding principle is:

> **Start simple, keep boundaries clear, and scale only when real product requirements demand it.**

This architecture allows KisahMagis to start on a small home server while maintaining a reasonable path toward future cloud infrastructure, additional products, and the broader Sistemagis ecosystem.

---

# 41. Brand-to-Product Experience

The visual identity should consistently communicate:

> **KisahMagis = personal wedding story + systematic wedding management.**

The public invitation should emphasize:

- Emotion
- Romance
- Story
- Elegance
- Personalization

The private dashboard should emphasize:

- Clarity
- Organization
- Productivity
- Simplicity
- Actionability

Therefore the same brand system can have two visual expressions:

```text
PUBLIC INVITATION
Romantic · Elegant · Emotional
                │
                │ KisahMagis
                │
DASHBOARD
Systematic · Clean · Practical
```

Both should remain connected through the same color palette, typography system, logo, spacing language, and component identity.
