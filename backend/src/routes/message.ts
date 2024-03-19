import { Router } from 'express'
import { getAllMessages } from '../controllers/message'

export const messageRouter = Router()

messageRouter.get('/:chatId', getAllMessages)