import { IGetChatList } from './api'

export interface ICard {
    id: string
    selected?: boolean
    title: string
    alert?: boolean
    onClick: ({ id, title }: IGetChatList) => void
}