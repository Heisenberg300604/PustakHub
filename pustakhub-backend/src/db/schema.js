import { pgTable, bigint, varchar, text, boolean, timestamp, decimal, integer, smallint, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  user_id: uuid('user_id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password_hash: varchar('password_hash', { length: 255 }).notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  city: varchar('city', { length: 50 }).notNull(),
  primary_social_handle: varchar('primary_social_handle', { length: 100 }),
  secondary_social_handle: varchar('secondary_social_handle', { length: 100 }),
  avatar_url: text('avatar_url'),
  is_active: boolean('is_active').default(true),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

// EXAM_TYPES
export const exam_types = pgTable('exam_types', {
  exam_type_id: bigint('exam_type_id', { mode: 'number' }).primaryKey().unique().notNull(),
  exam_name: varchar('exam_name', { length: 50 }).notNull().unique(),
  exam_category: varchar('exam_category', { length: 30 }),
  created_at: timestamp('created_at').defaultNow(),
});

// BOOKS
export const books = pgTable('books', {
  book_id: bigint('book_id', { mode: 'number' }).primaryKey(),
  seller_id: uuid('seller_id').notNull().references(() => users.user_id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 200 }).notNull(),
  description: text('description'),
  exam_type_id: bigint('exam_type_id', { mode: 'number' }).notNull().references(() => exam_types.exam_type_id),
  subject: varchar('subject', { length: 50 }).notNull(),
  price: decimal('price', { precision: 10, scale: 2 }),
  is_donation: boolean('is_donation').default(false),
  condition_rating: smallint('condition_rating'),
  status: varchar('status', { length: 20 }).default('available'),
  location_city: varchar('location_city', { length: 50 }).notNull(),
  view_count: integer('view_count').default(0),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
  sold_at: timestamp('sold_at'),
});

// BOOK_IMAGES
export const book_images = pgTable('book_images', {
  image_id: bigint('image_id', { mode: 'number' }).primaryKey(),
  book_id: bigint('book_id', { mode: 'number' }).notNull().references(() => books.book_id),
  image_url: text('image_url').notNull(),
  image_order: smallint('image_order').default(1),
  alt_text: varchar('alt_text', { length: 100 }),
  created_at: timestamp('created_at').defaultNow(),
});