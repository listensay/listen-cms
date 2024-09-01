export default function useFetchUserProfile() {
  return {
    auth: {
      /**
       * 获取用户信息
       * @returns 返回用户基本信息
       */
      getUserInfo: async () => {
        const result = await useRequestGet('/api/auth/user')
        return result.body.user
      }
    }
  }
}