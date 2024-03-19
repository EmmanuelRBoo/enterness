import { db } from '../db'
import { IChat } from '../interfaces/chat'
import { getUserByPhone } from './user'

export const postChat = async (data: IChat) => {
    const owner = await getUserByPhone(data.ownerPhone)
    const user = await getUserByPhone(data.userPhone)

    await db.chat.create({ 
        data: {
            ...data,
            ownerName: String(owner?.name),
            userName: String(user?.name)
        } 
    })
}

export const getChat = async ({ ownerPhone, userPhone }: IChat) => {
    return await db.chat.findFirst({ where: { ownerPhone, userPhone } })
}

export const getAllChats = async (phone: string) => {
    return await db.chat.findMany({ 
        where: { 
            OR: [ 
                {
                    ownerPhone: phone
                },
                {
                    userPhone: phone
                }
            ] 
        }
    })
}