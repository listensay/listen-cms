import joi from 'joi'
import prisma from '~/lib/prisma'
// 获取文章列表
export default defineEventHandler(async (event) => {
  try {
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

    // 权限判断
    const user = useAuth(event)
    if(!user) {
      setResponseStatus(event, 401)
      return hellper().error(401, '未登录', false)
    }

    // 逻辑代码
    const article = await prisma.article.findMany({
      skip: Number(body.page),
      take: Number(body.total),
      orderBy: {
        createdAt: 'desc'
      },
      where: {
        authorId: user.id
      },
      include: {
        category: {
          select: {
            name: true,
            description: true,
            cover: true,
          }
        },
        author: {
          select: {
            nickename: true,
            avatar: true,
          }
        },
      }
    })

    return hellper().success('OK', { list: article })
  } catch (error) {
    console.log(error)
    return hellper().error()
  }
})