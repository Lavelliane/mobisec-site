import React from 'react';

const OverviewPage = () => {
	return (
		<div className='py-8 sm:py-12 px-4'>
			<div className='max-w-4xl mx-auto'>
				<div className='flex flex-col items-center justify-center mb-8 sm:mb-12'>
					<h1 className='text-3xl sm:text-4xl font-bold text-foreground text-center'>Overview</h1>
				</div>

				<div className='prose prose-sm sm:prose-base lg:prose-lg max-w-none'>
					<div className='text-base sm:text-lg text-gray-700 leading-relaxed space-y-4 sm:space-y-6'>
						<p>
							During the past two decades, mobile internet technologies have been dramatically growing while leading to
							a paradigm shift in our life. Despite their revolution, mobile internet technologies open doors to various
							security threats, which should be addressed to keep mobile Internet environments to be secure and trust.
						</p>

						<p>
							Even worse, the latest technologies (e.g., 6G Networks, Quantum Computing, Generative AI, and so forth)
							continuously have introduced new security challenges. Therefore, it is of paramount importance to study
							mobile internet security.
						</p>

						<p>
							The purpose of MobiSec 2025 is to bring together the academic and industry working on different aspects,
							exchange ideas, and explore new research directions for addressing the challenges in mobile internet
							security and application of cyber security.
						</p>

						<p>
							MobiSec 2025 also aims to publish high quality papers, which are closely related to various theories and
							practical applications in mobile internet and cyber security to highlight the state-of-art research. In
							spite of focusing on security aspects, this conference welcomes papers which are related to mobile
							internet technologies and emerging issues in cyber space.
						</p>

						<p>
							We expect that MobiSec 2025 will be a trigger for further research and technology improvements related to
							this important subject.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OverviewPage;
