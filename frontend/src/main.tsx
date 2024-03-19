import { ChangeEvent, FormEvent, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Login, Notification } from './components'
import { ILogin } from './interfaces/login'
import { handleNotification, session } from './helpers'
import { api } from './api'

// eslint-disable-next-line react-refresh/only-export-components
function RenderRoot() {
    const [user, setUser] = useState<ILogin | null>(session.getItem('user', null))
    const [data, setData] = useState<ILogin>({ name: '', password: '' })
    const [register, setRegister] = useState<boolean>(false)

    const handleRegister = () => setRegister(r => !r)

    const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setData(prev => {
            return {
                ...prev,
                [target.name]: target.value
            }
        })
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (register) {
            api.post('/user/register', { data })
                .then(() => {
                    handleNotification({
                        message: 'Cadastro feito com sucesso, agora faça login',
                        type: 'success'
                    })

                    setRegister(false)
                })
                .catch(res => {
                    handleNotification({
                        message: res.response.data,
                        type: 'error'
                    })
                })
        } else {
            api.post('/user/login', { data })
                .then((res) => {
                    handleNotification({
                        message: 'Login feito com sucesso',
                        type: 'success'
                    })

                    setUser(res.data)
                    session.setItem('user', res.data)
                })
                .catch(res => {
                    handleNotification({
                        message: res.response.data,
                        type: 'error'
                    })
                })
        }
    }

    return (
        <>
            {
                user
                    ? <App />
                    : <Login
                        data={data}
                        handleChange={handleChange}
                        handleRegister={handleRegister}
                        handleSubmit={handleSubmit}
                        register={register}
                    />
            }
            <Notification />
        </>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<RenderRoot />)