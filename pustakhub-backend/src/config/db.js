import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { ENV } from "./env.js";
import * as schema from "../db/schema.js";

// Creates a SQL client for Neon
const sql = neon(ENV.DATABASE_URL);

// Test the database connection
export const testConnection = async () => {
  try {
    await sql`SELECT 1`;
    console.log('✅ Database connected successfully');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
};

// Connects Drizzle ORM with the Neon client and your schema definitions
export const db = drizzle(sql, { schema });