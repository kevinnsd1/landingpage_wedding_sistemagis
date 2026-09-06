import { useState } from "react"
import Navbar from "@/components/Navbar"
import { 
  MessageCircle, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight,
  Headphones
} from "lucide-react"

export default function KontakPage() {
  const whatsappNumber = "62895351878050"
  const formattedPhone = "0895-3518-78050"
  const defaultWaMessage = encodeURIComponent("Halo Magis Invitation, saya ingin berkonsultasi mengenai pemesanan undangan digital.")
  const waUrl = `https://wa.me/${whatsappNumber}?text=${defaultWaMessage}`

  // Form state
  const [name, setName] = useState("")
  const [phoneInput, setPhoneInput] = useState("")
  const [topic, setTopic] = useState("Pemesanan Undangan")
  const [message, setMessage] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !message) return

    // Redirect directly to WhatsApp with user input
    const customText = encodeURIComponent(
      `Halo Magis Invitation,\n\nNama: ${name}\nNo. HP: ${phoneInput || '-'}\nTopik: ${topic}\nPesan: ${message}`
    )
    window.open(`https://wa.me/${whatsappNumber}?text=${customText}`, "_blank")

    setIsSubmitted(true)
    setName("")
    setPhoneInput("")
    setMessage("")
  }

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#2A2421] font-sans flex flex-col justify-between relative overflow-hidden">
      
      {/* ================= 1. HEADER & HERO BANNER (BLUSH GRADIENT) ================= */}
      <div className="blush-gradient border-b border-[#EBE5DA]">
        <Navbar activePage="kontak" />

        <section className="py-16 sm:py-24 px-6 text-center relative">
          <div className="max-w-4xl mx-auto space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#8C5B00] uppercase bg-white/80 backdrop-blur-xs px-4 py-1.5 rounded-full border border-[#8C5B00]/20 shadow-xs">
              <Headphones className="w-3.5 h-3.5" /> Layanan Bantuan &amp; Konsultasi WhatsApp
            </div>

            <h1 className="font-serif-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[#2A2421] leading-tight">
              Hubungi Tim Magis
            </h1>

            <p className="text-sm sm:text-base text-[#5A504A] max-w-2xl mx-auto font-light leading-relaxed">
              Punya pertanyaan mengenai templat, harga, atau butuh bantuan pembuatan undangan pernikahan Anda? Tim kami siap membantu Anda kapan saja via WhatsApp.
            </p>

            <div className="pt-4 flex justify-center">
              <a 
                href={waUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] text-white text-xs font-bold tracking-[0.18em] uppercase px-8 py-4 rounded-xl hover:bg-[#20bd5a] transition-all shadow-md active:scale-98 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" /> Chat WhatsApp: {formattedPhone} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* ================= 3. CONTACT INFO CARDS ================= */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 -mt-8 relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* WhatsApp Card */}
          <div className="bg-white p-8 rounded-3xl border border-[#EBE5DA] shadow-md space-y-4 text-center md:text-left hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto md:mx-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-semibold tracking-wider text-[#78736A] uppercase block">
                Official WhatsApp
              </span>
              <h3 className="font-serif-display text-2xl font-extrabold text-[#2A2421]">
                {formattedPhone}
              </h3>
            </div>
            <p className="text-xs text-[#78736A] font-light">
              Layanan pesan cepat untuk konsultasi templat, kirim materi foto/momen, &amp; bantuan teknis.
            </p>
            <a 
              href={waUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline pt-1"
            >
              Buka WhatsApp Sekarang <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Jam Operasional Card */}
          <div className="bg-white p-8 rounded-3xl border border-[#EBE5DA] shadow-md space-y-4 text-center md:text-left hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#FBF3DB] text-[#8C5B00] flex items-center justify-center mx-auto md:mx-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-semibold tracking-wider text-[#78736A] uppercase block">
                Jam Operasional
              </span>
              <h3 className="font-serif-display text-2xl font-extrabold text-[#2A2421]">
                08.00 – 22.00 WIB
              </h3>
            </div>
            <p className="text-xs text-[#78736A] font-light">
              Senin sampai Minggu (Termasuk hari libur nasional). Pembuatan undangan kilat 1x24 jam.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Fast Response Service
            </div>
          </div>

          {/* Email Support Card */}
          <div className="bg-white p-8 rounded-3xl border border-[#EBE5DA] shadow-md space-y-4 text-center md:text-left hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto md:mx-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-semibold tracking-wider text-[#78736A] uppercase block">
                Email Customer Support
              </span>
              <h3 className="font-serif-display text-xl font-extrabold text-[#2A2421]">
                support@sistemagis.com
              </h3>
            </div>
            <p className="text-xs text-[#78736A] font-light">
              Untuk pengiriman aset materi besar, kerjasama vendor, atau penawaran partnership.
            </p>
            <a 
              href="mailto:support@sistemagis.com"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:underline pt-1"
            >
              Kirim Email Support <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </section>

      {/* ================= 4. FORM KONSULTASI & FAQ ================= */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Form Konsultasi WhatsApp */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#EBE5DA] shadow-xs space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono font-semibold tracking-widest text-[#8C5B00] uppercase">
                Formulir Cepat
              </span>
              <h3 className="font-serif-display text-3xl font-extrabold text-[#2A2421]">
                Kirim Pesan ke WhatsApp
              </h3>
              <p className="text-xs text-[#78736A] font-light">
                Isi form di bawah untuk langsung terhubung ke WhatsApp customer service kami.
              </p>
            </div>

            {isSubmitted && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Pesan telah disiapkan! Anda sedang diarahkan ke WhatsApp customer service.
              </div>
            )}

            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-[#5A504A] block mb-1">
                  Nama Anda *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="Contoh: Sarah"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs border border-[#EBE5DA] rounded-xl px-4 py-3 bg-[#FBF9F5] focus:outline-none focus:border-[#2A2421]"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#5A504A] block mb-1">
                  Nomor WhatsApp Anda
                </label>
                <input 
                  type="text" 
                  placeholder="Contoh: 08123456789"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  className="w-full text-xs border border-[#EBE5DA] rounded-xl px-4 py-3 bg-[#FBF9F5] focus:outline-none focus:border-[#2A2421]"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#5A504A] block mb-1">
                  Topik Pertanyaan
                </label>
                <select 
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full text-xs border border-[#EBE5DA] rounded-xl px-4 py-3 bg-[#FBF9F5] focus:outline-none focus:border-[#2A2421]"
                >
                  <option value="Pemesanan Undangan">Pemesanan Undangan Baru</option>
                  <option value="Tanya Templat / Fitur">Pertanyaan Templat &amp; Fitur</option>
                  <option value="Perubahan Data Undangan">Perubahan / Edit Data Undangan</option>
                  <option value="Partnership WO">Kerjasama Vendor / Wedding Organizer</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-[#5A504A] block mb-1">
                  Pesan atau Pertanyaan *
                </label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Tuliskan pertanyaan atau detail pemesanan undangan Anda..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-xs border border-[#EBE5DA] rounded-xl px-4 py-3 bg-[#FBF9F5] focus:outline-none focus:border-[#2A2421]"
                />
              </div>

              <button 
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#2A2421] text-white text-xs font-bold tracking-[0.15em] uppercase py-4 rounded-xl hover:bg-[#3D332F] transition-all shadow-sm cursor-pointer"
              >
                <Send className="w-4 h-4 text-emerald-400" /> Kirim via WhatsApp ({formattedPhone})
              </button>
            </form>
          </div>

          {/* FAQ Accordion Section */}
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold tracking-widest text-[#8C5B00] uppercase">
                Pertanyaan Umum (FAQ)
              </span>
              <h3 className="font-serif-display text-3xl font-extrabold text-[#2A2421]">
                Informasi Seputar Pemesanan
              </h3>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "Berapa lama proses pembuatan undangan digital?",
                  a: "Proses pembuatan hanya memakan waktu 1x24 jam setelah data pengantin, foto, dan lagu pilihan kami terima."
                },
                {
                  q: "Apakah bisa ganti foto, teks, dan musik setelah undangan jadi?",
                  a: "Bisa! Anda dapat meminta perubahan data acara, foto, atau lagu gratis tanpa biaya tambahan."
                },
                {
                  q: "Berapa banyak batas jumlah tamu yang bisa dikirimkan link?",
                  a: "Tanpa batas (Unlimited)! Anda bisa membuat ribuan nama tamu berbeda secara otomatis menggunakan Generator Nama Tamu kami."
                },
                {
                  q: "Bagaimana cara melakukan pembayaran?",
                  a: "Pembayaran sangat mudah via Transfer Bank (BCA, Mandiri, BRI, BNI) atau QRIS All Payment (GoPay, OVO, Dana, ShopeePay)."
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-[#EBE5DA] space-y-2">
                  <h4 className="font-serif-display font-bold text-lg text-[#2A2421] flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#8C5B00] shrink-0" />
                    {faq.q}
                  </h4>
                  <p className="text-xs text-[#6A635B] font-light leading-relaxed pl-6">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ================= 5. FOOTER ================= */}
      <footer className="bg-[#FBF9F5] border-t border-[#EBE5DA] py-8 text-center text-xs text-[#78736A]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/assets/transaparanlogo.png" alt="Logo" className="h-6 w-auto brightness-0" />
            <span className="font-serif-display font-bold text-sm text-[#2A2421]">Magis Invitation Customer Service</span>
          </div>
          <p>© 2026 Magis Tech. WA: {formattedPhone}</p>
        </div>
      </footer>

    </div>
  )
}
