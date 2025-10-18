import React from 'react';

const ProceedingsPage = () => {
	return (
		<div className='min-h-screen py-12 px-4'>
			<div className='max-w-4xl mx-auto'>
				<div className='flex flex-col items-center justify-center mb-12'>
					<h1 className='text-4xl font-bold text-foreground text-center mb-8'>
						MobiSec 2024 Conference Proceedings
					</h1>
					<div className='text-center'>
						<a
							href='https://link.springer.com/book/10.1007/978-981-95-0172-4'
							target='_blank'
							rel='noopener noreferrer'
							className='inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200'
						>
							Mobile Internet Security - The 8th International Conference, MobiSec 2024, Sapporo, Japan, December 17–19, 2024, Revised Selected Papers
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProceedingsPage;
