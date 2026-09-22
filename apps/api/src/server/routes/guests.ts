import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { db } from '../../db/index.js';
import { guests } from '../../db/schema.js';
import { requireAuth, requireWeddingOwnership } from '../middleware/auth.js';
import { eq, and, desc } from 'drizzle-orm';
import crypto from 'crypto';

const guestsRoutes = new Hono();

guestsRoutes.use('*', requireAuth);
guestsRoutes.use('/:weddingId', requireWeddingOwnership);
guestsRoutes.use('/:weddingId/*', requireWeddingOwnership);

function formatGuest(g: any) {
  return {
    id: String(g.id),
    weddingId: String(g.weddingId),
    name: g.name,
    phone: g.phone || '',
    email: g.email || '',
    group: g.groupName || 'Sahabat',
    invitationToken: g.invitationToken || '',
    invitationStatus: g.invitationStatus || 'pending',
    rsvpStatus: g.rsvpStatus || 'pending',
    guestCount: g.guestCount || 1,
    createdAt: g.createdAt ? new Date(g.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: g.updatedAt ? new Date(g.updatedAt).toISOString() : new Date().toISOString(),
  };
}

const addGuestSchema = z.object({
  name: z.string().min(1),
  phone: z.string().optional(),
  email: z.string().optional(),
  group: z.string().optional(),
  guestCount: z.number().optional(),
});

guestsRoutes.get('/:weddingId', async (c) => {
  const weddingId = parseInt(c.req.param('weddingId'), 10);
  const list = await db.select().from(guests)
    .where(eq(guests.weddingId, weddingId))
    .orderBy(desc(guests.createdAt));

  return c.json(list.map(formatGuest));
});

guestsRoutes.post('/:weddingId', zValidator('json', addGuestSchema), async (c) => {
  const weddingId = parseInt(c.req.param('weddingId'), 10);
  const data = c.req.valid('json');

  const token = crypto.randomBytes(4).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

  const newGuest = await db.insert(guests).values({
    weddingId,
    name: data.name,
    phone: data.phone || '',
    email: data.email || '',
    groupName: data.group || 'Sahabat',
    invitationToken: token,
    tokenHash,
    status: 'pending',
    invitationStatus: 'pending',
    rsvpStatus: 'pending',
    guestCount: data.guestCount || 1,
  }).returning();

  return c.json(formatGuest(newGuest[0]), 201);
});

guestsRoutes.patch('/:weddingId/:guestId', async (c) => {
  const weddingId = parseInt(c.req.param('weddingId'), 10);
  const guestId = parseInt(c.req.param('guestId'), 10);
  const body = await c.req.json();

  const updateFields: any = {
    updatedAt: new Date(),
  };
  if (body.name !== undefined) updateFields.name = body.name;
  if (body.phone !== undefined) updateFields.phone = body.phone;
  if (body.email !== undefined) updateFields.email = body.email;
  if (body.group !== undefined) updateFields.groupName = body.group;
  if (body.invitationStatus !== undefined) updateFields.invitationStatus = body.invitationStatus;
  if (body.rsvpStatus !== undefined) updateFields.rsvpStatus = body.rsvpStatus;
  if (body.guestCount !== undefined) updateFields.guestCount = body.guestCount;

  const updated = await db.update(guests)
    .set(updateFields)
    .where(and(eq(guests.id, guestId), eq(guests.weddingId, weddingId)))
    .returning();

  if (updated.length === 0) {
    return c.json({ error: 'Tamu tidak ditemukan' }, 404);
  }

  return c.json(formatGuest(updated[0]));
});

guestsRoutes.delete('/:weddingId/:guestId', async (c) => {
  const weddingId = parseInt(c.req.param('weddingId'), 10);
  const guestId = parseInt(c.req.param('guestId'), 10);

  await db.delete(guests).where(and(eq(guests.id, guestId), eq(guests.weddingId, weddingId)));
  return c.json({ success: true });
});

export default guestsRoutes;
