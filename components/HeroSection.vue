<template>
  <section id="hero" class="relative min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
    <!-- Animated Background Gradients -->
    <div class="absolute inset-0 z-0">
      <div class="absolute inset-0 bg-gradient-to-br from-primary-600/90 via-primary-700/80 to-primary-800/90"></div>
      <div class="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-green-600/20 animate-pulse"></div>
    </div>

    <!-- Background Image with Parallax Effect -->
    <div class="absolute inset-0 z-0 hero-bg-parallax">
      <img 
        :src="config.getHeroImage().src"
        :alt="config.getHeroImage().alt"
        class="w-full h-full object-cover opacity-30"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50"></div>
    </div>

    <!-- Floating Geometric Shapes -->
    <div class="absolute inset-0 z-5 pointer-events-none">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
      <div class="floating-shape shape-4"></div>
      <div class="floating-shape shape-5"></div>
    </div>
    
    <!-- Main Content -->
    <div class="relative z-10 container mx-auto px-4 pt-32 pb-16 lg:pt-40 lg:pb-24 flex items-center min-h-screen">
      <div class="max-w-4xl mx-auto">
        <div class="text-center">
            <!-- Animated Badge -->
            <div class="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-6 animate-slideInDown">
              <div class="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
              <span class="text-sm font-medium">American Heart Association Certified</span>
            </div>
            
            <!-- Main Heading with Typewriter Effect -->
            <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span class="block animate-slideInLeft">Professional</span>
              <span class="block bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent animate-slideInLeft animation-delay-200">BLS & ACLS</span>
              <span class="block animate-slideInLeft animation-delay-400">Training</span>
            </h1>
            
            <!-- Subtitle -->
            <p class="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed animate-slideInUp animation-delay-600">
              Expert nursing instruction for life-saving skills. 
              <span class="text-green-400 font-semibold">On-location training</span> 
              available throughout the area.
            </p>
            
            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center animate-slideInUp animation-delay-800">
              <Button 
                label="Book Your Training" 
                icon="pi pi-calendar"
                class="hero-cta-primary group"
                @click="$emit('open-square-booking')"
              >
                <span class="group-hover:scale-110 transition-transform duration-300">Book Your Training</span>
              </Button>
              
              <button 
                class="hero-cta-secondary group"
                @click="scrollToCourses"
              >
                <span class="group-hover:translate-x-1 transition-transform duration-300">Learn More</span>
                <i class="pi pi-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
              </button>
            </div>
            
            <!-- Trust Indicators -->
            <div class="mt-12 flex flex-wrap items-center justify-center gap-8 animate-slideInUp animation-delay-1000">
              <div class="flex items-center text-gray-300">
                <i class="pi pi-star-fill text-yellow-400 mr-2"></i>
                <span class="font-semibold">8+ Years Experience</span>
              </div>
              <div class="flex items-center text-gray-300">
                <i class="pi pi-users text-green-400 mr-2"></i>
                <span class="font-semibold">1000+ Students Trained</span>
              </div>
              <div class="flex items-center text-gray-300">
                <i class="pi pi-verified text-blue-400 mr-2"></i>
                <span class="font-semibold">AHA Certified</span>
              </div>
            </div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
      <button @click="scrollToCourses" class="text-white/70 hover:text-white transition-colors">
        <i class="pi pi-chevron-down text-2xl"></i>
      </button>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useSiteConfig } from '~/composables/useSiteConfig.js'

// Get site configuration
const config = useSiteConfig()

// Methods
const scrollToCourses = () => {
  document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })
}

// Parallax effect for background
let ticking = false

const updateParallax = () => {
  const scrolled = window.pageYOffset
  const parallax = document.querySelector('.hero-bg-parallax')
  const speed = scrolled * 0.5
  
  if (parallax) {
    parallax.style.transform = `translateY(${speed}px)`
  }
  
  ticking = false
}

const requestParallaxUpdate = () => {
  if (!ticking) {
    requestAnimationFrame(updateParallax)
    ticking = true
  }
}

// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', requestParallaxUpdate, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', requestParallaxUpdate)
})

