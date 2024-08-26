<script setup>

const article = reactive({
  title: '',
  content: '',
  category: 1,
  cover: '',
  description: '',
  published: true,
})

const id = useRoute().params.id
const result = await useRequestGet('/api/article/detail', { id })
article.title = result.body.title
article.content = result.body.content
article.description = result.body.description
article.cover = result.body.cover
article.category = result.body.categoryId
article.published = result.body.published
const submit = async () => {
  // 校验文章标题,内容
  if(!article.title || !article.content) {
    return message.error('文章标题和内容不能为空')
  }
  article.id = Number(id)
  const result = await useRequestPut('/api/article', article)
  if(result.statusCode === 200) {
    message.success('文章修改成功')
    navigateTo('/admin/article/')
  }
}

</script>

<template>
  <div class="article-add">
    <div class="flex">
      <div class="flex-1 mr-4">
        <div class="mb-4">
          <InputText v-model="article.title" type="text" class="w-full" placeholder="文章标题"/>
        </div>
        <div class="mb-4">
          <ClientOnly>
            <MonacoEditor v-model="article.content" style="height: 600px;" lang="markdown" :options="{ theme: 'vs-dark' }" />
          </ClientOnly>
        </div>
        <div>
          <Textarea v-model="article.description" rows="4" cols="30" class="w-full" placeholder="文章描述"/>
        </div>
      </div>
      <Card class="w-96">
        <template #content>
          <div>
            <div class="mb-4">
              <div class="text-lg mb-2">文章缩略图</div>
              <AppUpload v-model="article.cover" />
            </div>
            <div class="mb-4">
              <div class="text-lg mb-2">文章分类</div>
            </div>
            <div class="mb-4">
              <div class="text-lg mb-2">文章状态</div>
              <div class="flex">
                <label for="switch1" class="mr-2">立刻发布文章</label>
                <ToggleSwitch v-model="article.published" input-id="switch1" />
              </div>
            </div>
            <div>
              <Button label="发布文章" @click="submit" />
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
