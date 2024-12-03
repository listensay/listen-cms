import joi from 'joi'
import prisma from '~/lib/prisma'

// 更新文章
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    // 数据校验
    const state = useValidate(body ,{
      id: joi.number().required(),
      title: joi.string().required(),
      content: joi.string().required(),
      cover: joi.string().required(),
      published: joi.boolean().required(),
      description: joi.string().required(),
      category: joi.number().required(),
      markdownContent: joi.string().required()
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
    const article = await prisma.article.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
        cover: body.cover,
        published: body.published,
        description: body.description,
        markdownContent: body.markdownContent,
        category: {
          connect: {
            id: body.category
          }
        }
      }
    })

    return hellper().success('OK', article)
  } catch (error) {
    console.log(error)
    return hellper().error()
  }
})