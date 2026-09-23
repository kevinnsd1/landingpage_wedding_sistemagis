# KisahMagis — Design System & Application Design Documentation

> **Product:** KisahMagis  
> **Document:** Design System & Application Design Docs  
> **Version:** 1.0  
> **Status:** Development Reference  
> **Parent Brand:** Sistemagis

---

# 1. Purpose

Dokumen ini menjadi **single source of truth untuk desain aplikasi KisahMagis** selama proses development.

Dokumen mencakup:

- Visual identity
- Color system
- Typography
- Logo usage
- Spacing
- Border radius
- Shadows
- Iconography
- Components
- Public invitation design
- Dashboard design
- Invitation editor
- Responsive behavior
- Accessibility
- Theme architecture
- Design-to-code rules

Tujuan utamanya adalah memastikan desain tetap konsisten meskipun dikerjakan secara bertahap dan fitur terus bertambah.

---

# 2. Design Philosophy

KisahMagis memiliki dua pengalaman utama:

```text
PUBLIC EXPERIENCE
Romantic · Emotional · Elegant · Personal

                    │
                    ▼

              KISAHMAGIS

                    │
                    ▼

PRODUCT EXPERIENCE
Systematic · Clean · Practical · Simple
```

Keduanya menggunakan visual identity yang sama, tetapi memiliki tingkat ekspresi yang berbeda.

## 2.1 Public Invitation

Public invitation harus terasa:

- romantic
- warm
- elegant
- personal
- memorable
- soft

Visual dapat menggunakan:

- photography
- floral illustration
- subtle animation
- decorative line art
- soft gradient
- generous whitespace

## 2.2 Dashboard

Dashboard harus terasa:

- clean
- organized
- lightweight
- productive
- friendly

Dashboard tidak boleh terlalu dekoratif sehingga mengganggu pekerjaan pengguna.

---

# 3. Brand Identity

## 3.1 Logo

Logo KisahMagis adalah **line-art heart/infinity-like mark** yang merepresentasikan hubungan, perjalanan, dan kisah yang berkelanjutan.

Primary logo terdiri dari:

```text
[Heart Mark] + KisahMagis Wordmark
```

Logo variations:

1. Primary logo
2. Icon only
3. Wordmark only
4. Monochrome
5. Reversed/light version

## 3.2 Logo Asset

Logo utama harus disimpan sebagai SVG.

Recommended:

```text
src/
└── assets/
    └── brand/
        ├── logo.svg
        ├── logo-mark.svg
        ├── logo-wordmark.svg
        └── favicon.svg
```

Jika asset final sudah tersedia, gunakan asset tersebut dan jangan menggambar ulang logo menggunakan CSS/SVG secara manual di setiap component.

## 3.3 Logo Clear Space

Minimal clear space:

```text
      ┌───────────────────────┐
      │      CLEAR SPACE       │
      │   ┌───────────────┐   │
      │   │     LOGO      │   │
      │   └───────────────┘   │
      │      CLEAR SPACE       │
      └───────────────────────┘
```

Clear space minimal menggunakan ukuran bagian logo mark sebagai referensi.

Logo tidak boleh ditempatkan terlalu dekat dengan:

- edge
- heading
- button
- photograph
- decorative element

## 3.4 Logo Don'ts

Jangan:

- stretch logo
- compress logo
- rotate logo
- menambahkan shadow berat
- mengubah proporsi
- mengganti bentuk mark
- menggunakan warna yang tidak ada dalam brand palette
- menempatkan logo pada background dengan contrast rendah

---

# 4. Color System

## 4.1 Core Palette

| Token | Hex | Role |
|---|---|---|
| `pink-500` | `#FCBACB` | Primary |
| `pink-400` | `#FC9FB1` | Secondary |
| `neutral-50` | `#FCFCFC` | Main background |
| `green-200` | `#B9DCA9` | Supporting |
| `green-600` | `#74A12E` | Positive / supporting |
| `yellow-200` | `#FFEAAB` | Highlight |

## 4.2 Recommended Semantic Colors

Brand colors should be separated from semantic colors.

