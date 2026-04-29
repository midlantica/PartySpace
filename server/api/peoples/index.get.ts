import { db, schema } from '../../database'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session.user) throw createError({ statusCode: 401, message: 'Unauthorized' })

  const query = getQuery(event)
  if (query.partySpaceId) {
    return db.select().from(schema.peoples)
      .where(eq(schema.peoples.partySpaceId, parseInt(query.partySpaceId as string)))
  }
  return db.select().from(schema.peoples)
})
