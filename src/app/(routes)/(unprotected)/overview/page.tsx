import React from 'react';
import OverviewPage from '@/modules/landing/overview/components/OverviewPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Overview | MobiSec 2025',
	description: 'Overview for MobiSec 2025',
};

const page = () => {
	return <OverviewPage />;
};

export default page;
