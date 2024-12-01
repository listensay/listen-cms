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

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - 背影如正面` : '背影如正面'
  }
})
</script>

<template>
  <div class="home h-[100vh] p-8 w-full">
    <div class="flex h-full">
      <div class="w-64 mr-4">
        <AppMenu :tabs="tabs" :border="false" class="shadow-md" />
      </div>
      <div class="flex-1">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>

</style>
