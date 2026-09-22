import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { db } from '../../db/index.js';
import { plannerTasks, plannerColumns, plannerBoards } from '../../db/schema.js';
import { requireAuth, requireWeddingOwnership } from '../middleware/auth.js';
import { eq, and, asc } from 'drizzle-orm';

const plannerRoutes = new Hono();

plannerRoutes.use('*', requireAuth);
plannerRoutes.use('/:weddingId', requireWeddingOwnership);
plannerRoutes.use('/:weddingId/*', requireWeddingOwnership);

async function ensureBoardAndColumns(weddingId: number) {
  let boards = await db.select().from(plannerBoards).where(eq(plannerBoards.weddingId, weddingId));
  let board = boards[0];

  if (!board) {
    const newBoard = await db.insert(plannerBoards).values({
      weddingId,
      name: 'Persiapan Pernikahan',
    }).returning();
    board = newBoard[0];
  }

  let columns = await db.select().from(plannerColumns).where(eq(plannerColumns.boardId, board.id));
  if (columns.length === 0) {
    const c1 = await db.insert(plannerColumns).values({ boardId: board.id, title: 'Rencana', position: 0 }).returning();
    const c2 = await db.insert(plannerColumns).values({ boardId: board.id, title: 'Diproses', position: 1 }).returning();
    const c3 = await db.insert(plannerColumns).values({ boardId: board.id, title: 'Selesai', position: 2 }).returning();
    columns = [c1[0], c2[0], c3[0]];
  }

  // Sort by position
  columns.sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
  return { board, columns };
}

plannerRoutes.get('/:weddingId', async (c) => {
  const weddingId = parseInt(c.req.param('weddingId'), 10);
  const { columns } = await ensureBoardAndColumns(weddingId);

  const colTodo = columns[0];
  const colInProgress = columns[1];
  const colDone = columns[2];

  const colIdToStatus: Record<number, 'todo' | 'in_progress' | 'done'> = {};
  if (colTodo) colIdToStatus[colTodo.id] = 'todo';
  if (colInProgress) colIdToStatus[colInProgress.id] = 'in_progress';
  if (colDone) colIdToStatus[colDone.id] = 'done';

  const allTasks = [];
  for (const col of columns) {
    const tasks = await db.select().from(plannerTasks)
      .where(eq(plannerTasks.columnId, col.id))
      .orderBy(asc(plannerTasks.position));

    for (const t of tasks) {
      const colStatus = colIdToStatus[t.columnId] || 'todo';
      allTasks.push({
        id: String(t.id),
        weddingId: String(weddingId),
        columnId: colStatus,
        title: t.title,
        description: t.description || '',
        priority: (t.priority || 'medium') as 'low' | 'medium' | 'high',
        category: t.category || 'Persiapan',
        dueDate: t.dueDate ? new Date(t.dueDate).toISOString() : undefined,
        order: t.position || 0,
        createdAt: t.createdAt ? new Date(t.createdAt).toISOString() : new Date().toISOString(),
        updatedAt: t.updatedAt ? new Date(t.updatedAt).toISOString() : new Date().toISOString(),
      });
    }
  }

  return c.json(allTasks);
});

plannerRoutes.post('/:weddingId/tasks', async (c) => {
  const weddingId = parseInt(c.req.param('weddingId'), 10);
  const body = await c.req.json();
  const { columns } = await ensureBoardAndColumns(weddingId);

  let targetColumn = columns[0];
  if (body.columnId === 'in_progress' && columns[1]) targetColumn = columns[1];
  if (body.columnId === 'done' && columns[2]) targetColumn = columns[2];

  const newTask = await db.insert(plannerTasks).values({
    columnId: targetColumn.id,
    title: body.title,
    description: body.description || '',
    priority: body.priority || 'medium',
    category: body.category || 'Persiapan',
    dueDate: body.dueDate ? new Date(body.dueDate) : null,
    position: body.order || 0,
    status: body.columnId || 'todo',
  }).returning();

  const t = newTask[0];
  return c.json({
    id: String(t.id),
    weddingId: String(weddingId),
    columnId: body.columnId || 'todo',
    title: t.title,
    description: t.description || '',
    priority: (t.priority || 'medium') as 'low' | 'medium' | 'high',
    category: t.category || 'Persiapan',
    dueDate: t.dueDate ? new Date(t.dueDate).toISOString() : undefined,
    order: t.position || 0,
    createdAt: t.createdAt ? new Date(t.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: t.updatedAt ? new Date(t.updatedAt).toISOString() : new Date().toISOString(),
  }, 201);
});

plannerRoutes.patch('/:weddingId/tasks/:taskId', async (c) => {
  const weddingId = parseInt(c.req.param('weddingId'), 10);
  const taskId = parseInt(c.req.param('taskId'), 10);
  const body = await c.req.json();
  const { columns } = await ensureBoardAndColumns(weddingId);

  const updateFields: any = {
    updatedAt: new Date(),
  };
  if (body.title !== undefined) updateFields.title = body.title;
  if (body.description !== undefined) updateFields.description = body.description;
  if (body.priority !== undefined) updateFields.priority = body.priority;
  if (body.category !== undefined) updateFields.category = body.category;
  if (body.dueDate !== undefined) updateFields.dueDate = body.dueDate ? new Date(body.dueDate) : null;
  if (body.order !== undefined) updateFields.position = body.order;

  if (body.columnId !== undefined) {
    let targetColumn = columns[0];
    if (body.columnId === 'in_progress' && columns[1]) targetColumn = columns[1];
    if (body.columnId === 'done' && columns[2]) targetColumn = columns[2];
    updateFields.columnId = targetColumn.id;
    updateFields.status = body.columnId;
  }

  const updated = await db.update(plannerTasks)
    .set(updateFields)
    .where(eq(plannerTasks.id, taskId))
    .returning();

  if (updated.length === 0) {
    return c.json({ error: 'Tugas tidak ditemukan' }, 404);
  }

  const t = updated[0];
  return c.json({
    id: String(t.id),
    weddingId: String(weddingId),
    columnId: body.columnId || 'todo',
    title: t.title,
    description: t.description || '',
    priority: (t.priority || 'medium') as 'low' | 'medium' | 'high',
    category: t.category || 'Persiapan',
    dueDate: t.dueDate ? new Date(t.dueDate).toISOString() : undefined,
    order: t.position || 0,
    createdAt: t.createdAt ? new Date(t.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: t.updatedAt ? new Date(t.updatedAt).toISOString() : new Date().toISOString(),
  });
});

plannerRoutes.delete('/:weddingId/tasks/:taskId', async (c) => {
  const taskId = parseInt(c.req.param('taskId'), 10);
  await db.delete(plannerTasks).where(eq(plannerTasks.id, taskId));
  return c.json({ success: true });
});

export default plannerRoutes;
