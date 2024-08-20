const useAppStore = defineStore('app', {
  state: () => {
    return {
      isLogin: !!useCookie('token').value,
      user: {
        avatar:'',
        bio:'',
        email:'',
        nickename:'',
        username:''
      }
    }
  },
  actions: {

  }
})

export default useAppStore