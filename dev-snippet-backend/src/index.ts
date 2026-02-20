import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import auth from './routes/auth.js'
import { runMigrations } from './db/migrate.js'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/auth', auth)

async function bootstrap() {
  try {
    await runMigrations()
    serve({ fetch: app.fetch, port: 3000 }, (info) => {
      console.log(`Server is running on http://localhost:${info.port}`)
    })
  } catch (err) {
    console.error('Bootstrap failed:', err)
    process.exit(1)
  }
}

bootstrap()
