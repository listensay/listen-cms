import joi from 'joi'
import prisma from '~/lib/prisma'

// 添加分类
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    // 数据校验
    const state = await useValidate(body, {
      name: joi.string().min(1).required(),
      description: joi.string().min(1).required(),
      cover: joi.string().min(1).required(),
      type: joi.number().valid(0, 1).required()
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
    const category = await prisma.category.create({
      data: {
        name: body.name,
        description: body.description,
        cover: body.cover,
        type: body.type
      }
    })

    if (!category) {
      setResponseStatus(event, 500)
      return hellper().error(500, '新建分类失败', false)
    }

    return hellper().success('新建分类成功')
  } catch (error) {
    console.log(error)
    return hellper().error(500)
  }
})
