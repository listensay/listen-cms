import joi from 'joi'
// 获取用户信息
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    // 数据校验
    const state = await useValidate(body ,{
      username: joi.string().required(),
      password: joi.string().required()
    })
    if(!state){
      setResponseStatus(event, 400)
      return hellper().error(400, '数据校验错误', false)
    }

    // 权限判断
    const user = useAuth(event)
    if(!user) {
      setResponseStatus(event, 401)
      return hellper().error(401, '未登录', false)
    }

    // 逻辑代码

    return hellper().success('OK')
  } catch (error) {
    console.log(error)
    return hellper().error()
  }
})