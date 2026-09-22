import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { setCookie, deleteCookie, getCookie } from 'hono/cookie';
import bcrypt from 'bcryptjs';
import { db } from '../../db/index.js';
import { users, sessions, weddings, invitations } from '../../db/schema.js';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';
import { seedDemoData } from '../seed.js';

const auth = new Hono();

async function createSession(c: any, userId: number) {
  const sessionId = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days

  await db.insert(sessions).values({
    id: sessionId,
    userId,
    expiresAt,
  });

  setCookie(c, 'session_id', sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    expires: expiresAt,
    path: '/',
  });

  return sessionId;
}

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  weddingSlug: z.string().min(3).optional(),
});

auth.post('/register', zValidator('json', registerSchema), async (c) => {
  const { name, email, password, weddingSlug } = c.req.valid('json');

  const existingUser = await db.select().from(users).where(eq(users.email, email));
  if (existingUser.length > 0) {
    return c.json({ error: 'Email sudah terdaftar' }, 400);
  }

  const slug = (weddingSlug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-')).toLowerCase().trim();
  const existingSlug = await db.select().from(weddings).where(eq(weddings.slug, slug));
  if (existingSlug.length > 0) {
    return c.json({ error: 'Link / slug pernikahan sudah digunakan oleh pasangan lain.' }, 400);
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = await db.insert(users).values({
    name,
    email,
    passwordHash,
  }).returning();
  const user = newUser[0];

  // Create wedding
  const newWedding = await db.insert(weddings).values({
    ownerId: user.id,
    slug,
    title: `The Wedding of ${name}`,
    groomName: name.split('&')[0]?.trim() || 'Mempelai Pria',
    brideName: name.split('&')[1]?.trim() || 'Mempelai Wanita',
    weddingDate: null,
    status: 'draft',
    details: {
      groomParents: '',
      brideParents: '',
      akadEvent: {
        title: 'Akad Nikah',
        date: '',
        time: '',
        venue: '',
        address: '',
      },
      receptionEvent: {
        title: 'Resepsi Pernikahan',
        date: '',
        time: '',
        venue: '',
        address: '',
      },
      stories: [],
      gifts: [],
    },
  }).returning();
  const wedding = newWedding[0];

  // Create default invitation
  await db.insert(invitations).values({
    weddingId: wedding.id,
    themeId: 'serenity',
    themeVersion: '1.0.0',
    config: {
      themeId: 'serenity',
      themeVersion: '1.0.0',
      colors: {
        primary: '#FCBACB',
        secondary: '#FC9FB1',
        background: '#FCFCFC',
        accent: '#FFEAAB',
      },
      fonts: {
        heading: 'Quintessential',
        body: 'Inter',
      },
      sections: [
        { type: 'cover', enabled: true, order: 1 },
        { type: 'couple', enabled: true, order: 2 },
        { type: 'story', enabled: true, order: 3 },
        { type: 'event', enabled: true, order: 4 },
        { type: 'countdown', enabled: true, order: 5 },
        { type: 'gallery', enabled: true, order: 6 },
        { type: 'gift', enabled: true, order: 7 },
        { type: 'rsvp', enabled: true, order: 8 },
        { type: 'guestbook', enabled: true, order: 9 },
        { type: 'closing', enabled: true, order: 10 },
      ],
      music: {
        enabled: true,
        title: 'A Thousand Years (Acoustic)',
        artist: 'KisahMagis Instrumental Ensemble',
        url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-113222.mp3',
      },
      gallery: { layout: 'masonry', images: [] },
    },
    status: 'draft',
  });

  await createSession(c, user.id);

  return c.json({
    message: 'User registered successfully',
    user: { id: user.id, name: user.name, email: user.email },
    wedding,
  }, 201);
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().optional(),
});

auth.post('/login', zValidator('json', loginSchema), async (c) => {
  const { email, password } = c.req.valid('json');

  const userList = await db.select().from(users).where(eq(users.email, email));
  const user = userList[0];

  if (!user) {
    return c.json({ error: 'Email atau kata sandi tidak cocok.' }, 401);
  }

  if (password) {
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return c.json({ error: 'Email atau kata sandi tidak cocok.' }, 401);
    }
  }

  await createSession(c, user.id);

  const userWeddings = await db.select().from(weddings).where(eq(weddings.ownerId, user.id));
  const wedding = userWeddings[0] || null;

  return c.json({
    message: 'Logged in successfully',
    user: { id: user.id, name: user.name, email: user.email },
    wedding,
  });
});

auth.post('/demo', async (c) => {
  const { user, wedding } = await seedDemoData(false);
  await createSession(c, user.id);

  return c.json({
    message: 'Logged in with demo account',
    user: { id: user.id, name: user.name, email: user.email },
    wedding,
  });
});

auth.post('/reset', async (c) => {
  const { user, wedding } = await seedDemoData(true);
  await createSession(c, user.id);

  return c.json({
    message: 'Demo data reset successfully',
    user: { id: user.id, name: user.name, email: user.email },
    wedding,
  });
});

auth.get('/me', async (c) => {
  const sessionId = getCookie(c, 'session_id');
  if (!sessionId) {
    return c.json({ user: null, wedding: null });
  }

  const sessionList = await db.select().from(sessions).where(eq(sessions.id, sessionId));
  const session = sessionList[0];

  if (!session || session.expiresAt < new Date()) {
    return c.json({ user: null, wedding: null });
  }

  const userList = await db.select().from(users).where(eq(users.id, session.userId));
  const user = userList[0];

  if (!user) {
    return c.json({ user: null, wedding: null });
  }

  const userWeddings = await db.select().from(weddings).where(eq(weddings.ownerId, user.id));
  const wedding = userWeddings[0] || null;

  return c.json({
    user: { id: user.id, name: user.name, email: user.email },
    wedding,
  });
});

auth.post('/logout', async (c) => {
  const sessionId = getCookie(c, 'session_id');
  if (sessionId) {
    await db.delete(sessions).where(eq(sessions.id, sessionId));
  }
  deleteCookie(c, 'session_id', { path: '/' });
  return c.json({ message: 'Logged out successfully' });
});

export default auth;
