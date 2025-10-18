import RegistrationPage from '@/modules/registrations/components/RegistrationPage';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
	title: 'Registration | MobiSec',
	description: 'Registration for MobiSec',
};

const page = () => {
	return <RegistrationPage />;
};

export default page;
