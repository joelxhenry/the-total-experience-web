import { useDb } from '../../db'

interface PublicReviewRow {
  id: string
  name: string
  rating: number
  comment: string
  created_at: number
}

export default defineEventHandler(() => {
  const db = useDb()
  const rows = db.prepare(
    `SELECT id, name, rating, comment, created_at
     FROM reviews
     WHERE is_published = 1
     ORDER BY published_at DESC`
  ).all() as PublicReviewRow[]

  return rows
})
