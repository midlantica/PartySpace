import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull()
})

export const partySpaces = sqliteTable('party_spaces', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  dateStart: text('date_start').notNull(),
  timeStart: text('time_start').notNull(),
  description: text('description').notNull().default(''),
  isComplete: integer('is_complete', { mode: 'boolean' }).notNull().default(false),
  userId: integer('user_id').notNull().references(() => users.id)
})

export const venues = sqliteTable('venues', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  geourl: text('geourl').notNull().default('')
})

export const partySpaceVenues = sqliteTable('party_space_venues', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  partySpaceId: integer('party_space_id').notNull().references(() => partySpaces.id),
  venueId: integer('venue_id').notNull().references(() => venues.id),
  duration: real('duration').notNull().default(1)
})

export const peoples = sqliteTable('peoples', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  partySpaceId: integer('party_space_id').notNull().references(() => partySpaces.id),
  userId: integer('user_id').notNull().references(() => users.id)
})
