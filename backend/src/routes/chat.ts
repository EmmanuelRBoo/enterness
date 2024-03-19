import { Router } from 'express'
import { createChat, getChats } from '../controllers/chat'

export const chatRouter = Router()

chatRouter.get('/:phone', getChats)
chatRouter.post('/', createChat)