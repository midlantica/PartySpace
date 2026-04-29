import { db, schema } from '../../database'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session.user) throw createError({ statusCode: 401, message: 'Unauthorized' })

  const userId = (session.user as { id: number }).id
  return db.select().from(schema.partySpaces).where(eq(schema.partySpaces.userId, userId))
})
