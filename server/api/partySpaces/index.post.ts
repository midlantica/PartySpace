import { db, schema } from '../../database'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session.user) throw createError({ statusCode: 401, message: 'Unauthorized' })

  const userId = (session.user as { id: number }).id
  const body = await readBody(event)

  const result = await db.insert(schema.partySpaces).values({
    title: body.title,
    dateStart: body.dateStart,
    timeStart: body.timeStart,
    description: body.description ?? '',
    isComplete: body.isComplete ?? false,
    userId
  }).returning()

  return result[0]
})
