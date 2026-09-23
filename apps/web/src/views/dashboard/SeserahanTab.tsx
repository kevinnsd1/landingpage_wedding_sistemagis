import React, { useState } from 'react';
import {
  Gift,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  ShoppingBag,
  Trash2,
  Edit2,
  Box,
  LayoutGrid,
  List,
  ChevronRight,
  Store,
  FileText,
  DollarSign,
  Heart,
} from 'lucide-react';
import { Wedding } from '@/types/wedding';
import { SeserahanItem, SeserahanRecipient, SeserahanStatus } from '@/types/seserahan';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { formatCurrency } from '@/lib/utils';

export interface SeserahanTabProps {
  wedding: Wedding;
  items: SeserahanItem[];
  onAddItem: (item: Omit<SeserahanItem, 'id' | 'weddingId' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateItem: (item: SeserahanItem) => void;
  onDeleteItem: (id: string) => void;
  onShowToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

export function SeserahanTab({
  wedding,
  items,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
  onShowToast,
}: SeserahanTabProps) {
  // Navigation / Filter states
  const [recipient, setRecipient] = useState<SeserahanRecipient>('groom_to_bride');
  const [viewMode, setViewMode] = useState<'boxes' | 'list'>('boxes');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | SeserahanStatus>('all');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SeserahanItem | null>(null);

  // Form states
  const [boxNumber, setBoxNumber] = useState<number>(1);
  const [boxName, setBoxName] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Mahar & Perhiasan');
  const [estimatedCost, setEstimatedCost] = useState('');
  const [actualCost, setActualCost] = useState('');
  const [status, setStatus] = useState<SeserahanStatus>('planned');
  const [vendor, setVendor] = useState('');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');

  // Filter items by active recipient
  const recipientItems = items.filter((item) => item.recipient === recipient);

  // Filter items by search & status
  const filteredItems = recipientItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.boxName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.vendor && item.vendor.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Group filtered items by boxNumber
  const groupedBoxes = recipientItems.reduce((acc, item) => {
    if (!acc[item.boxNumber]) {
      acc[item.boxNumber] = {
        boxNumber: item.boxNumber,
        boxName: item.boxName,
        items: [],
      };
    }
    acc[item.boxNumber].items.push(item);
    return acc;
  }, {} as Record<number, { boxNumber: number; boxName: string; items: SeserahanItem[] }>);

  const boxList = Object.values(groupedBoxes).sort((a, b) => a.boxNumber - b.boxNumber);

  // Overall Statistics for current recipient
  const totalBoxes = boxList.length;
  const totalItems = recipientItems.length;
  const readyItemsCount = recipientItems.filter((i) => i.status === 'ready').length;
  const progressPercent = totalItems > 0 ? Math.round((readyItemsCount / totalItems) * 100) : 0;
  const totalEstimated = recipientItems.reduce((acc, i) => acc + (i.estimatedCost || 0), 0);
  const totalActual = recipientItems.reduce((acc, i) => acc + (i.actualCost || 0), 0);

  const statusLabels: Record<SeserahanStatus, { label: string; badge: 'neutral' | 'warning' | 'primary' | 'success' }> = {
    planned: { label: 'Rencana', badge: 'neutral' },
    purchased: { label: 'Sudah Dibeli', badge: 'warning' },
    decorating: { label: 'Sedang Dihias', badge: 'primary' },
    ready: { label: 'Siap Antar', badge: 'success' },
  };

  const categories = [
    'Mahar & Perhiasan',
    'Perlengkapan Ibadah',
    'Skincare & Kosmetik',
    'Busana & Tas',
    'Sepatu',
    'Parfum',
    'Konsumsi Adat',
    'Pakaian Pria',
    'Aksesoris Pria',
    'Sepatu Pria',
    'Perawatan Pria',
    'Kue Balasan',
    'Lainnya',
  ];

  const openAddModal = (presetBoxNumber?: number, presetBoxName?: string) => {
    setEditingItem(null);
    setBoxNumber(presetBoxNumber ?? (boxList.length > 0 ? Math.max(...boxList.map(b => b.boxNumber)) + 1 : 1));
    setBoxName(presetBoxName ?? '');
    setTitle('');
    setCategory(recipient === 'groom_to_bride' ? 'Mahar & Perhiasan' : 'Pakaian Pria');
    setEstimatedCost('');
    setActualCost('');
    setStatus('planned');
    setVendor('');
    setNotes('');
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (item: SeserahanItem) => {
    setEditingItem(item);
    setBoxNumber(item.boxNumber);
    setBoxName(item.boxName);
    setTitle(item.title);
    setCategory(item.category);
    setEstimatedCost(item.estimatedCost ? item.estimatedCost.toString() : '');
    setActualCost(item.actualCost ? item.actualCost.toString() : '');
    setStatus(item.status);
    setVendor(item.vendor || '');
    setNotes(item.notes || '');
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!title.trim()) {
      setFormError('Nama barang seserahan wajib diisi.');
      return;
    }

    if (!boxName.trim()) {
      setFormError('Nama baki / kotak wajib diisi (contoh: Perlengkapan Ibadah).');
      return;
    }

    const estCostNum = parseInt(estimatedCost.replace(/\D/g, '') || '0', 10);
    const actCostNum = parseInt(actualCost.replace(/\D/g, '') || '0', 10);

    if (editingItem) {
      onUpdateItem({
        ...editingItem,
        boxNumber: Number(boxNumber),
        boxName: boxName.trim(),
        recipient,
        title: title.trim(),
        category,
        estimatedCost: estCostNum,
        actualCost: actCostNum,
        status,
        vendor: vendor.trim() || undefined,
        notes: notes.trim() || undefined,
        updatedAt: new Date().toISOString(),
      });
      onShowToast('Item seserahan berhasil diperbarui!', 'success');
    } else {
      onAddItem({
        boxNumber: Number(boxNumber),
        boxName: boxName.trim(),
        recipient,
        title: title.trim(),
        category,
        estimatedCost: estCostNum,
        actualCost: actCostNum,
        status,
        vendor: vendor.trim() || undefined,
        notes: notes.trim() || undefined,
      });
      onShowToast('Item baru berhasil ditambahkan ke baki!', 'success');
    }

    setIsModalOpen(false);
  };

  const handleCycleStatus = (item: SeserahanItem) => {
    const cycleOrder: SeserahanStatus[] = ['planned', 'purchased', 'decorating', 'ready'];
    const currentIndex = cycleOrder.indexOf(item.status);
    const nextStatus = cycleOrder[(currentIndex + 1) % cycleOrder.length];

    onUpdateItem({
      ...item,
      status: nextStatus,
      updatedAt: new Date().toISOString(),
    });

    onShowToast(`Status "${item.title}" diubah ke "${statusLabels[nextStatus].label}"`, 'info');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* ── Top Header & Progress Metrics ───────────────────────────── */}
      <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-2 bg-pink-50 text-pink-600 rounded-lg">
              <Gift className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">Manajemen Seserahan &amp; Hantaran</h2>
          </div>
          <p className="text-xs text-neutral-500 max-w-xl leading-relaxed">
            Kelola rincian baki seserahan khas pernikahan Indonesia, lacak progres pembelian barang,
            penataan vendor hias, dan anggaran belanja kedua belah pihak secara transparan.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <Button
            variant="primary"
            size="sm"
            onClick={() => openAddModal()}
            icon={<Plus className="w-4 h-4 text-white" />}
          >
            Tambah Baki / Barang
          </Button>
        </div>
      </div>

      {/* ── Metrics Cards ────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Baki */}
        <div className="bg-white p-4 rounded-xl border border-neutral-100 shadow-xs">
          <div className="flex items-center justify-between text-neutral-500 text-xs mb-1.5">
            <span>Total Kotak / Baki</span>
            <Box className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{totalBoxes} Baki</p>
          <span className="text-[11px] text-neutral-400 mt-1 block">
            Mencakup {totalItems} daftar barang
          </span>
        </div>

        {/* Progres Kesiapan */}
        <div className="bg-white p-4 rounded-xl border border-neutral-100 shadow-xs">
          <div className="flex items-center justify-between text-neutral-500 text-xs mb-1.5">
            <span>Progres Siap Antar</span>
            <Sparkles className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-emerald-600">{progressPercent}%</p>
          <div className="w-full h-1.5 bg-neutral-100 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-[10px] text-neutral-400 mt-1 block">
            {readyItemsCount} dari {totalItems} barang siap
          </span>
        </div>

        {/* Total Estimasi Biaya */}
        <div className="bg-white p-4 rounded-xl border border-neutral-100 shadow-xs">
          <div className="flex items-center justify-between text-neutral-500 text-xs mb-1.5">
            <span>Estimasi Anggaran</span>
            <DollarSign className="w-4 h-4 text-[#7A5D00]" />
          </div>
          <p className="text-xl font-bold text-[#7A5D00]">{formatCurrency(totalEstimated)}</p>
          <span className="text-[11px] text-neutral-400 mt-1 block">
            Rencana belanja seserahan
          </span>
        </div>

        {/* Total Realisasi Biaya */}
        <div className="bg-white p-4 rounded-xl border border-neutral-100 shadow-xs">
          <div className="flex items-center justify-between text-neutral-500 text-xs mb-1.5">
            <span>Realisasi Belanja</span>
            <ShoppingBag className="w-4 h-4 text-[#7D4050]" />
          </div>
          <p className="text-xl font-bold text-[#7D4050]">{formatCurrency(totalActual)}</p>
          <span className="text-[11px] text-neutral-400 mt-1 block">
            {totalActual <= totalEstimated ? 'Sesuai / di bawah anggaran' : 'Melebihi estimasi awal'}
          </span>
        </div>
      </div>

      {/* ── Recipient Switcher & Controls ───────────────────────────── */}
      <div className="bg-white p-4 rounded-xl border border-neutral-100 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Recipient Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-xl">
          <button
            onClick={() => setRecipient('groom_to_bride')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              recipient === 'groom_to_bride'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <Gift className="w-3.5 h-3.5 text-pink-500" />
            <span>Dari Pihak Pria (Seserahan)</span>
            <span className="px-1.5 py-0.2 rounded-full bg-neutral-200 text-neutral-700 text-[10px]">
              {items.filter((i) => i.recipient === 'groom_to_bride').length}
            </span>
          </button>

          <button
            onClick={() => setRecipient('bride_to_groom')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              recipient === 'bride_to_groom'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-indigo-500" />
            <span>Hantaran Balasan (Dari Wanita)</span>
            <span className="px-1.5 py-0.2 rounded-full bg-neutral-200 text-neutral-700 text-[10px]">
              {items.filter((i) => i.recipient === 'bride_to_groom').length}
            </span>
          </button>
        </div>

        {/* View Mode & Filters */}
        <div className="flex items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 md:w-56">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari baki atau barang..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FCFCFC] border border-neutral-200 rounded-lg focus:outline-none focus:border-slate-900"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="text-xs bg-[#FCFCFC] border border-neutral-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-slate-900 text-neutral-700"
          >
            <option value="all">Semua Status</option>
            <option value="planned">Rencana</option>
            <option value="purchased">Sudah Dibeli</option>
            <option value="decorating">Sedang Dihias</option>
            <option value="ready">Siap Antar</option>
          </select>

          {/* View Toggle */}
          <div className="flex items-center p-0.5 bg-neutral-100 rounded-lg border border-neutral-200">
            <button
              onClick={() => setViewMode('boxes')}
              className={`p-1.5 rounded-md ${
                viewMode === 'boxes' ? 'bg-white shadow-2xs text-slate-900' : 'text-neutral-400 hover:text-neutral-700'
              }`}
              title="Tampilan Baki / Kotak"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md ${
                viewMode === 'list' ? 'bg-white shadow-2xs text-slate-900' : 'text-neutral-400 hover:text-neutral-700'
              }`}
              title="Tampilan Tabel / Daftar"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Content View: Boxes Grid ─────────────────────────────────── */}
      {viewMode === 'boxes' && (
        <div className="space-y-6">
          {boxList.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-neutral-100 text-center">
              <Gift className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800 mb-1">Belum Ada Baki Seserahan</h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto mb-6">
                Mulai catat baki pertama Anda untuk memudahkan pembagian barang dan koordinasi dengan vendor hias.
              </p>
              <Button
                variant="primary"
                size="sm"
                onClick={() => openAddModal(1, 'Set Mahar & Perhiasan')}
                icon={<Plus className="w-4 h-4 text-white" />}
              >
                Buat Baki Pertama
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
              {boxList.map((box) => {
                const boxItems = box.items;
                const isAllReady = boxItems.length > 0 && boxItems.every((i) => i.status === 'ready');
                const boxTotalCost = boxItems.reduce((acc, i) => acc + (i.actualCost || i.estimatedCost || 0), 0);

                return (
                  <Card
                    key={box.boxNumber}
                    className="p-5 bg-white border border-neutral-200/80 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      {/* Box Card Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                            #{box.boxNumber}
                          </span>
                          <div>
                            <h3 className="text-sm font-bold text-slate-900 leading-tight">{box.boxName}</h3>
                            <span className="text-[10px] text-neutral-400 block">
                              {boxItems.length} barang di dalam baki
                            </span>
                          </div>
                        </div>

                        <Badge variant={isAllReady ? 'success' : 'neutral'} size="sm">
                          {isAllReady ? 'Baki Siap' : 'Dalam Proses'}
                        </Badge>
                      </div>

                      {/* Items Checklist inside Box */}
                      <div className="space-y-2.5 mb-4">
                        {boxItems.map((item) => (
                          <div
                            key={item.id}
                            className="p-2.5 rounded-lg bg-[#FCFCFC] border border-neutral-100 flex items-start justify-between gap-3 hover:border-neutral-200 transition-colors"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-semibold text-slate-900 truncate">
                                  {item.title}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-[11px] text-neutral-500">
                                <span>{formatCurrency(item.actualCost || item.estimatedCost)}</span>
                                {item.vendor && (
                                  <>
                                    <span>•</span>
                                    <span className="flex items-center gap-1 text-slate-600 truncate">
                                      <Store className="w-3 h-3 text-neutral-400" />
                                      {item.vendor}
                                    </span>
                                  </>
                                )}
                              </div>
                              {item.notes && (
                                <p className="text-[10px] text-neutral-400 italic mt-1 truncate">
                                  {item.notes}
                                </p>
                              )}
                            </div>

                            {/* Status badge with 1-click cycle */}
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <button
                                onClick={() => handleCycleStatus(item)}
                                title="Klik untuk mengubah status barang"
                                className="transition-transform active:scale-95"
                              >
                                <Badge variant={statusLabels[item.status].badge} size="sm">
                                  {statusLabels[item.status].label}
                                </Badge>
                              </button>

                              <button
                                onClick={() => openEditModal(item)}
                                className="p-1 text-neutral-400 hover:text-slate-900 rounded"
                                title="Edit item"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => {
                                  if (confirm(`Hapus "${item.title}" dari baki?`)) {
                                    onDeleteItem(item.id);
                                    onShowToast('Barang berhasil dihapus.', 'info');
                                  }
                                }}
                                className="p-1 text-neutral-400 hover:text-rose-600 rounded"
                                title="Hapus item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer: Add more item to this box */}
                    <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800">
                        Total: {formatCurrency(boxTotalCost)}
                      </span>
                      <button
                        onClick={() => openAddModal(box.boxNumber, box.boxName)}
                        className="text-xs text-slate-700 hover:text-slate-950 font-semibold flex items-center gap-1 hover:underline"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Tambah Barang
                      </button>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── Content View: Table List ─────────────────────────────────── */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FCFCFC] border-b border-neutral-200/80 text-neutral-600 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Baki</th>
                  <th className="py-3.5 px-4">Nama Barang</th>
                  <th className="py-3.5 px-4">Kategori</th>
                  <th className="py-3.5 px-4">Estimasi / Realisasi</th>
                  <th className="py-3.5 px-4">Vendor / Toko</th>
                  <th className="py-3.5 px-4">Status Kesiapan</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-neutral-400">
                      Tidak ada barang seserahan yang cocok dengan pencarian / filter.
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-neutral-50/60 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">
                        <span className="px-2 py-1 rounded bg-slate-100 border border-slate-200 text-xs">
                          Baki #{item.boxNumber}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-semibold text-slate-900">{item.title}</p>
                        <span className="text-[10px] text-neutral-400">{item.boxName}</span>
                      </td>
                      <td className="py-3 px-4 text-neutral-600 whitespace-nowrap">
                        {item.category}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <p className="font-semibold text-slate-900">
                          {formatCurrency(item.actualCost || item.estimatedCost)}
                        </p>
                        {item.actualCost > 0 && item.estimatedCost > 0 && (
                          <span className="text-[10px] text-neutral-400">
                            Est: {formatCurrency(item.estimatedCost)}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-neutral-600">
                        {item.vendor || '—'}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <button
                          onClick={() => handleCycleStatus(item)}
                          className="transition-transform active:scale-95"
                          title="Klik untuk mengubah status"
                        >
                          <Badge variant={statusLabels[item.status].badge} size="sm">
                            {statusLabels[item.status].label}
                          </Badge>
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEditModal(item)}
                            className="p-1.5 text-neutral-500 hover:text-slate-900 rounded-lg hover:bg-neutral-100"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Hapus "${item.title}"?`)) {
                                onDeleteItem(item.id);
                                onShowToast('Item berhasil dihapus.', 'info');
                              }
                            }}
                            className="p-1.5 text-neutral-500 hover:text-rose-600 rounded-lg hover:bg-neutral-100"
                            title="Hapus"
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
        </div>
      )}

      {/* ── Modal Add / Edit Seserahan Item ──────────────────────────── */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Barang Seserahan' : 'Tambah Baki / Barang Seserahan'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          {formError && (
            <div className="p-3 rounded-lg bg-rose-50 text-rose-800 text-xs border border-rose-200">
              {formError}
            </div>
          )}

          {/* Box Number & Name */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Input
                label="Nomor Baki"
                type="number"
                min={1}
                value={boxNumber}
                onChange={(e) => setBoxNumber(Number(e.target.value))}
                required
              />
            </div>
            <div className="col-span-2">
              <Input
                label="Nama Kotak / Baki"
                placeholder="Contoh: Perlengkapan Ibadah"
                value={boxName}
                onChange={(e) => setBoxName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Title */}
          <Input
            label="Nama Barang / Rincian Isi"
            placeholder="Contoh: Mukena Sutra & Al-Qur'an Beludru"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* Category & Status */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Kategori Barang
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#FCFCFC] border border-neutral-200 text-xs rounded-lg p-2.5 focus:outline-none focus:border-slate-900"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Status Kesiapan
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as SeserahanStatus)}
                className="w-full bg-[#FCFCFC] border border-neutral-200 text-xs rounded-lg p-2.5 focus:outline-none focus:border-slate-900"
              >
                <option value="planned">Rencana (Belum Beli)</option>
                <option value="purchased">Sudah Dibeli</option>
                <option value="decorating">Sedang Dihias</option>
                <option value="ready">Siap Antar</option>
              </select>
            </div>
          </div>

          {/* Costs */}
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Estimasi Harga (Rp)"
              placeholder="Contoh: 2500000"
              value={estimatedCost}
              onChange={(e) => setEstimatedCost(e.target.value)}
            />
            <Input
              label="Realisasi Harga (Rp)"
              placeholder="Contoh: 2400000"
              value={actualCost}
              onChange={(e) => setActualCost(e.target.value)}
            />
          </div>

          {/* Vendor */}
          <Input
            label="Vendor / Toko / Jasa Hias (Opsional)"
            placeholder="Contoh: The Seserahan Studio"
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
          />

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Catatan Khusus (Opsional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Warna kotak akrilik, permintaan pita, atau instruksi khusus..."
              className="w-full bg-[#FCFCFC] border border-neutral-200 text-xs rounded-lg p-2.5 focus:outline-none focus:border-slate-900 resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-100">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsModalOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" variant="primary" size="sm">
              {editingItem ? 'Simpan Perubahan' : 'Tambahkan ke Baki'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
