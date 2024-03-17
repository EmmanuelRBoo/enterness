import { useState, useEffect } from 'react'
import { CircleNotch } from '@phosphor-icons/react'
import { IChat } from '../interfaces/chat'
import { ChatInput, Text } from '.'

export default function Chat({ id, username }: IChat) {
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setLoading(false)
        //IMPLEMENTAR
        console.log(id)
    }, [])

    return (
        <div className='flex flex-col items-end h-full'>
            <div className='border-b-zinc-300 border-b mb-1 h-full w-full'>
                <div className='border-b-zinc-300 border-b p-2'>
                    <Text type='subtitle' bold>{username}</Text>
                </div>
                {
                    loading
                        ? (
                            <div className='flex justify-center items-center w-full h-full'>
                                <CircleNotch size={64} className='text-zinc-300 animate-spin mr-2' />
                            </div>
                        )
                        : (
                            <div>

                            </div>
                        )
                }
            </div>
            <ChatInput />
        </div>
    )
}