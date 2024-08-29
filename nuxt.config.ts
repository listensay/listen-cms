// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module',
    '@prisma/nuxt',
    '@ant-design-vue/nuxt',
    'nuxt-monaco-editor',
    '@nuxt/image'
  ],
  css: [
    '@/assets/css/style.css',
    'primeicons/primeicons.css'
  ],
  primevue: {
    options: {
      theme: {
        preset: Aura
      }
    }
  },
  // 全局路由过渡效果
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  runtimeConfig: {
    SECRET_KEY: process.env.SECRET_KEY
  },
})