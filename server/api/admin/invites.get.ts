import { useDb } from '../../db'

interface Row {
  id: string
  email: string
  customer_name: string | null
  created_at: number
  expires_at: number
  used_at: number | null
  review_id: string | null
}

export type InviteStatus = 'submitted' | 'expired' | 'pending'

export default defineEventHandler(() => {
  const db = useDb()
  const rows = db
    .prepare(
      `SELECT i.id, i.email, i.customer_name, i.created_at, i.expires_at, i.used_at,
              r.id AS review_id
         FROM invites i
         LEFT JOIN reviews r ON r.invite_id = i.id
        ORDER BY i.created_at DESC`
    )
    .all() as Row[]

  const now = Date.now()
  return rows.map((row) => {
    let status: InviteStatus
    if (row.review_id) status = 'submitted'
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
