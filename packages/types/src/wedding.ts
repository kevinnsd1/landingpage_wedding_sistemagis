export interface WeddingEvent {
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  mapUrl?: string;
}

export interface LoveStory {
  id: string;
  year: string;
  title: string;
  story: string;
  image?: string;
}

export interface GiftAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  qrisUrl?: string;
}

export interface Wedding {
  id: string;
  ownerId: string;
  slug: string;
  title: string;
  groomName: string;
  groomParents: string;
  groomBio?: string;
  groomPhoto?: string;
  groomInstagram?: string;
  
  brideName: string;
  brideParents: string;
  brideBio?: string;
  bridePhoto?: string;
  brideInstagram?: string;
  
  weddingDate: string;
  status: 'draft' | 'published';
  coverPhoto?: string;
  
  akadEvent: WeddingEvent;
  receptionEvent: WeddingEvent;
  
  stories: LoveStory[];
  gifts: GiftAccount[];
  
  createdAt: string;
  updatedAt: string;
}
