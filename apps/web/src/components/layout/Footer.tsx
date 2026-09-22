import React from 'react';
import { Heart } from 'lucide-react';
import { BrandLogo } from '@/components/ui/BrandLogo';

export function Footer({ onNavigate }: { onNavigate?: (view: string) => void }) {
  return (
    <footer className="bg-[#FCFCFC] border-t border-neutral-200/80 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="md:col-span-1">
            <div className="mb-3">
              <BrandLogo variant="horizontal" imgClassName="h-9" />
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Digital wedding platform & management system yang merangkai kisah romantis dan menyederhanakan persiapan pernikahan Anda.
            </p>
            <p className="text-[11px] text-neutral-400 mt-3">
              Bagian dari ekosistem <span className="font-semibold text-neutral-600">Sistemagis</span>.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
              Fitur Produk
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li><a href="#fitur" className="hover:text-neutral-900 transition-colors">Undangan Digital Elegan</a></li>
              <li><a href="#fitur" className="hover:text-neutral-900 transition-colors">Manajemen Tamu & RSVP</a></li>
              <li><a href="#fitur" className="hover:text-neutral-900 transition-colors">Kanban Wedding Planner</a></li>
              <li><a href="#fitur" className="hover:text-neutral-900 transition-colors">Pengelolaan Anggaran / Budget</a></li>
              <li><a href="#fitur" className="hover:text-neutral-900 transition-colors">Direktori Vendor</a></li>
            </ul>
          </div>

          {/* Themes */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
              Koleksi Tema
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li><span className="hover:text-neutral-900 cursor-pointer transition-colors">Serenity (Floral Romance)</span></li>
              <li><span className="hover:text-neutral-900 cursor-pointer transition-colors">Bloom (Warm Botanical)</span></li>
              <li><span className="hover:text-neutral-900 cursor-pointer transition-colors">Aurora (Modern Minimalist)</span></li>
              <li><span className="text-neutral-400">Tema Adat Nusantara (Segera)</span></li>
            </ul>
          </div>

          {/* Quick Access */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
              Akses Cepat
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600">
              {onNavigate && (
                <>
                  <li><button onClick={() => onNavigate('login')} className="hover:text-neutral-900 transition-colors">Masuk ke Akun</button></li>
                  <li><button onClick={() => onNavigate('register')} className="hover:text-neutral-900 transition-colors">Daftar Pengantin Baru</button></li>
                  <li><button onClick={() => onNavigate('invitation-demo')} className="hover:text-neutral-900 transition-colors">Demo Undangan Publik</button></li>
                </>
              )}
              <li className="pt-2 text-[11px] text-neutral-400">
                Hubungi kami: hello@kisahmagis.id
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <p>© {new Date().getFullYear()} KisahMagis — Sistemagis. Seluruh hak cipta dilindungi.</p>
          <div className="flex items-center gap-1 text-neutral-500">
            Dibuat dengan <Heart className="w-3.5 h-3.5 fill-[#FC9FB1] text-[#FC9FB1] inline" /> untuk merangkai setiap kisah magis.
          </div>
        </div>
      </div>
    </footer>
  );
}
