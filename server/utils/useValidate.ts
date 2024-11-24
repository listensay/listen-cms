// joi 校验封装
import joi from 'joi'

/**
 * 数据校验
 * @param body 验证对象
 * @param options joi验证参数
 * @returns boolean值
 */
const useValidate = async (body: any, options: any) => {
  const schema = joi.object({ ...options })

  try {
    await schema.validateAsync(body)
    return true
  } catch(error) {
    console.log('erroe', error)
    return false
  }
}

export default useValidate