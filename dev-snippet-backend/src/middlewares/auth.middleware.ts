import { createMiddleware } from 'hono/factory';
import { verify } from 'hono/jwt';

export const authMiddleware = createMiddleware(async (context, next) => {
  const token = context.req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return context.json({ success: false, error: 'Unauthorized' }, 401);
  }

  try {
    const payload = await verify(token, process.env.JWT_SECRET!, 'HS256');
    context.set('user', payload);
    await next();
  } catch {
    return context.json(
      { success: false, error: 'Invalid or expired token' },
      401
    );
  }
});
