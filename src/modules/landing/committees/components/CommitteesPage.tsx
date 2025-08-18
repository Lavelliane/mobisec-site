import React from 'react';

interface CommitteeMember {
	name: string;
	affiliation: string;
}

interface Committee {
	title: string;
	members: CommitteeMember[];
}

const CommitteeMemberCard = ({ member }: { member: CommitteeMember }) => (
	<div className='flex items-center space-x-3 py-3 w-full max-w-sm lg:max-w-xs xl:max-w-sm'>
		<div className='w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
			<span className='text-primary font-medium text-xs sm:text-sm'>
				{member.name
					.split(' ')
					.map((n) => n[0])
					.join('')
					.substring(0, 2)}
			</span>
		</div>
		<div className='min-w-0 flex-1'>
			<h4 className='font-semibold text-foreground text-sm sm:text-base leading-tight'>{member.name}</h4>
			<p className='text-xs sm:text-sm text-muted-foreground leading-tight mt-1'>{member.affiliation}</p>
		</div>
	</div>
);

const CommitteesPage = () => {
	const committees: Committee[] = [
		{
			title: 'Honorary Chairs',
			members: [
				{ name: 'Fang-Yie Leu', affiliation: 'ThungHai University, Taiwan' },
				{ name: 'Kouichi Sakurai', affiliation: 'Kyushu University, Japan' },
			],
		},
		{
			title: 'Steering Chairs',
			members: [
				{ name: 'Koji Nakao', affiliation: 'NICT and Yokohama National University, Japan' },
				{ name: 'Ilsun You', affiliation: 'Kookmin University, South Korea' },
			],
		},
		{
			title: 'General Chairs',
			members: [
				{ name: 'Kiwook Sohn', affiliation: 'Seoul National University of Science & Technology, South Korea' },
				{ name: 'Goichiro Hanaoka', affiliation: 'AIST, Japan' },
			],
		},
		{
			title: 'Program Chairs',
			members: [
				{ name: 'Hwankuk Kim', affiliation: 'Kookmin University, South Korea' },
				{ name: 'Seonghan Shin', affiliation: 'AIST, Japan' },
				{ name: 'Antonio Skarmeta', affiliation: 'University of Murcia, Spain' },
			],
		},
		{
			title: 'Local Arrangement Chairs',
			members: [
				{ name: 'Bonam Kim', affiliation: 'Kookmin University, South Korea' },
				{ name: 'Hyungrok Jo', affiliation: 'Yokohama National University, Japan' },
			],
		},
	];

	return (
		<div className='py-8 sm:py-12 px-4'>
			<div className='max-w-4xl mx-auto'>
				<div className='flex flex-col items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12'>
					<h1 className='text-3xl sm:text-4xl font-bold text-foreground text-center'>Committees</h1>
					<h2 className='text-lg sm:text-xl text-muted-foreground text-center px-4 sm:px-0'>
						MobiSec 2025 Conference Organization
					</h2>
				</div>

				{/* Organizational Information */}
				<div className='flex flex-col sm:flex-row gap-4 sm:gap-6 pb-6 sm:pb-8 mb-6 sm:mb-8'>
					<div className='text-center flex-1'>
						<h4 className='text-xl sm:text-2xl font-semibold text-foreground mb-2'>Organized by</h4>
						<p className='text-sm sm:text-base text-gray-700 text-center leading-relaxed px-4 sm:px-0'>
							KIISC Research Group on 6G Security <br /> Electronics and Telecommunications Research Institute (ETRI)
						</p>
					</div>
					<div className='text-center flex-1'>
						<h4 className='text-xl sm:text-2xl font-semibold text-foreground mb-2'>Hosted by</h4>
						<p className='text-sm sm:text-base text-gray-700 text-center leading-relaxed px-4 sm:px-0'>
							Korea Institute of Information Security and Cryptology (KIISC)
						</p>
					</div>
				</div>

				<div className='flex flex-col gap-6 sm:gap-8'>
					{committees.map((committee, index) => (
						<div key={index}>
							<h2 className='text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 border-b border-gray-200 pb-2'>
								{committee.title}
							</h2>
							<div className='flex flex-col sm:flex-row sm:flex-wrap lg:justify-around justify-start gap-3 sm:gap-4'>
								{committee.members.map((member, memberIndex) => (
									<CommitteeMemberCard
										key={memberIndex}
										member={member}
									/>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CommitteesPage;
