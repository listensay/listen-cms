<script setup>
import useMainStore from '~/stores/main'
import { rules } from '@/utils/antd_form_rules'

useHead({
  title: '个人中心'
})

const mainStore = useMainStore()
const { userinfo } = storeToRefs(mainStore)
const { fetchChangeUserInfo } = mainStore

const name = computed(() => userinfo.value.nickname || '')
const emailText = computed(() => userinfo.value.email || '')
const descText = computed(() => userinfo.value.desc || '')

const open = ref(false)
const formRef = ref(null)
const formState = reactive({
  email: userinfo.value.email,
  desc: userinfo.value.desc,
  avatar: userinfo.value.avatar,
  nickname: userinfo.value.nickname,
  password: ''
})

const onSubmit = () => {
  formRef.value
    .validate()
    .then(
      async (values) => {
        await fetchChangeUserInfo(values)
      }
    )
    .catch(error => {
      console.log('error', error)
    })
}

watch(() => formState.avatar, () => {
  open.value = false
})
</script>

<template>
  <div class="profile">
    <div class="h-full flex">
      <div class="pb-8 w-96 mr-6 border-r border-gray-100">
          <div class="flex flex-col items-center pt-4">
              <template v-if="formState.avatar">
                <img :src="formState.avatar" class="w-28 border-4 border-white rounded-full" :alt="name" />
              </template>
              <template v-else>
                <a-avatar size="large" :style="{ backgroundColor: '#f56a00', verticalAlign: 'middle' }">
                  {{ userinfo.username || 'Admin' }}
                </a-avatar>
              </template>
              <div class="flex items-center space-x-2 mt-2 mb-2">
                  <p class="text-2xl">{{ name }}</p>
              </div>
              <p class="text-gray-700 mb-2">{{ emailText }}</p>
              <p class="text-sm text-gray-500 mb-2">{{ descText }}</p>
          </div>
          <div class="p-4">
            <div class="mb-4">资料设置</div>
            <div>
              <a-form
                  ref="formRef"
                  :model="formState"
                  :rules="rules"
                >
                <a-form-item label="昵称" name="nickname">
                  <a-input v-model:value="formState.nickname"></a-input>
                </a-form-item>

                <a-form-item label="邮箱" name="email">
                  <a-input v-model:value="formState.email"></a-input>
                </a-form-item>
                <a-form-item label="描述" name="desc">
                  <a-input v-model:value="formState.desc"></a-input>
                </a-form-item>
                <a-form-item label="头像" name="avatar">
                  <a-input
                    v-model:value="formState.avatar" 
                    style="
                      width: 0px;
                      padding: 0px;
                      height: 0;
                      border: none;"
                  />
                  <a-button type="primary" @click="open = true">选择图片</a-button>
                </a-form-item>

                <a-button type="primary" @click="onSubmit">保存</a-button>
              </a-form>
            </div>
          </div>
      </div>

      <div class="bg-white rounded-lg shadow-xl flex-1">
      </div>

    </div>
    <a-modal v-model:open="open" title="选择图片" width="80vw">
        <Images v-model="formState.avatar" :choose="true" />
    </a-modal>
  </div>
</template>

<style lang="less" scoped></style>
