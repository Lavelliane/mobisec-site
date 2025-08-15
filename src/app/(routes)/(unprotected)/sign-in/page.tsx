import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Metadata } from 'next';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { authClient } from '@/lib/client';

export const metadata: Metadata = {
	title: 'Sign In | MobiSec',
	description: 'Sign In for MobiSec',
};

async function signInAction() {
	'use server'
	const data = await authClient.signIn.social({
		provider: "google",
		callbackURL: "/dashboard",
	})
	redirect(data.data?.url || '/')
}

export default async function SignIn() {

	const session = await authClient.getSession()

	// If user is already authenticated, they shouldn't see this page
	if (session.data) {
		return (
			<div className='min-h-[calc(100vh-132px)] flex items-center justify-center bg-white px-4'>
				<Card className='w-full max-w-md'>
					<CardHeader className='text-center'>
						<CardTitle className='text-2xl font-bold text-gray-900'>Already Signed In</CardTitle>
						<CardDescription>You are already authenticated</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4'>
						<p className='text-center text-gray-600'>Welcome back, {session.data?.user.name}!</p>
						<Button
							asChild
							className='w-full'>
							<a href='/dashboard'>Go to Dashboard</a>
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className='min-h-[calc(100vh-132px)] flex flex-col lg:flex-row'>
			{/* Left Side - Sign In Form */}
			<div className='flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-white order-2 lg:order-1'>
				<div className='w-full max-w-md space-y-6 lg:space-y-8'>
					{/* Welcome Section */}
					<div className='flex flex-col gap-2 text-center lg:text-left'>
						<h1 className='text-2xl sm:text-3xl font-bold text-gray-900'>Welcome Back</h1>
						<p className='text-gray-600 text-sm sm:text-base'>Enter your email and password to access your account.</p>
					</div>

					{/* Sign In Form */}
					<div className='space-y-4 lg:space-y-6'>
						{/* Social Login Buttons */}
						<div className='flex flex-col gap-3 lg:gap-4'>

							<Button
								onClick={signInAction}
								variant='outline'
								className='w-full h-12'
								size='lg'>
								<Image
									src='/google.svg'
									alt='Google'
									width={20}
									height={20}
									className='w-5 h-5 mr-2'
								/>
								Google
							</Button>

						</div>
					</div>

					{/* Footer */}
					<div className='text-center pt-4'>
						<p className='text-xs text-gray-500'>Copyright © 2025 MobiSec Conference.</p>
						<p className='text-xs text-gray-500 mt-1'>
							<a
								href='#'
								className='hover:underline'>
								Privacy Policy
							</a>
						</p>
					</div>
				</div>
			</div>

			{/* Right Side - Hero Section */}
			<div className='flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative min-h-[300px] lg:min-h-auto order-1 lg:order-2'>
				<div className='absolute top-0 left-0 z-0 p-4 sm:p-6 lg:p-8 overflow-hidden w-full h-full'>
					<Image
						src='/assets/sapporo/1.png'
						alt='MobiSec'
						width={1000}
						height={1000}
						priority={true}
						loading='eager'
						className='w-full h-full object-cover rounded-2xl lg:rounded-4xl'
					/>
				</div>
				<div className='z-10 w-full max-w-lg h-full text-center space-y-4 sm:space-y-6 lg:space-y-8 bg-gradient-to-b from-transparent via-primary/80 to-transparent px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-36 rounded-2xl lg:rounded-4xl'>
					<div className='flex flex-col items-center gap-3 lg:gap-4 z-10'>
						{/* Logo */}
						<div className='flex flex-col items-center gap-2'>
							<Image
								src='/assets/logo/mobisec-logo-v2-white-nobg.png'
								alt='MobiSec'
								width={100}
								height={100}
								className='w-24 sm:w-32 lg:w-40 h-fit'
							/>
							<h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight'>Login to MobiSec</h2>
						</div>
						<p className='text-primary-foreground/90 text-sm sm:text-base max-w-sm lg:max-w-none px-2 lg:px-0'>
							Log in to access your MobiSec dashboard and manage your submissions, reviews, and conference activities.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
