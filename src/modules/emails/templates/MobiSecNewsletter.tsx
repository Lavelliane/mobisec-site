import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Preview,
	Section,
	Tailwind,
	Text,
} from '@react-email/components';

interface MobiSecNewsletterProps {
	recipientName?: string;
	recipientEmail?: string;
}

export const MobiSecNewsletter = ({ recipientName = 'Researcher' }: MobiSecNewsletterProps) => {
	const previewText = "You're invited to MobiSec 2025 - Mobile Internet Security Conference";

	return (
		<Html suppressHydrationWarning>
			<Head />
			<Preview>{previewText}</Preview>
			<Tailwind>
				<Body className='mx-auto my-auto bg-white px-2 font-sans'>
					<Container className='mx-auto my-[40px] max-w-[600px] rounded border border-[#eaeaea] border-solid p-[30px]'>
						{/* Header Section */}
						{/* <Section className='mt-[20px] text-center'>
							<Img
								src={`/assets/logo/mobisec-logo-v2-nobg.png`}
								width='120'
								height='auto'
								alt='MobiSec 2025'
								className='mx-auto my-0'
							/>
						</Section> */}

						{/* Main Heading */}
						<Heading className='mx-0 mt-[30px] p-0 text-center font-bold text-[28px] text-[#2563eb]'>
							MobiSec 2025
						</Heading>

						<Heading className='mx-0 mb-[30px] p-0 text-center font-normal text-[18px] text-[#374151]'>
							The 9th International Conference on Mobile Internet Security
						</Heading>

						<Hr className='mx-0 my-[26px] w-full border border-[#eaeaea] border-solid' />

						{/* Greeting */}
						<Text className='text-[16px] text-black leading-[24px] mb-[20px]'>Dear {recipientName},</Text>

						{/* Main Content */}
						<Text className='text-[16px] text-[#374151] leading-[26px] mb-[20px]'>
							We cordially invite you to participate in <strong>MobiSec 2025</strong>, where academia and industry come
							together to address the evolving challenges in mobile internet security.
						</Text>

						<Text className='text-[16px] text-[#374151] leading-[26px] mb-[20px]'>
							Join us as we explore cutting-edge research in:
						</Text>

						{/* Key Topics */}
						<Section className='mb-[25px]'>
							<Text className='text-[15px] text-[#4b5563] leading-[24px] ml-[20px] mb-[8px]'>
								• Mobile Internet Security & Privacy
							</Text>
							<Text className='text-[15px] text-[#4b5563] leading-[24px] ml-[20px] mb-[8px]'>
								• 6G Networks & Quantum Computing Security
							</Text>
							<Text className='text-[15px] text-[#4b5563] leading-[24px] ml-[20px] mb-[8px]'>
								• Generative AI Security Applications
							</Text>
							<Text className='text-[15px] text-[#4b5563] leading-[24px] ml-[20px] mb-[8px]'>
								• Emerging Cyber Security Challenges
							</Text>
						</Section>

						<Text className='text-[16px] text-[#374151] leading-[26px] mb-[25px]'>
							MobiSec 2025 aims to publish high-quality research that highlights state-of-the-art developments in mobile
							internet technologies and cyber security applications.
						</Text>

						{/* Call to Action */}
						<Section className='mt-[30px] mb-[30px] text-center'>
							<Button
								className='rounded bg-[#2563eb] px-8 py-4 text-center font-semibold text-[16px] text-white no-underline hover:bg-[#1d4ed8]'
								href='#'>
								Learn More & Submit Papers
							</Button>
						</Section>

						{/* Additional Info */}
						<Text className='text-[14px] text-[#6b7280] leading-[22px] text-center mb-[20px]'>
							Be part of the conversation that shapes the future of mobile internet security.
						</Text>

						<Hr className='mx-0 my-[26px] w-full border border-[#eaeaea] border-solid' />

						{/* Footer */}
						<Text className='text-[#9ca3af] text-[12px] leading-[20px] text-center'>
							MobiSec 2025 Conference
							<br />
							Mobile Internet Security & Cyber Security Research
						</Text>

						<Text className='text-[#9ca3af] text-[12px] leading-[20px] text-center mt-[15px]'>
							If you no longer wish to receive these updates, you can unsubscribe at any time.
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

MobiSecNewsletter.PreviewProps = {
	recipientName: 'Dr. Smith',
	recipientEmail: 'dr.smith@university.edu',
} as MobiSecNewsletterProps;

export default MobiSecNewsletter;