```text
Primary
→ #FCBACB

Primary Strong
→ #FC9FB1

Background
→ #FCFCFC

Success
→ #74A12E

Success Soft
→ #B9DCA9

Warning
→ #FFEAAB
```

Error and neutral colors may be added because they are functional UI requirements.

Recommended functional additions:

```text
Error
→ #D9536F

Error Soft
→ #FBE1E7

Text Primary
→ #263238

Text Secondary
→ #667085

Border
→ #E8E8E8
```

These functional colors should not replace the core brand palette.

---

# 5. Color Usage & Harmony

KisahMagis menggunakan palet multi-warna pastel yang seimbang (tidak melulu pink), memadukan kehangatan pernikahan romantis dengan kejelasan visual dashboard produktif:

## 5.1 Pink Pastel (Blush & Romantic Accent)

- `#FCBACB` (Pink Soft): Soft pastel background, badge container, delicate borders.
- `#FC9FB1` (Pink Accent): Secondary brand accent, selected state indicator, heart accents.
- `#7D4050` / `#832B42` (Pink Deep Text): Warna teks kontras tinggi di atas latar `#FCBACB` (WCAG AA 5.5:1+).

## 5.2 Hijau Pastel & Sage (Progress, Success & Vitality)

- `#B9DCA9` (Pastel Green Soft): Background status 'Selesai', indikator progres siap antar, badge RSVP hadir.
- `#74A12E` (Sage/Olive Green): Checkmark aktif, node timeline selesai, highlight nilai positif.
- `#3D6420` (Green Deep Text): Warna teks kontras tinggi di atas latar `#B9DCA9`.

## 5.3 Cream & Warm Yellow (Milestones, Budget & Warmth)

- `#FFEAAB` (Cream Yellow): Highlight tenggat waktu, kartu pos anggaran, badge status menunggu/pending.
- `#FFF9E6` (Cream Soft): Soft container background untuk card preview.
- `#7A5D00` (Cream Deep Text): Warna teks kontras tinggi di atas latar `#FFEAAB`.

## 5.4 Neutral Charcoal & Off-White (Structure, Contrast & Typography)

- `#263238` (Deep Charcoal Slate): Warna teks utama antarmuka, heading, icon tegas, dan latar tombol Primary Solid dengan teks putih.
- `#667085` (Text Secondary): Label pendukung, keterangan tanggal, placeholder.
- `#E8E8E8` / `#F1F5F9`: Border pembatas kartu, tabel, dan form input.
- `#FCFCFC`: Warna latar belakang utama seluruh aplikasi (off-white hangat).

## 5.4 Green

`#74A12E`

Use selectively:

- RSVP success
- completed tasks
- positive status
- confirmation
- supporting decorative elements

## 5.5 Pastel Green

`#B9DCA9`

Use for:

- soft success background
- status badges
- decorative elements
- cards

## 5.6 Cream Yellow

`#FFEAAB`

Use for:

- reminder
- pending state
- warm highlight
- decorative elements

---

# 6. Typography

## 6.1 Brand Font

### Quintessential

Quintessential is the primary expressive font.

Use for:

- Couple names
- Invitation hero
- Wedding title
- Decorative headings
- Emotional copy
- Brand wordmark context

Example:

```text
The Wedding of

Andi & Sari
```

The couple name can use Quintessential.

## 6.2 UI Font

The application UI should use a highly readable sans-serif.

Recommended:

```text
Inter
```

Use for:

- Dashboard
- Navigation
- Forms
- Table
- Planner
- Budget
- Buttons
- Helper text
- System messages

## 6.3 Typography Hierarchy

### Display

```text
font-family: Quintessential
font-size: 48–72px
line-height: 1.05
```

### Invitation Heading

```text
font-family: Quintessential
font-size: 32–48px
line-height: 1.15
```

### Dashboard Heading

```text
font-family: Inter
font-size: 24–32px
font-weight: 600
```

### Body

```text
font-family: Inter
font-size: 14–16px
line-height: 1.6
```

### Caption

```text
font-family: Inter
font-size: 12–13px
line-height: 1.5
```

---

# 7. Spacing System

Use an 8px-based spacing system.

