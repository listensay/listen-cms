<script setup>
const items = [
  {
    label: '发布文章',
    icon: 'pi pi-fw pi-file-edit',
    url: '/admin/article/add',
  },
  {
    label: '文章管理',
    icon: 'pi pi-fw pi-file',
    url: '/admin/article',
  },
  {
    label: '分类管理',
    icon: 'pi pi-fw pi-tag',
    url: '/admin/article/category',
  },
  {
    label: '标签管理',
    icon: 'pi pi-fw pi-hashtag',
    url: '/admin/article/tags',
  }
]
</script>

<template>
  <div class="article flex h-full">
    <LayoutMenu :tabs="items" :hidden-logo="true" :hidden-user="true" />
    <div class="flex-1 ml-4">
      <NuxtPage />
    </div>
  </div>
</template>

<style lang="less" scoped></style>
