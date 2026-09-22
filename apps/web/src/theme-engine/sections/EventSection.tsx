import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { SectionComponentProps } from '../types';
import { WeddingEvent } from '@/types/wedding';

/**
 * EventSection — Informasi detail akad & resepsi.
 */
export function EventSection({ wedding }: Pick<SectionComponentProps, 'wedding'>) {
  const EventCard = ({ event }: { event: WeddingEvent }) => (
    <div
      className="p-6 rounded-2xl border flex flex-col justify-between"
      style={{
        background: 'var(--theme-surface-alt)',
        borderColor: 'var(--theme-border-accent)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      }}
    >
      <div>
        <h3
          className="text-2xl mb-3"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--theme-text)' }}
        >
          {event.title}
        </h3>

        <div className="space-y-2 text-xs mb-6 font-light" style={{ color: 'var(--theme-text-muted)' }}>
          <p className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--theme-secondary)' }} />
            <span>{event.date}</span>
          </p>
          <p className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--theme-secondary)' }} />
            <span>{event.time}</span>
          </p>
          <p className="flex items-start gap-2 pt-1">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: 'var(--theme-secondary)' }} />
            <span>
              <strong className="block font-semibold" style={{ color: 'var(--theme-text)' }}>
                {event.venue}
              </strong>
              {event.address}
            </span>
          </p>
        </div>
      </div>

      {event.mapUrl && (
        <a href={event.mapUrl} target="_blank" rel="noreferrer" className="block w-full">
          <button
            className="w-full text-xs font-medium py-2 px-4 rounded-lg border transition-all hover:opacity-80"
            style={{
              borderColor: 'var(--theme-border-accent)',
              color: 'var(--theme-text-accent)',
              background: 'var(--theme-surface)',
            }}
          >
            Petunjuk Arah (Google Maps)
          </button>
        </a>
      )}
    </div>
  );

  return (
    <section
      className="py-16 px-6 sm:px-12 border-b"
      style={{ background: 'var(--theme-surface)', borderColor: 'var(--theme-border)' }}
    >
      <div className="text-center mb-12">
        <span className="text-xs font-semibold tracking-[0.25em] uppercase block mb-2" style={{ color: 'var(--theme-text-accent)' }}>
          Rangkaian Acara
        </span>
        <h2
          className="text-3xl sm:text-4xl"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--theme-text)' }}
        >
          Waktu &amp; Tempat
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
        <EventCard event={wedding.akadEvent} />
        <EventCard event={wedding.receptionEvent} />
      </div>
    </section>
  );
}
