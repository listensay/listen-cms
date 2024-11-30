import joi from 'joi'
import prisma from '~/lib/prisma'

export default defineEventHandler(async event => {
  const body = getQuery(event)

  // 数据校验
  const state = await useValidate(body ,{
    id: joi.string().required(),
  })
  if(!state){
    setResponseStatus(event, 400)
    return hellper().error(400, '数据校验错误', false)
  }

  try {
    // 业务代码
    const post = await prisma.article.findUnique({
      where: {
        id: Number(body.id)
      },
    })

    if(!post) return hellper().error(400, '文章不存在', false)

    return hellper().success('OK', post)
  } catch (error: any) {
    console.log(error)
    setResponseStatus(event, 500)
    return hellper().error(500)
  }
})