import { db } from '../../database'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)

  if (!email || !password) {
    throw createError({ statusCode: 400, message: 'Email and password are required' })
  }

  const user = db.$client.prepare('SELECT * FROM users WHERE email = ?').get(email) as {
    id: number; name: string; email: string; password: string
  } | undefined

  if (!user || user.password !== password) {
    throw createError({ statusCode: 401, message: 'Invalid email or password' })
  }

  await setUserSession(event, {
    user: { id: user.id, name: user.name, email: user.email }
  })

  return { id: user.id, name: user.name, email: user.email }
})
