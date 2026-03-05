import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { sign, verify } from 'hono/jwt';
import { deleteCookie, getCookie, setCookie } from 'hono/cookie';

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

  const token = await sign(
    {
      sub: existingUser[0].id,
      email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
    },
    process.env.JWT_SECRET!
  );

  setCookie(context, 'token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    maxAge: 60 * 60 * 24,
    path: '/'
  });

  return context.json({ success: true, data: { email } }, 200);
});

auth.post('/logout', (context) => {
  deleteCookie(context, 'token', { path: '/' });
  return context.json({ success: true });
});

auth.get('/me', async (context) => {
  const token = getCookie(context, 'token');

  if (!token) {
    return context.json({ success: false, error: 'Unauthorized' }, 401);
  }

  try {
    const payload = await verify(token, process.env.JWT_SECRET!, 'HS256');
    return context.json({ success: true, data: { email: payload['email'] } });
  } catch {
    return context.json(
      { success: false, error: 'Invalid or expired token' },
      401
    );
  }
});

export default auth;
