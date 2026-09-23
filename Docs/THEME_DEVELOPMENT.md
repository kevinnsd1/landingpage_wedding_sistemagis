# KisahMagis — Panduan Pengembangan Tema (Theme Development Guide)

KisahMagis menggunakan arsitektur **Dynamic Theme Engine**. Ini berarti setiap tema bukan sekadar "template layout", melainkan **sebuah komponen React murni** yang diberikan kebebasan penuh (100% kontrol) atas struktur DOM, animasi, hingga aset apa yang mereka butuhkan dari pengguna.

Dokumen ini ditujukan bagi *developer* atau *AI agent* yang ingin membuat tema baru di KisahMagis.

---

## 1. Konsep Dasar

1. **Dashboard (Sisi User):** Menyediakan antarmuka untuk mengisi data (Mempelai, Tanggal, Galeri, RSVP).
2. **Custom Fields (Jembatan):** Tema dapat meminta data *spesifik/eksklusif* dari user (contoh: "Video Cover", "Foto Parallax", "Puisi Penutup").
3. **Theme Component (Sisi Developer):** Menerima semua data (standar + spesifik) melalui `props` dan me-render hasil akhirnya sebagai halaman web.

---

## 2. Struktur Direktori Tema

Semua tema disimpan di dalam `apps/web/src/themes/`. 
Untuk membuat tema baru (misalnya: `CinematicTheme`), buat struktur berikut:

```text
src/themes/cinematic/
├── theme.ts            // Definisi metadata, konfigurasi default, dan customFields
└── CinematicTheme.tsx  // Komponen React (UI) dari tema tersebut
```

---

## 3. Mendefinisikan Metadata & Custom Fields (`theme.ts`)

File ini adalah identitas tema Anda. Di sinilah Anda mendeklarasikan "aset spesifik" apa saja yang dibutuhkan tema ini di luar data standar.

```typescript
// src/themes/cinematic/theme.ts
import { ThemeMetadata } from '@/types/invitation';
import { CinematicTheme } from './CinematicTheme';

export const cinematicThemeMetadata: ThemeMetadata = {
  id: 'cinematic',
  name: 'Cinematic Film',
  description: 'Tema bergaya film dengan latar belakang video layar penuh.',
  thumbnail: '/thumbnails/cinematic.jpg',
  component: CinematicTheme,
  
  // Konfigurasi bawaan jika user belum mengisi
  defaultConfig: {
    fontFamily: 'Inter',
    colors: {
      primary: '#1A1A1A',
      secondary: '#E5E5E5',
      background: '#000000',
      text: '#FFFFFF',
    },
    // Data spesifik awal
    themeData: {
      heroVideo: '',
      closingQuote: 'And they lived happily ever after.',
    }
  },

  // 👇 INI YANG PALING PENTING
  // Meminta aset spesifik dari user di Dashboard
  customFields: [
    { 
      key: 'heroVideo', 
      label: 'Video Cover Depan', 
      description: 'Upload video pendek (MP4) untuk latar belakang.',
      type: 'video' 
    },
    { 
      key: 'closingQuote', 
      label: 'Kutipan Penutup', 
      type: 'textarea',
      defaultValue: 'And they lived happily ever after.' 
    }
  ]
};
```

> **Ajaibnya:** Hanya dengan mendeklarasikan `customFields` di atas, sistem Dashboard KisahMagis akan **secara otomatis** memunculkan uploader Video dan kolom Textarea di tab **Spesifik** (Desain & Tema). Anda tidak perlu mengedit kode Dashboard sama sekali!

---

## 4. Membangun UI Tema (`CinematicTheme.tsx`)

File ini adalah kanvas Anda. Anda menerima `ThemeProps` dan bebas merakit UI menggunakan Tailwind, Framer Motion, HTML Canvas, atau apa pun.

