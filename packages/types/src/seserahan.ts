export type SeserahanRecipient = 'groom_to_bride' | 'bride_to_groom';

export type SeserahanStatus = 'planned' | 'purchased' | 'decorating' | 'ready';

export interface SeserahanItem {
  id: string;
  weddingId: string;
  boxNumber: number; // e.g. 1, 2, 3...
  boxName: string; // e.g. "Set Perhiasan & Mahar", "Perlengkapan Ibadah"
  recipient: SeserahanRecipient;
  title: string;
  category: string;
  estimatedCost: number;
  actualCost: number;
  status: SeserahanStatus;
  vendor?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SeserahanBox {
  id: string;
  weddingId: string;
  name: string;
  category?: string;
  recipient: SeserahanRecipient;
  status: SeserahanStatus;
  estimatedCost: number;
  vendor?: string;
  notes?: string;
  items?: SeserahanItem[];
}

export interface SeserahanBoxSummary {
  boxNumber: number;
  boxName: string;
  recipient: SeserahanRecipient;
  items: SeserahanItem[];
  totalEstimated: number;
  totalActual: number;
  isReady: boolean;
}
