import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

const auth = new Hono();

const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(6)
});

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6)
});

auth.post('/register', zValidator('json', registerSchema), async (c) => {
  const { email, password } = c.req.valid('json');

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return c.json({ success: false, error: 'User already exists' }, 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.insert(users).values({
    email,
    password: hashedPassword
  });

  return c.json({ success: true, data: { email } }, 201);
});

auth.post('/login', zValidator('json', loginSchema), async (context) => {
  const { email, password } = context.req.valid('json');

  // TODO: verify password, generate JWT
  return context.json({ message: 'Login successful', email });
});

export default auth;
