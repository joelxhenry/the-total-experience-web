import { useDb } from '../../db'

interface PublicReviewRow {
  id: string
  name: string
  rating: number
  comment: string
  created_at: number
}

export default defineEventHandler(async () => {
  const db = useDb()
  const { data, error } = await db
    .from('reviews')
    .select('id, name, rating, comment, created_at')
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  if (error) {
    console.error('[reviews/public] query failed', error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to load reviews' })
  }

  return (data ?? []) as PublicReviewRow[]
})
