import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import SEO from "@/components/SEO";
import karakterPng from "./assets/karakter.png";
import karakterImg from "./assets/karakter2.jpeg";
import multoAudio from "./assets/multo.mp3";
import {
  Heart,
  Calendar,
  MapPin,
  VolumeX,
  Volume2,
  Copy,
  Check,
  Send,
  Sparkles,
} from "lucide-react";

interface WishMessage {
  id: string;
  name: string;
  attendance: "Hadir" | "Tidak Hadir" | "Ragu-ragu";
  pax: number;
  message: string;
  time: string;
}

const initialWishes: WishMessage[] = [
  {
    id: "w1",
    name: "Budi Santoso & Partner",
    attendance: "Hadir",
    pax: 2,
    message:
      "Selamat ya Ahmad & Anisa! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Aamiin!",
    time: "2 jam yang lalu",
  },
  {
    id: "w2",
    name: "Keluarga Besar Dr. Hendra",
    attendance: "Hadir",
    pax: 4,
    message:
      "Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fii khair. InsyaAllah kami hadir!",
    time: "4 jam yang lalu",
  },
  {
    id: "w3",
    name: "Siti Rahmawati",
    attendance: "Hadir",
    pax: 1,
    message:
      "Happy Wedding sahabatku Nisa! Semoga lancar sampai hari-H dan selalu bahagia bersama suami tercinta.",
    time: "1 hari yang lalu",
  },
];