```text
space-1   = 4px
space-2   = 8px
space-3   = 12px
space-4   = 16px
space-5   = 20px
space-6   = 24px
space-8   = 32px
space-10  = 40px
space-12  = 48px
space-16  = 64px
space-20  = 80px
space-24  = 96px
```

Primary usage:

```text
4px   → icon gap
8px   → small element gap
12px  → input internal spacing
16px  → standard component spacing
24px  → card/panel spacing
32px  → section spacing
48px+ → major section spacing
```

---

# 8. Border Radius

KisahMagis uses soft rounded UI.

```text
radius-sm   = 8px
radius-md   = 12px
radius-lg   = 16px
radius-xl   = 24px
radius-2xl  = 32px
radius-full = 9999px
```

Recommended:

| Component | Radius |
|---|---:|
| Input | 12px |
| Button | 12px |
| Card | 16px |
| Modal | 20px |
| Invitation section | 24px |
| Badge | Full |
| Avatar | Full |

Avoid excessive use of sharp 0px corners.

---

# 9. Shadows

Shadows should be subtle.

Primary:

```css
box-shadow:
  0 4px 20px rgba(38, 50, 56, 0.06);
```

Elevated:

```css
box-shadow:
  0 10px 30px rgba(38, 50, 56, 0.08);
```

Do not use heavy black shadows.

The product should feel soft and lightweight.

---

# 10. Borders

Default border:

```text
#E8E8E8
```

Brand border:

```text
rgba(252, 186, 203, 0.55)
```

Use borders primarily for:

- Inputs
- Cards
- Tables
- Separators
- Editor panels

---

# 11. Iconography

Icon style:

> **Simple line icon with rounded strokes.**

Icons should be:

- lightweight
- consistent
- rounded
- minimal
- understandable

Suggested icon library:

```text
Lucide
```

Example categories:

```text
Invitation → Mail
Guest      → Users
Calendar   → CalendarDays
Planner    → CheckCircle
Budget     → Wallet
Vendor     → Store
Gallery    → Image
Music      → Music
Location   → MapPin
Settings   → Settings
Favorite   → Heart
```

Icons should generally use:

```text
stroke-width: 1.75–2
```

Avoid mixing multiple icon families.

---

# 12. Illustration Style

Illustrations should use:

- thin lines
- pastel colors
- minimal shapes
- romantic subjects
- botanical elements
- couple/wedding imagery
- subtle heart elements

Illustrations should not compete with photography.

Use illustrations primarily for:

- empty states
- onboarding
- landing page
- decorative invitation elements
- feature explanations

---

# 13. Decorative Elements

Recommended decorative vocabulary:

```text
Heart line
Floral branch
Leaf
Small dots
Soft curve
Organic blob
Subtle sparkle
```

Decorative elements should be sparse.

The rule:

> Decoration should enhance emotion, not reduce usability.

---

# 14. Backgrounds

Primary application background:

```text
#FCFCFC
```

Invitation backgrounds may use:

```text
#FCFCFC
#FFF8FA
soft pink gradient
soft floral image
```

Example:

```css
background:
  linear-gradient(
    180deg,
    #FFF8FA 0%,
    #FCFCFC 100%
  );
```

Do not use gradients across every component.

---

# 15. Buttons

Tombol di KisahMagis mengedepankan kualitas estetika, kejelasan hirarki visual, dan bebas dari gradasi artifisial yang berlebihan.

## 15.1 Primary Solid Button (Authoritative Action)

Digunakan untuk aksi utama (CTA penting, Tambah Tugas, Simpan Perubahan):

```text
Background: #263238
Text: #FFFFFF
Icon: #FFFFFF (stroke-current, kontras tajam WCAG AAA)
Radius: 12px (rounded-xl)
Height: 38–42px
Hover: #1E293B
Active: scale(0.98)
```

## 15.2 Pastel Accent Buttons (Dual & Contextual Actions)

Digunakan untuk aksi pelengkap atau aksi kategori (misal: Tambah Acara di samping Tambah Tugas):

- **Pastel Sage Green**: `bg-[#B9DCA9]/25 hover:bg-[#B9DCA9]/45 text-[#3D6420] border border-[#B9DCA9]`
- **Pastel Cream**: `bg-[#FFEAAB]/35 hover:bg-[#FFEAAB]/55 text-[#7A5D00] border border-[#FFEAAB]`
- **Pastel Pink**: `bg-[#FCBACB]/25 hover:bg-[#FCBACB]/45 text-[#7D4050] border border-[#FCBACB]`

