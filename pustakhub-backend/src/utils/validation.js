import zod  from 'zod';

export const registerSchema = z.object({
  phone_number: z.string().min(10).max(20),
  name: z.string().min(3),
  city: z.string().min(2),
});
