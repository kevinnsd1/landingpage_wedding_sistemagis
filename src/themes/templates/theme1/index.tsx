import { useState, useEffect } from "react"
import { useSearchParams, Link } from "react-router-dom"
import SEO from "@/components/SEO"
import { 
  Heart, 
  Calendar, 
  MapPin, 
  VolumeX, 
  Volume2, 
  Copy, 
  Check, 
  Send, 
  Sparkles
} from "lucide-react"

interface WishMessage {
  id: string
  name: string
  attendance: "Hadir" | "Tidak Hadir" | "Ragu-ragu"
  pax: number
  message: string
  time: string
}

const initialWishes: WishMessage[] = [
  {
    id: "w1",
    name: "Budi Santoso & Partner",
    attendance: "Hadir",
    pax: 2,
    message: "Selamat ya Ahmad & Anisa! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Aamiin!",
    time: "2 jam yang lalu"
  },
  {
    id: "w2",
    name: "Keluarga Besar Dr. Hendra",
    attendance: "Hadir",
    pax: 4,
    message: "Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fii khair. InsyaAllah kami hadir!",
    time: "4 jam yang lalu"
  },
  {
    id: "w3",
    name: "Siti Rahmawati",
    attendance: "Hadir",
    pax: 1,
    message: "Happy Wedding sahabatku Nisa! Semoga lancar sampai hari-H dan selalu bahagia bersama suami tercinta.",
    time: "1 hari yang lalu"
  }
]

