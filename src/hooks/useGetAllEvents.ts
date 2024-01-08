'use client'

import { useState } from 'react'
import { Event } from '@/interfaces'
import msicalABI from '@/assets/Msical.json'
import { useAccount, useContractRead } from 'wagmi'

export enum GetAllEventActions {
	Browse,
	Manage,
}

interface GetAllEventsResponse {
	events: EventResponse
}

interface EventResponse {
	id: string
	creator: string
	capacity: string
	soldQuantity: string
	datetime: string
	uri: string
}

interface TicketResponse {
	id: string
	price: string
	totalSupply: string
	soldQuantity: string
	uri: string
}

export const useGetAllEvents = (action: GetAllEventActions) => {
	const [events, setEvents] = useState<Event[]>([])
	const { address } = useAccount()

	const { isLoading, isFetching } = useContractRead({
		address: `0x${process.env.NEXT_PUBLIC_MSICAL_CONTRACT}`,
		abi: msicalABI.abi,
		functionName: 'getAllEvents',
		chainId: 80001,
		onSuccess: async data => {
			console.log('data', data)
			// Parse the bigint valuess
			const [events]: [EventResponse[]] = JSON.parse(
				JSON.stringify(data, (_, v) => (typeof v === 'bigint' ? v.toString() : v))
			)

			console.log('events', events)

			let allEvents: Event[] = await Promise.all(
				events.map(async (event: EventResponse) => {
					// if (event.uri.startsWith('http')) {
					const metadata = await fetch(event.uri).then(data => data.json())
					return { ...event, ...metadata }
				})
			)

			allEvents = allEvents.sort((a, b) => (a.datetime > b.datetime ? -1 : 1))

			console.log('allEvents', allEvents)

			if (action === GetAllEventActions.Browse) {
				allEvents = allEvents.filter((event: Event) => event.creator !== address)
			}

			if (action === GetAllEventActions.Manage) {
				allEvents = allEvents.filter((event: Event) => event.creator === address)
			}

			setEvents(allEvents)
		},
	})

	return { isLoading, isFetching, events }
}
