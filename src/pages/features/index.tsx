import { useState } from "react"
import { Link } from "react-router-dom"
import { 
  Heart, 
  Gift, 
  Users, 
  MapPin, 
  Music, 
  Calendar, 
  MessageSquare, 
  ShieldCheck, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  Camera, 
  Sliders, 
  QrCode,
  ArrowRight
} from "lucide-react"

interface FeatureItem {
  id: string
  icon: React.ElementType
  title: string
  subtitle: string
  description: string
  tags: string[]
  badge?: string
}

const mainFeatures: FeatureItem[] = [
  {
    id: "rsvp-bukutamu",
    icon: Users,
    title: "RSVP & Buku Tamu Realtime",
    subtitle: "Kelola Kehadiran & Ucapan Doa Tanpa Ribet",
    description: "Tamu dapat mengonfirmasi jumlah kehadiran dan memberikan ucapan selamat secara langsung. Semua data masuk ke dashboard Anda secara realtime.",
    tags: ["RSVP Otomatis", "Buku Tamu Interaktif", "Statistik Kehadiran", "Export Excel"],
    badge: "Populer"
  },
  {
    id: "amplop-digital",
    icon: Gift,
    title: "Amplop Digital & QRIS Instant",
    subtitle: "Kemudahan Transfer Hadiah & Angpao",
    description: "Sediakan rekening bank atau QRIS langsung di dalam undangan. Tamu bisa mentransfer hadiah dengan fitur salin nomor rekening sekali sentuh.",
    tags: ["QRIS All Payment", "Multi Rekening", "Copy Account Number", "Konfirmasi Hadiah"],
    badge: "Praktis"
  },
  {
    id: "custom-tamu",
    icon: Send,
    title: "Nama Tamu Tanpa Batas (WhatsApp Generator)",
    subtitle: "Personalisasi Nama Tamu & Kirim via WA",
    description: "Buat link khusus dengan nama masing-masing tamu secara otomatis. Dilengkapi generator pesan WhatsApp otomatis yang siap kirim.",
    tags: ["Unlimited Guest", "WA Broadcast Helper", "Custom Greeting Text", "Link Unik"],
    badge: "Favorit"
  },
  {
    id: "galeri-media",
    icon: Camera,
    title: "Galeri Foto HD & Video Stories",
    subtitle: "Abadikan Momen Manis Pre-Wedding",
    description: "Tampilkan foto-foto pre-wedding resolusi tinggi dalam format carousel slider modern atau video teaser dari YouTube / Vimeo.",
    tags: ["HD Gallery Slider", "Video Teaser Embedded", "Lightbox Preview", "Unrestricted Photos"]
  },
  {
    id: "lokasi-peta",
    icon: MapPin,
    title: "Peta Lokasi & Navigasi Presisi",
    subtitle: "Google Maps & Waze Direct Access",
    description: "Memudahkan tamu menemukan lokasi akad dan resepsi dengan tombol petunjuk arah langsung yang membuka Google Maps atau Waze.",
    tags: ["Google Maps API", "Waze Integration", "Penanda Lokasi Acara", "Panduan Rute"]
  },
  {
    id: "musik-custom",
    icon: Music,
    title: "Musik Latar & Auto-Play Audio",
    subtitle: "Suasana Romantis Saat Undangan Dibuka",
    description: "Pilih lagu romantis favorit Anda dari perpustakaan kami atau unggah musik impian Anda sendiri untuk memanjakan telinga tamu.",
    tags: ["Custom Song Upload", "Background Player Control", "Audio Floating Button", "Sound Effect"]
  },
  {
    id: "kalender-countdown",
    icon: Calendar,
    title: "Hitung Mundur & Add to Calendar",
    subtitle: "Pengingat Hari Bahagia Tamu Anda",
    description: "Fitur countdown timer presisi yang menghitung hari, jam, menit, serta tombol sekali klik 'Simpan ke Google Calendar' bagi para tamu.",
    tags: ["Live Countdown Timer", "Google Calendar Sync", "Apple iCal Sync", "Event Reminder"]
  },
  {
    id: "privasi-keamanan",
    icon: ShieldCheck,
    title: "Keamanan & Mode Privat (PIN Access)",
    subtitle: "Undangan Eksklusif & Terjaga",
    description: "Ingin pernikahan lebih eksklusif? Aktifkan perlindungan kata sandi/PIN agar undangan hanya dapat diakses oleh tamu pilihan Anda.",
    tags: ["Password Protected", "Private Event Mode", "Anti-Index SEO Option", "Aman & Nyaman"]
  }
]