export default function Theme1Page() {
  const [searchParams] = useSearchParams()
  const guestName = searchParams.get("to") || searchParams.get("tamu") || "Tamu Undangan"

  // State
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [copiedBank, setCopiedBank] = useState<string | null>(null)
  
  // RSVP Form State
  const [rsvpName, setRsvpName] = useState(guestName !== "Tamu Undangan" ? guestName : "")
  const [rsvpAttendance, setRsvpAttendance] = useState<"Hadir" | "Tidak Hadir" | "Ragu-ragu">("Hadir")
  const [rsvpPax, setRsvpPax] = useState<number>(2)
  const [rsvpMessage, setRsvpMessage] = useState("")
  const [wishes, setWishes] = useState<WishMessage[]>(initialWishes)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Countdown state
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    // Target date: 30 days from now
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 30)

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate.getTime() - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleOpenInvitation = () => {
    setIsOpen(true)
    setIsPlaying(true)
    // Scroll to main content smoothly
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const toggleMusic = () => {
    setIsPlaying(!isPlaying)
  }

  const handleCopy = (text: string, bankId: string) => {
    navigator.clipboard.writeText(text)
    setCopiedBank(bankId)
    setTimeout(() => setCopiedBank(null), 2500)
  }

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!rsvpName || !rsvpMessage) return

    setIsSubmitting(true)

    setTimeout(() => {
      const newWish: WishMessage = {
        id: Date.now().toString(),
        name: rsvpName,
        attendance: rsvpAttendance,
        pax: rsvpAttendance === "Hadir" ? rsvpPax : 0,
        message: rsvpMessage,
        time: "Baru saja"
      }

      setWishes([newWish, ...wishes])
      setRsvpMessage("")
      setIsSubmitting(false)
    }, 600)
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C2623] font-sans relative overflow-x-hidden selection:bg-[#E8C2C8] selection:text-[#2C2623]">
      <SEO 
        title="Undangan Pernikahan Ahmad & Anisa | Classic Floral Demo - Magis"
        description="Demo Undangan Digital Pernikahan Tema Classic Floral oleh Magis Invitation. Dilengkapi musik, rsvp online, ampob digital, & peta lokasi."
        canonicalUrl="https://digitalinvitationmagis.com/demo/theme-1"
      />

      {/* Background Subtle Ambient Sound Placeholder */}
      {isPlaying && (
        <audio 
          src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-acoustic-guitar-112838.mp3" 
          autoPlay 
          loop 
        />
      )}

      {/* Floating Audio Control Button */}
      {isOpen && (
        <button
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-50 p-3.5 bg-[#2C2623] text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center border-2 border-[#E5C1C7]"
          aria-label="Toggle Music"
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5 text-[#F5C2C9] animate-pulse" />
          ) : (
            <VolumeX className="w-5 h-5 text-gray-400" />
          )}
        </button>
      )}

      {/* ================= 1. FULLSCREEN OPENING COVER GATE ================= */}
      {!isOpen && (
        <div className="fixed inset-0 z-50 blush-gradient flex flex-col items-center justify-between p-6 text-center animate-in fade-in duration-500 overflow-y-auto">
          
          <div className="my-auto max-w-lg mx-auto space-y-6 bg-white/70 backdrop-blur-md p-8 sm:p-12 rounded-3xl border border-white/80 shadow-2xl">
            
            <div className="space-y-2">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#7A6B65] block font-semibold">
                The Wedding Of
              </span>
              <h1 className="font-serif-display text-4xl sm:text-6xl font-black text-[#2C2623] tracking-wide">
                Ahmad &amp; Anisa
              </h1>
            </div>

            <div className="w-16 h-0.5 bg-[#C998A0] mx-auto rounded-full"></div>

            <div className="space-y-3 py-2">
              <p className="text-xs text-[#6B5E58] tracking-widest uppercase font-mono">
                Kepada Yth. Bapak/Ibu/Saudara/i:
              </p>
              <div className="inline-block bg-white px-6 py-2.5 rounded-2xl shadow-xs border border-[#EBE3DE]">
                <h3 className="font-bold text-base sm:text-lg text-[#2C2623]">
                  {guestName}
                </h3>
              </div>
              <p className="text-[11px] italic text-[#8A7B74] max-w-xs mx-auto">
                Tanpa mengurangi rasa hormat, kami mengundang Anda untuk hadir di hari bahagia kami.
              </p>
            </div>

            <button
              onClick={handleOpenInvitation}
              className="w-full inline-flex items-center justify-center gap-3 bg-[#2C2623] text-white text-xs font-bold tracking-[0.25em] uppercase py-4 rounded-xl hover:bg-[#3E3632] transition-all shadow-lg active:scale-98 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#F5C2C9]" /> Buka Undangan
            </button>
          </div>

          <div className="text-[11px] font-mono text-[#6B5E58]">
            Digital Invitation by <span className="font-bold text-[#2C2623]">Magis</span>
          </div>
        </div>
      )}

      {/* ================= MAIN INVITATION CONTENT ================= */}
      {isOpen && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">

          {/* TOP BAR / BRANDING */}
          <div className="bg-[#2C2623] text-white text-center py-2.5 px-4 text-xs font-mono tracking-widest flex items-center justify-between">
            <span className="opacity-80">Undangan Digital Demo - Theme 01</span>
            <Link to="/#template" className="text-[#F5C2C9] hover:underline font-bold text-[11px]">
              Kembali ke Catalogue →
            </Link>
          </div>

          {/* ================= HERO SECTION ================= */}
          <section className="blush-gradient py-20 sm:py-28 px-6 text-center border-b border-[#EBE5DA] relative">
            <div className="max-w-3xl mx-auto space-y-6">
              
              <span className="font-serif text-sm italic tracking-widest text-[#7A6B65] block">
                Walimatul Ursy
              </span>

              <h1 className="font-serif-display text-5xl sm:text-7xl font-black text-[#2C2623] tracking-tight">
                Ahmad &amp; Anisa
              </h1>

              <p className="text-xs sm:text-sm font-mono tracking-[0.25em] text-[#6B5E58] uppercase">
                Minggu, 12 Oktober 2026 • Jakarta Selatan
              </p>

              {/* Bismillah & Ayat Quote */}
              <div className="pt-8 max-w-xl mx-auto space-y-3">
                <div className="font-serif text-2xl text-[#2C2623] font-bold">
                  بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                </div>
                <p className="text-xs sm:text-sm text-[#5A4E48] font-light leading-relaxed italic">
                  &ldquo;Dan di antara tanda-tanda (kebesaran-Nya) ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya.&rdquo;
                </p>
                <span className="text-[11px] font-bold font-mono text-[#8A7A73] uppercase tracking-wider block">
                  (QS. Ar-Rum: 21)
                </span>
              </div>

              {/* Countdown Timer */}
              <div className="pt-8 max-w-lg mx-auto">
                <div className="grid grid-cols-4 gap-2 sm:gap-4">
                  {[
                    { label: "Hari", value: timeLeft.days },
                    { label: "Jam", value: timeLeft.hours },
                    { label: "Menit", value: timeLeft.minutes },
                    { label: "Detik", value: timeLeft.seconds }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white/80 backdrop-blur-xs p-3 sm:p-4 rounded-2xl border border-white shadow-sm text-center">
                      <div className="font-serif-display text-2xl sm:text-4xl font-extrabold text-[#2C2623]">
                        {String(item.value).padStart(2, "0")}
                      </div>
                      <div className="text-[10px] font-mono uppercase font-bold text-[#8A7A73] tracking-widest mt-1">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* ================= MEMPELAI SECTION ================= */}
          <section className="py-20 px-6 max-w-5xl mx-auto text-center space-y-16">
            
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase font-bold tracking-[0.25em] text-[#C998A0]">
                Mempelai Pengantin
              </span>
              <h2 className="font-serif-display text-3xl sm:text-5xl font-extrabold text-[#2C2623]">
                Pasangan Bahagia
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              
              {/* CPP (Pria) */}
              <div className="bg-white p-8 rounded-3xl border border-[#EBE5DA] shadow-md space-y-4 hover:shadow-xl transition-all">
                <div className="w-32 h-32 mx-auto rounded-full bg-[#F5C2C9]/30 flex items-center justify-center border-4 border-[#FDFBF7]">
                  <span className="font-serif-display text-4xl font-bold text-[#2C2623]">A</span>
                </div>
                <h3 className="font-serif-display text-2xl font-bold text-[#2C2623]">
                  Ahmad Rizky Pratama, S.T.
                </h3>
                <p className="text-xs text-[#6B5E58] font-light leading-relaxed">
                  Putra Pertama dari <br />
                  <span className="font-semibold text-[#2C2623]">Bpk. H. Bambang Subagyo</span> &amp; <span className="font-semibold text-[#2C2623]">Ibu Hj. Ratna Juwita</span>
                </p>
                <div className="pt-2">
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#C998A0] font-bold hover:underline"
                  >
                    @ahmadrizky.st
                  </a>
                </div>
              </div>

              {/* CPW (Wanita) */}
              <div className="bg-white p-8 rounded-3xl border border-[#EBE5DA] shadow-md space-y-4 hover:shadow-xl transition-all">
                <div className="w-32 h-32 mx-auto rounded-full bg-[#F5C2C9]/30 flex items-center justify-center border-4 border-[#FDFBF7]">
                  <span className="font-serif-display text-4xl font-bold text-[#2C2623]">A</span>
                </div>
                <h3 className="font-serif-display text-2xl font-bold text-[#2C2623]">
                  Anisa Nurul Rahma, S.Ked.
                </h3>
                <p className="text-xs text-[#6B5E58] font-light leading-relaxed">
                  Putri Kedua dari <br />
                  <span className="font-semibold text-[#2C2623]">Bpk. Drs. H. Ahmad Fauzi</span> &amp; <span className="font-semibold text-[#2C2623]">Ibu Hj. Siti Maryam</span>
                </p>
                <div className="pt-2">
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#C998A0] font-bold hover:underline"
                  >
                    @anisanurul.sked
                  </a>
                </div>
              </div>

            </div>
          </section>

          {/* ================= ACARA / EVENT SECTION ================= */}
          <section className="bg-[#F6EFEA] py-20 px-6 border-y border-[#EBE5DA]">
            <div className="max-w-5xl mx-auto space-y-12 text-center">
              
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase font-bold tracking-[0.25em] text-[#C998A0]">
                  Rangkaian Acara
                </span>
                <h2 className="font-serif-display text-3xl sm:text-5xl font-extrabold text-[#2C2623]">
                  Waktu &amp; Lokasi Pesta
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                
                {/* Akad Nikah */}
                <div className="bg-white p-8 rounded-3xl border border-[#EBE5DA] shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b border-[#EBE5DA] pb-4">
                    <h3 className="font-serif-display text-2xl font-bold text-[#2C2623]">
                      Akad Nikah
                    </h3>
                    <div className="p-2.5 bg-[#F5C2C9]/20 rounded-xl text-[#2C2623]">
                      <Heart className="w-5 h-5 text-[#C998A0]" />
                    </div>
                  </div>

                  <div className="space-y-3 text-xs text-[#5A4E48]">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-4 h-4 text-[#C998A0] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-[#2C2623]">Minggu, 12 Oktober 2026</p>
                        <p>Pukul 08.00 - 10.00 WIB</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#C998A0] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-[#2C2623]">Masjid Agung Sunda Kelapa</p>
                        <p>Jl. Taman Sunda Kelapa No.16, Menteng, Jakarta Pusat</p>
                      </div>
                    </div>
                  </div>

                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#2C2623] text-white text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl hover:bg-[#3E3632] transition-colors"
                  >
                    <MapPin className="w-4 h-4" /> Buka Peta Lokasi
                  </a>
                </div>

                {/* Resepsi Pernikahan */}
                <div className="bg-white p-8 rounded-3xl border border-[#EBE5DA] shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b border-[#EBE5DA] pb-4">
                    <h3 className="font-serif-display text-2xl font-bold text-[#2C2623]">
                      Resepsi Pernikahan
                    </h3>
                    <div className="p-2.5 bg-[#F5C2C9]/20 rounded-xl text-[#2C2623]">
                      <Sparkles className="w-5 h-5 text-[#C998A0]" />
                    </div>
                  </div>

                  <div className="space-y-3 text-xs text-[#5A4E48]">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-4 h-4 text-[#C998A0] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-[#2C2623]">Minggu, 12 Oktober 2026</p>
                        <p>Pukul 11.00 - 15.00 WIB</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#C998A0] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-[#2C2623]">Ballroom Hotel Gran Mahakam</p>
                        <p>Jl. Mahakam No.8, Kebayoran Baru, Jakarta Selatan</p>
                      </div>
                    </div>
                  </div>

                  <a 
                    href="https://calendar.google.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#2C2623] text-white text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl hover:bg-[#3E3632] transition-colors"
                  >
                    <Calendar className="w-4 h-4" /> Simpan Ke Kalender
                  </a>
                </div>

              </div>

            </div>
          </section>

          {/* ================= AMPLOP DIGITAL & GIFT ================= */}
          <section className="py-20 px-6 max-w-4xl mx-auto text-center space-y-12">
            
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase font-bold tracking-[0.25em] text-[#C998A0]">
                Amplop Digital
              </span>
              <h2 className="font-serif-display text-3xl sm:text-5xl font-extrabold text-[#2C2623]">
                Tanda Kasih &amp; Hadiah
              </h2>
              <p className="text-xs sm:text-sm text-[#6B5E58] max-w-lg mx-auto font-light">
                Doa restu Anda merupakan hadiah terindah. Namun jika ingin memberi hadiah fisik atau berupa dana cashless, dapat dikirim via rekening berikut:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              
              {/* Bank BCA */}
              <div className="bg-white p-6 rounded-3xl border border-[#EBE5DA] shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-black text-xl text-blue-900 tracking-wider">BCA</span>
                  <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-800 px-2.5 py-1 rounded">Transfer Bank</span>
                </div>
                <div>
                  <p className="text-xs text-[#7A6B65]">Nomor Rekening:</p>
                  <p className="font-mono text-lg font-extrabold text-[#2C2623] tracking-widest">8830192841</p>
                  <p className="text-xs text-[#6B5E58]">a.n. Ahmad Rizky Pratama</p>
                </div>
                <button
                  onClick={() => handleCopy("8830192841", "bca")}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#F6EFEA] hover:bg-[#EBE3DE] text-[#2C2623] text-xs font-bold uppercase py-2.5 rounded-xl transition-all"
                >
                  {copiedBank === "bca" ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  {copiedBank === "bca" ? "Tersalin!" : "Salin Rekening"}
                </button>
              </div>

              {/* Bank Mandiri */}
              <div className="bg-white p-6 rounded-3xl border border-[#EBE5DA] shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-black text-xl text-amber-700 tracking-wider">MANDIRI</span>
                  <span className="text-[10px] font-mono font-bold bg-amber-50 text-amber-800 px-2.5 py-1 rounded">Transfer Bank</span>
                </div>
                <div>
                  <p className="text-xs text-[#7A6B65]">Nomor Rekening:</p>
                  <p className="font-mono text-lg font-extrabold text-[#2C2623] tracking-widest">1370019283741</p>
                  <p className="text-xs text-[#6B5E58]">a.n. Anisa Nurul Rahma</p>
                </div>
                <button
                  onClick={() => handleCopy("1370019283741", "mandiri")}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#F6EFEA] hover:bg-[#EBE3DE] text-[#2C2623] text-xs font-bold uppercase py-2.5 rounded-xl transition-all"
                >
                  {copiedBank === "mandiri" ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  {copiedBank === "mandiri" ? "Tersalin!" : "Salin Rekening"}
                </button>
              </div>

            </div>
          </section>

          {/* ================= RSVP & BUKU TAMU SECTION ================= */}
          <section className="bg-[#F6EFEA] py-20 px-6 border-t border-[#EBE5DA]">
            <div className="max-w-4xl mx-auto space-y-12">
              
              <div className="text-center space-y-3">
                <span className="text-xs font-mono uppercase font-bold tracking-[0.25em] text-[#C998A0]">
                  RSVP &amp; Buku Tamu
                </span>
                <h2 className="font-serif-display text-3xl sm:text-5xl font-extrabold text-[#2C2623]">
                  Konfirmasi Kehadiran &amp; Doa Restu
                </h2>
              </div>

              {/* Form Input */}
              <form onSubmit={handleRsvpSubmit} className="bg-white p-8 rounded-3xl border border-[#EBE5DA] shadow-md space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold uppercase text-[#7A6B65]">Nama Anda</label>
                    <input 
                      type="text" 
                      value={rsvpName} 
                      onChange={e => setRsvpName(e.target.value)}
                      placeholder="Masukkan nama lengkap"
                      required
                      className="w-full px-4 py-3 text-xs rounded-xl border border-[#EBE3DE] focus:outline-none focus:ring-2 focus:ring-[#C998A0]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold uppercase text-[#7A6B65]">Konfirmasi Kehadiran</label>
                    <select 
                      value={rsvpAttendance}
                      onChange={e => setRsvpAttendance(e.target.value as any)}
                      className="w-full px-4 py-3 text-xs rounded-xl border border-[#EBE3DE] focus:outline-none focus:ring-2 focus:ring-[#C998A0]"
                    >
                      <option value="Hadir">Hadir</option>
                      <option value="Ragu-ragu">Ragu-ragu</option>
                      <option value="Tidak Hadir">Tidak Hadir</option>
                    </select>
                  </div>

                </div>

                {rsvpAttendance === "Hadir" && (
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold uppercase text-[#7A6B65]">Jumlah Tamu yang Hadir</label>
                    <input 
                      type="number" 
                      min="1" 
                      max="5" 
                      value={rsvpPax}
                      onChange={e => setRsvpPax(Number(e.target.value))}
                      className="w-full px-4 py-3 text-xs rounded-xl border border-[#EBE3DE] focus:outline-none focus:ring-2 focus:ring-[#C998A0]"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold uppercase text-[#7A6B65]">Pesan Doa Restu</label>
                  <textarea 
                    rows={4}
                    value={rsvpMessage}
                    onChange={e => setRsvpMessage(e.target.value)}
                    placeholder="Tuliskan ucapan selamat & doa restu Anda untuk kedua mempelai..."
                    required
                    className="w-full px-4 py-3 text-xs rounded-xl border border-[#EBE3DE] focus:outline-none focus:ring-2 focus:ring-[#C998A0]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#2C2623] text-white text-xs font-bold uppercase tracking-wider py-4 rounded-xl hover:bg-[#3E3632] transition-all shadow-md cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#F5C2C9]" /> {isSubmitting ? "Mengirim..." : "Kirim Konfirmasi & Doa"}
                </button>
              </form>

              {/* Feed Ucapan Doa */}
              <div className="space-y-4 pt-6">
                <h3 className="font-serif-display text-xl font-bold text-[#2C2623] border-b border-[#EBE5DA] pb-3">
                  Doa Restu dari Tamu Undangan ({wishes.length})
                </h3>

                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {wishes.map((w) => (
                    <div key={w.id} className="bg-white p-5 rounded-2xl border border-[#EBE5DA] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#2C2623]">{w.name}</span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                          w.attendance === "Hadir" ? "bg-emerald-50 text-emerald-800" : "bg-gray-100 text-gray-700"
                        }`}>
                          {w.attendance} {w.pax > 0 ? `(${w.pax} Person)` : ''}
                        </span>
                      </div>
                      <p className="text-xs text-[#5A4E48] font-light leading-relaxed">{w.message}</p>
                      <span className="text-[10px] font-mono text-[#8A7A73] block">{w.time}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* ================= FOOTER ================= */}
          <footer className="bg-[#2C2623] text-white py-12 px-6 text-center space-y-4">
            <div className="max-w-md mx-auto space-y-3">
              <h4 className="font-serif-display text-2xl font-bold">Ahmad &amp; Anisa</h4>
              <p className="text-xs text-white/70 font-light">
                Terima kasih atas doa restu dan kehadiran Anda di hari bahagia kami.
              </p>
              <div className="pt-4 border-t border-white/10 flex flex-col items-center gap-3">
                <span className="text-[11px] font-mono text-white/60">Buat Undangan Digital Eksklusif Seperti Ini</span>
                <Link 
                  to="/harga" 
                  className="inline-flex items-center gap-2 bg-[#F5C2C9] text-[#2C2623] text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-xl hover:bg-white transition-colors"
                >
                  <Sparkles className="w-4 h-4" /> Pesan Sekarang
                </Link>
              </div>
            </div>
          </footer>

        </div>
      )}

    </div>
  )
}
