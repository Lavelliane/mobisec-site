'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const footerLinks = {
	about: [
		{ label: 'Overview', href: '/overview' },
		{ label: 'About Us', href: '/about' },
		{ label: 'Committees', href: '/committees' },
		{ label: 'Previous Events', href: '/previous-events' },
	],
	forAuthors: [
		{ label: 'Author Instructions', href: '/author-instruction' },
		{ label: 'Fast Publication', href: '/fast-publication' },
	],
	program: [
		{ label: 'Program Schedule', href: '/program' },
		{ label: 'Keynotes', href: '/keynotes' },
		{ label: 'Special Sessions', href: '/special-sessions' },
		{ label: 'Workshops', href: '/workshops' },
	],
	attend: [
		{ label: 'Registration', href: '/registration' },
		{ label: 'Contact', href: '/contact' },
	],
};

const Footer = () => {
	return (
		<footer className='w-full bg-secondary-foreground text-white border-t border-sail-800'>
			<div className='max-w-7xl mx-auto px-4 py-12'>
				{/* Main Footer Content */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8'>
					{/* Logo and Conference Info */}
					<div className='lg:col-span-2 space-y-4'>
						<div className='flex items-center gap-4'>
							<Image
								src='/assets/mobisec-logo-white.png'
								alt='MobiSec Logo White'
								width={100}
								height={100}
								className='h-12 w-fit filter-invert'
							/>
							<div>
								<h3 className='text-lg font-semibold text-sail-100'>MobiSec 2025</h3>
								<p className='text-sm text-sail-300'>
									The 9th IFIP WG 8.4/KIISC International Conference
									<br />
									on Mobile Internet Security
								</p>
							</div>
						</div>
					</div>

					{/* About Links */}
					<div>
						<h4 className='font-semibold text-sail-200 mb-4'>About</h4>
						<ul className='space-y-2'>
							{footerLinks.about.map((link) => (
								<li key={link.label}>
									<Link
										href={link.href}
										className='text-sm text-sail-400 hover:text-sail-200 transition-colors'>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Program Links */}
					<div>
						<h4 className='font-semibold text-sail-200 mb-4'>Program</h4>
						<ul className='space-y-2'>
							{footerLinks.program.map((link) => (
								<li key={link.label}>
									<Link
										href={link.href}
										className='text-sm text-sail-400 hover:text-sail-200 transition-colors'>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Attend Links */}
					<div>
						<h4 className='font-semibold text-sail-200 mb-4'>Participate</h4>
						<ul className='space-y-2'>
							{footerLinks.forAuthors.map((link) => (
								<li key={link.label}>
									<Link
										href={link.href}
										className='text-sm text-sail-400 hover:text-sail-200 transition-colors'>
										{link.label}
									</Link>
								</li>
							))}
							{footerLinks.attend.map((link) => (
								<li key={link.label}>
									<Link
										href={link.href}
										className='text-sm text-sail-400 hover:text-sail-200 transition-colors'>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Bottom Footer */}
				<div className='border-t border-sail-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4'>
					<p className='text-sm text-sail-400'>© 2025 MobiSec Conference. All rights reserved.</p>
					<div className='flex items-center gap-6'>
						<Link
							href='/privacy'
							className='text-sm text-sail-400 hover:text-sail-200 transition-colors'>
							Privacy Policy
						</Link>
						<Link
							href='/terms'
							className='text-sm text-sail-400 hover:text-sail-200 transition-colors'>
							Terms of Service
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
