import { Hono } from 'hono';
import { db } from '../../db/index.js';
import { vendors } from '../../db/schema.js';
import { requireAuth, requireWeddingOwnership } from '../middleware/auth.js';
import { eq, and, desc } from 'drizzle-orm';

const vendorsRoutes = new Hono();

vendorsRoutes.use('*', requireAuth);
vendorsRoutes.use('/:weddingId', requireWeddingOwnership);
vendorsRoutes.use('/:weddingId/*', requireWeddingOwnership);

function formatVendor(v: any) {
  return {
    id: String(v.id),
    weddingId: String(v.weddingId),
    name: v.name,
    category: v.category,
    contactPerson: v.contactPerson || '',
    phone: v.phone || '',
    instagram: v.instagram || '',
    cost: v.cost || 0,
    status: v.status || 'researching',
    notes: v.notes || '',
    createdAt: v.createdAt ? new Date(v.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: v.updatedAt ? new Date(v.updatedAt).toISOString() : new Date().toISOString(),
  };
}

vendorsRoutes.get('/:weddingId', async (c) => {
  const weddingId = parseInt(c.req.param('weddingId'), 10);
  const items = await db.select().from(vendors)
    .where(eq(vendors.weddingId, weddingId))
    .orderBy(desc(vendors.createdAt));

  return c.json(items.map(formatVendor));
});

vendorsRoutes.post('/:weddingId', async (c) => {
  const weddingId = parseInt(c.req.param('weddingId'), 10);
  const body = await c.req.json();

  const newVendor = await db.insert(vendors).values({
    weddingId,
    name: body.name,
    category: body.category || 'Other',
    contactPerson: body.contactPerson || '',
    phone: body.phone || '',
    instagram: body.instagram || '',
    cost: body.cost || 0,
    status: body.status || 'researching',
    notes: body.notes || '',
  }).returning();

  return c.json(formatVendor(newVendor[0]), 201);
});

vendorsRoutes.patch('/:weddingId/:vendorId', async (c) => {
  const weddingId = parseInt(c.req.param('weddingId'), 10);
  const vendorId = parseInt(c.req.param('vendorId'), 10);
  const body = await c.req.json();

  const updateFields: any = {
    updatedAt: new Date(),
  };
  if (body.name !== undefined) updateFields.name = body.name;
  if (body.category !== undefined) updateFields.category = body.category;
  if (body.contactPerson !== undefined) updateFields.contactPerson = body.contactPerson;
  if (body.phone !== undefined) updateFields.phone = body.phone;
  if (body.instagram !== undefined) updateFields.instagram = body.instagram;
  if (body.cost !== undefined) updateFields.cost = body.cost;
  if (body.status !== undefined) updateFields.status = body.status;
  if (body.notes !== undefined) updateFields.notes = body.notes;

  const updated = await db.update(vendors)
    .set(updateFields)
    .where(and(eq(vendors.id, vendorId), eq(vendors.weddingId, weddingId)))
    .returning();

  if (updated.length === 0) {
    return c.json({ error: 'Vendor tidak ditemukan' }, 404);
  }

  return c.json(formatVendor(updated[0]));
});

vendorsRoutes.delete('/:weddingId/:vendorId', async (c) => {
  const weddingId = parseInt(c.req.param('weddingId'), 10);
  const vendorId = parseInt(c.req.param('vendorId'), 10);

  await db.delete(vendors).where(and(eq(vendors.id, vendorId), eq(vendors.weddingId, weddingId)));
  return c.json({ success: true });
});

export default vendorsRoutes;
