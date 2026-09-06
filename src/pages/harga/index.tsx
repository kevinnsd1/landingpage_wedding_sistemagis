import { Link } from "react-router-dom"
import { 
  Check, 
  Crown, 
  MessageCircle, 
  Clock, 
  HelpCircle, 
  ArrowRight,
  Gift,
  ShieldCheck
} from "lucide-react"

export default function HargaPage() {
  const whatsappNumber = "62895351878050"

  const getWaLink = (packageName: string, price: string) => {
    const text = encodeURIComponent(
      `Halo Magis Invitation, saya berminat memesan *${packageName}* dengan Harga Promo *${price}*. Mohon informasi alur pemesanannya.`
    )
    return `https://wa.me/${whatsappNumber}?text=${text}`
  }

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#2A2421] font-sans flex flex-col justify-between relative overflow-hidden">
      
      {/* ================= 1. HEADER ================= */}
      <header className="w-full max-w-7xl mx-auto px-6 sm:px-12 py-6 sm:py-8 flex items-center justify-between z-20 shrink-0 border-b border-[#EBE5DA]/60 bg-[#FBF9F5]/90 backdrop-blur-md sticky top-0">
        {/* Left Nav */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-[0.25em] uppercase text-[#3D332F]">
          <Link to="/#template" className="hover:opacity-80 transition-opacity">
            TEMPLATE
          </Link>
          <Link to="/fitur" className="hover:opacity-80 transition-opacity">
            FITUR
          </Link>
          <Link to="/wedding-planner" className="hover:opacity-80 transition-opacity">
            WEDDING PLANNER
          </Link>
        </nav>

        {/* Center Logo */}
        <Link to="/" className="mx-auto md:mx-0 flex items-center justify-center group">
          <img 
            src="/assets/transaparanlogo.png" 
            alt="Logo Magis" 
            className="h-10 sm:h-14 lg:h-16 w-auto object-contain brightness-0 group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Right Nav */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-[0.25em] uppercase text-[#3D332F]">
          <Link to="/harga" className="border-b-2 border-[#2A2421] pb-0.5 text-[#2A2421] font-extrabold">
            HARGA
          </Link>
          <Link to="/bukutamu" className="hover:opacity-80 transition-opacity">
            BUKU TAMU
          </Link>
          <Link to="/kontak" className="hover:opacity-80 transition-opacity">
            KONTAK
          </Link>
        </nav>
      </header>

      {/* ================= 2. HERO BANNER ================= */}
      <section className="blush-gradient py-16 sm:py-24 px-6 text-center relative border-b border-[#EBE5DA]">
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">

          <h1 className="font-serif-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[#2A2421] leading-tight">
            Paket Harga Undangan Digital
          </h1>

          <p className="text-sm sm:text-base text-[#5A504A] max-w-2xl mx-auto font-light leading-relaxed">
            Pilihan paket hemat, tanpa biaya tersembunyi. Dapatkan diskon spesial hingga <span className="font-bold text-[#8C5B00]">68%</span> untuk pemesanan hari ini!
          </p>
        </div>
      </section>

      {/* ================= 3. PRICING CARDS SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 -mt-10 relative z-30 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* 1. PAKET BASIC (50 RIBU) */}
          <div className="bg-white rounded-3xl p-8 border border-[#EBE5DA] shadow-md flex flex-col justify-between space-y-6 hover:shadow-xl transition-all relative">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold tracking-widest text-[#8C5B00] uppercase bg-[#FBF3DB] px-3 py-1 rounded-full">
                  Pemula / Simple
                </span>
                <span className="text-xs font-mono text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  Hemat 66%
                </span>
              </div>

              <h3 className="font-serif-display text-2xl sm:text-3xl font-extrabold text-[#2A2421]">
                Paket Basic
              </h3>

              <p className="text-xs text-[#78736A] font-light">
                Cocok untuk acara intim sederhana dengan fitur esensial yang praktis.
              </p>

              {/* Price Tag with Strikethrough */}
              <div className="pt-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-mono text-[#78736A] line-through">
                    Rp 149.000
                  </span>
                  <span className="text-xs font-mono font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                    Diskon Promo
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-serif-display text-4xl sm:text-5xl font-black text-[#2A2421]">
                    Rp 50.000
                  </span>
                  <span className="text-xs text-[#78736A] font-mono">/ sekali bayar</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F2ECE1] space-y-3 text-xs">
                {[
                  "Maksimal 5 Foto Galeri",
                  "Form RSVP & Buku Tamu Standar",
                  "Petunjuk Lokasi Google Maps",
                  "Live Countdown Timer",
                  "Amplop Digital 1 Rekening Bank",
                  "Desain Responsive HP & Laptop"
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[#4A433E]">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <a 
                href={getWaLink("Paket Basic", "Rp 50.000")}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 border border-[#2A2421] text-[#2A2421] hover:bg-[#2A2421] hover:text-white text-xs font-bold tracking-[0.15em] uppercase py-4 rounded-xl transition-all shadow-2xs"
              >
                Pesan Paket Basic <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 2. PAKET PREMIUM / MENENGAH (150 RIBU) - POPULAR */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-[#2A2421] shadow-2xl flex flex-col justify-between space-y-6 relative transform lg:-translate-y-4">
            
            {/* Top Badge Popular */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#2A2421] text-white text-[11px] font-mono font-bold tracking-widest uppercase px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
              Best Seller • Paling Populer
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold tracking-widest text-[#8C5B00] uppercase bg-[#FBF3DB] px-3 py-1 rounded-full border border-[#F5E5B8]">
                  Lengkap &amp; Tanpa Batas
                </span>
                <span className="text-xs font-mono text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  Hemat 57%
                </span>
              </div>

              <h3 className="font-serif-display text-3xl sm:text-4xl font-black text-[#2A2421]">
                Paket Premium
              </h3>

              <p className="text-xs text-[#78736A] font-light">
                Pilihan favorit jutaan pasangan! Fitur lengkap tanpa batasan foto &amp; nama tamu.
              </p>

              {/* Price Tag with Strikethrough */}
              <div className="pt-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-mono text-[#78736A] line-through">
                    Rp 349.000
                  </span>
                  <span className="text-xs font-mono font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                    Flashsale Promo
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-serif-display text-4xl sm:text-5xl font-black text-[#2A2421]">
                    Rp 150.000
                  </span>
                  <span className="text-xs text-[#78736A] font-mono">/ sekali bayar</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F2ECE1] space-y-3 text-xs">
                {[
                  "Galeri Foto HD Unlimited + Video Story",
                  "Bebas Pilih Musik Latar Favorit",
                  "Generator Nama Tamu WA Unlimited",
                  "RSVP Realtime & Buku Tamu Interaktif",
                  "Multi Rekening Bank & QRIS All Payment",
                  "Google & Apple Calendar Sync",
                  "Tiket Check-in QR Code Venue Event",
                  "Gratis Edit Data & Foto Sepuasnya"
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[#2A2421] font-medium">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <a 
                href={getWaLink("Paket Premium", "Rp 150.000")}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#2A2421] text-white hover:bg-[#3D332F] text-xs font-bold tracking-[0.18em] uppercase py-4 rounded-xl transition-all shadow-md active:scale-98 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-green-400" /> Ambil Promo Premium <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 3. PAKET CUSTOM DESIGN (599 RIBU - 1 JUTA) */}
          <div className="bg-white rounded-3xl p-8 border border-[#EBE5DA] shadow-md flex flex-col justify-between space-y-6 hover:shadow-xl transition-all relative">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold tracking-widest text-[#8C5B00] uppercase bg-[#FBF3DB] px-3 py-1 rounded-full">
                  Exclusiv &amp; Custom
                </span>
                <span className="text-xs font-mono text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  Diskon 68%
                </span>
              </div>

              <h3 className="font-serif-display text-2xl sm:text-3xl font-extrabold text-[#2A2421]">
                Custom Design Royal
              </h3>

              <p className="text-xs text-[#78736A] font-light">
                Dibuat khusus 100% dari sketsa / sampel impian Anda oleh tim desainer profesional.
              </p>

              {/* Price Tag with Strikethrough */}
              <div className="pt-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-mono text-[#78736A] line-through">
                    Rp 1.899.000
                  </span>
                  <span className="text-xs font-mono font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                    Special Custom
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-serif-display text-3xl sm:text-4xl font-black text-[#2A2421]">
                    Rp 599rb <span className="text-lg font-normal text-[#78736A]">- 1 Jt</span>
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F2ECE1] space-y-3 text-xs">
                {[
                  "Seluruh Fitur Paket Premium Termasuk",
                  "Desain 100% Custom dari Nol (Request Bebas)",
                  "Bisa Pakai Custom Domain (.com / .id)",
                  "Filter Instagram AR Matching Theme",
                  "Bantuan Penuh Input Data oleh Desainer",
                  "Prioritas Pengerjaan Kilat Fast-Track 2 Jam",
                  "Export Rekapitulasi Data Excel & PDF",
                  "Dedicated Personal Design Consultant"
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[#4A433E]">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <a 
                href={getWaLink("Custom Design Royal", "Rp 599.000 - Rp 1.000.000")}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 border border-[#2A2421] text-[#2A2421] hover:bg-[#2A2421] hover:text-white text-xs font-bold tracking-[0.15em] uppercase py-4 rounded-xl transition-all shadow-2xs"
              >
                Konsultasi Custom Design <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ================= 4. GUARANTEE & SERVICE ADVANTAGE ================= */}
      <section className="bg-[#F3EFE6] py-16 sm:py-24 border-t border-b border-[#EBE5DA]">
        <div className="max-w-6xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            
            <div className="bg-white p-8 rounded-3xl border border-[#EBE5DA] space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FBF3DB] text-[#8C5B00] flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-serif-display font-bold text-xl text-[#2A2421]">
                Garansi Revisi Sepuasnya
              </h4>
              <p className="text-xs text-[#78736A]">
                Bebas ganti data acara, foto, atau susunan pengantin sampai undangan benar-benar sempurna.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#EBE5DA] space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FBF3DB] text-[#8C5B00] flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="font-serif-display font-bold text-xl text-[#2A2421]">
                Pengerjaan Kilat 1x24 Jam
              </h4>
              <p className="text-xs text-[#78736A]">
                Setelah data &amp; foto dikirimkan, undangan Anda akan selesai dan aktif dalam waktu kurang dari 24 jam.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#EBE5DA] space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FBF3DB] text-[#8C5B00] flex items-center justify-center mx-auto">
                <Gift className="w-6 h-6" />
              </div>
              <h4 className="font-serif-display font-bold text-xl text-[#2A2421]">
                Tanpa Biaya Tersembunyi
              </h4>
              <p className="text-xs text-[#78736A]">
                Bayar sekali untuk selamanya. Tidak ada biaya langganan bulanan atau biaya tambahan per kirim tamu.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 5. FOOTER ================= */}
      <footer className="bg-[#FBF9F5] border-t border-[#EBE5DA] py-8 text-center text-xs text-[#78736A]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/assets/transaparanlogo.png" alt="Logo" className="h-6 w-auto brightness-0" />
            <span className="font-serif-display font-bold text-sm text-[#2A2421]">Magis Invitation Pricing</span>
          </div>
          <p>© 2026 Magis Tech. Paket Promo Harga Undangan Digital.</p>
        </div>
      </footer>

    </div>
  )
}
