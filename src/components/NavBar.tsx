'use client'
import { FC } from 'react'
import Navigation from './Navigation'
import { useIsOrganizer } from '@/hooks'
import { RegisterButton } from './RegisterButton'

export const NavBar: FC<{}> = ({}) => {
	const { isFetching, isOrganizer, isConnecting, isConnected, isDisconnected } = useIsOrganizer()

	const unauthorizedNav = [{ name: 'All Events', href: '/' }]

	const organizerNav = [
		{ name: 'All Events', href: '/' },
		{ name: 'Purchased Tickets', href: '/purchased' },
		{ name: 'Event Management', href: '/event/manage' },
	]

	const clientNav = [
		{ name: 'All Events', href: '/' },
		{ name: 'Purchased Tickets', href: '/purchased' },
	]

	if (isFetching) return <></>

	if (isDisconnected || isConnecting)
		return (
			<>
				{unauthorizedNav.map(item => (
					<Navigation key={item.name} href={item.href}>
						{item.name}
					</Navigation>
				))}
			</>
		)

	if (isConnected && isOrganizer)
		return (
			<>
				{organizerNav.map(item => (
					<Navigation key={item.name} href={item.href}>
						{item.name}
					</Navigation>
				))}
			</>
		)

	if (isConnected && !isOrganizer)
		return (
			<>
				{clientNav.map(item => (
					<Navigation key={item.name} href={item.href}>
						{item.name}
					</Navigation>
				))}
				<RegisterButton />
			</>
		)

	return <></>
}

export default NavBar
