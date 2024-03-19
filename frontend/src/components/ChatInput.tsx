import { ChangeEvent, useEffect, useState, useRef, FormEvent } from 'react'
import { Paperclip, SmileySticker, PaperPlaneRight, X } from '@phosphor-icons/react'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import { handleNotification, session } from '../helpers'
import { socket } from '../api/socket'

export default function ChatInput({ chatId }: { chatId: string }) {
    const [message, setMessage] = useState<string>('')
    const [showEmoji, setShowEmoji] = useState<boolean>(false)
    const [file, setFile] = useState<string | ArrayBuffer | null>('')

    const fileRef = useRef<HTMLInputElement>(null)
    const emojiContainerRef = useRef<HTMLDivElement>(null)

    const handleChangeEmoji = ({ emoji }: EmojiClickData) => setMessage(m => m + emoji)
    const handleChangeMessage = ({ target }: ChangeEvent<HTMLInputElement>) => setMessage(target.value)
    const handleChangeFile = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const file = target.files && target?.files[0]

        if (!file?.type.includes('image')) {
            handleNotification({
                message: 'Formato de arquivo inválido',
                type: 'error'
            })
        } else {
            const reader = new FileReader()

            reader.readAsDataURL(file)
            reader.onload = () => {
                setFile(reader.result)
            }
            reader.onerror = () => {
                handleNotification({
                    message: 'Houve um erro ao processar a imagem',
                    type: 'error'
                })
            }
        }
    }

    const handleFile = () => fileRef?.current?.click()
    const handleEmoji = () => setShowEmoji(e => !e)

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const data = {
            content: message,
            userId: session.getItem('user', '').id,
            image: file,
            chatId
        }

        console.log(data)

        socket.emit("messages", data)

        setMessage('')
    }

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (showEmoji && !emojiContainerRef.current?.contains(event.target as Node)) {
                setShowEmoji(false)
            }
        }

        document.addEventListener('click', handleOutsideClick)

        return () => {
            document.removeEventListener('click', handleOutsideClick)
        }
    }, [showEmoji])

    return (
        <form
            onSubmit={handleSubmit}
            className='flex items-center justify-evenly mb-1 w-full'
        >

            <input
                ref={fileRef}
                type="file"
                accept='image/*'
                className='hidden'
                onChange={handleChangeFile}
            />

            <Paperclip
                onClick={handleFile}
                size={28}
                weight='bold'
                className='text-zinc-300 hover:bg-zinc-500 hover:bg-opacity-65 p-1 rounded-full cursor-pointer'
            />

            <div className='relative' ref={emojiContainerRef}>
                <SmileySticker
                    onClick={handleEmoji}
                    weight='bold'
                    size={28}
                    className='text-zinc-300 hover:bg-zinc-500 hover:bg-opacity-65 p-1 rounded-full cursor-pointer'
                />

                <div

                    className='absolute bottom-10 left-2'
                >
                    <EmojiPicker
                        open={showEmoji}
                        onEmojiClick={handleChangeEmoji}
                    />
                </div>
            </div>

            <div className='flex w-4/5 relative'>
                {
                    file && (
                        <div
                            className='absolute cursor-pointer left-1 top-1/2 border-zinc-900 border rounded-lg -translate-y-1/2 hover:[&>svg]:visible'
                        >
                            <img
                                src={String(file)}
                                className='w-8 h-8 rounded-lg '
                                alt='image'
                            />

                            <X
                                size={32}
                                weight='bold'
                                className='text-transparent hover:text-red-700 absolute top-0 rounded-lg'
                                onClick={() => setFile(null)}
                            />
                        </div>
                    )
                }

                <input
                    type='text'
                    placeholder='Digite sua mensagem...'
                    className={`w-full h-10 rounded-lg ${file ? 'pl-10' : 'pl-4'}`}
                    value={message}
                    onChange={handleChangeMessage}
                />
            </div>

            <button type='submit'>
                <PaperPlaneRight
                    size={32}
                    weight='bold'
                    className='text-zinc-300 hover:bg-zinc-500 hover:bg-opacity-65 p-1 rounded-full cursor-pointer'
                />
            </button>
        </form>
    )
}