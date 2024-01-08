'use client'
import Moralis from 'moralis'
import { useAccount } from 'wagmi'
import { revalidatePath } from 'next/cache'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import TicketCard from '@/components/TicketCard'
import BlockPlaceholder from '@/components/BlockPlaceholder'

interface PurchasedTicket {
	amount: string
	tokenId: string
	metadata: string
}

export const PurchasedTickets: FC<{}> = ({}) => {
	const router = useRouter()
	const [tickets, setTickets] = useState<PurchasedTicket[]>([])
	const { address, isDisconnected } = useAccount({
		onDisconnect() {
			router.replace('/')
		},
		onConnect() {
			router.refresh()
		},
	})

	if (isDisconnected) router.replace('/')

	useEffect(() => {
		const getNFTs = async () => {
			if (!Moralis.Core.isStarted) Moralis.start({ apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY })

			try {
				const response = await Moralis.EvmApi.nft.getWalletNFTs({
					chain: '0x13881',
					format: 'decimal',
					mediaItems: false,
					address: address?.toString() || '',
				})

				console.log(response.raw)
				const ownedTickets = response.raw.result.filter(
					res => res.token_address === `0x${process.env.NEXT_PUBLIC_MSICAL_COLLECTION}`.toLowerCase()
				)
				const purchasedTickets = ownedTickets.map((ticket: any) => {
					return {
						tokenId: ticket.token_id,
						amount: ticket.amount,
						metadata: JSON.parse(ticket.metadata),
					}
				})

				console.log(purchasedTickets)

				setTickets(purchasedTickets)
			} catch (error) {
				console.error(error)
			}
		}

		getNFTs()
	}, [address])

	if (tickets.length) {
		return (
			<div className="grid grid-cols-3">
				{tickets.map((ticket: any, index: number) => {
					return <TicketCard ticket={ticket} key={index} />
				})}
			</div>
		)
	}

	return <BlockPlaceholder />
}