defineEmits(['open-square-booking'])
</script>

<style scoped>
/* Hero Section Styles */
#hero {
  background: linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%);
}

/* Animation Keyframes */
@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes floatAnimation {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-20px) rotate(90deg); }
  50% { transform: translateY(-10px) rotate(180deg); }
  75% { transform: translateY(-30px) rotate(270deg); }
}

@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
  50% { box-shadow: 0 0 40px rgba(16, 185, 129, 0.6); }
}

/* Animation Classes */
.animate-slideInDown {
  animation: slideInDown 0.6s ease-out;
}

.animate-slideInLeft {
  animation: slideInLeft 0.8s ease-out;
}

.animate-slideInRight {
  animation: slideInRight 0.8s ease-out;
}

.animate-slideInUp {
  animation: slideInUp 0.6s ease-out;
}

/* Animation Delays */
.animation-delay-200 {
  animation-delay: 0.2s;
  animation-fill-mode: both;
}

.animation-delay-400 {
  animation-delay: 0.4s;
  animation-fill-mode: both;
}

.animation-delay-600 {
  animation-delay: 0.6s;
  animation-fill-mode: both;
}

.animation-delay-800 {
  animation-delay: 0.8s;
  animation-fill-mode: both;
}

.animation-delay-1000 {
  animation-delay: 1s;
  animation-fill-mode: both;
}

/* Floating Shapes */
.floating-shape {
  position: absolute;
  opacity: 0.1;
  animation: floatAnimation 20s infinite linear;
}

.shape-1 {
  top: 10%;
  left: 10%;
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #10b981, #34d399);
  border-radius: 50%;
  animation-delay: 0s;
}

.shape-2 {
  top: 20%;
  right: 20%;
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, #3b82f6, #60a5fa);
  transform: rotate(45deg);
  animation-delay: -5s;
}

.shape-3 {
  bottom: 30%;
  left: 15%;
  width: 80px;
  height: 80px;
  background: linear-gradient(45deg, #8b5cf6, #a78bfa);
  border-radius: 30%;
  animation-delay: -10s;
}

.shape-4 {
  top: 60%;
  right: 10%;
  width: 50px;
  height: 50px;
  background: linear-gradient(45deg, #f59e0b, #fbbf24);
  border-radius: 20px;
  animation-delay: -15s;
}

.shape-5 {
  bottom: 10%;
  right: 30%;
  width: 35px;
  height: 35px;
  background: linear-gradient(45deg, #ef4444, #f87171);
  border-radius: 50%;
  animation-delay: -7s;
}

/* CTA Buttons */
.hero-cta-primary {
  @apply bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-green-500/25 !important;
  animation: pulseGlow 3s infinite;
  border: none !important;
  font-weight: 600 !important;
  font-size: 1.1rem !important;
}

.hero-cta-secondary {
  @apply bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-xl transition-all duration-300 hover:bg-white/20 hover:border-white/50 transform hover:scale-105;
  font-weight: 600;
  font-size: 1.1rem;
}


/* Responsive Design */
@media (max-width: 1024px) {
  .floating-shape {
    display: none;
  }
}

@media (max-width: 640px) {
  .hero-cta-primary,
  .hero-cta-secondary {
    @apply w-full text-center;
  }
  
  h1 {
    @apply text-3xl;
  }
  
  .animate-slideInLeft,
  .animate-slideInRight {
    animation: slideInUp 0.8s ease-out;
  }
}

/* Parallax Effect */
.hero-bg-parallax {
  will-change: transform;
}

/* Text Gradient Animation */
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.bg-clip-text {
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
}

/* Scroll Indicator */
@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate(-50%, 0);
  }
  40%, 43% {
    transform: translate(-50%, -10px);
  }
  70% {
    transform: translate(-50%, -5px);
  }
  90% {
    transform: translate(-50%, -2px);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}

/* Hover Effects */
.group:hover .group-hover\\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\\:translate-x-1 {
  transform: translateX(0.25rem);
}

/* Dark Mode Support - preserved for future use */
</style>