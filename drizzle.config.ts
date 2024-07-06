import "dotenv/config";
import type { Config } from "drizzle-kit";
 
export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgres://nextjs:jan@0.0.0.0:5432/nextjsdb",
  },
  strict: true,
  verbose: true,
} satisfies Config;
 
 