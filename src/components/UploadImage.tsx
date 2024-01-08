'use client'
import Image from 'next/image'
import Button from './ui/Button'
import { Modal, Upload } from 'antd'
import { IPFSHTTPClient, create } from 'ipfs-http-client'
import { RcFile, UploadFile, UploadProps } from 'antd/es/upload'
import { FC, InputHTMLAttributes, forwardRef, useState } from 'react'

const uploadIPFS = async (file: any) => {
	const IPFSClient = create({
		host: 'ipfs.infura.io',
		port: 5001,
		protocol: 'https',
		apiPath: '/api/v0',
		headers: {
			authorization:
				`Basic ` +
				Buffer.from('2Rri4RZuQXEmyDVjhEHqzsDqkD9' + ':' + '5680ab9cbacb713b770e8752cdde7423').toString(
					'base64'
				),
		},
	})

	const { cid } = await IPFSClient.add(file)

	return cid
}

const getBase64 = (file: RcFile): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result as string)
		reader.onerror = error => reject(error)
	})

const UploadButton = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
	({ className, type, ...props }, ref) => {
		return <UploadImage ref={ref} {...props} />
	}
)
UploadButton.displayName = 'UploadButton'

const UploadImage: FC<{ ref: any }> = ({ ref }) => {
	const [previewOpen, setPreviewOpen] = useState(false)
	const [previewImage, setPreviewImage] = useState('')
	const [previewTitle, setPreviewTitle] = useState('')
	const [uploaded, setUploaded] = useState(false)

	const handleCancel = () => setPreviewOpen(false)

	const handlePreview = async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as RcFile)
		}

		setPreviewImage(file.url || (file.preview as string))
		setPreviewOpen(true)
		setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1))
	}

	const handleChange = async (file: any) => {
		setUploaded(true)
		const cid = await uploadIPFS(file.file.originFileObj)
	}

	return (
		<>
			<Upload
				action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
				listType="picture"
				onPreview={handlePreview}
				onChange={handleChange}
				ref={ref}
			>
				{uploaded ? null : (
					<Button variant="outline" type="button">
						Upload
					</Button>
				)}
			</Upload>
			<Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
				<Image alt="Example" style={{ width: '100%' }} src={previewImage} />
			</Modal>
		</>
	)
}

export default UploadImage
