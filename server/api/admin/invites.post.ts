import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { useDb } from '../../db'
import { generateToken, hashToken, tokenTtlMs } from '../../utils/tokens'
import { sendInviteEmail } from '../../utils/mail'

const BodySchema = z.object({
  email: z.string().trim().email().max(254),
  customer_name: z.string().trim().min(1).max(120).optional().nullable()
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = BodySchema.safeParse(body)
  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid invite payload',
      data: { issues: parsed.error.issues }
    })
  }

  const cfg = useRuntimeConfig()
  const siteUrl = cfg.public.siteUrl?.replace(/\/$/, '')
  if (!siteUrl) {
    throw createError({ statusCode: 500, statusMessage: 'SITE_URL not configured' })
  }

  const { email, customer_name } = parsed.data
  const id = randomUUID()
  const token = generateToken()
  const tokenHash = hashToken(token)
  const now = Date.now()
  const expiresAt = now + tokenTtlMs()

  const db = useDb()
  const { error } = await db.from('invites').insert({
    id,
    email,
    customer_name: customer_name ?? null,
    token_hash: tokenHash,
    created_at: now,
    expires_at: expiresAt,
    used_at: null
  })
  if (error) {
    console.error('[admin/invites] insert failed', error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to create invite' })
  }

  const reviewUrl = `${siteUrl}/review/${token}`

  try {
    await sendInviteEmail({ to: email, customerName: customer_name ?? null, reviewUrl })
  } catch (err) {
    console.error('[admin/invites] sendInviteEmail failed', err)
    throw createError({ statusCode: 502, statusMessage: 'Failed to send invite email' })
  }

  setResponseStatus(event, 201)
  return {
    id,
    email,
    customer_name: customer_name ?? null,
    created_at: now,
    expires_at: expiresAt,
    used_at: null
  }
})
