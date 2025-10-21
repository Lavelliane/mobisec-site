import React from 'react';
import { ProceedingsLoginPage } from '@/modules/landing/proceedings/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Proceedings Login | MobiSec',
	description: 'Login to access MobiSec 2024 Conference Proceedings',
};

interface LoginPageProps {
	searchParams: Promise<{ error?: string }>;
}

const page = ({ searchParams }: LoginPageProps) => {
	return <ProceedingsLoginPage searchParams={searchParams} />;
};

export default page;
