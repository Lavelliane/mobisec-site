import React from 'react';

const page = () => {
	return (
		<div className='min-h-screen py-12 px-4'>
			<div className='max-w-4xl mx-auto'>
				<div className='flex flex-col items-center justify-center mb-12'>
					<h1 className='text-4xl font-bold text-foreground text-center'>Overview</h1>
				</div>

				<div className='prose max-w-none'>
					<p className='text-lg text-gray-700 leading-relaxed'>
						During the past two decades, mobile internet technologies have been dramatically growing while leading to a
						paradigm shift in our life. Despites their revolution, mobile internet technologies open doors to various
						security threats, which should be addressed to keep mobile Internet environments to be secure and trust.
						<br />
						<br />
						Even worse, the latest technologies (e.g., 6G Networks, Quantum Computing, Generative AI, and so forth)
						continuously have introduced new security challenges. Therefore, it is of paramount importance to study
						mobile internet security.
						<br />
						<br />
						The purpose of MobiSec 2025 is to bring together the academic and industry working on different aspects,
						exchange ideas, and explore new research directions for addressing the challenges in mobile internet
						security and application of cyber security.
						<br />
						<br />
						MobiSec 2025 also aims to publish high quality papers, which are closely related to various theories and
						practical applications in mobile internet and cyber security to highlight the state-of-art research. In
						spite of focusing on security aspects, this conference welcomes papers which are related to mobile internet
						technologies and emerging issues in cyber space.
						<br />
						<br />
						We expect that MobiSec 2025 will be a trigger for further research and technology improvements related to
						this important subject.
					</p>
				</div>
			</div>
		</div>
	);
};

export default page;
