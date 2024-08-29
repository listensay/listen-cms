<script setup>
const page = ref(1)
const total = ref(10)
const tabs = ref([])
const images= ref(null)
const visible = ref(false)
const title = ref('')
// 表单
const form = reactive({
  id: null,
  name: '',
  url: '',
  categoryId: null,
})

// 获取分类列表
const tabsList = await useFetchCategory().auth.getCategories()
tabs.value = tabsList.body.list
const tab = ref(tabs.value[0])
// 获取图片数据
const getImages = async () => {
  try {
    const result = await useFetchImages().auth.getImages(page.value, total.value, tab.value.id)
    images.value = result.body.list
  } catch {
  }
}
getImages()
watch(tab, () => {
  getImages()
})

const upload = () => {
  visible.value = true
  title.value = '上传图片'
  form.categoryId = tab.value.id
}

const submit = async () => {
  if(form.id) {
    // 编辑
  } else {
    // 新增
    delete form.id
    form.name = form.url
    const reuslt = await useFetchImages().auth.createImage(form)
    if(reuslt.success) {
      message.success('图片上传成功')
      resetForm()
      getImages()
      visible.value = false
    }
  }
}

const cancel = () => {
  visible.value = false
  resetForm()
}
// 重置表单
const resetForm = () => {
  form.name = ''
  form.url = ''
  form.categoryId = null
}

// 删除图片
const deleteImage = async (id) => {
  try {
    const result = await useRequestDelete('/api/images', { id })
    if(result.success) {
      message.success('图片删除成功')
      getImages()
    }
  } catch {
  }
}
</script>

<template>
  <div class="images h-full">
    <div class="flex h-full">
      <div class="w-52">
        <Listbox v-model="tab" :options="tabs" option-label="name" class="w-full md:w-52"/>
      </div>
      <div class="flex-1 pl-4">
        <Button label="上传图片" class="mb-4" @click="upload"/>
        <div class="grid grid-cols-4 gap-4">
          <ClientOnly>
            <div v-for="item in images" :key="item.url" class="border-zinc-300 border rounded-md overflow-hidden">
              <div class="relative">
                <Image alt="Image" class="image w-full h-36" preview style="display: block;">
                  <template #previewicon>
                      <i class="pi pi-search"></i>
                  </template>
                  <template #image>
                      <img :src="item.url" alt="image" />
                  </template>
                  <template #preview="slotProps">
                      <img :src="item.url" alt="preview" :style="slotProps.style" @click="slotProps.onClick" />
                  </template>
                </Image>
                <div class="absolute bottom-0 left-0 right-0 z-1 bg-slate-100/[.8] contrast-50 text-center">
                  <span class="text-sm">{{ item.name }}</span>
                </div>
              </div>
              <div class="bg-white p-4 text-center">
                <Button class="ml-2" label="删除" text severity="danger" @click="deleteImage(item.id)"/>
              </div>
            </div>
          </ClientOnly>
        </div>
      </div>
    </div>
    <a-modal
      v-model:open="visible"
      :title="title"
      :ok-text="'完成'"
      :cancel-text="'取消'"
      @ok="submit"
      @cancel="cancel"
    >
      <a-form-item
        label="图片上传"
        name="url"
      >
        <AppUpload v-model="form.url" />
      </a-form-item>
    </a-modal>
  </div>
</template>

<style lang="less" scoped>
.image {
  img {
    max-width: 100%;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}
</style>
