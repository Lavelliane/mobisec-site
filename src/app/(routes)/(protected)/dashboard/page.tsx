import React from 'react';
import { signOut } from '../../../../../auth';
import { auth } from '../../../../../auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Dashboard | MobiSec',
	description: 'Dashboard for MobiSec',
};

const Dashboard = async () => {
	const session = await auth();
	console.log(session);
	return (
		<div>
			<form
				action={async () => {
					'use server';
					await signOut({ redirectTo: '/' });
				}}>
				<button type='submit'>Sign Out</button>
			</form>
		</div>
	);
};

export default Dashboard;
