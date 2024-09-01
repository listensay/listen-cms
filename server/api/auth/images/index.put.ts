import joi from 'joi'
import prisma from '~/lib/prisma'

// 修改图片
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    // 数据校验
    const state = await useValidate(body, {
      id: joi.number().min(1).required(),
      name: joi.string().min(1).required(),
      url: joi.string().min(1).required(),
      categoryId: joi.number().min(1).required()
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

    // 判断图片ID是否存在
    let images = await prisma.images.findUnique({
      where: {
        id: body.id
      }
    })
    if (!images) {
      setResponseStatus(event, 400)
      return hellper().error(400, '图片ID不存在', false)
    }

    // 修改图片
    images = await prisma.images.update({
      where: {
        id: body.id
      },
      data: {
        name: body.name,
        url: body.url,
        categoryId: body.categoryId
      }
    })

    // 返回数据
    return hellper().success('图片修改成功', images)
  } catch (error) {
    console.log(error)
    return hellper().error(500)
  }
})
