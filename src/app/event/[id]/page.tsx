'use client'

import { FC } from 'react'
import Image from 'next/image'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { useGetEventDetails } from '@/hooks'
import BlockPlaceholder from '@/components/BlockPlaceholder'
import SellingTicketCard from '@/components/SellingTicketCard'
import Card, { CardContent, CardHeader } from '@/components/ui/Card'

const EventPage: FC<{ params: { id: string } }> = ({ params }) => {
	const { event, tickets, isFetching } = useGetEventDetails(params.id)
	const { address } = useAccount()
	const router = useRouter()

	if (address == process.env.NEXT_PUBLIC_OWNER) router.replace('/admin')

	console.log('event', event)
	console.log('tickets', tickets)

	if (isFetching) {
		return <BlockPlaceholder />
	}

	// const eventData = event

	return (
		<Card>
			<CardHeader className="grid gap-3">
				{event?.image ? (
					<Image
						src={event?.image}
						width={500}
						height={250}
						style={{
							width: '100vw',
							aspectRatio: '3',
							objectFit: 'cover',
							objectPosition: 'center',
							borderRadius: '15px',
						}}
						alt=""
					/>
				) : (
					<BlockPlaceholder />
				)}

				<div>
					<h2 className="font-bold text-lg">{event?.name}</h2>
					<p>{event?.description}</p>
				</div>
			</CardHeader>
			<hr />
			<CardContent className="py-5 grid grid-cols-3 gap-6">
				{tickets.map(ticket => (
					<SellingTicketCard ticket={ticket} key={ticket.id} eventId={params.id} />
				))}
			</CardContent>
		</Card>
	)
}

export default EventPage
