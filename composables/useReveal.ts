import type { Ref } from 'vue'

export interface UseRevealOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useReveal(
  target: Ref<HTMLElement | null>,
  options: UseRevealOptions = {}
) {
  const { threshold = 0.15, rootMargin = '0px 0px -10% 0px', once = true } = options
  const visible = ref(false)
  let observer: IntersectionObserver | null = null

  const cleanup = () => {
    observer?.disconnect()
    observer = null
  }

  onMounted(() => {
    if (!import.meta.client) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || typeof IntersectionObserver === 'undefined') {
      visible.value = true
      return
    }

    if (!target.value) {
      visible.value = true
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.value = true
            if (once) {
              cleanup()
              break
            }
          } else if (!once) {
            visible.value = false
          }
        }
      },
      { threshold, rootMargin }
    )
    observer.observe(target.value)
  })

  onBeforeUnmount(cleanup)

  return { visible }
}
