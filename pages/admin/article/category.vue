<script setup>
const category = ref([])
const total = ref(10)
const page = ref(1)
const visible = ref(false)
const title = ref('')
const categoryType = [
  {
    label: '文章',
    type: 0
  }, {
    label: '图片',
    type: 1
  }
]

const form = reactive({
  id: null,
  name: '',
  description: '',
  cover: '',
  type: 0
})

// 重置表单
const resetForm = () => {
  form.id = null
  form.name = ''
  form.description = ''
  form.cover = ''
  form.type = null
}

// 获取分类列表
const getCategory = async () => {
  const result = await useRequestGet('/api/category', { page, total })
  category.value = result.body.list
}

// 删除分类
const deleteCategory = async (id) => {
  const result = await useRequestDelete('/api/category', { id })
  if(result.success) {
    message.success('删除成功')
  }
  await getCategory()
}
// 点击修改按钮
const updateCategory = (data) => {
  visible.value = true
  title.value = '编辑分类'
  form.id = data.id
  form.name = data.name
  form.description = data.description
  form.cover = data.cover
  form.type = data.type
}
// 点击添加按钮
const addCategory = () => {
  visible.value = true
  title.value = '添加分类'
  resetForm()
}
// 点击完成按钮
const submit = async () => {
  // 根据ID判断是新增还是修改
  if(form.id) {
    // 修改
    const result = await useRequestPut('/api/category', form)
    if(result.success) {
      message.success('修改成功')
      await getCategory()
      resetForm()
      visible.value = false
    }
  } else {
    // 新增
    delete form.id
    const result = await useRequestPost('/api/category', form)
    if(result.success) {
      message.success('新增成功')
      await getCategory()
      resetForm()
      visible.value = false
    }
  }
}
// 取消按钮
const cancel = () => {
  resetForm()
  visible.value = false
}

await getCategory()
</script>

<template>
  <div class="category">
    <Button class="mb-4" type="button" label="添加分类" @click="addCategory"></Button>
    <DataTable :value="category" table-style="min-width: 50rem" striped-rows>
      <Column field="cover" header="分类封面">
        <template #body="slotProps">
          <NuxtImg :src="slotProps.data.cover" width="100" />
        </template>
      </Column>
      <Column field="name" header="分类标题"></Column>
      <Column field="type" header="分类类型">
        <template #body="slotProps">
          <Tag :severity="slotProps.data.type ? 'info' : 'success'" :value="categoryType[slotProps.data.type].label" />
        </template>
      </Column>
      <Column field="description" header="分类描述"></Column>
      <Column header="操作">
        <template #body="slotProps">
          <Button label="删除" severity="danger" class="mr-4" @click="deleteCategory(slotProps.data.id)" />
          <Button label="修改" severity="info" @click="updateCategory(slotProps.data)" />
        </template>
      </Column>
    </DataTable> 

    <a-modal
      v-model:open="visible"
      :title="title"
      :ok-text="'完成'"
      :cancel-text="'取消'"
      @ok="submit"
      @cancel="cancel"
    >
      <a-form-item
        label="分类名称"
        name="name"
      >
        <a-input v-model:value="form.name" />
      </a-form-item>
      <a-form-item
        label="分类描述"
        name="description"
      >
        <a-input v-model:value="form.description" />
      </a-form-item>
      <a-form-item
        label="分类类型"
        name="type"
      >
        <a-select
          ref="select"
          v-model:value="form.type"
          style="width: 120px"
        >
          <a-select-option v-for="item in categoryType" :key="item.type" :value="item.type">{{ item.label }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="分类封面"
        name="cover"
      >
        <AppUpload v-model="form.cover" />
      </a-form-item>
    </a-modal>
  </div>
</template>

<style lang="less" scoped></style>
