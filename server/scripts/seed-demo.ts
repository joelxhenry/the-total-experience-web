// Local-only seed script. Run with:
//   npx tsx server/scripts/seed-demo.ts
// Inserts a handful of demo invites + published reviews into server/data/reviews.db
// so the admin dashboard and public testimonials section have something to show.

import { randomUUID, randomBytes, createHash } from 'node:crypto'
import { readFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import Database from 'better-sqlite3'

const TOKEN_TTL_MS = 14 * 24 * 60 * 60 * 1000

function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex')
}

function openDb(): Database.Database {
  const dbPath = resolve(process.cwd(), 'server/data/reviews.db')
  mkdirSync(dirname(dbPath), { recursive: true })
  const db = new Database(dbPath)
  db.pragma('journal_mode = WAL')
  db.pragma('foreign_keys = ON')
  const schema = readFileSync(resolve(process.cwd(), 'server/db/schema.sql'), 'utf-8')
  db.exec(schema)
  return db
}

interface DemoReview {
  email: string
  name: string
  rating: number
  comment: string
  publish: boolean
  // submittedDaysAgo controls created_at on the review row
  submittedDaysAgo: number
}

const DEMO: DemoReview[] = [
  {
    email: 'alice@example.com',
    name: 'Alice Johnson',
    rating: 5,
    comment: 'The BLS course was outstanding — clear instruction, plenty of hands-on practice, and I left feeling fully confident.',
    publish: true,
    submittedDaysAgo: 3
  },
  {
    email: 'brian@example.com',
    name: 'Brian Mendez',
    rating: 5,
    comment: 'Best ACLS recertification I have done. The instructor tailored scenarios to our team and answered every question patiently.',
    publish: true,
    submittedDaysAgo: 9
  },
  {
    email: 'carmen@example.com',
    name: 'Carmen Lee',
    rating: 4,
    comment: 'Very practical class. Would have loved a bit more time on the megacode, but overall an excellent experience.',
    publish: true,
    submittedDaysAgo: 17
  },
  {
    email: 'devin@example.com',
    name: 'Devin Park',
    rating: 5,
    comment: 'Quick turnaround on certification and the small group size made the day fly by. Highly recommend.',
    publish: false,
    submittedDaysAgo: 1
  }
]

function seed() {
  const db = openDb()
  const now = Date.now()

  const insertInvite = db.prepare(
    `INSERT INTO invites (id, email, customer_name, token_hash, created_at, expires_at, used_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  )
  const insertReview = db.prepare(
    `INSERT INTO reviews (id, invite_id, name, rating, comment, created_at, is_published, published_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  )

  // Add one fresh pending invite so the admin invites tab has a "pending" row.
  const pendingToken = randomBytes(32).toString('base64url')
  const pendingId = randomUUID()
  insertInvite.run(
    pendingId,
    'pending@example.com',
    'Pending Demo Customer',
    hashToken(pendingToken),
    now,
    now + TOKEN_TTL_MS,
    null
  )
  console.log(`Pending invite token (use at /review/${pendingToken}):\n  ${pendingToken}`)

  const txn = db.transaction(() => {
    for (const d of DEMO) {
      const inviteId = randomUUID()
      const reviewId = randomUUID()
      const submittedAt = now - d.submittedDaysAgo * 24 * 60 * 60 * 1000
      const createdAt = submittedAt - 60 * 1000 // invite created 1 min before review
      const token = randomBytes(32).toString('base64url')
      insertInvite.run(
        inviteId,
        d.email,
        d.name,
        hashToken(token),
        createdAt,
        createdAt + TOKEN_TTL_MS,
        submittedAt
      )
      insertReview.run(
        reviewId,
        inviteId,
        d.name,
        d.rating,
        d.comment,
        submittedAt,
        d.publish ? 1 : 0,
        d.publish ? submittedAt : null
      )
    }
  })
  txn()

  const inviteCount = (db.prepare('SELECT COUNT(*) AS c FROM invites').get() as { c: number }).c
  const reviewCount = (db.prepare('SELECT COUNT(*) AS c FROM reviews').get() as { c: number }).c
  const publishedCount = (db.prepare('SELECT COUNT(*) AS c FROM reviews WHERE is_published = 1').get() as { c: number }).c
  console.log(`Seeded. Totals — invites: ${inviteCount}, reviews: ${reviewCount}, published: ${publishedCount}`)

  db.close()
}

seed()
