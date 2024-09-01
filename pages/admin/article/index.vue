<script setup>
const article = ref([])
const getArticle = async () => {
  const result = await useRequestGet('/api/auth/article', { page: 1, total: 10 })
  article.value = result.body.list
}

const deleteArticle = async (data) => {
  const result = await useRequestDelete('/api/auth/article', { id: data.id })
  if(result.statusCode === 200) {
    message.success('删除成功')
  }
  await getArticle()
}

await getArticle()
</script>

<template>
  <div class="article-admin">
    <div class="border-sky-100">
      <DataTable :value="article" table-style="min-width: 50rem" striped-rows>
        <Column field="cover" header="文章缩略图">
          <template #body="slotProps">
            <NuxtImg :src="slotProps.data.cover" width="100" />
          </template>
        </Column>
        <Column field="title" header="文章标题">
          <template #body="slotProps">
            <NuxtLink :to="`/admin/article/edit/${slotProps.data.id}`">{{ slotProps.data.title }}</NuxtLink>
          </template>
        </Column>
        <Column field="category.name" header="文章分类"></Column>
        <Column field="description" header="文章描述"></Column>
        <Column field="published" header="状态">
          <template #body="slotProps">
            <Tag :severity="slotProps.data.published ? 'success' : 'danger'" :value="slotProps.data.published ? '已发布' : '未发布'" />
          </template>
        </Column>
        <Column header="操作">
          <template #body="slotProps">
            <Button icon="pi pi-pencil" rounded outlined class="mr-2" severity="info" @click="navigateTo(`/admin/article/edit/${slotProps.data.id}`)" />
            <Button icon="pi pi-trash" rounded outlined severity="danger" @click="deleteArticle(slotProps.data)" />
          </template>
        </Column>
      </DataTable> 
    </div>
  </div>
</template>

<style lang="less" scoped></style>
