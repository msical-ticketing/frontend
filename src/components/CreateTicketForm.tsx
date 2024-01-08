'use client'

import Input from './ui/Input'
import Button from './ui/Button'
import { uploadIPFS } from '@/lib/ipfs'
import Card, { CardContent, CardFooter } from './ui/Card'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { CreateTicketParams } from '../interfaces/CreateTicketParams'
import Form, { FormControl, FormField, FormItem, FormLabel, useForm } from './ui/Form'

const CreateTicketForm: FC<{
	setLoading: Dispatch<SetStateAction<boolean>>
	index: number
	updateTicketImage: any
}> = ({ setLoading, index, updateTicketImage }) => {
	const onImageChange = async (e: any) => {
		const file = e.target.files[0]

		setLoading(true)
		const _imageUrl = await uploadIPFS(file)
		updateTicketImage(index, _imageUrl)

		setLoading(false)
	}

	// const onSubmit = async (data: any) => {
	// 	// todo: verify input fields
	// 	const metadata = {
	// 		name: data.name,
	// 		description: data.description,
	// 		image: imageUrl,
	// 	}

	// 	const uri = await uploadIPFS(JSON.stringify(metadata))
	// 	console.log('uri', uri)

	// 	const newTicket: CreateTicketParams = {
	// 		totalSupply: data.supply,
	// 		price: data.price,
	// 		uri,
	// 	}
	// }

	return (
		<Card>
			<CardContent className="grid gap-2 pt-3">
				<FormField
					name={`ticket-name-${index}`}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<>
									<FormLabel>Name</FormLabel>
									<Input {...field} />
								</>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					name={`ticket-description-${index}`}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<>
									<FormLabel>Description</FormLabel>
									<Input {...field} />
								</>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					name={`ticket-price-${index}`}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<>
									<FormLabel>Price</FormLabel>
									<Input {...field} />
								</>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					name={`ticket-supply-${index}`}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<>
									<FormLabel>Total Supply</FormLabel>
									<Input {...field} />
								</>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					name={`image`}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<>
									<FormLabel>Image</FormLabel>
									<Input {...field} type="file" onChange={onImageChange} />
								</>
							</FormControl>
						</FormItem>
					)}
				/>
			</CardContent>
		</Card>
	)
}

export default CreateTicketForm
