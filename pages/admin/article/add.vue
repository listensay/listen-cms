<script setup>
const article = reactive({
  title: '',
  content: '',
  category: 1,
  cover: '',
  description: '',
  published: true,
})

const category = ref([])
const visible = ref(false)

// 获取文章分类
const getCategory = async () => {
  const result = await useRequestGet('/api/category', { page: 1, total: 10 })
  category.value = result.body.list
}

const submit = async () => {
  // 校验文章标题,内容
  if(!article.title || !article.content) {
    return message.error('文章标题和内容不能为空')
  }

  const result = await useRequestPost('/api/article', article)
  if(result.statusCode === 200) {
    message.success('文章发布成功')
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
    <div class="flex h-full">
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
      <Card class="w-72 h-full">
        <template #content>
          <div>
            <div class="mb-4">
              <div class="text-lg mb-2">文章缩略图</div>
              <template v-if="article.cover === ''">
                <Button label="上传缩略图" @click="visible = true" />
              </template>
              <template v-else>
                <NuxtImg class="rounded-md" :src="article.cover" width="100" height="100" @click="visible = true" />
              </template>
            </div>
            <div class="mb-4">
              <div class="text-lg mb-2">文章分类</div>
              <a-select
                ref="select"
                v-model:value="article.category"
                style="width: 120px"
              >
                <a-select-option v-for="item in category" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
              </a-select>
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
      <Dialog v-model:visible="visible" modal header="缩略图选择" :style="{ width: '80vw' }">
        <Images v-model="article.cover" :choose="true" />
      </Dialog>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