```tsx
// src/themes/cinematic/CinematicTheme.tsx
import React, { useState } from 'react';
import { ThemeProps } from '@/types/invitation';
import { Mail } from 'lucide-react';

export function CinematicTheme({
  wedding,
  invitation,
  guest,
  onOpenInvitation,
}: ThemeProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Mengambil aset spesifik yang tadi diunggah user
  const { heroVideo, closingQuote } = invitation.config.themeData || {};

  const handleOpen = () => {
    setIsOpen(true);
    onOpenInvitation?.(); // Memicu musik (jika ada)
  };

  if (!isOpen) {
    return (
      <div className="relative w-full h-screen flex items-center justify-center bg-black text-white overflow-hidden">
        {/* Render Video Spesifik! */}
        {heroVideo && (
          <video 
            src={heroVideo} 
            autoPlay loop muted playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
        )}
        
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-serif">{wedding.groomName} & {wedding.brideName}</h1>
          <p className="mt-4">Kepada: {guest?.name || 'Tamu Terhormat'}</p>
          <button onClick={handleOpen} className="mt-8 px-6 py-2 border border-white">
             Buka Undangan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      {/* 
         BEBAS MENGGUNAKAN LAYOUT APAPUN
         Bisa Horizontal Scroll, bisa CSS Grid kompleks.
         Tidak perlu bergantung pada generic SectionRenderer!
      */}
      <section className="h-screen flex items-center">
         <h2 className="text-4xl">Galeri Kami</h2>
         {/* Mapping dari generic gallery */}
         <div className="grid grid-cols-2 gap-4">
            {invitation.gallery?.map((img, i) => (
              <img key={i} src={img.url} alt="Gallery" />
            ))}
         </div>
      </section>

      {/* Render Kutipan Spesifik! */}
      <section className="py-32 text-center text-gray-400">
         <i>"{closingQuote}"</i>
      </section>
    </div>
  );
}
```

---

## 5. Mendaftarkan Tema (`src/themes/index.ts`)

Langkah terakhir adalah mendaftarkan *metadata* tema Anda ke *registry* agar dikenali oleh sistem.

```typescript
// src/themes/index.ts
import { auroraThemeMetadata } from './aurora/theme';
import { bloomThemeMetadata } from './bloom/theme';
import { cinematicThemeMetadata } from './cinematic/theme'; // 1. Import

export const availableThemes: ThemeMetadata[] = [
  auroraThemeMetadata,
  bloomThemeMetadata,
  cinematicThemeMetadata, // 2. Tambahkan ke array
];

export * from './aurora/AuroraTheme';
export * from './bloom/BloomTheme';
export * from './cinematic/CinematicTheme'; // 3. Export component
```

## 6. Manajemen Tema & Integrasi Database

Meskipun komponen UI tema dan `customFields` bersifat statis (hardcoded dalam *source code* React), **manajemen bisnis dari tema tersebut (Harga, Paket, Status Custom, Urutan) disimpan di Database**.

### Skema Database (Drizzle ORM)

Saat ini, sistem memiliki dua tabel yang saling berelasi: `packages` dan `themes`.

**1. Tabel `packages` (Paket Harga)**
- `id`: (UUID) Primary key.
- `name`: Nama paket (contoh: 'Free', 'Premium', 'Exclusive').
- `price`: Harga paket.
- `features`: Array JSON (contoh: `['Galeri 10 Foto', 'Video Cover']`).

**2. Tabel `themes` (Data Komersial Tema)**
- `id`: (VARCHAR) Primary key. **Harus sama persis** dengan `id` di `theme.ts`!
- `name`: Nama tema (dapat diubah via DB).
- `description`: Deskripsi tema.
- `packageId`: Foreign key ke tabel `packages`. Menentukan tier dari tema ini.
- `isCustom`: (BOOLEAN) Jika `true`, tema ini adalah pesanan eksklusif (tidak bisa langsung dipilih user, muncul tombol "Konsultasi Admin").
- `isActive`: (BOOLEAN) Jika `false`, tema disembunyikan sepenuhnya.
- `order`: (INTEGER) Urutan tampil di dashboard.

### Alur Sinkronisasi (Frontend + Backend)

Saat user masuk ke halaman **Tema** di Editor (`EditorTab.tsx`):
1. Frontend memanggil API `GET /api/themes`.
2. Backend mengambil data dari tabel `themes` yang di-join dengan tabel `packages`.
3. Frontend menggabungkan data dinamis dari DB ini dengan *Static React Component* yang dideklarasikan di `availableThemes` (`src/themes/index.ts`).
4. **Logika Render**:
   - Jika user memilih tema biasa, data tema disimpan ke tabel `weddings`.
   - Jika tema memiliki `isCustom: true`, tombol pilih diganti menjadi "Konsultasi Admin" (karena pembuatannya membutuhkan intervensi developer/admin).

**Langkah Tambahan untuk Developer:**
Setelah membuat komponen React di `src/themes/...` dan mendaftarkannya di `src/themes/index.ts`, Anda (atau Admin) **wajib menambahkan baris data tema tersebut ke dalam Database** (bisa melalui skrip seeder `seedThemes.ts` atau via Dashboard Admin nantinya) agar tema tersebut muncul dan bisa dipilih oleh *user*.

---

## Kesimpulan
Developer tema:
1. Menentukan input apa yang dibutuhkan via `customFields`.
2. Menerima data tersebut via `invitation.config.themeData`.
3. Membangun struktur React murni (HTML/CSS) di file komponen mereka.
4. Menyerahkan urusan *pricing* dan *activation* ke Database Admin berdasarkan `id` tema.
