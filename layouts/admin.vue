<script setup>
</script>

<template>
  <div class="layout bg-slate-200">
    <div class="flex p-8 h-[100vh]">
      <LayoutMenu />
      <div class="flex-1 ml-4">
        <div class="bg-white shadow-md rounded-md h-full">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
