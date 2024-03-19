import { Request, Response } from 'express'
import { getChat, postChat, getAllChats } from '../services/chat'
import { getUserByPhone } from '../services/user'

const error = async (res: Response) => res.status(500).send('Houve um erro no servidor')

export const getChats = async (req: Request, res: Response) => {
    const { phone } = req.params

    try {
        const chats = await getAllChats(phone)

        return res.status(200).json(chats)
    } catch (e) {
        return error(res)
    }
}

export const createChat = async (req: Request, res: Response) => {
    const { ownerPhone, userPhone } = req.body.data

    try {
        const phone = await getUserByPhone(userPhone)
        const chat = await getChat({ ownerPhone, userPhone })

        if (chat) {
            return res.status(409).send('Você já participa deste chat')
        } else if (!phone) {
            return res.status(404).send('Número digitado não existe')
        }

        await postChat({ ownerPhone, userPhone })

        return res.status(201).send('Chat criado com sucesso')
    } catch (e) {
        return res.status(500).send('Houve um erro no servidor ' + e) // error(res)
    }
}