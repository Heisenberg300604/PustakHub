import { ENV } from './src/config/env.js';

export default {
  schema: './src/db/schema.js', // Path to schema file
  out: './src/db/migrations',   // Migrations folder
  dialect: 'postgresql',
  dbCredentials: {
    url: ENV.DATABASE_URL,
  }
};

// run the command - npx drizzle-kit migrate to push to neon db
// run the command - npx drizzle-kit generate to generate the migrations
