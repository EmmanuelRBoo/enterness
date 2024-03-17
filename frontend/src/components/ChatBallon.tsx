import { ClipboardText } from '@phosphor-icons/react'
import { IChatBallon } from '../interfaces/chatBallon'
import { handleNotification } from '../helpers'
import userImage from '../assets/user.png'
import { Text } from '.'

export default function ChatBallon({ message, messageTime, userId, username, img, id }: IChatBallon) {
    const itsMe = userId == 'myIdToDo'

    const clipToBoard = async () => {
        const messageText = document.querySelector(`#${id} > p`)?.innerHTML

        await navigator.clipboard.writeText(String(messageText))

        handleNotification({
            message: 'Mensagem copiada!',
            type: 'info'
        })
    }

    return (
        <div
            className={`
                hover:bg-white 
                hover:bg-opacity-10
                [&>svg]:hover:visible
                [&>svg]:invisible
                rounded-md
                py-4 
                px-8 
                flex 
                ${itsMe ? 'flex-row-reverse' : ''}
            `}
        >
            <img
                src={img ? img : userImage}
                className={`
                    w-8 
                    h-8 
                    bg-zinc-300 
                    rounded-full
                `}
                alt='user-image'
            />

            <div
                className={`
                    ${itsMe ? 'bg-zinc-300' : 'bg-zinc-500'} 
                    min-w-40 
                    max-w-96 
                    w-fit 
                    p-2 
                    mx-2 
                    relative 
                    rounded-xl 
                    ${itsMe ? 'rounded-tr-none' : 'rounded-tl-none'}
                `}
            >
                <Text bold dark type='span'>{username}</Text>

                <div className='m-2' id={id}>
                    <Text dark>{message}</Text>
                </div>

                <div className='flex justify-end w-full'>
                    <Text italic underline dark type='small'>{messageTime}</Text>
                </div>
            </div>

            <ClipboardText
                onClick={clipToBoard}
                size={30}
                weight='bold'
                className={`
                    text-zinc-900 
                    hover:bg-opacity-80
                    rounded-md
                    p-1
                    cursor-pointer
                    ${itsMe ? 'bg-zinc-300' : 'bg-zinc-500'}
                `}
            />
        </div>
    )
}