const extraHighlights = [
  {
    icon: Sparkles,
    title: "Desain Responsive Fully Animated",
    desc: "Tampilan memukau di layar HP, tablet, maupun komputer desktop dengan animasi halus."
  },
  {
    icon: Sliders,
    title: "Kustomisasi Bebas & Instan",
    desc: "Ubah font, warna, susunan acara, dan kutipan ayat sesuai tema pernikahan Anda."
  },
  {
    icon: QrCode,
    title: "Check-in QR Code di Lokasi Acara",
    desc: "Scan QR Code tamu di meja penerima tamu untuk manajemen acara yang canggih."
  },
  {
    icon: MessageSquare,
    title: "Kutipan Ayat & Ucapan Kasih",
    desc: "Sematkan ayat suci pilihan, kata mutiara, atau cerita cinta (Love Story) perjalanan Anda."
  }
]

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState<string>("all")

  const filteredFeatures = activeTab === "all" 
    ? mainFeatures 
    : mainFeatures.filter(f => {
        if (activeTab === "interaktif") return f.id === "rsvp-bukutamu" || f.id === "amplop-digital" || f.id === "custom-tamu"
        if (activeTab === "media") return f.id === "galeri-media" || f.id === "musik-custom"
        if (activeTab === "acara") return f.id === "lokasi-peta" || f.id === "kalender-countdown" || f.id === "privasi-keamanan"
        return true
      })

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#2A2421] font-sans flex flex-col justify-between relative overflow-hidden">
      
      {/* ================= 1. HEADER ================= */}
      <header className="w-full max-w-7xl mx-auto px-6 sm:px-12 py-6 sm:py-8 flex items-center justify-between z-20 shrink-0 border-b border-[#EBE5DA]/60 bg-[#FBF9F5]/90 backdrop-blur-md sticky top-0">
        {/* Left Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-[0.25em] uppercase text-[#3D332F]">
          <Link to="/#template" className="hover:opacity-80 transition-opacity">
            TEMPLATE
          </Link>
          <Link to="/fitur" className="border-b-2 border-[#2A2421] pb-0.5 text-[#2A2421] font-extrabold">
            FITUR
          </Link>
          <Link to="/wedding-planner" className="hover:opacity-80 transition-opacity">
            WEDDING PLANNER
          </Link>
          <Link to="/#tema" className="hover:opacity-80 transition-opacity">
            TEMA
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

        {/* Right Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-[0.25em] uppercase text-[#3D332F]">
          <Link to="/#harga" className="hover:opacity-80 transition-opacity">
            HARGA
          </Link>
          <Link to="/#bukutamu" className="hover:opacity-80 transition-opacity">
            BUKU TAMU
          </Link>
          <Link to="/#kontak" className="hover:opacity-80 transition-opacity">
            KONTAK
          </Link>
        </nav>
      </header>

      {/* ================= 2. HERO BANNER ================= */}
      <section className="blush-gradient py-16 sm:py-24 px-6 text-center relative border-b border-[#EBE5DA]">
        <div className="max-w-4xl mx-auto space-y-6">

          <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#2A2421] leading-tight">
            Fitur Lengkap Undangan Digital
          </h1>

          <p className="text-sm sm:text-base text-[#5A504A] max-w-2xl mx-auto font-light leading-relaxed">
            Dirancang khusus untuk menghadirkan pengalaman indah, praktis, dan eksklusif bagi Anda dan seluruh tamu undangan di hari bahagia.
          </p>

          {/* Quick Filter Tabs */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {[
              { id: "all", label: "Semua Fitur" },
              { id: "interaktif", label: "RSVP & Amplop Digital" },
              { id: "media", label: "Galeri & Musik" },
              { id: "acara", label: "Peta & Keamanan" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#2A2421] text-white shadow-md scale-105"
                    : "bg-white/80 text-[#2A2421] hover:bg-white border border-[#2A2421]/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 3. MAIN FEATURES GRID ================= */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredFeatures.map((item) => {
            const Icon = item.icon
            return (
              <div 
                key={item.id}
                className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EBE5DA] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#FBF3DB] text-[#8C5B00] border border-[#F5E5B8] flex items-center justify-center group-hover:bg-[#2A2421] group-hover:text-white transition-colors duration-300 shadow-xs">
                      <Icon className="w-7 h-7 stroke-[1.8]" />
                    </div>
                    {item.badge && (
                      <span className="text-[11px] font-mono font-bold tracking-widest text-[#8C5B00] bg-[#FBF3DB] px-3.5 py-1 rounded-full border border-[#F5E5B8] uppercase">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#2A2421] mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs font-mono text-[#8C5B00] font-medium mb-4">
                    {item.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-[#6A635B] leading-relaxed mb-6 font-light">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F2ECE1] flex flex-wrap gap-2">
                  {item.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#4A433E] bg-[#F8F5EE] px-3 py-1 rounded-md"
                    >
                      <CheckCircle2 className="w-3 h-3 text-[#8C5B00]" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ================= 4. EXTRA HIGHLIGHTS BENTO SECTION ================= */}
      <section className="bg-[#F3EFE6] py-16 sm:py-24 border-t border-b border-[#EBE5DA]">
        <div className="max-w-6xl mx-auto px-6 sm:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono font-semibold tracking-widest text-[#8C5B00] uppercase">
              Keunggulan Tambahan
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-extrabold text-[#2A2421]">
              Detail Kecil yang Membuat Perbedaan Besar
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {extraHighlights.map((extra, idx) => {
              const Icon = extra.icon
              return (
                <div key={idx} className="bg-white/90 backdrop-blur-xs p-6 rounded-2xl border border-[#EBE5DA] space-y-4 hover:bg-white transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#FBF9F5] text-[#2A2421] border border-[#2A2421]/10 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif-display font-bold text-lg text-[#2A2421]">
                    {extra.title}
                  </h4>
                  <p className="text-xs text-[#78736A] leading-relaxed">
                    {extra.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ================= 5. CTA CALL TO ACTION ================= */}
      <section className="blush-gradient py-20 px-6 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-8 relative z-10">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-white/60 backdrop-blur-xs border border-white/80 text-[#2A2421]">
            <Heart className="w-6 h-6 fill-[#2A2421] text-[#2A2421]" />
          </div>

          <h2 className="font-serif-display text-3xl sm:text-5xl font-extrabold text-[#2A2421] tracking-tight">
            Siap Membuat Undangan Impian Anda?
          </h2>

          <p className="text-xs sm:text-sm text-[#5A504A] leading-relaxed max-w-xl mx-auto font-light">
            Pilih templat favorit Anda, kustomisasi teks &amp; momen indah Anda, dan bagikan kepada keluarga serta sahabat dalam hitungan menit.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link 
              to="/#template"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#2A2421] text-white text-xs font-bold tracking-[0.2em] uppercase px-8 py-4 rounded-xl hover:bg-[#3D332F] transition-all shadow-md active:scale-98"
            >
              Lihat Pilihan Templat <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= 6. FOOTER ================= */}
      <footer className="bg-[#FBF9F5] border-t border-[#EBE5DA] py-8 text-center text-xs text-[#78736A]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/assets/transaparanlogo.png" alt="Logo" className="h-6 w-auto brightness-0" />
            <span className="font-serif-display font-bold text-sm text-[#2A2421]">Magis Invitation</span>
          </div>
          <p>© 2026 Magis Tech. Undangan Digital Wedding Minimalis.</p>
        </div>
      </footer>

    </div>
  )
}
