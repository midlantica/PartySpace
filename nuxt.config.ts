// https://nuxt.com/docs/getting-started/upgrade#nuxt-4
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  future: {
    compatibilityVersion: 4
  },
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-auth-utils'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'PartySpace',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A space for party people' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  runtimeConfig: {
    session: {
      password: 'partyspace-secret-key-min-32-chars-long!!'
    }
  }
})
