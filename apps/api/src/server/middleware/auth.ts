import { Context, Next } from 'hono';
import { getCookie } from 'hono/cookie';
import { db } from '../../db/index.js';
import { sessions, weddings } from '../../db/schema.js';
import { eq, and } from 'drizzle-orm';

export async function requireAuth(c: Context, next: Next) {
  const sessionId = getCookie(c, 'session_id');
  if (!sessionId) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const sessionList = await db.select().from(sessions).where(eq(sessions.id, sessionId));
  const session = sessionList[0];

  if (!session || session.expiresAt < new Date()) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  // Attach user to context
  c.set('userId', session.userId);
  await next();
}

export async function requireWeddingOwnership(c: Context, next: Next) {
  // Try to get weddingId from param
  const weddingIdParam = c.req.param('weddingId');
  if (!weddingIdParam) {
    return c.json({ error: 'Bad Request: Missing weddingId' }, 400);
  }

  const weddingId = parseInt(weddingIdParam, 10);
  if (isNaN(weddingId)) {
    return c.json({ error: 'Bad Request: Invalid weddingId' }, 400);
  }

  const userId = c.get('userId');
  if (!userId) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const weddingList = await db.select().from(weddings).where(eq(weddings.id, weddingId));
  const wedding = weddingList[0];

  if (!wedding) {
    // Return 404 so we don't confirm existence
    return c.json({ error: 'Not Found' }, 404);
  }

  if (wedding.ownerId !== userId) {
    return c.json({ error: 'Forbidden' }, 403);
  }

  // Attach wedding to context for downstream handlers
  c.set('wedding', wedding);
  await next();
}
