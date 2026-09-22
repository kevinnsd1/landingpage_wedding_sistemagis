import React from 'react';
import { SectionType } from '@/types/invitation';
import { SectionComponentProps, ThemeSectionOverrides } from './types';
import {
  CoupleSection,
  StorySection,
  EventSection,
  GallerySection,
  GiftSection,
  RSVPSection,
  GuestbookSection,
  ClosingSection,
} from './sections';

interface SectionRendererProps {
  sectionType: SectionType;
  sectionProps: SectionComponentProps;
  /** Tema bisa override section tertentu dengan component kustom */
  overrides?: ThemeSectionOverrides;
}

/**
 * SectionRenderer — Memetakan SectionType ke komponen yang tepat.
 * Mendukung override per-tema untuk fleksibilitas maksimal.
 */
export function SectionRenderer({
  sectionType,
  sectionProps,
  overrides = {},
}: SectionRendererProps) {
  // Cek apakah tema memiliki override untuk section ini
  const OverrideComponent = overrides[sectionType];
  if (OverrideComponent) {
    return <OverrideComponent {...sectionProps} />;
  }

  // Default shared section components
  switch (sectionType) {
    case 'couple':
      return <CoupleSection wedding={sectionProps.wedding} />;

    case 'story':
      return <StorySection wedding={sectionProps.wedding} />;

    case 'event':
      return <EventSection wedding={sectionProps.wedding} />;

    case 'gallery':
      return (
        <GallerySection
          images={sectionProps.galleryImages}
          onOpenLightbox={sectionProps.invitationState.openLightbox}
        />
      );

    case 'gift':
      return (
        <GiftSection
          wedding={sectionProps.wedding}
          invitationState={sectionProps.invitationState}
        />
      );

    case 'rsvp':
      return (
        <RSVPSection
          guest={sectionProps.guest}
          rsvpForm={sectionProps.rsvpForm}
        />
      );

    case 'guestbook':
      return <GuestbookSection guestbook={sectionProps.guestbook} />;

    case 'closing':
      return <ClosingSection wedding={sectionProps.wedding} />;

    // Sections handled directly in the theme component (e.g. cover, countdown)
    // or upcoming sections not yet implemented — skip silently
    case 'cover':
    case 'countdown':
    default:
      return null;
  }
}
