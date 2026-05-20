import { siteConfig } from './config/site.js'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: [
    'primevue/resources/themes/aura-light-green/theme.css',
    'primevue/resources/primevue.css',
    'primeicons/primeicons.css'
  ],
  build: {
    transpile: ['primevue']
  },
  nitro: {
    prerender: {
      routes: ['/']
    }
  },

  runtimeConfig: {
    adminPassword: process.env.ADMIN_PASSWORD || '',
    adminSessionSecret: process.env.ADMIN_SESSION_SECRET || '',
    smtpHost: process.env.SMTP_HOST || '',
    smtpPort: process.env.SMTP_PORT || '',
    smtpSecure: process.env.SMTP_SECURE || '',
    smtpUser: process.env.SMTP_USER || '',
    smtpPass: process.env.SMTP_PASS || '',
    mailFrom: process.env.MAIL_FROM || '',
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