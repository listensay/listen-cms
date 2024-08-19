import { compare } from 'bcrypt'

export default async function checkPassword(submittedPassword: string, storedHash: string) {
  try {
      const isMatch = await compare(submittedPassword, storedHash)
      return isMatch // 返回 true 如果密码是匹配的，否则为 false
  } catch (error) {
      console.error('Error comparing password', error)
  }
}
