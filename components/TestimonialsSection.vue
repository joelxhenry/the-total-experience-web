<template>
  <section v-if="items.length" id="testimonials" ref="sectionEl" class="py-20 md:py-28 bg-white dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-6">
      <h2
        class="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white testimonial-reveal"
        :class="{ 'testimonial-reveal--in': visible }"
      >
        What Our Students Say
      </h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <Card
          v-for="(review, idx) in items"
          :key="review.id"
          class="shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border dark:border-gray-600 testimonial-reveal"
          :class="{ 'testimonial-reveal--in': visible }"
          :style="{ transitionDelay: visible ? `${idx * 80}ms` : '0ms' }"
        >
          <template #content>
            <div class="p-6">
              <div class="flex items-center mb-4" :aria-label="`${review.rating} out of 5 stars`">
                <i
                  v-for="n in 5"
                  :key="n"
                  class="pi text-yellow-400 mr-1"
                  :class="n <= review.rating ? 'pi-star-fill' : 'pi-star'"
                  aria-hidden="true"
                ></i>
              </div>
              <p class="text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed">
                &ldquo;{{ review.comment }}&rdquo;
              </p>
              <div class="flex items-center">
                <div
                  class="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-200 font-bold mr-3"
                  aria-hidden="true"
                >
                  {{ initialOf(review.name) }}
                </div>
                <p class="font-semibold text-gray-800 dark:text-white">{{ review.name }}</p>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface PublicReview {
  id: string
  name: string
  rating: number
  comment: string
  created_at: number
}

const { data } = await useFetch<PublicReview[]>('/api/reviews/public', {
  key: 'reviews-public',
  default: () => []
})

const items = computed<PublicReview[]>(() => data.value ?? [])

const initialOf = (name: string) => (name?.trim()?.charAt(0) || '?').toUpperCase()

const sectionEl = ref<HTMLElement | null>(null)
const visible = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!import.meta.client) return

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce || typeof IntersectionObserver === 'undefined') {
    visible.value = true
    return
  }

  if (!sectionEl.value) {
    visible.value = true
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          visible.value = true
          observer?.disconnect()
          observer = null
          break
        }
      }
    },
    { threshold: 0.15 }
  )
  observer.observe(sectionEl.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})
</script>

<style scoped>
.testimonial-reveal {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 600ms ease-out, transform 600ms ease-out;
  will-change: opacity, transform;
}

.testimonial-reveal--in {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .testimonial-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
