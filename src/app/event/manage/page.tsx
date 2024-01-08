'use client'
import { useAccount } from 'wagmi'
import { EventList } from '@/components'
import { useRouter } from 'next/navigation'

const EventManagementPage = () => {
	// const router = useRouter()

	// const {} = useAccount({
	// 	onDisconnect() {
	// 		router.replace('/')
	// 	},
	// })

	return (
		<div className="space-y-8">
			<EventList />
		</div>
	)
}

export default EventManagementPage
