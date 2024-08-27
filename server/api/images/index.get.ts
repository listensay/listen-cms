import joi from 'joi'
import prisma from '~/lib/prisma'

// 获取图片列表
export default defineEventHandler(async (event) => {
  try {
    const body = getQuery(event)

    // 数据校验
    const state = await useValidate(body, {
      page: joi.number().integer().min(1).required(),
      total: joi.number().integer().min(1).required()
    })
    if (!state) {
      setResponseStatus(event, 400)
      return hellper().error(400, '数据校验错误', false)
    }

    // 权限判断
    const user = useAuth(event)
    if (!user) {
      setResponseStatus(event, 401)
      return hellper().error(401, '未登录', false)
    }

    // 逻辑代码
    const skipValue = (Number(body.page) - 1) * Number(body.total)
    const images = await prisma.images.findMany({
      skip: skipValue,
      take: Number(body.total),
      orderBy: {
        createdAt: 'desc'
      }
    })
    // 获取总数
    const totalCount = await prisma.images.count()

    return hellper().success('OK', { list: [...images], totalCount })
  } catch (error) {
    console.log(error)
    return hellper().error(500)
  }
})
