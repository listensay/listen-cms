import joi from 'joi'
import prisma from '~/lib/prisma'

// 添加图片
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    // 数据校验
    const state = await useValidate(body, {
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

    // 创建图片
    const images = await prisma.images.create({
      data: {
        name: body.name,
        url: body.url,
        categoryId: body.categoryId
      }
    })

    // 判断图片是否存在
    if (!images) {
      setResponseStatus(event, 400)
      return hellper().error(400, '上传图片失败', false)
    }

    // 返回数据
    return hellper().success('图片上传成功', images)
  } catch (error) {
    console.log(error)
    return hellper().error(500)
  }
})
