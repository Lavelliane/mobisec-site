import React from 'react';
import { Metadata } from 'next';
import { authClient } from '@/lib/client';
import { redirect } from 'next/navigation';
import { getSession } from '@/actions/get-session';

export const metadata: Metadata = {
	title: 'Dashboard | MobiSec',
	description: 'Dashboard for MobiSec',
};

const Dashboard = async () => {
	const session = await getSession();
	console.log('session DASHBOARD', session)
	return (
		<div>
			<form
				action={async () => {
					'use server';
					await authClient.signOut();
					redirect('/');
				}}>
				<button type='submit'>Sign Out</button>
			</form>
		</div>
	);
};

export default Dashboard;
