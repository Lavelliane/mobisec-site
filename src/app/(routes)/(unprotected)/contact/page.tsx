import React from 'react';
import ContactPage from '@/modules/landing/contact/components/ContactPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Contact | MobiSec',
	description: 'Contact for MobiSec',
};

const page = () => {
	return <ContactPage />;
};

export default page;
