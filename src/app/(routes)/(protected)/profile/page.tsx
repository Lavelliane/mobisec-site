import React from 'react';
import ProfilePage from '@/modules/profile/components/ProfilePage';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Profile | MobiSec',
	description: 'User profile for MobiSec',
};

const page = () => {
	return <ProfilePage />;
};

export default page;
