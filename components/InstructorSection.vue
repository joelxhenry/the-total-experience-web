<template>
  <section id="instructor" class="py-16 bg-white dark:bg-gray-900">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
        Meet Your {{ config.instructors.length > 1 ? 'Instructors' : 'Instructor' }}
      </h2>
      
      <div class="max-w-7xl mx-auto">
        <!-- Instructor Navigation (dots) - Only show if multiple instructors -->
        <div v-if="config.instructors.length > 1" class="flex justify-center mb-8">
          <div class="flex space-x-3">
            <button
              v-for="(instructor, index) in config.instructors"
              :key="instructor.id"
              @click="setActiveInstructor(index)"
              :class="[
                'w-4 h-4 rounded-full transition-all duration-300',
                activeInstructorIndex === index
                  ? 'bg-primary-600 scale-125'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-primary-400'
              ]"
              :aria-label="`View ${instructor.name} profile`"
            />
          </div>
        </div>

        <!-- Instructor Slider Container -->
        <div class="relative overflow-hidden">
          <div 
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${activeInstructorIndex * 100}%)` }"
          >
            <!-- Individual Instructor Slides -->
            <div
              v-for="(instructor, index) in config.instructors"
              :key="instructor.id"
              class="w-full flex-shrink-0"
            >
              <div class="grid lg:grid-cols-5 gap-8 items-start">
                <!-- Instructor Image - Smaller proportion -->
                <div class="lg:col-span-2 text-center">
                  <div class="relative inline-block">
                    <img 
                      :src="instructor.image || config.getInstructorImage().src"
                      :alt="instructor.imageAlt || config.getInstructorImage().alt"
                      class="w-64 h-64 lg:w-72 lg:h-72 rounded-2xl object-cover shadow-2xl mx-auto transition-all duration-300"
                      @error="handleImageError"
                    />
                    <div class="absolute -bottom-3 -right-3 bg-primary-600 text-white p-3 rounded-xl shadow-lg">
                      <i class="pi pi-star-fill text-xl"></i>
                    </div>
                  </div>
                </div>

                <!-- Instructor Information - Larger proportion -->
                <div class="lg:col-span-3 space-y-6">
                  <div>
                    <h3 class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
                      {{ instructor.name }}, {{ instructor.credentials }}
                    </h3>
                    <p class="text-xl text-primary-600 dark:text-primary-400 font-semibold mb-4">
                      {{ instructor.title }}
                    </p>
                  </div>

                  <!-- Credentials -->
                  <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                    <h4 class="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                      <i class="pi pi-verified text-primary-600 mr-2"></i>
                      Credentials & Qualifications
                    </h4>
                    <ul class="space-y-2 text-gray-600 dark:text-gray-300">
                      <li 
                        v-for="qualification in instructor.qualifications"
                        :key="qualification"
                        class="flex items-start"
                      >
                        <i class="pi pi-check text-green-500 mr-3 mt-1 flex-shrink-0"></i>
                        <span>{{ qualification }}</span>
                      </li>
                    </ul>
                  </div>

                  <!-- Personal Message -->
                  <div class="bg-primary-50 dark:bg-primary-900/30 p-6 rounded-xl border-l-4 border-primary-600">
                    <h4 class="text-lg font-bold text-gray-800 dark:text-white mb-3 flex items-center">
                      <i class="pi pi-quote-left text-primary-600 mr-2"></i>
                      A Message from {{ instructor.name.split(' ')[0] }}
                    </h4>
                    <p class="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                      "{{ instructor.bio }}"
                    </p>
                    <div class="mt-4 flex items-center">
                      <div class="text-right">
                        <p class="font-semibold text-gray-800 dark:text-white">{{ instructor.name }}</p>
                        <p class="text-sm text-primary-600 dark:text-primary-400">{{ instructor.fullTitle }}</p>
                      </div>
                    </div>
                  </div>

                  <!-- Contact CTA -->
                  <div class="text-center lg:text-left">
                    <Button 
                      :label="`Schedule Training with ${instructor.name.split(' ')[0]}`" 
                      icon="pi pi-calendar"
                      class="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors shadow-lg"
                      @click="$emit('open-square-booking')"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Arrows - Only show if multiple instructors -->
        <div v-if="config.instructors.length > 1" class="flex justify-center mt-8 space-x-4">
          <button
            @click="previousInstructor"
            :disabled="activeInstructorIndex === 0"
            class="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            aria-label="Previous instructor"
          >
            <i class="pi pi-chevron-left text-gray-600 dark:text-gray-300"></i>
          </button>
          <button
            @click="nextInstructor"
            :disabled="activeInstructorIndex === config.instructors.length - 1"
            class="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            aria-label="Next instructor"
          >
            <i class="pi pi-chevron-right text-gray-600 dark:text-gray-300"></i>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useSiteConfig } from '~/composables/useSiteConfig.js'

// Get site configuration
const config = useSiteConfig()

// Reactive state for slider
const activeInstructorIndex = ref(0)

// Auto-slide functionality (optional)
const autoSlideInterval = ref(null)
const SLIDE_DURATION = 8000 // 8 seconds

// Methods
const setActiveInstructor = (index) => {
  activeInstructorIndex.value = index
  resetAutoSlide()
}

const nextInstructor = () => {
  if (activeInstructorIndex.value < config.instructors.length - 1) {
    activeInstructorIndex.value++
    resetAutoSlide()
  }
}

const previousInstructor = () => {
  if (activeInstructorIndex.value > 0) {
    activeInstructorIndex.value--
    resetAutoSlide()
  }
}

const autoSlide = () => {
  if (config.instructors.length > 1) {
    activeInstructorIndex.value = (activeInstructorIndex.value + 1) % config.instructors.length
  }
}

const startAutoSlide = () => {
  if (config.instructors.length > 1) {
    autoSlideInterval.value = setInterval(autoSlide, SLIDE_DURATION)
  }
}

const stopAutoSlide = () => {
  if (autoSlideInterval.value) {
    clearInterval(autoSlideInterval.value)
    autoSlideInterval.value = null
  }
}

const resetAutoSlide = () => {
  stopAutoSlide()
  startAutoSlide()
}

const handleImageError = (event) => {
  // Fallback to default instructor image if specific instructor image fails
  event.target.src = config.getInstructorImage().src
}

// Keyboard navigation
const handleKeydown = (event) => {
  if (config.instructors.length <= 1) return
  
  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault()
      previousInstructor()
      break
    case 'ArrowRight':
      event.preventDefault()
      nextInstructor()
      break
    case 'Home':
      event.preventDefault()
      setActiveInstructor(0)
      break
    case 'End':
      event.preventDefault()
      setActiveInstructor(config.instructors.length - 1)
      break
  }
}

// Lifecycle hooks
onMounted(() => {
  startAutoSlide()
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  stopAutoSlide()
  document.removeEventListener('keydown', handleKeydown)
})

defineEmits(['open-square-booking'])
</script>

<style scoped>
/* Component-specific styles if needed */
</style>