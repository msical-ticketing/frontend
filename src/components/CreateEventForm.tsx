'use client'

import Input from './ui/Input'
import Button from './ui/Button'
import { uploadIPFS } from '../lib/ipfs'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import Card, { CardContent, CardFooter, CardHeader } from './ui/Card'
import Form, { FormControl, FormField, FormItem, FormLabel, FormMessage, useForm } from './ui/Form'

const CreateEventForm: FC<{
	setBanner: Dispatch<SetStateAction<string>>
	setLoading: Dispatch<SetStateAction<boolean>>
}> = ({ setBanner, setLoading }) => {
	const toTimestamp = (strDate: string) => Date.parse(strDate) / 1000

	const onImageChange = async (e: any) => {
		const file = e.target.files[0]

		setLoading(true)
		const _imageUrl = await uploadIPFS(file)
		setBanner(_imageUrl)

		setLoading(false)
	}

	return (
		<Card className="!mt-6">
			<CardHeader className="font-bold">Event Information</CardHeader>
			<CardContent className="grid gap-2 pt-3">
				<FormField
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<>
									<FormLabel>Event Name</FormLabel>
									<Input {...field} placeholder="Enter your event's name" />
								</>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<>
									<FormLabel>Event Description</FormLabel>
									<Input {...field} placeholder="Enter your event's description" />
								</>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name={`image`}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<>
									<FormLabel>Event Banner</FormLabel>
									<Input {...field} type="file" onChange={onImageChange} />
								</>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					name="capacity"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<>
									<FormLabel>Capacity</FormLabel>
									<Input {...field} placeholder="Enter your event's capacity" />
								</>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name="datetime"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<>
									<FormLabel>When does your event happen?</FormLabel>
									<Input
										{...field}
										placeholder="When does your event happen?"
										type="datetime-local"
									/>
								</>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name="venue"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<>
									<FormLabel>Where does your event take place?</FormLabel>
									<Input {...field} placeholder="When does your event happen?" />
								</>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</CardContent>
		</Card>
	)
}

export default CreateEventForm
