<script setup>
const tabs = [
  {
    id: 1,
    items: [
      {
        label: '发布文章',
        icon: 'pi pi-fw pi-file-edit',
        url: '/admin/article/post-0',
      },
      {
        label: '文章列表',
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
  }
]
</script>

<template>
  <div class="article flex h-full">
    <AppMenu :tabs="tabs" />
    <div class="flex-1">
      <NuxtPage />
    </div>
  </div>
</template>

<style lang="less" scoped></style>
