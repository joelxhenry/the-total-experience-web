import { siteConfig } from './config/site.js'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts'],

  googleFonts: {
    families: {
      Sora: [400, 500, 600, 700, 800],
      Inter: [400, 500, 600, 700]
    },
    display: 'swap',
    preconnect: true,
    download: true
  },
  css: [
    'primevue/resources/themes/aura-light-green/theme.css',
    'primevue/resources/primevue.css',
    'primeicons/primeicons.css',
    '~/assets/css/main.css'
  ],
  build: {
    transpile: ['primevue']
  },
  nitro: {
    prerender: {
      routes: ['/']
    }
  },

  routeRules: {
    '/api/reviews/public': { cache: { maxAge: 60 } }
  },

  vite: {
    server: {
      hmr: {
        host: '72.62.165.152',
        protocol: 'ws'
      }
    }
  },

  runtimeConfig: {
    adminPassword: process.env.ADMIN_PASSWORD || '',
    adminSessionSecret: process.env.ADMIN_SESSION_SECRET || '',
    resendApiKey: process.env.RESEND_API_KEY || '',
    mailFrom: process.env.MAIL_FROM || '',
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    public: {
      siteUrl: process.env.SITE_URL || ''
    }
  },
  
  app: {
    head: {
      title: siteConfig.seo.title,
      meta: [
        { name: 'description', content: siteConfig.description },
        { name: 'keywords', content: siteConfig.seo.keywords },
        { name: 'author', content: siteConfig.seo.author },
        { property: 'og:title', content: siteConfig.seo.title },
        { property: 'og:description', content: siteConfig.description },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: siteConfig.assets.socialMedia.ogImage },
        { property: 'og:image:alt', content: siteConfig.assets.socialMedia.ogImageAlt },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: siteConfig.seo.title },
        { name: 'twitter:description', content: siteConfig.description },
        { name: 'twitter:image', content: siteConfig.assets.socialMedia.twitterImage },
        { name: 'twitter:image:alt', content: siteConfig.assets.socialMedia.twitterImageAlt }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: siteConfig.assets.favicon }
      ]
    }
  },
  ssr: true
})