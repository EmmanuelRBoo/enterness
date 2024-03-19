import { Request, Response } from 'express'
import { getMessages} from '../services/message'

export const getAllMessages = async (req: Request, res: Response) => {
    const { chatId } = req.params

    try {
        const messages = await getMessages(chatId)

        return res.status(200).json(messages)
    } catch (error) {
        return res.status(500).send('Houve um erro no servidor')
    }
} 