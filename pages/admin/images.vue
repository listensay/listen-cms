<script setup>
useHead({
  title: '图片管理'
})

const image = ref('')
</script>

<template>
  <div class="images">
    <Images v-model="image" :choose="false" />
  </div>
</template>

<style lang="less" scoped></style>
