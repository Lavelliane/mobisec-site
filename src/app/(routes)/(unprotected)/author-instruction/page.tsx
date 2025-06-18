import React from 'react';
import AuthorInstruction from '@/modules/author-instruction/components/AuthorInstructionPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Author Instruction | MobiSec 2025',
	description: 'Author Instruction for MobiSec 2025',
};

const page = () => {
	return <AuthorInstruction />;
};

export default page;