## 15.3 Secondary & Outline Button

```text
Background: #FFFFFF
Border: #E8E8E8 (hover: #CBD5E1)
Text: #263238
Radius: 12px
```

## 15.4 Anti-Gradient Rule

Hindari gradasi neon/jenuh seperti `from-rose-500 to-pink-600` pada tombol UI. Gunakan warna solid berbobot atau paduan pastel transparan yang tenang, bersih, dan berkelas.

---

# 16. Inputs

Default:

```text
Background: #FFFFFF
Border: #E8E8E8
Radius: 12px
Height: 42–46px
```

Focus:

```text
Border: #FC9FB1
Ring: rgba(252, 186, 203, 0.25)
```

Placeholder:

```text
#98A2B3
```

---

# 17. Cards

Cards should feel soft and clean.

```text
Background: #FFFFFF
Border: #EEEEEE
Radius: 16px
Shadow: subtle
Padding: 20–24px
```

Invitation cards may use stronger visual decoration.

Dashboard cards should remain restrained.

---

# 18. Badges / Status

### Success

```text
Background: #B9DCA9
Text: #3D6420
```

### Pending

```text
Background: #FFEAAB
Text: #7A5D00
```

### Primary

```text
Background: #FCBACB
Text: #7D4050
```

### Error

```text
Background: #FBE1E7
Text: #B83D58
```

---

# 19. Navigation

## Dashboard Navigation

Navigasi sidebar dashboard KisahMagis dirancang bersih, terstruktur, dan memisahkan secara jelas antara pilar **Undangan Digital** dan **Perencanaan Acara (Planning)** tanpa mengurangi item navigasi maupun informasi:

```text
┌──────────────────────────────────────┐
│ Brand Logo                           │
├──────────────────────────────────────┤
│ Couple Card (Live/Draft, Slug, Web)  │
├──────────────────────────────────────┤
│ Ringkasan (Overview)                 │
│                                      │
│ • UNDANGAN DIGITAL                   │
│   - Profil Pernikahan                │
│   - Editor Undangan                  │
│   - Galeri & Musik                   │
│   - Buku Tamu & RSVP                 │
│                                      │
│ • PERENCANAAN ACARA                  │
│   - Wedding Planner                  │
│   - Seserahan & Hantaran             │
│   - Anggaran & Biaya                 │
│   - Direktori Vendor                 │
│                                      │
│ PENGATURAN                           │
│   - Pengaturan & Akun                │
├──────────────────────────────────────┤
│ User Profile & Logout                │
└──────────────────────────────────────┘
```

### Unified Active State:
Semua item navigasi aktif menggunakan satu warna standar brand yang konsisten, bersih, dan berbobot tanpa switching warna artifisial antar-seksi:
- **Background**: `rgba(252, 186, 203, 0.20)` (`bg-[#FCBACB]/20`)
- **Border**: `rgba(252, 186, 203, 0.60)`
- **Text**: `#7D4050` (Pink Deep, WCAG AA 5.5:1+)
- **Icon**: `#832B42` (Stroke-current dengan kontras tajam)
- **Inactive Item**: `text-[#667085]` dengan hover `text-[#263238] bg-neutral-100/70`

---

# 20. Dashboard Layout

Recommended desktop layout:

```text
┌────────────────────────────────────────────────────┐
│ Topbar                                              │
├───────────────┬────────────────────────────────────┤
│               │                                    │
│ Sidebar       │ Main Content                       │
│               │                                    │
│               │ Page Header                        │
│               │                                    │
│               │ Cards                              │
│               │                                    │
│               │ Content                            │
│               │                                    │
└───────────────┴────────────────────────────────────┘
```

Content max-width:

```text
1200–1400px
```

---

# 21. Dashboard Home

Recommended hierarchy:

```text
Hello, Andi & Sari

Wedding Countdown
        ↓
Summary Cards
        ↓
Upcoming Tasks
        ↓
RSVP Overview
        ↓
Budget Summary
        ↓
Recent Activity
```

