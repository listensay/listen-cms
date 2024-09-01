import joi from 'joi'
import prisma from '~/lib/prisma'

// 获取文章详情
export default defineEventHandler(async (event) => {
  try {
    const body = <any> getQuery(event)

    // 数据校验
    const state = await useValidate(body ,{
      id: joi.number().required()
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
    const article = await prisma.article.findUnique({
      where: {
        id: Number(body.id)
      }
    })

    return hellper().success('OK', article)
  } catch (error) {
    console.log(error)
    return hellper().error()
  }
})