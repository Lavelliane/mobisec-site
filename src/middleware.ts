import { auth } from '../auth'; // adjust path if auth config is elsewhere
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
	const session = await auth();

	const protectedPaths = ['/dashboard', '/profile', '/registration', 'emails', '/settings'];

	const isProtected = protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path));

	if (isProtected && !session?.user) {
		return NextResponse.redirect(new URL('/sign-in', req.url));
	}

	return NextResponse.next();
}
