import { hash } from 'bcrypt'
const saltRounds = 10

export default async function hashPassword(password: string) {
    const reault = await hash(password, saltRounds)
    return reault
}