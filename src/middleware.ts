import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Check for better-auth session cookie (try common names)
	const sessionCookie =
		request.cookies.get('auth-session') || request.cookies.get('session') || request.cookies.get('better-auth-session');
	const hasSession = sessionCookie && sessionCookie.value;

	// Check for proceedings session cookie
	const proceedingsSession = request.cookies.get('proceedings-session');
	const hasProceedingsSession = proceedingsSession && proceedingsSession.value === 'authenticated';

	// If user is signed in and trying to access sign-in page, redirect to dashboard
	if (hasSession && pathname === '/sign-in') {
		return NextResponse.redirect(new URL('/dashboard', request.url));
	}

	// Protect proceedings page - redirect to login if not authenticated
	if (pathname === '/proceedings' && !hasProceedingsSession) {
		return NextResponse.redirect(new URL('/proceedings/login', request.url));
	}

	// If user is authenticated for proceedings and trying to access login page, redirect to proceedings
	if (pathname === '/proceedings/login' && hasProceedingsSession) {
		return NextResponse.redirect(new URL('/proceedings', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
