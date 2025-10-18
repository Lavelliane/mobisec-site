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

interface CustomEmailProps {
	recipientName?: string;
	recipientEmail?: string;
	customSubject: string;
	customBody: string;
}

const baseUrl = process.env.BASE_URL ? `https://${process.env.BASE_URL}` : '';

export const CustomEmail = ({
	recipientName = 'Researcher',
	recipientEmail,
	customSubject,
	customBody,
}: CustomEmailProps) => {
	const previewText = customSubject;

	return (
		<Html suppressHydrationWarning>
			<Head />
			<Preview>{previewText}</Preview>
			<Tailwind>
				<Body className='mx-auto my-auto bg-white px-2 font-sans'>
					<Container className='mx-auto my-[40px] max-w-[600px] rounded border border-[#eaeaea] border-solid p-[30px]'>
						{/* Header Section */}
						<Section className='mt-[20px] text-center'>
							<Img
								src={`${baseUrl}/static/mobisec-logo-v2-nobg.png`}
								width='120'
								height='auto'
								alt='MobiSec Conference'
								className='mx-auto my-0'
							/>
						</Section>

						{/* Main Heading */}
						<Heading className='mx-0 p-0 text-center font-bold text-[28px] text-[#2563eb]'>MobiSec 2025</Heading>

						<Heading className='mx-0 mb-[30px] p-0 text-center font-normal text-[18px] text-[#374151]'>
							The 9th International Conference on Mobile Internet Security
						</Heading>

						<Hr className='mx-0 my-[26px] w-full border border-[#eaeaea] border-solid' />

						{/* Greeting */}
						<Text className='text-[16px] text-black leading-[24px] mb-[20px]'>Dear {recipientName},</Text>

						{/* Custom Content */}
						<Section className='mb-[25px]'>
							{customBody.split('\n').map((paragraph, index) => (
								<Text
									key={index}
									className='text-[16px] text-[#374151] leading-[26px] mb-[20px]'>
									{paragraph}
								</Text>
							))}
						</Section>

						{/* Call to Action */}
						<Section className='mt-[30px] mb-[30px] text-center'>
							<Button
								className='rounded bg-[#2563eb] px-8 py-4 text-center font-semibold text-[16px] text-white no-underline hover:bg-[#1d4ed8]'
								href='#'>
								Learn More
							</Button>
						</Section>

						<Hr className='mx-0 my-[26px] w-full border border-[#eaeaea] border-solid' />

						{/* Footer */}
						<Text className='text-[#9ca3af] text-[12px] leading-[20px] text-center'>
							MobiSec Conference
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

CustomEmail.PreviewProps = {
	recipientName: 'Dr. Smith',
	recipientEmail: 'dr.smith@university.edu',
	customSubject: 'Important Conference Update',
	customBody: 'This is a sample custom email body.\n\nIt supports multiple paragraphs and line breaks.',
} as CustomEmailProps;

export default CustomEmail;
