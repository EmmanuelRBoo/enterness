import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
import { createServer } from 'http'
import { userRouter, chatRouter, messageRouter } from './routes'

const app = express()

export const server = createServer(app)
export const io = new Server(server, {
    cors: {
        origin: 'http://localhost:8084'
    }
})

app.use(express.json())
app.use(cors({ origin: 'http://localhost:8084'}))

app.use('/user', userRouter)
app.use('/chat',  chatRouter)
app.use('/message', messageRouter)