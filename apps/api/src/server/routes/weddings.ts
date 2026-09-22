import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { db } from '../../db/index.js';
import { weddings, invitations, rsvps, guestbook } from '../../db/schema.js';
import { requireAuth, requireWeddingOwnership } from '../middleware/auth.js';
import { eq, desc } from 'drizzle-orm';
import { invitationConfigSchema } from '@kisahmagis/validation';

type Variables = {
  userId: number;
  wedding: any;
};

const weddingsRoutes = new Hono<{ Variables: Variables }>();

weddingsRoutes.use('*', requireAuth);

export function formatWeddingResponse(w: any) {
  const details = w.details || {};
  return {
    id: String(w.id),
    ownerId: String(w.ownerId),
    slug: w.slug,
    title: w.title || `The Wedding of ${w.groomName || 'Pengantin'} & ${w.brideName || 'Pengantin'}`,
    groomName: w.groomName || '',
    groomParents: details.groomParents || '',
    groomBio: details.groomBio || '',
    groomPhoto: details.groomPhoto || '',
    groomInstagram: details.groomInstagram || '',
    brideName: w.brideName || '',
    brideParents: details.brideParents || '',
    brideBio: details.brideBio || '',
    bridePhoto: details.bridePhoto || '',
    brideInstagram: details.brideInstagram || '',
    weddingDate: w.weddingDate ? new Date(w.weddingDate).toISOString() : '',
    status: w.status || 'draft',
    coverPhoto: details.coverPhoto || '',
    akadEvent: details.akadEvent || {
      title: 'Akad Nikah',
      date: 'Akan Datang',
      time: '08:00 WIB',
      venue: 'Lokasi Akad',
      address: 'Alamat lengkap akad',
    },
    receptionEvent: details.receptionEvent || {
      title: 'Resepsi Pernikahan',
      date: 'Akan Datang',
      time: '11:00 WIB',
      venue: 'Lokasi Resepsi',
      address: 'Alamat lengkap resepsi',
    },
    stories: details.stories || [],
    gifts: details.gifts || [],
    createdAt: w.createdAt ? new Date(w.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: w.updatedAt ? new Date(w.updatedAt).toISOString() : new Date().toISOString(),
  };
}

// Get user's weddings
weddingsRoutes.get('/', async (c) => {
  const userId = c.get('userId');
  const userWeddings = await db.select().from(weddings).where(eq(weddings.ownerId, userId));
  return c.json(userWeddings.map(formatWeddingResponse));
});

// Single wedding routes require ownership middleware
const singleWedding = new Hono<{ Variables: Variables }>();
singleWedding.use('/:weddingId', requireWeddingOwnership);
singleWedding.use('/:weddingId/*', requireWeddingOwnership);

singleWedding.get('/:weddingId', async (c) => {
  const wedding = c.get('wedding');
  return c.json(formatWeddingResponse(wedding));
});

singleWedding.patch('/:weddingId', async (c) => {
  const weddingId = parseInt(c.req.param('weddingId'), 10);
  const body = await c.req.json();

  const currentWedding = c.get('wedding');
  const existingDetails = currentWedding.details || {};

  const updatedDetails = {
    ...existingDetails,
    ...(body.groomParents !== undefined && { groomParents: body.groomParents }),
    ...(body.groomBio !== undefined && { groomBio: body.groomBio }),
    ...(body.groomPhoto !== undefined && { groomPhoto: body.groomPhoto }),
    ...(body.groomInstagram !== undefined && { groomInstagram: body.groomInstagram }),
    ...(body.brideParents !== undefined && { brideParents: body.brideParents }),
    ...(body.brideBio !== undefined && { brideBio: body.brideBio }),
    ...(body.bridePhoto !== undefined && { bridePhoto: body.bridePhoto }),
    ...(body.brideInstagram !== undefined && { brideInstagram: body.brideInstagram }),
    ...(body.coverPhoto !== undefined && { coverPhoto: body.coverPhoto }),
    ...(body.akadEvent !== undefined && { akadEvent: body.akadEvent }),
    ...(body.receptionEvent !== undefined && { receptionEvent: body.receptionEvent }),
    ...(body.stories !== undefined && { stories: body.stories }),
    ...(body.gifts !== undefined && { gifts: body.gifts }),
  };

  const updateFields: any = {
    details: updatedDetails,
    updatedAt: new Date(),
  };

  if (body.title !== undefined) updateFields.title = body.title;
  if (body.groomName !== undefined) updateFields.groomName = body.groomName;
  if (body.brideName !== undefined) updateFields.brideName = body.brideName;
  if (body.weddingDate !== undefined) updateFields.weddingDate = body.weddingDate ? new Date(body.weddingDate) : null;
  if (body.status !== undefined) updateFields.status = body.status;
  if (body.slug !== undefined) updateFields.slug = body.slug;

  const updated = await db.update(weddings)
    .set(updateFields)
    .where(eq(weddings.id, weddingId))
    .returning();

  return c.json(formatWeddingResponse(updated[0]));
});

// Invitation routes for wedding
singleWedding.get('/:weddingId/invitation', async (c) => {
  const weddingId = parseInt(c.req.param('weddingId'), 10);
  const invList = await db.select().from(invitations).where(eq(invitations.weddingId, weddingId));
  const inv = invList[0];
  if (!inv) {
    return c.json({ error: 'Undangan belum dibuat' }, 404);
  }
  return c.json({
    id: String(inv.id),
    weddingId: String(inv.weddingId),
    status: inv.status,
    updatedAt: inv.updatedAt ? new Date(inv.updatedAt).toISOString() : new Date().toISOString(),
    config: inv.config,
  });
});

singleWedding.patch('/:weddingId/invitation', async (c) => {
  const weddingId = parseInt(c.req.param('weddingId'), 10);
  const body = await c.req.json();

  const updateFields: any = {
    updatedAt: new Date(),
  };

  if (body.config !== undefined) {
    const parseResult = invitationConfigSchema.safeParse(body.config);
    if (!parseResult.success) {
      return c.json({
        error: 'Format konfigurasi tema atau seksi undangan tidak valid',
        details: parseResult.error.flatten(),
      }, 400);
    }
    updateFields.config = parseResult.data;
    if (parseResult.data.themeId) {
      updateFields.themeId = parseResult.data.themeId;
    }
  }

  if (body.status !== undefined) updateFields.status = body.status;
  if (body.themeId !== undefined && updateFields.themeId === undefined) updateFields.themeId = body.themeId;

  const updated = await db.update(invitations)
    .set(updateFields)
    .where(eq(invitations.weddingId, weddingId))
    .returning();

  const inv = updated[0];
  return c.json({
    id: String(inv.id),
    weddingId: String(inv.weddingId),
    status: inv.status,
    updatedAt: inv.updatedAt ? new Date(inv.updatedAt).toISOString() : new Date().toISOString(),
    config: inv.config,
  });
});

// RSVPs and Guestbook for wedding owner dashboard
singleWedding.get('/:weddingId/rsvps', async (c) => {
  const weddingId = parseInt(c.req.param('weddingId'), 10);
  const list = await db.select().from(rsvps)
    .where(eq(rsvps.weddingId, weddingId))
    .orderBy(desc(rsvps.submittedAt));

  return c.json(list.map(r => ({
    id: String(r.id),
    weddingId: String(r.weddingId),
    guestId: r.guestId ? String(r.guestId) : undefined,
    name: r.name || 'Tamu',
    attendance: r.attendance,
    guestCount: r.guestCount || 1,
    message: r.message || '',
    submittedAt: r.submittedAt ? new Date(r.submittedAt).toISOString() : new Date().toISOString(),
  })));
});

singleWedding.get('/:weddingId/guestbook', async (c) => {
  const weddingId = parseInt(c.req.param('weddingId'), 10);
  const list = await db.select().from(guestbook)
    .where(eq(guestbook.weddingId, weddingId))
    .orderBy(desc(guestbook.createdAt));

  return c.json(list.map(g => ({
    id: String(g.id),
    weddingId: String(g.weddingId),
    guestName: g.guestName,
    message: g.message,
    isApproved: g.isApproved,
    createdAt: g.createdAt ? new Date(g.createdAt).toISOString() : new Date().toISOString(),
  })));
});

singleWedding.delete('/:weddingId/guestbook/:id', async (c) => {
  const weddingId = parseInt(c.req.param('weddingId'), 10);
  const id = parseInt(c.req.param('id'), 10);

  await db.delete(guestbook).where(eq(guestbook.id, id));
  return c.json({ success: true });
});

weddingsRoutes.route('/', singleWedding);

export default weddingsRoutes;