Do not overwhelm the first screen with charts.

---

# 22. Wedding Planner UI

Planner should visually resemble a lightweight Kanban board.

```text
┌─────────────┬─────────────┬─────────────┐
│ TO DO       │ IN PROGRESS │ DONE        │
├─────────────┼─────────────┼─────────────┤
│ Task        │ Task        │ Task        │
│ Task        │ Task        │ Task        │
│             │             │             │
│ + Add task  │ + Add task  │ + Add task  │
└─────────────┴─────────────┴─────────────┘
```

Use:

- soft backgrounds
- compact cards
- clear due dates
- priority indicators
- minimal decoration

---

# 23. Invitation Design System

Invitation is the emotional center of KisahMagis.

Each theme should follow the shared design tokens but can define:

- color variations
- decorative elements
- layout
- animation
- typography pairing
- gallery style
- section ordering

## Common sections

```text
Cover
Couple
Opening
Story
Event
Countdown
Gallery
Gift
RSVP
Guestbook
Closing
```

Not every theme must use every section.

---

# 24. Invitation Hero

Recommended:

```text
┌───────────────────────────────┐
│                               │
│       THE WEDDING OF          │
│                               │
│        Andi & Sari            │
│                               │
│      20 December 2026         │
│                               │
│       [ Open Invitation ]     │
│                               │
└───────────────────────────────┘
```

Couple name:

```text
Quintessential
```

Supporting text:

```text
Inter
```

---

# 25. Invitation Section Pattern

Each section should have:

```text
Section Label
      ↓
Decorative Element
      ↓
Heading
      ↓
Content
      ↓
Optional CTA
```

Example:

```text
OUR STORY

A little story
about us

Short paragraph...

♡
```

---

# 26. Invitation Gallery

Gallery layouts:

- Grid
- Masonry
- Polaroid
- Carousel
- Featured image

Default recommendation:

```text
Mobile → 2-column grid
Desktop → 3-column / masonry
```

Images must be lazy loaded.

---

# 27. Music Player

Music control should be unobtrusive.

Example:

```text
[ ♫ ] Playing
```

Possible placement:

```text
top-right floating control
```

Do not autoplay audio without considering browser restrictions.

User interaction may be required before audio can play.

---

# 28. RSVP Form

RSVP should be extremely simple.

```text
Nama
[________________]

Kehadiran
( ) Hadir
( ) Tidak hadir

Jumlah tamu
[-] 2 [+]

Ucapan
[________________]

[ Kirim RSVP ]
```

Success state:

```text
♡ Terima kasih telah mengonfirmasi kehadiran.
```

---

# 29. Guestbook

Guestbook should visually feel like a collection of messages.

```text
┌─────────────────────────┐
│ Andi                    │
│ Semoga bahagia selalu!  │
│                         │
│ 20 Dec 2026             │
└─────────────────────────┘
```

Cards can use subtle pink/cream variations.

---

# 30. Invitation Editor

The editor should use a split layout.

```text
┌─────────────────────────────────────────────┐
│ Toolbar                                     │
├─────────────────┬───────────────────────────┤
│ Settings        │                           │
│                 │                           │
│ Theme           │       LIVE PREVIEW        │
│ Colors          │                           │
│ Typography      │       Invitation          │
│ Sections        │                           │
│ Gallery         │                           │
│ Music           │                           │
│                 │                           │
└─────────────────┴───────────────────────────┘
```

On mobile:

```text
Settings
   ↓
Preview
```

or use a tab:

```text
[ Edit ] [ Preview ]
```

---

# 31. Design Tokens

Recommended token structure:

```ts
export const colors = {
  brand: {
    primary: "#FCBACB",
    secondary: "#FC9FB1",
    background: "#FCFCFC",
    greenSoft: "#B9DCA9",
    green: "#74A12E",
    yellow: "#FFEAAB",
  },

  semantic: {
    text: "#263238",
    textSecondary: "#667085",
    border: "#E8E8E8",
    error: "#D9536F",
  },
}
```

Spacing:

```ts
export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  "2xl": "48px",
  "3xl": "64px",
}
```

Radius:

```ts
export const radius = {
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  full: "9999px",
}
```

