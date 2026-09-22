import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { db } from '../../db/index.js';
import { weddings, invitations, guests, rsvps, guestbook } from '../../db/schema.js';
import { eq, and, desc } from 'drizzle-orm';
import crypto from 'crypto';

const publicRoutes = new Hono();

// Theme Catalog
publicRoutes.get('/themes', (c) => {
  return c.json([
    {
      id: 'serenity',
      version: '1.0.0',
      name: 'Serenity Theme',
      description: 'Keanggunan klasik dengan sentuhan floral soft pink, ornamen floral transparan, dan aksen hangat.',
      author: 'KisahMagis Team',
      previewColors: {
        primary: '#E07A5F',
        secondary: '#FCBACB',
        background: '#FAF8F5',
        accent: '#D4A373',
      },
      fonts: {
        heading: 'Cormorant Garamond, serif',
        body: 'Plus Jakarta Sans, sans-serif',
      },
      features: ['Floral Ornaments', 'Smooth Floating Audio', 'Envelope Opening Modal'],
    },
    {
      id: 'bloom',
      version: '1.0.0',
      name: 'Bloom Theme',
      description: 'Sentuhan nuansa botani organik hangat dengan palet sage green, botanical cards, dan nuansa garden party.',
      author: 'KisahMagis Team',
      previewColors: {
        primary: '#2D6A4F',
        secondary: '#B9DCA9',
        background: '#F4F7F4',
        accent: '#52B788',
      },
      fonts: {
        heading: 'Playfair Display, serif',
        body: 'Plus Jakarta Sans, sans-serif',
      },
      features: ['Botanical Motifs', 'Organic Soft Curves', 'Sage Minimalist Accents'],
    },
    {
      id: 'aurora',
      version: '1.0.0',
      name: 'Aurora Theme',
      description: 'Desain ultra modern editorial monokrom dengan kontras tegas, tipografi elegan, dan layout modern kontemporer.',
      author: 'KisahMagis Team',
      previewColors: {
        primary: '#1A1A1A',
        secondary: '#D4AF37',
        background: '#FAFAFA',
        accent: '#666666',
      },
      fonts: {
        heading: 'Cinzel, serif',
        body: 'Inter, sans-serif',
      },
      features: ['Editorial Monochromatic', 'Gold Luxury Highlights', 'Geometric Layouts'],
    },
  ]);
});

