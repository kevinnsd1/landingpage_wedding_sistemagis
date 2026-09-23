# KisahMagis — Digital Wedding Platform & Management System

> **Platform digital wedding all-in-one:** Menggabungkan keindahan *Digital Wedding Invitation* interaktif dengan kekuatan *Sistem Manajemen Pernikahan* (Tamu, RSVP, Task Planner Kanban, Seserahan, Anggaran, & Vendor).

---

## 📖 Daftar Isi

1. [Tentang KisahMagis](#-tentang-kisahmagis)
2. [Fitur Utama](#-fitur-utama)
3. [Arsitektur Sistem & Monorepo](#-arsitektur-sistem--monorepo)
4. [Indeks Dokumentasi Proyek (`/Docs`)](#-indeks-dokumentasi-proyek-docs)
5. [Tech Stack](#-tech-stack)
6. [Prasyarat & Instalasi (Getting Started)](#-prasyarat--instalasi-getting-started)
7. [Environment Variables](#-environment-variables)
8. [Perintah yang Tersedia (NPM Scripts)](#-perintah-yang-tersedia-npm-scripts)
9. [Panduan Pengembangan Tema](#-panduan-pengembangan-tema)
10. [Troubleshooting Umum](#-troubleshooting-umum)

---

## 💍 Tentang KisahMagis

**KisahMagis** dikembangkan oleh **Sistemagis** untuk mentransformasi pengalaman pernikahan digital. Kebanyakan platform hanya menawarkan undangan berbasis *template* kaku. KisahMagis hadir dengan dua pilar utama:

- **Public Experience:** Undangan digital yang personal, romantis, estetik, responsif, dan interaktif (dukungan animasi modern, musik, video latar, RSVP real-time, dan amplop digital).
- **Product Experience (Organizer/Dashboard):** Ruang kerja terstruktur bagi calon pengantin untuk mengelola daftar tamu, checklist persiapan pernikahan bergaya *Kanban*, pencatatan baki *Seserahan*, vendor, dan anggaran dalam satu antarmuka yang bersih dan praktis.

---

## ✨ Fitur Utama

- **🎨 Dynamic Theme Engine:** Arsitektur tema modular berbasis komponen React murni. Setiap tema memiliki kebebasan layout, gaya visual, animasi, dan dapat meminta input aset spesifik (*Video Cover*, *Parallax Photo*, *Puisi*) via `customFields`.
- **💌 Undangan Publik & RSVP:** Akses undangan melalui URL slug personal (`/:slug`), personalisasi nama tamu (`?to=Nama+Tamu`), konfirmasi kehadiran (RSVP), amplop digital / hadiah fisik, serta buku tamu & ucapan online.
- **📋 Wedding Planner (Kanban Board):** Manajemen tahapan acara pernikahan (Persiapan Awal, H-30, H-7, Hari H, Pasca Acara) dengan sistem kartu *drag-and-drop* atau status toggle.
- **🎁 Manajemen Seserahan:** Katalog dan checklist baki hantaran/seserahan lengkap dengan status pengerjaan, kategori, dan estimasi biaya.
- **👥 Manajemen Tamu & Kuota:** Pengelompokan tamu (Keluarga, Sahabat, VIP, Kolega), status undangan via WhatsApp, dan monitoring kehadiran real-time.
- **🔐 Multi-Tenant & Keamanan:** Isolasi data antar-pengantin (*wedding workspace*), proteksi token, sanitasi input, dan arsitektur ramah deployment rumahan via Cloudflare Tunnel.

---

## 🏛️ Arsitektur Sistem & Monorepo

KisahMagis menggunakan struktur **Monorepo (NPM Workspaces)** yang memisahkan aplikasi (*apps*) dan pustaka bersama (*packages*):

```text
Kisahmagis apps/
├── apps/
│   ├── api/                      # Backend REST API (Hono + Node.js)
│   │   ├── src/
│   │   │   ├── db/               # Skema Drizzle ORM, migrasi, dan seeders
│   │   │   ├── server/
│   │   │   │   ├── routes/       # Endpoint API (auth, weddings, guests, planner, themes, dll)
│   │   │   │   └── index.ts      # Server entry point & middleware (Port 3001)
│   │   └── package.json
│   │
│   └── web/                      # Frontend Application (Vite + React 18)
│       ├── src/
│       │   ├── components/       # UI Komponen & Layout (Navbar, MediaUploader, dll)
│       │   ├── themes/           # Registry tema undangan (Aurora, Bloom, dll)
│       │   ├── views/            # Halaman Dashboard, Editor, Auth, & Public Invitation
│       │   └── lib/              # Client API helper & state utilities
│       ├── vite.config.ts        # Dev server & reverse proxy ke API (Port 3000)
│       └── package.json
│
├── packages/
│   ├── types/                    # Shared TypeScript interfaces (Wedding, Guest, Theme, dll)
│   ├── validation/               # Shared Zod validation schemas
│   └── ui/                       # Reusable base UI primitives
│
├── Docs/                         # Dokumentasi Arsitektur, Desain, & Keamanan (Wajib Dibaca)
├── docker-compose.yml            # Konfigurasi container PostgreSQL
├── package.json                  # Root package.json (Orchestrator scripts)
└── tsconfig.json
```

---

## 📚 Indeks Dokumentasi Proyek (`/Docs`)

Di dalam direktori [`Docs/`](file:///d:/Work/Sistemagis/Kisahmagis/Kisahmagis%20apps/Docs), terdapat dokumentasi acuan penting yang menjadi *single source of truth*:

| Dokumen | Deskripsi & Fokus Utama |
| :--- | :--- |
| **[`PRD_KisahMagis.md`](file:///d:/Work/Sistemagis/Kisahmagis/Kisahmagis%20apps/Docs/PRD_KisahMagis.md)** | **Product Requirements Document (PRD):** Visi produk, persona pengguna, spesifikasi lengkap modul (Undangan, RSVP, Planner, Guestbook, Seserahan), model data, dan *roadmap* rilis. |
| **[`DESIGN_KisahMagis.md`](file:///d:/Work/Sistemagis/Kisahmagis/Kisahmagis%20apps/Docs/DESIGN_KisahMagis.md)** | **Design System & UI Guidelines:** Standar visual identity, palet warna, tipografi, radius sudut, bayangan, komponen tombol, pedoman kontras, serta aturan transisi desain ke kode. |
| **[`THEME_DEVELOPMENT.md`](file:///d:/Work/Sistemagis/Kisahmagis/Kisahmagis%20apps/Docs/THEME_DEVELOPMENT.md)** | **Panduan Pembuatan Tema Baru:** Arsitektur *Dynamic Theme Engine*, cara mendaftarkan `customFields`, siklus hidup komponen tema React, serta integrasi tabel `packages` dan `themes` di database. |
| **[`SECURITY.md`](file:///d:/Work/Sistemagis/Kisahmagis/Kisahmagis%20apps/Docs/SECURITY.md)** | **Security & Hardening Guide:** Analisis ancaman (*threat model*), isolasi multi-tenant, sanitasi file upload, perlindungan privasi data tamu (PII), dan deployment aman via Cloudflare Tunnel. |

---

## 🛠️ Tech Stack

### Frontend (`apps/web`)
- **Framework:** React 18 + TypeScript + Vite 6
- **Routing:** React Router v7
- **Styling:** TailwindCSS 3 + Lucide Icons + Canvas Confetti
- **State & Data Fetching:** Native fetch wrapper dengan reverse-proxy Vite

### Backend (`apps/api`)
- **Runtime & Server:** Node.js v22 + Hono Framework
- **ORM & Database:** Drizzle ORM + PostgreSQL 15 (Docker)
- **Validasi:** Zod
- **Autentikasi & Keamanan:** Bcrypt.js + JWT / Session token

---

## 🚀 Prasyarat & Instalasi (Getting Started)

### 1. Prasyarat Sistem
- **Node.js:** Versi `20.x` atau `22.x` (Direkomendasikan Node.js v22)
- **Docker & Docker Compose:** Untuk menjalankan PostgreSQL lokal
- **Git**

### 2. Clone & Install Dependensi
```bash
git clone <repository-url>
cd "Kisahmagis apps"
npm install
```

### 3. Setup Konfigurasi `.env`
Salin file template lingkungan:
```bash
cp .env.example .env
```
Pastikan variabel database sesuai dengan konfigurasi `docker-compose.yml`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password123
DB_NAME=kisahmagis
DATABASE_URL=postgresql://postgres:password123@localhost:5432/kisahmagis
PORT=3001
JWT_SECRET=supersecret-kisahmagis-key
```

### 4. Jalankan Database Container
Nyalakan container PostgreSQL:
```bash
docker-compose up -d
```
*Pastikan container berstatus healthy pada port 5432.*

### 5. Inisialisasi Skema Database & Seeding
Terapkan skema tabel dan isi data awal:
```bash
# Push skema Drizzle ke PostgreSQL
npm run db:push

# (Opsional) Jalankan seeding tema dan paket
npx tsx apps/api/seedThemes.ts
```

### 6. Jalankan Server Pengembangan
Jalankan aplikasi Frontend dan Backend sekaligus:
```bash
npm run dev
```

Aplikasi dapat diakses melalui browser:
- **Frontend App:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:3001/api/health](http://localhost:3001/api/health)
- **Akun Demo Cepat:** Klik tombol **"Masuk dengan Akun Demo"** di halaman login.

---

## ⌨️ Perintah yang Tersedia (NPM Scripts)

Dijalankan dari root folder proyek:

| Perintah | Fungsi |
| :--- | :--- |
| `npm run dev` | Menjalankan Frontend (`web`) dan Backend (`api`) secara paralel via `concurrently`. |
| `npm run dev:web` | Hanya menjalankan server Vite frontend (`apps/web`). |
| `npm run dev:api` | Hanya menjalankan server Hono API (`apps/api`) dengan *file watcher*. |
| `npm run db:push` | Mendorong perubahan skema Drizzle ke database PostgreSQL. |
| `npm run db:generate` | Menghasilkan file migrasi SQL baru dari skema TypeScript. |
| `npm run build` | Melakukan build produksi untuk semua workspace yang mendukung. |

---

## 🎨 Panduan Pengembangan Tema

Untuk membuat tema undangan baru:
1. Buat direktori tema di `apps/web/src/themes/<nama-tema>/`.
2. Buat file `theme.ts` yang mengekspor metadata dan `customFields` (misal kebutuhan video, quotes, dll).
3. Buat file `<NamaTema>Theme.tsx` sebagai komponen React murni penerima `ThemeProps`.
4. Daftarkan di `apps/web/src/themes/index.ts` ke dalam array `availableThemes`.
5. Masukkan entri tema ke database (tabel `themes`) melalui seeder agar tema dapat dikelola hak akses dan status kustomnya oleh admin.

*Selengkapnya, pelajari panduan mendalam di [Docs/THEME_DEVELOPMENT.md](file:///d:/Work/Sistemagis/Kisahmagis/Kisahmagis%20apps/Docs/THEME_DEVELOPMENT.md).*

---

## 🔧 Troubleshooting Umum

### 1. `ECONNREFUSED` atau `500 Internal Server Error` saat Login/Demo
- **Penyebab:** Container Docker PostgreSQL belum menyala saat API mencoba start, atau server API belum aktif di port 3001.
- **Solusi:**
  1. Pastikan Docker aktif: jalankan `docker-compose up -d`.
  2. Pastikan port 5432 aktif: `netstat -ano | findstr 5432`.
  3. Hentikan `npm run dev` (`Ctrl + C`), lalu jalankan kembali `npm run dev`.

### 2. Modifikasi Skema Database Tidak Terlihat
- **Solusi:** Jalankan `npm run db:push` di terminal untuk menyinkronkan definisi `apps/api/src/db/schema.ts` ke database PostgreSQL.

---

## 📄 Lisensi & Kredit

Hak Cipta © 2026 **KisahMagis** by **Sistemagis**. Seluruh hak cipta dilindungi undang-undang.
