import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { cn } from './utils';

export interface ToastProps {
  id: string;
  type?: 'success' | 'error' | 'info';
  message: string;
  onClose: (id: string) => void;
  duration?: number;
}

export function Toast({ id, type = 'success', message, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-[#74A12E] flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-[#D9536F] flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-[#FC9FB1] flex-shrink-0" />,
  };

  const borders = {
    success: 'border-[#B9DCA9]',
    error: 'border-[#FC9FB1]',
    info: 'border-[#FCBACB]',
  };

  return (
    <div
      className={cn(
        'flex items-center gap-3 bg-white px-4 py-3 rounded-lg shadow-elevated border text-sm text-[#263238] animate-in slide-in-from-bottom-3 duration-200 min-w-[280px] max-w-md',
        borders[type]
      )}
    >
      {icons[type]}
      <span className="flex-1 text-xs sm:text-sm font-medium">{message}</span>
      <button
        onClick={() => onClose(id)}
        className="text-neutral-400 hover:text-neutral-600 p-0.5 rounded transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export function ToastContainer({
  toasts,
  onClose,
}: {
  toasts: ToastMessage[];
  onClose: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-auto">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={onClose} />
      ))}
    </div>
  );
}
