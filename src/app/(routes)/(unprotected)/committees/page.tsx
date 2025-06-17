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
	<div className='flex items-center space-x-3 py-3'>
		<div className='w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
			<span className='text-primary font-medium text-sm'>
				{member.name
					.split(' ')
					.map((n) => n[0])
					.join('')
					.substring(0, 2)}
			</span>
		</div>
		<div>
			<h4 className='font-semibold text-foreground'>{member.name}</h4>
			<p className='text-sm text-muted-foreground'>{member.affiliation}</p>
		</div>
	</div>
);

const page = () => {
	const committees: Committee[] = [
		{
			title: 'Steering Chairs',
			members: [
				{ name: 'Fang-Yie Leu', affiliation: 'ThungHai University, Taiwan' },
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
				{ name: 'Antonio Skarmeta', affiliation: 'University of Murcia, Spain' },
			],
		},
	];

	return (
		<div className='container mx-auto py-12 px-4'>
			<div className='max-w-4xl mx-auto'>
				<div className='flex flex-col items-center justify-center gap-4 mb-12'>
					<h1 className='text-4xl font-bold text-foreground text-center'>Committees</h1>
					<h2 className='text-xl text-muted-foreground text-center'>MobiSec 2025 Conference Organization</h2>
				</div>

				{/* Organizational Information */}
				<div className='flex flex-row gap-6 border-gray-200 pb-8'>
					<div className='text-center flex-1'>
						<h4 className='text-2xl font-semibold text-foreground'>Organized by</h4>
						<p className='text-gray-700 text-center leading-relaxed'>KIISC Research Group on 6G Security</p>
					</div>
					<div className='text-center flex-1'>
						<h4 className='text-2xl font-semibold text-foreground'>Hosted by</h4>
						<p className='text-gray-700 text-center leading-relaxed'>
							Korea Institute of Information Security <br /> and Cryptology (KIISC) IFIP Working Group 8.4
						</p>
					</div>
				</div>

				<div className='flex flex-col gap-8'>
					{committees.map((committee, index) => (
						<div key={index}>
							<h2 className='text-xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-2'>{committee.title}</h2>
							<div className='flex flex-col gap-2'>
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

export default page;