export default function Theme1Page() {
  const [searchParams] = useSearchParams();
  const guestName =
    searchParams.get("to") || searchParams.get("tamu") || "Tamu Undangan";

  // State
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedBank, setCopiedBank] = useState<string | null>(null);

  // Audio Ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // RSVP Form State
  const [rsvpName, setRsvpName] = useState(
    guestName !== "Tamu Undangan" ? guestName : "",
  );
  const [rsvpAttendance, setRsvpAttendance] = useState<
    "Hadir" | "Tidak Hadir" | "Ragu-ragu"
  >("Hadir");
  const [rsvpPax, setRsvpPax] = useState<number>(2);
  const [rsvpMessage, setRsvpMessage] = useState("");
  const [wishes, setWishes] = useState<WishMessage[]>(initialWishes);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Target date: 30 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const smoothScrollTo = (targetY: number, duration: number = 700) => {
    const startY = window.scrollY || window.pageYOffset;
    const distance = targetY - startY;
    let startTime: number | null = null;

    // Fast, crisp easeOutQuart easing - moves fast immediately & lands cleanly
    const easeOutQuart = (t: number): number => {
      return 1 - Math.pow(1 - t, 4);
    };

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easeProgress = easeOutQuart(progress);

      window.scrollTo(0, startY + distance * easeProgress);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const handleOpenInvitation = () => {
    setIsOpen(true);
    setIsPlaying(true);

    // Play music directly from 1:55 (115 seconds)
    if (audioRef.current) {
      audioRef.current.currentTime = 115;
      audioRef.current.play().catch((err) => console.log("Audio play error:", err));
    }

    // Fast, direct scroll down to main invitation section
    requestAnimationFrame(() => {
      const targetElement = document.getElementById("main-invitation");
      if (targetElement) {
        const targetY = targetElement.getBoundingClientRect().top + window.pageYOffset;
        smoothScrollTo(targetY, 700);
      }
    });
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => console.log("Audio play error:", err));
      setIsPlaying(true);
    }
  };

  const handleCopy = (text: string, bankId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(bankId);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName || !rsvpMessage) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newWish: WishMessage = {
        id: Date.now().toString(),
        name: rsvpName,
        attendance: rsvpAttendance,
        pax: rsvpAttendance === "Hadir" ? rsvpPax : 0,
        message: rsvpMessage,
        time: "Baru saja",
      };

      setWishes([newWish, ...wishes]);
      setRsvpMessage("");
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className={`sky-gradient text-[#2C2623] font-sans relative ${isOpen ? "min-h-screen overflow-x-hidden" : "h-screen overflow-hidden"}`}>
      <SEO
        title="Undangan Pernikahan Ahmad & Anisa | Classic Floral Demo - Magis"
        description="Demo Undangan Digital Pernikahan Tema Classic Floral oleh Magis Invitation. Dilengkapi musik, rsvp online, ampob digital, & peta lokasi."
        canonicalUrl="https://digitalinvitationmagis.com/demo/theme-1"
      />

      {/* Audio Element & Floating Audio Toggle Button */}
      <audio
        ref={audioRef}
        src={multoAudio}
        loop
      />

      {isOpen && (
        <button
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-50 p-3.5 bg-white/90 backdrop-blur-md text-[#0F172A] rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center border border-white/80 cursor-pointer"
          aria-label="Toggle Music"
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5 text-sky-500 animate-pulse" />
          ) : (
            <VolumeX className="w-5 h-5 text-gray-400" />
          )}
        </button>
      )}

      {/* ================= 1. FULLSCREEN OPENING COVER GATE (KARAKTER 2 FULL BACKGROUND) ================= */}
      <section className="h-screen h-[100dvh] w-full relative overflow-hidden select-none flex flex-col items-center justify-between shrink-0">
        {/* Full Screen Crisp Background Image */}
        <img 
          src={karakterImg} 
          alt="Background Mempelai" 
          className="absolute inset-0 w-full h-full object-cover object-center z-0" 
        />

        {/* Subtle gradient overlay to enhance text & button contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/40 z-10 pointer-events-none" />

        {/* Top Title Overlay */}
        <div className="z-20 pt-10 sm:pt-14 text-center text-white px-4 space-y-1">
          <span className="font-mono text-xs tracking-[0.35em] uppercase text-sky-200 block font-bold">
            The Wedding Of
          </span>
          <h1 className="font-serif-display text-3xl sm:text-5xl font-black text-white tracking-wide drop-shadow-lg">
            Ahmad &amp; Anisa
          </h1>
        </div>

        {/* Bottom Button Anchor */}
        <div className="z-20 pb-10 sm:pb-14 w-full max-w-xs sm:max-w-md mx-auto px-4 flex flex-col items-center space-y-5">
          <div className="text-white text-center space-y-1.5 w-full drop-shadow-md">
            <p className="font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-white/90 font-bold drop-shadow-md">
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </p>
            <h3 className="font-serif-display text-2xl sm:text-3xl font-extrabold text-white tracking-wide drop-shadow-lg">
              {guestName}
            </h3>
          </div>

          <button
            onClick={handleOpenInvitation}
            className="w-full inline-flex items-center justify-center bg-white text-[#0F172A] hover:bg-sky-50 text-xs sm:text-sm font-bold tracking-[0.25em] uppercase px-8 py-4 rounded-full shadow-2xl transition-all active:scale-95 cursor-pointer border border-white/80 shrink-0"
          >
            Buka Undangan
          </button>
        </div>
      </section>

      {/* ================= EXTENDED SKY JOURNEY CONNECTOR (BALANCED BLUE DISTANCE) ================= */}
      <div className="h-[50vh] sm:h-[60vh] w-full relative overflow-hidden pointer-events-none select-none shrink-0" />

      {/* ================= 2. MAIN INVITATION CONTENT (CLEAN SKY & KARAKTER.PNG ONLY) ================= */}
      <section
        id="main-invitation"
        className="min-h-screen h-[100dvh] w-full flex flex-col items-center justify-center p-4 sm:p-6 text-center overflow-hidden relative select-none shrink-0"
      >
        {/* Center Karakter.png Asset - Continuous Floating Sway */}
        <div className="my-auto w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto flex items-center justify-center p-2 z-10 animate-character-sway">
          <img
            src={karakterPng}
            alt="Karakter Mempelai"
            className="w-full h-auto max-h-[82vh] sm:max-h-[86vh] md:max-h-[90vh] object-contain filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.4)]"
          />
        </div>
      </section>
    </div>
  );
}
