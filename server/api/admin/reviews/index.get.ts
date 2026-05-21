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
  is_published: boolean
  published_at: number | null
}

export default defineEventHandler(async (event) => {
  const parsed = QuerySchema.safeParse(getQuery(event))
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid query' })
  }

  const db = useDb()
  let query = db
    .from('reviews')
    .select('id, invite_id, name, rating, comment, created_at, is_published, published_at')
    .order('created_at', { ascending: false })

  if (parsed.data.published !== undefined) {
    query = query.eq('is_published', parsed.data.published === '1')
  }

  const { data, error } = await query
  if (error) {
    console.error('[admin/reviews.get] query failed', error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to load reviews' })
  }

  return (data ?? []) as ReviewRow[]
})
