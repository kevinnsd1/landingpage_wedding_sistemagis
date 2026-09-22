import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { db } from '../db/index.js';
import {
  users,
  weddings,
  invitations,
  guests,
  rsvps,
  guestbook,
  plannerBoards,
  plannerColumns,
  plannerTasks,
  budgetItems,
  vendors,
} from '../db/schema.js';
import {
  INITIAL_USER,
  INITIAL_WEDDING,
  INITIAL_INVITATION,
  INITIAL_GUESTS,
  INITIAL_RSVPS,
  INITIAL_GUESTBOOK,
  INITIAL_TASKS,
  INITIAL_BUDGET,
  INITIAL_VENDORS,
} from '../lib/seed.js';
import { eq } from 'drizzle-orm';

export async function seedDemoData(forceReset = false) {
  const existingUsers = await db.select().from(users).where(eq(users.email, INITIAL_USER.email));
  let user = existingUsers[0];

  if (user && !forceReset) {
    // Check if wedding exists
    const existingWedding = await db.select().from(weddings).where(eq(weddings.slug, INITIAL_WEDDING.slug));
    if (existingWedding.length > 0) {
      return { user, wedding: existingWedding[0] };
    }
  }

  if (user && forceReset) {
    // Delete existing user cascades to weddings, sessions, etc.
    await db.delete(users).where(eq(users.id, user.id));
  }

  // 1. Create User
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('password123', salt);

  const newUser = await db.insert(users).values({
    name: INITIAL_USER.name,
    email: INITIAL_USER.email,
    passwordHash,
  }).returning();
  user = newUser[0];

  // 2. Create Wedding
  const newWedding = await db.insert(weddings).values({
    ownerId: user.id,
    slug: INITIAL_WEDDING.slug,
    title: INITIAL_WEDDING.title,
    groomName: INITIAL_WEDDING.groomName,
    brideName: INITIAL_WEDDING.brideName,
    weddingDate: new Date(INITIAL_WEDDING.weddingDate),
    status: INITIAL_WEDDING.status,
    details: {
      groomParents: INITIAL_WEDDING.groomParents,
      groomBio: INITIAL_WEDDING.groomBio,
      groomPhoto: INITIAL_WEDDING.groomPhoto,
      groomInstagram: INITIAL_WEDDING.groomInstagram,
      brideParents: INITIAL_WEDDING.brideParents,
      brideBio: INITIAL_WEDDING.brideBio,
      bridePhoto: INITIAL_WEDDING.bridePhoto,
      brideInstagram: INITIAL_WEDDING.brideInstagram,
      coverPhoto: INITIAL_WEDDING.coverPhoto,
      akadEvent: INITIAL_WEDDING.akadEvent,
      receptionEvent: INITIAL_WEDDING.receptionEvent,
      stories: INITIAL_WEDDING.stories,
      gifts: INITIAL_WEDDING.gifts,
    },
  }).returning();
  const wedding = newWedding[0];

  // 3. Create Invitation
  await db.insert(invitations).values({
    weddingId: wedding.id,
    themeId: INITIAL_INVITATION.config.themeId,
    themeVersion: INITIAL_INVITATION.config.themeVersion,
    config: INITIAL_INVITATION.config,
    status: INITIAL_INVITATION.status,
  });

  // 4. Create Guests
  const guestMap = new Map<string, number>();
  for (const g of INITIAL_GUESTS) {
    const tokenHash = crypto.createHash('sha256').update(g.invitationToken).digest('hex');
    const insertedGuest = await db.insert(guests).values({
      weddingId: wedding.id,
      name: g.name,
      phone: g.phone,
      email: g.email,
      groupName: g.group,
      invitationToken: g.invitationToken,
      tokenHash,
      status: g.invitationStatus,
      invitationStatus: g.invitationStatus,
      rsvpStatus: g.rsvpStatus,
      guestCount: g.guestCount,
    }).returning();
    guestMap.set(g.id, insertedGuest[0].id);
  }

  // 5. Create RSVPs
  for (const r of INITIAL_RSVPS) {
    const dbGuestId = r.guestId ? guestMap.get(r.guestId) : undefined;
    await db.insert(rsvps).values({
      weddingId: wedding.id,
      guestId: dbGuestId,
      name: r.name,
      attendance: r.attendance,
      guestCount: r.guestCount,
      message: r.message,
    });
  }

  // 6. Create Guestbook Entries
  for (const gb of INITIAL_GUESTBOOK) {
    await db.insert(guestbook).values({
      weddingId: wedding.id,
      guestName: gb.guestName,
      message: gb.message,
      isApproved: gb.isApproved,
    });
  }

  // 7. Create Planner Board, Columns, and Tasks
  const newBoard = await db.insert(plannerBoards).values({
    weddingId: wedding.id,
    name: 'Persiapan Pernikahan',
  }).returning();
  const board = newBoard[0];

  const colTodo = await db.insert(plannerColumns).values({
    boardId: board.id,
    title: 'Rencana',
    position: 0,
  }).returning();

  const colInProgress = await db.insert(plannerColumns).values({
    boardId: board.id,
    title: 'Diproses',
    position: 1,
  }).returning();

  const colDone = await db.insert(plannerColumns).values({
    boardId: board.id,
    title: 'Selesai',
    position: 2,
  }).returning();

  const columnMap: Record<string, number> = {
    'col-todo': colTodo[0].id,
    'col-inprogress': colInProgress[0].id,
    'col-done': colDone[0].id,
  };

  for (const t of INITIAL_TASKS) {
    const colId = columnMap[t.columnId] || colTodo[0].id;
    await db.insert(plannerTasks).values({
      columnId: colId,
      title: t.title,
      description: t.description,
      priority: t.priority,
      dueDate: t.dueDate ? new Date(t.dueDate) : null,
      position: t.order,
      status: t.columnId === 'done' ? 'done' : t.columnId === 'in_progress' ? 'in_progress' : 'todo',
    });
  }

  // 8. Create Budget Items
  for (const b of INITIAL_BUDGET) {
    await db.insert(budgetItems).values({
      weddingId: wedding.id,
      category: b.category,
      name: b.name,
      estimatedCost: b.estimatedCost,
      actualCost: b.actualCost,
      paymentStatus: b.paymentStatus || 'unpaid',
      notes: b.notes,
    });
  }

  // 9. Create Vendors
  for (const v of INITIAL_VENDORS) {
    await db.insert(vendors).values({
      weddingId: wedding.id,
      name: v.name,
      category: v.category,
      contact: v.phone || v.instagram || v.contactPerson,
      cost: v.cost,
      status: v.status,
      notes: v.notes,
    });
  }

  return { user, wedding };
}
