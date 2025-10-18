import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
	try {
		const { username, password } = await request.json();

		// Get credentials from environment variables
		const validUsername = process.env.PROCEEDINGS_USERNAME;
		const validPassword = process.env.PROCEEDINGS_PASSWORD;

		// Check if credentials match
		if (username === validUsername && password === validPassword) {
			// Set session cookie
			const cookieStore = await cookies();
			cookieStore.set('proceedings_session', 'authenticated', {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
				maxAge: 60 * 60 * 24, // 24 hours
				path: '/',
			});

			return NextResponse.json({ success: true, message: 'Login successful' });
		} else {
			return NextResponse.json(
				{ success: false, message: 'Invalid credentials' },
				{ status: 401 }
			);
		}
	} catch (error) {
		console.error('Login error:', error);
		return NextResponse.json(
			{ success: false, message: 'Internal server error' },
			{ status: 500 }
		);
	}
}
