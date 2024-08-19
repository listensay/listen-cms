<script lang="ts" setup>
import Editor from 'primevue/editor'
const value = ref('123')
</script>

<template>
  <div class="home">
    <Editor v-model="value" editor-style="height: 320px" />
  </div>
</template>

<style lang="less" scoped></style>
