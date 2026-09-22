import { Hono } from 'hono';
import { db } from '../../db/index.js';
import { budgetItems } from '../../db/schema.js';
import { requireAuth, requireWeddingOwnership } from '../middleware/auth.js';
import { eq, and, desc } from 'drizzle-orm';

const budgetRoutes = new Hono();

budgetRoutes.use('*', requireAuth);
budgetRoutes.use('/:weddingId', requireWeddingOwnership);
budgetRoutes.use('/:weddingId/*', requireWeddingOwnership);

function formatBudgetItem(b: any) {
  return {
    id: String(b.id),
    weddingId: String(b.weddingId),
    category: b.category,
    name: b.name,
    estimatedCost: b.estimatedCost || 0,
    actualCost: b.actualCost || 0,
    paidAmount: b.paidAmount || 0,
    paymentStatus: b.paymentStatus || 'unpaid',
    vendorId: b.vendorId || undefined,
    notes: b.notes || '',
    createdAt: b.createdAt ? new Date(b.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: b.updatedAt ? new Date(b.updatedAt).toISOString() : new Date().toISOString(),
  };
}

budgetRoutes.get('/:weddingId', async (c) => {
  const weddingId = parseInt(c.req.param('weddingId'), 10);
  const items = await db.select().from(budgetItems)
    .where(eq(budgetItems.weddingId, weddingId))
    .orderBy(desc(budgetItems.createdAt));

  return c.json(items.map(formatBudgetItem));
});

budgetRoutes.post('/:weddingId', async (c) => {
  const weddingId = parseInt(c.req.param('weddingId'), 10);
  const body = await c.req.json();

  const newItem = await db.insert(budgetItems).values({
    weddingId,
    category: body.category || 'Lain-lain',
    name: body.name,
    estimatedCost: body.estimatedCost || 0,
    actualCost: body.actualCost || 0,
    paidAmount: body.paidAmount || 0,
    paymentStatus: body.paymentStatus || 'unpaid',
    vendorId: body.vendorId,
    notes: body.notes || '',
  }).returning();

  return c.json(formatBudgetItem(newItem[0]), 201);
});

budgetRoutes.patch('/:weddingId/:itemId', async (c) => {
  const weddingId = parseInt(c.req.param('weddingId'), 10);
  const itemId = parseInt(c.req.param('itemId'), 10);
  const body = await c.req.json();

  const updateFields: any = {
    updatedAt: new Date(),
  };
  if (body.category !== undefined) updateFields.category = body.category;
  if (body.name !== undefined) updateFields.name = body.name;
  if (body.estimatedCost !== undefined) updateFields.estimatedCost = body.estimatedCost;
  if (body.actualCost !== undefined) updateFields.actualCost = body.actualCost;
  if (body.paidAmount !== undefined) updateFields.paidAmount = body.paidAmount;
  if (body.paymentStatus !== undefined) updateFields.paymentStatus = body.paymentStatus;
  if (body.vendorId !== undefined) updateFields.vendorId = body.vendorId;
  if (body.notes !== undefined) updateFields.notes = body.notes;

  const updated = await db.update(budgetItems)
    .set(updateFields)
    .where(and(eq(budgetItems.id, itemId), eq(budgetItems.weddingId, weddingId)))
    .returning();

  if (updated.length === 0) {
    return c.json({ error: 'Pos anggaran tidak ditemukan' }, 404);
  }

  return c.json(formatBudgetItem(updated[0]));
});

budgetRoutes.delete('/:weddingId/:itemId', async (c) => {
  const weddingId = parseInt(c.req.param('weddingId'), 10);
  const itemId = parseInt(c.req.param('itemId'), 10);

  await db.delete(budgetItems).where(and(eq(budgetItems.id, itemId), eq(budgetItems.weddingId, weddingId)));
  return c.json({ success: true });
});

export default budgetRoutes;
