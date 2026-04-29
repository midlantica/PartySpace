import { db } from '../../database'

export default defineEventHandler(async (event) => {
  const { name, email, password } = await readBody(event)

  if (!name || !email || !password) {
    throw createError({ statusCode: 400, message: 'Name, email and password are required' })
  }

  const existing = db.$client.prepare('SELECT id FROM users WHERE email = ?').get(email)
  if (existing) {
    throw createError({ statusCode: 409, message: 'Email already registered' })
  }

  const result = db.$client.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)').run(name, email, password)
  const userId = result.lastInsertRowid as number

  await setUserSession(event, {
    user: { id: userId, name, email }
  })

  return { id: userId, name, email }
})
