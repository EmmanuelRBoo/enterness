export interface IChat {
    id: string
    username: string
}

export interface IMessages {
    id: string
    content: string
    image?: string
    userId: string
    created: string
    username: string
}