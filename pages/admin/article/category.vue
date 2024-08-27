<script setup>
const category = ref([])
const total = ref(10)
const page = ref(1)
const visible = ref(false)
const title = ref('')

const form = reactive({
  id: null,
  name: '',
  description: '',
  cover: ''
})

// 重置表单
const resetForm = () => {
  form.id = null
  form.name = ''
  form.description = ''
  form.cover = ''
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
      <Column field="description" header="分类描述"></Column>
      <Column header="操作">
        <template #body="slotProps">
          <Button label="删除" severity="danger" class="mr-4" @click="deleteCategory(slotProps.data.id)" />
          <Button label="修改" severity="info" @click="updateCategory(slotProps.data)" />
        </template>
      </Column>
    </DataTable> 

    <Dialog v-model:visible="visible" modal :header="title" :style="{ width: '25rem' }">
      <div class="flex items-center gap-4 mb-4">
          <label for="name" class="font-semibold w-16">名称</label>
          <InputText id="name" v-model="form.name" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-8">
          <label for="description" class="font-semibold w-16">描述</label>
          <InputText id="description" v-model="form.description" class="flex-auto" autocomplete="off" />
      </div>

      <div class="flex items-center gap-4 mb-8">
        <div class="font-semibold w-16">分类封面</div>
        {{ form.cover }}
        <AppUpload v-model="form.cover" />
      </div>

      <div class="flex justify-end gap-2">
          <Button type="button" label="取消" severity="secondary" @click="cancel"></Button>
          <Button type="button" label="完成" @click="submit"></Button>
      </div>
    </Dialog>
  </div>
</template>

<style lang="less" scoped></style>
