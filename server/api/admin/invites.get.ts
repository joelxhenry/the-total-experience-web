import { useDb } from '../../db'

interface Row {
  id: string
  email: string
  customer_name: string | null
  created_at: number
  expires_at: number
  used_at: number | null
  reviews: { id: string }[] | null
}

export type InviteStatus = 'submitted' | 'expired' | 'pending'

export default defineEventHandler(async () => {
  const db = useDb()
  const { data, error } = await db
    .from('invites')
    .select('id, email, customer_name, created_at, expires_at, used_at, reviews(id)')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[admin/invites.get] query failed', error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to load invites' })
  }

  const rows = (data ?? []) as unknown as Row[]
  const now = Date.now()
  return rows.map((row) => {
    const hasReview = Array.isArray(row.reviews) && row.reviews.length > 0
    let status: InviteStatus
    if (hasReview) status = 'submitted'
    else if (row.expires_at < now) status = 'expired'
    else status = 'pending'

    return {
      id: row.id,
      email: row.email,
      customer_name: row.customer_name,
      created_at: row.created_at,
      expires_at: row.expires_at,
      used_at: row.used_at,
      status
    }
  })
})
