const useMainStore = defineStore('main', () => {
  const token = useCookie('token')
  const router = useRouter()
  const haslogin = ref(false)
  const userinfo = ref(null)

  if (token.value) {
    haslogin.value = true
  }

  function setHaslogin(val: boolean) {
    haslogin.value = val
  }

  async function fetchGetUserInfo() {
    try {
      const result = await useFetchUserProfile().auth.getUserInfo()
      userinfo.value = result
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchChangeUserInfo(data: userinfo) {
    try {
      const result = await useFetchUserProfile().auth.updateUserInfo(data)
      if(result.statusCode === 200) {
        haslogin.value = false
        token.value = null
        message.success('修改成功, 请重新登陆 : ) ')
        router.push('/login?from=/admin/profile')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { haslogin, userinfo, setHaslogin, fetchGetUserInfo, fetchChangeUserInfo }
})

export default useMainStore