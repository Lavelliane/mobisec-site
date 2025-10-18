import AuthorInstructionPage from '@/modules/landing/author-instruction/components/AuthorInstructionPage';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
	title: 'Author Instructions | MobiSec',
	description: 'Author instructions for MobiSec',
};

const page = () => {
	return <AuthorInstructionPage />;
};

export default page;
