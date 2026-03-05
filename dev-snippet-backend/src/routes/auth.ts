import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

const auth = new Hono();

const emailSchema = z.string().regex(/^[^\s@]+@[^\s@]+$/);

const registerSchema = z.object({
  email: emailSchema,
  password: z.string().min(6)
});

const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(6)
});

auth.post('/register', zValidator('json', registerSchema), async (context) => {
  const { email, password } = context.req.valid('json');

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return context.json({ success: false, error: 'User already exists' }, 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.insert(users).values({
    email,
    password: hashedPassword
  });

  return context.json({ success: true, data: { email } }, 201);
});

auth.post('/login', zValidator('json', loginSchema), async (context) => {
  const { email, password } = context.req.valid('json');

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length === 0) {
    return context.json({ success: false, error: 'Invalid credentials' }, 400);
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    existingUser[0].password
  );

  if (!isPasswordValid) {
    return context.json({ success: false, error: 'Invalid credentials' }, 400);
  }

  return context.json({ success: true, data: { email } }, 200);
});

export default auth;
