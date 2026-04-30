import { z } from 'zod'
import { defineMcpTool } from '@nuxtjs/mcp-toolkit/server'
import { db, schema } from '../../database'
import { eq } from 'drizzle-orm'

export default defineMcpTool({
  name: 'list-party-spaces',
  description: 'List all party spaces for a given user ID',
  inputSchema: {
    userId: z.number().describe('The ID of the user whose party spaces to retrieve'),
  },
  handler: async ({ userId }) => {
    const spaces = await db
      .select()
      .from(schema.partySpaces)
      .where(eq(schema.partySpaces.userId, userId))

    if (spaces.length === 0) {
      return `No party spaces found for user ${userId}.`
    }

    return spaces
      .map(
        (s) =>
          `[${s.id}] "${s.title}" — ${s.dateStart} at ${s.timeStart}${s.isComplete ? ' (completed)' : ''}`
      )
      .join('\n')
  },
})
