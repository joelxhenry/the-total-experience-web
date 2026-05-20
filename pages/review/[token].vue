<script setup lang="ts">
definePageMeta({
  layout: false
})

useSeoMeta({
  title: 'Leave a Review',
  robots: 'noindex, nofollow'
})

const COMMENT_MAX = 1000
const NAME_MAX = 120

const route = useRoute()
const token = computed(() => String(route.params.token ?? ''))

const { data, error, pending } = await useFetch('/api/reviews/validate', {
  key: `validate-${token.value}`,
  query: { token: token.value },
  server: false
})

const failureReason = computed<'not_found' | 'used' | 'expired' | 'unknown' | null>(() => {
  if (!error.value) return null
  const status = (error.value as { statusCode?: number }).statusCode
  const reason = (error.value as { data?: { data?: { reason?: string } } }).data?.data?.reason
  if (reason === 'used' || reason === 'expired') return reason
  if (status === 404) return 'not_found'
  if (status === 410) return 'expired'
  return 'unknown'
})

const name = ref('')
const rating = ref(0)
const hoverRating = ref(0)
const comment = ref('')
const submitting = ref(false)
const submitError = ref<string | null>(null)
const submitted = ref(false)

watch(
  () => data.value,
  (v) => {
    if (v?.valid && v.customer_name && !name.value) {
      name.value = v.customer_name
    }
  },
  { immediate: true }
)

const commentRemaining = computed(() => COMMENT_MAX - comment.value.length)
const canSubmit = computed(
  () =>
    !submitting.value &&
    name.value.trim().length > 0 &&
    rating.value >= 1 &&
    rating.value <= 5 &&
    comment.value.trim().length > 0 &&
    comment.value.length <= COMMENT_MAX
)

const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Very good', 'Excellent']
const displayRating = computed(() => hoverRating.value || rating.value)
const ratingLabel = computed(() => ratingLabels[displayRating.value] || 'Select a rating')

function setRating(n: number) {
  rating.value = n
}

function onStarKeydown(e: KeyboardEvent) {
  const key = e.key
  if (key === 'ArrowRight' || key === 'ArrowUp') {
    e.preventDefault()
    rating.value = Math.min(5, (rating.value || 0) + 1)
  } else if (key === 'ArrowLeft' || key === 'ArrowDown') {
    e.preventDefault()
    rating.value = Math.max(1, (rating.value || 1) - 1)
  } else if (key >= '1' && key <= '5') {
    e.preventDefault()
    rating.value = Number(key)
  } else if (key === 'Home') {
    e.preventDefault()
    rating.value = 1
  } else if (key === 'End') {
    e.preventDefault()
    rating.value = 5
  }
}

