import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Protect the /proceedings route
	if (pathname === '/proceedings') {
		const sessionCookie = request.cookies.get('proceedings_session');

		// If no session cookie, redirect to login
		if (!sessionCookie || sessionCookie.value !== 'authenticated') {
			return NextResponse.redirect(new URL('/proceedings/login', request.url));
		}
	}

	// Allow the request to proceed
	return NextResponse.next();
}

export const config = {
	matcher: ['/proceedings', '/proceedings/:path*'],
};
