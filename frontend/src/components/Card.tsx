import { ICard } from '../interfaces/card'
import { Text } from '.'

export default function Card({ selected, title, alert, onClick, id }: ICard) {
    return (
        <div
            onClick={() => onClick(id)}
            className={`
                ${selected ? 'bg-zinc-500' : 'bg-zinc-300'}
                flex
                items-center
                justify-between
                px-6
                h-16
                cursor-pointer
                hover:brightness-90
                border-t
                border-zinc-900
            `}
        >
            <Text
                bold={alert}
                dark
            >
                {title}
            </Text>

            {
                alert && (
                    <div
                        className='w-3 h-3 bg-amber-500 rounded-full'
                    />
                )
            }
        </div>
    )
}