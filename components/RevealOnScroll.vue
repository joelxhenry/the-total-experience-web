<template>
  <component
    :is="as"
    ref="el"
    class="reveal"
    :class="[visible && 'reveal--in', directionClass]"
    :style="delayStyle"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
type Direction = 'up' | 'down' | 'left' | 'right' | 'fade'

const props = withDefaults(
  defineProps<{
    as?: string
    direction?: Direction
    delay?: number
    threshold?: number
    rootMargin?: string
  }>(),
  {
    as: 'div',
    direction: 'up',
    delay: 0,
    threshold: 0.15,
    rootMargin: '0px 0px -10% 0px'
  }
)

const el = ref<HTMLElement | null>(null)
const { visible } = useReveal(el, {
  threshold: props.threshold,
  rootMargin: props.rootMargin
})

const directionClass = computed(() => `reveal--${props.direction}`)
const delayStyle = computed(() =>
  props.delay ? { transitionDelay: visible.value ? `${props.delay}ms` : '0ms' } : undefined
)
</script>

<style scoped>
.reveal {
  opacity: 0;
  transition: opacity 600ms ease-out, transform 600ms ease-out;
  will-change: opacity, transform;
}

.reveal--up { transform: translateY(20px); }
.reveal--down { transform: translateY(-20px); }
.reveal--left { transform: translateX(-24px); }
.reveal--right { transform: translateX(24px); }
.reveal--fade { transform: none; }

.reveal--in {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
