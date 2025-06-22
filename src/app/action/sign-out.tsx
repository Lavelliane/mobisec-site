'use server';

import { signOut } from '../../../auth';

const SignOut = async () => {
	await signOut({ redirectTo: '/' });
};

export default SignOut;
