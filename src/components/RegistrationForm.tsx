import { FC } from 'react'
import Link from 'next/link'
import Input from './ui/Input'
import Spinner from './Spinner'
import Button from './ui/Button'
import { useAccount } from 'wagmi'
import { useRegister } from '../hooks/useRegister'
import { CheckCircle } from '@phosphor-icons/react'
import Card, { CardContent, CardFooter, CardHeader } from './ui/Card'
import { useGetRegistrationStatus } from '@/hooks/useGetRegistrationStatus'
import Form, { FormControl, FormField, FormItem, FormLabel, useForm } from './ui/Form'

interface GetRegistrationStatusResponse {
	status: string
	nonce: string
	account: string
	name: string
}

const RegistrationStatus = {
	UNREGISTERED: '0',
	REGISTERED: '1',
	APPROVED: '2',
}

const RegistrationForm: FC<{ setOpen: any }> = ({ setOpen }) => {
	const form = useForm<{}>({})
	const { address } = useAccount()

	const { status, isFetching } = useGetRegistrationStatus()

	const { write, isLoading, isSuccess, data, status: txStatus } = useRegister()

	if (isFetching) {
		return (
			<div className="h-full w-full flex justify-center items-center">
				<Spinner />
			</div>
		)
	}

	const registrationStatus: GetRegistrationStatusResponse = JSON.parse(
		JSON.stringify(status, (_, v) => (typeof v === 'bigint' ? v.toString() : v))
	)

	const onSubmit = (data: any) => {
		console.log('data', data)
		write({ args: [data.name] })
	}

	// if (txStatus.toString() == 'pending') {
	// 	return (
	// 		<div className="h-full w-full flex justify-center items-center">
	// 			<Spinner />
	// 			Processing on Metamask pop-up window
	// 		</div>
	// 	)
	// }

	if (isLoading) {
		return (
			<div className="h-full w-full flex justify-center items-center flex-col gap-4">
				<Spinner />
				Processing...
			</div>
		)
	}

	if (isSuccess) {
		return (
			<div className="h-full w-full flex justify-center items-center flex-col gap-1">
				<CheckCircle className="w-12 h-12 text-green-500" />

				<p>
					View{' '}
					<Link
						href={`https://mumbai.polygonscan.com/tx/${data?.hash}`}
						target="_blank"
						className="text-green-500"
					>
						transaction
					</Link>{' '}
					on block explorer
				</p>
			</div>
		)
	}

	return (
		<>
			<Form {...form} className="space-y-8 my-5" onSubmit={onSubmit}>
				<Card>
					<CardHeader className="pb-4 flex-row items-center justify-between"></CardHeader>
					<CardContent className="grid gap-6">
						<FormField
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<>
											<FormLabel>Name</FormLabel>
											{registrationStatus.status === RegistrationStatus.UNREGISTERED ? (
												<Input {...field} placeholder="Enter your name" />
											) : (
												<Input {...field} value={registrationStatus.name} disabled />
											)}
										</>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							name="walletAddress"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<>
											<FormLabel>Wallet Address</FormLabel>
											<Input {...field} value={address} disabled />
										</>
									</FormControl>
								</FormItem>
							)}
						/>

						{registrationStatus.status === RegistrationStatus.REGISTERED ? (
							<FormField
								name="status"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<>
												<FormLabel>Status</FormLabel>
												<Input {...field} value={'PROCESSING'} disabled />
											</>
										</FormControl>
									</FormItem>
								)}
							/>
						) : (
							<></>
						)}
					</CardContent>
					<CardFooter className="justify-end space-x-2">
						<Button type="button" variant="outline" onClick={() => setOpen(false)}>
							Cancel
						</Button>
						{registrationStatus.status === RegistrationStatus.REGISTERED ? <></> : <Button>Submit</Button>}
					</CardFooter>
				</Card>
			</Form>
		</>
	)
}

export default RegistrationForm
