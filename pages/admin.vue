<script setup>
definePageMeta({
  middleware: ['auth'],
  layout: 'admin'
})
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
