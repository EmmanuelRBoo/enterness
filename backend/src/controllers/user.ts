import { Request, Response } from 'express'
import { getUserByLogin, postUser, getUserByName } from '../services/user'

const error = async (res: Response) => res.status(500).send('Houve um erro no servidor')

export const login = async (req: Request, res: Response) => {
    const { name, password } = req.body.data

    try {
        const user = await getUserByLogin({ name, password })

        if (!user) {
            return res.status(404).send('Usuário não encontrado')
        }

        return res.status(200).json(user)
    } catch (e) {
        return error(res)
    }
}

export const register = async (req: Request, res: Response) => {
    const { name, password } = req.body.data

    try {
        const user = await getUserByName(name)

        if (user) {
            return res.status(404).send('Usuário já existe')
        }

        await postUser({ name, password })

        return res.status(201).send('Usuário cadastrado com sucesso')
    } catch (e) {
        return error(res)
    }
}