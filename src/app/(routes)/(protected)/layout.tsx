import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

interface ProtectedLayoutProps {
	children: ReactNode;
}

export default async function ProtectedLayout({ children }: ProtectedLayoutProps) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect('/sign-in');
	}

	return <>{children}</>;
}
