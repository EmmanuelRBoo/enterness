import { useState } from 'react'
import { Check, X } from '@phosphor-icons/react'
import { IModal } from '../interfaces/modal'
import { api } from '../api'
import { session, handleNotification } from '../helpers'
import { Text } from '.'
import { socket } from '../api/socket'

export default function Modal({ onClose, callback }: IModal) {
    const [phone, setPhone] = useState<string>('')

    const createChat = () => {
        const myPhone = session.getItem('user', '').phone

        api.post('/chat', { data: { ownerPhone: myPhone, userPhone: phone } })
            .then((res) => {
                handleNotification({
                    message: res.data,
                    type: 'success'
                })

                socket.emit("add_chat", { myPhone, phone })

                callback()
                onClose()
            })
            .catch((res) => {
                handleNotification({
                    message: res.response.data,
                    type: 'error'
                })
            })
    }

    return (
        <div className='fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-zinc-900 bg-opacity-60'>
            <div className='w-80 bg-zinc-300 p-4 rounded-lg'>
                <div className='flex justify-between items-center'>
                    <Text type='subtitle' bold dark>Adicionar número</Text>

                    <X
                        weight='bold'
                        size={28}
                        className='p-0.5 cursor-pointer hover:bg-zinc-900 hover:bg-opacity-20 rounded-lg'
                        onClick={onClose}
                    />
                </div>

                <div className='mt-8 flex items-center justify-evenly'>
                    <input
                        type='text'
                        placeholder='xxxx-xxxx'
                        className='pl-2 mr-2 h-6 rounded-md outline-none'
                        onChange={({ target }) => setPhone(target.value)}
                    />

                    <div
                        className='border border-green-700 px-3 h-6 rounded-md cursor-pointer hover:bg-green-700 [&>svg]:hover:text-zinc-300'
                        onClick={createChat}
                    >
                        <Check
                            className='text-green-700'
                            size={20}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}