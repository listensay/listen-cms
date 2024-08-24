const useAppStore = defineStore('app', {
  state: () => {
    return {
      isLogin: !!useCookie('token').value,
      user: {
        avatar:'',
        bio:'',
        email:'',
        nickename:'',
        username: ''
      }
    }
  },
  actions: {
    async fetchGetUserInfo() {
      const result = await useRequestGet('/api/user')
      this.user = result.body.user
      return this.user
    }
  }
})

export default useAppStore