---

# 32. Tailwind Theme Mapping

The design tokens should be mapped into Tailwind rather than scattering hex values throughout components.

Example conceptual mapping:

```ts
colors: {
  kisah: {
    primary: "#FCBACB",
    secondary: "#FC9FB1",
    background: "#FCFCFC",
    green: "#74A12E",
    greenSoft: "#B9DCA9",
    yellow: "#FFEAAB",
  }
}
```

Usage:

```tsx
<button className="bg-kisah-primary rounded-md">
  Buat Undangan
</button>
```

Avoid:

```tsx
<div style={{ background: "#FCBACB" }}>
```

unless a dynamic theme value genuinely requires inline styles.

---

# 33. CSS Variables

Brand tokens should ideally become CSS variables.

Example:

```css
:root {
  --color-brand-primary: #FCBACB;
  --color-brand-secondary: #FC9FB1;
  --color-brand-background: #FCFCFC;

  --color-brand-green: #74A12E;
  --color-brand-green-soft: #B9DCA9;
  --color-brand-yellow: #FFEAAB;

  --color-text-primary: #263238;
  --color-text-secondary: #667085;
  --color-border: #E8E8E8;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
}
```

This also makes theme customization easier.

---

# 34. Theme Architecture

KisahMagis should distinguish between:

```text
Global Design System
        │
        ├── Shared tokens
        ├── Shared components
        └── Shared UX rules

Invitation Theme
        │
        ├── Layout
        ├── Typography pairing
        ├── Decorative style
        ├── Section composition
        └── Theme-specific colors
```

Example:

```text
src/themes/
├── serenity/
│   ├── components/
│   ├── assets/
│   ├── schema.ts
│   ├── theme.ts
│   └── index.ts
│
├── bloom/
│   ├── components/
│   ├── assets/
│   ├── schema.ts
│   ├── theme.ts
│   └── index.ts
│
└── aurora/
```

---

# 35. Theme Configuration

Theme configuration should be data-driven.

Example:

```json
{
  "colors": {
    "primary": "#FCBACB",
    "secondary": "#FC9FB1",
    "background": "#FCFCFC"
  },
  "typography": {
    "heading": "Quintessential",
    "body": "Inter"
  },
  "sections": [
    {
      "type": "cover",
      "enabled": true
    },
    {
      "type": "story",
      "enabled": true
    },
    {
      "type": "gallery",
      "enabled": true,
      "layout": "masonry"
    }
  ]
}
```

---

# 36. Responsive Design

## Breakpoints

Recommended:

```text
Mobile      < 640px
Tablet      640–1024px
Desktop     > 1024px
Large       > 1280px
```

## Invitation

Design mobile-first.

Priority:

```text
Mobile
↓
Tablet
↓
Desktop
```

## Dashboard

Desktop-first is acceptable for complex productivity screens, but must remain usable on tablet/mobile.

---

# 37. Mobile Navigation

Dashboard mobile:

```text
┌─────────────────────────┐
│ Logo             ☰      │
├─────────────────────────┤
│                         │
│ Content                 │
│                         │
└─────────────────────────┘
```

Bottom navigation may be considered for frequently accessed actions:

```text
Home | Invitation | Planner | Guests | More
```

Do not introduce bottom navigation until user testing shows it is useful.

---

# 38. Accessibility

Minimum requirements:

- Text must have sufficient contrast.
- Interactive elements must have visible focus state.
- Buttons must have accessible labels.
- Images must have alt text where meaningful.
- Decorative images should use empty alt attributes.
- Form inputs require labels.
- Keyboard navigation must work in dashboard.
- Do not communicate status using color alone.

Important:

The pastel palette is primarily decorative. Functional text should use sufficiently dark colors.

---

# 39. Animation

Animation should be:

- subtle
- slow enough to feel elegant
- optional where possible
- non-blocking

Recommended:

```text
fade
slide-up
soft-scale
float
```

Typical duration:

```text
150–300ms
```

Invitation themes may use longer decorative animation:

```text
400–800ms
```

Avoid excessive animation on dashboard.

Respect:

```text
prefers-reduced-motion
```

---

# 40. Loading States

Use:

