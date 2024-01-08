const { NormalModuleReplacementPlugin } = require('webpack')

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: true,
	},
	webpack: config => {
		config.resolve.fallback = { fs: false, net: false, tls: false, crypto: false }
		config.plugins.push(
			new NormalModuleReplacementPlugin(/node:/, resource => {
				resource.request = resource.request.replace(/^node:/, '')
			})
		)
		return config
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'kendev01.infura-ipfs.io',
				port: '',
				pathname: '/ipfs/**',
			},
		],
	},
}

module.exports = nextConfig
