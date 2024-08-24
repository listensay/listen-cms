import jwt from 'jsonwebtoken'
import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  // 获取token值
  const token = getHeader(event, 'Authorization')

  if (token) {
    // 获取秘钥
    const secret = useRuntimeConfig().SECRET_KEY

    // 验证token
    try {
      const decoded = <any>jwt.verify(token, secret)
      const id = decoded.data.id
      // 判断用户是否存在
      const user = await prisma.user.findUnique({
        where: {
          id
        },
        select: {
          id: true,
          username: true,
          email: true,
          nickename: true,
          avatar: true,
          bio: true
        }
      })

      // 如果用户不存在拦截请求
      if (!user) {
        event.context.auth = {
          success: false
        }
      } else {
        // 验证通过
        event.context.auth = {
          success: true,
          user
        }
      }

    } catch {
      event.context.auth = {
        success: false
      }
    }
  } else {
    event.context.auth = {
      success: false
    }
  }
})
