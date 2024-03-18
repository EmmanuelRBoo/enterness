import { config } from 'dotenv'

config()

export const PORT: number = Number(process.env.PORT)