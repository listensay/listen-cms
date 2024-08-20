export default defineNuxtRouteMiddleware((_to, _from) => {
  const token = useCookie('token')
  // 已登录，强制重定向到首页
  if (token.value) {
    if (process.client) {
      message.error('已经登录过了！！ [○･｀Д´･ ○]')
    }
    return '/'
  }
})