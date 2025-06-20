import React from 'react';
import PreviousEventsPage from '@/modules/landing/previous-events/components/PreviousEventsPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Previous Events | MobiSec 2025',
	description: 'Previous Events for MobiSec 2025',
};

const page = () => {
	return <PreviousEventsPage />;
};

export default page;
