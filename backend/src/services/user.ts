import { db } from '../db'
import { IUser } from '../interfaces/user'

const createNumber = async (): Promise<string> => {
    const number = Math.floor(Math.random() * 900000) + 100000

    const hasNumber = await db.user.findUnique({ where: { phone: String(number) } })

    if (hasNumber) {
        return createNumber()
    }

    return String(number)
}

export const getUserByLogin = async ({ name, password }: IUser) => {
    return await db.user.findUnique({ 
        where: { name, password }, 
        select: { 
            id: true,
            phone: true,
            name: true,
        } 
    })
}

export const postUser = async ({ name, password }: IUser) => {
    await db.user.create({ 
        data: {
            name, 
            password,
            phone: await createNumber()
        }
    })
}

export const getUserByName = async (name: string) => {
    return await db.user.findUnique({ where: { name }})
}