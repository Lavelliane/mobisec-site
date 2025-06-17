import type { Metadata } from 'next';
import { IBM_Plex_Sans, IBM_Plex_Serif, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';

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
	title: 'MobiSec 2025',
	description: 'MobiSec Conference 2025',
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
				className={`${ibmPlexSans.variable} ${ibmPlexSerif.variable} ${ibmPlexMono.variable} font-sans antialiased bg-sail-900`}>
				<main className='flex flex-col items-center justify-center w-full mx-auto min-h-screen'>
					<header className='sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm'>
						<NavigationBar />
					</header>
					<section className='flex flex-col items-center justify-center w-full max-w-7xl flex-grow'>{children}</section>
					<Footer />
				</main>
			</body>
		</html>
	);
}
