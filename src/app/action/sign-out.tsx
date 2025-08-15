'use server';

import { authClient } from '@/lib/client';
import { redirect } from 'next/navigation';

const SignOut = async () => {
	await authClient.signOut();
	redirect('/');
};

export default SignOut;
