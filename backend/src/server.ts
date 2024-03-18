import express from 'express'
import cors from 'cors'
import { PORT } from './constants'
import { userRouter } from './routes/user'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/user', userRouter)

app.listen(PORT)