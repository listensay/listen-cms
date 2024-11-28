<script setup>
defineProps({
  choose: {
    type: Boolean,
    default: false
  }
})

const image = defineModel()

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
const tab = ref(tabs.value[0].id)

// 获取图片数据
const getImages = async () => {
  try {
    const result = await useFetchImages().auth.getImages(page.value, total.value, tab.value)
    images.value = result.body.list
  } catch {
  }
}
await getImages()

watch(tab, async () => {
  await getImages()
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
    const result = await useRequestDelete('/api/auth/images', { id })
    if(result.success) {
      message.success('图片删除成功')
      getImages()
    }
  } catch {
  }
}

const chooseHandle = (url) => {
  image.value = url
}
</script>

<template>
  <div class="images h-full">
    <div class="flex h-full">
      <div class="w-52">
        <span>
          图片分类: 
        </span>
        <ClientOnly>
          <a-select
          ref="select"
          v-model:value="tab"
          style="width: 120px"
        >
            <a-select-option v-for="category in tabs" :key="category.id" :value="category.id">{{ category.name }}</a-select-option>
          </a-select>
        </ClientOnly>
      </div>
      <div class="flex-1 pl-4">
        <a-button type="primary" class="mb-4" @click="upload">上传图片</a-button>
        <div class="grid grid-cols-4 gap-4">
          <ClientOnly>
            <div v-for="item in images" :key="item.url" class="border-zinc-300 border rounded-md overflow-hidden">
              <div class="relative">
                <a-image :src="item.url" />
              </div>
              <div class="bg-white p-4 text-center">
                <template v-if="choose">
                  <a-button type="primary" class="ml-2" @click="chooseHandle(item.url)">选择</a-button>
                </template>
                <a-button class="ml-2" type="danger" @click="deleteImage(item.id)">删除</a-button>
              </div>
            </div>
          </ClientOnly>
        </div>
      </div>
    </div>
    <a-modal 
      v-model:open="visible"
      title="图片上传"
      @cancel="cancel"
      @ok="submit"
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
