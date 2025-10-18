'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const SignOut = async () => {
	await auth.api.signOut({
		headers: await headers(),
	});
	redirect('/');
};

export default SignOut;
