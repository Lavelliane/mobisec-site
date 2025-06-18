import React from 'react';
import CommitteesPage from '@/modules/committees/components/CommitteesPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Committees | MobiSec 2025',
	description: 'Committees for MobiSec 2025',
};

const page = () => {
	return <CommitteesPage />;
};

export default page;
