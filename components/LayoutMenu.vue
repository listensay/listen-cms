
<script setup>
import useAppStore from '~/store'

const appStore = useAppStore()
const { user } = storeToRefs(appStore)

const items = ref([
  {
      separator: true
  },
  {
      label: '基本管理',
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
      items: [
          {
              label: '网站设置',
              icon: 'pi pi-cog',
          },
          {
              label: '消息',
              icon: 'pi pi-inbox',
          },
          {
              label: '退出',
              icon: 'pi pi-sign-out',
          }
      ]
  }
])
</script>

<template>
  <div class="card flex justify-center h-[100vh]">
      <Menu :model="items" class="flex flex-col w-full h-full md:w-60" style="border-radius: 0;">
          <template #start>
              <span class="inline-flex items-center gap-1 px-2 py-2">
                  LOGO
              </span>
          </template>
          <template #item="{ item, props }">
              <NuxtLink v-ripple :to="item.url" class="flex items-center" v-bind="props.action">
                  <span :class="item.icon" />
                  <span>{{ item.label }}</span>
                  <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
                  <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
              </NuxtLink>
          </template>
          <template #end>
              <button v-ripple class="relative overflow-hidden w-full border-0 bg-transparent flex items-start p-2 pl-4 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-none cursor-pointer transition-colors duration-200">
                  <template v-if="user.avatar">
                        <Avatar :image="user.avatar" class="mr-2" shape="circle" />
                  </template>
                  <template v-else>
                        <Avatar :label="user.username[0]" class="mr-2" shape="circle" />
                  </template>
                  <span class="inline-flex flex-col items-start">
                      <span class="font-bold">{{ user.nickename || '还没有设置昵称捏' }}</span>
                      <span class="text-sm">{{ user.username }}</span>
                  </span>
              </button>
          </template>
      </Menu>
  </div>
</template>

<style>
.p-menu-list {
  flex: 1;
}
</style>