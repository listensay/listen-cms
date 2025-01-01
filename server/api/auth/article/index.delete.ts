import joi from 'joi'
import prisma from '~/lib/prisma'

// 删除文章
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    // 数据校验
    const state = await useValidate(body ,{
      id: joi.number().required(),
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

    const article = await prisma.article.update({
      where: {
        id: body.id,
      },
      data: {
        isDeleted: true,
      },
    })

    return hellper().success('OK', article)
  } catch (error) {
    console.log(error)
    return hellper().error()
  }
})