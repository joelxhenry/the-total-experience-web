<template>
  <section id="booking" class="py-16 bg-white dark:bg-gray-900 relative">
    <!-- Mobile Training Notice -->
    <div class="py-12 bg-primary-50 dark:bg-gray-800 mb-16">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h3 class="text-2xl font-bold mb-4 text-primary-800 dark:text-primary-300">
            <i class="pi pi-car mr-2"></i>
            Mobile Training Available
          </h3>
          <p class="text-lg text-primary-700 dark:text-primary-400 mb-2">
            All training is offered on-location at your convenience. We come to you!
          </p>
          <p class="text-primary-600 dark:text-primary-500">
            <strong>{{ config.mobileTraining.notes }}</strong>
          </p>
        </div>
      </div>
    </div>

    <!-- Background Image -->
    <div class="absolute inset-0 z-0">
      <img 
        :src="config.getBookingBackgroundImage().src"
        :alt="config.getBookingBackgroundImage().alt"
        class="w-full h-full object-cover opacity-5"
      />
    </div>
    
    <div class="relative z-10 container mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        Ready to Get Certified?
      </h2>
      <div class="max-w-4xl mx-auto text-center">
        <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Schedule your BLS or ACLS training session today. Choose a time that works for you and your team.
        </p>
        
        <!-- Square Appointments Booking Button -->
        <div class="mb-8">
          <!-- Primary Square Booking Button -->
          <button
            @click="openBookingWidget"
            :style="buttonStyle"
            class="inline-block hover:transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 mb-4 mr-4"
            :class="{'opacity-75 cursor-not-allowed': isLoading}"
            :disabled="isLoading"
          >
            <i class="pi pi-calendar mr-2"></i>
            {{ buttonText }}
          </button>
          
          <!-- Alternative Styled Button -->
          <Button 
            label="Schedule Training Session" 
            icon="pi pi-phone"
            class="p-button-lg bg-secondary-600 hover:bg-secondary-700 text-white px-6 py-3 text-base font-semibold rounded-lg transition-colors shadow-md"
            @click="callToBook"
          />
          
          <!-- Fallback Link (hidden by default) -->
          <div class="mt-4 text-center">
            <a 
              :href="bookingUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm underline"
            >
              Having issues? Click here to book directly
            </a>
          </div>
        </div>

        <!-- Contact Information -->
        <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
          <h3 class="text-xl font-bold mb-4 text-gray-800 dark:text-white">Questions? Contact Us</h3>
          <p class="text-gray-600 dark:text-gray-300 mb-2">
            <i class="pi pi-phone mr-2"></i>
            <strong>Phone:</strong> <a :href="config.contact.phoneLink" class="hover:text-primary-600 dark:hover:text-primary-400">{{ config.contact.phone }}</a>
          </p>
          <p class="text-gray-600 dark:text-gray-300 mb-2">
            <i class="pi pi-envelope mr-2"></i>
            <strong>Email:</strong> <a :href="config.contact.emailLink" class="hover:text-primary-600 dark:hover:text-primary-400">{{ config.contact.email }}</a>
          </p>
          <p class="text-gray-600 dark:text-gray-300">
            <i class="pi pi-map-marker mr-2"></i>
            <strong>Address:</strong> {{ config.getFullAddress() }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useSiteConfig } from '~/composables/useSiteConfig.js'
import { useSquareBooking } from '~/composables/useSquareBooking.js'

// Get site configuration and Square booking functionality
const config = useSiteConfig()
const { 
  openBookingWidget, 
  buttonStyle, 
  buttonText, 
  bookingUrl,
  isScriptLoaded 
} = useSquareBooking()

// Component state
const isLoading = ref(false)

// No props needed anymore

// Methods
const callToBook = () => {
  window.open(config.contact.phoneLink, '_self')
}

// Emit events for parent component communication
defineEmits(['open-square-booking'])
</script>

<style scoped>
/* Component-specific styles if needed */
</style>