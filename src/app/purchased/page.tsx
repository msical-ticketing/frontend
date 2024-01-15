'use client'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { PurchasedTickets } from '@/components'

const PurchasedTicketPage = async () => {
	const { address } = useAccount()
	const router = useRouter()

	if (address == process.env.NEXT_PUBLIC_OWNER) router.replace('/admin')
	return <PurchasedTickets />
}

export default PurchasedTicketPage
