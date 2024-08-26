<script setup>
const images = defineModel()
const fileList = ref([])
// 图片展示处理
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
// 图片上传成功处理
const handleChange = info => {
  if (info.file.status === 'done') {
    // 获取上传成功后的图片地址
    images.value = info.file.response.body[0].url
  }
}

const token = useCookie('token').value
</script>

<template>
  <div class="upload">
    <a-upload
      v-model:file-list="fileList"
      action="/api/upload/images"
      list-type="picture-card"
      :headers="{ Authorization: token }"
      @preview="handlePreview"
      @change="handleChange"
    >
      <div v-if="fileList.length < 1">
        <plus-outlined />
        <div style="margin-top: 8px">Upload</div>
      </div>
    </a-upload>
    <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<style lang="less" scoped></style>
