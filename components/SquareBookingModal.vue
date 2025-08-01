<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Overlay -->
    <div 
      class="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
      @click="closeModal"
    ></div>
    
    <!-- Modal Content -->
    <div class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
      <!-- Modal Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-600">
        <div>
          <h3 class="text-2xl font-bold text-gray-800 dark:text-white">
            Book Your Training Session
          </h3>
          <p class="text-gray-600 dark:text-gray-300 mt-1">
            Schedule your BLS or ACLS certification training
          </p>
        </div>
        <button
          @click="closeModal"
          class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <i class="pi pi-times text-xl text-gray-500 dark:text-gray-400"></i>
        </button>
      </div>
      
      <!-- Modal Body -->
      <div class="p-6">
        <!-- Booking Options -->
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <div class="text-center mb-6">
            <i class="pi pi-calendar text-4xl text-primary-600 dark:text-primary-400 mb-4"></i>
            <h4 class="text-xl font-bold text-gray-800 dark:text-white mb-2">Ready to Book?</h4>
            <p class="text-gray-600 dark:text-gray-300">
              Choose your preferred booking method below
            </p>
          </div>
          
          <!-- Primary Booking Button -->
          <div class="mb-4">
            <a 
              :href="bookingUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white px-6 py-4 rounded-lg transition-colors text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              @click="closeModal"
            >
              <i class="pi pi-external-link mr-3"></i>
              Book Online with Square
            </a>
          </div>
          
          <!-- Quick Booking Info -->
          <div class="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-600 rounded-lg p-4 mb-4">
            <div class="flex items-start">
              <i class="pi pi-info-circle text-blue-600 dark:text-blue-400 mt-1 mr-3"></i>
              <div class="text-sm">
                <p class="font-semibold text-blue-800 dark:text-blue-300 mb-1">Quick & Secure</p>
                <p class="text-blue-700 dark:text-blue-400">
                  You'll be redirected to Square's secure booking platform where you can view available times and complete your reservation.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Alternative Contact Methods -->
        <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
          <h4 class="font-bold text-gray-800 dark:text-white mb-4">Prefer to Book by Phone?</h4>
          <div class="flex flex-col sm:flex-row gap-4">
            <button
              @click="callToBook"
              class="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <i class="pi pi-phone mr-2"></i>
              Call {{ config.contact.phone }}
            </button>
            <button
              @click="emailToBook"
              class="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <i class="pi pi-envelope mr-2"></i>
              Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useSiteConfig } from '~/composables/useSiteConfig.js'
import { useSquareBooking } from '~/composables/useSquareBooking.js'

// Configuration and booking functionality
const config = useSiteConfig()
const { bookingUrl } = useSquareBooking()

// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['close'])

// Methods
const closeModal = () => {
  emit('close')
}

const callToBook = () => {
  window.open(config.contact.phoneLink, '_self')
  closeModal()
}

const emailToBook = () => {
  const subject = encodeURIComponent('BLS/ACLS Training Booking Request')
  const body = encodeURIComponent(`Hello,

I would like to book a BLS/ACLS training session.

Please contact me to schedule.

Thank you!`)
  
  window.open(`mailto:${config.contact.email}?subject=${subject}&body=${body}`, '_self')
  closeModal()
}

// No need to initialize Square widget - using direct booking approach

// Handle escape key
const handleEscape = (e) => {
  if (e.key === 'Escape' && props.isOpen) {
    closeModal()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

// Cleanup on unmount
onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped>
/* Modal animations */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* Custom scrollbar for modal content */
.overflow-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-auto::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-gray-700;
}

.overflow-auto::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-gray-500 rounded-full;
}

.overflow-auto::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400 dark:bg-gray-400;
}
</style>