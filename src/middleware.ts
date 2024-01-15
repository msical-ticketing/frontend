'use client'
import { tap } from './lib/utils'
import { useContractRead } from 'wagmi'
import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { useOwner } from './hooks/useOwner'
import { useGetAllEvents, useGetEventDetails } from './hooks'

export const middleware = () => {
	// return NextResponse.redirect(new URL('/dashboard', request.url))
	// if (!session.userId) {
	// 	if (path.startsWith('/login')) return
	// 	return NextResponse.redirect(new URL('/login', request.url))
	// }
	// if (!session.teamId) {
	// 	return tap(NextResponse.redirect(new URL('/login', request.url)), res => session.clear(res))
	// }
	// if (path == '/' || path.startsWith('/login')) {
	// 	return NextResponse.redirect(new URL('/dashboard', request.url))
	// }
}

export const config = {
	matcher: ['/', '/login', '/:path*'],
}
