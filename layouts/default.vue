<script lang="ts" setup>
const tabs = [
  {
      label: '基本管理',
      id: 1,
      items: [
        {
            label: 'Home',
            icon: 'pi pi-chart-pie',
            url: '/'
        },
        {
          label: 'About',
            icon: 'pi pi-home',
            url: '/about'
        },
      ]
  }
]
</script>

<template>
  <div class=" flex w-full mx-auto h-[100vh] overflow-hidden">
    <div class="flex-shrink-0 w-64">
      <AppMenu :tabs="tabs" :border="false" rounded="" />
    </div>
    <div class="flex flex-1">
      <div class="flex-shrink-0 h-full w-72 top-14 bg-slate-400">123</div>
      <div class="flex-1 w-full overflow-y-auto">
        <div class="sticky top-0 z-10 flex items-center bg-red-600 h-14">
          123
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>

</style>
