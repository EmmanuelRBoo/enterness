import { IText } from '../interfaces/text'

export default function Input({ children, type, dark, bold, italic, underline }: IText) {

    const defaultClasses = `
        ${dark ? 'text-zinc-900' : 'text-zinc-300'}
        ${bold ? 'font-bold' : ''} 
        ${italic ? 'italic' : ''}
        ${underline ? 'underline' : ''}
    `

    const className = {
        "small": 'text-xs',
        "span": 'text-sm',
        "title": 'text-4xl',
        "subtitle": 'text-2xl',
        "default": 'text-base'
    }

    switch (type) {
        case 'small': return <small className={className[type] + defaultClasses + '[&>*:mx-2]'}> {children}</small>
        case 'span': return <span className={className[type] + defaultClasses}>{children}</span>
        case 'subtitle': return <h2 className={className[type] + defaultClasses}>{children}</h2>
        case 'title': return <h1 className={className[type] + defaultClasses}>{children}</h1>
        default: return <p className={className['default'] + defaultClasses}>{children}</p>
    }
}