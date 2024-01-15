'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import BlockPlaceholder from '../../components/BlockPlaceholder'
import { useGetAllOrganizers } from '../../hooks/useGetAllOrganizers'
import { useAccount, usePublicClient, useWebSocketPublicClient } from 'wagmi'

const AdminPage = () => {
	const { address } = useAccount()
	const router = useRouter()

	useEffect(() => {
		if (address != process.env.NEXT_PUBLIC_OWNER) router.replace('/')
	}, [address, router])

	const { isFetching, allOrganizers } = useGetAllOrganizers()

	if (isFetching) {
		return <BlockPlaceholder />
	}

	const organizers: any = allOrganizers

	console.log('organizers', organizers)

	if (organizers.length)
		return (
			<div className="grid gap-6">
				{organizers.map((organizer: any, index: number) => (
					<Card key={index}>
						<div className="flex justify-between items-center px-4 py-2">
							{organizer} <Button>Approve</Button>
						</div>
					</Card>
				))}
			</div>
		)
}

export default AdminPage
