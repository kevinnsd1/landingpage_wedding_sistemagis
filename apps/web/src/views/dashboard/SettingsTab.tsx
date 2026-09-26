import React, { useState } from 'react';
import {
  Settings,
  Heart,
  Save,
  Globe,
  Calendar,
  CreditCard,
  RotateCcw,
  AlertTriangle,
  Copy,
  Check,
  User as UserIcon,
  ShieldCheck,
  KeyRound,
  LogOut,
  Mail,
  Lock,
  Trash2,
} from 'lucide-react';
import { Wedding, GiftAccount } from '@/types/wedding';
import { User } from '@/types/user';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { MediaUploader } from '@/components/ui/MediaUploader';
import { Badge } from '@/components/ui/Badge';
import { formatDateIndo } from '@/lib/utils';

export interface SettingsTabProps {
  user?: User;
  wedding: Wedding;
  onUpdateWedding: (wedding: Wedding) => void;
  onShowToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  onResetData: () => void;
  onLogout?: () => void;
  defaultSection?: 'all' | 'account' | 'wedding' | 'events' | 'gifts';
}

export function SettingsTab({
  user,
  wedding,
  onUpdateWedding,
  onShowToast,
  onResetData,
  onLogout,
  defaultSection = 'all',
}: SettingsTabProps) {
  const defaultEvent = { title: '', date: '', time: '', venue: '', address: '' };
  const [formData, setFormData] = useState<Wedding>({
    ...wedding,
    gifts: wedding.gifts || [],
    stories: wedding.stories || [],
    akadEvent: wedding.akadEvent || defaultEvent,
    receptionEvent: wedding.receptionEvent || defaultEvent,
  });
  const [activeSection, setActiveSection] = useState<'all' | 'account' | 'wedding' | 'events' | 'gifts'>(defaultSection);
  const [isSaving, setIsSaving] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState(false);

  // Account security password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  React.useEffect(() => {
    if (defaultSection) {
      setActiveSection(defaultSection);
    }
  }, [defaultSection]);

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      onShowToast('Masukkan kata sandi saat ini.', 'error');
      return;
    }
    if (newPassword.length < 6) {
      onShowToast('Kata sandi baru minimal 6 karakter.', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      onShowToast('Konfirmasi kata sandi baru tidak cocok.', 'error');
      return;
    }
    setIsUpdatingPassword(true);
    setTimeout(() => {
      setIsUpdatingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      onShowToast('Kata sandi akun Anda berhasil diperbarui!', 'success');
    }, 600);
  };

  React.useEffect(() => {
    setFormData({
      ...wedding,
      gifts: wedding.gifts || [],
      stories: wedding.stories || [],
      akadEvent: wedding.akadEvent || defaultEvent,
      receptionEvent: wedding.receptionEvent || defaultEvent,
    });
  }, [wedding]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onUpdateWedding(formData);
      onShowToast('Profil dan pengaturan pernikahan berhasil disimpan!', 'success');
    } catch (err: any) {
      onShowToast(err?.message || 'Gagal menyimpan perubahan', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopySlug = () => {
    const domain = `${formData.slug}.kisahmagis.id`;
    navigator.clipboard.writeText(`https://${domain}`);
    setCopiedSlug(true);
    onShowToast(`Tautan https://${domain} berhasil disalin!`, 'info');
    setTimeout(() => setCopiedSlug(false), 2000);
  };

  const handleTogglePublish = () => {
    const newStatus = formData.status === 'published' ? 'draft' : 'published';
    setFormData((prev) => ({ ...prev, status: newStatus }));
    onShowToast(
      newStatus === 'published'
        ? 'Undangan pernikahan sekarang dipublikasikan (Online)!'
        : 'Undangan pernikahan disimpan sebagai Draf (Pribadi).',
      'info'
    );
  };

  const handleAddGift = () => {
    const newGift: GiftAccount = {
      id: `gift-${Date.now()}`,
      bankName: 'BCA',
      accountNumber: '',
      accountHolder: formData.groomName.split(' ')[0] || 'Nama Pemilik',
    };
    setFormData((prev) => ({
      ...prev,
      gifts: [...prev.gifts, newGift],
    }));
  };

  const handleRemoveGift = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      gifts: prev.gifts.filter((g) => g.id !== id),
    }));
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 animate-in fade-in duration-150 max-w-4xl">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-neutral-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Settings className="w-5 h-5 text-slate-700" />
            <h2 className="text-lg font-bold text-neutral-900">
              {activeSection === 'account' ? 'Pengaturan Akun & Keamanan' : 'Profil & Pengaturan Pernikahan'}
            </h2>
          </div>
          <p className="text-xs text-neutral-500">
            {activeSection === 'account'
              ? 'Kelola informasi akun pengguna, kredensial login, dan keamanan data.'
              : 'Atur data mempelai, tanggal pernikahan, tautan publik, dan rekening amplop digital.'}
          </p>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="sm"
          isLoading={isSaving}
          icon={<Save className="w-4 h-4" />}
        >
          Simpan Perubahan
        </Button>
      </div>

      {/* Section Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'all', label: 'Semua Pengaturan' },
          { id: 'account', label: 'Akun & Keamanan' },
          { id: 'wedding', label: 'Profil Mempelai' },
          { id: 'events', label: 'Waktu & Acara' },
          { id: 'gifts', label: 'Rekening Amplop' },
        ].map((sec) => (
          <button
            key={sec.id}
            type="button"
            onClick={() => setActiveSection(sec.id as any)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
              activeSection === sec.id
                ? 'bg-[#263238] text-white border-[#263238] shadow-2xs'
                : 'bg-white text-slate-600 border-neutral-200 hover:bg-neutral-50 hover:text-slate-900'
            }`}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {/* Account Profile & Security Settings Card */}
      {(activeSection === 'all' || activeSection === 'account') && (
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
              <UserIcon className="w-4 h-4 text-slate-700" />
              Informasi &amp; Pengaturan Akun
            </h3>
            <Badge variant="primary" size="sm">
              Akun Pemilik Acara
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Account Info Details */}
            <div className="p-5 rounded-xl bg-neutral-50/70 border border-neutral-200/80 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#263238] text-white font-bold flex items-center justify-center text-base shadow-xs flex-shrink-0">
                  {(user?.name || formData.groomName || 'K').charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-neutral-900 truncate">
                    {user?.name || `${formData.groomName.split(' ')[0]} & ${formData.brideName.split(' ')[0]}`}
                  </h4>
                  <p className="text-xs text-slate-500 truncate flex items-center gap-1 mt-0.5">
                    <Mail className="w-3 h-3 text-slate-400" />
                    <span>{user?.email || 'andi@kisahmagis.id'}</span>
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-neutral-200/60 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Status Akun</span>
                  <span className="font-semibold text-emerald-700 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Terverifikasi &amp; Aktif
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Tipe Paket</span>
                  <span className="font-semibold text-slate-800">
                    Paket Premium Exclusive
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">ID Pengguna</span>
                  <span className="font-mono text-slate-600 text-[11px]">
                    {user?.id ? `usr_${user.id}` : 'usr_demo_02'}
                  </span>
                </div>
              </div>

              {onLogout && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onLogout}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-rose-600 bg-rose-50/60 hover:bg-rose-100/80 border border-rose-200/60 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Keluar dari Akun</span>
                  </button>
                </div>
              )}
            </div>

            {/* Change Password Form */}
            <div className="p-5 rounded-xl bg-neutral-50/70 border border-neutral-200/80 space-y-4 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                  <KeyRound className="w-3.5 h-3.5 text-slate-700" />
                  Keamanan &amp; Kata Sandi
                </h4>
                <p className="text-[11px] text-slate-500 mb-3">
                  Perbarui kata sandi secara berkala untuk menjaga keamanan akun Anda.
                </p>

                <div className="space-y-2.5">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      Kata Sandi Saat Ini
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full bg-white border border-neutral-200 text-xs rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 mb-1">
                        Kata Sandi Baru
                      </label>
                      <input
                        type="password"
                        placeholder="Minimal 6 karakter"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full bg-white border border-neutral-200 text-xs rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 mb-1">
                        Konfirmasi Sandi
                      </label>
                      <input
                        type="password"
                        placeholder="Ketik ulang sandi"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-white border border-neutral-200 text-xs rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-800"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  isLoading={isUpdatingPassword}
                  onClick={handleUpdatePassword}
                  className="w-full text-xs h-9 justify-center"
                >
                  Perbarui Kata Sandi
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Publication Status & Slug */}
      {(activeSection === 'all' || activeSection === 'wedding' || activeSection === 'account') && (
      <Card className="p-6 space-y-4">
        <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
          <Globe className="w-4 h-4 text-slate-700" />
          Status Publikasi & Alamat Web Undangan
        </h3>

        <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 border border-neutral-100">
          <div>
            <span className="text-xs font-semibold text-[#263238] block">
              Status Undangan: {formData.status === 'published' ? 'Online (Dipublikasikan)' : 'Draf (Pribadi)'}
            </span>
            <span className="text-[11px] text-neutral-500">
              {formData.status === 'published'
                ? 'Undangan dapat diakses oleh tamu melalui tautan publik.'
                : 'Undangan hanya dapat dilihat dalam pratinjau dashboard.'}
            </span>
          </div>

          <button
            type="button"
            onClick={handleTogglePublish}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
              formData.status === 'published'
                ? 'bg-[#EBF7E5] text-[#3D6420] border border-[#B9DCA9]'
                : 'bg-neutral-200 text-neutral-700'
            }`}
          >
            {formData.status === 'published' ? 'Status: Publik' : 'Ubah ke Publik'}
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Tautan Undangan (Slug URL)
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center">
              <span className="bg-neutral-100 border border-r-0 border-neutral-200 text-xs text-slate-500 px-3 py-2.5 rounded-l-md select-none">
                https://
              </span>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''),
                  }))
                }
                className="w-full bg-white border border-neutral-200 text-sm px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
              />
              <span className="bg-neutral-100 border border-l-0 border-neutral-200 text-xs text-slate-500 px-3 py-2.5 rounded-r-md select-none">
                .kisahmagis.id
              </span>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCopySlug}
              icon={copiedSlug ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
              className="h-10 text-xs"
            >
              {copiedSlug ? 'Tersalin' : 'Salin'}
            </Button>
          </div>
          <p className="text-xs text-slate-500 mt-1.5">
            Gunakan huruf kecil, angka, dan tanda hubung (-) untuk alamat web undangan Anda.
          </p>
        </div>
      </Card>
      )}

      {/* Couple Profiles */}
      {(activeSection === 'all' || activeSection === 'wedding') && (
      <Card className="p-6 space-y-6">
        <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
          <Heart className="w-4 h-4 text-slate-700" />
          Informasi Mempelai
        </h3>

        {/* Groom */}
        <div className="space-y-4 p-5 rounded-xl bg-neutral-50/70 border border-neutral-200/80">
          <h4 className="text-sm font-semibold text-slate-900">
            Mempelai Pria
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Nama Lengkap & Gelar"
              value={formData.groomName}
              onChange={(e) => setFormData((prev) => ({ ...prev, groomName: e.target.value }))}
              required
            />
            <Input
              label="Akun Instagram"
              value={formData.groomInstagram || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, groomInstagram: e.target.value }))}
              placeholder="@username"
            />
          </div>
          <Input
            label="Keterangan Orang Tua"
            value={formData.groomParents}
            onChange={(e) => setFormData((prev) => ({ ...prev, groomParents: e.target.value }))}
            placeholder="Putra pertama dari Bpk. ... & Ibu ..."
            required
          />
          <MediaUploader
            label="Unggah Foto Mempelai Pria"
            description="Pilih foto profil pria untuk ditampilkan di undangan."
            accept="image/*"
            value={formData.groomPhoto || ''}
            onChange={(url) => setFormData((prev) => ({ ...prev, groomPhoto: url }))}
          />
        </div>

        {/* Bride */}
        <div className="space-y-4 p-5 rounded-xl bg-neutral-50/70 border border-neutral-200/80">
          <h4 className="text-sm font-semibold text-slate-900">
            Mempelai Wanita
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Nama Lengkap & Gelar"
              value={formData.brideName}
              onChange={(e) => setFormData((prev) => ({ ...prev, brideName: e.target.value }))}
              required
            />
            <Input
              label="Akun Instagram"
              value={formData.brideInstagram || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, brideInstagram: e.target.value }))}
              placeholder="@username"
            />
          </div>
          <Input
            label="Keterangan Orang Tua"
            value={formData.brideParents}
            onChange={(e) => setFormData((prev) => ({ ...prev, brideParents: e.target.value }))}
            placeholder="Putri kedua dari Bpk. ... & Ibu ..."
            required
          />
          <MediaUploader
            label="Unggah Foto Mempelai Wanita"
            description="Pilih foto profil wanita untuk ditampilkan di undangan."
            accept="image/*"
            value={formData.bridePhoto || ''}
            onChange={(url) => setFormData((prev) => ({ ...prev, bridePhoto: url }))}
          />
        </div>
      </Card>
      )}

      {/* Wedding Events Info */}
      {(activeSection === 'all' || activeSection === 'events') && (
      <Card className="p-6 space-y-6">
        <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-700" />
          Waktu & Detail Acara Pernikahan
        </h3>

        {/* Tanggal Utama Pernikahan */}
        <div className="p-5 rounded-xl bg-neutral-50/70 border border-neutral-200/80 space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-semibold text-slate-900">
              Tanggal Pernikahan Utama (Hari Istimewa)
            </label>
            {formData.weddingDate && (
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, weddingDate: '' }))}
                className="text-[11px] text-neutral-400 hover:text-rose-600 transition-colors"
              >
                Hapus Tanggal
              </button>
            )}
          </div>
          <p className="text-xs text-neutral-500">
            Tanggal ini digunakan sebagai patokan hitung mundur (countdown live) dan ditampilkan di halaman ringkasan serta sampul undangan.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-1">
            <input
              type="date"
              value={formData.weddingDate ? formData.weddingDate.slice(0, 10) : ''}
              onChange={(e) => {
                const val = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  weddingDate: val ? new Date(val + 'T08:00:00Z').toISOString() : '',
                }));
              }}
              className="bg-white border border-neutral-200 text-sm px-3.5 py-2 rounded-lg text-neutral-900 focus:outline-none focus:border-neutral-900 shadow-2xs"
            />
            {formData.weddingDate ? (
              <span className="text-xs font-semibold text-neutral-800 bg-white px-3 py-2 rounded-lg border border-neutral-200 shadow-2xs">
                {formatDateIndo(formData.weddingDate)}
              </span>
            ) : (
              <span className="text-xs text-neutral-400 italic">
                (Belum ditentukan)
              </span>
            )}
          </div>
        </div>

        {/* Akad */}
        <div className="space-y-4 p-4 rounded-xl bg-neutral-50 border border-neutral-100">
          <h4 className="text-sm font-semibold text-slate-900">
            Akad Nikah / Pemberkatan
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Tanggal Acara"
              value={formData.akadEvent.date}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  akadEvent: { ...prev.akadEvent, date: e.target.value },
                }))
              }
            />
            <Input
              label="Waktu Acara"
              value={formData.akadEvent.time}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  akadEvent: { ...prev.akadEvent, time: e.target.value },
                }))
              }
            />
          </div>
          <Input
            label="Nama Tempat / Gedung / Masjid"
            value={formData.akadEvent.venue}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                akadEvent: { ...prev.akadEvent, venue: e.target.value },
              }))
            }
          />
          <Input
            label="Alamat Lengkap"
            value={formData.akadEvent.address}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                akadEvent: { ...prev.akadEvent, address: e.target.value },
              }))
            }
          />
          <Input
            label="URL Google Maps"
            value={formData.akadEvent.mapUrl || ''}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                akadEvent: { ...prev.akadEvent, mapUrl: e.target.value },
              }))
            }
          />
        </div>

        {/* Resepsi */}
        <div className="space-y-4 p-4 rounded-xl bg-neutral-50 border border-neutral-100">
          <h4 className="text-sm font-semibold text-slate-900">
            Resepsi Pernikahan
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Tanggal Acara"
              value={formData.receptionEvent.date}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  receptionEvent: { ...prev.receptionEvent, date: e.target.value },
                }))
              }
            />
            <Input
              label="Waktu Acara"
              value={formData.receptionEvent.time}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  receptionEvent: { ...prev.receptionEvent, time: e.target.value },
                }))
              }
            />
          </div>
          <Input
            label="Nama Tempat / Ballroom / Hotel"
            value={formData.receptionEvent.venue}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                receptionEvent: { ...prev.receptionEvent, venue: e.target.value },
              }))
            }
          />
          <Input
            label="Alamat Lengkap"
            value={formData.receptionEvent.address}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                receptionEvent: { ...prev.receptionEvent, address: e.target.value },
              }))
            }
          />
          <Input
            label="URL Google Maps"
            value={formData.receptionEvent.mapUrl || ''}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                receptionEvent: { ...prev.receptionEvent, mapUrl: e.target.value },
              }))
            }
          />
        </div>
      </Card>
      )}

      {/* Digital Gift Bank Accounts */}
      {(activeSection === 'all' || activeSection === 'gifts') && (
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-slate-700" />
            Rekening Amplop Digital / Hadiah
          </h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddGift}
          >
            + Tambah Rekening
          </Button>
        </div>

        <div className="space-y-3">
          {formData.gifts.map((gift, idx) => (
            <div
              key={gift.id}
              className="p-4 rounded-xl bg-neutral-50 border border-neutral-100 flex flex-col sm:flex-row items-center gap-3"
            >
              <div className="w-full sm:w-1/3">
                <input
                  type="text"
                  placeholder="Nama Bank (BCA / Mandiri / BNI)"
                  value={gift.bankName}
                  onChange={(e) => {
                    const next = [...formData.gifts];
                    next[idx].bankName = e.target.value;
                    setFormData((prev) => ({ ...prev, gifts: next }));
                  }}
                  className="w-full bg-white border border-neutral-200 text-xs font-semibold rounded-md px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10"
                />
              </div>

              <div className="w-full sm:w-1/3">
                <input
                  type="text"
                  placeholder="Nomor Rekening"
                  value={gift.accountNumber}
                  onChange={(e) => {
                    const next = [...formData.gifts];
                    next[idx].accountNumber = e.target.value;
                    setFormData((prev) => ({ ...prev, gifts: next }));
                  }}
                  className="w-full bg-white border border-neutral-200 text-xs font-mono rounded-md px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10"
                />
              </div>

              <div className="w-full sm:w-1/3 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Atas Nama"
                  value={gift.accountHolder}
                  onChange={(e) => {
                    const next = [...formData.gifts];
                    next[idx].accountHolder = e.target.value;
                    setFormData((prev) => ({ ...prev, gifts: next }));
                  }}
                  className="w-full bg-white border border-neutral-200 text-xs rounded-md px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveGift(gift.id)}
                  className="p-2 text-neutral-400 hover:text-rose-500 rounded"
                  title="Hapus Rekening"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
      )}

      {/* Reset Seed Button */}
      {(activeSection === 'all' || activeSection === 'account') && (
      <div className="p-6 rounded-xl border border-rose-200 bg-rose-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-xs font-bold text-rose-700 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" />
            Reset Data Demo ke Awal
          </h4>
          <p className="text-[11px] text-rose-600/80">
            Mengembalikan seluruh data simulasi pengantin Andi & Sari ke seed default awal.
          </p>
        </div>
        <Button
          type="button"
          variant="danger"
          size="sm"
          onClick={onResetData}
          icon={<RotateCcw className="w-3.5 h-3.5" />}
        >
          Reset Data Demo
        </Button>
      </div>
      )}
    </form>
  );
}
