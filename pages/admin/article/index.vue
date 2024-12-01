<script setup>
useHead({
  title: '文章列表'
})

const article = ref([])
// 获取文章列表
const getArticle = async () => {
  try {
    const result = await useRequestGet('/api/auth/article', { page: 1, total: 10 })
    article.value = result.body.list
  } catch (error) {
    console.log(error)
  }
}

// 删除文章
const deleteArticle = async (data) => {
  const result = await useRequestDelete('/api/auth/article', { id: data.id })
  if(result.statusCode === 200) {
    message.success('删除成功')
  }
  await getArticle()
}

await getArticle()

const columns = [
  {
    title: '文章标题',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '文章分类',
    dataIndex: 'category',
    key: 'category'
  },
  {
    title: '发布日期',
    dataIndex: 'createdAt',
  },
  {
    title: '最后一次更新日期',
    dataIndex: 'updatedAt',
  },
  {
    title: '',
    dataIndex: 'action',
    key: 'action',
    width: '150px',
  }
]
</script>

<template>
  <div class="article-admin ml-4">
    <div class="border-sky-100">
      <a-table :columns="columns" :data-source="article" bordered>
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'name'">
            <a>{{ text }}</a>
          </template>
          <!-- 文章标题 -->
          <template v-if="column.key === 'title'">
            <NuxtLink :to="`/admin/article/post-${record.id}`">{{ record.title }}</NuxtLink>
          </template>
          <!-- 文章缩略图 -->
          <template v-if="column.key === 'cover'">
            <img :src="record.cover" alt="" width="70" height="70" class=" rounded-md">
          </template>
          <!-- 文章分类 -->
          <template v-if="column.key === 'category'">
            <span>{{ record.category.name }}</span>
          </template>
          <!-- 操作 -->
          <template v-if="column.key === 'action'">
            <a-button type="danger" size="small" @click="deleteArticle(record)">删除</a-button>
          </template>
        </template>
        <template #title>文章管理</template>
      </a-table>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
