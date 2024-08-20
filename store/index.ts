const useAppStore = defineStore('app', {
  state: () => {
    return {
      isLogin: !!useCookie('token').value,
    }
  },
  actions: {

  }
})

export default useAppStore