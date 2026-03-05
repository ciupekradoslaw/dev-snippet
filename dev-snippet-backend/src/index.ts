import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import auth from './routes/auth.js';
import { runMigrations } from './db/migrate.js';
import { cors } from 'hono/cors';
import { authMiddleware } from './middlewares/auth.middleware.js';

const app = new Hono();

app.use(
  '*',
  cors({
    origin: 'http://localhost:4200',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization']
  })
);

app.route('/auth', auth);
app.use('*', authMiddleware);

async function bootstrap() {
  try {
    await runMigrations();
    serve({ fetch: app.fetch, port: 3000 }, (info) => {
      console.log(`Server is running on http://localhost:${info.port}`);
    });
  } catch (err) {
    console.error('Bootstrap failed:', err);
    process.exit(1);
  }
}

bootstrap();
