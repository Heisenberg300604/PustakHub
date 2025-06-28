import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  city: z.string().min(2, 'City must be at least 2 characters')
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required')
});


export const createBookSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().optional(),
  exam_type_id: z.number().int().positive('Exam type is required'),
  subject: z.string().min(2, 'Subject is required'),
  price: z.number().positive().optional(),
  is_donation: z.boolean().default(false),
  condition_rating: z.number().int().min(1).max(5).default(5),
  location_city: z.string().min(2, 'City is required'),
  image_urls: z.array(z.string().url()).optional()
});

export const updateBookSchema = createBookSchema.partial();
