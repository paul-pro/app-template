import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { env } from '~/env';
import * as schema from './schema';

// Create a single neon client for the entire app
const sql = neon(env.DATABASE_URL);

// Create a single drizzle instance for the entire app
export const db = drizzle(sql, { schema });

// Export schema for type inference
export type Schema = typeof schema;
