import React from 'react';
import callForPapersData from '@/data/call-for-papers.json';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const CallForPapers = () => {
	return (
		<div className='container mx-auto py-8 sm:py-12 px-4 sm:px-6'>
			<div className='max-w-6xl mx-auto'>
				{/* Header Section */}
				<div className='flex flex-col items-center justify-center mb-8 sm:mb-12'>
					<h1 className='text-3xl sm:text-4xl font-bold text-foreground text-center mb-4 sm:mb-6'>{callForPapersData.title}</h1>
					<p className='text-base sm:text-lg text-muted-foreground text-center max-w-3xl'>{callForPapersData.description}</p>
				</div>

				<div className='flex flex-col gap-8'>
					{/* Important Dates and Submission Guidelines Row */}
					<div className='flex flex-col lg:flex-row gap-8 w-full'>
						{/* Important Dates Section */}
						<div className='bg-white border border-border p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 w-full lg:w-2/3'>
							<h2 className='text-xl sm:text-2xl font-semibold text-foreground flex items-center'>
								<span className='w-2 h-6 sm:h-8 bg-primary mr-3 sm:mr-4'></span>
								Important Dates
							</h2>

							<div className='flex flex-col sm:flex-row gap-6 sm:gap-8 flex-1'>
								{/* Regular Papers */}
								<div className='flex-1 flex flex-col gap-4'>
									<h3 className='text-base sm:text-lg font-semibold text-primary-foreground px-3 sm:px-4 py-2 sm:py-3 bg-primary'>Regular Papers</h3>
									<div className='flex flex-col gap-6 sm:gap-8 flex-1'>
										{callForPapersData.importantDates.regularPapers.map((dateItem, index) => (
											<div
												key={index}
												className={`border-l-4 border-primary/40 pl-3 sm:pl-4`}>
												<div className='font-semibold text-foreground mb-1 text-sm sm:text-base'>{dateItem.title}</div>
												<div className='text-muted-foreground text-sm sm:text-base'>{dateItem.date}</div>
											</div>
										))}
									</div>
								</div>

								{/* Posters */}
								<div className='flex-1 flex flex-col gap-4'>
									<h3 className='text-base sm:text-lg font-semibold text-primary-foreground px-3 sm:px-4 py-2 sm:py-3 bg-primary'>Posters</h3>
									<div className='flex flex-col gap-6 sm:gap-8 flex-1'>
										{callForPapersData.importantDates.posters.map((dateItem, index) => (
											<div
												key={index}
												className={`border-l-4 border-primary/40 pl-3 sm:pl-4`}>
												<div className='font-semibold text-foreground mb-1 text-sm sm:text-base'>{dateItem.title}</div>
												<div className='text-muted-foreground text-sm sm:text-base'>{dateItem.date}</div>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>

						{/* Submission Guidelines */}
						<div className='bg-white border border-border p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 w-full lg:w-1/3'>
							<h2 className='text-xl sm:text-2xl font-semibold text-foreground flex items-center'>
								<span className='w-2 h-6 sm:h-8 bg-primary mr-3 sm:mr-4'></span>
								Submission Guidelines
							</h2>
							<div className='flex flex-col gap-4 sm:gap-6 flex-1'>
								<div className='flex flex-col gap-4'>
									<h3 className='text-base sm:text-lg font-medium text-foreground'>Paper Categories</h3>
									<ul className='flex flex-col gap-3 text-foreground'>
										{callForPapersData.submissionGuidelines.paperCategories.map((category, index) => (
											<li
												key={index}
												className='flex items-center'>
												<span className='w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary/60 mr-3 sm:mr-4 flex-shrink-0 rounded-full'></span>
												<span className='flex-1 text-sm sm:text-base'>{category}</span>
											</li>
										))}
									</ul>
								</div>
								<div className='flex flex-col gap-4'>
									<h3 className='text-base sm:text-lg font-medium text-foreground'>Requirements</h3>
									<ul className='flex flex-col gap-3 text-foreground'>
										{callForPapersData.submissionGuidelines.requirements.map((requirement, index) => (
											<li
												key={index}
												className='flex items-center'>
												<span className='w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary/60 mr-3 sm:mr-4 flex-shrink-0 rounded-full'></span>
												<span className='flex-1 text-sm sm:text-base'>{requirement}</span>
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					</div>

					{/* Topics Section */}
					<div className='bg-white border border-border p-4 sm:p-6'>
						<h2 className='text-xl sm:text-2xl font-semibold text-foreground flex items-center mb-4 sm:mb-6'>
							<span className='w-2 h-6 sm:h-8 bg-primary mr-3 sm:mr-4'></span>
							Topics of Interest
						</h2>
						<ul className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-foreground'>
							{callForPapersData.topics.map((topic, index) => (
								<li
									key={index}
									className='flex items-center'>
									<span className='w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary/60 mr-3 sm:mr-4 flex-shrink-0 rounded-full'></span>
									<span className='flex-1 text-sm sm:text-base'>{topic}</span>
								</li>
							))}
						</ul>
					</div>

					{/* Call to Action Section */}
					<div className='bg-primary p-6 sm:p-8'>
						<div className='text-center flex flex-col gap-4 sm:gap-6'>
							<h2 className='text-xl sm:text-2xl text-white font-bold'>{callForPapersData.callToAction.title}</h2>
							<p className='text-muted max-w-2xl mx-auto text-sm sm:text-base'>{callForPapersData.callToAction.description}</p>
							<div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center'>
								<Button
									asChild
									variant='outline'
									size='sm'
									className='sm:size-default'>
									<Link
										href='/author-instruction'>
										Author Instructions
									</Link>
								</Button>
								<Button
									asChild
									variant='secondary'
									size='sm'
									className='sm:size-default'>
									<Link
										target='_blank'
										rel='noopener noreferrer'
										href='https://easychair.org/conferences?conf=mobisec2025'>
										Submit Your Paper
									</Link>
								</Button>
							</div>
						</div>
					</div>

					{/* Contact Information */}
					<div className='bg-accent rounded-lg p-4 sm:p-6 text-center'>
						<p className='text-foreground text-sm sm:text-base'>
							{callForPapersData.contact.message}{' '}
							<Link
								href={`mailto:${callForPapersData.contact.email}`}
								className='text-primary hover:text-primary/80 font-medium underline'>
								{callForPapersData.contact.email}
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CallForPapers;
