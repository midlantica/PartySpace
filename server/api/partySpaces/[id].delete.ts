import { db, schema } from '../../database'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session.user) throw createError({ statusCode: 401, message: 'Unauthorized' })

  const id = parseInt(getRouterParam(event, 'id') ?? '0')
  await db.delete(schema.partySpaces).where(eq(schema.partySpaces.id, id))
  return { ok: true }
})
