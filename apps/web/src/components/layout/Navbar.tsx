import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { BrandLogo } from '@/components/ui/BrandLogo';

export interface NavbarProps {
  onNavigate: (view: string) => void;
  currentView?: string;
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

export function Navbar({ onNavigate, currentView = 'landing', isLoggedIn = false, onLogout }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#FCFCFC]/90 backdrop-blur-md border-b border-neutral-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => onNavigate('landing')}
          className="cursor-pointer group flex items-center"
        >
          <BrandLogo
            variant="horizontal"
            imgClassName="h-9 hover:scale-[1.02] transition-transform duration-200"
            subtitle="Sistemagis Wedding Platform"
          />
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
          <button
            onClick={() => onNavigate('landing')}
            className="hover:text-neutral-900 transition-colors"
          >
            Beranda
          </button>
          <a href="#fitur" className="hover:text-neutral-900 transition-colors">
            Fitur Utama
          </a>
          <a href="#tema" className="hover:text-neutral-900 transition-colors">
            Pilihan Tema
          </a>
          <a href="#harga" className="hover:text-neutral-900 transition-colors">
            Harga
          </a>
          <button
            onClick={() => onNavigate('invitation-demo')}
            className="flex items-center gap-1.5 text-neutral-800 font-semibold hover:text-neutral-950 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
            Lihat Contoh Undangan
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Button
                variant="primary"
                size="sm"
                onClick={() => onNavigate('dashboard')}
              >
                Ke Dashboard
              </Button>
              {onLogout && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                >
                  Keluar
                </Button>
              )}
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate('login')}
              >
                Masuk
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => onNavigate('register')}
              >
                Mulai Gratis
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
