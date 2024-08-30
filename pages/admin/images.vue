<script setup>
const image = ref('')
</script>

<template>
  <div class="images">
    <Images v-model="image" :choose="false" />
  </div>
</template>

<style lang="less" scoped></style>
