<script setup>
import useAppStore from '~/store'

const appStore = useAppStore()
definePageMeta({
  middleware: ['auth'],
  layout: 'admin'
})

await appStore.fetchGetUserInfo()
</script>

<template>
  <div class="admin">
    <div class="p-6">
      <NuxtPage />
    </div>
  </div>
</template>

<style lang="less" scoped>

</style>
