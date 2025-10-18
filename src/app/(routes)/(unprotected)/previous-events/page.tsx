import React from 'react';
import PreviousEventsPage from '@/modules/landing/previous-events/components/PreviousEventsPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Previous Events | MobiSec',
	description: 'Previous Events for MobiSec',
};

const page = () => {
	return <PreviousEventsPage />;
};

export default page;
