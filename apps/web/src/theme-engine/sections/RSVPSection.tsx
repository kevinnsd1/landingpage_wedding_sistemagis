import React from 'react';
import { Check, UserCheck, Send } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { SectionComponentProps } from '../types';

/**
 * RSVPSection — Form konfirmasi kehadiran.
 * Menerima rsvpForm dari useRSVPForm hook.
 */
export function RSVPSection({
  guest,
  rsvpForm,
}: Pick<SectionComponentProps, 'guest' | 'rsvpForm'>) {
  const {
    rsvpName, setRsvpName,
    rsvpAttendance, setRsvpAttendance,
    rsvpGuestCount, setRsvpGuestCount,
    rsvpMessage, setRsvpMessage,
    rsvpSuccess, rsvpError,
    handleSubmit,
  } = rsvpForm;

  return (
    <section
      className="py-16 px-6 sm:px-12 border-b"
      id="rsvp"
      style={{ background: 'var(--theme-surface-alt)', borderColor: 'var(--theme-border)' }}
    >
      <div className="text-center mb-8">
        <span className="text-xs font-semibold tracking-[0.25em] uppercase block mb-2" style={{ color: 'var(--theme-text-accent)' }}>
          Konfirmasi Kehadiran
        </span>
        <h2
          className="text-3xl sm:text-4xl"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--theme-text)' }}
        >
          RSVP Pernikahan
        </h2>
        <p className="text-xs mt-2 font-light" style={{ color: 'var(--theme-text-muted)' }}>
          Mohon konfirmasi kehadiran Anda untuk membantu kelancaran persiapan kami.
        </p>
      </div>

      <div
        className="max-w-md mx-auto p-6 rounded-2xl border"
        style={{
          background: 'var(--theme-surface)',
          borderColor: 'var(--theme-border-accent)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        }}
      >
        {rsvpSuccess ? (
          <div className="text-center py-8">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 border"
              style={{
                background: 'color-mix(in srgb, var(--theme-secondary) 15%, transparent)',
                borderColor: 'var(--theme-secondary)',
                color: 'var(--theme-secondary)',
              }}
            >
              <Check className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-semibold mb-1" style={{ color: 'var(--theme-text)' }}>
              Terima Kasih Banyak!
            </h4>
            <p className="text-xs font-light max-w-xs mx-auto" style={{ color: 'var(--theme-text-muted)' }}>
              Konfirmasi kehadiran Anda telah tersimpan. Doa dan kehadiran Anda sangat berarti bagi kami.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {rsvpError && (
              <div
                className="p-3 rounded-lg text-xs font-medium border"
                style={{
                  background: 'rgba(239,68,68,0.08)',
                  color: '#B91C1C',
                  borderColor: 'rgba(239,68,68,0.2)',
                }}
              >
                {rsvpError}
              </div>
            )}

            <Input
              label="Nama Lengkap"
              value={rsvpName}
              onChange={(e) => setRsvpName(e.target.value)}
              placeholder="Contoh: Budi Santoso"
              required
            />

            {/* Attendance toggle */}
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--theme-text)' }}>
                Status Kehadiran
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(['attending', 'declined'] as const).map((status) => {
                  const isSelected = rsvpAttendance === status;
                  return (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setRsvpAttendance(status)}
                      className="py-2.5 px-3 rounded-md text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all"
                      style={{
                        background: isSelected
                          ? (status === 'attending'
                            ? 'color-mix(in srgb, var(--theme-secondary) 12%, transparent)'
                            : 'rgba(239,68,68,0.08)')
                          : 'var(--theme-surface)',
                        borderColor: isSelected
                          ? (status === 'attending' ? 'var(--theme-secondary)' : 'rgba(239,68,68,0.4)')
                          : 'var(--theme-border)',
                        color: isSelected
                          ? (status === 'attending' ? 'var(--theme-text-accent)' : '#B91C1C')
                          : 'var(--theme-text-muted)',
                      }}
                    >
                      {status === 'attending' ? (
                        <><UserCheck className="w-4 h-4" /> Akan Hadir</>
                      ) : (
                        'Maaf, Tidak Hadir'
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {rsvpAttendance === 'attending' && (
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--theme-text)' }}>
                  Jumlah Tamu Hadir
                </label>
                <select
                  value={rsvpGuestCount}
                  onChange={(e) => setRsvpGuestCount(Number(e.target.value))}
                  className="w-full text-sm rounded-md px-3.5 py-2.5 focus:outline-none"
                  style={{
                    border: '1px solid var(--theme-border)',
                    color: 'var(--theme-text)',
                    background: 'var(--theme-surface)',
                  }}
                >
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>{n} Orang</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--theme-text)' }}>
                Ucapan &amp; Doa Restu
              </label>
              <textarea
                rows={3}
                value={rsvpMessage}
                onChange={(e) => setRsvpMessage(e.target.value)}
                placeholder="Tuliskan ucapan selamat dan doa untuk kedua mempelai..."
                className="w-full text-sm rounded-md p-3 focus:outline-none resize-none"
                style={{
                  border: '1px solid var(--theme-border)',
                  color: 'var(--theme-text)',
                  background: 'var(--theme-surface)',
                }}
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 text-sm font-semibold py-3 rounded-xl transition-all hover:opacity-90 active:scale-[0.98]"
              style={{
                background: 'var(--theme-text)',
                color: 'var(--theme-surface)',
              }}
            >
              <Send className="w-4 h-4" />
              Kirim Konfirmasi Kehadiran
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
