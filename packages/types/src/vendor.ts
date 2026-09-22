export type VendorCategory = 
  | 'Venue'
  | 'Catering'
  | 'Decoration'
  | 'Photography'
  | 'Videography'
  | 'Attire & Makeup'
  | 'Wedding Organizer'
  | 'Entertainment'
  | 'Invitation & Souvenir'
  | 'Other';

export type VendorStatus = 'researching' | 'contacted' | 'booked' | 'completed';

export interface Vendor {
  id: string;
  weddingId: string;
  name: string;
  category: VendorCategory;
  contactPerson?: string;
  phone: string;
  instagram?: string;
  cost: number;
  status: VendorStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
