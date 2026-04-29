import { db, schema } from '../../database'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session.user) throw createError({ statusCode: 401, message: 'Unauthorized' })

  const body = await readBody(event)
  const result = await db.insert(schema.venues).values({
    name: body.name,
    geourl: body.geourl ?? ''
  }).returning()
  return result[0]
})
