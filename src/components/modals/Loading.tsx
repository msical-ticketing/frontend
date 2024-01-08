'use client'

import Spinner from '../Spinner'
import { FC, useState } from 'react'
import Dialog, { DialogContent } from '../ui/Dialog'

const LoadingModal: FC<{ open: boolean }> = ({ open }) => {
	const [isOpen, setOpen] = useState<boolean>(open)

	return (
		<Dialog open={isOpen} onOpenChange={setOpen}>
			<DialogContent>
				<div className="w-[462px] min-h-[338px] flex justify-center items-center flex-col gap-4">
					<Spinner />
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default LoadingModal
