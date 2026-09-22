import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(1, 'Password harus diisi').optional(),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  weddingSlug: z.string()
    .min(3, 'Slug minimal 3 karakter')
    .max(30, 'Slug maksimal 30 karakter')
    .regex(/^[a-z0-9-]+$/, 'Slug hanya boleh huruf kecil, angka, dan tanda hubung (-)'),
});

export const rsvpSchema = z.object({
  weddingId: z.union([z.number(), z.string()]).optional(),
  guestToken: z.string().optional(),
  name: z.string().min(1, 'Nama harus diisi'),
  attendance: z.enum(['attending', 'declined', 'Hadir', 'Tidak Hadir']),
  guestCount: z.number().int().min(1).max(20).default(1),
  message: z.string().optional(),
});

export const guestSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  phone: z.string().optional(),
  email: z.string().email('Format email tidak valid').optional().or(z.literal('')),
  group: z.enum(['Keluarga', 'Sahabat', 'Rekan Kerja', 'VIP', 'Lainnya']),
  guestCount: z.number().int().min(1).default(1),
});

export const addGuestSchema = guestSchema;

export const plannerTaskSchema = z.object({
  title: z.string().min(2, 'Judul tugas minimal 2 karakter'),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']),
  category: z.string().default('Umum'),
  dueDate: z.string().optional(),
  columnId: z.enum(['todo', 'in_progress', 'done']),
});

export const budgetItemSchema = z.object({
  category: z.enum([
    'Venue & Katering',
    'Dekorasi',
    'Foto & Video',
    'Busana & Rias',
    'Undangan & Souvenir',
    'Hiburan & Sound',
    'Akad / Pemberkatan',
    'Lain-lain',
  ]),
  name: z.string().min(2, 'Nama pos anggaran minimal 2 karakter'),
  estimatedCost: z.number().nonnegative(),
  actualCost: z.number().nonnegative().default(0),
  paidAmount: z.number().nonnegative().default(0),
  paymentStatus: z.enum(['paid', 'unpaid', 'partial']),
  notes: z.string().optional(),
});

export const vendorSchema = z.object({
  name: z.string().min(2, 'Nama vendor minimal 2 karakter'),
  category: z.enum([
    'Venue',
    'Catering',
    'Decoration',
    'Photography',
    'Videography',
    'Attire & Makeup',
    'Wedding Organizer',
    'Entertainment',
    'Invitation & Souvenir',
    'Other',
  ]),
  contactPerson: z.string().optional(),
  phone: z.string().min(8, 'Nomor kontak minimal 8 digit'),
  instagram: z.string().optional(),
  cost: z.number().nonnegative().default(0),
  status: z.enum(['researching', 'contacted', 'booked', 'completed']),
  notes: z.string().optional(),
});

export const createWeddingSchema = z.object({
  slug: z.string().min(3),
  title: z.string().optional(),
  groomName: z.string().optional(),
  brideName: z.string().optional(),
  weddingDate: z.string().optional(),
});

export const updateWeddingSchema = z.object({
  title: z.string().optional(),
  groomName: z.string().optional(),
  brideName: z.string().optional(),
  weddingDate: z.string().optional(),
  status: z.string().optional(),
  slug: z.string().optional(),
});

export const themeColorsSchema = z.object({
  primary: z.string().min(3),
  secondary: z.string().min(3),
  background: z.string().min(3),
  accent: z.string().optional(),
});

export const themeFontsSchema = z.object({
  heading: z.string().min(1),
  body: z.string().min(1),
});

export const sectionConfigSchema = z.object({
  type: z.enum([
    'cover',
    'couple',
    'story',
    'event',
    'countdown',
    'gallery',
    'gift',
    'rsvp',
    'guestbook',
    'closing',
  ]),
  enabled: z.boolean(),
  order: z.number(),
});

export const galleryImageSchema = z.object({
  id: z.string(),
  url: z.string().min(1),
  caption: z.string().optional(),
  category: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

export const invitationConfigSchema = z.object({
  themeId: z.enum(['serenity', 'bloom', 'aurora']),
  themeVersion: z.string().default('1.0.0'),
  colors: themeColorsSchema,
  fonts: themeFontsSchema,
  sections: z.array(sectionConfigSchema),
  music: z.object({
    enabled: z.boolean(),
    title: z.string(),
    artist: z.string(),
    url: z.string(),
  }),
  gallery: z.object({
    layout: z.enum(['grid', 'masonry']).default('masonry'),
    images: z.array(galleryImageSchema),
  }),
  quote: z.object({
    text: z.string(),
    source: z.string().optional(),
  }).optional(),
});

export type InvitationConfigInput = z.infer<typeof invitationConfigSchema>;

