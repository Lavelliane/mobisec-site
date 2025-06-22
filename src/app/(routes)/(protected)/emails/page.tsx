import React from 'react';
import EmailsPage from '@/modules/emails/components/EmailsPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Emails | MobiSec',
	description: 'Emails for MobiSec',
};

const page = () => {
	return <EmailsPage />;
};

export default page;
