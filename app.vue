<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - 背影如正面` : '背影如正面'
  }
})


</script>

<style>
.page-enter-active,
.page-leave-active{
  transition: all 0.2s;
}
.page-enter-from{
  opacity: 0;
  transform: translate(50px, 0);
}
.page-leave-to {
  opacity: 0;
  transform: translate(-10px, 0);
}
</style>
