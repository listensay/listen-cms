import joi from 'joi'
import prisma from '~/lib/prisma'
// 发布文章
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    // 数据校验
    const state = await useValidate(body ,{
      title: joi.string().required(),
      content: joi.string().required(),
      cover: joi.string().required(),
      published: joi.boolean().required(),
      description: joi.string().required(),
      categoryId: joi.string().required(),
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
    const article = await prisma.article.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: user.id,
        cover: body.cover,
        published: body.published,
        description: body.description,
        categoryId: body.categoryId
      }
    })

    return hellper().success('OK', article)
  } catch (error) {
    console.log(error)
    return hellper().error()
  }
})