import { z } from 'zod'
import { createAdminSession, verifyAdminPassword } from '../../utils/auth'
import { enforceRateLimit } from '../../utils/rateLimit'
import { issueCsrfToken } from '../../utils/csrf'

const BodySchema = z.object({
  password: z.string().min(1).max(256)
})

export default defineEventHandler(async (event) => {
  enforceRateLimit(event, { key: 'admin:login', capacity: 5, windowMs: 5 * 60_000 })

  const body = await readBody(event)
  const parsed = BodySchema.safeParse(body)
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid request' })
  }

  if (!verifyAdminPassword(parsed.data.password)) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid password' })
  }

  createAdminSession(event)
  const csrf = issueCsrfToken(event)
  return { ok: true, csrf }
})
