import { useDb } from '../db'

export default defineNitroPlugin(() => {
  useDb()
})
