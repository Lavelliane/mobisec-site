import React from 'react';
import callForPapersData from '../../data/call-for-papers.json';

const CallForPapers = () => {
	const getColorClasses = (color: string) => {
		const colorMap = {
			green: 'border-green-400',
			yellow: 'border-yellow-400',
			blue: 'border-blue-400',
			purple: 'border-purple-400',
		};
		return colorMap[color as keyof typeof colorMap] || 'border-gray-400';
	};

	return (
		<section className='py-16 px-4'>
			<div className='max-w-4xl mx-auto'>
				<div className='text-center mb-12'>
					<h2 className='text-4xl font-bold text-gray-900 mb-4'>{callForPapersData.title}</h2>
					<p className='text-xl text-gray-600 max-w-3xl mx-auto'>{callForPapersData.description}</p>
				</div>

				<div className='grid md:grid-cols-2 gap-8 mb-12'>
					{/* Topics Section */}
					<div className='bg-white rounded-lg shadow-lg p-8'>
						<h3 className='text-2xl font-semibold text-gray-900 mb-6 flex items-center'>
							<span className='w-2 h-8 bg-blue-600 rounded mr-3'></span>
							Topics of Interest
						</h3>
						<ul className='space-y-3 text-gray-700'>
							{callForPapersData.topics.map((topic, index) => (
								<li
									key={index}
									className='flex items-start'>
									<span className='w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0'></span>
									{topic}
								</li>
							))}
						</ul>
					</div>

					{/* Important Dates Section */}
					<div className='bg-white rounded-lg shadow-lg p-8'>
						<h3 className='text-2xl font-semibold text-gray-900 mb-6 flex items-center'>
							<span className='w-2 h-8 bg-green-600 rounded mr-3'></span>
							Important Dates
						</h3>
						<div className='space-y-4'>
							{callForPapersData.importantDates.map((dateItem, index) => (
								<div
									key={index}
									className={`border-l-4 ${getColorClasses(dateItem.color)} pl-4`}>
									<div className='font-semibold text-gray-900'>{dateItem.title}</div>
									<div className='text-gray-600'>{dateItem.date}</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Submission Guidelines */}
				<div className='bg-white rounded-lg shadow-lg p-8 mb-8'>
					<h3 className='text-2xl font-semibold text-gray-900 mb-6 flex items-center'>
						<span className='w-2 h-8 bg-purple-600 rounded mr-3'></span>
						Submission Guidelines
					</h3>
					<div className='grid md:grid-cols-2 gap-6 text-gray-700'>
						<div>
							<h4 className='font-semibold text-gray-900 mb-2'>Paper Categories</h4>
							<ul className='space-y-1'>
								{callForPapersData.submissionGuidelines.paperCategories.map((category, index) => (
									<li key={index}>• {category}</li>
								))}
							</ul>
						</div>
						<div>
							<h4 className='font-semibold text-gray-900 mb-2'>Requirements</h4>
							<ul className='space-y-1'>
								{callForPapersData.submissionGuidelines.requirements.map((requirement, index) => (
									<li key={index}>• {requirement}</li>
								))}
							</ul>
						</div>
					</div>
				</div>

				{/* CTA Section */}
				<div className='text-center'>
					<div className='bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-white'>
						<h3 className='text-2xl font-bold mb-4'>{callForPapersData.callToAction.title}</h3>
						<p className='text-blue-100 mb-6'>{callForPapersData.callToAction.description}</p>
						<div className='flex flex-col sm:flex-row gap-4 justify-center'>
							{callForPapersData.callToAction.buttons.map((button, index) => (
								<button
									key={index}
									className={
										button.type === 'primary'
											? 'bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 transition duration-200'
											: 'border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition duration-200'
									}>
									{button.text}
								</button>
							))}
						</div>
					</div>
				</div>

				{/* Contact Information */}
				<div className='mt-8 text-center'>
					<p className='text-gray-600'>
						{callForPapersData.contact.message}{' '}
						<a
							href={`mailto:${callForPapersData.contact.email}`}
							className='text-blue-600 hover:text-blue-800 font-medium'>
							{callForPapersData.contact.email}
						</a>
					</p>
				</div>
			</div>
		</section>
	);
};

export default CallForPapers;
