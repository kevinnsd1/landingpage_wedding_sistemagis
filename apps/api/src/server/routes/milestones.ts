import { Hono } from 'hono';
import { db } from '../../db/index.js';
import { weddingMilestones } from '../../db/schema.js';
import { requireAuth, requireWeddingOwnership } from '../middleware/auth.js';
import { eq, asc } from 'drizzle-orm';

const milestonesRoutes = new Hono();

milestonesRoutes.use('*', requireAuth);
milestonesRoutes.use('/:weddingId', requireWeddingOwnership);
milestonesRoutes.use('/:weddingId/*', requireWeddingOwnership);

milestonesRoutes.get('/:weddingId', async (c) => {
  const weddingId = parseInt(c.req.param('weddingId'), 10);
  const milestones = await db.select().from(weddingMilestones)
    .where(eq(weddingMilestones.weddingId, weddingId))
    .orderBy(asc(weddingMilestones.date));

  return c.json(milestones.map(m => ({
    id: String(m.id),
    title: m.title,
    date: m.date ? new Date(m.date).toISOString().split('T')[0] : '',
    time: m.time || '',
    location: m.location || '',
    category: m.category,
    description: m.description || '',
    isCompleted: m.isCompleted,
    pic: m.pic || '',
  })));
});

milestonesRoutes.post('/:weddingId', async (c) => {
  const weddingId = parseInt(c.req.param('weddingId'), 10);
  const body = await c.req.json();

  const [newMilestone] = await db.insert(weddingMilestones).values({
    weddingId,
    title: body.title,
    date: body.date ? new Date(body.date) : null,
    time: body.time || null,
    location: body.location || null,
    category: body.category || 'lainnya',
    description: body.description || null,
    isCompleted: body.isCompleted || false,
    pic: body.pic || null,
  }).returning();

  return c.json({
    id: String(newMilestone.id),
    title: newMilestone.title,
    date: newMilestone.date ? new Date(newMilestone.date).toISOString().split('T')[0] : '',
    time: newMilestone.time || '',
    location: newMilestone.location || '',
    category: newMilestone.category,
    description: newMilestone.description || '',
    isCompleted: newMilestone.isCompleted,
    pic: newMilestone.pic || '',
  }, 201);
});

milestonesRoutes.patch('/:weddingId/:id', async (c) => {
  const id = parseInt(c.req.param('id'), 10);
  const body = await c.req.json();

  const updateFields: any = { updatedAt: new Date() };
  if (body.title !== undefined) updateFields.title = body.title;
  if (body.date !== undefined) updateFields.date = body.date ? new Date(body.date) : null;
  if (body.time !== undefined) updateFields.time = body.time;
  if (body.location !== undefined) updateFields.location = body.location;
  if (body.category !== undefined) updateFields.category = body.category;
  if (body.description !== undefined) updateFields.description = body.description;
  if (body.isCompleted !== undefined) updateFields.isCompleted = body.isCompleted;
  if (body.pic !== undefined) updateFields.pic = body.pic;

  const [updated] = await db.update(weddingMilestones)
    .set(updateFields)
    .where(eq(weddingMilestones.id, id))
    .returning();

  if (!updated) return c.json({ error: 'Milestone not found' }, 404);

  return c.json({
    id: String(updated.id),
    title: updated.title,
    date: updated.date ? new Date(updated.date).toISOString().split('T')[0] : '',
    time: updated.time || '',
    location: updated.location || '',
    category: updated.category,
    description: updated.description || '',
    isCompleted: updated.isCompleted,
    pic: updated.pic || '',
  });
});

milestonesRoutes.delete('/:weddingId/:id', async (c) => {
  const id = parseInt(c.req.param('id'), 10);
  await db.delete(weddingMilestones).where(eq(weddingMilestones.id, id));
  return c.json({ success: true });
});

export default milestonesRoutes;
