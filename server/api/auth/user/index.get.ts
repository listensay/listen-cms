// 获取用户信息
export default defineEventHandler((event) => {
  try {
    // 逻辑代码
    const user = useAuth(event)
    if(!user) {
      setResponseStatus(event, 401)
      return hellper().error(401, '未登录', false)
    }

    return hellper().success('OK', { user })
  } catch (error) {
    console.log(error)
    return hellper().error()
  }
})
