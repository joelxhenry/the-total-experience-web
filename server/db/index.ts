import { readFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import Database from 'better-sqlite3'

let _db: Database.Database | null = null

export function useDb(): Database.Database {
  if (_db) return _db

  const dbPath = resolve(process.cwd(), 'server/data/reviews.db')
  mkdirSync(dirname(dbPath), { recursive: true })

  const db = new Database(dbPath)
  db.pragma('journal_mode = WAL')
  db.pragma('foreign_keys = ON')

  const schema = readFileSync(resolve(process.cwd(), 'server/db/schema.sql'), 'utf-8')
  db.exec(schema)

  _db = db
  return db
}
