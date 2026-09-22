export type BudgetCategory = 
  | 'Venue & Katering'
  | 'Dekorasi'
  | 'Foto & Video'
  | 'Busana & Rias'
  | 'Undangan & Souvenir'
  | 'Hiburan & Sound'
  | 'Akad / Pemberkatan'
  | 'Lain-lain';

export type PaymentStatus = 'paid' | 'unpaid' | 'partial';

export interface BudgetItem {
  id: string;
  weddingId: string;
  category: BudgetCategory;
  name: string;
  estimatedCost: number;
  actualCost: number;
  paidAmount: number;
  paymentStatus: PaymentStatus;
  vendorId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
