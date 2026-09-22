export type GuestGroup = 'Keluarga' | 'Sahabat' | 'Rekan Kerja' | 'VIP' | 'Lainnya';
export type InvitationStatus = 'pending' | 'sent' | 'viewed';
export type RsvpStatus = 'attending' | 'declined' | 'pending';

export interface Guest {
  id: string;
  weddingId: string;
  name: string;
  phone?: string;
  email?: string;
  group: GuestGroup;
  invitationToken: string;
  invitationStatus: InvitationStatus;
  rsvpStatus: RsvpStatus;
  guestCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface RSVP {
  id: string;
  weddingId: string;
  guestId?: string;
  name: string;
  attendance: 'attending' | 'declined';
  guestCount: number;
  message: string;
  submittedAt: string;
}

export interface GuestbookEntry {
  id: string;
  weddingId: string;
  guestName: string;
  message: string;
  isApproved: boolean;
  createdAt: string;
}
