/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react'
import { CircleNotch } from '@phosphor-icons/react'
import { IChat, IMessages } from '../interfaces/chat'
import { socket } from '../api/socket'
import { ChatBallon, ChatInput, Text } from '.'
import { api } from '../api'
import { handleNotification, session } from '../helpers'

export default function Chat({ id, username }: IChat) {
    const [loading, setLoading] = useState<boolean>(true)
    const [messages, setMessages] = useState<Array<IMessages>>([])

    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        socket.emit("open_chat", { id })

        api.get(`/message/${id}`)
            .then((res) => {
                const list: Array<IMessages> = []

                res.data.forEach(({ content, created, id, userId, image }: any) => {
                    list.push({
                        content,
                        created,
                        id,
                        userId,
                        image,
                        username: session.getItem('user', '').id == userId ? 'Eu' : username
                    })
                })

                setMessages(list)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
                handleNotification({
                    message: 'Houve um erro ao resgatar as mensagens',
                    type: 'error'
                })
            })

        socket.on("messages", (data) => {
            setMessages(prev => [
                ...prev,
                {
                    content: data.content,
                    created: data.created,
                    id: data.id,
                    userId: data.userId,
                    image: data.image,
                    username: session.getItem('user', '').id == data.userId ? 'Eu' : username
                }
            ])
        })
    }, [id, username])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({
            behavior: 'auto',
            block: 'end'
        })
    }, [messages])

    return (
        <div className='flex flex-col h-full max-h-full min-w-96 w-full'>
            <div className='border-b-zinc-300 border-b mb-1 w-full h-[94%]'>
                <div className='border-b-zinc-300 border-b p-2'>
                    <Text type='subtitle' bold>{username}</Text>
                </div>
                <div className='h-full overflow-hidden'>
                    {
                        loading
                            ? (
                                <div className='flex justify-center items-center w-full h-full'>
                                    <CircleNotch size={64} className='text-zinc-300 animate-spin mr-2' />
                                </div>
                            )
                            : (
                                <div id='chat-container' className='max-h-[93.7%] h-full overflow-scroll'>
                                    {
                                        messages.map(({ content, id, created, userId, image, username }) => (
                                            <ChatBallon
                                                key={id}
                                                id={id}
                                                message={content}
                                                userId={userId}
                                                img={image}
                                                messageTime={created}
                                                username={username}
                                                itsMe={userId == session.getItem('user', '').id}
                                            />
                                        ))
                                    }
                                    <div ref={scrollRef}></div>
                                </div>
                            )
                    }
                </div>
            </div>
            <div>
                <ChatInput chatId={id} />
            </div>
        </div>
    )
}