import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { env } from '@/env';

export const metadata: Metadata = {
	title: 'Proceedings Login | MobiSec',
	description: 'Login to access MobiSec 2024 Conference Proceedings',
};

async function loginAction(formData: FormData) {
	'use server';

	const username = formData.get('username') as string;
	const password = formData.get('password') as string;

	// Verify credentials against environment variables
	if (username === env.PROCEEDINGS_USERNAME && password === env.PROCEEDINGS_PASSWORD) {
		// Create a session cookie for proceedings
		const cookieStore = await cookies();
		cookieStore.set('proceedings-session', 'authenticated', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 60 * 60 * 24, // 24 hours
			path: '/',
		});

		redirect('/proceedings');
	} else {
		redirect('/proceedings/login?error=1');
	}
}

interface LoginPageProps {
	searchParams: Promise<{ error?: string }>;
}

const ProceedingsLoginPage = async ({ searchParams }: LoginPageProps) => {
	const params = await searchParams;
	const hasError = params?.error === '1';

	return (
		<div className='min-h-[calc(100vh-132px)] flex items-center justify-center bg-white py-8 w-full'>
			<Card className='max-w-md w-full mx-4'>
				<CardHeader className='text-center space-y-2 w-full'>
					<CardTitle className='text-xl sm:text-2xl font-bold text-gray-900'>Proceedings Access</CardTitle>
					<CardDescription className='text-sm sm:text-base px-2'>
						Enter your credentials to access the MobiSec 2024 Conference Proceedings
					</CardDescription>
				</CardHeader>
				<CardContent className='space-y-4 sm:space-y-6 px-4 sm:px-6'>
					<form action={loginAction} className='space-y-4'>
						<div className='space-y-2'>
							<Label htmlFor='username' className='text-sm font-medium'>Username</Label>
							<Input
								id='username'
								name='username'
								type='text'
								required
								placeholder='Enter username'
								className='h-11 sm:h-10'
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='password' className='text-sm font-medium'>Password</Label>
							<Input
								id='password'
								name='password'
								type='password'
								required
								placeholder='Enter password'
								className='h-11 sm:h-10'
							/>
						</div>
						{hasError && (
							<div className='text-red-600 text-sm text-center bg-red-50 p-3 rounded-md border border-red-200'>
								Invalid credentials. Please try again.
							</div>
						)}
						<Button type='submit' className='w-full h-11 sm:h-10 text-base font-medium'>
							Login
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default ProceedingsLoginPage;
