import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Copy,
  Check,
  Send,
  Trash2,
  Edit2,
  ExternalLink,
  MessageSquare,
  UserCheck,
  UserX,
  Clock,
} from 'lucide-react';
import { Wedding } from '@/types/wedding';
import { Guest, GuestGroup, RSVP, GuestbookEntry } from '@/types/guest';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { generateWhatsAppInvitation } from '@/lib/utils';
import { guestSchema } from '@/schemas/validation';

export interface GuestsTabProps {
  wedding: Wedding;
  guests: Guest[];
  rsvps: RSVP[];
  guestbook: GuestbookEntry[];
  onAddGuest: (guest: Omit<Guest, 'id' | 'weddingId' | 'invitationToken' | 'invitationStatus' | 'rsvpStatus' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateGuest: (guest: Guest) => void;
  onDeleteGuest: (id: string) => void;
  onDeleteGuestbookEntry: (id: string) => void;
  onShowToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

export function GuestsTab({
  wedding,
  guests,
  rsvps,
  guestbook,
  onAddGuest,
  onUpdateGuest,
  onDeleteGuest,
  onDeleteGuestbookEntry,
  onShowToast,
}: GuestsTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGroup, setFilterGroup] = useState<string>('all');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formGroup, setFormGroup] = useState<GuestGroup>('Sahabat');
  const [formCount, setFormCount] = useState(1);
  const [formError, setFormError] = useState('');

  const openAddModal = () => {
    setEditingGuest(null);
    setFormName('');
    setFormPhone('');
    setFormEmail('');
    setFormGroup('Sahabat');
    setFormCount(1);
    setFormError('');
    setIsAddModalOpen(true);
  };

  const openEditModal = (guest: Guest) => {
    setEditingGuest(guest);
    setFormName(guest.name);
    setFormPhone(guest.phone || '');
    setFormEmail(guest.email || '');
    setFormGroup(guest.group);
    setFormCount(guest.guestCount);
    setFormError('');
    setIsAddModalOpen(true);
  };

  const handleSaveGuest = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const validation = guestSchema.safeParse({
      name: formName,
      phone: formPhone,
      email: formEmail,
      group: formGroup,
      guestCount: Number(formCount),
    });

    if (!validation.success) {
      setFormError(validation.error.errors[0]?.message || 'Input tidak valid');
      return;
    }

    if (editingGuest) {
      onUpdateGuest({
        ...editingGuest,
        name: formName,
        phone: formPhone,
        email: formEmail,
        group: formGroup,
        guestCount: Number(formCount),
      });
      onShowToast('Data tamu berhasil diperbarui!', 'success');
    } else {
      onAddGuest({
        name: formName,
        phone: formPhone,
        email: formEmail,
        group: formGroup,
        guestCount: Number(formCount),
      });
      onShowToast('Tamu baru berhasil ditambahkan!', 'success');
    }

