import './globals.css'
import Link from 'next/link'
import { Metadata } from 'next'
import WagmiLayout from './wagmi'
import { NavBar } from '../components'
// import ClientLayout from './client'
import { APP_NAME } from '@/lib/consts'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { FC, PropsWithChildren } from 'react'
import { Cube, List, X } from '../components/ui/icons'
import ConnectWallet, { MobileProfileNav } from '../components/ConnectWallet'
import Collapsible, { CollapsibleContent, CollapsibleTrigger } from '../components/ui/Collapsible'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', adjustFontFallback: false })

export const metadata = {
	title: {
		default: APP_NAME,
		template: `%s – ${APP_NAME}`,
	},
} satisfies Metadata

const navigation = [
	{ name: 'All Events', href: '/dashboard' },
	{ name: 'Register', href: '/dashboard/register' },
	{ name: 'Event Management', href: '/dashboard/event-management' },
]

const RootLayout: FC<PropsWithChildren<{}>> = ({ children }) => {
	return (
		<html lang="en" className={inter.variable}>
			<body className="font-sans ">
				<WagmiLayout>
					<div className="min-h-screen bg-neutral-100">
						<div className="bg-neutral-800 pb-32 dark">
							<Collapsible asChild>
								<nav className="bg-neutral-800 group">
									<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
										<div className="border-b border-neutral-700">
											<div className="flex h-16 items-center justify-between px-4 sm:px-0">
												<div className="flex items-center">
													<Link href="/dashboard" className="flex-shrink-0">
														<Cube className="h-8 w-8" color="white" weight="duotone" />
													</Link>
												</div>
												<div className="hidden md:block">
													<div className="ml-4 flex items-center md:ml-6">
														<div className="relative ml-3">
															<ConnectWallet />
														</div>
													</div>
												</div>
												<div className="-mr-2 flex md:hidden">
													{/* Mobile menu button */}
													<CollapsibleTrigger asChild>
														<button className="inline-flex items-center justify-center rounded-md bg-neutral-800 p-2 text-neutral-400 hover:bg-neutral-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-800">
															<span className="sr-only">Open main menu</span>
															<X
																className="hidden h-6 w-6 radix-state-open:block group-radix-state-open:block"
																aria-hidden="true"
															/>
															<List
																className="hidden h-6 w-6 group-radix-state-closed:block"
																aria-hidden="true"
															/>
														</button>
													</CollapsibleTrigger>
												</div>
											</div>
										</div>
										<div className="mt-2 hidden md:flex items-baseline space-x-4">
											<NavBar />
										</div>
									</div>
									<CollapsibleContent className="border-b border-neutral-700 md:hidden">
										<MobileProfileNav navigation={navigation} />
									</CollapsibleContent>
								</nav>
							</Collapsible>
						</div>

						<main className="-mt-24">
							<div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
								<div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">{children}</div>
							</div>
						</main>
					</div>
				</WagmiLayout>
				<Toaster />
			</body>
		</html>
	)
}

export default RootLayout
