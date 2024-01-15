'use client'
import Image from 'next/image'
import Input from './ui/Input'
import Button from './ui/Button'
import { Ticket } from '@/interfaces'
import { FC, PropsWithChildren, useState } from 'react'
import Card, { CardContent, CardFooter } from './ui/Card'
import Dialog, { DialogContent, DialogTrigger } from './ui/Dialog'
import Form, { FormField, FormItem, FormControl, FormLabel, useForm } from './ui/Form'

const TicketCard: FC<PropsWithChildren<{ ticket: any }>> = ({ ticket }) => {
	const [isOpen, setOpen] = useState<boolean>(false)
	const form = useForm<{}>({})

	console.log('ticket', ticket)

	return (
		<Dialog open={isOpen} onOpenChange={setOpen}>
			<Card className="w-fit shadow-ticket-2">
				<CardContent className="flex flex-col mt-5 gap-4">
					<Image
						src={ticket.image}
						alt=""
						width={300}
						height={150}
						style={{ objectFit: 'cover', borderRadius: '15px', aspectRatio: '2' }}
					/>
					<div className="mt-3">
						<h3 className="text-lg font-bold">{`#${ticket.tokenId} - ${ticket.name}`}</h3>
						<p>{ticket.description}</p>
					</div>
				</CardContent>
				<CardFooter className="w-full flex justify-between">
					<Button variant="outline" className="border-neutral-700 pointer-events-none cursor-none">
						Amount: {ticket.amount}
					</Button>
					<DialogTrigger asChild>
						<Button>Transfer</Button>
					</DialogTrigger>
				</CardFooter>
			</Card>
			<DialogContent className="pt-12">
				<Form
					{...form}
					onSubmit={(data: any) => {
						// write({
						// 	args: [
						// 		`0x${process.env.NEXT_PUBLIC_MSICAL_COLLECTION}`,
						// 		ticket.eventId,
						// 		ticket.tokenId,
						// 		data.amount,
						// 	],
						// 	value: BigInt(data.amount) * BigInt(ticket.price),
						// })
					}}
				>
					<Card>
						<CardContent>
							<FormField
								name="address"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<>
												<FormLabel>{"Recipient's Address"}</FormLabel>
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

export default TicketCard
