import React, { useState } from 'react';
import {
  Image,
  Plus,
  Trash2,
  Music,
  ExternalLink,
  Volume2,
  Sparkles,
} from 'lucide-react';
import { Wedding } from '@/types/wedding';
import { Invitation, GalleryImage } from '@/types/invitation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Lightbox } from '@/components/invitation/Lightbox';

export interface MediaTabProps {
  wedding: Wedding;
  invitation: Invitation;
  onUpdateInvitation: (invitation: Invitation) => void;
  onShowToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

export function MediaTab({
  wedding,
  invitation,
  onUpdateInvitation,
  onShowToast,
}: MediaTabProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoCaption, setPhotoCaption] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const images = invitation.config.gallery.images;

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoUrl.trim()) return;

    const newImage: GalleryImage = {
      id: `img-${Date.now()}`,
      url: photoUrl.trim(),
      caption: photoCaption.trim() || undefined,
    };

    const updatedInvitation: Invitation = {
      ...invitation,
      config: {
        ...invitation.config,
        gallery: {
          ...invitation.config.gallery,
          images: [...images, newImage],
        },
      },
    };

    onUpdateInvitation(updatedInvitation);
    onShowToast('Foto baru berhasil ditambahkan ke galeri!', 'success');
    setPhotoUrl('');
    setPhotoCaption('');
    setIsAddModalOpen(false);
  };

  const handleDeletePhoto = (id: string) => {
    const updatedInvitation: Invitation = {
      ...invitation,
      config: {
        ...invitation.config,
        gallery: {
          ...invitation.config.gallery,
          images: images.filter((img) => img.id !== id),
        },
      },
    };
    onUpdateInvitation(updatedInvitation);
    onShowToast('Foto berhasil dihapus dari galeri', 'info');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={images}
        currentIndex={lightboxIndex}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-neutral-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Image className="w-5 h-5 text-slate-700" />
            <h2 className="text-lg font-bold text-neutral-900">Manajemen Galeri Media & Foto</h2>
          </div>
          <p className="text-xs text-neutral-500">
            Unggah dan susun foto momen prewedding terbaik untuk ditampilkan pada undangan digital Anda.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsAddModalOpen(true)}
          icon={<Plus className="w-4 h-4 text-white" />}
        >
          + Tambah Foto
        </Button>
      </div>

      {/* Photo Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img, idx) => (
          <Card
            key={img.id}
            className="p-2 relative group overflow-hidden border border-neutral-200"
          >
            <div
              onClick={() => {
                setLightboxIndex(idx);
                setLightboxOpen(true);
              }}
              className="aspect-square rounded-lg overflow-hidden cursor-pointer relative"
            >
              <img
                src={img.url}
                alt={img.caption || 'Foto Galeri'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Sparkles className="w-6 h-6" />
              </div>
            </div>

            {img.caption && (
              <p className="text-[11px] text-neutral-600 font-light truncate mt-2 px-1">
                {img.caption}
              </p>
            )}

            <button
              onClick={() => handleDeletePhoto(img.id)}
              title="Hapus foto"
              className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 text-neutral-500 hover:text-rose-600 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </Card>
        ))}
      </div>

      {/* Music Summary Card */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-medium text-slate-500">Musik Latar Aktif</span>
              <h4 className="font-bold text-sm text-slate-900">
                {invitation.config.music.title}
              </h4>
              <p className="text-xs text-slate-500">{invitation.config.music.artist}</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
            {invitation.config.music.enabled ? 'Aktif' : 'Nonaktif'}
          </span>
        </div>
      </Card>

      {/* Add Photo Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Tambah Foto Galeri"
        description="Masukkan URL foto resolusi tinggi untuk galeri undangan pernikahan."
      >
        <form onSubmit={handleAddPhoto} className="space-y-4">
          <Input
            label="URL Foto (Gambar)"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            required
          />

          <Input
            label="Keterangan / Caption (Opsional)"
            value={photoCaption}
            onChange={(e) => setPhotoCaption(e.target.value)}
            placeholder="Contoh: Senyum bahagia saat sesi prewedding di Bromo"
          />

          {photoUrl && (
            <div className="mt-2">
              <span className="text-xs text-neutral-400 block mb-1">Pratinjau Foto:</span>
              <div className="w-32 h-32 rounded-lg overflow-hidden border border-neutral-200">
                <img
                  src={photoUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
                />
              </div>
            </div>
          )}

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
              Tambahkan Foto
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
