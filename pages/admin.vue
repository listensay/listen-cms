<script setup>
import useMainStore from '~/stores/main'

definePageMeta({
  middleware: ['auth'],
  layout: 'admin',
})

const tabs = [
  {
      label: '基本管理',
      id: 1,
      items: [
        {
            label: '仪表盘',
            icon: 'pi pi-chart-pie',
            url: '/admin/dashboard'
        },
        {
            label: '文章管理',
            icon: 'pi pi-book',
            url: '/admin/article'
        },
        {
          label: '网站首页',
            icon: 'pi pi-home',
            url: '/'
        },
      ]
  },
  {
    label: '网站管理',
    id: 2,
    items: [
        {
            label: '网站设置',
            icon: 'pi pi-cog',
            url: '/admin/setting'
        },
        {
            label: '个人资料',
            icon: 'pi pi-profile',
            url: '/admin/profile'
        },
        {
            label: '图片管理',
            icon: 'pi pi-images',
            url: '/admin/images'
        }
    ]
  }
]

const mainStore = useMainStore()
const { fetchGetUserInfo } = mainStore
await fetchGetUserInfo()
</script>

<template>
  <div class="layout">
    <div class="flex p-8 bg-slate-200 h-[100vh]">
      <AppMenu :tabs="tabs" class="w-64" />
      <NuxtPage class="ml-4 flex-1 h-full bg-white rounded-md p-4" />
    </div>
  </div>
</template>

<style lang="less" scoped></style>
