'use client'
import { useAccount } from 'wagmi'
import { EventList } from '@/components'
import { useRouter } from 'next/navigation'

const EventManagementPage = () => {
	const { address } = useAccount()
	const router = useRouter()

	if (address == process.env.NEXT_PUBLIC_OWNER) router.replace('/admin')
	return (
		<div className="space-y-8">
			<EventList />
		</div>
	)
}

export default EventManagementPage
