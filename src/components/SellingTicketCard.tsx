'use client'
import Image from 'next/image'
import Input from './ui/Input'
import Button from './ui/Button'
import { FC, useState } from 'react'
import { useContractWrite } from 'wagmi'
import { SellingTicket } from '@/interfaces'
import msicalABI from '@/assets/Msical.json'
import { formatEther, parseEther } from 'viem'
import Dialog, { DialogContent, DialogTrigger } from './ui/Dialog'
import Card, { CardContent, CardFooter, CardHeader } from './ui/Card'
import Form, { FormField, FormItem, FormControl, FormLabel, useForm } from './ui/Form'

const SellingTicketCard: FC<{ ticket: SellingTicket; eventId: string }> = ({ ticket, eventId }) => {
	const [isOpen, setOpen] = useState<boolean>(false)
	const form = useForm<{}>({})

	const { write } = useContractWrite({
		address: `0x${process.env.NEXT_PUBLIC_MSICAL_CONTRACT}`,
		abi: msicalABI.abi,
		functionName: 'buyTicket',
	})

	return (
		<Dialog open={isOpen} onOpenChange={setOpen}>
			<Card className="w-fit shadow-ticket-1">
				<CardContent className="flex flex-col mt-5 gap-4">
					<Image
						src={ticket.image}
						alt=""
						width={293}
						height={0}
						style={{ objectFit: 'cover', borderRadius: '15px' }}
					/>
					<div className="mt-3">
						<h3 className="text-lg font-bold">{`#${ticket.id} - ${ticket.name}`}</h3>
						<p>{ticket.description}</p>
					</div>

					<div className="border border-neutral-500 rounded-md p-2">
						<p>Price: {formatEther(BigInt(ticket.price))} MATIC</p>
						<p>
							Availability: {Number(ticket.totalSupply) - Number(ticket.soldQuantity)} /{' '}
							{ticket.totalSupply}
						</p>
					</div>
				</CardContent>
				<CardFooter>
					<DialogTrigger asChild>
						<Button>Buy</Button>
					</DialogTrigger>
				</CardFooter>
			</Card>
			<DialogContent className="pt-12">
				<Form
					{...form}
					onSubmit={(data: any) => {
						console.log('ticket', ticket)
						console.log('data', data)
						write({
							args: [`0x${process.env.NEXT_PUBLIC_MSICAL_COLLECTION}`, eventId, ticket.id, data.amount],
							value: BigInt(data.amount) * BigInt(ticket.price),
						})
					}}
				>
					<Card>
						<CardContent>
							<FormField
								name="amount"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<>
												<FormLabel>Amount</FormLabel>
												<Input {...field} />
											</>
										</FormControl>
									</FormItem>
								)}
							/>
						</CardContent>
						<CardFooter className="justify-end space-x-2">
							<Button type="button" variant="ghost" onClick={() => setOpen(false)}>
								Cancel
							</Button>
							<Button>Confirm</Button>
						</CardFooter>
					</Card>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

export default SellingTicketCard
