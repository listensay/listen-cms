// https://nuxt.com/docs/api/configuration/nuxt-config
import nitroPublic from 'nitro-public-module'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@prisma/nuxt',
    '@ant-design-vue/nuxt',
    'nuxt-monaco-editor',
    '@nuxt/image',
    '@pinia/nuxt',
    'dayjs-nuxt'
  ],
  css: [
    '@/assets/css/style.css',
    'primeicons/primeicons.css'
  ],
  // 全局路由过渡效果
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  runtimeConfig: {
    SECRET_KEY: process.env.SECRET_KEY
  },
  nitro: {
    modules: [nitroPublic()],
  }
})