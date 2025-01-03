import { message } from 'ant-design-vue'
import useMainStore from '~/stores/main'
export const useRequest = async (url: any, options?: any) => {
  try {
    const reqUrl = url // 你的接口地址

    // 可以设置默认headers例如
    const customHeaders = {
      Authorization: useCookie('token').value
    }

    let body

    const { data } = await useFetch(reqUrl, {
      ...options,
      headers: customHeaders,
      watch: false,

      onResponseError({ response }) {
        switch (response.status) {
          case 400:
            message.error(response._data.message)
            body = response._data
            return
          case 401:
            message.error(response._data.message)
            useCookie('token').value = null
            useMainStore().setHaslogin(false)
            navigateTo('/login')
            body = response._data
            return
          case 403:
            message.error('服务器拒绝访问')
            body = response._data
            return
          case 404:
            message.error('请求地址错误')
            body = response._data
            return
          case 500:
            message.error('服务器故障')
            body = response._data
            return
          default:
            message.error('网络连接故障')
            body = response._data
        }
      }
    })

    if(!data.value) return body

    const result = data.value as any

    return result
  } catch (err) {
    return Promise.reject(err)
  }
}