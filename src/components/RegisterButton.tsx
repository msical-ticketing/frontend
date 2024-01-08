'use client'

import { useState } from 'react'
import RegistrationForm from '@/components/RegistrationForm'
import Dialog, { DialogContent, DialogTrigger } from '@/components/ui/Dialog'

export const RegisterButton = () => {
	const [isOpen, setOpen] = useState<boolean>(false)

	return (
		<Dialog open={isOpen} onOpenChange={setOpen}>
			<DialogTrigger asChild className="">
				<div className="text-neutral-300 hover:bg-neutral-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium cursor-pointer">
					Register
				</div>
			</DialogTrigger>
			<DialogContent className="max-h-[80vh] overflow-auto">
				<div className="w-[462px] min-h-[338px]">
					<RegistrationForm setOpen={setOpen} />
				</div>
			</DialogContent>
		</Dialog>
	)
}
