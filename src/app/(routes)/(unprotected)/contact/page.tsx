import React from 'react';
import ContactPage from '@/modules/contact/components/ContactPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Contact | MobiSec 2025',
	description: 'Contact for MobiSec 2025',
};

const page = () => {
	return <ContactPage />;
};

export default page;
