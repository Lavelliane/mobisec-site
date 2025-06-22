import React from 'react';
import OverviewPage from '@/modules/landing/overview/components/OverviewPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Overview | MobiSec',
	description: 'Overview for MobiSec',
};

const page = () => {
	return <OverviewPage />;
};

export default page;
