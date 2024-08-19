import joi from 'joi'
import prisma from '~/lib/prisma'

// 用户注册
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    // 数据校验
    const state = await useValidate(body ,{
      username: joi.string().required(),
      password: joi.string().required(),
      email: joi.string().email().required()
    })
    if(!state){
      setResponseStatus(event, 400)
      return hellper().error(400, '数据校验错误', false)
    }

    // 逻辑代码

    //  判断用户名邮箱是否存在
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            username: body.username
          },
          {
            email: body.email
          }
        ]
      }
    })
    if(user) {
      setResponseStatus(event, 400)
      return hellper().error(400, '用户名或邮箱已存在', false)
    }

    // 用户名和邮箱不存在进行密码加密
    const password = await hashPassword(body.password)
    // 用户注册
    await prisma.user.create({
      data: {
        username: body.username,
        password,
        email: body.email
      }
    })

    return hellper().success('注册成功')
  } catch (error) {
    console.log(error)
    return hellper().error()
  }
})