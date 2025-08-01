<template>
  <nav class="floating-nav" :class="{ 'floating-nav--scrolled': props.isScrolled, 'floating-nav--hidden': props.navHidden }">
    <div class="floating-nav__container">
      
      <!-- Logo Section -->
      <div class="floating-nav__logo" @click="scrollToSection('hero')">
        <div class="logo-container">
          <img 
            :src="config.assets.logo" 
            :alt="config.assets.logoAlt"
            class="logo-image"
            :class="{ 'logo-image--compact': props.isScrolled }"
          />
        </div>
        <div class="logo-info" :class="{ 'logo-info--compact': props.isScrolled }">
          <h1 class="logo-title">{{ config.siteName }}</h1>
          <p class="logo-subtitle">{{ config.tagline }}</p>
        </div>
      </div>

      <!-- Desktop Navigation Pills -->
      <div class="floating-nav__desktop">
        <div class="nav-pills">
          <div 
            v-for="item in props.navItems" 
            :key="item.id"
            class="nav-pill"
            :class="{ 'nav-pill--active': props.activeSection === item.id }"
            @click="scrollToSection(item.id)"
          >
            <span class="nav-pill__label">{{ item.label }}</span>
          </div>
        </div>

        <!-- Floating CTA Button -->
        <div class="floating-cta">
          <Button 
            icon="pi pi-calendar"
            class="cta-button"
            @click="openSquareBooking"
            @mouseover="emit('cta-hover', true)"
            @mouseleave="emit('cta-hover', false)"
          >
            <span class="cta-text">{{ props.ctaHovered ? 'Book Now!' : 'Book Training' }}</span>
            <div class="cta-ripple" v-if="props.ctaHovered"></div>
          </Button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div class="floating-nav__mobile">
        <Button 
          :icon="props.mobileMenuOpen ? 'pi pi-times' : 'pi pi-bars'"
          class="mobile-toggle"
          @click="toggleMobileMenu"
        />
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <div v-if="props.mobileMenuOpen" class="mobile-overlay" @click="toggleMobileMenu">
      <div class="mobile-menu" @click.stop>
        <div class="mobile-menu__header">
          <div class="mobile-logo">
            <div class="mobile-logo-container">
              <img 
                :src="config.assets.logo" 
                :alt="config.assets.logoAlt"
                class="mobile-logo-image"
              />
            </div>
            <div>
              <h2 class="mobile-logo__title">{{ config.siteName }}</h2>
              <p class="mobile-logo__subtitle">{{ config.tagline }}</p>
            </div>
          </div>
        </div>
        
        <div class="mobile-menu__nav">
          <div 
            v-for="item in props.navItems" 
            :key="item.id"
            class="mobile-nav-item"
            @click="scrollToSection(item.id)"
          >
            <i :class="item.icon" class="mobile-nav-item__icon"></i>
            <span class="mobile-nav-item__label">{{ item.label }}</span>
            <i class="pi pi-chevron-right mobile-nav-item__arrow"></i>
          </div>
        </div>
        
        <div class="mobile-menu__cta">
          <Button 
            label="Book Training Now" 
            icon="pi pi-calendar"
            class="w-full mobile-cta-button"
            @click="openSquareBooking"
          />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useSiteConfig } from '~/composables/useSiteConfig.js'

// Get site configuration
const config = useSiteConfig()

const props = defineProps({
  activeSection: String,
  isScrolled: Boolean,
  navHidden: Boolean,
  mobileMenuOpen: Boolean,
  ctaHovered: Boolean,
  navItems: Array
})

const emit = defineEmits(['scroll-to-section', 'scroll-to-booking', 'toggle-mobile-menu', 'cta-hover', 'open-square-booking'])

// Methods
const toggleMobileMenu = () => {
  emit('toggle-mobile-menu')
}

const scrollToSection = (sectionId) => {
  emit('scroll-to-section', sectionId)
}

const scrollToBooking = () => {
  emit('scroll-to-booking')
}

const openSquareBooking = () => {
  emit('open-square-booking')
}
</script>

<style scoped>
/* Floating Navigation Styles */
.floating-nav {
  @apply fixed top-4 left-4 right-4 z-50 transition-all duration-500 ease-out;
  transform: translateY(0);
}

.floating-nav--scrolled {
  @apply top-2;
}

.floating-nav--hidden {
  transform: translateY(-120px);
}

.floating-nav__container {
  @apply bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20 px-4 py-3 flex items-center justify-between transition-colors duration-300;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2);
  overflow: visible;
}

/* Logo Styles */
.floating-nav__logo {
  @apply flex items-center space-x-3 cursor-pointer;
}

