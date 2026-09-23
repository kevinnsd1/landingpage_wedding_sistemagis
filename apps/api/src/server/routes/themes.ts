import { Hono } from 'hono';
import { db } from '../../db/index.js';
import { packages, themes } from '../../db/schema.js';
import { eq } from 'drizzle-orm';
import { requireAuth } from '../middleware/auth.js';

const themesRoutes = new Hono();

// Note: Usually we would have both a public and a private themes endpoint, 
// but since this is for the Dashboard, we'll require auth.
themesRoutes.use('*', requireAuth);

// GET /api/themes - Fetch all themes with their packages
themesRoutes.get('/', async (c) => {
  // We use a left join to include package details
  const allThemes = await db
    .select({
      id: themes.id,
      name: themes.name,
      description: themes.description,
      isActive: themes.isActive,
      isCustom: themes.isCustom,
      createdAt: themes.createdAt,
      package: {
        id: packages.id,
        name: packages.name,
        price: packages.price,
        features: packages.features,
      }
    })
    .from(themes)
    .leftJoin(packages, eq(themes.packageId, packages.id));

  // If you only wanted to show active themes to the user, you could filter it:
  // const activeThemes = allThemes.filter(t => t.isActive);
  
  return c.json(allThemes);
});

// GET /api/packages - Fetch all packages
themesRoutes.get('/packages', async (c) => {
  const allPackages = await db.select().from(packages);
  return c.json(allPackages);
});

export default themesRoutes;
