import React, { useRef, useState } from 'react';
import { Upload, X, FileVideo, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from './Button';
import { api } from '@/lib/api';

export interface MediaUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  accept?: 'image/*' | 'video/*' | 'audio/*' | 'image/*,video/*';
  label?: string;
  description?: string;
}

export function MediaUploader({ 
  value, 
  onChange, 
  accept = 'image/*,video/*',
  label = 'Upload Media',
  description = 'Pilih file media untuk diunggah.'
}: MediaUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFile = async (file: File) => {
    setIsUploading(true);
    
    try {
      const response = await api.uploadMedia(file);
      onChange(response.url);
    } catch (error) {
      console.error('Failed to upload file:', error);
      alert('Gagal mengunggah file. Silakan coba lagi.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const isVideo = value?.includes('video') || value?.endsWith('.mp4') || value?.startsWith('blob:'); // Simplistic check for mock URLs
  const isAudio = accept === 'audio/*' || value?.endsWith('.mp3') || value?.endsWith('.wav');

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium text-slate-700">{label}</label>}
      {description && <p className="text-xs text-neutral-500 mb-2">{description}</p>}
      
      {value ? (
        <div className="relative rounded-lg overflow-hidden border border-neutral-200 bg-neutral-50 aspect-video flex items-center justify-center group">
          {isAudio ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 p-4">
              <audio src={value} controls className="w-full max-w-[200px]" />
            </div>
          ) : isVideo ? (
            <video src={value} className="w-full h-full object-cover" autoPlay loop muted playsInline />
          ) : (
            <img src={value} alt="Uploaded media" className="w-full h-full object-cover" />
          )}
          
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={(e) => { e.preventDefault(); inputRef.current?.click(); }}
            >
              Ganti
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => { e.preventDefault(); onChange(''); }}
              className="text-red-500 hover:text-red-600 border-red-500/20 hover:border-red-500/50 bg-white"
            >
              Hapus
            </Button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-3 text-center cursor-pointer transition-all
            ${isDragging ? 'border-slate-900 bg-slate-50' : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'}
            ${isUploading ? 'opacity-50 pointer-events-none' : ''}
          `}
        >
          {isUploading ? (
            <Loader2 className="w-8 h-8 text-neutral-400 animate-spin" />
          ) : (
            <Upload className="w-8 h-8 text-neutral-400" />
          )}
          
          <div>
            <p className="text-sm font-medium text-slate-900">
              {isUploading ? 'Mengunggah...' : 'Klik atau seret file ke sini'}
            </p>
            <p className="text-xs text-neutral-500 mt-1">
              {accept === 'audio/*' ? 'MP3, WAV (Max. 10MB)' : accept === 'video/*' ? 'MP4, WebM (Max. 50MB)' : accept === 'image/*' ? 'JPG, PNG, WebP (Max. 5MB)' : 'Media file yang didukung'}
            </p>
          </div>
        </div>
      )}

      <input
        type="file"
        ref={inputRef}
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleFile(e.target.files[0]);
          }
        }}
        accept={accept}
        className="hidden"
      />
    </div>
  );
}
