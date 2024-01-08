'use client'
import msicalABI from '@/assets/Msical.json'
import { useAccount, useContractRead } from 'wagmi'

export const useIsOrganizer = () => {
	const { address, isConnecting, isConnected, isDisconnected } = useAccount()

	const { data: isOrganizer, isFetching } = useContractRead({
		address: `0x${process.env.NEXT_PUBLIC_MSICAL_CONTRACT}`,
		abi: msicalABI.abi,
		functionName: 'isOrganizer',
		args: [address],
		chainId: 80001,
	})

	return { isFetching, isOrganizer, isConnecting, isConnected, isDisconnected }
}
