import { z } from 'zod'
import { useDb } from '../../../db'

const QuerySchema = z.object({
  published: z.enum(['0', '1']).optional()
})

interface ReviewRow {
  id: string
  invite_id: string
  name: string
  rating: number
  comment: string
  created_at: number
  is_published: number
  published_at: number | null
}

export default defineEventHandler((event) => {
  const parsed = QuerySchema.safeParse(getQuery(event))
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid query' })
  }

  const db = useDb()
  const where = parsed.data.published !== undefined ? 'WHERE is_published = ?' : ''
  const sql = `SELECT id, invite_id, name, rating, comment, created_at, is_published, published_at
                 FROM reviews ${where}
                ORDER BY created_at DESC`
  const stmt = db.prepare(sql)
  const rows = (
    parsed.data.published !== undefined
      ? stmt.all(Number(parsed.data.published))
      : stmt.all()
  ) as ReviewRow[]

  return rows.map((r) => ({ ...r, is_published: r.is_published === 1 }))
})
