import { useState } from "react"
import Navbar from "@/components/Navbar"
import { 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  Heart, 
  Send, 
  QrCode, 
  Download, 
  Sparkles, 
  Search, 
  UserCheck
} from "lucide-react"

interface GuestMessage {
  id: string
  name: string
  relation: string
  attendance: "Hadir" | "Ragu-ragu" | "Tidak Hadir"
  paxCount: number
  message: string
  createdAt: string
  likes: number
}

const initialMessages: GuestMessage[] = [
  {
    id: "g1",
    name: "Budi Santoso & Partner",
    relation: "Sahabat SMA",
    attendance: "Hadir",
    paxCount: 2,
    message: "Selamat ya Andi & Nisa! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Lancar terus sampai hari H!",
    createdAt: "10 menit yang lalu",
    likes: 12
  },
  {
    id: "g2",
    name: "Siti Rahmawati",
    relation: "Rekan Kerja",
    attendance: "Hadir",
    paxCount: 1,
    message: "Selamat menempuh hidup baru sahabatku! Doa terbaik selalu menyertai kalian berdua. Maaf telat kasih ucapan!",
    createdAt: "25 menit yang lalu",
    likes: 8
  },
  {
    id: "g3",
    name: "Keluarga Besar H. Suherman",
    relation: "Keluarga",
    attendance: "Hadir",
    paxCount: 4,
    message: "Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fii khair. InsyaAllah kami sekeluarga hadir!",
    createdAt: "1 jam yang lalu",
    likes: 24
  },
  {
    id: "g4",
    name: "Rian Pratama",
    relation: "Teman Kuliah",
    attendance: "Tidak Hadir",
    paxCount: 0,
    message: "Happy Wedding bro Andi! Mohon maaf banget belum bisa hadir langsung karena tugas dinas di luar kota. Doa terbaik buat kalian berdua!",
    createdAt: "3 jam yang lalu",
    likes: 5
  }
]

