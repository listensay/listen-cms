<script setup>
import { rules } from '@/utils/antd_form_rules'

useHead({
  title: '分类管理'
})

const category = ref([])
const total = ref(10)
const page = ref(1)
const visible = ref(false)
const visibleImg = ref(false)
const title = ref('')
const formRef = ref()
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

// 获取分类列表
const getCategory = async () => {
  const result = await useRequestGet('/api/auth/category', { page, total })
  category.value = result.body.list
}

// 删除分类
const deleteCategory = async (id) => {
  const result = await useRequestDelete('/api/auth/category', { id })
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
}
// 点击完成按钮
const submit = () => {
  formRef.value
    .validate()
    .then(async () => {
      // 根据ID判断是新增还是修改
      if(form.id) {
        // 修改
        const result = await useRequestPut('/api/auth/category', form)
        if(result.success) {
          message.success('修改成功')
          await getCategory()
          visible.value = false
        }
      } else {
        // 新增
        delete form.id
        const result = await useRequestPost('/api/auth/category', form)
        if(result.success) {
          message.success('新增成功')
          await getCategory()
          visible.value = false
        }
      }
    })
    .catch(error => {
      console.log('error', error)
    })
}
// 取消按钮
const cancel = () => {
  formRef.value.resetFields()
  visible.value = false
}
watch(() => form.cover, () => {
  visibleImg.value = false
})

await getCategory()

const columns = [
  {
    title: '分类封面',
    dataIndex: 'cover',
    key: 'cover',
    width: '120px',
  },
  {
    title: '分类标题',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '分类描述',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: '分类类型',
    dataIndex: 'type',
    key: 'type',
    width: '120px',
    scopedSlots: { customRender: 'type' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
  }
]
</script>

<template>
  <div class="category ml-4">
    <a-button class="mb-4" type="primary" @click="addCategory">添加分类</a-button>
    <a-table :columns="columns" :data-source="category">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'name'">
          <span>
            Name
          </span>
        </template>
      </template>
  
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a>
            {{ record.name }}
          </a>
        </template>

        <template v-else-if="column.key === 'cover'">
          <NuxtImg :src="record.cover" width="100" />
        </template>

        <template v-else-if="column.key === 'type'">
          <a-tag :bordered="false" :color="record.type != 0 ? 'orange' : 'success'">
              {{ record.type !=0 ? '图片' : '文章' }}
          </a-tag>
        </template>

        <template v-else-if="column.key === 'action'">
          <span>
            <a-button type="primary" size="small" @click="updateCategory(record)">编辑</a-button>
            <a-button type="danger" size="small" @click="deleteCategory(record)">删除</a-button>
          </span>
        </template>
      </template>
    </a-table>

    <a-modal
      v-model:open="visible"
      :title="title"
      :ok-text="'完成'"
      :cancel-text="'取消'"
      @ok="submit"
      @cancel="cancel"
    >
      <a-form
        ref="formRef"
        :model="form"
        :rules="rules"
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
          <template v-if="form.cover === ''">
            <a-button @click="visibleImg = true">上传缩略图</a-button>
          </template>
          <template v-else>
            <NuxtImg class="rounded-md" :src="form.cover" width="100" height="100" @click="visibleImg = true" />
          </template>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      v-model:open="visibleImg"
      title="缩略图选择"
      width="80vw"
    >
      <Images v-model="form.cover" :choose="true" />
    </a-modal>
  </div>
</template>

<style lang="less" scoped></style>
