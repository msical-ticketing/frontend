'use client'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { CreateEventPage } from '@/components/pages/CreateEventPage'

const Page = () => {
	const { address } = useAccount()
	const router = useRouter()

	if (address == process.env.NEXT_PUBLIC_OWNER) router.replace('/admin')
	return (
		<>
			<CreateEventPage />
		</>
	)
}

export default Page
