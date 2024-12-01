<script setup>
import { rules } from '@/utils/antd_form_rules'
const id = Number(useRoute().params.id)

const title = id !==0 ? '编辑文章' : '创建文章'

useHead({
  title,
})

const article = reactive({
  title: '',
  content: '',
  category: 1,
  cover: '',
  description: '',
  published: true,
})

const formRef = ref()
const category = ref([])
const visible = ref(false)

// 获取文章分类
const getCategory = async () => {
  const result = await useRequestGet('/api/auth/category', { page: 1, total: 10 })
  category.value = result.body.list
}

// 获取文章详情
const getPostDetail = async () => {
  const result = await useRequestGet('/api/auth/article/detail', { id })
  article.title = result.body.title
  article.content = result.body.content
  article.description = result.body.description
  article.cover = result.body.cover
  article.category = result.body.categoryId
  article.published = result.body.published
}

if(id !== 0) {
  await getPostDetail()
}

// 提交表单
const onSubmit = () => {
  formRef.value
    .validate()
    .then(
      async () => {
          if(id !== 0) {
            // 修改文章
            await updatePost()
          } else {
            // 发布文章
            await pushPost()
          }
      }
    )
}

const pushPost = async () => {
  const result = await useRequestPost('/api/auth/article', article)
  if(result.statusCode === 200) {
    message.success('文章发布成功')
    navigateTo('/admin/article/')
  }
}

const updatePost = async () => {
  article.id = id
  const result = await useRequestPut('/api/auth/article', article)
  if(result.statusCode === 200) {
    message.success('文章修改成功')
    navigateTo('/admin/article/')
  }
}


watch(() => article.cover, () => {
  visible.value = false
})

await getCategory()

</script>

<template>
  <div class="article-add h-full">
    <div class="h-full">
      <a-form
        ref="formRef"
        :model="article"
        :rules="rules"
        class="flex"
      >
        <div class="flex-1 mx-4">
          <div class="mb-4">
            <a-form-item ref="title" name="title">
              <a-input v-model:value="article.title" placeholder="文章标题" />
            </a-form-item>
          </div>
          <div class="mb-4 border p-2 rounded-md">
            <ClientOnly>
              <a-form-item ref="content" name="content">
                <MonacoEditor v-model="article.content" style="height: 600px;" lang="markdown" />
                <a-input
                  v-model:value="article.content" 
                  style="
                    width: 0px;
                    padding: 0px;
                    height: 0;
                    border: none;"
                />
              </a-form-item>
            </ClientOnly>
          </div>
          <div>
            <a-form-item ref="description" name="description">
              <a-textarea v-model:value="article.description" placeholder="文章描述" :rows="4" />
            </a-form-item>
          </div>
        </div>

        <div class="w-72">
          <div class="mb-4">
            <div class="text-lg mb-2">文章缩略图</div>
            <a-form-item ref="cover" name="cover">
              <template v-if="article.cover === ''">
                <a-button @click="visible = true">上传缩略图</a-button>
              </template>
              <template v-else>
                <NuxtImg class="rounded-md" :src="article.cover" width="100" height="100" @click="visible = true" />
              </template>
              <a-input
                v-model:value="article.cover" 
                style="
                  width: 0px;
                  padding: 0px;
                  height: 0;
                  border: none;"
              />
            </a-form-item>
          </div>
          <div class="mb-4">
            <div class="text-lg mb-2">文章分类</div>
            <ClientOnly>
              <a-form-item ref="category" name="category">
                <a-select
                  ref="select"
                  v-model:value="article.category"
                  style="width: 120px"
                >
                  <a-select-option v-for="item in category" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
                </a-select>
              </a-form-item>
            </ClientOnly>
          </div>
          <div class="mb-4">
            <div class="text-lg mb-2">文章状态</div>
            <div class="flex">
              <label for="switch1" class="mr-2">发布</label>
              <a-switch v-model:checked="article.published" />
            </div>
          </div>
          <div>
            <a-button type="primary" @click="onSubmit">完成</a-button>
          </div>
        </div>

      </a-form>

      <a-modal v-model:open="visible" title="缩略图选择" width="80vw">
        <Images v-model="article.cover" :choose="true" />
      </a-modal>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
