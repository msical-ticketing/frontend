'use client'
import { useAccount } from 'wagmi'
import { Event } from '@/interfaces'
import { EventCard } from './EventCard'
import { useRouter } from 'next/navigation'
import { FC, PropsWithChildren } from 'react'
import BlockPlaceholder from '@/components/BlockPlaceholder'
import { GetAllEventActions, useGetAllEvents } from '@/hooks/useGetAllEvents'

export const BrowseEvent: FC<PropsWithChildren<{}>> = ({}) => {
	const { isFetching, events } = useGetAllEvents(GetAllEventActions.Browse)

	const router = useRouter()
	const {} = useAccount({
		onConnect() {
			router.refresh()
		},
	})

	if (isFetching) return <BlockPlaceholder />

	if (events.length) {
		return (
			<div className="grid grid-cols-2 gap-6">
				{events
					.filter((event: Event) => Number(event.datetime) >= Math.floor(Date.now() / 1000))
					.map((event: Event) => (
						<EventCard event={event} key={event.id} />
					))}
			</div>
		)
	}

	// return <>{"There's no upcoming event"}</>
	return <BlockPlaceholder />
}
