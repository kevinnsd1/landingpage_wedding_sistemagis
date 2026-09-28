import React, { useState, useEffect, useRef } from "react";
import { ThemeProps } from "@/theme-engine/types";
import { Disc, ChevronDown } from "lucide-react";
import bgImage from "./assets/background/background.png";
import batik1 from "./assets/aksesoris/batik1.png";
import batik2 from "./assets/aksesoris/batik2.png";
import bunga1 from "./assets/aksesoris/bunga1.png";
import bunga2 from "./assets/aksesoris/bunga2.png";
import bunga3 from "./assets/aksesoris/bunga3.png";
import frame1 from "./assets/aksesoris/frame1.png";
import frame2 from "./assets/aksesoris/frame2.png";
import frame3 from "./assets/aksesoris/frame3.png";
import penari1 from "./assets/aksesoris/penari1.png";
import penari2 from "./assets/aksesoris/penari2.png";

// Dimensi kanvas tetap — sama persis antara preview dashboard & standalone
const CANVAS_W = 390;
const CANVAS_H = 844;

interface ScrollFadeItemProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  rootRef?: React.RefObject<HTMLDivElement | null>;
}

function ScrollFadeItem({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  rootRef,
}: ScrollFadeItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: rootRef?.current || null,
        threshold: 0.12,
        rootMargin: '20px 0px -20px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootRef]);

  const getTransitionStyle = () => {
    if (isVisible) {
      return 'opacity-100 translate-x-0 translate-y-0 scale-100';
    }
    switch (direction) {
      case 'left':
        return 'opacity-0 -translate-x-6 scale-[0.97]';
      case 'right':
        return 'opacity-0 translate-x-6 scale-[0.97]';
      case 'scale':
        return 'opacity-0 scale-90';
      case 'up':
      default:
        return 'opacity-0 translate-y-8 scale-[0.97]';
    }
  };

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ease-out transform will-change-transform ${getTransitionStyle()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function Theme1({
  wedding,
  invitation,
  guest,
  rsvps,
  guestbook,
  onOpenInvitation,
  onSubmitRSVP,
  isPreview = false,
}: ThemeProps) {
  // Scale responsif untuk mode standalone (preview dihandle EditorTab)
  const [scale, setScale] = useState(1);

  // Ambil data dinamis dari props (sesuai THEME_DEVELOPMENT.md & endpoint backend)
  const groomName = wedding?.groomName || 'Mempelai Pria';
  const brideName = wedding?.brideName || 'Mempelai Wanita';
  const groomParents = wedding?.groomParents || 'Bapak & Ibu Mempelai Pria';
  const brideParents = wedding?.brideParents || 'Bapak & Ibu Mempelai Wanita';
  const guestName = guest?.name || 'Tamu Undangan';

  // Ambil data kustom themeData
  const themeData = invitation?.config?.themeData as Record<string, any> | undefined;

  // Foto Bingkai Cover Utama (Frame 1)
  const framePhotoUrl =
    themeData?.framePhoto ||
    invitation?.config?.gallery?.images?.[0]?.url ||
    (invitation as any)?.gallery?.[0]?.url ||
    wedding?.coverPhoto ||
    wedding?.groomPhoto ||
    wedding?.bridePhoto ||
    '';

  // Teks Salam Pembuka (Halaman 2)
  const salamText =
    themeData?.salamText ||
    'Dengan memohon rahmat dan ridha Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan putra - putri kami sebagai ungkapan rasa syukur atas telah dilangsungkannya akad nikah.';

  // Foto Mempelai Pria (Frame 2)
  const groomPhotoUrl =
    themeData?.groomFramePhoto ||
    wedding?.groomPhoto ||
    invitation?.config?.gallery?.images?.[1]?.url ||
    invitation?.config?.gallery?.images?.[0]?.url ||
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80';

  // Foto Mempelai Wanita (Frame 3)
  const bridePhotoUrl =
    themeData?.brideFramePhoto ||
    wedding?.bridePhoto ||
    invitation?.config?.gallery?.images?.[2]?.url ||
    invitation?.config?.gallery?.images?.[0]?.url ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';

  // Ambil konfigurasi musik latar dari invitation config
  const musicConfig = invitation?.config?.music;
  const isMusicEnabled = !!(musicConfig?.enabled && musicConfig?.url);
  const musicUrl = musicConfig?.url || '';
  const musicTitle = musicConfig?.title || 'Lagu Pernikahan';

  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const section2Ref = useRef<HTMLDivElement | null>(null);

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlayingMusic(true))
        .catch(console.error);
    }
  };

  const scrollToSection2 = () => {
    section2Ref.current?.scrollIntoView({ behavior: 'smooth' });
    onOpenInvitation?.();
  };

  useEffect(() => {
    if (isPreview) return;
    const update = () => {
      const vw = window.innerWidth;
      setScale(Math.min(1, vw / CANVAS_W));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [isPreview]);

  const appliedScale = isPreview ? 1 : scale;

  return (
    <div
      ref={containerRef}
      className="relative flex items-start justify-center bg-[#380E14] no-scrollbar overflow-x-hidden overflow-y-auto scroll-smooth"
      style={{ width: "100%", height: isPreview ? `${CANVAS_H}px` : "100dvh" }}
    >
      {/* Kanvas utama multi-section — di-scale responsif */}
      <div
        className="relative shadow-2xl select-none no-scrollbar flex flex-col items-center"
        style={{
          width: `${CANVAS_W}px`,
          flexShrink: 0,
          transform: `scale(${appliedScale})`,
          transformOrigin: "top center",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "390px auto",
          backgroundRepeat: "repeat-y",
          backgroundColor: "#401017",
        }}
      >
        {/* ============================================================ */}
        {/* SECTION 1: COVER UTAMA (390×844px)                          */}
        {/* ============================================================ */}
        <section className="relative w-[390px] h-[844px] overflow-hidden flex-shrink-0">
          {/* Batik 1 (ABSOLUTE - tepi ATAS) */}
          <div className="absolute top-0 left-0 right-0 z-10 leading-none pointer-events-none">
            <img
              src={batik1}
              alt="Batik Atas"
              className="w-full block object-contain select-none"
            />
          </div>

          {/* Bunga 2 (Pojok Kiri - Di belakang Batik Atas) */}
          <img
            src={bunga2}
            alt="Bunga Kiri Atas"
            className="absolute top-0 left-0 w-32 z-[5] select-none pointer-events-none drop-shadow-md animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          />

          {/* Bunga 1 (Pojok Kanan - Di belakang Batik Atas) */}
          <img
            src={bunga1}
            alt="Bunga Kanan Atas"
            className="absolute top-0 right-0 w-32 z-[5] select-none pointer-events-none drop-shadow-md animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          />

          {/* Floating Music Disc Controller */}
          {isMusicEnabled && (
            <>
              <audio ref={audioRef} src={musicUrl} loop preload="auto" />
              <button
                type="button"
                onClick={toggleMusic}
                title={isPlayingMusic ? `Jeda Musik: ${musicTitle}` : `Putar Musik: ${musicTitle}`}
                className="absolute top-4 right-4 z-30 pointer-events-auto flex items-center gap-1.5 bg-[#2A0A0E]/85 backdrop-blur-md border border-[#F0C98A]/50 rounded-full px-2.5 py-1.5 shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer select-none"
              >
                <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[#F0C98A] ${isPlayingMusic ? 'animate-spin-slow' : ''}`}>
                  <Disc className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] tracking-wider font-medium text-[#F5E6D3] max-w-[80px] truncate">
                  {isPlayingMusic ? musicTitle : 'Musik'}
                </span>
                <span className={`w-1.5 h-1.5 rounded-full ${isPlayingMusic ? 'bg-emerald-400 animate-pulse' : 'bg-neutral-400'}`} />
              </button>
            </>
          )}

          {/* Wedding of Text */}
          <p
            className="absolute top-28 left-0 right-0 text-center text-sm tracking-[0.35em] uppercase text-[#F0C98A] animate-fade-in z-20"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              animationDelay: "0.7s",
            }}
          >
            Wedding of
          </p>

          {/* Frame 1 - Bingkai Foto di Tengah-Atas dengan Foto Dinamis */}
          <div className="absolute inset-x-0 top-[31%] -translate-y-1/2 flex items-center justify-center z-20 pointer-events-none">
            <div className="relative w-[288px] h-[242px]">
              {/* Foto Dinamis di Belakang Frame Bunga */}
              {framePhotoUrl ? (
                <div
                  className="absolute rounded-full overflow-hidden shadow-inner bg-[#2A0A0E] z-[15]"
                  style={{
                    left: "66px",
                    top: "29px",
                    width: "186px",
                    height: "186px",
                  }}
                >
                  <img
                    src={framePhotoUrl}
                    alt="Foto Pasangan"
                    className="w-full h-full object-cover select-none animate-fade-in"
                    style={{ animationDelay: "0.3s" }}
                  />
                </div>
              ) : (
                <div
                  className="absolute rounded-full overflow-hidden bg-[#2A0A0E]/50 border border-[#F0C98A]/30 z-[15]"
                  style={{
                    left: "66px",
                    top: "29px",
                    width: "186px",
                    height: "186px",
                  }}
                />
              )}

              {/* Frame Bunga di Depan Foto */}
              <img
                src={frame1}
                alt="Frame Tengah"
                className="absolute inset-0 w-full h-full object-contain select-none drop-shadow-xl animate-fade-in z-20 pointer-events-none"
                style={{ animationDelay: "0.5s" }}
              />
            </div>
          </div>

          {/* Nama Pasangan Pengantin */}
          <div
            className="absolute top-[45.5%] -translate-y-1/2 inset-x-0 flex flex-col items-center justify-center text-center z-20 pointer-events-none animate-fade-in leading-tight"
            style={{ animationDelay: "0.9s" }}
          >
            <h2
              className="text-[58px] text-white drop-shadow-xl tracking-wide font-normal leading-none"
              style={{ fontFamily: "'Pinyon Script', cursive" }}
            >
              {groomName}
            </h2>
            <span
              className="text-3xl text-[#F0C98A] font-serif italic my-0.5 drop-shadow-md leading-none"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              &
            </span>
            <h2
              className="text-[58px] text-white drop-shadow-xl tracking-wide font-normal leading-none"
              style={{ fontFamily: "'Pinyon Script', cursive" }}
            >
              {brideName}
            </h2>
          </div>

          {/* Kotak Tamu Undangan (Kepada Yth) */}
          <div
            className="absolute top-[67%] -translate-y-1/2 inset-x-0 flex justify-center z-20 pointer-events-none animate-fade-in"
            style={{ animationDelay: "1.1s" }}
          >
            <div className="w-[275px] rounded-2xl border border-[#F0C98A]/40 bg-black/30 backdrop-blur-[2px] px-5 py-3.5 flex flex-col items-center justify-center text-center shadow-2xl">
              <p
                className="text-sm italic text-white/95 font-serif tracking-wider"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Kepada Yth. Bapak/Ibu
              </p>
              <p
                className="text-lg font-bold tracking-[0.2em] uppercase text-[#F5E6D3] my-1.5 drop-shadow-md"
                style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
              >
                {guestName}
              </p>
              <p className="text-[9.5px] text-white/75 italic tracking-tight leading-snug">
                *Mohon Maaf bila ada kesalahan penulisan nama atau gelar
              </p>
            </div>
          </div>

          {/* Penari 1 (Kiri - Ditarik ke atas & Ditimpa Batik 2) */}
          <div
            className="absolute z-[8] select-none pointer-events-none drop-shadow-xl animate-fade-in-left origin-bottom"
            style={{
              width: "225px",
              height: "322px",
              left: "-70px",
              bottom: "50px",
              animationDelay: "0.8s",
            }}
          >
            <img
              src={penari1}
              alt="Penari Kiri"
              className="w-full h-full object-contain animate-dancer-left origin-bottom"
            />
          </div>

          {/* Penari 2 (Kanan - Ditarik ke atas & Ditimpa Batik 2) */}
          <div
            className="absolute z-[8] select-none pointer-events-none drop-shadow-xl animate-fade-in-right origin-bottom"
            style={{
              width: "190px",
              height: "344px",
              right: "-48px",
              bottom: "40px",
              animationDelay: "1.0s",
            }}
          >
            <img
              src={penari2}
              alt="Penari Kanan"
              className="w-full h-full object-contain animate-dancer-right origin-bottom"
            />
          </div>

          {/* Bunga 3 (Di tengah-tengah antara penari & ditimpa Batik 2) */}
          <div
            className="absolute bottom-2 inset-x-0 flex justify-center z-[8] pointer-events-none select-none animate-fade-in"
            style={{ animationDelay: "1.2s" }}
          >
            <img
              src={bunga3}
              alt="Bunga Bawah"
              className="w-48 object-contain drop-shadow-xl translate-x-2"
            />
          </div>

          {/* Batik 2 (ABSOLUTE - tepi BAWAH, menimpa kaki penari & bunga 3) */}
          <div className="absolute bottom-0 left-0 right-0 z-10 leading-none pointer-events-none">
            <img
              src={batik2}
              alt="Batik Bawah"
              className="w-full block object-contain select-none"
            />
          </div>

          {/* Tombol Gulir ke Bawah */}
          <button
            type="button"
            onClick={scrollToSection2}
            className="absolute bottom-3 inset-x-0 mx-auto w-8 h-8 rounded-full bg-black/40 border border-[#F0C98A]/40 flex items-center justify-center text-[#F0C98A] z-30 cursor-pointer animate-bounce hover:bg-black/60 transition-all pointer-events-auto"
            title="Lihat Profil Mempelai"
          >
            <ChevronDown className="w-4 h-4 stroke-[2.5]" />
          </button>
        </section>

        {/* ============================================================ */}
        {/* SECTION 2: PROFIL KEDUA MEMPELAI (Frame 2 & Frame 3)         */}
        {/* ============================================================ */}
        <section
          ref={section2Ref}
          className="relative w-[390px] min-h-[1180px] flex-shrink-0 flex flex-col items-center pb-0 overflow-hidden"
        >
          {/* Batik Atas Section 2 (Mepet 100% Tepi Atas tanpa celah) */}
          <div className="w-full leading-none pointer-events-none">
            <img
              src={batik1}
              alt="Batik Atas Section 2"
              className="w-full block object-contain select-none"
            />
          </div>

          {/* Konten Utama Section 2 */}
          <div className="w-full flex flex-col items-center px-4 pt-6 pb-6">
            {/* Kaligrafi Arab Basmalah & Salam dengan Harakat / Tanda Baca Lengkap */}
            <ScrollFadeItem rootRef={containerRef} delay={50} direction="scale" className="w-full flex flex-col items-center">
              <div className="text-center mb-4 space-y-1.5">
                <h4
                  className="text-lg md:text-xl text-[#F0C98A]/90 font-serif tracking-widest drop-shadow-md"
                  style={{ fontFamily: "'Amiri', 'Cinzel', serif" }}
                >
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </h4>
                <h3
                  className="text-[26px] md:text-[28px] text-[#F0C98A] font-serif tracking-wide drop-shadow-md leading-relaxed"
                  style={{ fontFamily: "'Amiri', 'Cinzel', serif" }}
                >
                  السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
                </h3>
              </div>
            </ScrollFadeItem>

            {/* Teks Salam / Mukadimah */}
            <ScrollFadeItem rootRef={containerRef} delay={120} direction="up" className="w-full flex justify-center">
              <p className="text-[14px] text-[#FFF8F3] text-center leading-relaxed font-sans max-w-[345px] mb-8 drop-shadow-xs px-2 whitespace-pre-line font-medium">
                {salamText}
              </p>
            </ScrollFadeItem>

            {/* ── MEMPELAI PRIA (FRAME 2) ── */}
            <div className="w-full flex flex-col items-center mb-6">
              {/* Frame 2 dengan Foto Mempelai Pria (Visual Centering & Proportions) */}
              <ScrollFadeItem rootRef={containerRef} delay={150} direction="scale" className="w-full flex flex-col items-center">
                <div className="relative w-[260px] h-[311px] flex items-center justify-center drop-shadow-2xl translate-x-[20px]">
                  {/* Foto Pria di dalam Mask Arch */}
                  {groomPhotoUrl ? (
                    <div
                      className="absolute overflow-hidden shadow-inner bg-[#2A0A0E] z-[15]"
                      style={{
                        left: "17px",
                        top: "25px",
                        width: "152px",
                        height: "254px",
                        borderTopLeftRadius: "76px",
                        borderTopRightRadius: "76px",
                        borderBottomLeftRadius: "20px",
                        borderBottomRightRadius: "20px",
                      }}
                    >
                      <img
                        src={groomPhotoUrl}
                        alt={groomName}
                        className="w-full h-full object-cover select-none"
                      />
                    </div>
                  ) : (
                    <div
                      className="absolute overflow-hidden bg-[#2A0A0E]/60 border border-[#F0C98A]/30 z-[15]"
                      style={{
                        left: "17px",
                        top: "25px",
                        width: "152px",
                        height: "254px",
                        borderTopLeftRadius: "76px",
                        borderTopRightRadius: "76px",
                        borderBottomLeftRadius: "20px",
                        borderBottomRightRadius: "20px",
                      }}
                    />
                  )}

                  {/* Frame 2 Overlay (Penari Pria di Kanan + Bunga) */}
                  <img
                    src={frame2}
                    alt="Bingkai Mempelai Pria"
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none z-20"
                  />
                </div>
              </ScrollFadeItem>

              {/* Nama & Data Mempelai Pria */}
              <ScrollFadeItem rootRef={containerRef} delay={220} direction="up" className="w-full flex flex-col items-center">
                <div className="text-center px-4 mt-3">
                  <h3
                    className="text-[28px] font-bold tracking-wider text-[#FCEFD9] uppercase drop-shadow-lg"
                    style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
                  >
                    {groomName}
                  </h3>
                  <p
                    className="text-sm text-[#F0C98A] italic font-serif mt-1 tracking-wide"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Putra dari Bapak & Ibu
                  </p>
                  <p className="text-base font-semibold text-white mt-1 tracking-wide drop-shadow-xs">
                    {groomParents}
                  </p>
                </div>
              </ScrollFadeItem>
            </div>

            {/* Simbol Pemisah (&) */}
            <ScrollFadeItem rootRef={containerRef} delay={100} direction="scale" className="my-5 flex items-center justify-center">
              <span
                className="text-4xl text-[#F0C98A] font-serif italic drop-shadow-lg"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                &
              </span>
            </ScrollFadeItem>

            {/* ── MEMPELAI WANITA (FRAME 3) ── */}
            <div className="w-full flex flex-col items-center mb-8">
              {/* Frame 3 dengan Foto Mempelai Wanita (Visual Centering & Proportions) */}
              <ScrollFadeItem rootRef={containerRef} delay={150} direction="scale" className="w-full flex flex-col items-center">
                <div className="relative w-[260px] h-[297px] flex items-center justify-center drop-shadow-2xl -translate-x-[20px]">
                  {/* Foto Wanita di dalam Mask Arch */}
                  {bridePhotoUrl ? (
                    <div
                      className="absolute overflow-hidden shadow-inner bg-[#2A0A0E] z-[15]"
                      style={{
                        left: "90px",
                        top: "22px",
                        width: "155px",
                        height: "260px",
                        borderTopLeftRadius: "77px",
                        borderTopRightRadius: "77px",
                        borderBottomLeftRadius: "20px",
                        borderBottomRightRadius: "20px",
                      }}
                    >
                      <img
                        src={bridePhotoUrl}
                        alt={brideName}
                        className="w-full h-full object-cover select-none"
                      />
                    </div>
                  ) : (
                    <div
                      className="absolute overflow-hidden bg-[#2A0A0E]/60 border border-[#F0C98A]/30 z-[15]"
                      style={{
                        left: "90px",
                        top: "22px",
                        width: "155px",
                        height: "260px",
                        borderTopLeftRadius: "77px",
                        borderTopRightRadius: "77px",
                        borderBottomLeftRadius: "20px",
                        borderBottomRightRadius: "20px",
                      }}
                    />
                  )}

                  {/* Frame 3 Overlay (Penari Wanita di Kiri + Bunga) */}
                  <img
                    src={frame3}
                    alt="Bingkai Mempelai Wanita"
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none z-20"
                  />
                </div>
              </ScrollFadeItem>

              {/* Nama & Data Mempelai Wanita */}
              <ScrollFadeItem rootRef={containerRef} delay={220} direction="up" className="w-full flex flex-col items-center">
                <div className="text-center px-4 mt-3">
                  <h3
                    className="text-[28px] font-bold tracking-wider text-[#FCEFD9] uppercase drop-shadow-lg"
                    style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
                  >
                    {brideName}
                  </h3>
                  <p
                    className="text-sm text-[#F0C98A] italic font-serif mt-1 tracking-wide"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Putri dari Bapak & Ibu
                  </p>
                  <p className="text-base font-semibold text-white mt-1 tracking-wide drop-shadow-xs">
                    {brideParents}
                  </p>
                </div>
              </ScrollFadeItem>
            </div>
          </div>

          {/* Batik Bawah Section 2 */}
          <div className="w-full leading-none mt-auto pointer-events-none">
            <img
              src={batik2}
              alt="Batik Bawah Section 2"
              className="w-full block object-contain select-none"
            />
          </div>
        </section>
    </div>
  </div>
  );
}
