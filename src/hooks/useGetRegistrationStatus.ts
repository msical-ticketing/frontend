import msicalABI from '@/assets/Msical.json'
import { useAccount, useContractRead } from 'wagmi'

export const useGetRegistrationStatus = () => {
	const { address } = useAccount()

	const { data: status, isFetching } = useContractRead({
		address: `0x${process.env.NEXT_PUBLIC_MSICAL_CONTRACT}`,
		abi: msicalABI.abi,
		functionName: 'getOrganizerDetail',
		args: [address],
		chainId: 80001,
		// onSuccess(data) {
		// 	const result = JSON.parse(JSON.stringify(data, (_, v) => (typeof v === 'bigint' ? v.toString() : v)))
		// 	setOrganizerInfo(result)
		// 	console.log(result)
		// },
	})

	return { status, isFetching }
}
