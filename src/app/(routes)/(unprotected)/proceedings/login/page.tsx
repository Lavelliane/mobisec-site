'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const LoginPage = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		try {
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, password }),
			});

			const data = await response.json();

			if (response.ok) {
				router.push('/proceedings');
			} else {
				setError(data.message || 'Login failed');
			}
		} catch {
			setError('Network error. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='min-h-screen py-12 px-4'>
			<div className='max-w-md mx-auto'>
				<div className='text-center mb-8'>
					<h1 className='text-4xl font-bold text-foreground mb-4'>Login Required</h1>
					<p className='text-lg text-muted-foreground'>
						Please enter your credentials to access the MobiSec 2024 proceedings
					</p>
				</div>

				<Card className='shadow-lg bg-white'>
					<CardHeader className='text-center'>
						<CardTitle className='text-2xl text-primary'>Access Proceedings</CardTitle>
						<CardDescription className='text-muted-foreground'>
							Enter your username and password below
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className='space-y-6'>
							<div className='space-y-4'>
								<div>
									<label htmlFor='username' className='block text-sm font-medium text-foreground mb-2'>
										Username
									</label>
									<Input
										id='username'
										name='username'
										type='text'
										required
										placeholder='Enter your username'
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										className='w-full'
									/>
								</div>
								<div>
									<label htmlFor='password' className='block text-sm font-medium text-foreground mb-2'>
										Password
									</label>
									<Input
										id='password'
										name='password'
										type='password'
										required
										placeholder='Enter your password'
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className='w-full'
									/>
								</div>
							</div>

							{error && (
								<div className='text-destructive text-sm text-center bg-destructive/10 border border-destructive/20 rounded-md p-3'>
									{error}
								</div>
							)}

							<Button
								type='submit'
								disabled={loading}
								className='w-full'
								size='lg'
							>
								{loading ? 'Signing in...' : 'Sign in'}
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default LoginPage;
