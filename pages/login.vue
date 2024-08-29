<script setup>
const token = useCookie('token')
const submit = async () => {
  // 判断内容
  if(userData.username === '' || userData.password === '') 
    return show()
  
  // 登陆逻辑
  try {
    const result = await useRequestPost('/api/login', userData)
    if(result.statusCode === 200) {
      toast.add({severity: 'success', summary: '登陆成功', detail: '欢迎回来', life: 3000})
    }
    token.value = result.body.token
    useUser().value.isLogin = true
    navigateTo('/admin')
  } catch {}
}

const userData = reactive({
  username: '',
  password: ''
})

const toast = useToast()

const show = () => {
  toast.add({severity: 'error', summary: '内容不完整', detail: '请填写完整内容', life: 3000})
}

definePageMeta({
  middleware: 'only-visitor'
})
</script>

<template>
  <div class="login">
    <div class="flex h-[100vh]">
      <div class="flex-1 flex justify-center items-center">
        <form @submit.prevent="submit">
          <div class="mb-4">
            <label for="username" class="mr-4">Username</label>
            <InputText id="username" v-model="userData.username" aria-describedby="username-help" />
          </div>
          <div class="mb-4">
            <label for="password" class="mr-4">Password</label>
            <InputText id="password" v-model="userData.password" aria-describedby="username-help" />
          </div>
          <Toast />
          <Button label="Submit" @click="submit">Login</Button>
        </form>
      </div>
      <div class="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
