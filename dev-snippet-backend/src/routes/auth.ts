import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const auth = new Hono()

const registerSchema = z.object({
  email: z.email(),
  username: z.string().min(3),
  password: z.string().min(6)
})

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6)
})

auth.post('/register', zValidator('json', registerSchema), async (c) => {
  const { email, password, username } = c.req.valid('json')

  // TODO: hash password, save to DB
  return c.json({ message: 'User registered', email, username })
})

auth.post('/login', zValidator('json', loginSchema), async (context) => {
  const { email, password } = context.req.valid('json')

  // TODO: verify password, generate JWT
  return context.json({ message: 'Login successful', email })
})

export default auth
