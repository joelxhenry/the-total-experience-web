<template>
  <section class="py-20 md:py-28 bg-gray-50 dark:bg-gray-800">
    <div class="max-w-7xl mx-auto px-6">
      <RevealOnScroll as="h2" class="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
        Why Choose Our Training?
      </RevealOnScroll>
      <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <UiCard icon="pi-user" title="Expert Instructor">
          Learn from an experienced registered nurse with years of clinical and teaching experience.
        </UiCard>
        <UiCard icon="pi-map-marker" title="Mobile Training">
          Convenient mobile training — we can come to you at your workplace or preferred location.
        </UiCard>
        <UiCard icon="pi-check-circle" title="Certified Training">
          Official American Heart Association certification upon successful completion.
        </UiCard>
      </div>
    </div>
  </section>
</template>

<script setup>
// No props or emits needed for this static section
</script>

<style scoped>
/* Component-specific styles if needed */
</style>