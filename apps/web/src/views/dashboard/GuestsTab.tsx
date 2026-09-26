import React, { useState, useMemo } from 'react';
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
  Smartphone,
  Mail,
  Heart,
  X,
  User,
  Sparkles,
  Layers,
  Info,
} from 'lucide-react';
import { Wedding } from '@/types/wedding';
import { Guest, GuestGroup, GuestSide, InvitationType, RSVP, GuestbookEntry } from '@/types/guest';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSide, setFilterSide] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterGroup, setFilterGroup] = useState<string>('all');
  const [filterRsvp, setFilterRsvp] = useState<string>('all');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  // Blast Assistant State
  const [isBlastModalOpen, setIsBlastModalOpen] = useState(false);
  const [blastSideFilter, setBlastSideFilter] = useState<string>('all');
  const [blastTypeFilter, setBlastTypeFilter] = useState<string>('all');
  const [sentBlastIds, setSentBlastIds] = useState<Set<string>>(new Set());

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formGroup, setFormGroup] = useState<GuestGroup>('Sahabat');
  const [formSide, setFormSide] = useState<GuestSide>('groom');
  const [formType, setFormType] = useState<InvitationType>('digital');
  const [formCount, setFormCount] = useState(1);
  const [formError, setFormError] = useState('');

  const openAddModal = () => {
    setEditingGuest(null);
    setFormName('');
    setFormPhone('');
    setFormEmail('');
    setFormGroup('Sahabat');
    setFormSide('groom');
    setFormType('digital');
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
    setFormSide(guest.guestSide || 'groom');
    setFormType(guest.invitationType || 'digital');
    setFormCount(guest.guestCount || 1);
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
      guestSide: formSide,
      invitationType: formType,
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
        guestSide: formSide,
        invitationType: formType,
        guestCount: Number(formCount),
      });
      onShowToast('Data tamu berhasil diperbarui!', 'success');
    } else {
      onAddGuest({
        name: formName,
        phone: formPhone,
        email: formEmail,
        group: formGroup,
        guestSide: formSide,
        invitationType: formType,
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
    const waUrl = generateWhatsAppInvitation(coupleName, guest.name, fullUrl, guest.phone);
    window.open(waUrl, '_blank');
  };

  // Filter logic
  const filteredGuests = useMemo(() => {
    return guests.filter((g) => {
      const matchesSearch =
        g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (g.phone && g.phone.includes(searchQuery));
      const matchesSide = filterSide === 'all' || (g.guestSide || 'groom') === filterSide;
      const matchesType = filterType === 'all' || (g.invitationType || 'digital') === filterType;
      const matchesGroup = filterGroup === 'all' || g.group === filterGroup;
      const matchesRsvp = filterRsvp === 'all' || g.rsvpStatus === filterRsvp;

      return matchesSearch && matchesSide && matchesType && matchesGroup && matchesRsvp;
    });
  }, [guests, searchQuery, filterSide, filterType, filterGroup, filterRsvp]);

  // Summary Metrics calculations
  const totalGuestsCount = guests.length;
  const totalPaxSlots = guests.reduce((acc, curr) => acc + (curr.guestCount || 1), 0);

  const groomSideCount = guests.filter((g) => (g.guestSide || 'groom') === 'groom').length;
  const brideSideCount = guests.filter((g) => g.guestSide === 'bride').length;
  const bothSideCount = guests.filter((g) => g.guestSide === 'both').length;

  const groomPaxCount = guests
    .filter((g) => (g.guestSide || 'groom') === 'groom')
    .reduce((acc, curr) => acc + (curr.guestCount || 1), 0);
  const bridePaxCount = guests
    .filter((g) => g.guestSide === 'bride')
    .reduce((acc, curr) => acc + (curr.guestCount || 1), 0);
  const bothPaxCount = guests
    .filter((g) => g.guestSide === 'both')
    .reduce((acc, curr) => acc + (curr.guestCount || 1), 0);

  const digitalTypeCount = guests.filter((g) => (g.invitationType || 'digital') === 'digital').length;
  const physicalTypeCount = guests.filter((g) => g.invitationType === 'physical').length;
  const bothTypeCount = guests.filter((g) => g.invitationType === 'both').length;

  const keluargaCount = guests.filter((g) => g.group === 'Keluarga').length;
  const sahabatCount = guests.filter((g) => g.group === 'Sahabat').length;
  const vipCount = guests.filter((g) => g.group === 'VIP').length;
  const rekanCount = guests.filter((g) => g.group === 'Rekan Kerja').length;
  const lainnyaCount = guests.filter((g) => g.group === 'Lainnya').length;

  const attendingCount = rsvps
    .filter((r) => r.attendance === 'attending')
    .reduce((acc, curr) => acc + (curr.guestCount || 1), 0);
  const attendingGuestsCount = rsvps.filter((r) => r.attendance === 'attending').length;
  const declinedCount = rsvps.filter((r) => r.attendance === 'declined').length;
  const pendingCount = guests.filter((g) => g.rsvpStatus === 'pending').length;

  const attendingPercentage = Math.round((attendingCount / Math.max(totalPaxSlots, 1)) * 100);
  const digitalPercentage = Math.round((digitalTypeCount / Math.max(totalGuestsCount, 1)) * 100);
  const physicalPercentage = Math.round((physicalTypeCount / Math.max(totalGuestsCount, 1)) * 100);

  const groomPercentage = Math.round((groomSideCount / Math.max(totalGuestsCount, 1)) * 100);
  const bridePercentage = Math.round((brideSideCount / Math.max(totalGuestsCount, 1)) * 100);
  const bothPercentage = Math.max(0, 100 - groomPercentage - bridePercentage);

  const getGroupBadgeClass = (group: GuestGroup) => {
    switch (group) {
      case 'Keluarga':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Sahabat':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Rekan Kerja':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'VIP':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      default:
        return 'bg-zinc-100 text-zinc-700 border-zinc-200';
    }
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    filterSide !== 'all' ||
    filterType !== 'all' ||
    filterGroup !== 'all' ||
    filterRsvp !== 'all';

  const resetFilters = () => {
    setSearchQuery('');
    setFilterSide('all');
    setFilterType('all');
    setFilterGroup('all');
    setFilterRsvp('all');
  };

  // Blast filtered list
  const blastFilteredGuests = useMemo(() => {
    return guests.filter((g) => {
      if (!g.phone) return false;
      const matchesSide = blastSideFilter === 'all' || (g.guestSide || 'groom') === blastSideFilter;
      const matchesType = blastTypeFilter === 'all' || (g.invitationType || 'digital') === blastTypeFilter;
      return matchesSide && matchesType;
    });
  }, [guests, blastSideFilter, blastTypeFilter]);

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* ── Summary & Quick Metric Cards (Minimal, Common Info Only + Simple Hover) ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
        {/* Card 1: Total Undangan */}
        <div className="relative group h-full">
          <Card className="p-5 bg-white border border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)] h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2 min-h-[24px]">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Total Undangan
                </span>
                <Users className="w-4 h-4 text-slate-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tracking-tight text-slate-900">
                  {totalGuestsCount}
                </span>
                <span className="text-sm font-medium text-slate-500">Undangan</span>
              </div>
            </div>
          </Card>

          {/* Simple Hover Popup */}
          <div className="absolute left-0 right-0 top-full pt-1.5 z-30 opacity-0 invisible -translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-150 ease-out pointer-events-none group-hover:pointer-events-auto">
            <div className="bg-white border border-slate-200 shadow-md rounded-xl p-3 text-xs space-y-1.5">
              <div className="flex items-center justify-between text-slate-600">
                <span>Undangan Digital</span>
                <span className="font-semibold text-slate-800">{digitalTypeCount}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Undangan Fisik</span>
                <span className="font-semibold text-slate-800">{physicalTypeCount}</span>
              </div>
              {bothTypeCount > 0 && (
                <div className="flex items-center justify-between text-slate-600">
                  <span>Format Ganda</span>
                  <span className="font-semibold text-slate-800">{bothTypeCount}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Card 2: Kehadiran (RSVP) */}
        <div className="relative group h-full">
          <Card className="p-5 bg-white border border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)] h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2 min-h-[24px]">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Kehadiran
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80">
                  {attendingPercentage}%
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tracking-tight text-emerald-800">
                  {attendingCount}
                </span>
                <span className="text-sm font-medium text-emerald-700">Pax Hadir</span>
              </div>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-3">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(attendingPercentage, 100)}%` }}
              />
            </div>
          </Card>

          {/* Simple Hover Popup */}
          <div className="absolute left-0 right-0 top-full pt-1.5 z-30 opacity-0 invisible -translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-150 ease-out pointer-events-none group-hover:pointer-events-auto">
            <div className="bg-white border border-slate-200 shadow-md rounded-xl p-3 text-xs space-y-1.5">
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Hadir
                </span>
                <span className="font-semibold text-emerald-700">{attendingCount} Pax ({attendingGuestsCount} Undangan)</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  Berhalangan
                </span>
                <span className="font-semibold text-slate-800">{declinedCount}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  Belum Konfirmasi
                </span>
                <span className="font-semibold text-slate-800">{pendingCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Perbandingan Tamu (Laki-laki & Perempuan) */}
        <div className="relative group h-full">
          <Card className="p-5 bg-white border border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)] h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2 min-h-[24px]">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Perbandingan Tamu
                </span>
                <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
                  {groomPercentage}% : {bridePercentage}%
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight text-slate-800">
                  {groomSideCount} <span className="text-xs font-normal text-slate-500">Laki-laki</span>
                </span>
                <span className="text-slate-300 font-light">·</span>
                <span className="text-2xl font-bold tracking-tight text-rose-700">
                  {brideSideCount} <span className="text-xs font-normal text-rose-600">Perempuan</span>
                </span>
              </div>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-3 flex">
              <div
                className="bg-slate-700 h-full transition-all duration-500"
                style={{ width: `${groomPercentage}%` }}
              />
              <div
                className="bg-rose-500 h-full transition-all duration-500"
                style={{ width: `${bridePercentage}%` }}
              />
              {bothPercentage > 0 && (
                <div
                  className="bg-purple-400 h-full transition-all duration-500"
                  style={{ width: `${bothPercentage}%` }}
                />
              )}
            </div>
          </Card>

          {/* Simple Hover Popup */}
          <div className="absolute left-0 right-0 top-full pt-1.5 z-30 opacity-0 invisible -translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-150 ease-out pointer-events-none group-hover:pointer-events-auto">
            <div className="bg-white border border-slate-200 shadow-md rounded-xl p-3 text-xs space-y-1.5">
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-700" />
                  Mempelai Laki-laki
                </span>
                <span className="font-semibold text-slate-800">{groomSideCount} ({groomPercentage}%)</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  Mempelai Perempuan
                </span>
                <span className="font-semibold text-rose-700">{brideSideCount} ({bridePercentage}%)</span>
              </div>
              {bothSideCount > 0 && (
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400" />
                    Kedua Pihak
                  </span>
                  <span className="font-semibold text-purple-700">{bothSideCount}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Guest Directory Card ────────────────────────────────────────────── */}
      <Card className="p-6 space-y-5">
        {/* Header & Main Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Buku Tamu & Undangan</h3>
            <p className="text-xs text-slate-500">
              Kategorikan tamu berdasarkan pihak mempelai, format fisik/digital, serta kelola RSVP dan broadcast WhatsApp.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsBlastModalOpen(true)}
              icon={<MessageSquare className="w-4 h-4 text-emerald-600" />}
              className="text-emerald-700 border-emerald-200 hover:bg-emerald-50"
            >
              Asisten Blast WA
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={openAddModal}
              icon={<UserPlus className="w-4 h-4" />}
            >
              Tambah Tamu
            </Button>
          </div>
        </div>

        {/* Category Quick Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 scrollbar-none">
          <button
            type="button"
            onClick={() => setFilterGroup('all')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 flex-shrink-0 ${
              filterGroup === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>Semua</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                filterGroup === 'all' ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-600'
              }`}
            >
              {guests.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setFilterGroup(filterGroup === 'Keluarga' ? 'all' : 'Keluarga')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 flex-shrink-0 border ${
              filterGroup === 'Keluarga'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : 'bg-indigo-50/70 text-indigo-700 border-indigo-200/80 hover:bg-indigo-100/70'
            }`}
          >
            <span>Keluarga</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                filterGroup === 'Keluarga' ? 'bg-indigo-700 text-white' : 'bg-indigo-100 text-indigo-700'
              }`}
            >
              {keluargaCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setFilterGroup(filterGroup === 'Sahabat' ? 'all' : 'Sahabat')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 flex-shrink-0 border ${
              filterGroup === 'Sahabat'
                ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                : 'bg-sky-50/70 text-sky-700 border-sky-200/80 hover:bg-sky-100/70'
            }`}
          >
            <span>Sahabat</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                filterGroup === 'Sahabat' ? 'bg-sky-700 text-white' : 'bg-sky-100 text-sky-700'
              }`}
            >
              {sahabatCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setFilterGroup(filterGroup === 'Rekan Kerja' ? 'all' : 'Rekan Kerja')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 flex-shrink-0 border ${
              filterGroup === 'Rekan Kerja'
                ? 'bg-slate-700 text-white border-slate-700 shadow-xs'
                : 'bg-slate-100 text-slate-700 border-slate-200/80 hover:bg-slate-200/70'
            }`}
          >
            <span>Rekan Kerja</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                filterGroup === 'Rekan Kerja' ? 'bg-slate-800 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {rekanCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setFilterGroup(filterGroup === 'VIP' ? 'all' : 'VIP')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 flex-shrink-0 border ${
              filterGroup === 'VIP'
                ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                : 'bg-amber-50/70 text-amber-800 border-amber-200/80 hover:bg-amber-100/70'
            }`}
          >
            <span>VIP</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                filterGroup === 'VIP' ? 'bg-amber-700 text-white' : 'bg-amber-100 text-amber-800'
              }`}
            >
              {vipCount}
            </span>
          </button>

          {lainnyaCount > 0 && (
            <button
              type="button"
              onClick={() => setFilterGroup(filterGroup === 'Lainnya' ? 'all' : 'Lainnya')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 flex-shrink-0 border ${
                filterGroup === 'Lainnya'
                  ? 'bg-zinc-700 text-white border-zinc-700 shadow-xs'
                  : 'bg-zinc-100 text-zinc-700 border-zinc-200/80 hover:bg-zinc-200/70'
              }`}
            >
              <span>Lainnya</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                  filterGroup === 'Lainnya' ? 'bg-zinc-800 text-white' : 'bg-zinc-200 text-zinc-700'
                }`}
              >
                {lainnyaCount}
              </span>
            </button>
          )}
        </div>

        {/* Filter Controls Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 pt-1">
          {/* Search */}
          <div className="lg:col-span-4">
            <Input
              placeholder="Cari nama atau no. telepon..."
              leftIcon={<Search className="w-4 h-4 text-slate-400" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Pihak Mempelai */}
          <div className="lg:col-span-2">
            <Select value={filterSide} onValueChange={setFilterSide}>
              <SelectTrigger className="w-full bg-white text-xs h-10 border-neutral-200">
                <SelectValue placeholder="Pihak Mempelai" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Pihak</SelectItem>
                <SelectItem value="groom">Mempelai Pria</SelectItem>
                <SelectItem value="bride">Mempelai Wanita</SelectItem>
                <SelectItem value="both">Kedua Mempelai</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filter Tipe Undangan */}
          <div className="lg:col-span-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full bg-white text-xs h-10 border-neutral-200">
                <SelectValue placeholder="Format Undangan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Format</SelectItem>
                <SelectItem value="digital">Undangan Digital</SelectItem>
                <SelectItem value="physical">Undangan Fisik</SelectItem>
                <SelectItem value="both">Digital & Fisik</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filter Kategori / Grup */}
          <div className="lg:col-span-2">
            <Select value={filterGroup} onValueChange={setFilterGroup}>
              <SelectTrigger className="w-full bg-white text-xs h-10 border-neutral-200">
                <SelectValue placeholder="Grup Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Grup</SelectItem>
                <SelectItem value="Keluarga">Keluarga</SelectItem>
                <SelectItem value="Sahabat">Sahabat</SelectItem>
                <SelectItem value="Rekan Kerja">Rekan Kerja</SelectItem>
                <SelectItem value="VIP">VIP</SelectItem>
                <SelectItem value="Lainnya">Lainnya</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filter RSVP Status */}
          <div className="lg:col-span-2">
            <Select value={filterRsvp} onValueChange={setFilterRsvp}>
              <SelectTrigger className="w-full bg-white text-xs h-10 border-neutral-200">
                <SelectValue placeholder="Status RSVP" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="attending">Hadir</SelectItem>
                <SelectItem value="declined">Tidak Hadir</SelectItem>
                <SelectItem value="pending">Menunggu</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filter Indicator / Reset */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between bg-slate-50 px-3 py-2 rounded-lg border border-slate-200/80 text-xs">
            <span className="text-slate-600">
              Menampilkan <strong>{filteredGuests.length}</strong> dari {guests.length} tamu (difilter)
            </span>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-slate-500 hover:text-rose-600 font-medium transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Reset Filter
            </button>
          </div>
        )}

        {/* Table List */}
        <div className="overflow-x-auto border border-neutral-200/80 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50/80 text-slate-600 font-semibold border-b border-neutral-200/80">
              <tr>
                <th className="py-3 px-4">Nama Tamu & Kontak</th>
                <th className="py-3 px-4">Pihak Mempelai</th>
                <th className="py-3 px-4">Format Undangan</th>
                <th className="py-3 px-4">Grup / Kategori</th>
                <th className="py-3 px-4">Status RSVP</th>
                <th className="py-3 px-4">Token Undangan</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-slate-700">
              {filteredGuests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <Users className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="text-sm font-medium text-slate-600">Tidak ada tamu yang sesuai dengan filter.</p>
                    <p className="text-xs text-slate-400 mt-0.5">Coba ubah kata kunci pencarian atau reset filter.</p>
                  </td>
                </tr>
              ) : (
                filteredGuests.map((guest) => {
                  const side = guest.guestSide || 'groom';
                  const invType = guest.invitationType || 'digital';

                  return (
                    <tr key={guest.id} className="hover:bg-[#FCFCFC] transition-colors">
                      {/* Nama & Kontak */}
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        <div className="flex items-center gap-2">
                          <span>{guest.name}</span>
                          {guest.guestCount > 1 && (
                            <span className="text-[10px] font-normal text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                              {guest.guestCount} pax
                            </span>
                          )}
                        </div>
                        {guest.phone && (
                          <div className="text-[11px] text-slate-400 font-normal font-mono mt-0.5">
                            {guest.phone}
                          </div>
                        )}
                      </td>

                      {/* Pihak Mempelai */}
                      <td className="py-3.5 px-4">
                        {side === 'groom' ? (
                          <span className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                            Pria
                          </span>
                        ) : side === 'bride' ? (
                          <span className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
                            Wanita
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200">
                            Kedua Pihak
                          </span>
                        )}
                      </td>

                      {/* Tipe Undangan */}
                      <td className="py-3.5 px-4">
                        {invType === 'digital' ? (
                          <span className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Digital
                          </span>
                        ) : invType === 'physical' ? (
                          <span className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                            Fisik
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200">
                            Digital & Fisik
                          </span>
                        )}
                      </td>

                      {/* Grup / Kategori (Bebas Pink - Menggunakan Warna Khusus per Kategori) */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-md border ${getGroupBadgeClass(
                            guest.group
                          )}`}
                        >
                          {guest.group}
                        </span>
                      </td>

                      {/* Status RSVP */}
                      <td className="py-3.5 px-4">
                        {guest.rsvpStatus === 'attending' ? (
                          <span className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Hadir ({guest.guestCount} pax)
                          </span>
                        ) : guest.rsvpStatus === 'declined' ? (
                          <span className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-md bg-red-50 text-red-700 border border-red-200">
                            Tidak Hadir
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                            Menunggu
                          </span>
                        )}
                      </td>

                      {/* Token & Copy Link */}
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

                      {/* Actions */}
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
                            title="Ubah Data Tamu"
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
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ── Guestbook Wishes Moderation Card ────────────────────────────────── */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-slate-700" />
              Moderasi Buku Tamu & Doa Restu
            </h3>
            <p className="text-xs text-slate-500">
              Lihat ucapan dan doa yang dikirimkan oleh tamu undangan melalui tautan digital.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
            Total {guestbook.length} Pesan
          </span>
        </div>

        <div className="divide-y divide-neutral-100 border border-neutral-200/80 rounded-xl max-h-80 overflow-y-auto">
          {guestbook.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              Belum ada pesan doa dari tamu.
            </div>
          ) : (
            guestbook.map((entry) => (
              <div key={entry.id} className="p-4 flex items-start justify-between gap-4 bg-white hover:bg-neutral-50 transition-colors">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-900">{entry.guestName}</span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(entry.createdAt).toLocaleString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    "{entry.message}"
                  </p>
                </div>
                <button
                  onClick={() => onDeleteGuestbookEntry(entry.id)}
                  title="Hapus Pesan"
                  className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* ── Add / Edit Guest Modal ──────────────────────────────────────────── */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={editingGuest ? 'Ubah Data Tamu' : 'Tambah Tamu Baru'}
        description="Lengkapi kategori pihak mempelai dan format undangan untuk pengelolaan buku tamu yang rapi."
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Pihak Mempelai */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600">
                Pihak Mempelai
              </label>
              <Select value={formSide} onValueChange={(val) => setFormSide(val as GuestSide)}>
                <SelectTrigger className="w-full bg-white border-neutral-200">
                  <SelectValue placeholder="Pilih Pihak" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="groom">Mempelai Pria</SelectItem>
                  <SelectItem value="bride">Mempelai Wanita</SelectItem>
                  <SelectItem value="both">Kedua Mempelai</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tipe Undangan */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600">
                Format Undangan
              </label>
              <Select value={formType} onValueChange={(val) => setFormType(val as InvitationType)}>
                <SelectTrigger className="w-full bg-white border-neutral-200">
                  <SelectValue placeholder="Pilih Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="digital">Undangan Digital</SelectItem>
                  <SelectItem value="physical">Undangan Fisik (Cetak)</SelectItem>
                  <SelectItem value="both">Digital & Fisik</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Kategori Grup */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600">
                Kategori Grup
              </label>
              <Select value={formGroup} onValueChange={(val) => setFormGroup(val as GuestGroup)}>
                <SelectTrigger className="w-full bg-white border-neutral-200">
                  <SelectValue placeholder="Pilih Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Keluarga">Keluarga</SelectItem>
                  <SelectItem value="Sahabat">Sahabat</SelectItem>
                  <SelectItem value="Rekan Kerja">Rekan Kerja</SelectItem>
                  <SelectItem value="VIP">VIP</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Jumlah Pax */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600">
                Jumlah Pax (Slot Tamu)
              </label>
              <Select value={String(formCount)} onValueChange={(val) => setFormCount(Number(val))}>
                <SelectTrigger className="w-full bg-white border-neutral-200">
                  <SelectValue placeholder="Pilih Pax" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Orang</SelectItem>
                  <SelectItem value="2">2 Orang</SelectItem>
                  <SelectItem value="3">3 Orang</SelectItem>
                  <SelectItem value="4">4 Orang</SelectItem>
                  <SelectItem value="5">5 Orang</SelectItem>
                </SelectContent>
              </Select>
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

      {/* ── WA Blast Assistant Modal ────────────────────────────────────────── */}
      <Modal
        isOpen={isBlastModalOpen}
        onClose={() => setIsBlastModalOpen(false)}
        title="Asisten Blast WhatsApp"
        description="Kirim undangan personal dengan cepat melalui WhatsApp Web tanpa khawatir terblokir."
      >
        <div className="space-y-4">
          {/* Blast Filter Options */}
          <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-600">Target Pihak:</label>
              <Select value={blastSideFilter} onValueChange={setBlastSideFilter}>
                <SelectTrigger className="w-full bg-white h-8 text-xs border-neutral-200">
                  <SelectValue placeholder="Semua Pihak" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Pihak</SelectItem>
                  <SelectItem value="groom">Mempelai Pria</SelectItem>
                  <SelectItem value="bride">Mempelai Wanita</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-600">Format Undangan:</label>
              <Select value={blastTypeFilter} onValueChange={setBlastTypeFilter}>
                <SelectTrigger className="w-full bg-white h-8 text-xs border-neutral-200">
                  <SelectValue placeholder="Semua Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Format</SelectItem>
                  <SelectItem value="digital">Undangan Digital</SelectItem>
                  <SelectItem value="physical">Undangan Fisik</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Blast Recipient List */}
          <div className="max-h-80 overflow-y-auto pr-1 space-y-2">
            {blastFilteredGuests.length === 0 ? (
              <div className="text-center text-xs text-slate-500 py-6">
                Tidak ada kontak tamu yang cocok dengan filter atau belum memiliki nomor WhatsApp.
              </div>
            ) : (
              blastFilteredGuests.map((guest) => {
                const isSent = sentBlastIds.has(guest.id);
                const side = guest.guestSide || 'groom';

                return (
                  <div
                    key={guest.id}
                    className={`flex items-center justify-between p-3 rounded-xl border ${
                      isSent ? 'bg-emerald-50/60 border-emerald-200' : 'bg-white border-neutral-200/80'
                    } transition-colors`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <p className={`text-xs font-semibold ${isSent ? 'text-emerald-800' : 'text-slate-900'}`}>
                          {guest.name}
                        </p>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                          side === 'groom' ? 'bg-slate-100 text-slate-700' : 'bg-rose-50 text-rose-700'
                        }`}>
                          {side === 'groom' ? 'Pria' : 'Wanita'}
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium border ${getGroupBadgeClass(guest.group)}`}>
                          {guest.group}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">{guest.phone}</p>
                    </div>

                    <Button
                      variant={isSent ? 'outline' : 'primary'}
                      size="sm"
                      onClick={() => {
                        handleShareWhatsApp(guest);
                        setSentBlastIds((prev) => new Set(prev).add(guest.id));
                      }}
                      className={
                        isSent
                          ? 'text-emerald-700 border-emerald-300 hover:bg-emerald-100/50'
                          : 'bg-[#25D366] hover:bg-[#1ebd5b] text-white border-transparent'
                      }
                      icon={isSent ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                    >
                      {isSent ? 'Terkirim' : 'Kirim WA'}
                    </Button>
                  </div>
                );
              })
            )}
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
            <span className="text-xs text-slate-500">
              Terkirim: <strong>{sentBlastIds.size}</strong> dari {blastFilteredGuests.length} kontak
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsBlastModalOpen(false)}
            >
              Selesai
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
