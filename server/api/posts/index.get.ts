import joi from 'joi'
import prisma from '~/lib/prisma'

export default defineEventHandler(async event => {
  const body = getQuery(event)

  // 数据校验
  const state = await useValidate(body ,{
    page: joi.string().required(),
    total: joi.string().required()
  })
  if(!state){
    setResponseStatus(event, 400)
    return hellper().error(400, '数据校验错误', false)
  }

  try {
    // 业务代码
    const skipValue = (Number(body.page) - 1) * Number(body.total)
    const posts = await prisma.article.findMany({
      skip: skipValue,
      take: Number(body.total),
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
        author: {
          select: {
            avatar: true,
            nickname: true
          },
        },
      },
      where: {
        isDeleted: false
      }
    })

    const total = await prisma.article.count()

    return hellper().success('OK', {
      posts,
      total,
    })
  } catch (error: any) {
    console.log(error)
    setResponseStatus(event, 500)
    return hellper().error(500)
  }
})