import nitroPort from 'nitro-port-module'
import nitroPublic from 'nitro-public-module'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
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
    modules: [
      nitroPublic(),
      nitroPort({
        port: 4000,
      }),
    ],
    imports: {
      dirs: ['server/utils'],
    },
  },
})