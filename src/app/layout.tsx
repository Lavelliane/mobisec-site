import type { Metadata } from 'next';
import { IBM_Plex_Sans, IBM_Plex_Serif, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import NavigationBar from '@/_components/NavigationBar';
const ibmPlexSans = IBM_Plex_Sans({
	variable: '--font-ibm-plex-sans',
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700'],
});

const ibmPlexSerif = IBM_Plex_Serif({
	variable: '--font-ibm-plex-serif',
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700'],
});

const ibmPlexMono = IBM_Plex_Mono({
	variable: '--font-ibm-plex-mono',
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
	title: 'Xylvir Assets Management',
	description: 'An AI-powered asset manager for your UI and diagrams',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				suppressHydrationWarning={true}
				className={`${ibmPlexSans.variable} ${ibmPlexSerif.variable} ${ibmPlexMono.variable} font-sans antialiased`}>
				<main className='flex flex-col items-center justify-center max-w-6xl w-full mx-auto'>
					<header className='sticky top-0 z-50 w-full'>
						<NavigationBar />
					</header>
					<section className='flex flex-col items-center justify-center w-full'>{children}</section>
				</main>
			</body>
		</html>
	);
}
