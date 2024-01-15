import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Event } from '@/interfaces'
import Button from '@/components/ui/Button'
import Card, { CardContent, CardFooter } from '@/components/ui/Card'

export const EventCard: FC<{ event: Event }> = ({ event }) => {
	console.log('event', event)
	return (
		<Card className="shadow-ticket-2">
			<CardContent className="py-6 grid gap-3">
				<div className="flex justify-center mb-4">
					<Image
						src={event.image}
						width={500}
						height={250}
						alt=""
						style={{ objectFit: 'cover', aspectRatio: '2' }}
					/>
				</div>
				<div>
					<h1 className="text-lg font-bold">{event.name}</h1>
					<p>{event.description}</p>
				</div>

				<div className="border border-neutral-500 rounded-md p-2">
					<p>
						Availability: {Number(event.capacity) - Number(event.soldQuantity)} / {event.capacity}
					</p>
					<p>Location: {event.venue}</p>
					<p>Time: {new Date(Number(event.datetime) * 1000).toLocaleString('en-US')}</p>
				</div>
			</CardContent>
			<CardFooter className="justify-end space-x-2">
				<Button type="button">
					<Link href={`/event/${event.id}`}>View more</Link>
				</Button>
			</CardFooter>
		</Card>
	)
}
