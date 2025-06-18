import React from 'react';
import callForPapersData from '../../../data/call-for-papers.json';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const CallForPapers = () => {
	const getColorClasses = (color: string) => {
		const colorMap = {
			green: 'border-sail-400',
			yellow: 'border-sail-300',
			blue: 'border-sail-600',
			purple: 'border-sail-700',
		};
		return colorMap[color as keyof typeof colorMap] || 'border-sail-400';
	};

	return (
		<div className='container mx-auto py-12 px-6'>
			<div className='max-w-6xl mx-auto'>
				{/* Header Section */}
				<div className='flex flex-col items-center justify-center mb-12'>
					<h1 className='text-4xl font-bold text-foreground text-center mb-6'>{callForPapersData.title}</h1>
					<p className='text-lg text-muted-foreground text-center max-w-3xl'>{callForPapersData.description}</p>
				</div>

				<div className='flex flex-col gap-8'>
					{/* Important Dates and Submission Guidelines Row */}
					<div className='flex flex-col lg:flex-row gap-8 w-full'>
						{/* Important Dates Section */}
						<div className='bg-white border border-border p-6 flex flex-col gap-6 w-2/3'>
							<h2 className='text-2xl font-semibold text-foreground flex items-center'>
								<span className='w-2 h-8 bg-primary mr-4'></span>
								Important Dates
							</h2>

							<div className='flex flex-col md:flex-row gap-8 flex-1'>
								{/* Regular Papers */}
								<div className='flex-1 flex flex-col gap-4'>
									<h3 className='text-lg font-semibold text-foreground px-4 py-3 bg-secondary/50'>Regular Papers</h3>
									<div className='flex flex-col gap-8 flex-1'>
										{callForPapersData.importantDates.regularPapers.map((dateItem, index) => (
											<div
												key={index}
												className={`border-l-4 ${getColorClasses(dateItem.color)} pl-4`}>
												<div className='font-semibold text-foreground mb-1'>{dateItem.title}</div>
												<div className='text-muted-foreground'>{dateItem.date}</div>
											</div>
										))}
									</div>
								</div>

								{/* Posters */}
								<div className='flex-1 flex flex-col gap-4'>
									<h3 className='text-lg font-semibold text-foreground px-4 py-3 bg-secondary/50'>Posters</h3>
									<div className='flex flex-col gap-8 flex-1'>
										{callForPapersData.importantDates.posters.map((dateItem, index) => (
											<div
												key={index}
												className={`border-l-4 ${getColorClasses(dateItem.color)} pl-4`}>
												<div className='font-semibold text-foreground mb-1'>{dateItem.title}</div>
												<div className='text-muted-foreground'>{dateItem.date}</div>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>

						{/* Submission Guidelines */}
						<div className='bg-white border border-border p-6 flex flex-col gap-6 w-1/3'>
							<h2 className='text-2xl font-semibold text-foreground flex items-center'>
								<span className='w-2 h-8 bg-primary mr-4'></span>
								Submission Guidelines
							</h2>
							<div className='flex flex-col gap-6 flex-1'>
								<div className='flex flex-col gap-4'>
									<h3 className='text-lg font-medium text-foreground'>Paper Categories</h3>
									<ul className='flex flex-col gap-3 text-foreground'>
										{callForPapersData.submissionGuidelines.paperCategories.map((category, index) => (
											<li
												key={index}
												className='flex items-center'>
												<span className='w-2 h-2 bg-primary/60 mr-4 flex-shrink-0 rounded-full'></span>
												<span className='flex-1'>{category}</span>
											</li>
										))}
									</ul>
								</div>
								<div className='flex flex-col gap-4'>
									<h3 className='text-lg font-medium text-foreground'>Requirements</h3>
									<ul className='flex flex-col gap-3 text-foreground'>
										{callForPapersData.submissionGuidelines.requirements.map((requirement, index) => (
											<li
												key={index}
												className='flex items-center'>
												<span className='w-2 h-2 bg-primary/60 mr-4 flex-shrink-0 rounded-full'></span>
												<span className='flex-1'>{requirement}</span>
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					</div>

					{/* Topics Section */}
					<div className='bg-white border border-border p-6'>
						<h2 className='text-2xl font-semibold text-foreground flex items-center mb-6'>
							<span className='w-2 h-8 bg-primary mr-4'></span>
							Topics of Interest
						</h2>
						<ul className='grid grid-cols-1 md:grid-cols-2 gap-4 text-foreground'>
							{callForPapersData.topics.map((topic, index) => (
								<li
									key={index}
									className='flex items-center'>
									<span className='w-2 h-2 bg-primary/60 mr-4 flex-shrink-0 rounded-full'></span>
									<span className='flex-1'>{topic}</span>
								</li>
							))}
						</ul>
					</div>

					{/* Call to Action Section */}
					<div className='bg-primary p-8'>
						<div className='text-center flex flex-col gap-6'>
							<h2 className='text-2xl text-white font-bold'>{callForPapersData.callToAction.title}</h2>
							<p className='text-muted max-w-2xl mx-auto'>{callForPapersData.callToAction.description}</p>
							<div className='flex flex-col sm:flex-row gap-4 justify-center'>
								{callForPapersData.callToAction.buttons.map((button, index) => (
									<Button
										key={index}
										variant={button.type === 'outline' ? 'outline' : 'default'}>
										{button.text}
									</Button>
								))}
							</div>
						</div>
					</div>

					{/* Contact Information */}
					<div className='bg-secondary/30 rounded-lg p-6 text-center'>
						<p className='text-foreground'>
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
