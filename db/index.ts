import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
 
const queryClient = postgres("postgres://nextjs:jan@0.0.0.0:5432/nextjsdb");
const db = drizzle(queryClient);

export default db;
 

