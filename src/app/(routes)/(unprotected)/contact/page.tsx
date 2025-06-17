import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Email } from '@carbon/icons-react';
import Link from 'next/link';

const page = () => {
	return (
		<div className='min-h-screen py-12 px-4'>
			<div className='max-w-4xl mx-auto'>
				<div className='text-center mb-12'>
					<h1 className='text-4xl font-bold text-foreground mb-4'>Contact Us</h1>
					<p className='text-lg text-muted-foreground'>Get in touch with the MobiSec 2025 organizing committee</p>
				</div>

				<div className='grid md:grid-cols-1 gap-8'>
					<Card className='shadow-lg'>
						<CardHeader>
							<CardTitle className='text-2xl text-center text-primary'>General Inquiries</CardTitle>
							<CardDescription className='text-center text-muted-foreground'>
								For further information about MobiSec 2025
							</CardDescription>
						</CardHeader>
						<CardContent className='text-center'>
							<div className='p-6'>
								<h3 className='text-lg font-semibold text-foreground mb-3'>MobiSec 2025 Cyber Chair</h3>
								<div className='flex items-center justify-center gap-2'>
									<Email
										size={24}
										className='text-primary'
									/>
									<Link
										href='mailto:cyberchair.mobisec@gmail.com'
										className='text-primary hover:text-primary/80 font-medium text-lg transition-colors'>
										cyberchair.mobisec@gmail.com
									</Link>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className='mt-12 text-center'>
					<p className='text-gray-600'>
						We look forward to hearing from you and will respond to your inquiry as soon as possible.
					</p>
				</div>
			</div>
		</div>
	);
};

export default page;