// Helper to format wedding object to match frontend Wedding type
function formatWedding(w: any) {
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

// Get public invitation by slug
publicRoutes.get('/invitation/:slug', async (c) => {
  const slug = c.req.param('slug');
  const token = c.req.query('to');

  const weddingList = await db.select().from(weddings).where(eq(weddings.slug, slug));
  const wedding = weddingList[0];

  if (!wedding) {
    return c.json({ error: 'Undangan tidak ditemukan' }, 404);
  }

  const invitationList = await db.select().from(invitations).where(eq(invitations.weddingId, wedding.id));
  const invitation = invitationList[0];

  let guestInfo = null;

  if (token) {
    const tokenHash = crypto.createHash('sha256').update(token.trim()).digest('hex');
    const guestList = await db.select().from(guests).where(
      and(
        eq(guests.weddingId, wedding.id),
        eq(guests.tokenHash, tokenHash)
      )
    );
    if (guestList.length > 0) {
      const g = guestList[0];
      guestInfo = {
        id: String(g.id),
        weddingId: String(g.weddingId),
        name: g.name,
        phone: g.phone,
        email: g.email,
        group: g.groupName || 'Sahabat',
        invitationToken: g.invitationToken,
        invitationStatus: g.invitationStatus || 'viewed',
        rsvpStatus: g.rsvpStatus || 'pending',
        guestCount: g.guestCount || 1,
      };

      // Auto update status to viewed
      if (g.invitationStatus === 'pending') {
        await db.update(guests)
          .set({ invitationStatus: 'viewed', status: 'viewed', updatedAt: new Date() })
          .where(eq(guests.id, g.id));
      }
    }
  }

  // Fetch guestbook & rsvps
  const gbList = await db.select().from(guestbook)
    .where(and(eq(guestbook.weddingId, wedding.id), eq(guestbook.isApproved, true)))
    .orderBy(desc(guestbook.createdAt));

  const rsvpList = await db.select().from(rsvps)
    .where(eq(rsvps.weddingId, wedding.id))
    .orderBy(desc(rsvps.submittedAt));

  return c.json({
    wedding: formatWedding(wedding),
    invitation: invitation ? {
      id: String(invitation.id),
      weddingId: String(invitation.weddingId),
      status: invitation.status,
      updatedAt: invitation.updatedAt ? new Date(invitation.updatedAt).toISOString() : new Date().toISOString(),
      config: invitation.config,
    } : null,
    guest: guestInfo,
    guestbook: gbList.map(g => ({
      id: String(g.id),
      weddingId: String(g.weddingId),
      guestName: g.guestName,
      message: g.message,
      isApproved: g.isApproved,
      createdAt: g.createdAt ? new Date(g.createdAt).toISOString() : new Date().toISOString(),
    })),
    rsvps: rsvpList.map(r => ({
      id: String(r.id),
      weddingId: String(r.weddingId),
      guestId: r.guestId ? String(r.guestId) : undefined,
      name: r.name || 'Tamu',
      attendance: r.attendance as 'attending' | 'declined',
      guestCount: r.guestCount || 1,
      message: r.message || '',
      submittedAt: r.submittedAt ? new Date(r.submittedAt).toISOString() : new Date().toISOString(),
    })),
  });
});

const rsvpSchema = z.object({
  weddingId: z.union([z.number(), z.string()]),
  guestToken: z.string().optional(),
  name: z.string().min(1),
  attendance: z.enum(['attending', 'declined', 'Hadir', 'Tidak Hadir']),
  guestCount: z.number().min(1).max(20).default(1),
  message: z.string().optional(),
});

// Submit RSVP
publicRoutes.post('/rsvp', zValidator('json', rsvpSchema), async (c) => {
  const data = c.req.valid('json');
  const weddingId = typeof data.weddingId === 'string' ? parseInt(data.weddingId, 10) : data.weddingId;
  const attendance = (data.attendance === 'Hadir' || data.attendance === 'attending') ? 'attending' : 'declined';

  let guestId: number | undefined = undefined;

  if (data.guestToken) {
    const tokenHash = crypto.createHash('sha256').update(data.guestToken.trim()).digest('hex');
    const guestList = await db.select().from(guests).where(
      and(
        eq(guests.weddingId, weddingId),
        eq(guests.tokenHash, tokenHash)
      )
    );
    if (guestList.length > 0) {
      guestId = guestList[0].id;
      // Update guest RSVP status
      await db.update(guests)
        .set({
          rsvpStatus: attendance,
          guestCount: data.guestCount,
          invitationStatus: 'viewed',
          status: 'replied',
          updatedAt: new Date(),
        })
        .where(eq(guests.id, guestId));
    }
  }

  // Insert RSVP
  const newRsvp = await db.insert(rsvps).values({
    weddingId,
    guestId,
    name: data.name,
    attendance,
    guestCount: data.guestCount,
    message: data.message || '',
  }).returning();

  // If message provided, also add to guestbook
  if (data.message && data.message.trim()) {
    await db.insert(guestbook).values({
      weddingId,
      guestName: data.name,
      message: data.message.trim(),
      isApproved: true,
    });
  }

  return c.json({
    message: 'RSVP berhasil dikirim',
    rsvp: {
      id: String(newRsvp[0].id),
      weddingId: String(newRsvp[0].weddingId),
      guestId: guestId ? String(guestId) : undefined,
      name: newRsvp[0].name || data.name,
      attendance,
      guestCount: data.guestCount,
      message: data.message || '',
      submittedAt: new Date().toISOString(),
    },
  });
});

export default publicRoutes;
