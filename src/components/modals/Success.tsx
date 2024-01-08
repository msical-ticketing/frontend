'use client'

import Link from 'next/link'
import { FC, useState } from 'react'
import { revalidatePath } from 'next/cache'
import { useRouter } from 'next/navigation'
import { CheckCircle } from '@phosphor-icons/react'
import Dialog, { DialogContent } from '../ui/Dialog'

const SuccessModal: FC<{ open: boolean; txHash: `0x${string}` | undefined; path: string }> = ({
	open,
	txHash,
	path,
}) => {
	const [isOpen, setOpen] = useState<boolean>(open)
	const router = useRouter()

	return (
		<Dialog
			open={isOpen}
			onOpenChange={() => {
				setOpen(false)
				router.replace(path)
			}}
		>
			<DialogContent>
				<div className="w-[462px] min-h-[338px] flex justify-center items-center flex-col gap-1">
					<CheckCircle className="w-12 h-12 text-green-500" />

					<p>
						View{' '}
						<Link
							href={`https://mumbai.polygonscan.com/tx/${txHash}`}
							target="_blank"
							className="text-green-500"
						>
							transaction
						</Link>{' '}
						on block explorer
					</p>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default SuccessModal
