<script setup>
const article = ref([])
const result = await useRequestGet('/api/article', { page: 1, total: 10 })
article.value = result.body.list
</script>

<template>
  <div class="article-admin">
    <div class="border-sky-100">
      <DataTable :value="article" table-style="min-width: 50rem" striped-rows>
        <Column field="cover" header="文章缩略图"></Column>
        <Column field="title" header="文章标题"></Column>
        <Column field="category.name" header="文章分类"></Column>
        <Column field="description" header="文章描述"></Column>
        <Column field="published" header="状态">
          <template #body="slotProps">
            <Tag :severity="slotProps.data.published ? 'success' : 'danger'" :value="slotProps.data.published ? '已发布' : '未发布'"></Tag>
          </template>
        </Column>
        <Column header="操作"></Column>
      </DataTable> 
    </div>
  </div>
</template>

<style lang="less" scoped></style>
