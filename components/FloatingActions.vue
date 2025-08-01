<template>
  <div class="floating-actions">
    <!-- Quick Call Button -->
    <div class="fab fab--call" @click="callInstructor" title="Call Now">
      <i class="pi pi-phone"></i>
      <div class="fab__ripple"></div>
    </div>
    
    <!-- Scroll to Top -->
    <div 
      class="fab fab--scroll" 
      :class="{ 'fab--visible': showScrollTop }"
      @click="scrollToTop"
      title="Back to Top"
    >
      <i class="pi pi-arrow-up"></i>
      <div class="fab__ripple"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useSiteConfig } from '~/composables/useSiteConfig.js'

// Get site configuration
const config = useSiteConfig()

const showScrollTop = ref(false)

const callInstructor = () => {
  window.location.href = config.contact.phoneLink
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Scroll event handler
const handleScroll = () => {
  showScrollTop.value = window.scrollY > 400
}

// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll() // Initial call
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Floating Action Buttons */
.floating-actions {
  @apply fixed bottom-6 right-6 z-40 flex flex-col space-y-4;
}

.fab {
  @apply w-14 h-14 bg-white shadow-lg rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 relative overflow-hidden;
}

.fab:hover {
  @apply transform scale-110;
}

.fab--call {
  @apply bg-gradient-to-r from-green-500 to-green-600 text-white;
}

.fab--call:hover {
  box-shadow: 0 8px 25px rgba(34, 197, 94, 0.4);
}

.fab--scroll {
  @apply bg-gradient-to-r from-primary-600 to-primary-700 text-white opacity-0 translate-y-4 pointer-events-none;
}

.fab--scroll.fab--visible {
  @apply opacity-100 translate-y-0 pointer-events-auto;
}

.fab--scroll:hover {
  box-shadow: 0 8px 25px rgba(34, 197, 94, 0.4);
}

.fab__ripple {
  @apply absolute inset-0 bg-white/20 rounded-full;
  animation: fabRipple 0.6s ease-out;
}

@keyframes fabRipple {
  0% { transform: scale(0); opacity: 1; }
  100% { transform: scale(2); opacity: 0; }
}

@media (max-width: 640px) {
  .floating-actions {
    @apply bottom-4 right-4;
  }
  
  .fab {
    @apply w-12 h-12;
  }
}
</style>