export default function BukuTamuPage() {
  const [messages, setMessages] = useState<GuestMessage[]>(initialMessages)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterAttendance, setFilterAttendance] = useState<string>("Semua")

  // Form State
  const [guestName, setGuestName] = useState("")
  const [guestRelation, setGuestRelation] = useState("Teman")
  const [guestAttendance, setGuestAttendance] = useState<"Hadir" | "Ragu-ragu" | "Tidak Hadir">("Hadir")
  const [guestPax, setGuestPax] = useState<number>(2)
  const [guestMessage, setGuestMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!guestName.trim() || !guestMessage.trim()) return

    const newMessage: GuestMessage = {
      id: Date.now().toString(),
      name: guestName.trim(),
      relation: guestRelation,
      attendance: guestAttendance,
      paxCount: guestAttendance === "Hadir" ? guestPax : 0,
      message: guestMessage.trim(),
      createdAt: "Baru saja",
      likes: 0
    }

    setMessages([newMessage, ...messages])
    setGuestName("")
    setGuestMessage("")
    setGuestPax(2)
  }

  const handleLikeMessage = (id: string) => {
    setMessages(messages.map(m => m.id === id ? { ...m, likes: m.likes + 1 } : m))
  }

  // Analytics
  const totalSubmissions = messages.length
  const totalAttending = messages.filter(m => m.attendance === "Hadir").length
  const totalPax = messages.reduce((acc, curr) => acc + curr.paxCount, 0)
  const totalDeclined = messages.filter(m => m.attendance === "Tidak Hadir").length

  const filteredMessages = messages.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.message.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterAttendance === "Semua" || m.attendance === filterAttendance
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#2A2421] font-sans flex flex-col justify-between relative overflow-hidden">
      
      {/* ================= 1. HEADER ================= */}
      <Navbar activePage="bukutamu" />

      {/* ================= 2. HERO BANNER ================= */}
      <section className="blush-gradient py-16 sm:py-24 px-6 text-center relative border-b border-[#EBE5DA]">
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">

          <h1 className="font-serif-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[#2A2421] leading-tight">
            Buku Tamu Digital &amp; Ucapan Doa
          </h1>

          <p className="text-sm sm:text-base text-[#5A504A] max-w-2xl mx-auto font-light leading-relaxed">
            Tempat para tamu undangan menyampaikan doa restu, mengonfirmasi kehadiran (RSVP), dan menerima QR Code check-in eksklusif.
          </p>
        </div>
      </section>

      {/* ================= 3. ANALYTICS CARDS ================= */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 -mt-8 relative z-30">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-3xl border border-[#EBE5DA] shadow-md space-y-2">
            <div className="flex items-center justify-between text-[#78736A] text-[11px] font-mono font-semibold uppercase">
              <span>Total Respon Buku Tamu</span>
              <MessageSquare className="w-4 h-4 text-[#8C5B00]" />
            </div>
            <p className="font-serif-display text-3xl font-extrabold text-[#2A2421]">
              {totalSubmissions} Pesan
            </p>
            <span className="text-[11px] text-[#78736A]">Ucapan &amp; doa masuk.</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#EBE5DA] shadow-md space-y-2">
            <div className="flex items-center justify-between text-[#78736A] text-[11px] font-mono font-semibold uppercase">
              <span>Konfirmasi Hadir</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="font-serif-display text-3xl font-extrabold text-emerald-700">
              {totalAttending} Tamu
            </p>
            <span className="text-[11px] text-emerald-600 font-medium">Siap merayakan hari bahagia.</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#EBE5DA] shadow-md space-y-2">
            <div className="flex items-center justify-between text-[#78736A] text-[11px] font-mono font-semibold uppercase">
              <span>Total Estimasi Pax</span>
              <UserCheck className="w-4 h-4 text-blue-600" />
            </div>
            <p className="font-serif-display text-3xl font-extrabold text-blue-700">
              {totalPax} Orang
            </p>
            <span className="text-[11px] text-blue-600 font-medium">Rencana kehadiran catering.</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#EBE5DA] shadow-md space-y-2">
            <div className="flex items-center justify-between text-[#78736A] text-[11px] font-mono font-semibold uppercase">
              <span>Berhalangan Hadir</span>
              <XCircle className="w-4 h-4 text-gray-400" />
            </div>
            <p className="font-serif-display text-3xl font-extrabold text-gray-500">
              {totalDeclined} Tamu
            </p>
            <span className="text-[11px] text-gray-500 font-medium">Tetap memberikan doa restu.</span>
          </div>

        </div>
      </section>

      {/* ================= 4. MAIN FORM & FEED SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Form Kirim Ucapan & RSVP */}
          <div className="bg-white p-8 rounded-3xl border border-[#EBE5DA] shadow-xs space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono font-semibold tracking-widest text-[#8C5B00] uppercase">
                Tuliskan Doa Restu
              </span>
              <h3 className="font-serif-display text-2xl font-bold text-[#2A2421]">
                Isi Buku Tamu &amp; RSVP
              </h3>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-[#5A504A] block mb-1">
                  Nama Anda / Pasangan *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="Contoh: Rian &amp; Partner"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full text-xs border border-[#EBE5DA] rounded-xl px-4 py-3 bg-[#FBF9F5] focus:outline-none focus:border-[#2A2421]"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#5A504A] block mb-1">
                  Hubungan / Kerabat
                </label>
                <select 
                  value={guestRelation}
                  onChange={(e) => setGuestRelation(e.target.value)}
                  className="w-full text-xs border border-[#EBE5DA] rounded-xl px-4 py-3 bg-[#FBF9F5] focus:outline-none focus:border-[#2A2421]"
                >
                  <option value="Sahabat / Teman">Sahabat / Teman</option>
                  <option value="Keluarga / Kerabat">Keluarga / Kerabat</option>
                  <option value="Rekan Kerja">Rekan Kerja</option>
                  <option value="Tetangga / Kerabat Orang Tua">Tetangga / Kerabat Orang Tua</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-[#5A504A] block mb-1">
                  Konfirmasi Kehadiran
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "Hadir", label: "Hadir" },
                    { id: "Ragu-ragu", label: "Ragu" },
                    { id: "Tidak Hadir", label: "Absen" }
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setGuestAttendance(item.id as any)}
                      className={`py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                        guestAttendance === item.id 
                          ? "bg-[#2A2421] text-white border-[#2A2421]" 
                          : "bg-[#FBF9F5] text-[#2A2421] border-[#EBE5DA] hover:bg-[#F2ECE1]"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {guestAttendance === "Hadir" && (
                <div>
                  <label className="text-xs font-medium text-[#5A504A] block mb-1">
                    Jumlah Orang yang Hadir
                  </label>
                  <select 
                    value={guestPax}
                    onChange={(e) => setGuestPax(Number(e.target.value))}
                    className="w-full text-xs border border-[#EBE5DA] rounded-xl px-4 py-3 bg-[#FBF9F5] focus:outline-none focus:border-[#2A2421]"
                  >
                    <option value={1}>1 Orang (Sendiri)</option>
                    <option value={2}>2 Orang (Berdua)</option>
                    <option value={3}>3 Orang (Keluarga Kecil)</option>
                    <option value={4}>4 Orang (Rombongan Keluarga)</option>
                  </select>
                </div>
              )}

              <div>
                <label className="text-xs font-medium text-[#5A504A] block mb-1">
                  Pesan &amp; Doa Restu *
                </label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Tuliskan ucapan selamat &amp; doa terbaik untuk kedua mempelai..."
                  value={guestMessage}
                  onChange={(e) => setGuestMessage(e.target.value)}
                  className="w-full text-xs border border-[#EBE5DA] rounded-xl px-4 py-3 bg-[#FBF9F5] focus:outline-none focus:border-[#2A2421]"
                />
              </div>

              <button 
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#2A2421] text-white text-xs font-bold tracking-[0.15em] uppercase py-3.5 rounded-xl hover:bg-[#3D332F] transition-all shadow-xs cursor-pointer"
              >
                <Send className="w-4 h-4" /> Kirim Ucapan Doa
              </button>
            </form>
          </div>

          {/* Live Guestbook Feed */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Search & Filter Bar */}
            <div className="bg-white p-6 rounded-3xl border border-[#EBE5DA] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input 
                  type="text" 
                  placeholder="Cari nama / ucapan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs border border-[#EBE5DA] rounded-xl pl-9 pr-4 py-2.5 bg-[#FBF9F5] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                {["Semua", "Hadir", "Tidak Hadir"].map(f => (
                  <button
                    key={f}
                    onClick={() => setFilterAttendance(f)}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
                      filterAttendance === f 
                        ? "bg-[#2A2421] text-white border-[#2A2421]" 
                        : "bg-[#FBF9F5] text-[#2A2421] border-[#EBE5DA] hover:bg-[#F2ECE1]"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Guest Messages List */}
            <div className="space-y-4">
              {filteredMessages.map((msg) => (
                <div 
                  key={msg.id}
                  className="bg-white rounded-3xl p-6 border border-[#EBE5DA] shadow-xs hover:shadow-md transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {/* Avatar Initials */}
                      <div className="w-10 h-10 rounded-full bg-[#FBF3DB] text-[#8C5B00] border border-[#F5E5B8] flex items-center justify-center font-bold text-sm">
                        {msg.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-serif-display font-bold text-base text-[#2A2421]">
                          {msg.name}
                        </h4>
                        <span className="text-[11px] text-[#78736A] font-mono">
                          {msg.relation} • {msg.createdAt}
                        </span>
                      </div>
                    </div>

                    {/* Attendance Badge */}
                    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-3 py-1 rounded-full border ${
                      msg.attendance === "Hadir"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : msg.attendance === "Ragu-ragu"
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : "bg-gray-50 text-gray-600 border-gray-200"
                    }`}>
                      {msg.attendance === "Hadir" && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                      {msg.attendance === "Tidak Hadir" && <XCircle className="w-3.5 h-3.5 text-gray-400" />}
                      {msg.attendance} {msg.paxCount > 0 && `(${msg.paxCount} Orang)`}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#4A433E] font-light leading-relaxed bg-[#FBF9F5] p-4 rounded-2xl border border-[#F2ECE1]">
                    "{msg.message}"
                  </p>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <button 
                      onClick={() => handleLikeMessage(msg.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C5B00] hover:text-[#2A2421] transition-colors cursor-pointer"
                    >
                      <Heart className="w-4 h-4 fill-[#8C5B00] text-[#8C5B00]" /> {msg.likes} Doa Terima Kasih
                    </button>
                    <span className="text-[10px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                      ✓ Terverifikasi Undangan
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ================= 5. FEATURES & QR CHECK-IN HIGHLIGHT ================= */}
      <section className="bg-[#F3EFE6] py-16 sm:py-24 border-t border-b border-[#EBE5DA]">
        <div className="max-w-6xl mx-auto px-6 sm:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono font-semibold tracking-widest text-[#8C5B00] uppercase">
              Keunggulan Fitur
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-extrabold text-[#2A2421]">
              Mengapa Memakai Buku Tamu Digital Magis?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-[#EBE5DA] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FBF3DB] text-[#8C5B00] flex items-center justify-center">
                <QrCode className="w-6 h-6" />
              </div>
              <h3 className="font-serif-display text-2xl font-bold text-[#2A2421]">
                Check-in QR Code Venue
              </h3>
              <p className="text-xs text-[#78736A] leading-relaxed">
                Tamu secara otomatis mendapatkan tiket QR Code digital untuk dipindai saat kedatangan di meja resepsi acara.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#EBE5DA] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FBF3DB] text-[#8C5B00] flex items-center justify-center">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="font-serif-display text-2xl font-bold text-[#2A2421]">
                Export Data Excel / PDF
              </h3>
              <p className="text-xs text-[#78736A] leading-relaxed">
                Unduh rekapitulasi data kehadiran dan seluruh ucapan doa dari sahabat ke file Excel kapan saja sekali klik.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#EBE5DA] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FBF3DB] text-[#8C5B00] flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif-display text-2xl font-bold text-[#2A2421]">
                Bebas Spam &amp; Realtime
              </h3>
              <p className="text-xs text-[#78736A] leading-relaxed">
                Dilengkapi perlindungan anti-spam dan sistem moderasi pesan agar buku ucapan doa Anda selalu rapi dan sopan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 6. FOOTER ================= */}
      <footer className="bg-[#FBF9F5] border-t border-[#EBE5DA] py-8 text-center text-xs text-[#78736A]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/assets/transaparanlogo.png" alt="Logo" className="h-6 w-auto brightness-0" />
            <span className="font-serif-display font-bold text-sm text-[#2A2421]">Magis Digital Guestbook System</span>
          </div>
          <p>© 2026 Magis Tech. Sistem Buku Tamu &amp; RSVP Undangan Digital.</p>
        </div>
      </footer>

    </div>
  )
}
