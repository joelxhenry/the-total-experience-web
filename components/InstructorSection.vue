<template>
  <section id="instructor" class="py-16 bg-white dark:bg-gray-900">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
        Meet Your Instructor
      </h2>
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-5 gap-8 items-start">
          <!-- Instructor Image - Smaller proportion -->
          <div class="lg:col-span-2 text-center">
            <div class="relative inline-block">
              <img 
                :src="config.getInstructorImage().src"
                :alt="config.getInstructorImage().alt"
                class="w-64 h-64 lg:w-72 lg:h-72 rounded-2xl object-cover shadow-2xl mx-auto"
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
                {{ config.getInstructorFullName() }}
              </h3>
              <p class="text-xl text-primary-600 dark:text-primary-400 font-semibold mb-4">
                {{ config.instructor.title }}
              </p>
            </div>

            <!-- Credentials -->
            <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
              <h4 class="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                <i class="pi pi-verified text-primary-600 mr-2"></i>
                Credentials & Qualifications
              </h4>
              <ul class="space-y-2 text-gray-600 dark:text-gray-300">
                <li class="flex items-start">
                  <i class="pi pi-check text-green-500 mr-3 mt-1"></i>
                  <span>Registered Nurse (RN) with Bachelor of Science in Nursing (BSN)</span>
                </li>
                <li class="flex items-start">
                  <i class="pi pi-check text-green-500 mr-3 mt-1"></i>
                  <span>American Heart Association BLS & ACLS Instructor Certified</span>
                </li>
                <li class="flex items-start">
                  <i class="pi pi-check text-green-500 mr-3 mt-1"></i>
                  <span>8+ years of critical care nursing experience</span>
                </li>
                <li class="flex items-start">
                  <i class="pi pi-check text-green-500 mr-3 mt-1"></i>
                  <span>5+ years of training and education experience</span>
                </li>
                <li class="flex items-start">
                  <i class="pi pi-check text-green-500 mr-3 mt-1"></i>
                  <span>Specialized in Emergency and ICU nursing</span>
                </li>
              </ul>
            </div>

            <!-- Personal Message -->
            <div class="bg-primary-50 dark:bg-primary-900/30 p-6 rounded-xl border-l-4 border-primary-600">
              <h4 class="text-lg font-bold text-gray-800 dark:text-white mb-3 flex items-center">
                <i class="pi pi-quote-left text-primary-600 mr-2"></i>
                A Message from Sarah
              </h4>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                "{{ config.instructor.bio }}"
              </p>
              <div class="mt-4 flex items-center">
                <div class="text-right">
                  <p class="font-semibold text-gray-800 dark:text-white">{{ config.getInstructorFullName() }}</p>
                  <p class="text-sm text-primary-600 dark:text-primary-400">{{ config.instructor.fullTitle }}</p>
                </div>
              </div>
            </div>

            <!-- Contact CTA -->
            <div class="text-center lg:text-left">
              <Button 
:label="`Schedule Training with ${config.instructor.name}`" 
                icon="pi pi-calendar"
                class="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors shadow-lg"
                @click="$emit('open-square-booking')"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useSiteConfig } from '~/composables/useSiteConfig.js'

// Get site configuration
const config = useSiteConfig()

defineEmits(['open-square-booking'])
</script>

<style scoped>
/* Component-specific styles if needed */
</style>