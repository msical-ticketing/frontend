import msicalABI from '@/assets/Msical.json'
import { useContractWrite, useWaitForTransaction } from 'wagmi'

export const useApprove = () => {
	const { data, write, status } = useContractWrite({
		address: `0x${process.env.NEXT_PUBLIC_MSICAL_CONTRACT}`,
		abi: msicalABI.abi,
		functionName: 'approveOrganizer',
	})

	const { isLoading, isSuccess } = useWaitForTransaction({
		hash: data?.hash,
	})

	return { write, isLoading, isSuccess, data, status }
}
