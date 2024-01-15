'use client'
import msicalABI from '@/assets/Msical.json'
import { useAccount, useContractRead } from 'wagmi'

export const useOwner = () => {
	const { address, isConnecting, isConnected, isDisconnected } = useAccount()

	const { data: owner, isFetching } = useContractRead({
		address: `0x${process.env.NEXT_PUBLIC_MSICAL_CONTRACT}`,
		abi: msicalABI.abi,
		functionName: 'owner',
		chainId: 80001,
	})

	return { isFetching, owner, isConnecting, isConnected, isDisconnected }
}
