<script setup>
const article = reactive({
  title: '',
  content: '',
  category: '',
  cover: '',
  description: '',
  published: true,
})

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
const previewVisible = ref(false)
const previewImage = ref('')
const previewTitle = ref('')
const fileList = ref([])
const handleCancel = () => {
  previewVisible.value = false
  previewTitle.value = ''
}
const handlePreview = async file => {
  if (!file.url && !file.preview) {
    file.preview = await getBase64(file.originFileObj)
  }
  previewImage.value = file.url || file.preview
  previewVisible.value = true
  previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
}

const token = useCookie('token').value
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
              <a-upload
                v-model:file-list="fileList"
                action="/api/upload/images"
                list-type="picture-card"
                :headers="{ Authorization: token }"
                @preview="handlePreview"
              >
                <div v-if="fileList.length < 8">
                  <plus-outlined />
                  <div style="margin-top: 8px">Upload</div>
                </div>
              </a-upload>
              <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
                <img alt="example" style="width: 100%" :src="previewImage" />
              </a-modal>
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
