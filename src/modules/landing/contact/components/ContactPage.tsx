import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Email } from '@carbon/icons-react';
import Link from 'next/link';

const ContactPage = () => {
	return (
		<div className='py-8 sm:py-12 px-4'>
			<div className='max-w-4xl mx-auto'>
				<div className='text-center mb-8 sm:mb-12'>
					<h1 className='text-3xl sm:text-4xl font-bold text-foreground mb-4'>Contact Us</h1>
					<p className='text-base sm:text-lg text-muted-foreground px-4 sm:px-0'>
						Get in touch with the MobiSec 2025 organizing committee
					</p>
				</div>

				<div className='flex justify-center'>
					<Card className='shadow-lg w-full max-w-2xl'>
						<CardHeader className='text-center pb-4'>
							<CardTitle className='text-xl sm:text-2xl text-primary'>General Inquiries</CardTitle>
							<CardDescription className='text-center text-muted-foreground px-4 sm:px-0'>
								For further information about MobiSec 2025
							</CardDescription>
						</CardHeader>
						<CardContent className='text-center'>
							<div className='p-4 sm:p-6'>
								<h3 className='text-lg font-semibold text-foreground mb-4'>MobiSec 2025 Cyber Chair</h3>
								<div className='flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3'>
									<Email
										size={24}
										className='text-primary flex-shrink-0'
									/>
									<Link
										href='mailto:cyberchair.mobisec@gmail.com'
										className='text-primary hover:text-primary/80 font-medium text-base sm:text-lg transition-colors break-all sm:break-normal'>
										cyberchair.mobisec@gmail.com
									</Link>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className='mt-8 sm:mt-12 text-center'>
					<p className='text-gray-600 px-4 sm:px-0 text-sm sm:text-base'>
						We look forward to hearing from you and will respond to your inquiry as soon as possible.
					</p>
				</div>
			</div>
		</div>
	);
};

export default ContactPage;
