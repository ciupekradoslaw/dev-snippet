import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { db } from './index.js'

export async function runMigrations() {
  console.log('Running migrations...')
  await migrate(db, { migrationsFolder: './migrations' })
  console.log('Migrations complete ✓')
}
