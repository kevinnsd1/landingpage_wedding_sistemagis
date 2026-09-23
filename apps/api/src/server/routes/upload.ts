import { Hono } from 'hono';
import fs from 'fs/promises';
import path from 'path';

const uploadRoute = new Hono();

uploadRoute.post('/', async (c) => {
  try {
    const body = await c.req.parseBody();
    const file = body['file'];

    if (!file || !(file instanceof File)) {
      return c.json({ error: 'File is required' }, 400);
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Generate unique filename
    const ext = path.extname(file.name) || '';
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    const uploadDir = path.join(process.cwd(), 'uploads');
    const uploadPath = path.join(uploadDir, filename);

    // Ensure uploads directory exists just in case
    await fs.mkdir(uploadDir, { recursive: true }).catch(() => {});

    await fs.writeFile(uploadPath, buffer);

    // We can return the absolute URL to the asset so frontend doesn't need to guess
    const host = c.req.header('host') || 'localhost:3001';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const url = `${protocol}://${host}/uploads/${filename}`;
    
    return c.json({ url });
  } catch (error: any) {
    console.error('Upload error:', error);
    return c.json({ error: error.message || 'Failed to upload file' }, 500);
  }
});

export default uploadRoute;
