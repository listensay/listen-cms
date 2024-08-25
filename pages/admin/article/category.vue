<script setup>
const category = ref([])
const total = ref(10)
const page = ref(1)
const visible = ref(false)
const title = ref('')

const form = reactive({
  id: '',
  name: '',
  description: '',
  cover: []
})

const getCategory = async () => {
  const result = await useRequestGet('/api/category', { page, total })
  category.value = result.body.list
}

await getCategory()
const deleteCategory = async (id) => {
  await useRequestDelete('/api/category', { id })
  await getCategory()
}

const updateCategory = (data) => {
  visible.value = true
  title.value = '编辑分类'
  form.id = data.id
  form.name = data.name
  form.description = data.description
  form.cover = [data.cover]
}
</script>

<template>
  <div class="category">
    <DataTable :value="category" table-style="min-width: 50rem" striped-rows>
      <Column field="cover" header="文章缩略图"></Column>
      <Column field="name" header="文章标题"></Column>
      <Column field="description" header="文章描述"></Column>
      <Column header="操作">
        <template #body="slotProps">
          <Button label="删除" severity="danger" class="mr-4" @click="deleteCategory(slotProps.data.id)" />
          <Button label="编辑" severity="info" @click="updateCategory(slotProps.data)" />
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
        <AppUpload v-model="form.cover" />
      </div>

      <div class="flex justify-end gap-2">
          <Button type="button" label="取消" severity="secondary" @click="visible = false"></Button>
          <Button type="button" label="保存" @click="visible = false"></Button>
      </div>
    </Dialog>
  </div>
</template>

<style lang="less" scoped></style>
