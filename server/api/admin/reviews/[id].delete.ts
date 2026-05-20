import { useDb } from '../../../db'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing review id' })
  }
  const db = useDb()
  const result = db.prepare('DELETE FROM reviews WHERE id = ?').run(id)
  if (result.changes !== 1) {
    throw createError({ statusCode: 404, statusMessage: 'Review not found' })
  }
  setResponseStatus(event, 204)
  return null
})
