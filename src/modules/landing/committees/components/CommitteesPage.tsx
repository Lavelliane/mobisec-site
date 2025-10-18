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
	<div className='flex items-center space-x-3 py-3 w-full max-w-sm lg:max-w-xs xl:max-w-xs'>
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
				{ name: 'Il Yeon Cho', affiliation: 'ETRI, South Korea' },
				{ name: 'Fang-Yie Leu', affiliation: 'Tunghai University, Taiwan' },
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
				{ name: 'Jeong Nye Kim', affiliation: 'ETRI, South Korea' },
			],
		},
		{
			title: 'Program Committee Chairs',
			members: [
				{ name: 'Hwankuk Kim', affiliation: 'Kookmin University, South Korea' },
				{ name: 'SeongHan Shin', affiliation: 'AIST, Japan' },
				{ name: 'Antonio Skarmeta', affiliation: 'University of Murcia, Spain' },
			],
		},
		{
			title: 'Program Committee',
			members: [
				{ name: 'Ramón Alcarria', affiliation: 'Universidad Politécnica de Madrid, Spain' },
				{ name: 'Pelin Angin', affiliation: 'Middle East Technical University, Republic of Türkiye' },
				{ name: 'Ram Basnet', affiliation: 'Colorado Mesa University, USA' },
				{ name: 'Daniele Bringhenti', affiliation: 'The Polytechnic University of Turin, Italy' },
				{ name: 'Yuanlong Cao', affiliation: 'Jiangxi Normal University, China' },
				{ name: 'Gaurav Choudhary', affiliation: 'University of Southern Denmark, Denmark' },
				{ name: 'Yu-Fang Chung', affiliation: 'Tunghai University, Taiwan' },
				{ name: 'Baojiang Cui', affiliation: 'BUPT, China' },
				{ name: 'Steven Duong', affiliation: 'University of Wollongong, Australia' },
				{ name: 'Jianfeng Guan', affiliation: 'BUPT, China' },
				{ name: 'Shoichi Hirose', affiliation: 'University of Fukui, Japan' },
				{ name: 'Huisu Jang', affiliation: 'Soongsil University, South Korea' },
				{ name: 'Sanghoon Jeon', affiliation: 'Kookmin University, South Korea' },
				{ name: 'Anuchit Jitpattanakul', affiliation: 'KMUTNB, Thailand' },
				{ name: 'Jongkil Kim', affiliation: 'Ewha Womans University, South Korea' },
				{ name: 'Taeguen Kim', affiliation: 'Korea University, South Korea' },
				{ name: 'Youngsoo Kim', affiliation: 'ETRI, South Korea' },
				{ name: 'Dowon Kim', affiliation: 'KISA, South Korea' },
				{ name: 'Hyun Kwon', affiliation: 'Korea Militaray Academy, South Korea' },
				{ name: 'Mun-Kyu Lee', affiliation: 'Inha University, South Korea' },
				{ name: 'C. Mala', affiliation: 'National Institute of Technology, Tiruchirapalli, India' },
				{ name: 'Sakorn Mekruksavanich', affiliation: 'University of Phayao, Thailand' },
				{ name: 'Alessio Merlo', affiliation: 'CASD, School of Advanced Defense Studies, Italy' },
				{ name: 'Moohong Min', affiliation: 'SKKU, South Korea' },
				{ name: 'Hoonyong Park', affiliation: 'AUTOCRYPT, South Korea' },
				{ name: 'Seongmin Park', affiliation: 'KISA, South Korea' },
				{ name: 'Marek Pawlicki', affiliation: 'Bydgoszcz University of Science and Technology, Poland' },
				{ name: 'SeogChung Seo', affiliation: 'Kookmin University, South Korea' },
				{ name: 'DaeMin Shin', affiliation: 'Financial Security Institute, South Korea' },
				{ name: 'Kunwar Singh', affiliation: 'NIT Trichy, India' },
				{ name: 'Toi Tomita', affiliation: 'Yokohama National University, Japan' },
				{ name: 'Kunlin Tsai', affiliation: 'Tunghai University, Taiwan' },
				{ name: 'Noriki Uchida', affiliation: 'Fukuoka Institute of Technology, Japan' },
				{ name: 'Sang Uk Shin', affiliation: 'Pukyong National University, South Korea' },
				{ name: 'Fulvio Valenza', affiliation: 'Polytechnic University of Turin, Italy' },
				{ name: 'Luca Verderame', affiliation: 'DIBRIS - University of Genova, Italy' },
				{ name: 'Elena Vlahu-Gjorgievska', affiliation: 'University of Wollongong, Australia' },
				{ name: 'Yohei Watanabe', affiliation: 'The University of Electo-Communications, Japan' },
				{ name: 'Jie Xu', affiliation: 'BUPT, China' },
				{ name: 'Akihiro Yamamura', affiliation: 'Akita University, Japan' },
				{ name: 'Toshihiro Yamauchi', affiliation: 'Okayama University, Japan' },
				{ name: 'Baokang Zhao', affiliation: 'NUDT, China' },
			],
		},
		{
			title: 'Poster Chairs',
			members: [
				{ name: 'Jiyoon Kim', affiliation: 'Gyeongsang National University, South Korea' },
				{ name: 'Il-Gu Lee', affiliation: 'Sungshin Women\'s University, South Korea' },
				{ name: 'Jungsoo Park', affiliation: 'Kangnam University, South Korea' },
			],
		},
		{
			title: 'Workshop Chairs',
			members: [
				{ name: 'Shingo Sato', affiliation: 'Yokohama National University, Japan' },
				{ name: 'Jong-Geun Park', affiliation: 'ETRI, South Korea' },
				{ name: 'Taek-Young Youn', affiliation: 'Dankook University, South Korea' },
			],
		},
		{
			title: 'Special Session Chairs',
			members: [
				{ name: 'Yuta Kodera', affiliation: 'Okayama University, Japan' },
				{ name: 'Ki-Woong Park', affiliation: 'Sejong University, South Korea' },
			],
		},
		{
			title: 'Local Arrangement Chairs',
			members: [
				{ name: 'Hyungrok Jo', affiliation: 'Yokohama National University, Japan' },
				{ name: 'Bonam Kim', affiliation: 'Kookmin University, South Korea' },
			],
		},
		{
			title: 'International Liaison Chairs',
			members: [
				{ name: 'Yuntao Wang', affiliation: 'The University of Electro-Communications, Japan' },
				{ name: 'Karl Andersson', affiliation: 'Luleå University of Technology, Sweden' },
			],
		},
		{
			title: 'Publicity Chairs',
			members: [
				{ name: 'Kuo-Hui Yeh', affiliation: 'National Yang Ming Chiao Tung University, Taiwan' },
				{ name: 'Su Hyun Kim', affiliation: 'SoonChunHyang University, South Korea' },
			],
		},
		{
			title: 'Publication Chair',
			members: [
				{ name: 'Philip Astilo', affiliation: 'University of San Carlos, Philippines' },
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
