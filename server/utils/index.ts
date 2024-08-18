import { hash } from 'bcrypt'
const saltRounds = 10; // 10 是推荐的成本因子

export async function hashPassword(password: string) {
    try {
        const reault = await hash(password, saltRounds);
        return reault; // 这个哈希是你存储到数据库的值
    } catch (error) {
        console.error('Error hashing password', error);
    }
}

/**
 * 响应帮助函数
 */
export function hellper() {
  return {
    success: function(data: any = null) {
      return {
        statusCode: 200,
        statusMessage: 'OK',
        success: true,
        body: { ...data },
      }
    },
    error: function(code: number, message: string) {
      return {
        statusCode: code,
        statusMessage: message,
        success: false,
      }
    }
  }
}