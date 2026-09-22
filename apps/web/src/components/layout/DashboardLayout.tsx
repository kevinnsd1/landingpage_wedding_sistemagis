import React, { useState } from 'react';
import {
  LayoutDashboard,
  HeartHandshake,
  Sparkles,
  Users,
  CheckSquare,
  Wallet,
  Building2,
  ImagePlay,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Heart,
} from 'lucide-react';
import { User } from '@/types/user';
import { Wedding } from '@/types/wedding';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { BrandLogo } from '@/components/ui/BrandLogo';

export interface DashboardLayoutProps {
  user: User;
  wedding: Wedding;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onViewInvitation: () => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export function DashboardLayout({
  user,
  wedding,
  activeTab,
  onTabChange,
  onViewInvitation,
  onLogout,
  children,
}: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigation = [
    { id: 'overview', label: 'Ringkasan', icon: LayoutDashboard },
    { id: 'wedding', label: 'Profil Pernikahan', icon: HeartHandshake },
    { id: 'editor', label: 'Editor Undangan', icon: Sparkles },
    { id: 'guests', label: 'Buku Tamu & RSVP', icon: Users },
    { id: 'planner', label: 'Wedding Planner', icon: CheckSquare },
    { id: 'budget', label: 'Anggaran & Biaya', icon: Wallet },
    { id: 'vendors', label: 'Direktori Vendor', icon: Building2 },
    { id: 'media', label: 'Galeri & Musik', icon: ImagePlay },
    { id: 'settings', label: 'Pengaturan & Akun', icon: Settings },
  ];

  const handleSelectTab = (id: string) => {
    onTabChange(id);
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FCFCFC] flex flex-col md:flex-row text-neutral-900">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-white border-b border-neutral-200/80 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <BrandLogo variant="horizontal" imgClassName="h-7" />
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg text-neutral-600 hover:bg-neutral-100"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40 md:hidden animate-in fade-in duration-150"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-neutral-200/80 flex flex-col transition-transform duration-200 ease-out md:translate-x-0 md:static shadow-lg md:shadow-none ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-neutral-200/80 flex items-center">
          <BrandLogo
            variant="horizontal"
            imgClassName="h-8"
            subtitle="Dashboard Pasangan"
          />
        </div>

        {/* Couple Info Card in Sidebar */}
        <div className="p-4 mx-3 my-3 bg-[#FCFCFC] rounded-xl border border-neutral-200/80">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-semibold text-slate-900 truncate">{wedding.groomName.split(' ')[0]} & {wedding.brideName.split(' ')[0]}</span>
            <Badge variant={wedding.status === 'published' ? 'success' : 'warning'} size="sm">
              {wedding.status === 'published' ? 'Live' : 'Draft'}
            </Badge>
          </div>
          <p className="text-xs text-slate-500 truncate mb-2">
            /{wedding.slug}
          </p>
          <button
            onClick={onViewInvitation}
            className="w-full text-left text-xs font-semibold text-slate-700 flex items-center gap-1.5 hover:text-slate-950 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            Buka Undangan Digital
          </button>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-slate-900 text-white font-medium shadow-2xs'
                    : 'text-neutral-600 hover:bg-neutral-100/80 hover:text-neutral-900 font-medium'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-neutral-200/80 flex items-center justify-between bg-neutral-50/50">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-semibold flex items-center justify-center text-xs flex-shrink-0">
              {user.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-neutral-900 truncate">{user.name}</p>
              <p className="text-xs text-slate-500 truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            title="Keluar"
            className="text-neutral-400 hover:text-rose-600 p-1.5 rounded-md hover:bg-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top bar on Desktop */}
        <div className="hidden md:flex items-center justify-between px-8 py-4 bg-[#FCFCFC]/90 backdrop-blur-md border-b border-neutral-200/80 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-neutral-900 font-ui">
              {navigation.find(n => n.id === activeTab)?.label || 'Dashboard'}
            </h1>
            <Badge variant={wedding.status === 'published' ? 'success' : 'warning'}>
              {wedding.status === 'published' ? 'Website Aktif' : 'Status Draf'}
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              icon={<ExternalLink className="w-3.5 h-3.5" />}
              onClick={onViewInvitation}
            >
              Lihat Undangan Publik
            </Button>
          </div>
        </div>

        {/* Page Content Body */}
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
