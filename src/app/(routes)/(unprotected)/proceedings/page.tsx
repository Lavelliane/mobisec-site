import React from 'react';
import { ProceedingsPage } from '@/modules/landing/proceedings/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Proceedings | MobiSec',
	description: 'MobiSec 2024 Conference Proceedings',
};

const page = () => {
	return <ProceedingsPage />;
};

export default page;
