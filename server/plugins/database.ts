import { db } from '../database'

export default defineNitroPlugin(() => {
  const client = db.$client

  // Create tables if they don't exist
  client.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `)
  client.exec(`
    CREATE TABLE IF NOT EXISTS party_spaces (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      date_start TEXT NOT NULL,
      time_start TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      is_complete INTEGER NOT NULL DEFAULT 0,
      user_id INTEGER NOT NULL REFERENCES users(id)
    )
  `)
  client.exec(`
    CREATE TABLE IF NOT EXISTS venues (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      geourl TEXT NOT NULL DEFAULT ''
    )
  `)
  client.exec(`
    CREATE TABLE IF NOT EXISTS party_space_venues (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      party_space_id INTEGER NOT NULL REFERENCES party_spaces(id),
      venue_id INTEGER NOT NULL REFERENCES venues(id),
      duration REAL NOT NULL DEFAULT 1
    )
  `)
  client.exec(`
    CREATE TABLE IF NOT EXISTS peoples (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      party_space_id INTEGER NOT NULL REFERENCES party_spaces(id),
      user_id INTEGER NOT NULL REFERENCES users(id)
    )
  `)

  // Seed default user if none exist
  const existing = client.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number }
  if (existing.count === 0) {
    client.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)').run('Drew Harper', 'druharper@gmail.com', '1234')

    const user = client.prepare('SELECT id FROM users WHERE email = ?').get('druharper@gmail.com') as { id: number }

    client.prepare('INSERT INTO party_spaces (title, date_start, time_start, description, is_complete, user_id) VALUES (?, ?, ?, ?, ?, ?)').run(
      "Drew's Birthday Bash", '2026-06-15', '18:00', 'Come celebrate with food, drinks, and good vibes!', 0, user.id
    )

    const ps = client.prepare('SELECT id FROM party_spaces WHERE user_id = ?').get(user.id) as { id: number }

    client.prepare('INSERT INTO venues (name, geourl) VALUES (?, ?)').run(
      "Jeni's Splendid Ice Creams",
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12891.221352621507!2d-86.8006545302246!3d36.122599949999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x410684f065c72c72!2sJeni's%20Splendid%20Ice%20Creams!5e0!3m2!1sen!2sus!4v1589206754848!5m2!1sen!2sus"
    )

    const venue = client.prepare("SELECT id FROM venues WHERE name = ?").get("Jeni's Splendid Ice Creams") as { id: number }

    client.prepare('INSERT INTO party_space_venues (party_space_id, venue_id, duration) VALUES (?, ?, ?)').run(ps.id, venue.id, 2)

    client.prepare('INSERT INTO peoples (name, email, party_space_id, user_id) VALUES (?, ?, ?, ?)').run('Jane Smith', 'jane@example.com', ps.id, user.id)

    console.log('[PartySpace] Database seeded with default data')
  }

  console.log('[PartySpace] Database ready')
})
