<template>
  <section id="training" class="py-16 bg-gradient-to-br from-gray-50 to-primary-50 dark:from-gray-800 dark:to-gray-700">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800 dark:text-white">
        Available Training Courses
      </h2>
      <p class="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
        Professional medical training courses available for healthcare providers. All courses include official American Heart Association certification.
      </p>
      
      <!-- Interactive Training Cards -->
      <div class="max-w-7xl mx-auto">
        <!-- BLS Courses -->
        <div class="mb-12">
          <h3 class="text-2xl font-bold text-center mb-8 text-primary-700 dark:text-primary-400">
            <i class="pi pi-heart-fill mr-2"></i>
            Basic Life Support (BLS)
          </h3>
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- BLS First Time -->
            <Card class="training-card relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white dark:bg-gray-800 border-2 border-transparent hover:border-primary-300 dark:hover:border-primary-400">
              <template #content>
                <div class="p-6 text-center">
                  <div class="mb-4">
                    <i class="pi pi-star-fill text-3xl text-yellow-500 mb-2"></i>
                    <h4 class="text-lg font-bold text-gray-800 dark:text-white">BLS First Time</h4>
                  </div>
                  <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">Complete certification course</p>
                  <ul class="text-left text-sm text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                    <li><i class="pi pi-check text-green-500 dark:text-green-400 mr-2"></i>Full BLS training</li>
                    <li><i class="pi pi-check text-green-500 dark:text-green-400 mr-2"></i>AHA certification</li>
                    <li><i class="pi pi-check text-green-500 dark:text-green-400 mr-2"></i>2-year validity</li>
                  </ul>
                  <Button 
                    label="Book Now" 
                    class="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg transition-colors"
                    @click="$emit('open-square-booking')"
                  />
                </div>
              </template>
            </Card>

            <!-- BLS Renewal -->
            <Card class="training-card relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white dark:bg-gray-800 border-2 border-transparent hover:border-primary-300 dark:hover:border-primary-400">
              <template #content>
                <div class="p-6 text-center">
                  <div class="mb-4">
                    <i class="pi pi-refresh text-3xl text-blue-500 mb-2"></i>
                    <h4 class="text-lg font-bold text-gray-800 dark:text-white">BLS Renewal</h4>
                  </div>
                  <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">For current/expired certifications</p>
                  <ul class="text-left text-sm text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                    <li><i class="pi pi-check text-green-500 dark:text-green-400 mr-2"></i>Renewal course</li>
                    <li><i class="pi pi-check text-green-500 dark:text-green-400 mr-2"></i>AHA certification</li>
                    <li><i class="pi pi-check text-green-500 dark:text-green-400 mr-2"></i>2-year validity</li>
                  </ul>
                  <Button 
                    label="Book Now" 
                    class="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg transition-colors"
                    @click="$emit('open-square-booking')"
                  />
                </div>
              </template>
            </Card>

            <!-- BLS Group -->
            <Card class="training-card relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white dark:bg-gray-800 border-2 border-transparent hover:border-primary-300 dark:hover:border-primary-400">
              <template #header>
                <div class="bg-gradient-to-r from-orange-400 to-orange-500 text-white text-center py-2 text-sm font-semibold">
                  POPULAR
                </div>
              </template>
              <template #content>
                <div class="p-6 text-center">
                  <div class="mb-4">
                    <i class="pi pi-users text-3xl text-orange-500 mb-2"></i>
                    <h4 class="text-lg font-bold text-gray-800 dark:text-white">Group (6 people)</h4>
                  </div>
                  <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">Minimum 6 participants</p>
                  <ul class="text-left text-sm text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                    <li><i class="pi pi-check text-green-500 dark:text-green-400 mr-2"></i>Group discount</li>
                    <li><i class="pi pi-check text-green-500 dark:text-green-400 mr-2"></i>On-site training</li>
                    <li><i class="pi pi-check text-green-500 dark:text-green-400 mr-2"></i>Team building</li>
                  </ul>
                  <Button 
                    label="Book Now" 
                    class="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition-colors"
                    @click="$emit('open-square-booking')"
                  />
                </div>
              </template>
            </Card>

            <!-- BLS Large Group -->
            <Card class="training-card relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white dark:bg-gray-800 border-2 border-transparent hover:border-primary-300 dark:hover:border-primary-400">
              <template #header>
                <div class="bg-gradient-to-r from-green-400 to-green-500 text-white text-center py-2 text-sm font-semibold">
                  BEST VALUE
                </div>
              </template>
              <template #content>
                <div class="p-6 text-center">
                  <div class="mb-4">
                    <i class="pi pi-building text-3xl text-green-500 mb-2"></i>
                    <h4 class="text-lg font-bold text-gray-800 dark:text-white">Large Group (10+)</h4>
                  </div>
                  <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">Minimum 10 participants</p>
                  <ul class="text-left text-sm text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                    <li><i class="pi pi-check text-green-500 dark:text-green-400 mr-2"></i>Maximum savings</li>
                    <li><i class="pi pi-check text-green-500 dark:text-green-400 mr-2"></i>Corporate training</li>
                    <li><i class="pi pi-check text-green-500 dark:text-green-400 mr-2"></i>Flexible scheduling</li>
                  </ul>
                  <Button 
                    label="Book Now" 
                    class="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-colors"
                    @click="$emit('open-square-booking')"
                  />
                </div>
              </template>
            </Card>
          </div>
        </div>

        <!-- ACLS Courses -->
        <div class="mb-12">
          <h3 class="text-2xl font-bold text-center mb-8 text-primary-700 dark:text-primary-400">
            <i class="pi pi-chart-line mr-2"></i>
            Advanced Cardiac Life Support (ACLS)
          </h3>
          <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <!-- ACLS First Time -->
            <Card class="training-card relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white dark:bg-gray-800 border-2 border-transparent hover:border-red-300 dark:hover:border-red-400">
              <template #content>
                <div class="p-6 text-center">
                  <div class="mb-4">
                    <i class="pi pi-star-fill text-3xl text-red-500 mb-2"></i>
                    <h4 class="text-lg font-bold text-gray-800 dark:text-white">ACLS First Time</h4>
                  </div>
                  <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">Complete certification course</p>
                  <ul class="text-left text-sm text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                    <li><i class="pi pi-check text-green-500 dark:text-green-400 mr-2"></i>Advanced training</li>
                    <li><i class="pi pi-check text-green-500 dark:text-green-400 mr-2"></i>ECG interpretation</li>
                    <li><i class="pi pi-check text-green-500 dark:text-green-400 mr-2"></i>Pharmacology</li>
                    <li><i class="pi pi-check text-green-500 dark:text-green-400 mr-2"></i>AHA certification</li>
                  </ul>
                  <Button 
                    label="Book Now" 
                    class="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors"
                    @click="$emit('open-square-booking')"
                  />
                </div>
              </template>
            </Card>

            <!-- ACLS Renewal -->
            <Card class="training-card relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white dark:bg-gray-800 border-2 border-transparent hover:border-red-300 dark:hover:border-red-400">
              <template #content>
                <div class="p-6 text-center">
                  <div class="mb-4">
                    <i class="pi pi-refresh text-3xl text-blue-500 mb-2"></i>
                    <h4 class="text-lg font-bold text-gray-800 dark:text-white">ACLS Renewal</h4>
                  </div>
                  <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">For current/expired certifications</p>
                  <ul class="text-left text-sm text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                    <li><i class="pi pi-check text-green-500 dark:text-green-400 mr-2"></i>Renewal course</li>
                    <li><i class="pi pi-check text-green-500 dark:text-green-400 mr-2"></i>Skills review</li>
                    <li><i class="pi pi-check text-green-500 dark:text-green-400 mr-2"></i>Updated guidelines</li>
                    <li><i class="pi pi-check text-green-500 dark:text-green-400 mr-2"></i>AHA certification</li>
                  </ul>
                  <Button 
                    label="Book Now" 
                    class="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors"
                    @click="$emit('open-square-booking')"
                  />
                </div>
              </template>
            </Card>
          </div>
        </div>

        <!-- Combo Packages -->
        <div>
          <h3 class="text-2xl font-bold text-center mb-8 text-primary-700 dark:text-primary-400">
            <i class="pi pi-gift mr-2"></i>
            Combo Packages
          </h3>
          <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <!-- BLS + ACLS Renewal -->
            <Card class="training-card relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-800 dark:to-purple-900/30 border-2 border-purple-200 dark:border-purple-600/50 hover:border-purple-400 dark:hover:border-purple-500">
              <template #header>
                <div class="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center py-2 text-sm font-semibold">
                  COMBO DEAL
                </div>
              </template>
              <template #content>
                <div class="p-6 text-center">
                  <div class="mb-4">
                    <i class="pi pi-tags text-3xl text-purple-600 dark:text-purple-400 mb-2"></i>
                    <h4 class="text-lg font-bold text-gray-800 dark:text-white">BLS + ACLS Renewal</h4>
                  </div>
                  <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">Both renewals combined</p>
                  <ul class="text-left text-sm text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                    <li><i class="pi pi-check text-green-500 dark:text-green-400 mr-2"></i>Both certifications</li>
                    <li><i class="pi pi-check text-green-500 dark:text-green-400 mr-2"></i>Same day training</li>
                    <li><i class="pi pi-check text-green-500 dark:text-green-400 mr-2"></i>Time efficient</li>
                    <li><i class="pi pi-check text-green-500 dark:text-green-400 mr-2"></i>Great value</li>
                  </ul>
                  <Button 
                    label="Book Now" 
                    class="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors"
                    @click="$emit('open-square-booking')"
                  />
                </div>
              </template>
            </Card>

            <!-- BLS + ACLS First Time -->
            <Card class="training-card relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-gray-800 dark:to-indigo-900/30 border-2 border-indigo-200 dark:border-indigo-600/50 hover:border-indigo-400 dark:hover:border-indigo-500">
              <template #header>
                <div class="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-center py-2 text-sm font-semibold">
                  COMPLETE PACKAGE
                </div>
              </template>
              <template #content>
                <div class="p-6 text-center">
                  <div class="mb-4">
                    <i class="pi pi-trophy text-3xl text-indigo-600 dark:text-indigo-400 mb-2"></i>
                    <h4 class="text-lg font-bold text-gray-800 dark:text-white">BLS + ACLS First Time</h4>
                  </div>
                  <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">Both complete courses combined</p>
                  <ul class="text-left text-sm text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                    <li><i class="pi pi-check text-green-500 dark:text-green-400 mr-2"></i>Complete training</li>
                    <li><i class="pi pi-check text-green-500 dark:text-green-400 mr-2"></i>Comprehensive skills</li>
                    <li><i class="pi pi-check text-green-500 dark:text-green-400 mr-2"></i>Professional ready</li>
                    <li><i class="pi pi-check text-green-500 dark:text-green-400 mr-2"></i>Maximum value</li>
                  </ul>
                  <Button 
                    label="Book Now" 
                    class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition-colors"
                    @click="$emit('open-square-booking')"
                  />
                </div>
              </template>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineEmits(['open-square-booking'])
</script>

<style scoped>
.training-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.training-card:hover {
  transform: translateY(-8px) scale(1.02);
}

.training-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.training-card:hover::before {
  opacity: 1;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.training-card:hover .pi {
  animation: pulse 2s infinite;
}
</style>