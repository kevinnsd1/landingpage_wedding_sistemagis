import React, { useState } from 'react';
import {
  Palette,
  Eye,
  Save,
  Check,
  Smartphone,
  ExternalLink,
  Music,
  Layout,
  Type,
  Share2,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { Wedding } from '@/types/wedding';
import { Invitation, ThemeId, SectionType, ThemeColors } from '@/types/invitation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { InvitationView } from '@/views/InvitationView';
import { getAllThemes } from '@/themes';

export interface EditorTabProps {
  wedding: Wedding;
  invitation: Invitation;
  onSaveInvitation: (invitation: Invitation) => void;
  onViewInvitation: () => void;
  onShowToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

export function EditorTab({
  wedding,
  invitation,
  onSaveInvitation,
  onViewInvitation,
  onShowToast,
}: EditorTabProps) {
  const [config, setConfig] = useState(invitation.config);
  const [activeSubTab, setActiveSubTab] = useState<'theme' | 'colors' | 'sections' | 'music' | 'quote'>('theme');
  const [isSaving, setIsSaving] = useState(false);

  const availableThemes = getAllThemes();
  const activeTheme = availableThemes.find((t) => t.id === config.themeId) || availableThemes[0];


  // Dynamic customizable colors list from theme, or fallback to generic default colors
  const customizableColors = activeTheme.customizableColors || [
    { key: 'primary', label: 'Warna Utama', type: 'color' },
    { key: 'secondary', label: 'Warna Sekunder', type: 'color' },
    { key: 'accent', label: 'Warna Aksen', type: 'color' },
    { key: 'background', label: 'Warna Latar Belakang', type: 'color' },
  ];

  // Determine current effective colors by falling back to active theme defaults
  const currentColors = customizableColors.reduce((acc, { key }) => {
    const colorKey = key as string;
    const configColors = config.colors as unknown as Record<string, string | undefined> | undefined;
    const defaultColors = activeTheme.defaultColors as Record<string, string>;
    acc[colorKey] = configColors?.[colorKey] || defaultColors[colorKey] || '#000000';
    return acc;
  }, {} as Record<string, string>);

  const handleResetColors = () => {
    setConfig((prev) => ({
      ...prev,
      colors: { ...activeTheme.defaultColors },
    }));
    onShowToast('Warna berhasil dikembalikan ke standar tema bawaan.', 'info');
  };

  const handleThemeChange = (themeId: ThemeId) => {
    setConfig((prev) => ({
      ...prev,
      themeId,
    }));
  };

  const handleColorChange = (key: keyof typeof currentColors, value: string) => {
    setConfig((prev) => ({
      ...prev,
      colors: {
        ...(prev.colors || {}),
        [key]: value,
      },
    }));
  };

  const handleToggleSection = (type: SectionType) => {
    setConfig((prev) => ({
      ...prev,
      sections: (prev.sections || []).map((s) =>
        s.type === type ? { ...s, enabled: !s.enabled } : s
      ),
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    const updated: Invitation = {
      ...invitation,
      config,
      updatedAt: new Date().toISOString(),
    };
    setTimeout(() => {
      onSaveInvitation(updated);
      setIsSaving(false);
      onShowToast('Perubahan desain undangan berhasil disimpan!', 'success');
    }, 400);
  };

  const handleCopyLink = () => {
    const fullUrl = `${window.location.origin}/?wedding=${wedding.slug}`;
    navigator.clipboard.writeText(fullUrl);
    onShowToast('Link undangan pernikahan berhasil disalin!', 'info');
  };

  const currentInvitation: Invitation = {
    ...invitation,
    config,
  };


  const sectionLabels: Partial<Record<SectionType, string>> = {
    cover: 'Sampul Undangan',
    couple: 'Profil Kedua Mempelai',
    story: 'Kisah Cinta',
    event: 'Rangkaian Acara (Akad & Resepsi)',
    countdown: 'Hitungan Mundur',
    gallery: 'Galeri Foto',
    gift: 'Hadiah & Amplop Digital',
    rsvp: 'Formulir RSVP Kehadiran',
    guestbook: 'Buku Tamu & Ucapan Doa',
    closing: 'Penutup & Salam Terakhir',
    music: 'Musik Latar',
    quote: 'Kutipan Romantis',
    livestream: 'Live Streaming',
    prayer: 'Doa & Harapan',
    dress_code: 'Dress Code',
    schedule: 'Susunan Acara',
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-neutral-100 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-[#263238]">Editor & Live Preview Undangan</h2>
          <p className="text-xs text-neutral-500">
            Sesuaikan tema, tata letak seksi, musik latar, dan kutipan romantis.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyLink}
            icon={<Share2 className="w-3.5 h-3.5" />}
          >
            Salin Link Publik
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={onViewInvitation}
            icon={<Eye className="w-3.5 h-3.5" />}
          >
            Buka Tab Baru
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSave}
            isLoading={isSaving}
            icon={<Save className="w-3.5 h-3.5 text-[#263238]" />}
          >
            Simpan Perubahan
          </Button>
        </div>
      </div>

      {/* Editor Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Config Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Sub-tab Switcher */}
          <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setActiveSubTab('theme')}
              className={`flex-1 py-2 rounded-md flex items-center justify-center gap-1.5 transition-all ${
                activeSubTab === 'theme'
                  ? 'bg-white text-[#263238] shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              Tema
            </button>
            <button
              onClick={() => setActiveSubTab('colors')}
              className={`flex-1 py-2 rounded-md flex items-center justify-center gap-1.5 transition-all ${
                activeSubTab === 'colors'
                  ? 'bg-white text-[#263238] shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Warna
            </button>
            <button
              onClick={() => setActiveSubTab('sections')}
              className={`flex-1 py-2 rounded-md flex items-center justify-center gap-1.5 transition-all ${
                activeSubTab === 'sections'
                  ? 'bg-white text-[#263238] shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              Seksi
            </button>
            <button
              onClick={() => setActiveSubTab('music')}
              className={`flex-1 py-2 rounded-md flex items-center justify-center gap-1.5 transition-all ${
                activeSubTab === 'music'
                  ? 'bg-white text-[#263238] shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <Music className="w-3.5 h-3.5" />
              Musik
            </button>
            <button
              onClick={() => setActiveSubTab('quote')}
              className={`flex-1 py-2 rounded-md flex items-center justify-center gap-1.5 transition-all ${
                activeSubTab === 'quote'
                  ? 'bg-white text-[#263238] shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              Kutipan
            </button>
          </div>

          {/* Sub-tab 1: Themes */}
          {activeSubTab === 'theme' && (
            <Card className="space-y-4">
              <h3 className="text-sm font-semibold text-[#263238]">Pilih Gaya Tema</h3>
              <div className="space-y-3">
                {availableThemes.map((m) => {
                  const isSelected = config.themeId === m.id;
                  return (
                    <div
                      key={m.id}
                      onClick={() => handleThemeChange(m.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-slate-900 bg-neutral-50/70 shadow-xs'
                          : 'border-neutral-200 hover:border-neutral-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2.5">
                          <div className="flex items-center -space-x-1.5">
                            <span
                              className="w-4 h-4 rounded-full border border-white shadow-xs"
                              style={{ backgroundColor: m.defaultColors.primary }}
                            />
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-white shadow-xs"
                              style={{ backgroundColor: m.defaultColors.secondary }}
                            />
                            <span
                              className="w-3 h-3 rounded-full border border-white shadow-xs"
                              style={{ backgroundColor: m.defaultColors.accent }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-neutral-900">{m.name}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-500 font-medium">
                            v{m.version}
                          </span>
                        </div>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs shadow-xs">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-500 leading-relaxed pl-8">{m.description}</p>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          {/* Sub-tab 1.5: Colors */}
          {activeSubTab === 'colors' && (
            <Card className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                <div>
                  <h3 className="text-sm font-semibold text-[#263238]">Kustomisasi Warna</h3>
                  <p className="text-xs text-neutral-500">
                    Sesuaikan palet warna undangan agar selaras dengan konsep pernikahan Anda.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleResetColors}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-600 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                  title="Kembalikan semua warna ke standar bawaan tema ini"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Standar
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {customizableColors.map((colorDef) => {
                  const keyStr = colorDef.key;
                  return (
                    <div key={keyStr} className="space-y-2">
                      <label className="text-xs font-semibold text-neutral-700">{colorDef.label}</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={currentColors[keyStr] || '#000000'}
                          onChange={(e) => handleColorChange(keyStr, e.target.value)}
                          className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                        />
                        <Input
                          value={currentColors[keyStr] || ''}
                          onChange={(e) => handleColorChange(keyStr, e.target.value)}
                          className="flex-1 font-mono text-xs uppercase"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100 flex gap-2 items-start">
                <Sparkles className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-[11px] leading-relaxed text-blue-800">
                  Tips: Warna yang Anda pilih akan otomatis diterapkan pada tombol, garis batas, teks penekanan, dan elemen desain lainnya di seluruh undangan secara adaptif berkat teknologi Template Engine yang baru.
                </p>
              </div>
            </Card>
          )}

          {/* Sub-tab 2: Sections Configuration */}
          {activeSubTab === 'sections' && (
            <Card className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-neutral-900">Urutan & Visibilitas Seksi</h3>
                <p className="text-xs text-neutral-500">
                  Aktifkan atau nonaktifkan modul undangan yang ingin ditampilkan.
                </p>
              </div>
              <div className="space-y-2">
                {config.sections.map((section) => (
                  <div
                    key={section.type}
                    className="flex items-center justify-between p-3 rounded-lg border border-neutral-100 bg-[#FCFCFC] hover:border-neutral-200 transition-colors"
                  >
                    <span className="text-xs font-medium text-neutral-900">
                      {sectionLabels[section.type] || section.type}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleToggleSection(section.type)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                        section.enabled ? 'bg-slate-900' : 'bg-neutral-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                          section.enabled ? 'translate-x-4' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Sub-tab 3: Music Configuration */}
          {activeSubTab === 'music' && (
            <Card className="space-y-4">
              <h3 className="text-sm font-semibold text-neutral-900">Musik Latar Undangan</h3>
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#FCFCFC] border border-neutral-100">
                <span className="text-xs font-semibold text-neutral-900">Putar Musik Latar Otomatis</span>
                <button
                  type="button"
                  onClick={() =>
                    setConfig((prev) => ({
                      ...prev,
                      music: { ...prev.music, enabled: !prev.music.enabled },
                    }))
                  }
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                    config.music.enabled ? 'bg-slate-900' : 'bg-neutral-200'
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                      config.music.enabled ? 'translate-x-4' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <Input
                label="Judul Lagu"
                value={config.music.title}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    music: { ...prev.music, title: e.target.value },
                  }))
                }
              />

              <Input
                label="Artis / Pengisi Lagu"
                value={config.music.artist}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    music: { ...prev.music, artist: e.target.value },
                  }))
                }
              />

              <Input
                label="URL Audio (MP3)"
                value={config.music.url}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    music: { ...prev.music, url: e.target.value },
                  }))
                }
              />
            </Card>
          )}

          {/* Sub-tab 4: Quotes */}
          {activeSubTab === 'quote' && (
            <Card className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900">Kutipan & Ayat Cinta</h3>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Teks Kutipan / Doa
                </label>
                <textarea
                  rows={4}
                  value={config.quote?.text || ''}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      quote: { text: e.target.value, source: prev.quote?.source || '' },
                    }))
                  }
                  className="w-full bg-white border border-neutral-200 text-sm rounded-md p-3 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 text-slate-900 resize-none"
                />
              </div>

              <Input
                label="Sumber Kutipan"
                value={config.quote?.source || ''}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    quote: { text: prev.quote?.text || '', source: e.target.value },
                  }))
                }
                placeholder="Contoh: QS. Ar-Rum: 21 atau Kahlil Gibran"
              />
            </Card>
          )}
        </div>

        {/* Right Preview Frame (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-3 px-2">
            <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium">
              <Smartphone className="w-4 h-4 text-neutral-400" />
              <span>Simulasi Tampilan Ponsel (Mobile Experience)</span>
            </div>
            <Badge variant="primary" size="sm">
              Live Preview
            </Badge>
          </div>

          {/* Realistic Mobile Device Frame */}
          <div className="relative w-full max-w-[420px] h-[780px] bg-neutral-900 rounded-[44px] p-3 shadow-2xl ring-1 ring-neutral-700/50">
            {/* Camera notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-30" />

            {/* Screen inner wrapper */}
            <div className="w-full h-full bg-white rounded-[36px] overflow-y-auto overflow-x-hidden relative">
              <InvitationView
                wedding={wedding}
                invitation={currentInvitation}
                isPreview={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
