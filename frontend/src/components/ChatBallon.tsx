import { useState } from 'react'
import { ClipboardText, X } from '@phosphor-icons/react'
import moment from 'moment'
import { IChatBallon } from '../interfaces/chatBallon'
import { handleNotification } from '../helpers'
import userImage from '../assets/user.png'
import { Text } from '.'

export default function ChatBallon({ message, messageTime, username, img, id, itsMe }: IChatBallon) {
    const [preview, setPreview] = useState<string | null>(null)

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
                src={userImage}
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
                  bg-zinc-300 
                    flex
                    flex-col
                    ${itsMe ? 'items-end' : 'items-start'}
                    min-w-40 
                    max-w-96 
                    w-fit 
                    p-2 
                    mx-2 
                    relative
                    ${preview == img ? 'z-10' : 'z-0'}
                    rounded-xl 
                    ${itsMe ? 'rounded-tr-none' : 'rounded-tl-none'}
                `}
            >
                <Text bold dark type='span'>{username}</Text>

                <div className={`flex flex-col items-start w-full p-2`} id={id}>
                    {
                        preview && (
                            <X
                                className='fixed top-5 right-5 z-30 cursor-pointer p-1 text-zinc-300'
                                size={48}
                                weight='bold'
                                onClick={() => setPreview(null)}
                            />
                        )
                    }
                    {
                        img && (
                            <div
                                className={preview ? 'fixed flex items-center justify-center top-0 left-0 w-screen h-screen  bg-zinc-900 bg-opacity-60' : ''}
                                onClick={() => setPreview(img)}
                            >
                                <img
                                    src={img}
                                    className={preview ? 'h-full p-6' : 'max-w-72 w-full h-auto object-contain cursor-pointer'}
                                />
                            </div>
                        )
                    }
                    <Text dark>{message}</Text>
                </div>

                <div className='flex justify-end w-full'>
                    <Text italic underline dark type='small'>{moment(messageTime).format('DD/MM/YYYY HH:mm')}</Text>
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