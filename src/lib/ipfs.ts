import { create } from 'ipfs-http-client'

export const uploadIPFS = async (file: any) => {
	console.log('file', file)
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

	while (!cid) {
		console.log('still uploading')
		continue
	}

	console.log('uploaded')

	return `https://kendev01.infura-ipfs.io/ipfs/${cid.toString()}`
}
