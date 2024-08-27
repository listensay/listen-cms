<script setup>
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
          }
      ]
  }
])
</script>

<template>
  <div class="layout bg-slate-200">
    <div class="flex p-8 h-[100vh]">
      <LayoutMenu :tabs="items"/>
      <div class="flex-1 ml-4">
        <Card class="h-full">
          <template #content>
            <div>
              <slot />
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
