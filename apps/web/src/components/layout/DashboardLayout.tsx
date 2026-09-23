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
  Gift,
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

  const navSections = [
    {
      items: [
        { id: 'overview', label: 'Ringkasan', icon: LayoutDashboard },
      ],
    },
    {
      title: 'Undangan Digital',
      items: [
        { id: 'wedding', label: 'Profil Pernikahan', icon: HeartHandshake },
        { id: 'editor', label: 'Editor Undangan', icon: Sparkles },
        { id: 'media', label: 'Galeri & Musik', icon: ImagePlay },
        { id: 'guests', label: 'Buku Tamu & RSVP', icon: Users },
      ],
    },
    {
      title: 'Perencanaan Acara',
      items: [
        { id: 'planner', label: 'Wedding Planner', icon: CheckSquare },
        { id: 'seserahan', label: 'Seserahan & Hantaran', icon: Gift },
        { id: 'budget', label: 'Anggaran & Biaya', icon: Wallet },
        { id: 'vendors', label: 'Direktori Vendor', icon: Building2 },
      ],
    },
    {
      title: 'Pengaturan',
      items: [
        { id: 'settings', label: 'Pengaturan & Akun', icon: Settings },
      ],
    },
  ];

  const allNavItems = navSections.flatMap((section) => section.items);
  const currentItem = allNavItems.find((n) => n.id === activeTab);
  const currentSection = navSections.find((s) => s.items.some((i) => i.id === activeTab));

  const handleSelectTab = (id: string) => {
    onTabChange(id);
    setMobileOpen(false);
  };

  return (
    <div className="h-[100dvh] w-full bg-[#FCFCFC] flex flex-col md:flex-row text-neutral-900 overflow-hidden">
      {/* Mobile Top Header */}
      <header className="md:hidden bg-white/95 backdrop-blur-md border-b border-neutral-200/80 px-4 py-3 flex items-center justify-between flex-shrink-0 z-40 sticky top-0">
        <BrandLogo variant="horizontal" imgClassName="h-7" />
        <div className="flex items-center gap-2">
          <Badge variant={wedding.status === 'published' ? 'success' : 'warning'} size="sm">
            {wedding.status === 'published' ? 'Live' : 'Draft'}
          </Badge>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

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
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-neutral-200/80 flex flex-col transition-transform duration-200 ease-out md:translate-x-0 md:static md:h-full md:flex-shrink-0 shadow-lg md:shadow-none ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-5 border-b border-neutral-200/80 flex items-center justify-between flex-shrink-0">
          <BrandLogo
            variant="horizontal"
            imgClassName="h-7"
            subtitle="Dashboard Pasangan"
          />
        </div>

        {/* Couple Info Card in Sidebar */}
        <div className="mx-3 mt-3 mb-1 p-3 rounded-xl bg-neutral-50/70 border border-neutral-200/70 flex-shrink-0 transition-all hover:bg-neutral-50">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-xs font-bold text-[#263238] truncate">
              {wedding.groomName.split(' ')[0]} &amp; {wedding.brideName.split(' ')[0]}
            </span>
            <Badge variant={wedding.status === 'published' ? 'success' : 'warning'} size="sm">
              {wedding.status === 'published' ? 'Live' : 'Draft'}
            </Badge>
          </div>
          <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-neutral-200/50">
            <span className="text-[11px] text-slate-400 font-mono truncate">
              /{wedding.slug}
            </span>
            <button
              onClick={onViewInvitation}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-[#263238] transition-colors cursor-pointer group"
              title="Buka Website Undangan Digital"
            >
              <span>Buka Web</span>
              <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-[#263238]" />
            </button>
          </div>
        </div>

        {/* Grouped Navigation List */}
        <nav className="flex-1 px-3 py-2 space-y-3 overflow-y-auto">
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              {section.title && (
                <div className="px-3 pt-3 pb-1">
                  <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase font-ui">
                    {section.title}
                  </span>
                </div>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectTab(item.id)}
                      className={`group w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-[13px] transition-colors cursor-pointer border ${
                        isActive
                          ? 'bg-[#FCBACB]/20 text-[#7D4050] font-semibold border-[#FCBACB]/60 shadow-2xs'
                          : 'text-[#667085] hover:bg-neutral-100/70 hover:text-[#263238] font-medium border-transparent'
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 flex-shrink-0 transition-colors ${
                          isActive
                            ? 'text-[#832B42]'
                            : 'text-slate-400 group-hover:text-slate-700'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3.5 border-t border-neutral-200/80 flex items-center justify-between bg-neutral-50/50 flex-shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#263238] text-white font-semibold flex items-center justify-center text-xs flex-shrink-0 shadow-2xs">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-neutral-900 truncate leading-tight">
                {user.name}
              </p>
              <p className="text-[11px] text-slate-500 truncate leading-tight mt-0.5">
                {user.email}
              </p>
            </div>
          </div>
          <button
            onClick={onLogout}
            title="Keluar dari akun"
            className="text-slate-400 hover:text-rose-600 p-2 rounded-lg hover:bg-rose-50/80 transition-colors cursor-pointer flex-shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top bar on Desktop */}
        <header className="hidden md:flex items-center justify-between px-8 py-3.5 bg-white/80 backdrop-blur-md border-b border-neutral-200/80 flex-shrink-0 z-20">
          <div className="flex items-center gap-3">
            <div>
              {currentSection?.title && (
                <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block leading-tight">
                  {currentSection.title}
                </span>
              )}
              <div className="flex items-center gap-2.5 mt-0.5">
                <h1 className="text-xl font-bold text-neutral-900 font-ui">
                  {currentItem?.label || 'Dashboard'}
                </h1>
                <Badge variant={wedding.status === 'published' ? 'success' : 'warning'} size="sm">
                  {wedding.status === 'published' ? 'Website Aktif' : 'Status Draf'}
                </Badge>
              </div>
            </div>
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
        </header>

        {/* Page Content Body */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
