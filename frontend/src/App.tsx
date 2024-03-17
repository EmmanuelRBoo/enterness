import { ChangeEvent, useEffect, useState } from 'react'
import { MagnifyingGlass, Plus } from '@phosphor-icons/react'
import { Card, Text, Chat } from './components'
import { IGetChatList } from './interfaces/api'

const mock = [
	{
		id: '1',
		title: 'Emmanuel',
		alert: false
	},
	{
		id: '2',
		title: 'Emmanuel 2',
		alert: false
	},
	{
		id: '3',
		title: 'Emmanuel 3',
		alert: false
	},
]

export default function App() {
	const [filter, setFilter] = useState<string>('')
	const [selected, setSelected] = useState<IGetChatList | null>(null)
	const [data, setData] = useState<Array<IGetChatList>>([])

	const filterData = data.filter(({ title }) => title.toLowerCase().includes(filter.toLowerCase()))

	const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => setFilter(target.value)

	const handleGetChats = () => {
		setData(mock)
	}

	useEffect(() => {
		handleGetChats()
	}, [])

	return (
		<main className='w-screen h-screen p-4 flex items-center justify-center'>
			<section className='flex border w-10/12 h-full border-zinc-300 rounded-xl min-h-[90%] max-h-[90%]'>
				<div className='border-r-2 text-center border-zinc-300 w-1/6 flex flex-col'>
					<Text bold type='title'>OmniChat</Text>

					<div className='p-4 relative'>
						<input
							type="text"
							onChange={handleChange}
							placeholder='Pesquise o contato'
							className='w-full pl-2 h-8'
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

							<button className='flex items-center gap-1 p-1 px-2 bg-zinc-300 rounded-full'>
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
											<button >
												<Text underline>Criar novo chat</Text>
											</button>
										</div>
									)
									: (

										<ul className=' max-h-full'>
											{
												filterData.map(({ alert, id, title }) => (
													<li>
														<Card
															key={id}
															alert={alert}
															id={id}
															title={title}
															selected={selected?.id == id}
															onClick={(data) => {
																setSelected(data)
																console.log(data)
															}}
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

				<div className=' w-5/6'>
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
		</main>
	)
}