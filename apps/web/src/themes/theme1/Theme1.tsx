import React, { useState, useEffect } from "react";
import { ThemeProps } from "@/theme-engine/types";
import bgImage from "./assets/background/background.png";
import batik1 from "./assets/aksesoris/batik1.png";
import batik2 from "./assets/aksesoris/batik2.png";
import bunga1 from "./assets/aksesoris/bunga1.png";
import bunga2 from "./assets/aksesoris/bunga2.png";
import frame1 from "./assets/aksesoris/frame1.png";
import penari1 from "./assets/aksesoris/penari1.png";
import penari2 from "./assets/aksesoris/penari2.png";
import bunga3 from "./assets/aksesoris/bunga3.png";

// Dimensi kanvas tetap — sama persis antara preview dashboard & standalone
const CANVAS_W = 390;
const CANVAS_H = 844;

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

  // Ambil nama pasangan dan tamu dari data wedding & guest
  const groomName = wedding?.groomName?.split(' ')[0] || 'Mia';
  const brideName = wedding?.brideName?.split(' ')[0] || 'Dimas';
  const guestName = guest?.name || 'VISIDEA';

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
  const outerHeight = isPreview
    ? CANVAS_H
    : Math.round(CANVAS_H * appliedScale);

  return (
    <div
      className="relative flex items-start justify-center bg-[#380E14] no-scrollbar overflow-hidden"
      style={{ width: "100%", height: isPreview ? `${CANVAS_H}px` : "100dvh" }}
    >
      {/* Kanvas utama — selalu 390×844px, di-scale responsif */}
      <div
        className="relative overflow-hidden shadow-2xl select-none no-scrollbar"
        style={{
          width: `${CANVAS_W}px`,
          height: `${CANVAS_H}px`,
          flexShrink: 0,
          transform: `scale(${appliedScale})`,
          transformOrigin: "top center",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#401017",
        }}
      >
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

        {/* Frame 1 - Bingkai Foto di Tengah-Atas */}
        <div className="absolute inset-x-0 top-[31%] -translate-y-1/2 flex items-center justify-center z-20 pointer-events-none">
          <img
            src={frame1}
            alt="Frame Tengah"
            className="w-72 select-none drop-shadow-xl animate-fade-in"
            style={{ animationDelay: "0.5s" }}
          />
        </div>

        {/* Nama Pasangan Pengantin */}
        <div
          className="absolute top-[48%] -translate-y-1/2 inset-x-0 flex flex-col items-center justify-center text-center z-20 pointer-events-none animate-fade-in leading-tight"
          style={{ animationDelay: "0.9s" }}
        >
          <h2
            className="text-4xl text-white drop-shadow-lg tracking-wide"
            style={{ fontFamily: "'Alex Brush', 'Great Vibes', cursive" }}
          >
            {groomName}
          </h2>
          <span
            className="text-xl text-[#F0C98A] font-serif italic my-0.5"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            &
          </span>
          <h2
            className="text-4xl text-white drop-shadow-lg tracking-wide"
            style={{ fontFamily: "'Alex Brush', 'Great Vibes', cursive" }}
          >
            {brideName}
          </h2>
        </div>

        {/* Kotak Tamu Undangan */}
        <div
          className="absolute top-[64%] -translate-y-1/2 left-1/2 -translate-x-1/2 w-[240px] rounded-2xl border border-[#F0C98A]/35 bg-black/25 backdrop-blur-[2px] px-4 py-2.5 flex flex-col items-center justify-center text-center z-20 pointer-events-none animate-fade-in shadow-xl"
          style={{ animationDelay: "1.1s" }}
        >
          <p
            className="text-xs italic text-white/90 font-serif tracking-wide"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Kepada Yth. Bapak/Ibu
          </p>
          <p
            className="text-base font-bold tracking-[0.2em] uppercase text-[#F5E6D3] my-1 drop-shadow"
            style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
          >
            {guestName}
          </p>
          <p className="text-[8px] text-white/70 italic tracking-tight leading-tight">
            *Mohon Maaf bila ada kesalahan penulisan nama atau gelar
          </p>
        </div>

        {/* Tombol Masuk / Buka Undangan */}
        <div
          className="absolute top-[75%] -translate-y-1/2 left-1/2 -translate-x-1/2 z-30 animate-fade-in"
          style={{ animationDelay: "1.3s" }}
        >
          <button
            type="button"
            onClick={onOpenInvitation}
            className="px-8 py-2 rounded-full bg-[#DFBE99] hover:bg-[#E8CEAD] text-[#3D1016] font-serif font-bold text-xs tracking-widest uppercase shadow-2xl transition-all active:scale-95 cursor-pointer flex items-center justify-center border border-[#F6DFCA]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Masuk
          </button>
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

        {/* Bunga 3 (Bunga Tengah Bawah di belakang Tombol Masuk / di atas Batik) */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-44 z-[15] pointer-events-none select-none animate-fade-in"
          style={{ animationDelay: "1.2s" }}
        >
          <img
            src={bunga3}
            alt="Bunga Bawah"
            className="w-full object-contain drop-shadow-xl"
          />
        </div>

        {/* Batik 2 (ABSOLUTE - tepi BAWAH, menimpa kaki penari) */}
        <div className="absolute bottom-0 left-0 right-0 z-10 leading-none pointer-events-none">
          <img
            src={batik2}
            alt="Batik Bawah"
            className="w-full block object-contain select-none"
          />
        </div>
      </div>
    </div>
  );
}
