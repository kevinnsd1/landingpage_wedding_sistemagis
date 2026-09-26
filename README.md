# 💍 KisahMagis — Digital Wedding Platform & Management System

> **Platform Digital Wedding & Sistem Manajemen Pernikahan Terintegrasi**  
> Menggabungkan keindahan *Undangan Digital Interaktif* (Public Experience) dengan kekuatan *Sistem Manajemen Pernikahan Lengkap* (Organizer Dashboard: Buku Tamu, RSVP, Task Planner Kanban Drag-and-Drop, Seserahan, Anggaran, & Vendor).

---

## ⚡ Quick Start (Jalankan dalam 5 Menit)

Bagi rekan developer atau **AI Coding Agent** yang baru saja melakukan clone repositori ini, berikut adalah urutan perintah ringkas untuk langsung menjalankannya:

```bash
# 1. Clone repositori & masuk ke direktori
git clone <repository-url>
cd "Kisahmagis apps"

# 2. Install seluruh dependensi monorepo
npm install

# 3. Siapkan file konfigurasi environment
cp .env.example .env

# 4. Nyalakan database PostgreSQL via Docker
docker compose up -d

# 5. Sinkronisasi skema tabel Drizzle ke PostgreSQL
npm run db:push

# 6. Jalankan database seeder (Paket tema, katalog tema, & data demo lengkap)
npm run db:seed

# 7. Jalankan server pengembangan (Frontend & Backend sekaligus)
npm run dev
```