.logo-container {
  @apply relative w-12 h-12 rounded-xl shadow-lg overflow-hidden bg-white;
  transition: all 0.3s ease;
}

.logo-container:hover {
  @apply scale-110;
  box-shadow: 0 8px 25px rgba(34, 197, 94, 0.4);
}

.floating-nav--scrolled .logo-container {
  @apply w-10 h-10;
}

.logo-image {
  @apply w-full h-full object-contain rounded-xl p-1;
  transition: all 0.3s ease;
}

.logo-info {
  @apply transition-all duration-300;
}

.logo-info--compact .logo-title {
  @apply text-lg;
}

.logo-info--compact .logo-subtitle {
  @apply text-xs;
}

.logo-title {
  @apply text-xl font-bold text-gray-800 dark:text-white transition-all duration-300;
}

.logo-subtitle {
  @apply text-sm text-primary-600 dark:text-primary-400 font-medium;
}

/* Desktop Navigation Pills */
.floating-nav__desktop {
  @apply hidden lg:flex items-center space-x-6;
}

.nav-pills {
  @apply flex items-center space-x-2 bg-gray-100/80 dark:bg-gray-700/80 rounded-xl p-1;
}

.nav-pill {
  @apply relative px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 text-gray-700 dark:text-gray-300;
}

.nav-pill:hover {
  @apply bg-white/80 dark:bg-gray-600/80 shadow-md transform scale-105;
}

.nav-pill--active {
  @apply bg-primary-600 text-white shadow-lg;
}

.nav-pill__label {
  @apply font-medium text-sm;
}


/* Floating CTA Button */
.floating-cta {
  @apply relative;
  overflow: visible;
}

.cta-button {
  @apply text-white rounded-xl shadow-lg transition-all duration-300 relative !important;
  background: linear-gradient(to right, #16a34a, #15803d) !important;
  padding: 12px 24px !important;
  min-width: 160px !important;
  white-space: nowrap !important;
  border: none !important;
  overflow: visible !important;
}

.cta-button:hover {
  @apply transform scale-105;
  background: linear-gradient(to right, #15803d, #14532d) !important;
  box-shadow: 0 10px 30px rgba(34, 197, 94, 0.4) !important;
}

.cta-text {
  @apply font-semibold transition-all duration-300 inline-block;
  white-space: nowrap;
}

.cta-ripple {
  @apply absolute inset-0 bg-white/20 rounded-xl;
  animation: ripple 0.6s ease-out;
}

@keyframes ripple {
  0% { transform: scale(0); opacity: 1; }
  100% { transform: scale(2); opacity: 0; }
}

/* Mobile Navigation */
.floating-nav__mobile {
  @apply lg:hidden;
}

.mobile-toggle {
  @apply bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl transition-all duration-300 !important;
  padding: 12px !important;
  border: none !important;
  min-width: auto !important;
}

/* Mobile Menu Overlay */
.mobile-overlay {
  @apply fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20;
  animation: fadeIn 0.3s ease-out;
}

.mobile-menu {
  @apply bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden;
  animation: slideInDown 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInDown {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.mobile-menu__header {
  @apply bg-gradient-to-r from-primary-600 to-primary-700 p-6;
}

.mobile-logo {
  @apply flex items-center space-x-3;
}

.mobile-logo-container {
  @apply w-12 h-12 rounded-xl shadow-lg overflow-hidden;
}

.mobile-logo-image {
  @apply w-full h-full object-contain rounded-xl;
}

.mobile-logo__title {
  @apply text-white font-bold text-lg;
}

.mobile-logo__subtitle {
  @apply text-primary-100 text-sm;
}

.mobile-menu__nav {
  @apply p-4 space-y-2;
}

.mobile-nav-item {
  @apply flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700;
}

.mobile-nav-item__icon {
  @apply text-primary-600 dark:text-primary-400 w-5;
}

.mobile-nav-item__label {
  @apply flex-1 font-medium text-gray-800 dark:text-gray-200;
}

.mobile-nav-item__arrow {
  @apply text-gray-400 dark:text-gray-500 text-sm;
}

.mobile-menu__cta {
  @apply p-4 border-t border-gray-100 dark:border-gray-700;
}

.mobile-cta-button {
  @apply bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white py-3 rounded-xl shadow-lg;
}

/* PrimeVue Button Overrides */
.cta-button.p-button,
.mobile-toggle.p-button {
  font-family: inherit !important;
}

.mobile-toggle.p-button .p-button-icon {
  margin: 0 !important;
}

.cta-button.p-button .p-button-label {
  padding: 0 !important;
  margin: 0 !important;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .floating-nav {
    @apply left-2 right-2;
  }
  
  .logo-info {
    @apply hidden;
  }
}
</style>