// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@primevue/nuxt-module'],
  css: [
    '@/assets/css/style.css'
  ],
  primevue: {
    options: {
      theme: {
        preset: Aura
      }
    }
  }
})
