import { message } from 'ant-design-vue'
import useMainStore from '~/stores/main'
export const useRequest = async (url: any, options?: any) => {
  try {
    const reqUrl = url // 你的接口地址

    // 可以设置默认headers例如
    const customHeaders = {
      Authorization: useCookie('token').value
    }

    const { data } = await useFetch(reqUrl, {
      ...options,
      headers: customHeaders,
      watch: false,
      
      onResponseError({ response }) {
        switch (response.status) {
          case 400:
            message.error(response._data.message)
            break
          case 401:
            message.error(response._data.message)
            useCookie('token').value = null
            useMainStore().setHaslogin(false)
            navigateTo('/login')
            break
          case 403:
            message.error('服务器拒绝访问')
            break
          case 404:
            message.error('请求地址错误')
            break
          case 500:
            message.error('服务器故障')
            break
          default:
            message.error('网络连接故障')
            break
        }
      }
    })

    const result = data.value as any

    return result
  } catch (err) {
    return Promise.reject(err)
  }
}