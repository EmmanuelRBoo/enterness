export interface ICard {
    id: string
    selected?: boolean
    title: string
    alert?: boolean
    onClick: (id: string) => void
}