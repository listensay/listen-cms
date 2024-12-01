import joi from 'joi'
import { userinfo } from '~/composables/useFetchUserProfile'
import prisma from '~/lib/prisma'

// 修改用户信息
export default defineEventHandler(async (event) => {
  const body: userinfo = await readBody(event)

  // 数据校验
  const state = await useValidate(body, {
    avatar: joi.string().required(),
    desc: joi.string().required(),
    email: joi.string().email().required(),
    nickname: joi.string().required(),
    // password: joi.string().required(),
  })
  if (!state) {
    setResponseStatus(event, 400)
    return hellper().error(400, '数据校验错误', false)
  }

  try {
    // 逻辑代码
    const user = useAuth(event)
    if(!user) {
      setResponseStatus(event, 401)
      return hellper().error(401, '未登录', false)
    }

    // 修改用户资料
    const result = await prisma.user.update({
      where: {
        id: user.id
      },
      data: body
    })

    if(!result) {
      setResponseStatus(event, 500)
      return hellper().error(500, '修改失败', false)
    }

    return hellper().success('修改成功')
  } catch (error) {
    console.log(error)
    return hellper().error()
  }
})