    setIsAddModalOpen(false);
  };

  const handleCopyLink = (token: string) => {
    const fullUrl = `${window.location.origin}/?wedding=${wedding.slug}&to=${token}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedToken(token);
    onShowToast('Tautan undangan personal berhasil disalin!', 'info');
    setTimeout(() => setCopiedToken(null), 2500);
  };

  const handleShareWhatsApp = (guest: Guest) => {
    const fullUrl = `${window.location.origin}/?wedding=${wedding.slug}&to=${guest.invitationToken}`;
    const coupleName = `${wedding.groomName.split(' ')[0]} & ${wedding.brideName.split(' ')[0]}`;
    const waUrl = generateWhatsAppInvitation(coupleName, guest.name, fullUrl);
    window.open(waUrl, '_blank');
  };

  // Filter logic
  const filteredGuests = guests.filter((g) => {
    const matchesSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGroup = filterGroup === 'all' || g.group === filterGroup;
    return matchesSearch && matchesGroup;
  });

  const attendingCount = rsvps
    .filter((r) => r.attendance === 'attending')
    .reduce((acc, curr) => acc + curr.guestCount, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* RSVP Quick Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-100 text-[#263238] flex items-center justify-center flex-shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-[#667085] font-medium">Total Tamu</p>
            <p className="text-xl font-bold text-[#263238]">{guests.length}</p>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#B9DCA9]/30 text-[#3D6420] flex items-center justify-center flex-shrink-0 border border-[#B9DCA9]/40">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-[#667085] font-medium">Konfirmasi Hadir</p>
            <p className="text-xl font-bold text-[#3D6420]">{attendingCount} Orang</p>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FCBACB]/30 text-[#7D4050] flex items-center justify-center flex-shrink-0 border border-[#FCBACB]/50">
            <UserX className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-[#667085] font-medium">Berhalangan</p>
            <p className="text-xl font-bold text-[#7D4050]">
              {rsvps.filter((r) => r.attendance === 'declined').length} Tamu
            </p>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FFEAAB]/40 text-[#7A5D00] flex items-center justify-center flex-shrink-0 border border-[#FFEAAB]/60">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-[#667085] font-medium">Belum Konfirmasi</p>
            <p className="text-xl font-bold text-[#7A5D00]">
              {guests.filter((g) => g.rsvpStatus === 'pending').length} Tamu
            </p>
          </div>
        </Card>
      </div>

      {/* Guest Directory Toolbar */}
      <Card className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-[#263238]">Daftar Tamu Undangan</h3>
            <p className="text-xs text-neutral-500">
              Kelola daftar tamu, buat tautan undangan personal yang aman, dan pantau status RSVP.
            </p>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={openAddModal}
            icon={<UserPlus className="w-4 h-4 text-white" />}
          >
            Tambah Tamu
          </Button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <div className="w-full sm:flex-1">
            <Input
              placeholder="Cari nama tamu..."
              leftIcon={<Search className="w-4 h-4" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="w-full sm:w-48">
            <select
              value={filterGroup}
              onChange={(e) => setFilterGroup(e.target.value)}
              className="w-full bg-white border border-neutral-200 text-xs font-medium rounded-md px-3 py-2.5 text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
            >
              <option value="all">Semua Kategori</option>
              <option value="Keluarga">Keluarga</option>
              <option value="Sahabat">Sahabat</option>
              <option value="Rekan Kerja">Rekan Kerja</option>
              <option value="VIP">VIP</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-neutral-100 rounded-lg">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 text-neutral-500 font-semibold border-b border-neutral-100">
              <tr>
                <th className="py-3 px-4">Nama Tamu</th>
                <th className="py-3 px-4">Grup / Kategori</th>
                <th className="py-3 px-4">Kehadiran (RSVP)</th>
                <th className="py-3 px-4">Token & Link</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700">
              {filteredGuests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-neutral-400">
                    Tidak ditemukan data tamu yang sesuai.
                  </td>
                </tr>
              ) : (
                filteredGuests.map((guest) => (
                  <tr key={guest.id} className="hover:bg-[#FCFCFC] transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#263238]">
                      <div>{guest.name}</div>
                      {guest.phone && <div className="text-[10px] text-neutral-400 font-normal">{guest.phone}</div>}
                    </td>

                    <td className="py-3.5 px-4">
                      <Badge variant="primary" size="sm">
                        {guest.group}
                      </Badge>
                    </td>

                    <td className="py-3.5 px-4">
                      {guest.rsvpStatus === 'attending' ? (
                        <Badge variant="success" size="sm">
                          Hadir ({guest.guestCount} pax)
                        </Badge>
                      ) : guest.rsvpStatus === 'declined' ? (
                        <Badge variant="error" size="sm">
                          Tidak Hadir
                        </Badge>
                      ) : (
                        <Badge variant="warning" size="sm">
                          Menunggu
                        </Badge>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <span className="bg-neutral-100 px-2 py-0.5 rounded text-neutral-600">
                          {guest.invitationToken}
                        </span>
                        <button
                          onClick={() => handleCopyLink(guest.invitationToken)}
                          title="Salin Link Khusus Tamu Ini"
                          className="p-1 hover:text-neutral-900 text-neutral-400 transition-colors"
                        >
                          {copiedToken === guest.invitationToken ? (
                            <Check className="w-3.5 h-3.5 text-[#74A12E]" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleShareWhatsApp(guest)}
                          title="Kirim Pesan WhatsApp"
                          className="p-1.5 rounded text-[#74A12E] hover:bg-[#EBF7E5] transition-colors"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => openEditModal(guest)}
                          title="Ubah Data"
                          className="p-1.5 rounded text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteGuest(guest.id)}
                          title="Hapus Tamu"
                          className="p-1.5 rounded text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Guestbook Wishes Moderation Card */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-slate-700" />
              Moderasi Buku Tamu & Doa Restu
            </h3>
            <p className="text-xs text-neutral-500">
              Lihat atau hapus pesan ucapan yang masuk dari undangan publik.
            </p>
          </div>
          <span className="text-xs font-semibold text-neutral-500">
            Total {guestbook.length} Pesan
          </span>
        </div>

        <div className="divide-y divide-neutral-100 border border-neutral-100 rounded-lg max-h-80 overflow-y-auto">
          {guestbook.length === 0 ? (
            <div className="p-6 text-center text-neutral-400 text-xs">
              Belum ada pesan doa dari tamu.
            </div>
          ) : (
            guestbook.map((entry) => (
              <div key={entry.id} className="p-4 flex items-start justify-between gap-4 bg-white hover:bg-neutral-50">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-[#263238]">{entry.guestName}</span>
                    <span className="text-[10px] text-neutral-400">
                      {new Date(entry.createdAt).toLocaleString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 font-light leading-relaxed">
                    "{entry.message}"
                  </p>
                </div>
                <button
                  onClick={() => onDeleteGuestbookEntry(entry.id)}
                  title="Hapus Pesan"
                  className="p-1 text-neutral-400 hover:text-rose-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Add / Edit Guest Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={editingGuest ? 'Ubah Data Tamu' : 'Tambah Tamu Baru'}
        description="Data tamu akan digunakan untuk membuat link undangan terpersonalisasi."
      >
        <form onSubmit={handleSaveGuest} className="space-y-4">
          {formError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
              {formError}
            </div>
          )}

          <Input
            label="Nama Lengkap / Pasangan"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            placeholder="Contoh: Bpk. Bambang Wijaya & Istri"
            required
          />

          <Input
            label="Nomor WhatsApp (Opsional)"
            value={formPhone}
            onChange={(e) => setFormPhone(e.target.value)}
            placeholder="Contoh: 081234567890"
          />

          <Input
            label="Email (Opsional)"
            type="email"
            value={formEmail}
            onChange={(e) => setFormEmail(e.target.value)}
            placeholder="Contoh: nama@domain.com"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Kategori Tamu
              </label>
              <select
                value={formGroup}
                onChange={(e) => setFormGroup(e.target.value as GuestGroup)}
                className="w-full bg-white border border-neutral-200 text-xs font-medium rounded-md px-3 py-2.5 text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
              >
                <option value="Keluarga">Keluarga</option>
                <option value="Sahabat">Sahabat</option>
                <option value="Rekan Kerja">Rekan Kerja</option>
                <option value="VIP">VIP</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Jumlah Pax (Slot Tamu)
              </label>
              <select
                value={formCount}
                onChange={(e) => setFormCount(Number(e.target.value))}
                className="w-full bg-white border border-neutral-200 text-xs font-medium rounded-md px-3 py-2.5 text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
              >
                <option value={1}>1 Orang</option>
                <option value={2}>2 Orang</option>
                <option value={3}>3 Orang</option>
                <option value={4}>4 Orang</option>
                <option value={5}>5 Orang</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-neutral-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsAddModalOpen(false)}
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
            >
              {editingGuest ? 'Perbarui Tamu' : 'Simpan Tamu'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
