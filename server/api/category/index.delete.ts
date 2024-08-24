import joi from 'joi'
import prisma from '~/lib/prisma'

// 删除分类
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    // 数据校验
    const state = await useValidate(body, {
      id: joi.number().required()
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
    let category: any

    try {
      category = await prisma.category.delete({
        where: {
          id: Number(body.id)
        }
      })
    } catch {
      setResponseStatus(event, 400)
      return hellper().error(400, '分类不存在', false)
    }

    return hellper().success('删除分类成功', category)
  } catch (error) {
    console.log(error)
    return hellper().error(500)
  }
})
