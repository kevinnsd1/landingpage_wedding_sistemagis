import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import * as dotenv from 'dotenv';
import path from 'path';
import auth from './routes/auth.js';
import weddings from './routes/weddings.js';
import publicRoutes from './routes/public.js';

dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });
dotenv.config();

const app = new Hono();

app.use('*', logger());
app.use(
  '*',
  cors({
    origin: (origin) => origin || '*',
    credentials: true,
    allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  })
);

app.get('/api/health', (c) => {
  return c.json({ status: 'ok' });
});

import guests from './routes/guests.js';
import planner from './routes/planner.js';
import budget from './routes/budget.js';
import vendors from './routes/vendors.js';
import milestones from './routes/milestones.js';
import seserahan from './routes/seserahan.js';
import uploadRoute from './routes/upload.js';
import themesRoute from './routes/themes.js';
import { serveStatic } from '@hono/node-server/serve-static';

// Mount routes
app.route('/api/auth', auth);
app.route('/api/weddings', weddings);
app.route('/api/public', publicRoutes);
app.route('/api/guests', guests);
app.route('/api/planner', planner);
app.route('/api/budget', budget);
app.route('/api/vendors', vendors);
app.route('/api/milestones', milestones);
app.route('/api/seserahan', seserahan);
app.route('/api/upload', uploadRoute);
app.route('/api/themes', themesRoute);

// Serve static uploads
app.use('/uploads/*', serveStatic({ root: './' }));


const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port
});