async function onSubmit() {
  if (!canSubmit.value) return
  submitting.value = true
  submitError.value = null
  try {
    await $fetch('/api/reviews/submit', {
      method: 'POST',
      body: {
        token: token.value,
        name: name.value.trim(),
        rating: rating.value,
        comment: comment.value.trim()
      }
    })
    submitted.value = true
  } catch (err: unknown) {
    const status = (err as { statusCode?: number }).statusCode
    submitError.value =
      status === 409
        ? 'This review link has already been used.'
        : status === 410
          ? 'This review link has expired.'
          : status === 400
            ? 'Please check the form fields and try again.'
            : 'Something went wrong submitting your review. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <main class="container mx-auto px-4 lg:px-20 py-16 lg:py-24">
      <div class="max-w-2xl mx-auto">
        <header class="text-center mb-10">
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Leave a Review
          </h1>
          <p class="text-base text-gray-600 dark:text-gray-300">
            Thanks for training with The Total Experience.
          </p>
        </header>

        <section
          v-if="pending"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center"
          aria-live="polite"
        >
          <i class="pi pi-spin pi-spinner text-3xl text-primary-600 dark:text-primary-400" />
          <p class="mt-4 text-gray-600 dark:text-gray-300">Verifying your invite…</p>
        </section>

        <section
          v-else-if="failureReason === 'used'"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center"
        >
          <i class="pi pi-check-circle text-4xl text-primary-600 dark:text-primary-400" />
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
            This review link has already been used
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            Thanks — we've already received a response for this invitation. If you believe this is
            a mistake, please reach out to us directly.
          </p>
        </section>

        <section
          v-else-if="failureReason === 'expired'"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center"
        >
          <i class="pi pi-clock text-4xl text-yellow-500" />
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
            This review link has expired
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            Review invitations are valid for a limited time. Contact us and we'll happily send a
            fresh link.
          </p>
        </section>

        <section
          v-else-if="failureReason"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center"
        >
          <i class="pi pi-exclamation-triangle text-4xl text-yellow-500" />
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
            We couldn't find that review invitation
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            The link may be incomplete. Please double-check the URL from your email, or contact us
            for help.
          </p>
        </section>

        <section
          v-else-if="submitted"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center"
          aria-live="polite"
        >
          <i class="pi pi-check-circle text-5xl text-primary-600 dark:text-primary-400" />
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
            Thank you!
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            Your review has been submitted. We appreciate you taking the time to share your
            experience.
          </p>
        </section>

        <form
          v-else-if="data?.valid"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8"
          novalidate
          @submit.prevent="onSubmit"
        >
          <div class="mb-6">
            <label
              for="review-name"
              class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
            >
              Your name
            </label>
            <input
              id="review-name"
              v-model="name"
              type="text"
              required
              :maxlength="NAME_MAX"
              autocomplete="name"
              class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            />
          </div>

          <div class="mb-6">
            <span
              id="rating-label"
              class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
            >
              Your rating
            </span>
            <div
              role="radiogroup"
              aria-labelledby="rating-label"
              :tabindex="rating ? -1 : 0"
              class="inline-flex items-center gap-1 focus:outline-none"
              @keydown="onStarKeydown"
              @mouseleave="hoverRating = 0"
            >
              <button
                v-for="n in 5"
                :key="n"
                type="button"
                role="radio"
                :aria-checked="rating === n"
                :aria-label="`${n} star${n === 1 ? '' : 's'}`"
                :tabindex="rating === n || (!rating && n === 1) ? 0 : -1"
                class="p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 transition-transform motion-safe:hover:scale-110"
                @click="setRating(n)"
                @mouseenter="hoverRating = n"
                @focus="hoverRating = n"
                @blur="hoverRating = 0"
                @keydown="onStarKeydown"
              >
                <i
                  class="pi text-3xl md:text-4xl transition-colors"
                  :class="[
                    n <= displayRating
                      ? 'pi-star-fill text-yellow-400'
                      : 'pi-star text-gray-300 dark:text-gray-600'
                  ]"
                />
              </button>
              <span class="ml-3 text-sm text-gray-600 dark:text-gray-400" aria-live="polite">
                {{ ratingLabel }}
              </span>
            </div>
          </div>

          <div class="mb-6">
            <label
              for="review-comment"
              class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
            >
              Your review
            </label>
            <textarea
              id="review-comment"
              v-model="comment"
              required
              rows="6"
              :maxlength="COMMENT_MAX"
              aria-describedby="comment-counter"
              class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-y"
            />
            <p
              id="comment-counter"
              class="mt-2 text-xs text-gray-500 dark:text-gray-400 text-right"
              :class="commentRemaining < 50 ? 'text-yellow-600 dark:text-yellow-400' : ''"
              aria-live="polite"
            >
              {{ commentRemaining }} characters remaining
            </p>
          </div>

          <div
            v-if="submitError"
            role="alert"
            class="mb-4 rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 px-4 py-3 text-sm"
          >
            {{ submitError }}
          </div>

          <button
            type="submit"
            :disabled="!canSubmit"
            class="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 motion-safe:transform motion-safe:hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800"
          >
            <i v-if="submitting" class="pi pi-spin pi-spinner" />
            <i v-else class="pi pi-send" />
            <span>{{ submitting ? 'Submitting…' : 'Submit review' }}</span>
          </button>
        </form>

        <div class="text-center mt-8">
          <NuxtLink
            to="/"
            class="text-sm text-primary-600 dark:text-primary-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
          >
            ← Back to home
          </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>
