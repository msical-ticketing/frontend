'use client'

import { APP_NAME } from '../lib/consts'
import { polygonMumbai } from 'viem/chains'
import { FC, PropsWithChildren } from 'react'
import { WagmiConfig, createConfig } from 'wagmi'
import { IconContext } from '@phosphor-icons/react'
import { ConnectKitProvider, getDefaultConfig } from 'connectkit'

const config = createConfig(
	getDefaultConfig({
		appName: APP_NAME,
		infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
		walletConnectProjectId: process.env.NEXT_PUBLIC_WC_ID!,
		chains: [polygonMumbai],
	})
)

const WagmiLayout: FC<PropsWithChildren<{}>> = ({ children }) => {
	return (
		<IconContext.Provider value={{ color: 'currentColor', size: '' }}>
			<WagmiConfig config={config}>
				<ConnectKitProvider options={{ hideBalance: true, enforceSupportedChains: false }}>
					{children}
				</ConnectKitProvider>
			</WagmiConfig>
		</IconContext.Provider>
	)
}

export default WagmiLayout
export { config as wagmiConfig }