- Skeleton
- Soft shimmer
- Spinner only for short actions

Example:

```text
┌─────────────────────────────┐
│ ███████████████             │
│ █████████                   │
│                             │
│ ███████████████████         │
└─────────────────────────────┘
```

Avoid large blocking loaders.

---

# 41. Empty States

Empty states should be friendly and slightly emotional.

Example:

```text
        ♡

Belum ada tamu

Tambahkan daftar tamu untuk mulai
mengelola undanganmu.

[ Tambah Tamu ]
```

Use simple line illustration when useful.

---

# 42. Error States

Error messages should be:

- clear
- human
- actionable
- non-technical

Avoid:

```text
500 Internal Server Error
```

as the only message.

Prefer:

```text
Ups, terjadi sesuatu.

Kami belum bisa menyimpan perubahan.
Coba lagi dalam beberapa saat.

[ Coba Lagi ]
```

Technical error details should be logged separately.

---

# 43. Toast / Notification

Toast should be compact.

Success:

```text
✓ Undangan berhasil disimpan
```

Warning:

```text
! Perubahan belum dipublikasikan
```

Error:

```text
× Gagal menyimpan perubahan
```

Use brand accents subtly.

---

# 44. Tables

Dashboard tables should use:

- white background
- subtle borders
- compact row height
- clear column headers
- hover state
- responsive behavior

On mobile, transform tables into cards where appropriate.

---

# 45. Forms

Forms should:

1. Group related fields.
2. Have clear labels.
3. Explain required data.
4. Validate near the input.
5. Preserve user input after errors.
6. Use clear submit states.

Example:

```text
Wedding Information

Nama mempelai pria
[________________]

Nama mempelai wanita
[________________]

Tanggal pernikahan
[________________]

[ Simpan ]
```

---

# 46. Photography Direction

Photography should feel:

- warm
- natural
- intimate
- authentic
- soft
- elegant

Avoid overly saturated images.

Images can be enhanced with:

- soft pink overlay
- warm tone
- subtle grain
- rounded clipping

But avoid applying a filter that makes user-uploaded wedding photos look unnatural.

---

# 47. Illustration & Pattern Direction

Possible patterns:

```text
♡ ♡ ♡
🌿 subtle leaves
small flowers
dots
soft organic shapes
```

Use low visual density.

Pattern opacity should generally be low enough that content remains dominant.

---

# 48. Landing Page Structure

Recommended:

```text
Hero
 ↓
What is KisahMagis?
 ↓
Invitation Showcase
 ↓
Wedding Planner
 ↓
Guest Management
 ↓
Theme Gallery
 ↓
How It Works
 ↓
Pricing
 ↓
CTA
 ↓
Footer
```

Hero example:

```text
KisahMagis

Satu tempat untuk merangkai
kisah dan persiapan pernikahanmu.

[ Mulai Membuat Undangan ]
```

---

# 49. Design System Component Inventory

Initial reusable components:

```text
Button
Input
Textarea
Select
Checkbox
Radio
Switch
Badge
Card
Modal
Drawer
Dropdown
Tabs
Toast
Tooltip
Avatar
Breadcrumb
Pagination
Table
DatePicker
FileUpload
Progress
Skeleton
EmptyState
ErrorState
```

Invitation-specific:

```text
InvitationCover
CoupleSection
StorySection
EventSection
Countdown
Gallery
MusicPlayer
GiftSection
RSVPForm
Guestbook
InvitationFooter
```

Planner-specific:

```text
PlannerBoard
PlannerColumn
TaskCard
TaskForm
PriorityBadge
DueDate
```

---

# 50. Component Design Rule

Components should be:

- reusable
- composable
- accessible
- theme-aware
- independent from business logic where possible

Avoid giant components such as:

```text
WeddingDashboard.tsx
```

containing hundreds of lines of unrelated UI and logic.

Prefer:

```text
Dashboard
├── DashboardHeader
├── WeddingSummary
├── CountdownCard
├── RSVPCard
├── BudgetCard
└── TaskOverview
```

---

# 51. Design File Organization

Recommended:

