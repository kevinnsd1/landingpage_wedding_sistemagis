import React, { useState, useEffect, useRef } from 'react';
import { Music, Volume2, VolumeX, Disc } from 'lucide-react';

export interface MusicPlayerProps {
  url: string;
  title: string;
  artist: string;
  autoPlayTrigger?: boolean;
}

export function MusicPlayer({ url, title, artist, autoPlayTrigger = false }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Auto-play was prevented by browser policy, user will click manually
          setIsPlaying(false);
        });
    }
  }, [autoPlayTrigger]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(console.error);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={url}
        loop
        preload="auto"
      />

      {/* Floating Pill Player */}
      <div
        onClick={togglePlay}
        className={`fixed top-4 right-4 z-50 flex items-center gap-2.5 bg-white/90 backdrop-blur-md px-3 py-2 rounded-full border border-[#FCBACB]/60 shadow-romantic cursor-pointer transition-all duration-300 hover:scale-105 select-none ${
          isPlaying ? 'ring-2 ring-[#FC9FB1]/40' : 'opacity-80 hover:opacity-100'
        }`}
      >
        <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#FFF0F3] text-[#D96F88]">
          <Disc className={`w-4 h-4 ${isPlaying ? 'animate-spin-slow text-[#FC9FB1]' : 'text-neutral-400'}`} />
          {isPlaying && (
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#74A12E] animate-pulse" />
          )}
        </div>

        <div className="flex flex-col text-left max-w-[120px] sm:max-w-[160px] overflow-hidden pr-1">
          <span className="text-[11px] font-semibold text-[#263238] truncate">{title}</span>
          <span className="text-[9px] text-neutral-500 truncate">{artist}</span>
        </div>

        <button
          onClick={toggleMute}
          className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
          title={isMuted ? 'Nyalakan Suara' : 'Bisukan'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-500" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>
    </>
  );
}
