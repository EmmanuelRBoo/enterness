import { db } from '../db'
import { ICreateMessage } from '../interfaces/message'

export const getMessages = async (chatId: string) => {
    return await db.messages.findMany({ 
        where: { chatId }, 
        orderBy: { created: 'asc' }
    })
}

export const postMessage = async (data: ICreateMessage) => {
    return await db.messages.create({ data })
}