```text
docs/
├── PRD.md
├── DESIGN.md
└── ARCHITECTURE.md

src/
├── assets/
│   └── brand/
├── components/
│   ├── ui/
│   ├── layout/
│   └── wedding/
├── themes/
├── styles/
│   ├── tokens.css
│   ├── globals.css
│   └── typography.css
└── lib/
```

---

# 52. Design-to-Code Workflow

Recommended workflow:

```text
Design requirement
       ↓
Design token
       ↓
Reusable component
       ↓
Page composition
       ↓
Responsive implementation
       ↓
Accessibility check
       ↓
Visual QA
```

Do not create a one-off style before checking whether an existing token/component already solves the requirement.

---

# 53. Design QA Checklist

Before merging UI changes:

### Brand

- [ ] Correct logo
- [ ] Correct brand colors
- [ ] Typography follows system
- [ ] No accidental colors

### Layout

- [ ] Correct spacing
- [ ] Responsive
- [ ] No overflow
- [ ] Consistent alignment

### Components

- [ ] Button states
- [ ] Input states
- [ ] Loading state
- [ ] Error state
- [ ] Empty state

### Accessibility

- [ ] Keyboard accessible
- [ ] Focus visible
- [ ] Labels present
- [ ] Alt text
- [ ] Contrast acceptable

### Performance

- [ ] Images optimized
- [ ] Lazy loading where appropriate
- [ ] No unnecessary animation
- [ ] No oversized assets

---

# 54. Design Principles for Developers

1. **Use tokens, not arbitrary values.**
2. **Reuse components before creating new ones.**
3. **Keep invitation and dashboard visual expression distinct but related.**
4. **Prefer whitespace over decoration.**
5. **Use Quintessential for emotion, not for dense UI.**
6. **Use line icons consistently.**
7. **Keep pastel colors supportive, not dominant everywhere.**
8. **Never compromise readability for aesthetics.**
9. **Use animation to create atmosphere, not distraction.**
10. **Build themes on top of a shared design system.**

---

# 55. Final Visual Direction

The desired KisahMagis visual language can be summarized as:

```text
ROMANTIC
   +
ELEGANT
   +
SOFT
   +
PERSONAL
   +
SYSTEMATIC
   =
KISAHMAGIS
```

The brand should feel like a wedding invitation that evolved into a modern digital product.

The **public experience** should make users feel:

> “This is our story.”

The **dashboard experience** should make users feel:

> “Everything is organized.”

The design system exists to connect both experiences into one coherent product.

---

# 56. Reference Brand Palette

```text
#FCBACB  ████████  Primary Pink
#FCFCFC  ████████  Off White
#FC9FB1  ████████  Secondary Pink
#B9DCA9  ████████  Pastel Green
#74A12E  ████████  Green
#FFEAAB  ████████  Cream Yellow
```

Primary brand font:

```text
Quintessential
```

UI font:

```text
Inter
```

Logo:

```text
KisahMagis Heart Line Mark
```

---

# 57. Relationship to PRD

This document complements:

```text
PRD.md
```

The PRD defines:

- What the product does
- Why it exists
- Who uses it
- Features
- Architecture
- Technology
- Product scope

This document defines:

- How the product looks
- How components behave visually
- How the brand is expressed
- How UI should be implemented consistently

Together:

```text
PRD.md
   │
   ├── Product Requirements
   ├── Architecture
   └── Features
          │
          ▼
DESIGN.md
   │
   ├── Visual System
   ├── Components
   ├── UX Rules
   └── Design Tokens
          │
          ▼
       CODEBASE
```

---

# 58. Source of Truth

When visual implementation decisions conflict, use this priority:

```text
1. Final approved logo asset
2. Design tokens
3. Component rules
4. Theme configuration
5. Individual page styling
```

A page-specific design should not override the global system without a documented reason.

---

# 59. Versioning

Design documentation follows semantic versioning:

```text
Major
→ major brand/design change

Minor
→ new component or design capability

Patch
→ correction or clarification
```

Current:

```text
Design System v1.0
```

---

# 60. Theme Development

Untuk panduan teknis bagi developer dalam membuat tema kustom menggunakan Dynamic Theme Engine, silakan rujuk ke dokumen berikut:
[Theme Development Guide](./THEME_DEVELOPMENT.md)
