import { z } from 'zod'
import { lookupInviteByToken } from '../../utils/tokens'

const QuerySchema = z.object({
  token: z.string().min(1).max(256)
})

export default defineEventHandler(async (event) => {
  const parsed = QuerySchema.safeParse(getQuery(event))
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid token parameter' })
  }

  const result = await lookupInviteByToken(parsed.data.token)

  if (!result.ok) {
    if (result.reason === 'not_found') {
      throw createError({ statusCode: 404, statusMessage: 'Invite not found' })
    }
    // 410 Gone for used/expired
    throw createError({
      statusCode: 410,
      statusMessage: result.reason === 'used' ? 'Invite already used' : 'Invite expired',
      data: { reason: result.reason }
    })
  }

  return {
    valid: true,
    email: result.invite.email,
    customer_name: result.invite.customer_name
  }
})
