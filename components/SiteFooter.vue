<template>
  <footer class="site-footer" role="contentinfo">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Quiet CTA -->
      <div class="site-footer__cta">
        <div>
          <h2 class="text-2xl md:text-3xl font-bold text-white mb-2">
            Ready to certify your team?
          </h2>
          <p class="text-gray-300 max-w-xl">
            Mobile BLS &amp; ACLS training, scheduled at your convenience. Get certified by an AHA-authorized instructor.
          </p>
        </div>
        <button
          type="button"
          class="site-footer__cta-button"
          @click="$emit('open-square-booking')"
        >
          <i class="pi pi-calendar mr-2" aria-hidden="true"></i>
          <span>Book Training</span>
        </button>
      </div>

      <div class="site-footer__grid">
        <!-- Brand -->
        <div class="md:col-span-2">
          <div class="flex items-center mb-4">
            <img
              :src="config.getFooterLogo().src"
              :alt="config.getFooterLogo().alt"
              width="64"
              height="64"
              class="h-16 w-16 mr-4 object-contain rounded-xl p-1"
              loading="lazy"
              @error="$event.target.style.display = 'none'"
            />
            <div>
              <p class="text-lg font-bold text-white">{{ config.siteName }}</p>
              <p class="text-gray-400 text-sm">{{ config.tagline }}</p>
            </div>
          </div>
          <p class="text-gray-300 mb-6 max-w-md leading-relaxed">
            {{ config.description }}
          </p>
          <ul v-if="hasAnySocial" class="flex space-x-3" aria-label="Social media">
            <li v-if="config.social.facebook">
              <a
                :href="config.social.facebook"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                class="site-footer__social"
              >
                <i class="pi pi-facebook" aria-hidden="true"></i>
              </a>
            </li>
            <li v-if="config.social.twitter">
              <a
                :href="config.social.twitter"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                class="site-footer__social"
              >
                <i class="pi pi-twitter" aria-hidden="true"></i>
              </a>
            </li>
            <li v-if="config.social.linkedin">
              <a
                :href="config.social.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                class="site-footer__social"
              >
                <i class="pi pi-linkedin" aria-hidden="true"></i>
              </a>
            </li>
            <li v-if="config.social.instagram">
              <a
                :href="config.social.instagram"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                class="site-footer__social"
              >
                <i class="pi pi-instagram" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <nav aria-label="Services">
          <h2 class="site-footer__heading">Services</h2>
          <ul class="space-y-2 text-gray-300">
            <li><a href="#courses" class="site-footer__link">BLS Training</a></li>
            <li><a href="#courses" class="site-footer__link">ACLS Training</a></li>
            <li><a href="#training" class="site-footer__link">Mobile Training</a></li>
          </ul>
        </nav>

        <!-- Contact -->
        <address class="not-italic">
          <h2 class="site-footer__heading">Contact</h2>
          <ul class="space-y-3 text-gray-300">
            <li class="flex items-center">
              <i class="pi pi-phone mr-2 text-primary-400" aria-hidden="true"></i>
              <a :href="config.contact.phoneLink" class="site-footer__link">{{ config.contact.phone }}</a>
            </li>
            <li class="flex items-center">
              <i class="pi pi-envelope mr-2 text-primary-400" aria-hidden="true"></i>
              <a :href="config.contact.emailLink" class="site-footer__link">{{ config.contact.email }}</a>
            </li>
            <li class="flex items-start">
              <i class="pi pi-map-marker mr-2 mt-1 text-primary-400" aria-hidden="true"></i>
              <span>{{ config.getFullAddress() }}</span>
            </li>
          </ul>
        </address>
      </div>

      <!-- Legal -->
      <div class="site-footer__legal">
        <p class="text-gray-400 text-sm">
          &copy; {{ year }} {{ config.business.legalName }}. Professional medical training by certified instructors.
        </p>
        <div v-if="hasLegalMeta" class="flex flex-wrap items-center gap-3 text-gray-400 text-sm">
          <span v-if="config.business.license">Licensed: {{ config.business.license }}</span>
          <span v-if="config.business.license && hasCert" class="hidden md:inline" aria-hidden="true">|</span>
          <span v-if="hasCert">{{ config.business.certifications[0] }}</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useSiteConfig } from '~/composables/useSiteConfig.js'

defineEmits(['open-square-booking'])

const config = useSiteConfig()
const year = new Date().getFullYear()

const hasAnySocial = computed(() =>
  !!(config.social?.facebook || config.social?.twitter || config.social?.linkedin || config.social?.instagram)
)
const hasCert = computed(() =>
  Array.isArray(config.business?.certifications) && config.business.certifications.length > 0
)
const hasLegalMeta = computed(() => !!config.business?.license || hasCert.value)
</script>

<style scoped>
.site-footer {
  @apply bg-gray-900 dark:bg-gray-950 text-white pt-16 pb-10 border-t border-gray-800;
}

.site-footer__cta {
  @apply mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 rounded-2xl bg-gray-800/60 border border-gray-700/60 px-6 py-8 md:px-8;
  background-image: linear-gradient(135deg, rgba(34, 197, 94, 0.08), rgba(15, 23, 42, 0));
}

.site-footer__cta-button {
  @apply inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold shadow-lg transition-all duration-300;
}

.site-footer__cta-button:hover {
  @apply -translate-y-0.5 shadow-xl;
}

.site-footer__cta-button:focus-visible {
  @apply outline-none ring-2 ring-primary-400 ring-offset-2 ring-offset-gray-900;
}

.site-footer__grid {
  @apply grid grid-cols-1 md:grid-cols-5 gap-10 mb-12;
}

.site-footer__heading {
  @apply text-base font-semibold text-white mb-4 tracking-wide;
}

.site-footer__link {
  @apply text-gray-300 hover:text-white transition-colors;
}

.site-footer__link:focus-visible {
  @apply outline-none underline underline-offset-4 text-white;
}

.site-footer__social {
  @apply inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-800 text-gray-300 hover:bg-primary-600 hover:text-white transition-all duration-300 text-lg;
}

.site-footer__social:focus-visible {
  @apply outline-none ring-2 ring-primary-400 ring-offset-2 ring-offset-gray-900;
}

.site-footer__legal {
  @apply pt-8 border-t border-gray-800 flex flex-col md:flex-row md:justify-between md:items-center gap-3;
}
</style>
