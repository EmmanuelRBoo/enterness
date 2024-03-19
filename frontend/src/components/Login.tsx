import { Text } from '.'
import { ILoginProps } from '../interfaces/login'

export default function Login({ data, register, handleSubmit, handleChange, handleRegister }: ILoginProps) {

    const isDisable = () => {
        if (data.name.length < 3 || data.password.length < 3) {
            return true
        }

        return false
    }

    return (
        <main className='w-screen h-screen flex items-center justify-evenly'>
            <form
                onSubmit={handleSubmit}
                className='border border-zinc-300 rounded-lg gap-8 p-4 min-w-96 flex flex-col items-center'
            >
                <Text type='title' bold>
                    {
                        register
                            ? 'Cadastre-se'
                            : 'Login'
                    }
                </Text>

                <label htmlFor='name' className='w-full'>
                    <Text>Nome de usuário</Text>

                    <input
                        name='name'
                        className='outline-none rounded-md pl-4 w-full h-10'
                        placeholder='Usuário'
                        value={data.name}
                        onChange={handleChange}
                    />
                </label>

                <label htmlFor='password' className='w-full'>
                    <Text>Senha</Text>

                    <input
                        name='password'
                        className='outline-none rounded-md pl-4 w-full h-10'
                        placeholder='*********'
                        type='password'
                        value={data.password}
                        onChange={handleChange}
                    />
                </label>


                <button
                    type='submit'
                    className='w-full py-2 bg-green-700 rounded-lg cursor-pointer hover:brightness-90 disabled:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed'
                    disabled={isDisable()}
                >
                    <Text>
                        {
                            register
                                ? 'Cadastre-se'
                                : 'Login'
                        }
                    </Text>
                </button>

                <button
                    type='button'
                    onClick={handleRegister}
                >
                    <Text type='span' underline>
                        {
                            register
                                ? 'Já possui conta? Login'
                                : 'Cadastar-se'
                        }
                    </Text>
                </button>
            </form>
        </main>
    )
}