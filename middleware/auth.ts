export default defineNuxtRouteMiddleware((to, _from) => {
  // 未登录
  const token = useCookie('token')
  if (!token.value) {
    if (process.client) {
      message.error('请先登录')
    }
    return navigateTo('/login?from=' + to.fullPath)
  }
})