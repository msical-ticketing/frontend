import { useState } from 'react'
import msicalABI from '@/assets/Msical.json'
import { SellingTicket, Event } from '../interfaces'
import { useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi'

export const useGetEventDetails = (id: string) => {
	const [event, setEvent] = useState<Event>()
	const [tickets, setTickets] = useState<SellingTicket[]>([])

	const { isLoading, isFetching } = useContractRead({
		address: `0x${process.env.NEXT_PUBLIC_MSICAL_CONTRACT}`,
		abi: msicalABI.abi,
		functionName: 'getEventDetails',
		args: [id],
		onSuccess: async data => {
			const [event, tickets] = JSON.parse(
				JSON.stringify(data, (_, v) => (typeof v === 'bigint' ? v.toString() : v))
			)

			const eventMetadata = await fetch(event.uri).then(data => data.json())

			setEvent({ ...event, ...eventMetadata })

			const allTickets = await Promise.all(
				tickets.map(async (res: any) => {
					const metadata = await fetch(res.uri).then(data => data.json())
					console.log('res', res)
					return { ...res, ...metadata }
				})
			)

			setTickets(allTickets)
		},
	})

	return { event, tickets, isLoading, isFetching }
}
