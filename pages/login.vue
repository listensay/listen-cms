<script setup>
import { rules } from '@/utils/antd_form_rules'

const token = useCookie('token')
const router = useRouter()
const route = useRoute()

const formRef = ref()

const userData = reactive({
  username: '',
  password: ''
})

const submit = () => {
  formRef.value
    .validate()
    .then(
      async() => {
        const result = await useRequestPost('/api/login', userData)
        if(result.statusCode === 200) {
          message.success('登陆成功')
          token.value = result.body.token
          const path = route.query.from || '/admin/dashboard'
          router.push(path)
        }
      })
    .catch(error => {
      console.log('error', error)
    })
}

definePageMeta({
  middleware: 'only-visitor',
  layout: 'admin'
})

useHead({
  title: '登录'
})
</script>

<template>
  <div class="login bg-white">
    <div class="flex h-[100vh]">
      <div class="flex-1 flex justify-center items-center">
        <a-form 
          ref="formRef"
          :model="userData"
          autocomplete="off"
          :rules="rules"
        >
          <div class="mb-4">
            <a-form-item
              label="Username"
              name="username"
              :rules="[{ required: true, message: 'Please input your username!' }]"
            >
              <a-input v-model:value="userData.username" />
            </a-form-item>
          </div>
          <div class="mb-4">
            <a-form-item
              label="Password"
              name="password"
              :rules="[{ required: true, message: 'Please input your password!' }]"
            >
              <a-input-password v-model:value="userData.password" type="password" />
            </a-form-item>
          </div>
          <a-button type="primary" @click="submit">登陆</a-button>
        </a-form>
      </div>
      <div class="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
