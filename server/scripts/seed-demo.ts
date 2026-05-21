// Local-only seed script. Run with:
//   npx tsx server/scripts/seed-demo.ts
// Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in the env.

import { randomUUID, randomBytes, createHash } from 'node:crypto'
import { createClient } from '@supabase/supabase-js'

const TOKEN_TTL_MS = 14 * 24 * 60 * 60 * 1000

function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex')
}

function openDb() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set')
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false }
  })
}

interface DemoReview {
  email: string
  name: string
  rating: number
  comment: string
  publish: boolean
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

async function seed() {
  const db = openDb()
  const now = Date.now()

  const pendingToken = randomBytes(32).toString('base64url')
  const { error: pendingErr } = await db.from('invites').insert({
    id: randomUUID(),
    email: 'pending@example.com',
    customer_name: 'Pending Demo Customer',
    token_hash: hashToken(pendingToken),
    created_at: now,
    expires_at: now + TOKEN_TTL_MS,
    used_at: null
  })
  if (pendingErr) throw pendingErr
  console.log(`Pending invite token (use at /review/${pendingToken}):\n  ${pendingToken}`)

  for (const d of DEMO) {
    const inviteId = randomUUID()
    const reviewId = randomUUID()
    const submittedAt = now - d.submittedDaysAgo * 24 * 60 * 60 * 1000
    const createdAt = submittedAt - 60 * 1000
    const token = randomBytes(32).toString('base64url')

    const { error: invErr } = await db.from('invites').insert({
      id: inviteId,
      email: d.email,
      customer_name: d.name,
      token_hash: hashToken(token),
      created_at: createdAt,
      expires_at: createdAt + TOKEN_TTL_MS,
      used_at: submittedAt
    })
    if (invErr) throw invErr

    const { error: revErr } = await db.from('reviews').insert({
      id: reviewId,
      invite_id: inviteId,
      name: d.name,
      rating: d.rating,
      comment: d.comment,
      created_at: submittedAt,
      is_published: d.publish,
      published_at: d.publish ? submittedAt : null
    })
    if (revErr) throw revErr
  }

  const [invites, reviews, published] = await Promise.all([
    db.from('invites').select('id', { count: 'exact', head: true }),
    db.from('reviews').select('id', { count: 'exact', head: true }),
    db.from('reviews').select('id', { count: 'exact', head: true }).eq('is_published', true)
  ])
  console.log(
    `Seeded. Totals — invites: ${invites.count ?? '?'}, reviews: ${reviews.count ?? '?'}, published: ${published.count ?? '?'}`
  )
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
