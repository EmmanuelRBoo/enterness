export interface IText {
    type?: "span" | "small" | "title" | "subtitle"
    bold?: boolean
    italic? :boolean
    underline?: boolean
    dark?: boolean
    children: string | React.ReactNode | React.ReactNode[] 
}