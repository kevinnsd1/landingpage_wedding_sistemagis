import { pgTable, serial, varchar, timestamp, text, integer, jsonb, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const sessions = pgTable('sessions', {
  id: varchar('id', { length: 255 }).primaryKey(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  expiresAt: timestamp('expires_at').notNull(),
});

export const weddings = pgTable('weddings', {
  id: serial('id').primaryKey(),
  ownerId: integer('owner_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  title: varchar('title', { length: 255 }),
  groomName: varchar('groom_name', { length: 255 }),
  brideName: varchar('bride_name', { length: 255 }),
  weddingDate: timestamp('wedding_date'),
  status: varchar('status', { length: 50 }).default('draft'),
  details: jsonb('details').default({}),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const invitations = pgTable('invitations', {
  id: serial('id').primaryKey(),
  weddingId: integer('wedding_id').references(() => weddings.id, { onDelete: 'cascade' }).notNull(),
  themeId: varchar('theme_id', { length: 100 }).notNull(),
  themeVersion: varchar('theme_version', { length: 50 }).notNull(),
  config: jsonb('config').default({}),
  status: varchar('status', { length: 50 }).default('draft'),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const guests = pgTable('guests', {
  id: serial('id').primaryKey(),
  weddingId: integer('wedding_id').references(() => weddings.id, { onDelete: 'cascade' }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  email: varchar('email', { length: 255 }),
  groupName: varchar('group_name', { length: 100 }).default('Sahabat'),
  invitationToken: varchar('invitation_token', { length: 100 }),
  tokenHash: text('token_hash').notNull().unique(),
  status: varchar('status', { length: 50 }).default('pending'),
  invitationStatus: varchar('invitation_status', { length: 50 }).default('pending'),
  rsvpStatus: varchar('rsvp_status', { length: 50 }).default('pending'),
  guestCount: integer('guest_count').default(1),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const rsvps = pgTable('rsvps', {
  id: serial('id').primaryKey(),
  weddingId: integer('wedding_id').references(() => weddings.id, { onDelete: 'cascade' }).notNull(),
  guestId: integer('guest_id').references(() => guests.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }),
  attendance: varchar('attendance', { length: 50 }).notNull(),
  guestCount: integer('guest_count').default(1),
  message: text('message'),
  submittedAt: timestamp('submitted_at').defaultNow().notNull(),
});

export const guestbook = pgTable('guestbook', {
  id: serial('id').primaryKey(),
  weddingId: integer('wedding_id').references(() => weddings.id, { onDelete: 'cascade' }).notNull(),
  guestName: varchar('guest_name', { length: 255 }).notNull(),
  message: text('message').notNull(),
  isApproved: boolean('is_approved').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const plannerBoards = pgTable('planner_boards', {
  id: serial('id').primaryKey(),
  weddingId: integer('wedding_id').references(() => weddings.id, { onDelete: 'cascade' }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const plannerColumns = pgTable('planner_columns', {
  id: serial('id').primaryKey(),
  boardId: integer('board_id').references(() => plannerBoards.id, { onDelete: 'cascade' }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  position: integer('position').default(0),
});

export const plannerTasks = pgTable('planner_tasks', {
  id: serial('id').primaryKey(),
  columnId: integer('column_id').references(() => plannerColumns.id, { onDelete: 'cascade' }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  priority: varchar('priority', { length: 50 }).default('medium'),
  category: varchar('category', { length: 100 }).default('Persiapan'),
  dueDate: timestamp('due_date'),
  position: integer('position').default(0),
  status: varchar('status', { length: 50 }).default('todo'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const budgetItems = pgTable('budget_items', {
  id: serial('id').primaryKey(),
  weddingId: integer('wedding_id').references(() => weddings.id, { onDelete: 'cascade' }).notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  estimatedCost: integer('estimated_cost').default(0),
  actualCost: integer('actual_cost').default(0),
  paidAmount: integer('paid_amount').default(0),
  paymentStatus: varchar('payment_status', { length: 50 }).default('unpaid'),
  vendorId: varchar('vendor_id', { length: 100 }),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const vendors = pgTable('vendors', {
  id: serial('id').primaryKey(),
  weddingId: integer('wedding_id').references(() => weddings.id, { onDelete: 'cascade' }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  contact: varchar('contact', { length: 255 }),
  contactPerson: varchar('contact_person', { length: 255 }),
  phone: varchar('phone', { length: 50 }),
  instagram: varchar('instagram', { length: 100 }),
  cost: integer('cost').default(0),
  status: varchar('status', { length: 50 }).default('researching'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const weddingMilestones = pgTable('wedding_milestones', {
  id: serial('id').primaryKey(),
  weddingId: integer('wedding_id').references(() => weddings.id, { onDelete: 'cascade' }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  date: timestamp('date'),
  time: varchar('time', { length: 100 }),
  location: varchar('location', { length: 255 }),
  category: varchar('category', { length: 100 }).notNull(), // 'lamaran', 'pengajian', 'siraman', 'akad', 'resepsi', 'lainnya'
  description: text('description'),
  isCompleted: boolean('is_completed').default(false).notNull(),
  pic: varchar('pic', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const seserahanBoxes = pgTable('seserahan_boxes', {
  id: serial('id').primaryKey(),
  weddingId: integer('wedding_id').references(() => weddings.id, { onDelete: 'cascade' }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  category: varchar('category', { length: 100 }),
  recipient: varchar('recipient', { length: 50 }).notNull(), // 'groom_to_bride' | 'bride_to_groom'
  status: varchar('status', { length: 50 }).default('planned').notNull(), // 'planned', 'purchased', 'decorating', 'ready'
  estimatedCost: integer('estimated_cost').default(0),
  vendor: varchar('vendor', { length: 255 }),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const seserahanItems = pgTable('seserahan_items', {
  id: serial('id').primaryKey(),
  boxId: integer('box_id').references(() => seserahanBoxes.id, { onDelete: 'cascade' }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  estimatedCost: integer('estimated_cost').default(0),
  actualCost: integer('actual_cost').default(0),
  isPurchased: boolean('is_purchased').default(false).notNull(),
  notes: text('notes'),
});

export const packages = pgTable('packages', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(), // 'Free', 'Premium'
  price: integer('price').default(0),
  features: jsonb('features').default([]),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const themes = pgTable('themes', {
  id: varchar('id', { length: 100 }).primaryKey(), // e.g. 'cinematic'
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  isActive: boolean('is_active').default(true).notNull(),
  isCustom: boolean('is_custom').default(false).notNull(),
  packageId: integer('package_id').references(() => packages.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  weddings: many(weddings),
  sessions: many(sessions),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const weddingsRelations = relations(weddings, ({ one, many }) => ({
  owner: one(users, {
    fields: [weddings.ownerId],
    references: [users.id],
  }),
  invitation: one(invitations),
  guests: many(guests),
  rsvps: many(rsvps),
  boards: many(plannerBoards),
  budgetItems: many(budgetItems),
  vendors: many(vendors),
  milestones: many(weddingMilestones),
  seserahanBoxes: many(seserahanBoxes),
}));

export const seserahanBoxesRelations = relations(seserahanBoxes, ({ many }) => ({
  items: many(seserahanItems),
}));

export const seserahanItemsRelations = relations(seserahanItems, ({ one }) => ({
  box: one(seserahanBoxes, {
    fields: [seserahanItems.boxId],
    references: [seserahanBoxes.id],
  }),
}));

export const packagesRelations = relations(packages, ({ many }) => ({
  themes: many(themes),
}));

export const themesRelations = relations(themes, ({ one }) => ({
  package: one(packages, {
    fields: [themes.packageId],
    references: [packages.id],
  }),
}));

