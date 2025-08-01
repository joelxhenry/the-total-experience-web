<template>
  <section id="courses" class="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800 dark:text-white">
        Understanding BLS & ACLS
      </h2>
      <p class="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
        Discover the life-saving skills that make a difference in emergency situations. Click on each course to explore what you'll learn.
      </p>
      
      <div class="max-w-7xl mx-auto">
        <!-- Interactive Course Cards -->
        <div class="grid lg:grid-cols-2 gap-8">
          
          <!-- BLS Card -->
          <div class="group">
            <Card class="course-card overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/30 border-2 border-transparent hover:border-blue-300 dark:hover:border-blue-400">
              <template #header>
                <div class="relative overflow-hidden">
                  <img 
                    :src="config.getBLSCourseImage().src"
                    :alt="config.getBLSCourseImage().alt"
                    class="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-600/50 to-transparent"></div>
                  <div class="absolute bottom-4 left-4 right-4">
                    <div class="flex items-center mb-2">
                      <div class="bg-blue-500 p-2 rounded-full mr-3">
                        <i class="pi pi-heart-fill text-white text-xl"></i>
                      </div>
                      <h3 class="text-2xl font-bold text-white">Basic Life Support</h3>
                    </div>
                    <div class="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 inline-block">
                      <span class="text-white text-sm font-semibold">BLS Certification</span>
                    </div>
                  </div>
                </div>
              </template>
              <template #content>
                <div class="p-6">
                  <!-- Course Overview -->
                  <div class="mb-6">
                    <h4 class="text-lg font-bold text-gray-800 dark:text-white mb-3 flex items-center">
                      <i class="pi pi-info-circle text-blue-500 mr-2"></i>
                      What You'll Learn
                    </h4>
                    <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                      Master essential life-saving techniques that every healthcare professional needs to know.
                    </p>
                  </div>

                  <!-- Skills List -->
                  <div class="grid md:grid-cols-2 gap-3 mb-6">
                    <div class="flex items-center bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                      <i class="pi pi-check-circle text-blue-500 dark:text-blue-400 mr-2"></i>
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Adult CPR</span>
                    </div>
                    <div class="flex items-center bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                      <i class="pi pi-check-circle text-blue-500 dark:text-blue-400 mr-2"></i>
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Child CPR</span>
                    </div>
                    <div class="flex items-center bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                      <i class="pi pi-check-circle text-blue-500 dark:text-blue-400 mr-2"></i>
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Infant CPR</span>
                    </div>
                    <div class="flex items-center bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                      <i class="pi pi-check-circle text-blue-500 dark:text-blue-400 mr-2"></i>
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">AED Usage</span>
                    </div>
                    <div class="flex items-center bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                      <i class="pi pi-check-circle text-blue-500 dark:text-blue-400 mr-2"></i>
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Choking Relief</span>
                    </div>
                    <div class="flex items-center bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                      <i class="pi pi-check-circle text-blue-500 dark:text-blue-400 mr-2"></i>
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Team Dynamics</span>
                    </div>
                  </div>

                  <!-- Course Details -->
                  <div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg mb-4">
                    <div class="grid md:grid-cols-3 gap-4 text-center">
                      <div>
                        <i class="pi pi-clock text-blue-500 text-xl mb-1"></i>
                        <p class="text-sm font-semibold text-gray-700 dark:text-gray-300">Duration</p>
                        <p class="text-xs text-gray-600 dark:text-gray-400">4-6 hours</p>
                      </div>
                      <div>
                        <i class="pi pi-certificate text-blue-500 text-xl mb-1"></i>
                        <p class="text-sm font-semibold text-gray-700 dark:text-gray-300">Certification</p>
                        <p class="text-xs text-gray-600 dark:text-gray-400">2 years valid</p>
                      </div>
                      <div>
                        <i class="pi pi-users text-blue-500 text-xl mb-1"></i>
                        <p class="text-sm font-semibold text-gray-700 dark:text-gray-300">Audience</p>
                        <p class="text-xs text-gray-600 dark:text-gray-400">Healthcare pros</p>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </Card>
          </div>

          <!-- ACLS Card -->
          <div class="group">
            <Card class="course-card overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-gradient-to-br from-white to-red-50 dark:from-gray-800 dark:to-red-900/30 border-2 border-transparent hover:border-red-300 dark:hover:border-red-400">
              <template #header>
                <div class="relative overflow-hidden">
                  <img 
                    :src="config.getACLSCourseImage().src"
                    :alt="config.getACLSCourseImage().alt"
                    class="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-red-900/80 via-red-600/50 to-transparent"></div>
                  <div class="absolute bottom-4 left-4 right-4">
                    <div class="flex items-center mb-2">
                      <div class="bg-red-500 p-2 rounded-full mr-3">
                        <i class="pi pi-chart-line text-white text-xl"></i>
                      </div>
                      <h3 class="text-2xl font-bold text-white">Advanced Cardiac Life Support</h3>
                    </div>
                    <div class="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 inline-block">
                      <span class="text-white text-sm font-semibold">ACLS Certification</span>
                    </div>
                  </div>
                </div>
              </template>
              <template #content>
                <div class="p-6">
                  <!-- Course Overview -->
                  <div class="mb-6">
                    <h4 class="text-lg font-bold text-gray-800 dark:text-white mb-3 flex items-center">
                      <i class="pi pi-info-circle text-red-500 mr-2"></i>
                      Advanced Skills Training
                    </h4>
                    <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                      Build upon BLS skills with advanced interventions for critical cardiac emergencies.
                    </p>
                  </div>

                  <!-- Skills List -->
                  <div class="grid md:grid-cols-2 gap-3 mb-6">
                    <div class="flex items-center bg-red-50 dark:bg-red-900/30 p-3 rounded-lg">
                      <i class="pi pi-check-circle text-red-500 dark:text-red-400 mr-2"></i>
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">ECG Reading</span>
                    </div>
                    <div class="flex items-center bg-red-50 dark:bg-red-900/30 p-3 rounded-lg">
                      <i class="pi pi-check-circle text-red-500 dark:text-red-400 mr-2"></i>
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Pharmacology</span>
                    </div>
                    <div class="flex items-center bg-red-50 dark:bg-red-900/30 p-3 rounded-lg">
                      <i class="pi pi-check-circle text-red-500 dark:text-red-400 mr-2"></i>
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Airway Management</span>
                    </div>
                    <div class="flex items-center bg-red-50 dark:bg-red-900/30 p-3 rounded-lg">
                      <i class="pi pi-check-circle text-red-500 dark:text-red-400 mr-2"></i>
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Cardiac Rhythms</span>
                    </div>
                    <div class="flex items-center bg-red-50 dark:bg-red-900/30 p-3 rounded-lg">
                      <i class="pi pi-check-circle text-red-500 dark:text-red-400 mr-2"></i>
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Stroke Care</span>
                    </div>
                    <div class="flex items-center bg-red-50 dark:bg-red-900/30 p-3 rounded-lg">
                      <i class="pi pi-check-circle text-red-500 dark:text-red-400 mr-2"></i>
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Team Leadership</span>
                    </div>
                  </div>

                  <!-- Course Details -->
                  <div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg mb-4">
                    <div class="grid md:grid-cols-3 gap-4 text-center">
                      <div>
                        <i class="pi pi-clock text-red-500 text-xl mb-1"></i>
                        <p class="text-sm font-semibold text-gray-700 dark:text-gray-300">Duration</p>
                        <p class="text-xs text-gray-600 dark:text-gray-400">8-12 hours</p>
                      </div>
                      <div>
                        <i class="pi pi-certificate text-red-500 text-xl mb-1"></i>
                        <p class="text-sm font-semibold text-gray-700 dark:text-gray-300">Certification</p>
                        <p class="text-xs text-gray-600 dark:text-gray-400">2 years valid</p>
                      </div>
                      <div>
                        <i class="pi pi-users text-red-500 text-xl mb-1"></i>
                        <p class="text-sm font-semibold text-gray-700 dark:text-gray-300">Audience</p>
                        <p class="text-xs text-gray-600 dark:text-gray-400">Critical care</p>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </Card>
          </div>
        </div>

        <!-- Comparison Section -->
        <div class="mt-16">
          <h3 class="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            Which Course is Right for You?
          </h3>
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
            <div class="grid md:grid-cols-3 gap-8 text-center">
              <div class="space-y-4">
                <div class="bg-blue-100 dark:bg-blue-900/50 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                  <i class="pi pi-user text-blue-600 dark:text-blue-400 text-2xl"></i>
                </div>
                <h4 class="font-bold text-gray-800 dark:text-white">New to Healthcare?</h4>
                <p class="text-gray-600 dark:text-gray-300 text-sm">Start with BLS to build your foundation in life-saving skills.</p>
                <Button 
                  label="Choose BLS" 
                  class="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg"
                  @click="$emit('open-square-booking')"
                />
              </div>
              <div class="space-y-4">
                <div class="bg-red-100 dark:bg-red-900/50 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                  <i class="pi pi-heart text-red-600 dark:text-red-400 text-2xl"></i>
                </div>
                <h4 class="font-bold text-gray-800 dark:text-white">Critical Care Professional?</h4>
                <p class="text-gray-600 dark:text-gray-300 text-sm">ACLS provides advanced skills for emergency situations.</p>
                <Button 
                  label="Choose ACLS" 
                  class="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg"
                  @click="$emit('open-square-booking')"
                />
              </div>
              <div class="space-y-4">
                <div class="bg-purple-100 dark:bg-purple-900/50 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                  <i class="pi pi-star text-purple-600 dark:text-purple-400 text-2xl"></i>
                </div>
                <h4 class="font-bold text-gray-800 dark:text-white">Want Both?</h4>
                <p class="text-gray-600 dark:text-gray-300 text-sm">Combo packages offer the best value for comprehensive training.</p>
                <Button 
                  label="View Combos" 
                  class="bg-purple-500 hover:bg-purple-600 text-white text-sm px-4 py-2 rounded-lg"
                  @click="$emit('open-square-booking')"
                />
              </div>
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
.course-card {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.course-card:hover {
  transform: translateY(-12px) scale(1.02);
}

.course-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
  opacity: 0;
  transition: opacity 0.5s ease;
  z-index: 1;
}

.course-card:hover::before {
  opacity: 1;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.course-card .p-card-content > div > div {
  animation: slideInUp 0.6s ease-out;
}
</style>