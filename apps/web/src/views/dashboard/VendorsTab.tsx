import React, { useState } from 'react';
import {
  Building2,
  Plus,
  Phone,
  MessageCircle,
  Trash2,
  Edit2,
  CheckCircle,
  Clock,
  Search,
} from 'lucide-react';
import { InstagramIcon } from '@/components/ui/Icons';
import { Wedding } from '@/types/wedding';
import { Vendor, VendorCategory, VendorStatus } from '@/types/vendor';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { formatRupiah } from '@/lib/utils';
import { vendorSchema } from '@/schemas/validation';

export interface VendorsTabProps {
  wedding: Wedding;
  vendors: Vendor[];
  onAddVendor: (vendor: Omit<Vendor, 'id' | 'weddingId' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateVendor: (vendor: Vendor) => void;
  onDeleteVendor: (id: string) => void;
  onShowToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

export function VendorsTab({
  wedding,
  vendors,
  onAddVendor,
  onUpdateVendor,
  onDeleteVendor,
  onShowToast,
}: VendorsTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState<VendorCategory>('Venue');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [instagram, setInstagram] = useState('');
  const [cost, setCost] = useState('');
  const [status, setStatus] = useState<VendorStatus>('researching');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');

  const openAddModal = () => {
    setEditingVendor(null);
    setName('');
    setCategory('Venue');
    setContactPerson('');
    setPhone('');
    setInstagram('');
    setCost('');
    setStatus('researching');
    setNotes('');
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (vendor: Vendor) => {
    setEditingVendor(vendor);
    setName(vendor.name);
    setCategory(vendor.category);
    setContactPerson(vendor.contactPerson || '');
    setPhone(vendor.phone);
    setInstagram(vendor.instagram || '');
    setCost(String(vendor.cost));
    setStatus(vendor.status);
    setNotes(vendor.notes || '');
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const numCost = Number(cost) || 0;
    const validation = vendorSchema.safeParse({
      name,
      category,
      contactPerson,
      phone,
      instagram,
      cost: numCost,
      status,
      notes,
    });

    if (!validation.success) {
      setFormError(validation.error.errors[0]?.message || 'Input vendor tidak valid');
      return;
    }

    if (editingVendor) {
      onUpdateVendor({
        ...editingVendor,
        name,
        category,
        contactPerson,
        phone,
        instagram,
        cost: numCost,
        status,
        notes,
      });
      onShowToast('Data vendor berhasil diperbarui!', 'success');
    } else {
      onAddVendor({
        name,
        category,
        contactPerson,
        phone,
        instagram,
        cost: numCost,
        status,
        notes,
      });
      onShowToast('Vendor baru berhasil ditambahkan!', 'success');
    }

    setIsModalOpen(false);
  };

  const filteredVendors = vendors.filter((v) => {
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || v.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusMap: Record<VendorStatus, { label: string; badge: 'neutral' | 'warning' | 'primary' | 'success' }> = {
    researching: { label: 'Riset', badge: 'neutral' },
    contacted: { label: 'Dihubungi', badge: 'warning' },
    booked: { label: 'Dipesan (Deal)', badge: 'primary' },
    completed: { label: 'Selesai', badge: 'success' },
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-neutral-100 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="w-5 h-5 text-slate-700" />
            <h2 className="text-lg font-bold text-slate-900">Direktori Vendor Pernikahan</h2>
          </div>
          <p className="text-xs text-neutral-500">
            Kelola kontak, status negosiasi, dan kesepakatan harga dengan seluruh vendor pernikahan.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={openAddModal}
          icon={<Plus className="w-4 h-4 text-white" />}
        >
          Tambah Vendor
        </Button>
      </div>

      {/* Search & Status Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="w-full sm:flex-1">
          <Input
            placeholder="Cari vendor atau kategori..."
            leftIcon={<Search className="w-4 h-4" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-48">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full bg-white border border-neutral-200 text-xs font-medium rounded-md px-3 py-2.5 text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
          >
            <option value="all">Semua Status</option>
            <option value="researching">Riset</option>
            <option value="contacted">Dihubungi</option>
            <option value="booked">Dipesan (Deal)</option>
            <option value="completed">Selesai</option>
          </select>
        </div>
      </div>

      {/* Vendor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredVendors.length === 0 ? (
          <div className="col-span-full py-12 text-center text-neutral-400 text-xs bg-white rounded-xl border border-neutral-100">
            Tidak ditemukan vendor yang sesuai pencarian.
          </div>
        ) : (
          filteredVendors.map((vendor) => (
            <Card
              key={vendor.id}
              hoverable
              className="p-5 flex flex-col justify-between border border-neutral-200/70"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded inline-block mb-1">
                      {vendor.category}
                    </span>
                    <h3 className="font-bold text-sm text-slate-900 leading-tight">
                      {vendor.name}
                    </h3>
                  </div>
                  <Badge variant={statusMap[vendor.status].badge} size="sm">
                    {statusMap[vendor.status].label}
                  </Badge>
                </div>

                {/* Contact details */}
                <div className="space-y-1 text-xs text-neutral-600 my-3">
                  {vendor.contactPerson && (
                    <p className="text-neutral-500">PIC: {vendor.contactPerson}</p>
                  )}
                  <p className="flex items-center gap-1.5 text-neutral-700 font-medium">
                    <Phone className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{vendor.phone}</span>
                  </p>
                  {vendor.instagram && (
                    <p className="flex items-center gap-1.5 text-neutral-700">
                      <InstagramIcon className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{vendor.instagram}</span>
                    </p>
                  )}
                </div>

                {vendor.notes && (
                  <p className="text-[11px] text-neutral-500 bg-neutral-50 p-2.5 rounded-lg mb-3 leading-relaxed">
                    {vendor.notes}
                  </p>
                )}
              </div>

              {/* Price and Action Footer */}
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-neutral-400 block leading-none">Nilai Kontrak</span>
                  <span className="font-mono font-bold text-xs text-[#263238]">
                    {vendor.cost > 0 ? formatRupiah(vendor.cost) : 'Belum Ada'}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <a
                    href={`https://wa.me/${vendor.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-md text-[#74A12E] hover:bg-[#EBF7E5] transition-colors"
                    title="Chat WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => openEditModal(vendor)}
                    title="Ubah Data"
                    className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteVendor(vendor.id)}
                    title="Hapus Vendor"
                    className="p-1.5 rounded-md text-neutral-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingVendor ? 'Ubah Vendor' : 'Tambah Vendor Baru'}
        description="Kelola mitra vendor pernikahan untuk memudahkan koordinasi."
      >
        <form onSubmit={handleSave} className="space-y-4">
          {formError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
              {formError}
            </div>
          )}

          <Input
            label="Nama Vendor / Studio"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Contoh: Plataran Dharmawangsa"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Kategori Vendor
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as VendorCategory)}
                className="w-full bg-white border border-neutral-200 text-xs font-medium rounded-md px-3 py-2.5 text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
              >
                <option value="Venue">Venue</option>
                <option value="Catering">Catering</option>
                <option value="Decoration">Decoration</option>
                <option value="Photography">Photography</option>
                <option value="Videography">Videography</option>
                <option value="Attire & Makeup">Attire & Makeup</option>
                <option value="Wedding Organizer">Wedding Organizer</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Invitation & Souvenir">Invitation & Souvenir</option>
                <option value="Other">Lainnya</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Status Kerja Sama
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as VendorStatus)}
                className="w-full bg-white border border-neutral-200 text-xs font-medium rounded-md px-3 py-2.5 text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
              >
                <option value="researching">Riset</option>
                <option value="contacted">Dihubungi</option>
                <option value="booked">Dipesan (Deal)</option>
                <option value="completed">Selesai</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Nama Kontak (PIC)"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              placeholder="Contoh: Mbak Ratna"
            />
            <Input
              label="Nomor WhatsApp"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Contoh: 081234567890"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Akun Instagram (Opsional)"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="@plataran.id"
            />
            <Input
              label="Perkiraan Biaya (Rp)"
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Catatan Negosiasi / Fasilitas
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: Paket termasuk test food 6 orang dan ruang VIP rias."
              className="w-full bg-white border border-neutral-200 text-xs font-medium rounded-md p-3 text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
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
              {editingVendor ? 'Simpan Perubahan' : 'Tambah Vendor'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
