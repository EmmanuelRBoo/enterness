import { ChangeEvent, useEffect, useState } from 'react'
import { MagnifyingGlass, Plus } from '@phosphor-icons/react'
import { Card, Text, Chat, Modal } from './components'
import { IGetChatList } from './interfaces/api'
import { session } from './helpers'
import { api } from './api'
import { socket } from './api/socket'

export default function App() {
	const [filter, setFilter] = useState<string>('')
	const [selected, setSelected] = useState<IGetChatList | null>(null)
	const [data, setData] = useState<Array<IGetChatList>>([])
	const [modal, setModal] = useState<boolean>(false)

	const user = session.getItem('user', '')

	const filterData = data.filter(({ title }) => title.toLowerCase().includes(filter.toLowerCase()))

	const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => setFilter(target.value)

	const handleGetChats = () => {
		api.get(`/chat/${user.phone}`)
			.then(res => {
				const list: Array<IGetChatList> = []

				if (res.data.length > 0) {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					res.data.forEach((response: any) => {
						list.push({
							id: response.id,
							title: response.ownerName == user.name ? response.userName : response.ownerName
						})
					})
				}

				setData(list)
			})
	}

	useEffect(() => {
		handleGetChats()

		socket.emit("online", { phone: user.phone })

		socket.on("add_chat", (data) => {

			setData(prev => [
				...prev,
				{
					id: data.id,
					title: data.ownerName == user.name ? data.userName : data.ownerName
				}
			])
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<main className='w-screen h-screen p-4 flex flex-col gap-4 items-center justify-center'>
			<Text type='subtitle'>Olá {user.name} seu número é: {user.phone}</Text>
			<section className='flex border h-full w-full border-zinc-300 rounded-xl min-h-[90%] max-h-[90%]'>
				<div className='border-r-2 pt-4 text-center border-zinc-300 w-1/6 flex flex-col min-w-60'>
					<Text bold type='title'>OmniChat</Text>

					<div className='p-2 relative'>
						<input
							type="text"
							onChange={handleChange}
							placeholder='Pesquise o contato'
							className='w-full pl-2 h-8 rounded-lg'
						/>

						<MagnifyingGlass
							className='absolute right-6 top-1/2 bottom-1/2 -translate-y-1/2'
							size={20}
							weight='bold'
						/>
					</div>

					<div className='flex flex-col w-full h-full rounded-bl-xl overflow-hidden'>
						<div className='flex items-end mb-1 justify-between mx-2 last:text'>
							<Text bold>Chats</Text>

							<button
								className='flex items-center gap-1 p-1 px-2 bg-zinc-300 rounded-full'
								onClick={() => setModal(true)}
							>
								<Plus weight='bold' size={16} />
								<Text type='small' bold dark>
									Add chat
								</Text>
							</button>
						</div>
						<div className='overflow-scroll rounded-bl-xl h-full'>
							{
								filterData.length == 0
									? (
										<div className='flex flex-col mt-4 justify-center items-center'>
											<Text>Nenhum resultado encontrado.</Text>
											<button onClick={() => setModal(true)}>
												<Text underline>Criar novo chat</Text>
											</button>
										</div>
									)
									: (

										<ul className='max-h-full'>
											{
												filterData.map(({ alert, id, title }) => (
													<li key={id}>
														<Card
															alert={alert}
															id={id}
															title={title}
															selected={selected?.id == id}
															onClick={setSelected}
														/>
													</li>
												))
											}
										</ul>
									)
							}
						</div>

					</div>
				</div>

				<div className='h-full min-w-96 w-full'>
					{
						selected
							? <Chat id={selected.id} username={selected.title} />
							: (
								<div className='flex h-full w-full justify-center items-center'>
									<Text bold type='subtitle'>Clique em um chat e inicie uma conversa.</Text>
								</div>
							)
					}
				</div>
			</section>

			{modal && <Modal onClose={() => setModal(false)} callback={handleGetChats} />}
		</main>
	)
}