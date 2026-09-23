import React, { useState } from 'react';
import {
  Wallet,
  Plus,
  ArrowUpRight,
  TrendingDown,
  CheckCircle,
  AlertCircle,
  Clock,
  Trash2,
  Edit2,
  DollarSign,
} from 'lucide-react';
import { Wedding } from '@/types/wedding';
import { BudgetItem, BudgetCategory, PaymentStatus } from '@/types/budget';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { formatRupiah } from '@/lib/utils';
import { budgetItemSchema } from '@/schemas/validation';

export interface BudgetTabProps {
  wedding: Wedding;
  budget: BudgetItem[];
  onAddBudgetItem: (item: Omit<BudgetItem, 'id' | 'weddingId' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateBudgetItem: (item: BudgetItem) => void;
  onDeleteBudgetItem: (id: string) => void;
  onShowToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

export function BudgetTab({
  wedding,
  budget,
  onAddBudgetItem,
  onUpdateBudgetItem,
  onDeleteBudgetItem,
  onShowToast,
}: BudgetTabProps) {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BudgetItem | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState<BudgetCategory>('Venue & Katering');
  const [estimatedCost, setEstimatedCost] = useState('');
  const [actualCost, setActualCost] = useState('');
  const [paidAmount, setPaidAmount] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('unpaid');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');

  const totalEstimated = budget.reduce((sum, item) => sum + item.estimatedCost, 0);
  const totalActual = budget.reduce((sum, item) => sum + item.actualCost, 0);
  const totalPaid = budget.reduce((sum, item) => sum + item.paidAmount, 0);
  const remainingBudget = totalEstimated - totalActual;
  const spentPercent = totalEstimated > 0 ? Math.min(Math.round((totalActual / totalEstimated) * 100), 100) : 0;

  const openAddModal = () => {
    setEditingItem(null);
    setName('');
    setCategory('Venue & Katering');
    setEstimatedCost('');
    setActualCost('');
    setPaidAmount('');
    setPaymentStatus('unpaid');
    setNotes('');
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (item: BudgetItem) => {
    setEditingItem(item);
    setName(item.name);
    setCategory(item.category);
    setEstimatedCost(String(item.estimatedCost));
    setActualCost(String(item.actualCost));
    setPaidAmount(String(item.paidAmount));
    setPaymentStatus(item.paymentStatus);
    setNotes(item.notes || '');
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const est = Number(estimatedCost) || 0;
    const act = Number(actualCost) || 0;
    const paid = Number(paidAmount) || 0;

    const validation = budgetItemSchema.safeParse({
      name,
      category,
      estimatedCost: est,
      actualCost: act,
      paidAmount: paid,
      paymentStatus,
      notes,
    });

    if (!validation.success) {
      setFormError(validation.error.errors[0]?.message || 'Input biaya tidak valid');
      return;
    }

    if (editingItem) {
      onUpdateBudgetItem({
        ...editingItem,
        name,
        category,
        estimatedCost: est,
        actualCost: act,
        paidAmount: paid,
        paymentStatus,
        notes,
      });
      onShowToast('Pos anggaran berhasil diperbarui!', 'success');
    } else {
      onAddBudgetItem({
        name,
        category,
        estimatedCost: est,
        actualCost: act,
        paidAmount: paid,
        paymentStatus,
        notes,
      });
      onShowToast('Pos anggaran baru berhasil dicatat!', 'success');
    }

    setIsModalOpen(false);
  };

  const filteredBudget = budget.filter(
    (b) => filterCategory === 'all' || b.category === filterCategory
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <span className="text-xs font-medium text-slate-500 block mb-1">
            Total Estimasi
          </span>
          <p className="text-xl font-bold text-slate-900 truncate">{formatRupiah(totalEstimated)}</p>
          <span className="text-xs text-slate-500 mt-1 block">Rencana plafon anggaran</span>
        </Card>

        <Card className="p-5">
          <span className="text-xs font-medium text-slate-500 block mb-1">
            Realisasi (Aktual)
          </span>
          <p className="text-xl font-bold text-slate-900 truncate">{formatRupiah(totalActual)}</p>
          <span className="text-xs text-slate-500 mt-1 block">{spentPercent}% dari estimasi</span>
        </Card>

        <Card className="p-5">
          <span className="text-xs font-medium text-slate-500 block mb-1">
            Total Terbayar (DP/Lunas)
          </span>
          <p className="text-xl font-bold text-emerald-700 truncate">{formatRupiah(totalPaid)}</p>
          <span className="text-xs text-slate-500 mt-1 block">Sisa tagihan: {formatRupiah(totalActual - totalPaid)}</span>
        </Card>

        <Card className="p-5">
          <span className="text-xs font-medium text-slate-500 block mb-1">
            Selisih / Sisa Saldo
          </span>
          <p className={`text-xl font-bold truncate ${remainingBudget >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
            {formatRupiah(remainingBudget)}
          </p>
          <span className="text-xs text-slate-500 mt-1 block">
            {remainingBudget >= 0 ? 'Anggaran terkendali aman' : 'Melebihi estimasi awal'}
          </span>
        </Card>
      </div>

      {/* Visual Budget Progress Bar */}
      <Card className="p-5">
        <div className="flex items-center justify-between text-xs font-semibold text-[#263238] mb-2">
          <span>Persentase Penggunaan Anggaran</span>
          <span>{spentPercent}% ({formatRupiah(totalActual)} / {formatRupiah(totalEstimated)})</span>
        </div>
        <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden p-0.5 border border-neutral-200">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              spentPercent > 90 ? 'bg-rose-500' : 'bg-emerald-600'
            }`}
            style={{ width: `${spentPercent}%` }}
          />
        </div>
      </Card>

      {/* Budget Table Card */}
      <Card className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-[#263238]">Rincian Pos Anggaran & Biaya</h3>
            <p className="text-xs text-neutral-500">
              Pantau kontrak vendor, pembayaran termin, dan efisiensi pengeluaran pernikahan.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-white border border-neutral-200 text-xs font-medium rounded-md px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
            >
              <option value="all">Semua Kategori</option>
              <option value="Venue & Katering">Venue & Katering</option>
              <option value="Dekorasi">Dekorasi</option>
              <option value="Foto & Video">Foto & Video</option>
              <option value="Busana & Rias">Busana & Rias</option>
              <option value="Undangan & Souvenir">Undangan & Souvenir</option>
              <option value="Hiburan & Sound">Hiburan & Sound</option>
              <option value="Akad / Pemberkatan">Akad / Pemberkatan</option>
              <option value="Lain-lain">Lain-lain</option>
            </select>

            <Button
              variant="primary"
              size="sm"
              onClick={openAddModal}
              icon={<Plus className="w-4 h-4 text-white" />}
            >
              Tambah Pos Biaya
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-neutral-100 rounded-lg">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 text-neutral-500 font-semibold border-b border-neutral-100">
              <tr>
                <th className="py-3 px-4">Pos Pengeluaran</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4 text-right">Estimasi</th>
                <th className="py-3 px-4 text-right">Realisasi</th>
                <th className="py-3 px-4 text-right">Terbayar</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700">
              {filteredBudget.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-neutral-400">
                    Belum ada data pengeluaran dalam kategori ini.
                  </td>
                </tr>
              ) : (
                filteredBudget.map((item) => (
                  <tr key={item.id} className="hover:bg-[#FCFCFC] transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#263238]">
                      <div>{item.name}</div>
                      {item.notes && <div className="text-[10px] text-neutral-400 font-normal">{item.notes}</div>}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded text-[11px]">
                        {item.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono">
                      {formatRupiah(item.estimatedCost)}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-semibold text-[#263238]">
                      {formatRupiah(item.actualCost)}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono text-[#74A12E]">
                      {formatRupiah(item.paidAmount)}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <Badge
                        variant={
                          item.paymentStatus === 'paid'
                            ? 'success'
                            : item.paymentStatus === 'partial'
                            ? 'warning'
                            : 'error'
                        }
                        size="sm"
                      >
                        {item.paymentStatus === 'paid'
                          ? 'Lunas'
                          : item.paymentStatus === 'partial'
                          ? 'Sebagian'
                          : 'Belum Bayar'}
                      </Badge>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEditModal(item)}
                          title="Ubah Pos"
                          className="p-1.5 rounded text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteBudgetItem(item.id)}
                          title="Hapus Pos"
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

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Ubah Pos Anggaran' : 'Tambah Pos Anggaran Baru'}
        description="Catat pengeluaran dan status pembayaran vendor pernikahan Anda."
      >
        <form onSubmit={handleSave} className="space-y-4">
          {formError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
              {formError}
            </div>
          )}

          <Input
            label="Nama Pos Pengeluaran"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Contoh: Katering Buffet 500 Pax"
            required
          />

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Kategori Pos
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as BudgetCategory)}
              className="w-full bg-white border border-neutral-200 text-xs font-medium rounded-md px-3 py-2.5 text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
            >
              <option value="Venue & Katering">Venue & Katering</option>
              <option value="Dekorasi">Dekorasi</option>
              <option value="Foto & Video">Foto & Video</option>
              <option value="Busana & Rias">Busana & Rias</option>
              <option value="Undangan & Souvenir">Undangan & Souvenir</option>
              <option value="Hiburan & Sound">Hiburan & Sound</option>
              <option value="Akad / Pemberkatan">Akad / Pemberkatan</option>
              <option value="Lain-lain">Lain-lain</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Estimasi Biaya (Rp)"
              type="number"
              value={estimatedCost}
              onChange={(e) => setEstimatedCost(e.target.value)}
              placeholder="0"
              required
            />
            <Input
              label="Realisasi / Aktual (Rp)"
              type="number"
              value={actualCost}
              onChange={(e) => setActualCost(e.target.value)}
              placeholder="0"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Jumlah Terbayar (Rp)"
              type="number"
              value={paidAmount}
              onChange={(e) => setPaidAmount(e.target.value)}
              placeholder="0"
            />
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Status Pembayaran
              </label>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value as PaymentStatus)}
                className="w-full bg-white border border-neutral-200 text-xs font-medium rounded-md px-3 py-2.5 text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
              >
                <option value="unpaid">Belum Bayar</option>
                <option value="partial">Sebagian (DP)</option>
                <option value="paid">Lunas</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Catatan Khusus (Opsional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: Jatuh tempo pelunasan H-14"
              className="w-full bg-white border border-neutral-200 text-xs font-medium rounded-md px-3 py-2.5 text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-neutral-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(false)}
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
            >
              {editingItem ? 'Simpan Perubahan' : 'Catat Pos Anggaran'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
