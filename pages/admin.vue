<script setup>
import useAppStore from '~/store'

const appStore = useAppStore()
definePageMeta({
  middleware: ['auth'],
  layout: 'admin'
})

const result = await useRequestGet('/api/user')
appStore.user = result.body.user
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
