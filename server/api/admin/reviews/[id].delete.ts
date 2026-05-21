import { useDb } from '../../../db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing review id' })
  }
  const db = useDb()
  const { data, error } = await db.from('reviews').delete().eq('id', id).select('id')
  if (error) {
    console.error('[admin/reviews.delete] failed', error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to delete review' })
  }
  if (!data || data.length !== 1) {
    throw createError({ statusCode: 404, statusMessage: 'Review not found' })
  }
  setResponseStatus(event, 204)
  return null
})
