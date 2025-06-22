import React from 'react';
import CommitteesPage from '@/modules/landing/committees/components/CommitteesPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Committees | MobiSec',
	description: 'Committees for MobiSec',
};

const page = () => {
	return <CommitteesPage />;
};

export default page;
