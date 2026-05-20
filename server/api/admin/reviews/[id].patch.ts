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
  const publish = parsed.data.is_published ? 1 : 0
  const publishedAt = parsed.data.is_published ? Date.now() : null

  const result = db
    .prepare('UPDATE reviews SET is_published = ?, published_at = ? WHERE id = ?')
    .run(publish, publishedAt, id)

  if (result.changes !== 1) {
    throw createError({ statusCode: 404, statusMessage: 'Review not found' })
  }

  return { id, is_published: parsed.data.is_published, published_at: publishedAt }
})
