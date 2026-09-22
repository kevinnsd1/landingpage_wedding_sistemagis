import React from 'react';
import {
  Heart,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  CheckSquare,
  Wallet,
  Smartphone,
  ShieldCheck,
  Music,
  Share2,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export interface LandingPageProps {
  onNavigate: (view: string) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export function LandingPage({ onNavigate, isLoggedIn, onLogout }: LandingPageProps) {
  const themes = [
    {
      id: 'serenity',
      name: 'Serenity Theme',
      desc: 'Romantisme klasik dengan aksen floral soft pink, ornamen lembut, dan nuansa elegan.',
      color: 'from-[#FFF0F3] to-[#FCFCFC]',
      border: 'border-[#FCBACB]',
      badge: 'Favorit Pasangan',
    },
    {
      id: 'bloom',
      name: 'Bloom Theme',
      desc: 'Kehangatan alam botani dengan palet cream lembut, dedaunan, dan sentuhan gold.',
      color: 'from-[#F7F5EE] to-[#FCFAF6]',
      border: 'border-[#B9DCA9]',
      badge: 'Botanical Warm',
    },
    {
      id: 'aurora',
      name: 'Aurora Theme',
      desc: 'Gaya modern kontemporer minimalis dengan tipografi tegas, bersih, dan tampilan editorial.',
      color: 'from-neutral-900 to-neutral-800 text-white',
      border: 'border-neutral-700',
      badge: 'Modern Minimalist',
    },
  ];

  const features = [
    {
      icon: <Smartphone className="w-6 h-6 text-slate-800" />,
      title: 'Undangan Digital Responsif',
      desc: 'Tampilan mobile-first yang indah untuk semua jenis smartphone tamu dengan pemutar musik latar dan hitung mundur live.',
    },
    {
      icon: <Users className="w-6 h-6 text-slate-800" />,
      title: 'Token & Link Tamu Personal',
      desc: 'Setiap tamu menerima link khusus dengan sapaan nama ("Kepada Yth. Bapak/Ibu...") dan 1-klik generator WhatsApp.',
    },
    {
      icon: <CheckSquare className="w-6 h-6 text-slate-800" />,
      title: 'Kanban Wedding Planner',
      desc: 'Atur persiapan pernikahan bersama pasangan dengan papan To Do, In Progress, dan Done yang rapi.',
    },
    {
      icon: <Wallet className="w-6 h-6 text-slate-800" />,
      title: 'Manajemen Budget & Biaya',
      desc: 'Kendalikan estimasi dan realisasi pengeluaran katering, venue, hingga busana pengantin secara transparan.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-slate-800" />,
      title: 'Buku Tamu & RSVP Terintegrasi',
      desc: 'Pantau jumlah kepastian kehadiran secara real-time dan baca ucapan doa restu dari para sahabat.',
    },
    {
      icon: <Share2 className="w-6 h-6 text-slate-800" />,
      title: 'Amplop Digital & Rekening',
      desc: 'Fasilitasi tanda kasih para tamu melalui rekening transfer dengan tombol 1-klik salin nomor rekening.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FCFCFC] flex flex-col text-neutral-900">
      <Navbar
        onNavigate={onNavigate}
        currentView="landing"
        isLoggedIn={isLoggedIn}
        onLogout={onLogout}
      />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-32 bg-soft-gradient">
        {/* Subtle neutral ambient blur */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-neutral-200/40 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Top Pill Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-semibold text-neutral-700 mb-6 animate-in fade-in">
            <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
            <span>Digital Wedding Invitation & Management Platform</span>
          </div>

          {/* Heading */}
          <h1 className="font-brand text-5xl sm:text-7xl text-neutral-900 max-w-4xl mx-auto leading-tight tracking-tight mb-6">
            Satu tempat untuk merangkai <span className="text-brand-gradient">kisah magis</span> dan persiapan pernikahanmu.
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg text-neutral-600 max-w-2xl mx-auto font-light leading-relaxed mb-10">
            Bukan sekadar undangan digital biasa. KisahMagis memadukan keindahan undangan romantis dengan sistem manajemen tamu, RSVP, kanban planner, dan anggaran pernikahan yang terstruktur.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate(isLoggedIn ? 'dashboard' : 'register')}
              icon={<Heart className="w-4 h-4 fill-current text-white" />}
              className="w-full sm:w-auto shadow-sm text-sm h-12 px-8"
            >
              {isLoggedIn ? 'Buka Dashboard Saya' : 'Mulai Membuat Undangan Gratis'}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate('invitation-demo')}
              icon={<ExternalLink className="w-4 h-4 text-neutral-500" />}
              className="w-full sm:w-auto text-sm h-12 px-6"
            >
              Lihat Contoh Undangan
            </Button>
          </div>

          {/* Hero Mockup Preview */}
          <div className="relative max-w-5xl mx-auto">
            <div className="rounded-3xl border border-neutral-200/80 bg-white p-3 sm:p-5 shadow-elevated">
              <div className="rounded-2xl overflow-hidden border border-neutral-100 bg-[#FCFCFC] grid grid-cols-1 md:grid-cols-12 gap-0">
                {/* Left: Invitation sneak peek */}
                <div className="md:col-span-5 p-8 bg-neutral-50/50 border-r border-neutral-200/80 flex flex-col items-center justify-center text-center">
                  <span className="text-xs text-slate-500 font-medium mb-2">
                    The Wedding of
                  </span>
                  <p className="font-brand text-3xl text-neutral-900 mb-1">Andi & Sari</p>
                  <span className="text-xs text-neutral-500 font-light mb-6">20 Desember 2026</span>

                  <div className="w-32 h-32 rounded-full overflow-hidden border border-neutral-200 p-1 mb-6 shadow-2xs">
                    <img
                      src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80"
                      alt="Sample Couple"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  <div className="bg-white px-4 py-2.5 rounded-lg border border-neutral-200 text-xs text-neutral-600 shadow-2xs mb-4">
                    Kepada Yth. <strong className="text-neutral-900">Budi Santoso & Partner</strong>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onNavigate('invitation-demo')}
                    className="text-xs px-5"
                  >
                    Buka Undangan Live
                  </Button>
                </div>

                {/* Right: Dashboard sneak peek */}
                <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-bold text-neutral-900">Dashboard Manajemen Pengantin</h4>
                      <Badge variant="success" size="sm">Live Connected</Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="p-3 bg-white rounded-lg border border-neutral-200/70 shadow-2xs">
                        <span className="text-xs text-slate-500 font-medium block">Total Tamu</span>
                        <span className="text-lg font-bold text-neutral-900">150 Pax</span>
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-neutral-200/70 shadow-2xs">
                        <span className="text-xs text-slate-500 font-medium block">Hadir RSVP</span>
                        <span className="text-lg font-bold text-emerald-600">124 Tamu</span>
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-neutral-200/70 shadow-2xs">
                        <span className="text-xs text-slate-500 font-medium block">Anggaran</span>
                        <span className="text-lg font-bold text-amber-600">92% Aman</span>
                      </div>
                    </div>

                    {/* Mini Task checklist */}
                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-neutral-500 block mb-2">Checklist Planner</span>
                      <div className="flex items-center gap-2 p-2.5 rounded-md bg-white border border-neutral-200/70 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span className="line-through text-neutral-400">Booking Plataran Dharmawangsa</span>
                      </div>
                      <div className="flex items-center gap-2 p-2.5 rounded-md bg-white border border-neutral-200/70 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span className="line-through text-neutral-400">Pilih Cincin & Busana Pengantin</span>
                      </div>
                      <div className="flex items-center gap-2 p-2.5 rounded-md bg-white border border-neutral-200/70 text-xs">
                        <div className="w-4 h-4 rounded-full border border-neutral-300 flex-shrink-0" />
                        <span className="text-neutral-900 font-medium">Distribusi Undangan Digital via WhatsApp</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-200/70 flex items-center justify-between text-xs text-neutral-400">
                    <span>Semua fitur saling terintegrasi dalam 1 akun</span>
                    <span className="text-neutral-900 font-semibold">andi-sari.kisahmagis.id</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY KISAHMAGIS / VALUE PROP */}
      <section className="py-20 bg-white border-y border-neutral-200/80" id="fitur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold text-slate-500 block mb-2">
              Satu Ekosistem Terpadu
            </span>
            <h2 className="font-brand text-3xl sm:text-5xl text-neutral-900 mb-4">
              Semua Kebutuhan Pernikahan Tanpa Ribet
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 font-light">
              Tak perlu lagi mencatat tamu di spreadsheet terpisah, checklist tercecer di chat, atau website undangan tanpa sinkronisasi data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, idx) => (
              <Card key={idx} hoverable className="p-6">
                <div className="w-12 h-12 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center mb-4">
                  {feat.icon}
                </div>
                <h3 className="text-base font-bold text-neutral-900 mb-2">{feat.title}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed font-light">{feat.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* THEMES SHOWCASE */}
      <section className="py-20 bg-[#FCFCFC]" id="tema">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold text-slate-500 block mb-2">
              Koleksi Estetik
            </span>
            <h2 className="font-brand text-3xl sm:text-5xl text-neutral-900 mb-4">
              Pilihan Tema yang Menawan
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 font-light">
              Pilih dari tema-tema curated yang memikat, dirancang dengan tipografi indah dan komposisi visual yang romantis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {themes.map((t) => (
              <Card key={t.id} hoverable className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="primary" size="sm">
                      {t.badge}
                    </Badge>
                  </div>
                  <div className={`w-full h-44 rounded-xl bg-gradient-to-br ${t.color} border ${t.border} p-5 flex flex-col items-center justify-center text-center shadow-inner mb-5`}>
                    <Heart className="w-6 h-6 mb-2 opacity-80" />
                    <p className="font-brand text-2xl font-bold">Andi & Sari</p>
                    <span className="text-xs tracking-wider opacity-80 mt-1">20.12.2026</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">{t.name}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed mb-6 font-light">{t.desc}</p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNavigate('invitation-demo')}
                  icon={<Sparkles className="w-3.5 h-3.5 text-neutral-400" />}
                  className="w-full text-xs"
                >
                  Lihat Contoh Tema
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="py-20 bg-white border-t border-neutral-200/80" id="harga">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold text-slate-500 block mb-2">
              Pilihan Paket
            </span>
            <h2 className="font-brand text-3xl sm:text-5xl text-neutral-900 mb-4">
              Investasi Menuju Hari Bahagia
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 font-light">
              Mulai secara gratis dan upgrade kapan saja jika Anda membutuhkan kapasitas tamu tanpa batas dan custom musik.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free */}
            <Card className="p-8 border border-neutral-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500 block mb-1">
                  Paket Dasar
                </span>
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">Gratis Selamanya</h3>
                <p className="text-xs text-neutral-500 mb-6 font-light">
                  Cocok untuk mencoba membuat undangan dan merencanakan pernikahan tahap awal.
                </p>

                <div className="text-3xl font-extrabold text-neutral-900 mb-6">
                  Rp 0
                  <span className="text-xs text-neutral-400 font-normal"> / pernikahan</span>
                </div>

                <ul className="space-y-3 text-xs text-neutral-600 mb-8">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Tema Klasik Serenity</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Hingga 50 Tamu Undangan</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Formulir RSVP & Buku Tamu</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Papan Kanban Planner Dasar</span>
                  </li>
                </ul>
              </div>

              <Button
                variant="outline"
                size="md"
                onClick={() => onNavigate('register')}
                className="w-full text-xs font-semibold"
              >
                Mulai Gratis
              </Button>
            </Card>

            {/* Premium */}
            <Card className="p-8 border-2 border-slate-900 bg-white shadow-elevated flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Badge variant="primary">Paling Populer</Badge>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-900 block mb-1">
                  Paket Lengkap
                </span>
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">Magis Premium</h3>
                <p className="text-xs text-neutral-500 mb-6 font-light">
                  Akses tak terbatas untuk seluruh fitur manajemen pernikahan dan tema premium.
                </p>

                <div className="text-3xl font-extrabold text-neutral-900 mb-6">
                  Rp 149.000
                  <span className="text-xs text-neutral-400 font-normal"> / sekali bayar</span>
                </div>

                <ul className="space-y-3 text-xs text-neutral-600 mb-8">
                  <li className="flex items-center gap-2.5 font-medium text-neutral-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Semua Tema (Serenity, Bloom, Aurora)</span>
                  </li>
                  <li className="flex items-center gap-2.5 font-medium text-neutral-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Tamu & Token Personalisasi Tanpa Batas</span>
                  </li>
                  <li className="flex items-center gap-2.5 font-medium text-neutral-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Kustom Musik Latar & Galeri HD</span>
                  </li>
                  <li className="flex items-center gap-2.5 font-medium text-neutral-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Planner Kanban, Budget Tracker & Vendor CRM</span>
                  </li>
                  <li className="flex items-center gap-2.5 font-medium text-neutral-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Tanpa Watermark / Brand Badge</span>
                  </li>
                </ul>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={() => onNavigate('register')}
                className="w-full text-xs font-semibold shadow-xs"
              >
                Pilih Magis Premium
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 bg-neutral-50/70 text-center border-t border-neutral-200/80">
        <div className="max-w-3xl mx-auto px-4">
          <Heart className="w-8 h-8 fill-slate-900 text-slate-900 mx-auto mb-4" />
          <h2 className="font-brand text-4xl sm:text-5xl text-neutral-900 mb-4">
            Rangkai Kisah Bahagiamu Sekarang
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 font-light mb-8 max-w-lg mx-auto">
            Hanya butuh beberapa menit untuk membuat undangan digital pertama Anda dan mulai mengelola seluruh checklist pernikahan.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => onNavigate(isLoggedIn ? 'dashboard' : 'register')}
            className="shadow-sm text-sm px-8"
          >
            {isLoggedIn ? 'Buka Dashboard' : 'Buat Undangan Pernikahan Saya'}
          </Button>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
