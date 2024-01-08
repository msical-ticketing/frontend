'use client'

import { FC } from 'react'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import { EventCard } from './EventCard'
import { useIsOrganizer } from '../hooks'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import BlockPlaceholder from '@/components/BlockPlaceholder'
import { GetAllEventActions, useGetAllEvents } from '@/hooks/useGetAllEvents'

export const EventList: FC<{}> = () => {
	const { isFetching, events } = useGetAllEvents(GetAllEventActions.Manage)
	const { isOrganizer } = useIsOrganizer()

	const router = useRouter()
	// const {} = useAccount({
	// 	onDisconnect() {
	// 		router.replace('/')
	// 	},
	// })

	if (isFetching) {
		return <BlockPlaceholder />
	}

	if (!isOrganizer) {
		router.replace('/')
	}

	if (events.length)
		return (
			<>
				<Button>
					<Link href="/event/create">Create Event</Link>
				</Button>
				<div className="grid grid-cols-2 gap-6">
					{events.map((event: any, index: number) => (
						<EventCard event={event} key={index} />
					))}
				</div>
			</>
		)

	return (
		<div className="flex flex-col justify-center items-center gap-3">
			You have not created any event yet!
			<Button>
				<Link href="/event/create">Create Event</Link>
			</Button>
		</div>
	)
}
