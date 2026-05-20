import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { useDb } from '../../db'
import { hashToken } from '../../utils/tokens'

const BodySchema = z.object({
  token: z.string().min(1).max(256),
  name: z.string().trim().min(1).max(120),
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().min(1).max(1000)
})

interface InviteRow {
  id: string
  expires_at: number
  used_at: number | null
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = BodySchema.safeParse(body)
  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid review submission',
      data: { issues: parsed.error.issues }
    })
  }

  const { token, name, rating, comment } = parsed.data
  const db = useDb()
  const now = Date.now()
  const tokenHash = hashToken(token)

  const invite = db
    .prepare('SELECT id, expires_at, used_at FROM invites WHERE token_hash = ?')
    .get(tokenHash) as InviteRow | undefined

  if (!invite) {
    throw createError({ statusCode: 404, statusMessage: 'Invite not found' })
  }
  if (invite.used_at !== null) {
    throw createError({ statusCode: 409, statusMessage: 'Invite already used' })
  }
  if (invite.expires_at < now) {
    throw createError({ statusCode: 410, statusMessage: 'Invite expired' })
  }

  const reviewId = randomUUID()

  const txn = db.transaction(() => {
    const markUsed = db
      .prepare('UPDATE invites SET used_at = ? WHERE id = ? AND used_at IS NULL')
      .run(now, invite.id)
    if (markUsed.changes !== 1) {
      throw createError({ statusCode: 409, statusMessage: 'Invite already used' })
    }
    db.prepare(
      `INSERT INTO reviews (id, invite_id, name, rating, comment, created_at, is_published)
       VALUES (?, ?, ?, ?, ?, ?, 0)`
    ).run(reviewId, invite.id, name, rating, comment, now)
  })

  txn()

  setResponseStatus(event, 201)
  return { ok: true, id: reviewId }
})
