'use client'

import { parseEther } from 'viem'
import { FC, useState } from 'react'
import Button from '@/components/ui/Button'
import Form, { useForm } from '@/components/ui/Form'
import SuccessModal from '@/components/modals/Success'
import { useCreateEvent } from '@/hooks/useCreateEvent'
import { pinFileToIPFS, pinJSONToIPFS } from '@/lib/ipfs'
import CreateEventForm from '@/components/CreateEventForm'
import CreateTicketForm from '@/components/CreateTicketForm'
import ProcessingModal from '@/components/modals/Processing'
import { CreateTicketParams } from '@/interfaces/CreateTicketParams'
import Card, { CardContent, CardFooter, CardHeader } from '@/components/ui/Card'

export const CreateEventPage: FC<{}> = ({}) => {
	const [tickets, setTickets] = useState<CreateTicketParams[]>([])
	const [banner, setBanner] = useState<any>()
	const [ticketImages, setTicketImages] = useState<any[]>([])
	const [isUploading, setUploading] = useState<boolean>(false)

	const form = useForm<{}>({})

	const { write, data, isLoading, isSuccess } = useCreateEvent()

	const toTimestamp = (strDate: string) => Date.parse(strDate) / 1000

	const onSubmit = async (data: any) => {
		// Upload all the images to IPFS
		const ipfs_banner = await pinFileToIPFS(banner)

		console.log('ipfs_banner', ipfs_banner)

		const ipfs_ticket_images = await Promise.all(ticketImages.map((image: any) => pinFileToIPFS(image)))

		// Process Event data
		const eventMetadata = JSON.stringify({
			name: data.name,
			description: data.description,
			venue: data.venue,
			image: ipfs_banner,
		})

		const eventURI = await pinJSONToIPFS(eventMetadata)

		const _createEventParams = [data.capacity, toTimestamp(data.datetime), eventURI]

		// Process Ticket
		const ticketFields = Object.keys(data).filter(val => val.startsWith('ticket'))
		const _createTicketParams = []
		for (let i = 0; i < ticketFields.length; i += 4) {
			const ticketData = ticketFields.slice(i, i + 4).map(field => data[field])
			console.log('ticketData', ticketData)
			const metadata = {
				name: ticketData[0],
				description: ticketData[1],
				image: ipfs_ticket_images[Math.floor(i / 5)],
			}
			const uri = await pinJSONToIPFS(JSON.stringify(metadata))
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
			{isSuccess && <SuccessModal open={isSuccess} txHash={data?.hash} path="/event/manage" />}
		</>
	)
}
