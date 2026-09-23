import { Hono } from 'hono';
import { db } from '../../db/index.js';
import { seserahanBoxes, seserahanItems } from '../../db/schema.js';
import { requireAuth, requireWeddingOwnership } from '../middleware/auth.js';
import { eq } from 'drizzle-orm';

const seserahanRoutes = new Hono();

seserahanRoutes.use('*', requireAuth);
seserahanRoutes.use('/:weddingId', requireWeddingOwnership);
seserahanRoutes.use('/:weddingId/*', requireWeddingOwnership);

seserahanRoutes.get('/:weddingId', async (c) => {
  const weddingId = parseInt(c.req.param('weddingId'), 10);
  
  const boxes = await db.select().from(seserahanBoxes)
    .where(eq(seserahanBoxes.weddingId, weddingId));
    
  const allItems = await db.select().from(seserahanItems); // Optimally we should join or filter by boxes
  // filter items by boxes
  const boxIds = boxes.map(b => b.id);
  const items = allItems.filter(i => boxIds.includes(i.boxId));

  const boxesWithItems = boxes.map(b => {
    return {
      id: String(b.id),
      name: b.name,
      category: b.category || undefined,
      recipient: b.recipient,
      status: b.status,
      estimatedCost: b.estimatedCost || 0,
      vendor: b.vendor || undefined,
      notes: b.notes || undefined,
      items: items.filter(i => i.boxId === b.id).map(i => ({
        id: String(i.id),
        boxId: String(i.boxId),
        name: i.name,
        estimatedCost: i.estimatedCost || 0,
        actualCost: i.actualCost || 0,
        isPurchased: i.isPurchased,
        notes: i.notes || undefined,
      })),
    };
  });

  return c.json(boxesWithItems);
});

// Create Box
seserahanRoutes.post('/:weddingId/boxes', async (c) => {
  const weddingId = parseInt(c.req.param('weddingId'), 10);
  const body = await c.req.json();

  const [newBox] = await db.insert(seserahanBoxes).values({
    weddingId,
    name: body.name,
    category: body.category || null,
    recipient: body.recipient || 'groom_to_bride',
    status: body.status || 'planned',
    estimatedCost: body.estimatedCost || 0,
    vendor: body.vendor || null,
    notes: body.notes || null,
  }).returning();

  return c.json({
    id: String(newBox.id),
    name: newBox.name,
    category: newBox.category || undefined,
    recipient: newBox.recipient,
    status: newBox.status,
    estimatedCost: newBox.estimatedCost || 0,
    vendor: newBox.vendor || undefined,
    notes: newBox.notes || undefined,
    items: [],
  }, 201);
});

// Update Box
seserahanRoutes.patch('/:weddingId/boxes/:boxId', async (c) => {
  const boxId = parseInt(c.req.param('boxId'), 10);
  const body = await c.req.json();

  const updateFields: any = { updatedAt: new Date() };
  if (body.name !== undefined) updateFields.name = body.name;
  if (body.category !== undefined) updateFields.category = body.category;
  if (body.recipient !== undefined) updateFields.recipient = body.recipient;
  if (body.status !== undefined) updateFields.status = body.status;
  if (body.estimatedCost !== undefined) updateFields.estimatedCost = body.estimatedCost;
  if (body.vendor !== undefined) updateFields.vendor = body.vendor;
  if (body.notes !== undefined) updateFields.notes = body.notes;

  const [updated] = await db.update(seserahanBoxes)
    .set(updateFields)
    .where(eq(seserahanBoxes.id, boxId))
    .returning();

  if (!updated) return c.json({ error: 'Box not found' }, 404);

  return c.json({
    id: String(updated.id),
    name: updated.name,
    category: updated.category || undefined,
    recipient: updated.recipient,
    status: updated.status,
    estimatedCost: updated.estimatedCost || 0,
    vendor: updated.vendor || undefined,
    notes: updated.notes || undefined,
  });
});

// Delete Box
seserahanRoutes.delete('/:weddingId/boxes/:boxId', async (c) => {
  const boxId = parseInt(c.req.param('boxId'), 10);
  await db.delete(seserahanBoxes).where(eq(seserahanBoxes.id, boxId));
  return c.json({ success: true });
});

// Create Item
seserahanRoutes.post('/:weddingId/items', async (c) => {
  const body = await c.req.json();

  const [newItem] = await db.insert(seserahanItems).values({
    boxId: parseInt(body.boxId, 10),
    name: body.name,
    estimatedCost: body.estimatedCost || 0,
    actualCost: body.actualCost || 0,
    isPurchased: body.isPurchased || false,
    notes: body.notes || null,
  }).returning();

  return c.json({
    id: String(newItem.id),
    boxId: String(newItem.boxId),
    name: newItem.name,
    estimatedCost: newItem.estimatedCost || 0,
    actualCost: newItem.actualCost || 0,
    isPurchased: newItem.isPurchased,
    notes: newItem.notes || undefined,
  }, 201);
});

// Update Item
seserahanRoutes.patch('/:weddingId/items/:itemId', async (c) => {
  const itemId = parseInt(c.req.param('itemId'), 10);
  const body = await c.req.json();

  const updateFields: any = {};
  if (body.name !== undefined) updateFields.name = body.name;
  if (body.estimatedCost !== undefined) updateFields.estimatedCost = body.estimatedCost;
  if (body.actualCost !== undefined) updateFields.actualCost = body.actualCost;
  if (body.isPurchased !== undefined) updateFields.isPurchased = body.isPurchased;
  if (body.notes !== undefined) updateFields.notes = body.notes;

  const [updated] = await db.update(seserahanItems)
    .set(updateFields)
    .where(eq(seserahanItems.id, itemId))
    .returning();

  if (!updated) return c.json({ error: 'Item not found' }, 404);

  return c.json({
    id: String(updated.id),
    boxId: String(updated.boxId),
    name: updated.name,
    estimatedCost: updated.estimatedCost || 0,
    actualCost: updated.actualCost || 0,
    isPurchased: updated.isPurchased,
    notes: updated.notes || undefined,
  });
});

// Delete Item
seserahanRoutes.delete('/:weddingId/items/:itemId', async (c) => {
  const itemId = parseInt(c.req.param('itemId'), 10);
  await db.delete(seserahanItems).where(eq(seserahanItems.id, itemId));
  return c.json({ success: true });
});

export default seserahanRoutes;
