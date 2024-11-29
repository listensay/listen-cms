export interface userinfo {
  avatar: string
  desc: string
  email: string
  nickname: string
}

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
      },
      /**
       * 修改用户信息
       * @param data 用户信息
       */
      updateUserInfo: async (data: userinfo) => {
        const result = await useRequestPut('/api/auth/user', data)
        return result
      }
    }
  }
}