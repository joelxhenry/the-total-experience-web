import { z } from 'zod'
import { useDb } from '../../../db'

const BodySchema = z.object({
  is_published: z.boolean()
})

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing review id' })
  }
  const parsed = BodySchema.safeParse(await readBody(event))
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid body' })
  }

  const db = useDb()
  const publishedAt = parsed.data.is_published ? Date.now() : null

  const { data, error } = await db
    .from('reviews')
    .update({ is_published: parsed.data.is_published, published_at: publishedAt })
    .eq('id', id)
    .select('id')

  if (error) {
    console.error('[admin/reviews.patch] update failed', error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to update review' })
  }
  if (!data || data.length !== 1) {
    throw createError({ statusCode: 404, statusMessage: 'Review not found' })
  }

  return { id, is_published: parsed.data.is_published, published_at: publishedAt }
})
