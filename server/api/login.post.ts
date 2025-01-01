import joi from 'joi'
import jwt from 'jsonwebtoken'
import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    // 数据校验
    const state = await useValidate(body ,{
      username: joi.string().required(),
      password: joi.string().required()
    })
    if(!state){
      setResponseStatus(event, 400)
      return hellper().error(400, '数据校验错误', false)
    }

    // 逻辑代码
    let user: any

    try {
      // 用户登录
      user = await prisma.user.findFirst({
        where: {
          username: body.username
        }
      })
    } catch {
      setResponseStatus(event, 400)
      return hellper().error(400, '该用户名不存在', false)
    }
  
    const equalPassword = await checkPassword(body.password, user.password)
    if(!equalPassword) {
      setResponseStatus(event, 400)
      return hellper().error(400, '密码错误', false)
    }

    const token = jwt.sign(
      {
        data: {
          id: user.id,
          username: user.username
        }
      },
      useRuntimeConfig().SECRET_KEY
    )

    return hellper().success('登录成功', { token })
  } catch (error) {
    console.log(error)
    return hellper().error()
  }
})