import { useState } from 'react'

export const QrCodeGenerator = () => {
	const [url, setUrl] = useState<string>('')
	const [qrIsVisible, setQrIsVisible] = useState<boolean>(false)

	const handleQrCodeGenerator = () => {
		if (!url) return

		setQrIsVisible(true)
	}

	return (
		<div>
			<h1>QR Code Generator</h1>
		</div>
	)
}
