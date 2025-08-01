<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <!-- Navigation Component -->
    <Navigation 
      :is-scrolled="isScrolled"
      :nav-hidden="navHidden"
      :active-section="activeSection"
      :mobile-menu-open="mobileMenuOpen"
      :cta-hovered="ctaHovered"
      :nav-items="navItems"
      @scroll-to-section="scrollToSection"
      @toggle-mobile-menu="toggleMobileMenu"
      @open-square-booking="openSquareBooking"
      @cta-hover="ctaHovered = $event"
    />

    <!-- Floating Actions Component -->
    <FloatingActions 
      :show-scroll-top="showScrollTop"
    />

    <!-- Hero Section Component -->
    <HeroSection @open-square-booking="openSquareBooking" />

    <!-- Courses Section Component -->
    <CoursesSection @open-square-booking="openSquareBooking" />

    <!-- Benefits Section Component -->
    <BenefitsSection />

    <!-- Instructor Section Component -->
    <InstructorSection @open-square-booking="openSquareBooking" />

    <!-- Pricing Section Component -->
    <PricingSection @open-square-booking="openSquareBooking" />

    <!-- Square Booking Modal -->
    <SquareBookingModal
      :is-open="isBookingModalOpen"
      @close="closeBookingModal"
    />

    <!-- Footer -->
    <footer class="bg-gray-800 dark:bg-gray-900 text-white py-12">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-4 gap-8 mb-8">
          
          <!-- Logo and Company Info -->
          <div class="md:col-span-2">
            <div class="flex items-center mb-4">
              <img 
                :src="config.getFooterLogo().src" 
                :alt="config.getFooterLogo().alt"
                class="h-12 w-12 mr-4 object-contain bg-white rounded-lg p-1"
                @error="$event.target.style.display='none'"
              />
              <div>
                <h3 class="text-xl font-bold text-white">{{ config.siteName }}</h3>
                <p class="text-gray-400 text-sm">{{ config.tagline }}</p>
              </div>
            </div>
            <p class="text-gray-300 mb-4 max-w-md">
              {{ config.description }}
            </p>
            <div class="flex space-x-4">
              <a :href="config.social.facebook" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors">
                <i class="pi pi-facebook text-xl"></i>
              </a>
              <a :href="config.social.twitter" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors">
                <i class="pi pi-twitter text-xl"></i>
              </a>
              <a :href="config.social.linkedin" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors">
                <i class="pi pi-linkedin text-xl"></i>
              </a>
              <a :href="config.social.instagram" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors">
                <i class="pi pi-instagram text-xl"></i>
              </a>
            </div>
          </div>
          
          <!-- Contact Information -->
          <div>
            <h4 class="text-lg font-semibold text-white mb-4">Contact</h4>
            <div class="space-y-2 text-gray-300">
              <p class="flex items-center">
                <i class="pi pi-phone mr-2"></i>
                <a :href="config.contact.phoneLink" class="hover:text-white transition-colors">{{ config.contact.phone }}</a>
              </p>
              <p class="flex items-center">
                <i class="pi pi-envelope mr-2"></i>
                <a :href="config.contact.emailLink" class="hover:text-white transition-colors">{{ config.contact.email }}</a>
              </p>
              <p class="flex items-start">
                <i class="pi pi-map-marker mr-2 mt-1"></i>
                <span>{{ config.getFullAddress() }}</span>
              </p>
            </div>
          </div>
          
          <!-- Services -->
          <div>
            <h4 class="text-lg font-semibold text-white mb-4">Services</h4>
            <ul class="space-y-2 text-gray-300">
              <li><a href="#courses" class="hover:text-white transition-colors">BLS Training</a></li>
              <li><a href="#courses" class="hover:text-white transition-colors">ACLS Training</a></li>
              <li><a href="#pricing" class="hover:text-white transition-colors">Group Training</a></li>
              <li><a href="#pricing" class="hover:text-white transition-colors">Mobile Training</a></li>
            </ul>
          </div>
        </div>
        
        <!-- Bottom Footer -->
        <div class="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 {{ config.business.legalName }}. Professional medical training by certified instructors.
          </p>
          <div class="flex items-center space-x-4 text-gray-400 text-sm">
            <span>Licensed: {{ config.business.license }}</span>
            <span class="hidden md:inline">|</span>
            <span>{{ config.business.certifications[0] }}</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import Navigation from '~/components/Navigation.vue'
import HeroSection from '~/components/HeroSection.vue'
import CoursesSection from '~/components/CoursesSection.vue'
import BenefitsSection from '~/components/BenefitsSection.vue'
import InstructorSection from '~/components/InstructorSection.vue'
import PricingSection from '~/components/PricingSection.vue'
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