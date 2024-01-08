'use client'

import { FC } from 'react'
import Image from 'next/image'
import { useContractWrite } from 'wagmi'
import { useGetEventDetails } from '@/hooks'
import msicalABI from '@/assets/Msical.json'
import BlockPlaceholder from '@/components/BlockPlaceholder'
import SellingTicketCard from '@/components/SellingTicketCard'
import Card, { CardContent, CardHeader } from '@/components/ui/Card'

const EventPage: FC<{ params: { id: string } }> = ({ params }) => {
	const { event, tickets, isFetching } = useGetEventDetails(params.id)

	if (isFetching) {
		return <BlockPlaceholder />
	}

	return (
		<Card>
			<CardHeader className="grid gap-3">
				<Image
					src={event?.image!}
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
				<div>
					<h2>{event?.name}</h2>
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
