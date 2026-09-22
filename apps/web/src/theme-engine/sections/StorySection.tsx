import React from 'react';
import { SectionComponentProps } from '../types';

/**
 * StorySection — Timeline kisah cinta mempelai.
 */
export function StorySection({ wedding }: Pick<SectionComponentProps, 'wedding'>) {
  const stories = wedding.stories ?? [];

  if (stories.length === 0) return null;

  return (
    <section
      className="py-16 px-6 sm:px-12 border-b"
      style={{ background: 'var(--theme-surface-alt)', borderColor: 'var(--theme-border)' }}
    >
      <div className="text-center mb-12">
        <span className="text-xs font-semibold tracking-[0.25em] uppercase block mb-2" style={{ color: 'var(--theme-text-accent)' }}>
          Kisah Kasih
        </span>
        <h2
          className="text-3xl sm:text-4xl"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--theme-text)' }}
        >
          Bagaimana Cerita Kami Dimulai
        </h2>
      </div>

      <div
        className="relative ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-10 max-w-lg mx-auto border-l"
        style={{ borderColor: 'var(--theme-border-accent)' }}
      >
        {stories.map((story) => (
          <div key={story.id} className="relative group">
            {/* Timeline dot */}
            <div
              className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2"
              style={{ background: 'var(--theme-border-accent)', borderColor: 'var(--theme-surface)' }}
            />

            <div
              className="p-5 rounded-xl border transition-shadow hover:shadow-md"
              style={{
                background: 'var(--theme-surface)',
                borderColor: 'var(--theme-border-accent)',
              }}
            >
              <span
                className="inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full mb-2"
                style={{
                  color: 'var(--theme-text-accent)',
                  background: 'color-mix(in srgb, var(--theme-primary) 15%, transparent)',
                  border: '1px solid var(--theme-border-accent)',
                }}
              >
                {story.year}
              </span>
              <h4
                className="font-semibold text-base mb-1.5"
                style={{ color: 'var(--theme-text)' }}
              >
                {story.title}
              </h4>
              <p className="text-xs leading-relaxed font-light" style={{ color: 'var(--theme-text-muted)' }}>
                {story.story}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
