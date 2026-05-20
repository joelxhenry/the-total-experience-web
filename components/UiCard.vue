<template>
  <article
    class="ui-card"
    :class="[
      `ui-card--${tone}`,
      interactive && 'ui-card--interactive',
      padded && 'ui-card--padded'
    ]"
  >
    <div v-if="icon || $slots.icon" class="ui-card__icon">
      <slot name="icon">
        <i :class="['pi', icon]" aria-hidden="true"></i>
      </slot>
    </div>
    <h3 v-if="title" class="ui-card__title">{{ title }}</h3>
    <div class="ui-card__body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="ui-card__footer">
      <slot name="footer" />
    </div>
  </article>
</template>

<script setup lang="ts">
type Tone = 'default' | 'subtle' | 'elevated'

withDefaults(
  defineProps<{
    title?: string
    icon?: string
    tone?: Tone
    interactive?: boolean
    padded?: boolean
  }>(),
  {
    tone: 'default',
    interactive: true,
    padded: true
  }
)
</script>

<style scoped>
.ui-card {
  @apply relative rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-card transition-all duration-300 text-center;
}

.ui-card--padded {
  @apply p-8;
}

.ui-card--subtle {
  @apply bg-gray-50 dark:bg-gray-800/60;
}

.ui-card--elevated {
  @apply shadow-card-lg;
}

.ui-card--interactive {
  @apply will-change-transform;
}

.ui-card--interactive:hover {
  @apply -translate-y-1 shadow-card-lg border-primary-200 dark:border-primary-700/60;
}

.ui-card--interactive:focus-within {
  @apply ring-2 ring-primary-500/60 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 outline-none;
}

.ui-card__icon {
  @apply mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 text-2xl;
}

.ui-card__title {
  @apply text-xl font-bold mb-3 text-gray-800 dark:text-white;
}

.ui-card__body {
  @apply text-gray-600 dark:text-gray-300 leading-relaxed;
}

.ui-card__footer {
  @apply mt-6;
}

@media (prefers-reduced-motion: reduce) {
  .ui-card,
  .ui-card--interactive:hover {
    @apply transition-none transform-none;
  }
}
</style>
