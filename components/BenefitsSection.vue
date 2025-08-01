<template>
  <section class="py-16 bg-gray-50 dark:bg-gray-800">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
        Why Choose Our Training?
      </h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        <Card class="text-center shadow-lg hover:shadow-xl transition-shadow bg-white dark:bg-gray-800 border dark:border-gray-600">
          <template #content>
            <div class="p-6">
              <i class="pi pi-user text-4xl text-primary-600 dark:text-primary-400 mb-4"></i>
              <h3 class="text-xl font-bold mb-3 text-gray-800 dark:text-white">Expert Instructor</h3>
              <p class="text-gray-600 dark:text-gray-300">
                Learn from an experienced registered nurse with years of clinical and teaching experience.
              </p>
            </div>
          </template>
        </Card>

        <Card class="text-center shadow-lg hover:shadow-xl transition-shadow bg-white dark:bg-gray-800 border dark:border-gray-600">
          <template #content>
            <div class="p-6">
              <i class="pi pi-map-marker text-4xl text-primary-600 dark:text-primary-400 mb-4"></i>
              <h3 class="text-xl font-bold mb-3 text-gray-800 dark:text-white">On-Location Training</h3>
              <p class="text-gray-600 dark:text-gray-300">
                Convenient mobile training at your workplace, home, or preferred location.
              </p>
            </div>
          </template>
        </Card>

        <Card class="text-center shadow-lg hover:shadow-xl transition-shadow bg-white dark:bg-gray-800 border dark:border-gray-600">
          <template #content>
            <div class="p-6">
              <i class="pi pi-users text-4xl text-primary-600 dark:text-primary-400 mb-4"></i>
              <h3 class="text-xl font-bold mb-3 text-gray-800 dark:text-white">Group Discounts</h3>
              <p class="text-gray-600 dark:text-gray-300">
                Special pricing for groups and organizations. Perfect for workplace training programs.
              </p>
            </div>
          </template>
        </Card>

        <Card class="text-center shadow-lg hover:shadow-xl transition-shadow bg-white dark:bg-gray-800 border dark:border-gray-600">
          <template #content>
            <div class="p-6">
              <i class="pi pi-check-circle text-4xl text-primary-600 dark:text-primary-400 mb-4"></i>
              <h3 class="text-xl font-bold mb-3 text-gray-800 dark:text-white">Certified Training</h3>
              <p class="text-gray-600 dark:text-gray-300">
                Official American Heart Association certification upon successful completion.
              </p>
            </div>
          </template>
        </Card>
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