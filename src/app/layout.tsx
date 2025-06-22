import type { Metadata } from 'next';
import { IBM_Plex_Sans, IBM_Plex_Serif, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import { SessionProvider } from 'next-auth/react';
import Provider from './provider';
import { auth } from '../../auth';
import { Session } from 'next-auth';
import { Toaster } from '@/components/ui/sonner';

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

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();
	return (
		<html lang='en'>
			<body
				suppressHydrationWarning={true}
				className={`${ibmPlexSans.variable} ${ibmPlexSerif.variable} ${ibmPlexMono.variable} font-sans antialiased bg-white`}>
				<Provider>
					<SessionProvider>
						<main className='flex flex-col items-center justify-center w-full mx-auto min-h-screen'>
							<header className='sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm'>
								<NavigationBar session={session as Session} />
							</header>
							<section className='flex flex-col items-center justify-start w-full max-w-7xl flex-grow'>
								{children}
							</section>
						</main>
						<Footer />
						<Toaster />
					</SessionProvider>
				</Provider>
			</body>
		</html>
	);
}
