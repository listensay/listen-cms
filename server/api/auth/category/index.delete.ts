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

    // 查询分类ID是否存在
    category = await prisma.category.findUnique({
      where: {
        id: Number(body.id)
      }
    })
    if (!category) {
      setResponseStatus(event, 400)
      return hellper().error(400, '分类不存在', false)
    }

    try {
      category = await prisma.category.update({
        where: {
          id: Number(body.id)
        },
        data: {
          isDeleted: true
        }
      })
    } catch (err) {
      console.log(err)
      setResponseStatus(event, 400)
      return hellper().error(400, '该分类正在使用无法删除', false)
    }

    return hellper().success('删除分类成功', category)
  } catch (error) {
    console.log(error)
    return hellper().error(500)
  }
})
