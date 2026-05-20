<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <!-- Skip link for keyboard users -->
    <a href="#main" class="skip-link">Skip to main content</a>

    <!-- Navigation Component -->
    <Navigation :is-scrolled="isScrolled" :nav-hidden="navHidden" :active-section="activeSection"
      :mobile-menu-open="mobileMenuOpen" :cta-hovered="ctaHovered" :nav-items="navItems"
      @scroll-to-section="scrollToSection" @toggle-mobile-menu="toggleMobileMenu"
      @open-square-booking="openSquareBooking" @cta-hover="ctaHovered = $event" />

    <!-- Floating Actions Component -->
    <FloatingActions :show-scroll-top="showScrollTop" />

    <main id="main">
      <!-- Hero Section Component -->
      <HeroSection @open-square-booking="openSquareBooking" />

      <!-- Courses Section Component -->
      <CoursesSection @open-square-booking="openSquareBooking" />

      <!-- Benefits Section Component -->
      <BenefitsSection />

      <!-- Instructor Section Component -->
      <InstructorSection @open-square-booking="openSquareBooking" />

      <!-- Testimonials Section Component -->
      <TestimonialsSection />

      <!-- Training Section Component -->
      <TrainingSection @open-square-booking="openSquareBooking" />
    </main>

    <!-- Square Booking Modal -->
    <SquareBookingModal :is-open="isBookingModalOpen" @close="closeBookingModal" />

    <!-- Footer -->
    <SiteFooter @open-square-booking="openSquareBooking" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import Navigation from '~/components/Navigation.vue'
import HeroSection from '~/components/HeroSection.vue'
import CoursesSection from '~/components/CoursesSection.vue'
import BenefitsSection from '~/components/BenefitsSection.vue'
import InstructorSection from '~/components/InstructorSection.vue'
import TrainingSection from '~/components/TrainingSection.vue'
import TestimonialsSection from '~/components/TestimonialsSection.vue'
import FloatingActions from '~/components/FloatingActions.vue'
import SquareBookingModal from '~/components/SquareBookingModal.vue'
import { useSiteConfig } from '~/composables/useSiteConfig.js'

// Get site configuration
const config = useSiteConfig()

// Page metadata from site config
useHead({
  title: config.seo.title,
  meta: [
    { name: 'description', content: config.description },
    { name: 'keywords', content: config.seo.keywords },
    { name: 'author', content: config.seo.author }
  ]
})

// Booking modal state
const isBookingModalOpen = ref(false)

// Navigation state
const mobileMenuOpen = ref(false)
const isScrolled = ref(false)
const navHidden = ref(false)
const activeSection = ref('hero')
const ctaHovered = ref(false)
const showScrollTop = ref(false)

// Navigation items from site config
const navItems = config.getNavItems()

// Scroll tracking
let lastScrollY = 0

// Methods
const openSquareBooking = () => {
  isBookingModalOpen.value = true
}

const closeBookingModal = () => {
  isBookingModalOpen.value = false
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
    mobileMenuOpen.value = false
    activeSection.value = sectionId
  }
}

const initSystemTheme = () => {
  // Check if we're on the client side
  if (typeof window === 'undefined' || typeof document === 'undefined') return

  // Apply theme based on system preference only
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  if (prefersDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// Listen for system theme changes
const handleSystemThemeChange = (e) => {
  if (e.matches) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// Scroll event handler
const handleScroll = () => {
  const currentScrollY = window.scrollY

  // Update scroll state
  isScrolled.value = currentScrollY > 100
  showScrollTop.value = currentScrollY > 400

  // Hide/show nav based on scroll direction
  if (currentScrollY > lastScrollY && currentScrollY > 200) {
    navHidden.value = true
  } else {
    navHidden.value = false
  }
  lastScrollY = currentScrollY

  // Update active section
  updateActiveSection()
}

const updateActiveSection = () => {
  const sections = navItems.map(item => item.id)
  const scrollPosition = window.scrollY + 200

  for (let i = sections.length - 1; i >= 0; i--) {
    const section = document.getElementById(sections[i])
    if (section && section.offsetTop <= scrollPosition) {
      activeSection.value = sections[i]
      break
    }
  }
}

// Lifecycle
onMounted(async () => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll() // Initial call

  // Initialize system theme after DOM is ready
  await nextTick()
  initSystemTheme()

  // Listen for system theme changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', handleSystemThemeChange)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)

  // Clean up theme change listener
  if (typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.removeEventListener('change', handleSystemThemeChange)
  }
})
</script>

<style scoped>
/* Global page styles */
</style>