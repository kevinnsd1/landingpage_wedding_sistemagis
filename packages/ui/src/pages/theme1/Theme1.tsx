import React, { useState, useEffect, useRef } from 'react';
import {
  Heart,
  Calendar,
  Clock,
  MapPin,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Send,
  Sparkles,
  Gift,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import bgImage from './assets/background/background.png';
import batik1 from './assets/aksesoris/batik1.png';
import batik2 from './assets/aksesoris/batik2.png';
import bunga1 from './assets/aksesoris/bunga1.png';
import bunga2 from './assets/aksesoris/bunga2.png';
import frame1 from './assets/aksesoris/frame1.png';

export interface Theme1Props {
  eventTitle?: string;
  subtitle?: string;
  brideName?: string;
  groomName?: string;
  brideFullName?: string;
  groomFullName?: string;
  brideParents?: string;
  groomParents?: string;
  bridePhoto?: string;
  groomPhoto?: string;
  coverPhoto?: string;
  weddingDate?: string;
  targetDate?: string; // ISO date for countdown
  guestName?: string;
  
  // Akad / Ceremony
  akadTitle?: string;
  akadDate?: string;
  akadTime?: string;
  akadLocation?: string;
  akadAddress?: string;
  
  // Resepsi / Reception
  resepsiTitle?: string;
  resepsiDate?: string;
  resepsiTime?: string;
  resepsiLocation?: string;
  resepsiAddress?: string;
  mapUrl?: string;
  
  // Gallery & Story
  gallery?: Array<{ url: string; caption?: string }>;
  loveStory?: Array<{ year: string; title: string; story: string }>;
  
  // Gift / Bank accounts
  bankAccounts?: Array<{
    bankName: string;
    accountNumber: string;
    accountHolder: string;
    qrUrl?: string;
  }>;
  giftAddress?: {
    recipientName: string;
    phone: string;
    address: string;
  };
  
  // Music
  musicUrl?: string;
  
  // Callback
  onOpen?: () => void;
}

export function Theme1({
  eventTitle = 'Ngunduh Mantu',
  subtitle = 'Pernikahan Tradisional Elegan',
  brideName = 'Mia',
  groomName = 'Dimas',
  brideFullName = 'Mia Ayu Lestari, S.Ked',
  groomFullName = 'Dimas Arya Pratama, S.T',
  brideParents = 'Putri tercinta dari Bpk. Bambang Sutrisno & Ibu Ratna Sari',
  groomParents = 'Putra tercinta dari Bpk. H. Hendra Wijaya & Ibu Hj. Siti Aminah',
  bridePhoto = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
  groomPhoto = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
  coverPhoto = 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&auto=format&fit=crop&q=80',
  weddingDate = 'Minggu, 18 Oktober 2026',
  targetDate = '2026-10-18T09:00:00',
  guestName = 'Bapak/Ibu/Saudara/i',
  
  akadTitle = 'Akad Nikah',
  akadDate = 'Minggu, 18 Oktober 2026',
  akadTime = '08.00 - 10.00 WITA',
  akadLocation = 'Masjid Agung Al-Ikhlas Denpasar',
  akadAddress = 'Jl. Diponegoro No. 123, Dauh Puri Klod, Kota Denpasar, Bali',
  
  resepsiTitle = 'Resepsi & Ngunduh Mantu',
  resepsiDate = 'Minggu, 18 Oktober 2026',
  resepsiTime = '11.00 - 15.00 WITA',
  resepsiLocation = 'Grand Ballroom Puri Asri',
  resepsiAddress = 'Jl. Gatot Subroto Barat No. 88, Denpasar Barat, Bali',
  mapUrl = 'https://maps.google.com',
  
  gallery = [
    { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80', caption: 'Pertemuan Pertama' },
    { url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80', caption: 'Momen Lamaran' },
    { url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&auto=format&fit=crop&q=80', caption: 'Prewedding Kasmaran' },
    { url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&auto=format&fit=crop&q=80', caption: 'Janji Suci' },
    { url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&auto=format&fit=crop&q=80', caption: 'Menuju Bahagia' },
    { url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&auto=format&fit=crop&q=80', caption: 'Cinta Abadi' },
  ],
  
  loveStory = [
    {
      year: '2021',
      title: 'Awal Perjumpaan',
      story: 'Takdir mempertemukan kami dalam sebuah acara budaya di Denpasar. Dari tatapan dan sapaan hangat, bersemi rasa yang tumbuh perlahan.',
    },
    {
      year: '2024',
      title: 'Mengikat Komitmen',
      story: 'Setelah melewati berbagai kisah suka dan duka bersama, dengan restu kedua orang tua, kami memutuskan untuk melangkah ke jenjang yang lebih serius.',
    },
    {
      year: '2026',
      title: 'Menuju Mahligai Cinta',
      story: 'Kini saatnya kami menyatukan dua hati dan keluarga dalam ikatan suci pernikahan yang penuh berkah dan cinta kasih.',
    },
  ],
  
  bankAccounts = [
    {
      bankName: 'BCA',
      accountNumber: '8910238472',
      accountHolder: 'Dimas Arya Pratama',
    },
    {
      bankName: 'Bank Mandiri',
      accountNumber: '1420019283741',
      accountHolder: 'Mia Ayu Lestari',
    },
  ],
  
  giftAddress = {
    recipientName: 'Dimas & Mia',
    phone: '0812-3456-7890',
    address: 'Jl. Kenanga Asri No. 18, Denpasar Selatan, Bali 80222',
  },
  
  musicUrl = 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-114407.mp3',
  onOpen,
}: Theme1Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  // Audio reference
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // RSVP Form state
  const [rsvpName, setRsvpName] = useState(guestName !== 'Bapak/Ibu/Saudara/i' ? guestName : '');
  const [rsvpStatus, setRsvpStatus] = useState<'hadir' | 'tidak_hadir' | 'ragu'>('hadir');
  const [rsvpCount, setRsvpCount] = useState(1);
  const [rsvpMessage, setRsvpMessage] = useState('');
  const [wishes, setWishes] = useState([
    {
      name: 'Rian & Sarah',
      status: 'hadir',
      message: 'Selamat berbahagia Dimas & Mia! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Aamiin.',
      time: 'Baru saja',
    },
    {
      name: 'Keluarga Bpk. Hartono',
      status: 'hadir',
      message: 'Barakallahu lakuma wa baraka alaikuma wa jama\'a bainakuma fii khair. Turut berbahagia untuk kedua mempelai.',
      time: '2 jam yang lalu',
    },
    {
      name: 'Gita Saraswati',
      status: 'hadir',
      message: 'Happy wedding Mia cantik & Dimas! Langgeng sampai kakek nenek ya! Sampai jumpa di resepsi.',
      time: '5 jam yang lalu',
    },
  ]);
  const [submittedRsvp, setSubmittedRsvp] = useState(false);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  // Handle open invitation
  const handleOpenInvitation = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.log('Audio autoplay prevented:', e);
      });
    }
    onOpen?.();

    // Smooth scroll to top of content after open
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(console.error);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(id);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  const handleSubmitRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim() || !rsvpMessage.trim()) return;

    setWishes([
      {
        name: rsvpName,
        status: rsvpStatus,
        message: rsvpMessage,
        time: 'Baru saja',
      },
      ...wishes,
    ]);
    setSubmittedRsvp(true);
    setRsvpMessage('');
  };

  return (
    <div className="relative w-full min-h-screen bg-[#380E14] text-[#F9EDE4] font-sans antialiased selection:bg-[#E8D5C4]/30 selection:text-[#FFF]">
      {/* Audio Element */}
      <audio ref={audioRef} src={musicUrl} loop preload="auto" />

      {/* Floating Music Button (Only when open) */}
      {isOpen && (
        <button
          onClick={toggleMusic}
          aria-label="Toggle Music"
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-[#EAD4BE] text-[#4A151B] shadow-2xl border-2 border-[#FFE8D1] hover:scale-110 active:scale-95 transition-all flex items-center justify-center animate-bounce-slow"
          style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5 animate-pulse" />
          ) : (
            <VolumeX className="w-5 h-5 text-red-900" />
          )}
        </button>
      )}

      {/* ========================================================================= */}
      {/* 1. COVER SCREEN (1:1 DENGAN MOCKUP TEMA 1)                                */}
      {/* ========================================================================= */}
      {!isOpen ? (
        <div
          className="relative w-full min-h-screen flex flex-col justify-between items-center text-center overflow-hidden mx-auto max-w-[430px] shadow-2xl"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#401017',
          }}
        >
          {/* Top Batik Border (batik1.png) */}
          <div className="w-full relative z-10 shrink-0">
            <img
              src={batik1}
              alt="Ornamen Batik Atas"
              className="w-full object-contain select-none pointer-events-none"
            />
          </div>

          {/* Corner Flowers (bunga1 & bunga2) */}
          <img
            src={bunga1}
            alt="Bunga Kiri Atas"
            className="absolute top-8 left-0 w-24 sm:w-28 z-20 select-none pointer-events-none drop-shadow-md animate-fade-in"
          />
          <img
            src={bunga2}
            alt="Bunga Kanan Atas"
            className="absolute top-8 right-0 w-24 sm:w-28 z-20 select-none pointer-events-none drop-shadow-md animate-fade-in"
          />

          {/* Main Cover Content */}
          <div className="relative z-20 flex flex-col items-center justify-center w-full px-4 py-2 flex-grow">
            {/* Event Title (Ngunduh Mantu) */}
            <h2
              className="text-lg sm:text-xl font-serif tracking-wider text-[#F8EFEA] mb-3 drop-shadow-md"
              style={{ fontFamily: "'Playfair Display', 'Cinzel', serif" }}
            >
              {eventTitle}
            </h2>

            {/* Circular Photo Frame with floral wreath (frame1.png) */}
            <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center my-1">
              {/* Inner Couple Photo (clipped in circle) */}
              <div className="w-[125px] h-[125px] sm:w-[135px] sm:h-[135px] rounded-full overflow-hidden bg-[#E2D8D0] shadow-inner relative z-0">
                <img
                  src={coverPhoto || bridePhoto}
                  alt={`${brideName} & ${groomName}`}
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700 hover:scale-105"
                />
              </div>

              {/* Outer Floral Wreath Frame Overlay (frame1.png) */}
              <img
                src={frame1}
                alt="Bingkai Bunga Lingkaran"
                className="absolute inset-0 w-full h-full object-contain z-10 select-none pointer-events-none drop-shadow-lg"
              />
            </div>

            {/* Couple Calligraphy Names */}
            <div className="my-2 flex flex-col items-center">
              <h1
                className="text-5xl sm:text-6xl text-[#FFF8F3] leading-none drop-shadow-lg"
                style={{
                  fontFamily: "'Great Vibes', 'Alex Brush', cursive",
                  textShadow: '0 2px 10px rgba(0,0,0,0.6)',
                }}
              >
                {brideName}
              </h1>
              <span
                className="text-2xl sm:text-3xl text-[#EAD4BE] my-0.5 leading-none"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                &amp;
              </span>
              <h1
                className="text-5xl sm:text-6xl text-[#FFF8F3] leading-none drop-shadow-lg"
                style={{
                  fontFamily: "'Great Vibes', 'Alex Brush', cursive",
                  textShadow: '0 2px 10px rgba(0,0,0,0.6)',
                }}
              >
                {groomName}
              </h1>
            </div>

            {/* Guest Invitation Box */}
            <div
              className="w-full max-w-[280px] sm:max-w-[300px] my-3 px-4 py-3 rounded-xl backdrop-blur-md border border-[#F3DCC8]/40 text-center shadow-lg"
              style={{
                background: 'rgba(50, 10, 15, 0.45)',
              }}
            >
              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#EAD4BE] font-medium mb-1">
                Kepada Yth. Bapak/Ibu:
              </p>
              <p
                className="text-base sm:text-lg font-bold tracking-widest text-[#FFF] uppercase font-serif py-0.5"
                style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
              >
                {guestName}
              </p>
              <p className="text-[8px] sm:text-[9px] text-[#EAD4BE]/80 italic mt-1 leading-tight">
                *Mohon maaf bila ada kesalahan penulisan nama dan gelar
              </p>
            </div>

            {/* "Buka" Button */}
            <button
              onClick={handleOpenInvitation}
              className="mt-1 px-8 py-2 rounded-full font-semibold text-xs tracking-widest uppercase transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #F5E5D5 0%, #E2C9B2 100%)',
                color: '#4A151B',
                boxShadow: '0 4px 15px rgba(0,0,0,0.4), inset 0 1px 1px #FFF',
              }}
            >
              <Heart className="w-3.5 h-3.5 fill-[#4A151B] text-[#4A151B] group-hover:scale-125 transition-transform" />
              <span>Buka</span>
            </button>
          </div>

          {/* Bottom Batik Border (batik2.png) */}
          <div className="w-full relative z-10 shrink-0">
            <img
              src={batik2}
              alt="Ornamen Batik Bawah"
              className="w-full object-contain select-none pointer-events-none"
            />
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* 2. INNER INVITATION (HALAMAN LENGKAP SETELAH DIBUKA)                       */
        /* ========================================================================= */
        <div className="w-full max-w-[440px] mx-auto min-h-screen bg-[#350B10] shadow-2xl relative overflow-hidden pb-16">
          {/* Global Batik Decorative Borders */}
          <div className="w-full">
            <img src={batik1} alt="Header Batik" className="w-full object-contain" />
          </div>

          {/* Section 1: Hero / Salam Pembuka */}
          <section className="px-6 pt-8 pb-10 text-center relative">
            <img
              src={bunga1}
              alt="Bunga"
              className="absolute -top-4 left-0 w-20 opacity-80 pointer-events-none"
            />
            <img
              src={bunga2}
              alt="Bunga"
              className="absolute -top-4 right-0 w-20 opacity-80 pointer-events-none"
            />

            <div className="inline-block px-4 py-1 rounded-full border border-[#EAD4BE]/40 bg-[#4A151B]/60 text-[#EAD4BE] text-[10px] tracking-widest uppercase mb-4">
              {eventTitle}
            </div>

            <p
              className="text-xs uppercase tracking-[0.3em] text-[#EAD4BE] mb-2"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              THE WEDDING CELEBRATION OF
            </p>

            <h1
              className="text-5xl sm:text-6xl text-[#FFF8F3] my-3"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              {brideName} &amp; {groomName}
            </h1>

            <p className="text-xs tracking-wider text-[#EAD4BE] font-serif mb-6">
              {weddingDate}
            </p>

            {/* Sacred Quote Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-[#4A151B]/80 to-[#2A080C]/80 border border-[#EAD4BE]/30 shadow-xl backdrop-blur-sm text-center my-6">
              <Sparkles className="w-5 h-5 text-[#EAD4BE] mx-auto mb-3 opacity-80" />
              <p className="text-xs italic text-[#F8EFEA] leading-relaxed font-serif">
                "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
              </p>
              <span className="block mt-3 text-[10px] font-semibold tracking-widest text-[#EAD4BE] uppercase">
                (QS. Ar-Rum: 21)
              </span>
            </div>
          </section>

          {/* Section 2: Mempelai Pria & Wanita */}
          <section className="px-6 py-8 text-center bg-[#2D090E]/60 border-y border-[#EAD4BE]/20 relative">
            <h2
              className="text-2xl font-serif text-[#FFF8F3] tracking-wide mb-8"
              style={{ fontFamily: "'Playfair Display', 'Cinzel', serif" }}
            >
              Kedua Mempelai
            </h2>

            {/* Mempelai Wanita */}
            <div className="flex flex-col items-center mb-10">
              <div className="relative w-36 h-36 mb-4">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#EAD4BE] p-1 bg-[#4A151B]">
                  <img
                    src={bridePhoto}
                    alt={brideFullName}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <h3
                className="text-3xl text-[#FFF8F3] mb-1"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                {brideFullName}
              </h3>
              <p className="text-xs text-[#EAD4BE] max-w-xs leading-relaxed mt-1">
                {brideParents}
              </p>
            </div>

            {/* Divider Ampersand */}
            <div className="flex items-center justify-center my-6 gap-3">
              <div className="h-[1px] w-16 bg-[#EAD4BE]/40" />
              <span
                className="text-3xl text-[#EAD4BE]"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                &amp;
              </span>
              <div className="h-[1px] w-16 bg-[#EAD4BE]/40" />
            </div>

            {/* Mempelai Pria */}
            <div className="flex flex-col items-center">
              <div className="relative w-36 h-36 mb-4">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#EAD4BE] p-1 bg-[#4A151B]">
                  <img
                    src={groomPhoto}
                    alt={groomFullName}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <h3
                className="text-3xl text-[#FFF8F3] mb-1"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                {groomFullName}
              </h3>
              <p className="text-xs text-[#EAD4BE] max-w-xs leading-relaxed mt-1">
                {groomParents}
              </p>
            </div>
          </section>

          {/* Section 3: Countdown Timer */}
          <section className="px-6 py-10 text-center">
            <h2
              className="text-xl font-serif text-[#FFF8F3] tracking-wide mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Menghitung Hari Bahagia
            </h2>
            <p className="text-xs text-[#EAD4BE]/80 mb-6">
              Kami tak sabar menanti kehadiran Anda di hari istimewa kami
            </p>

            <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-xs mx-auto">
              {[
                { label: 'Hari', value: timeLeft.days },
                { label: 'Jam', value: timeLeft.hours },
                { label: 'Menit', value: timeLeft.minutes },
                { label: 'Detik', value: timeLeft.seconds },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-gradient-to-b from-[#4A151B] to-[#250508] border border-[#EAD4BE]/40 shadow-md text-center"
                >
                  <span className="block text-2xl font-bold text-[#FFF8F3] font-serif">
                    {String(item.value).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-[#EAD4BE]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <a
              href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                `Pernikahan ${brideName} & ${groomName}`
              )}&dates=20261018T010000Z/20261018T070000Z&details=${encodeURIComponent(
                'Pernikahan Suci Dimas & Mia'
              )}&location=${encodeURIComponent(resepsiLocation)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 rounded-full border border-[#EAD4BE] text-[#EAD4BE] hover:bg-[#EAD4BE] hover:text-[#4A151B] transition-all text-xs font-semibold tracking-wider uppercase"
            >
              <Calendar className="w-3.5 h-3.5" />
              Simpan ke Kalender
            </a>
          </section>

          {/* Section 4: Rangkaian Acara (Akad & Resepsi) */}
          <section className="px-6 py-10 bg-[#2D090E]/60 border-y border-[#EAD4BE]/20 text-center">
            <h2
              className="text-2xl font-serif text-[#FFF8F3] tracking-wide mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Waktu &amp; Tempat Acara
            </h2>

            {/* Akad Nikah Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#4A151B]/90 to-[#28070B]/90 border border-[#EAD4BE]/30 shadow-xl mb-6 text-center relative overflow-hidden">
              <div className="w-10 h-10 rounded-full bg-[#EAD4BE]/10 border border-[#EAD4BE]/40 flex items-center justify-center mx-auto mb-3 text-[#EAD4BE]">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#FFF8F3] mb-1">
                {akadTitle}
              </h3>
              <p className="text-xs text-[#EAD4BE] font-medium mb-3">
                {akadDate}
              </p>
              <div className="text-xs text-[#F8EFEA]/90 space-y-1 mb-4 border-t border-[#EAD4BE]/20 pt-3">
                <p className="font-semibold text-[#FFF]">{akadTime}</p>
                <p className="font-serif font-medium">{akadLocation}</p>
                <p className="text-[11px] text-[#EAD4BE]/80 leading-relaxed px-2">
                  {akadAddress}
                </p>
              </div>
            </div>

            {/* Resepsi Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#4A151B]/90 to-[#28070B]/90 border border-[#EAD4BE]/30 shadow-xl text-center relative overflow-hidden">
              <div className="w-10 h-10 rounded-full bg-[#EAD4BE]/10 border border-[#EAD4BE]/40 flex items-center justify-center mx-auto mb-3 text-[#EAD4BE]">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#FFF8F3] mb-1">
                {resepsiTitle}
              </h3>
              <p className="text-xs text-[#EAD4BE] font-medium mb-3">
                {resepsiDate}
              </p>
              <div className="text-xs text-[#F8EFEA]/90 space-y-1 mb-5 border-t border-[#EAD4BE]/20 pt-3">
                <p className="font-semibold text-[#FFF]">{resepsiTime}</p>
                <p className="font-serif font-medium">{resepsiLocation}</p>
                <p className="text-[11px] text-[#EAD4BE]/80 leading-relaxed px-2">
                  {resepsiAddress}
                </p>
              </div>

              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#EAD4BE] text-[#4A151B] text-xs font-bold tracking-wider uppercase hover:bg-[#FFF] transition-all shadow-md"
              >
                <MapPin className="w-3.5 h-3.5" />
                Buka Google Maps
              </a>
            </div>
          </section>

          {/* Section 5: Galeri Foto */}
          <section className="px-6 py-10 text-center">
            <h2
              className="text-2xl font-serif text-[#FFF8F3] tracking-wide mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Galeri Kebahagiaan
            </h2>
            <p className="text-xs text-[#EAD4BE]/80 mb-6">
              Momen manis yang terukir dalam perjalanan cinta kami
            </p>

            <div className="grid grid-cols-2 gap-3">
              {gallery.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  className="aspect-square rounded-xl overflow-hidden border border-[#EAD4BE]/30 relative cursor-pointer group shadow-lg"
                >
                  <img
                    src={item.url}
                    alt={item.caption || `Galeri ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                    <span className="text-[10px] text-white font-medium">
                      {item.caption || 'Lihat Foto'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Lightbox Modal */}
          {lightboxIndex !== null && (
            <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4">
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/20 text-white hover:bg-white/40"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative max-w-sm w-full flex items-center justify-center">
                <img
                  src={gallery[lightboxIndex].url}
                  alt={gallery[lightboxIndex].caption || 'Foto'}
                  className="max-h-[75vh] w-auto rounded-lg shadow-2xl"
                />

                {/* Left/Right controls */}
                <button
                  onClick={() =>
                    setLightboxIndex((prev) =>
                      prev !== null && prev > 0 ? prev - 1 : gallery.length - 1
                    )
                  }
                  className="absolute left-2 p-2 rounded-full bg-black/50 text-white hover:bg-black/80"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setLightboxIndex((prev) =>
                      prev !== null && prev < gallery.length - 1 ? prev + 1 : 0
                    )
                  }
                  className="absolute right-2 p-2 rounded-full bg-black/50 text-white hover:bg-black/80"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {gallery[lightboxIndex].caption && (
                <p className="text-white text-xs mt-4 text-center font-serif">
                  {gallery[lightboxIndex].caption}
                </p>
              )}
            </div>
          )}

          {/* Section 6: Love Story Timeline */}
          <section className="px-6 py-10 bg-[#2D090E]/60 border-y border-[#EAD4BE]/20 text-center">
            <h2
              className="text-2xl font-serif text-[#FFF8F3] tracking-wide mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Kisah Cinta Kami
            </h2>

            <div className="space-y-6 relative before:absolute before:inset-0 before:left-1/2 before:-translate-x-1/2 before:w-[1px] before:bg-[#EAD4BE]/30">
              {loveStory.map((item, idx) => (
                <div
                  key={idx}
                  className="relative z-10 p-5 rounded-2xl bg-gradient-to-b from-[#4A151B]/90 to-[#28070B]/90 border border-[#EAD4BE]/30 shadow-lg text-left"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold font-serif text-[#FFF]">
                      {item.title}
                    </span>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#EAD4BE] text-[#4A151B]">
                      {item.year}
                    </span>
                  </div>
                  <p className="text-xs text-[#EAD4BE]/90 leading-relaxed font-sans">
                    {item.story}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 7: RSVP & Buku Ucapan (Doa Restu) */}
          <section className="px-6 py-10 text-center">
            <h2
              className="text-2xl font-serif text-[#FFF8F3] tracking-wide mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Konfirmasi Kehadiran &amp; Doa
            </h2>
            <p className="text-xs text-[#EAD4BE]/80 mb-6">
              Berikan doa dan konfirmasi kehadiran Anda
            </p>

            <form
              onSubmit={handleSubmitRSVP}
              className="p-6 rounded-2xl bg-gradient-to-b from-[#4A151B]/90 to-[#28070B]/90 border border-[#EAD4BE]/30 shadow-xl text-left space-y-4"
            >
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#EAD4BE] font-medium mb-1">
                  Nama Anda
                </label>
                <input
                  type="text"
                  required
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                  placeholder="Masukkan nama lengkap"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#2A080C] border border-[#EAD4BE]/40 text-[#FFF] text-xs focus:outline-none focus:border-[#EAD4BE]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#EAD4BE] font-medium mb-1">
                  Konfirmasi Kehadiran
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'hadir', label: 'Hadir' },
                    { id: 'ragu', label: 'Ragu-ragu' },
                    { id: 'tidak_hadir', label: 'Berhalangan' },
                  ].map((opt) => (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => setRsvpStatus(opt.id as any)}
                      className={`py-2 px-1 text-[11px] rounded-lg border font-medium transition-all ${
                        rsvpStatus === opt.id
                          ? 'bg-[#EAD4BE] text-[#4A151B] border-[#EAD4BE] font-bold'
                          : 'bg-[#2A080C] text-[#EAD4BE] border-[#EAD4BE]/30'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {rsvpStatus === 'hadir' && (
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#EAD4BE] font-medium mb-1">
                    Jumlah Tamu
                  </label>
                  <select
                    value={rsvpCount}
                    onChange={(e) => setRsvpCount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#2A080C] border border-[#EAD4BE]/40 text-[#FFF] text-xs focus:outline-none focus:border-[#EAD4BE]"
                  >
                    <option value={1}>1 Orang</option>
                    <option value={2}>2 Orang</option>
                    <option value={3}>3 Orang</option>
                    <option value={4}>4 Orang</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#EAD4BE] font-medium mb-1">
                  Ucapan &amp; Doa Restu
                </label>
                <textarea
                  required
                  rows={3}
                  value={rsvpMessage}
                  onChange={(e) => setRsvpMessage(e.target.value)}
                  placeholder="Tuliskan ucapan dan doa restu untuk kedua mempelai..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#2A080C] border border-[#EAD4BE]/40 text-[#FFF] text-xs focus:outline-none focus:border-[#EAD4BE]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-[#EAD4BE] text-[#4A151B] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#FFF] transition-all shadow-md cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                Kirim Konfirmasi &amp; Ucapan
              </button>

              {submittedRsvp && (
                <div className="p-3 rounded-lg bg-emerald-900/40 border border-emerald-500/40 text-emerald-200 text-xs text-center">
                  Terima kasih atas konfirmasi dan doa restunya!
                </div>
              )}
            </form>

            {/* List Ucapan */}
            <div className="mt-8 space-y-3 text-left">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-[#EAD4BE] px-1">
                Ucapan Doa ({wishes.length})
              </h3>
              <div className="max-h-72 overflow-y-auto space-y-3 pr-1">
                {wishes.map((w, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#2A080C]/80 border border-[#EAD4BE]/20 text-xs"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-[#FFF] font-serif">
                        {w.name}
                      </span>
                      <span className="text-[10px] text-[#EAD4BE]/60">
                        {w.time}
                      </span>
                    </div>
                    <p className="text-[#EAD4BE]/90 leading-relaxed font-sans">
                      {w.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 8: Wedding Gift / Hadiah Digital */}
          <section className="px-6 py-10 bg-[#2D090E]/60 border-y border-[#EAD4BE]/20 text-center">
            <Gift className="w-8 h-8 text-[#EAD4BE] mx-auto mb-2" />
            <h2
              className="text-2xl font-serif text-[#FFF8F3] tracking-wide mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Tanda Kasih (Wedding Gift)
            </h2>
            <p className="text-xs text-[#EAD4BE]/80 max-w-xs mx-auto mb-6 leading-relaxed">
              Doa restu Anda adalah hadiah terindah bagi kami. Namun jika ingin memberikan tanda kasih secara digital, dapat melalui rekening di bawah ini:
            </p>

            <div className="space-y-4">
              {bankAccounts.map((bank, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-gradient-to-b from-[#4A151B] to-[#250508] border border-[#EAD4BE]/30 shadow-lg text-left relative"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold tracking-widest text-[#EAD4BE] uppercase">
                      {bank.bankName}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#EAD4BE]/10 border border-[#EAD4BE]/30 text-[#EAD4BE]">
                      Transfer Bank
                    </span>
                  </div>

                  <p className="text-lg font-mono font-bold text-[#FFF] tracking-wider mb-1">
                    {bank.accountNumber}
                  </p>
                  <p className="text-xs text-[#EAD4BE]/90 mb-4 font-serif">
                    a.n. {bank.accountHolder}
                  </p>

                  <button
                    onClick={() => handleCopy(bank.accountNumber, bank.accountNumber)}
                    className="w-full py-2 rounded-lg border border-[#EAD4BE]/40 text-[#EAD4BE] hover:bg-[#EAD4BE] hover:text-[#4A151B] transition-all text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    {copiedBank === bank.accountNumber ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Tersalin ke Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Nomor Rekening</span>
                      </>
                    )}
                  </button>
                </div>
              ))}

              {/* Kirim Kado Fisik */}
              {giftAddress && (
                <div className="p-5 rounded-2xl bg-[#2A080C]/80 border border-[#EAD4BE]/20 text-left">
                  <span className="text-xs font-bold tracking-widest text-[#EAD4BE] uppercase block mb-2">
                    Kirim Kado Fisik
                  </span>
                  <p className="text-xs font-bold text-[#FFF]">
                    Penerima: {giftAddress.recipientName} ({giftAddress.phone})
                  </p>
                  <p className="text-xs text-[#EAD4BE]/80 mt-1 leading-relaxed">
                    {giftAddress.address}
                  </p>
                  <button
                    onClick={() => handleCopy(giftAddress.address, 'address')}
                    className="mt-3 px-4 py-1.5 rounded border border-[#EAD4BE]/40 text-[#EAD4BE] hover:bg-[#EAD4BE] hover:text-[#4A151B] transition-all text-[11px] font-medium flex items-center gap-1.5"
                  >
                    {copiedBank === 'address' ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>Alamat Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Salin Alamat</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Section 9: Ucapan Terima Kasih & Penutup */}
          <section className="px-6 py-12 text-center relative overflow-hidden">
            <img
              src={bunga1}
              alt="Bunga"
              className="absolute -bottom-8 left-0 w-24 opacity-60 pointer-events-none"
            />
            <img
              src={bunga2}
              alt="Bunga"
              className="absolute -bottom-8 right-0 w-24 opacity-60 pointer-events-none"
            />

            <p className="text-xs text-[#EAD4BE] leading-relaxed mb-6 font-serif">
              Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.
            </p>

            <p className="text-xs uppercase tracking-widest text-[#EAD4BE]/70 mb-2">
              KAMI YANG BERBAHAGIA
            </p>

            <h2
              className="text-4xl sm:text-5xl text-[#FFF8F3] mb-4"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              {brideName} &amp; {groomName}
            </h2>

            <p className="text-[11px] text-[#EAD4BE]/80">
              Beserta Keluarga Besar Kedua Mempelai
            </p>
          </section>

          {/* Bottom Batik Border */}
          <div className="w-full">
            <img src={batik2} alt="Footer Batik" className="w-full object-contain" />
          </div>

          {/* Footer Branding */}
          <footer className="text-center pt-6 pb-2 text-[10px] tracking-widest text-[#EAD4BE]/60 uppercase">
            Designed with love by KisahMagis
          </footer>
        </div>
      )}
    </div>
  );
}