### 🌐 Akses Aplikasi & Kredensial Demo
Setelah `npm run dev` berjalan:
- **Frontend Web App:** [http://localhost:3000](http://localhost:3000)
- **Backend REST API:** [http://localhost:3001](http://localhost:3001) *(Healthcheck: `http://localhost:3001/api/health`)*
- **Akun Demo Bawaan:**
  - **Email:** `andi@kisahmagis.id`
  - **Password:** `password123`
  - *(Atau cukup klik tombol **"Masuk dengan Akun Demo"** di halaman login)*
- **Contoh Undangan Tamu Personal:** [http://localhost:3000/?wedding=andi-sari&to=BudiS88](http://localhost:3000/?wedding=andi-sari&to=BudiS88)

---

## 📖 Daftar Isi

1. [Fitur Utama & Keunggulan](#-fitur-utama--keunggulan)
2. [Tech Stack](#-tech-stack)
3. [Arsitektur Monorepo](#-arsitektur-monorepo)
4. [Panduan Instalasi Langkah-demi-Langkah](#-panduan-instalasi-langkah-demi-langkah)
5. [Konfigurasi Environment Variables](#-konfigurasi-environment-variables)
6. [Operasional Database (Docker, Push, & Seed)](#-operasional-database-docker-push--seed)
7. [Daftar Perintah (NPM Scripts)](#-daftar-perintah-npm-scripts)
8. [Standar Desain & Pedoman Kode](#-standar-desain--pedoman-kode)
9. [Panduan untuk AI Coding Agent](#-panduan-untuk-ai-coding-agent)
10. [Troubleshooting & FAQ](#-troubleshooting--faq)
11. [Indeks Dokumentasi Lengkap (`/Docs`)](#-indeks-dokumentasi-lengkap-docs)

---

## ✨ Fitur Utama & Keunggulan

### 1. 💌 Public Invitation Experience (Undangan Digital)
- **Slug Personal & Tautan Tamu Unik:** Format URL ramah SEO `/:slug` dengan personalisasi nama penerima (`?to=TokenTamu`).
- **Dynamic Theme Engine:** Tema React modular (Aurora Minimal, Floral Bloom, Cinematic Video, Full Custom).
- **Interaksi Lengkap:** Sampul amplop animasi, musik latar otomatis dengan floating controller, hitung mundur (countdown), galeri foto interaktif, kisah cinta (love story), integrasi Google Maps untuk lokasi akad & resepsi.
- **RSVP & Amplop Digital:** Konfirmasi kehadiran instan dan amplop digital via nomor rekening / dompet digital tanpa biaya perantara.

### 2. 👥 Buku Tamu & Manajemen Undangan (Organizer Dashboard)
- **Segmentasi Pihak Mempelai:** Pengelompokan tamu berdasarkan *Mempelai Pria*, *Mempelai Wanita*, atau *Kedua Mempelai*.
- **Format Undangan:** Klasifikasi tamu penerima *Undangan Digital*, *Undangan Fisik (Cetak)*, maupun *Keduanya*.
- **Kategori / Grup Tamu Bebas Pink:** Pewarnaan tematik eksklusif per kategori (*Keluarga* = Indigo, *Sahabat* = Sky, *Rekan Kerja* = Slate, *VIP* = Amber, *Lainnya* = Zinc) sehingga tidak bertabrakan dengan aksen warna mempelai wanita atau status RSVP.
- **Asisten WhatsApp Broadcast Mandiri:** Fitur broadcast undangan personal langsung dari nomor WhatsApp pengguna via URL Web API (`api.whatsapp.com/send`) tanpa perlu berlangganan WhatsApp API pihak ketiga (hemat biaya & anti-banned).

### 3. 📋 Wedding Planner Kanban Board
- **Manajemen Alur Kerja Fleksibel:** Kolom tahapan acara (Rencana, Diproses, Selesai) dengan fitur *drag-and-drop* antar kolom.
- **Pengaturan Skala Prioritas Atas-Bawah:** Kartu tugas dapat diurutkan ke atas atau ke bawah di dalam kolom untuk menentukan prioritas harian.
- **Timeline Rangkaian Hari-H:** Timeline detail mulai dari Akad Nikah, Temu Manten, hingga Resepsi.

### 4. 🎁 Katalog & Checklist Seserahan
- Pencatatan baki hantaran/seserahan pengantin lengkap dengan foto barang, status pengerjaan (Disiapkan, Dibungkus, Siap), kategori, dan total estimasi nilai.

### 5. 💰 Anggaran (Budget) & Vendor Tracker
- Monitoring pos pengeluaran real-time (Venue, Catering, MUA, Busana, Dokumentasi, dll), pelacakan uang muka (DP), sisa tagihan, dan kontak person vendor.

---

## 🛠️ Tech Stack

| Layer | Teknologi Utama | Deskripsi |
| :--- | :--- | :--- |
| **Monorepo** | NPM Workspaces | Manajemen multi-package terpusat tanpa dependensi eksternal berat |
| **Frontend** | React 18, Vite 6, TypeScript | Aplikasi web modern berperforma tinggi dengan HMR instan |
| **Styling** | TailwindCSS v3, Radix UI Primitives, Lucide Icons | Desain custom modern, responsif, dan bebas bloatware/slop |
| **Backend API** | Node.js (v20/v22), Hono Framework | Framework HTTP ultra-cepat, minimalis, dan type-safe |
| **ORM & DB** | Drizzle ORM, PostgreSQL 15 (Docker) | Skema type-safe end-to-end, migrasi SQL instan |
| **Validasi** | Zod (Shared Package) | Validasi payload konsisten antara frontend dan backend |
| **Autentikasi** | Session-based Cookie & Bcrypt.js | Autentikasi aman tanpa overhead JWT kompleks |

---

## 🏛️ Arsitektur Monorepo

```text
Kisahmagis apps/
├── apps/
│   ├── api/                      # Backend REST API (Hono + Drizzle)
│   │   ├── src/
│   │   │   ├── db/               # Skema PostgreSQL, koneksi Pool, & Seeder CLI
│   │   │   │   ├── index.ts      # Inisialisasi koneksi Drizzle ORM
│   │   │   │   ├── schema.ts     # Definisi tabel (users, weddings, guests, planner, dll)
│   │   │   │   └── seed.ts       # Runner seeder CLI (npm run db:seed)
│   │   │   ├── server/
│   │   │   │   ├── routes/       # Endpoint API (auth, weddings, guests, planner, dll)
│   │   │   │   ├── seed.ts       # Logika data demo awal
│   │   │   │   └── index.ts      # Server entry point (Port 3001)
│   │   └── package.json
│   │
│   └── web/                      # Frontend Application (React 18 + Vite)
│       ├── src/
│       │   ├── components/       # Komponen UI umum (Card, Modal, Button, Badge, dll)
│       │   ├── theme-engine/     # Dynamic Theme Renderer & Loader
│       │   ├── themes/           # Registry template tema (Aurora, Bloom, Cinematic, dll)
│       │   ├── views/            # Dashboard Views (GuestsTab, PlannerTab, BudgetTab, dll)
│       │   └── lib/              # Client API helper & utilitas
│       ├── vite.config.ts        # Reverse proxy `/api` ke port 3001
│       └── package.json
│
├── packages/
│   ├── types/                    # Shared TypeScript interfaces (Wedding, Guest, Task, dll)
│   ├── validation/               # Shared Zod schemas (validasi payload formulir & API)
│   └── ui/                       # Shared UI utility classes & primitives
│
├── Docs/                         # Dokumentasi Arsitektur, PRD, Desain, & Keamanan
├── docker-compose.yml            # Container PostgreSQL 15
├── .env.example                  # Template konfigurasi variabel lingkungan
├── package.json                  # Root orchestrator scripts
└── tsconfig.json                 # Base TypeScript compiler configuration
```

---

## 🚀 Panduan Instalasi Langkah-demi-Langkah

### Langkah 1: Prasyarat Sistem
Pastikan perangkat Anda telah terpasang:
- **Node.js:** Versi `>= 20.x` (Direkomendasikan **Node.js v22 LTS**)
- **npm:** Versi `>= 9.x`
- **Docker Desktop / Docker Engine:** Aktif dan berjalan
- **Git**

### Langkah 2: Clone & Install Dependensi
```bash
git clone <repository-url>
cd "Kisahmagis apps"
npm install
```
*Catatan: `npm install` di root akan otomatis menginstal seluruh dependensi di `apps/web`, `apps/api`, dan `packages/*` berkat fitur NPM Workspaces.*

### Langkah 3: Konfigurasi Environment File
Salin file template `.env.example` menjadi `.env`:
```bash
# Untuk Linux / macOS / Git Bash:
cp .env.example .env

# Untuk Windows PowerShell:
Copy-Item .env.example .env
```

Pastikan nilai default pada file `.env` sudah sesuai:
```env
NODE_ENV=development
PORT=3001
APP_URL=http://localhost:3000
API_URL=http://localhost:3001
SESSION_SECRET=super-secret-session-key-change-in-production

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password123
DB_NAME=kisahmagis
DB_SSL=false
```

### Langkah 4: Jalankan Database PostgreSQL via Docker
```bash
docker compose up -d
```
Untuk memastikan container database berjalan dengan baik:
```bash
docker ps --filter "name=kisahmagis-postgres"
```
*(Status container harus menunjukkan `Up` dan `healthy` pada port `0.0.0.0:5432->5432/tcp`).*

### Langkah 5: Terapkan Skema Database
Gunakan Drizzle Kit untuk mendorong struktur tabel dari `apps/api/src/db/schema.ts` ke PostgreSQL:
```bash
npm run db:push
```

### Langkah 6: Masukkan Data Awal (Database Seeding)
Jalankan seeder terpadu untuk mengisi paket tema, katalog tema, pengguna demo, dan data pernikahan lengkap:
```bash
npm run db:seed
```
Output terminal akan menampilkan konfirmasi data demo siap pakai.

### Langkah 7: Jalankan Server Aplikasi
```bash
npm run dev
```
Perintah ini akan menjalankan backend API (port 3001) dan frontend Vite (port 3000) secara serentak via `concurrently`.

---

## 🗄️ Operasional Database (Docker, Push, & Seed)

| Kebutuhan | Perintah | Keterangan |
| :--- | :--- | :--- |
| **Menyalakan Database** | `docker compose up -d` | Menjalankan container PostgreSQL di latar belakang |
| **Menghentikan Database** | `docker compose down` | Mematikan container database |
| **Menghapus Data Database Total** | `docker compose down -v` | Menghapus container sekaligus volume `pgdata` |
| **Sinkronisasi Skema** | `npm run db:push` | Mendorong perubahan file `schema.ts` ke database PostgreSQL |
| **Generate Migrasi SQL** | `npm run db:generate` | Menghasilkan file migrasi SQL baru di direktori `drizzle/` |
| **Seeding Data Bersih** | `npm run db:seed` | Mengisi ulang paket, tema, dan data pernikahan demo |

---

## ⌨️ Daftar Perintah (NPM Scripts)

Dijalankan langsung dari root direktori proyek:

```bash
# Menjalankan frontend dan backend secara paralel
npm run dev

# Hanya menjalankan frontend Vite (port 3000)
npm run dev:web

# Hanya menjalankan backend API Hono (port 3001) dengan file watcher
npm run dev:api

# Sinkronisasi skema tabel Drizzle ke PostgreSQL
npm run db:push

# Inisialisasi dan seeding database demo
npm run db:seed

# Membuat migrasi SQL baru
npm run db:generate

# Build produksi untuk seluruh workspace
npm run build
```

---

## 🎨 Standar Desain & Pedoman Kode

1. **Aturan Tipografi Font Quintessential:**
   - Font dekoratif `Quintessential` **HANYA** boleh digunakan untuk nama kedua mempelai (`groomName` & `brideName`) pada kartu undangan.
   - Seluruh teks antarmuka dashboard, tabel buku tamu, kartu metrik, formulir, dan tombol **WAJIB** menggunakan font sans-serif standar (`Geist Variable` atau `Inter`) demi menjaga keterbacaan (*readability*).
2. **Disiplin Warna (Bebas Pink pada Grup/Kategori):**
   - Warna **Rose / Soft Pink** (`bg-rose-50`, `text-rose-700`) **eksklusif** hanya digunakan untuk penanda *Mempelai Wanita*.
   - **Grup / Kategori** tidak boleh menggunakan pink:
     - `Keluarga` = Indigo
     - `Sahabat` = Sky
     - `Rekan Kerja` = Slate
     - `VIP` = Amber
     - `Lainnya` = Zinc
   - **Status RSVP** menggunakan warna semantik tegas:
     - `Hadir` = Emerald (Hijau)
     - `Tidak Hadir` = Red (Merah tegas, bukan rose-pink)
     - `Menunggu` = Amber (Kuning)
3. **Anti-Slop:**
   - Dilarang memasukkan dekorasi stiker atau emoji unicode ke dalam tombol, dropdown, badge status, atau kartu metrik. Gunakan ikon rapi dari `lucide-react`.

---

## 🤖 Panduan untuk AI Coding Agent

Jika Anda adalah agen AI yang membaca repositori ini untuk menyelesaikan instruksi tugas:
1. **Verifikasi Lingkungan:**
   - Cek apakah container database aktif dengan menjalankan `docker ps`.
   - Cek apakah type-check valid dengan menjalankan `npx tsc --noEmit` di `apps/web` dan `apps/api`.
2. **Koneksi Database:**
   - Backend membaca `.env` dari root direktori.
   - Skema database didefinisikan secara deklaratif di [`apps/api/src/db/schema.ts`](file:///d:/Work/Sistemagis/Kisahmagis/Kisahmagis%20apps/apps/api/src/db/schema.ts).
   - Setiap modifikasi kolom tabel di `schema.ts` harus selalu diikuti eksekusi `npm run db:push`.
3. **Validasi Model Bersama:**
   - Model TypeScript bersama terletak di [`packages/types/src/`](file:///d:/Work/Sistemagis/Kisahmagis/Kisahmagis%20apps/packages/types/src).
   - Skema validasi Zod bersama terletak di [`packages/validation/src/`](file:///d:/Work/Sistemagis/Kisahmagis/Kisahmagis%20apps/packages/validation/src).
4. **Preservasi Logika:**
   - Jangan mengubah flow reverse proxy di [`apps/web/vite.config.ts`](file:///d:/Work/Sistemagis/Kisahmagis/Kisahmagis%20apps/apps/web/vite.config.ts) yang mengarahkan panggilan `/api/*` ke `http://localhost:3001`.

---

## 🔧 Troubleshooting & FAQ

### 1. Database Error: `connect ECONNREFUSED 127.0.0.1:5432`
- **Penyebab:** Container Docker PostgreSQL belum berjalan atau port 5432 belum siap menerima koneksi.
- **Solusi:**
  ```bash
  docker compose up -d
  # Pastikan container berstatus Up:
  docker ps
  ```

### 2. Port Conflict: `port 5432 is already allocated`
- **Penyebab:** Terdapat service PostgreSQL lokal (di luar Docker) yang sedang memakai port 5432.
- **Solusi:**
  - Hentikan service PostgreSQL lokal pada services Windows / macOS, ATAU
  - Ubah `DB_PORT=5433` di file `.env` dan `docker-compose.yml`, lalu jalankan `docker compose up -d`.

### 3. Error saat Login Demo: `Email atau kata sandi tidak cocok`
- **Penyebab:** Database belum terisi data demo awal.
- **Solusi:** Jalankan seeder via terminal:
  ```bash
  npm run db:seed
  ```
  Lalu coba masuk kembali menggunakan email `andi@kisahmagis.id` dan password `password123`.

### 4. Perubahan Kolom Tabel Tidak Dikenali API
- **Penyebab:** Skema TypeScript telah diubah namun belum didorong ke database fisik PostgreSQL.
- **Solusi:** Jalankan perintah sinkronisasi:
  ```bash
  npm run db:push
  ```

---

## 📚 Indeks Dokumentasi Lengkap (`/Docs`)

Dokumentasi arsitektural mendalam tersedia di direktori [`Docs/`](file:///d:/Work/Sistemagis/Kisahmagis/Kisahmagis%20apps/Docs):

| Dokumen | Deskripsi & Isi Utama |
| :--- | :--- |
| **[`PRD.md`](file:///d:/Work/Sistemagis/Kisahmagis/Kisahmagis%20apps/PRD.md)** | **Product Requirements Document (Ringkasan Eksekutif):** Visi produk, spesifikasi modul, diagram arsitektur, dan alur pengguna. |
| **[`Docs/PRD_KisahMagis.md`](file:///d:/Work/Sistemagis/Kisahmagis/Kisahmagis%20apps/Docs/PRD_KisahMagis.md)** | **Spesifikasi Detail PRD:** Dokumentasi teknis komprehensif seluruh modul sistem KisahMagis. |
| **[`Docs/THEME_DEVELOPMENT.md`](file:///d:/Work/Sistemagis/Kisahmagis/Kisahmagis%20apps/Docs/THEME_DEVELOPMENT.md)** | **Panduan Pembuatan Tema:** Tata cara membuat tema baru, pendaftaran `customFields`, dan integrasi database `packages` & `themes`. |
| **[`Docs/DESIGN_KisahMagis.md`](file:///d:/Work/Sistemagis/Kisahmagis/Kisahmagis%20apps/Docs/DESIGN_KisahMagis.md)** | **Design System & UI Guidelines:** Palet warna, hirarki tipografi, radius sudut, dan pedoman komponen visual. |
| **[`Docs/SECURITY.md`](file:///d:/Work/Sistemagis/Kisahmagis/Kisahmagis%20apps/Docs/SECURITY.md)** | **Security & Deployment Guide:** Model ancaman keamanan, proteksi PII data tamu, dan konfigurasi Cloudflare Tunnel. |

---

Hak Cipta © 2026 **KisahMagis** by **Sistemagis**. Seluruh hak cipta dilindungi undang-undang.
