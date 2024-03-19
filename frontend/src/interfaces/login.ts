import { ChangeEvent, FormEvent } from 'react'

export interface ILogin {
    name: string
    password: string
}

export interface ILoginProps {
    data: ILogin
    register: boolean
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void
    handleChange: ({ target }: ChangeEvent<HTMLInputElement>) => void
    handleRegister: () => void
}