import { db, schema } from '../../database'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session.user) throw createError({ statusCode: 401, message: 'Unauthorized' })

  const id = parseInt(getRouterParam(event, 'id') ?? '0')
  const body = await readBody(event)

  const result = await db.update(schema.partySpaces)
    .set({
      title: body.title,
      dateStart: body.dateStart,
      timeStart: body.timeStart,
      description: body.description,
      isComplete: body.isComplete
    })
    .where(eq(schema.partySpaces.id, id))
    .returning()

  return result[0]
})
