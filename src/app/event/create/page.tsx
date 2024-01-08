'use client'
import { useState } from 'react'
import { parseEther } from 'viem'
import { uploadIPFS } from '@/lib/ipfs'
import Button from '@/components/ui/Button'
import Form, { useForm } from '@/components/ui/Form'
import SuccessModal from '@/components/modals/Success'
import { useCreateEvent } from '@/hooks/useCreateEvent'
import CreateEventForm from '@/components/CreateEventForm'
import CreateTicketForm from '@/components/CreateTicketForm'
import ProcessingModal from '@/components/modals/Processing'
import { CreateTicketParams } from '@/interfaces/CreateTicketParams'
import Card, { CardContent, CardFooter, CardHeader } from '@/components/ui/Card'

const CreateEventPage = () => {
	const [tickets, setTickets] = useState<CreateTicketParams[]>([])
	const [banner, setBanner] = useState<string>('')
	const [ticketImages, setTicketImages] = useState<string[]>([])
	const [isUploading, setUploading] = useState<boolean>(false)

	const form = useForm<{}>({})

	const { write, data, isLoading, isSuccess } = useCreateEvent()

	console.log('isLoading', isLoading)
	console.log('isSuccess', isSuccess)

	const toTimestamp = (strDate: string) => Date.parse(strDate) / 1000

	const onSubmit = async (data: any) => {
		console.log('data', data)
		console.log('banner', banner)
		// Process Event data
		const eventMetadata = JSON.stringify({
			name: data.name,
			description: data.description,
			venue: data.venue,
			image: banner,
		})

		const eventURI = await uploadIPFS(eventMetadata)

		const _createEventParams = [data.capacity, toTimestamp(data.datetime), eventURI]

		const ticketFields = Object.keys(data).filter(val => val.startsWith('ticket'))
		console.log('ticketFields', ticketFields)

		const _createTicketParams = []
		for (let i = 0; i < ticketFields.length; i += 4) {
			const ticketData = ticketFields.slice(i, i + 4).map(field => data[field])
			console.log('ticketData', ticketData)

			const metadata = {
				name: ticketData[0],
				description: ticketData[1],
				image: ticketImages[Math.floor(i / 5)],
			}

			const uri = await uploadIPFS(JSON.stringify(metadata))

			const price = parseEther(ticketData[2])
			const totalSupply = ticketData[3]

			const _params = [totalSupply, price, uri]

			_createTicketParams.push(_params)
		}

		console.log('_createEventParams', _createEventParams)
		console.log('_createTicketParams', _createTicketParams)

		write({
			args: [_createEventParams, _createTicketParams],
		})
	}

	const addTicket = () => {
		const newTicket = { totalSupply: '', price: '', uri: '' }

		setTickets([...tickets, newTicket])
	}

	const updateTicketImage = (index: number, image: string) => {
		ticketImages[index] = image

		setTicketImages(ticketImages)
	}

	return (
		<>
			<Form {...form} onSubmit={onSubmit}>
				<Card>
					<CardContent className="grid gap-4">
						<CreateEventForm setBanner={setBanner} setLoading={setUploading} />
						{tickets.length ? (
							<Card>
								<CardHeader className="font-bold">Tickets</CardHeader>
								<CardContent className="grid gap-4">
									{tickets.map((ticket: CreateTicketParams, index: number) => (
										<CreateTicketForm
											key={index}
											setLoading={setUploading}
											index={index}
											updateTicketImage={updateTicketImage}
										/>
									))}
								</CardContent>
							</Card>
						) : (
							<></>
						)}
					</CardContent>
					<CardFooter className="justify-end space-x-2">
						<Button variant="outline" type="button" onClick={addTicket}>
							Add New Ticket
						</Button>
						<Button disabled={isUploading}>Submit</Button>
					</CardFooter>
				</Card>
			</Form>

			{isLoading && <ProcessingModal open={isLoading} />}
			{isSuccess && <SuccessModal open={true} txHash={data?.hash} path="/event/manage" />}
		</>
	)
}

export default CreateEventPage
