<script setup>
const article = reactive({
  title: '',
  content: '',
  category: '',
  cover: '',
  description: '',
  published: true,
})

const onAdvancedUpload = (event) => {
  console.log(event)
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
          <Editor v-model="article.content" editor-style="height: 320px" />
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
              <FileUpload name="demo[]" url="/api/upload" :multiple="true" accept="image/*" :max-file-size="1000000" @upload="onAdvancedUpload($event)">
                <template #empty>
                    <span>Drag and drop files to here to upload.</span>
                </template>
              </FileUpload>
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
              <Button label="发布文章" />
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
