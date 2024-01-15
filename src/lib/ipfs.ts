import axios from 'axios'
import FormData from 'form-data'

const JWT = process.env.NEXT_PUBLIC_PINATA_JWT

export const pinFileToIPFS = async (file: any) => {
	const formData = new FormData()

	formData.append('file', file)

	const pinataMetadata = JSON.stringify({
		name: 'File name',
	})
	formData.append('pinataMetadata', pinataMetadata)

	const pinataOptions = JSON.stringify({
		cidVersion: 0,
	})
	formData.append('pinataOptions', pinataOptions)

	try {
		const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
			headers: {
				'Content-Type': `multipart/form-data`,
				Authorization: `Bearer ${JWT}`,
			},
		})

		return `${process.env.NEXT_PUBLIC_PINATA_IPFS_GATEWAY}/${res.data.IpfsHash}`
	} catch (error) {
		console.log(error)
	}
}

export const pinJSONToIPFS = async (json: any) => {
	const formData = new FormData()

	formData.append('pinataContent', json)

	const pinataMetadata = JSON.stringify({
		name: 'File name',
	})
	formData.append('pinataMetadata', pinataMetadata)

	const pinataOptions = JSON.stringify({
		cidVersion: 0,
	})
	formData.append('pinataOptions', pinataOptions)

	try {
		const res = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', formData, {
			headers: {
				'Content-Type': `application/json`,
				Authorization: `Bearer ${JWT}`,
			},
		})

		return `${process.env.NEXT_PUBLIC_PINATA_IPFS_GATEWAY}/${res.data.IpfsHash}`
	} catch (error) {
		console.log(error)
	}
}
