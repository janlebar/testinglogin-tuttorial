import { sql } from "drizzle-orm";
import { text, boolean, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
 
export const user = pgTable("user", {
  id: uuid("id").primaryKey().unique().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name"),
  image: text("image"),
  created_at: timestamp("created_at").default(sql`now()`),
  updated_at: timestamp("updated_at").default(sql`now()`),
  password: text("password").notNull(),
});