import bcrypt from 'bcryptjs'

const { hashSync } = bcrypt

const saltRounds = 10

export default async function hashPassword(password: string) {
    const reault = await hashSync(password, saltRounds)
    return reault
}