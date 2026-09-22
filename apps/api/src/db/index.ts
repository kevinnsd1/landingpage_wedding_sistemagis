import { drizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';
import * as dotenv from 'dotenv';
import path from 'path';
import * as schema from './schema.js';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });
dotenv.config({ path: path.resolve(process.cwd(), 'apps/api/.env') });
dotenv.config();

const { Pool } = pkg;

export function getDatabaseConnectionString(): string {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  const host = process.env.DB_HOST || 'localhost';
  const port = process.env.DB_PORT || '5432';
  const user = process.env.DB_USER || 'postgres';
  const password = process.env.DB_PASSWORD || 'password123';
  const database = process.env.DB_NAME || 'kisahmagis';

  return `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${database}`;
}

const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'password123',
      database: process.env.DB_NAME || 'kisahmagis',
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    });

export const db = drizzle(pool, { schema });
