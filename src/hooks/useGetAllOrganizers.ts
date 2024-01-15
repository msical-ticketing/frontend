'use client'
import { useRouter } from 'next/navigation'
import msicalABI from '@/assets/Msical.json'
import { useAccount, useContractRead } from 'wagmi'

export const useGetAllOrganizers = () => {
	const router = useRouter()
	const { address, isConnecting, isConnected, isDisconnected } = useAccount()

	const { data: allOrganizers, isFetching } = useContractRead({
		address: `0x${process.env.NEXT_PUBLIC_MSICAL_CONTRACT}`,
		abi: msicalABI.abi,
		functionName: 'getAllOrganizers',
		chainId: 80001,
	})

	return { isFetching, allOrganizers, isConnecting, isConnected, isDisconnected }
}
