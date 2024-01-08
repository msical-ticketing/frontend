import Button from './ui/Button'
import { FC, useState } from 'react'
import Dialog, { DialogContent, DialogTrigger } from './ui/Dialog'

const SubmitButton: FC<{ isLoading: boolean; isSuccess: boolean; isUploading: boolean }> = ({
	isLoading,
	isSuccess,
	isUploading,
}) => {
	const [isOpen, setOpen] = useState<boolean>(false)

	return (
		<Dialog open={isOpen} onOpenChange={setOpen}>
			<DialogTrigger asChild className="">
				{/* <div className="text-neutral-300 hover:bg-neutral-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium cursor-pointer">
					Register
				</div> */}
				<Button disabled={isUploading} type="submit">
					Submit
				</Button>
			</DialogTrigger>
			<DialogContent className="max-h-[80vh] overflow-auto">
				<div className="w-[462px] min-h-[338px]">
					{isLoading && <>Loading...</>}
					{isSuccess && <>Success...</>}
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default SubmitButton
