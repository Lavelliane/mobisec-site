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
		{ label: 'Post Publication', href: '/post-publication' },
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
				<div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'>
					{/* Logo and Conference Info */}
					<div className='flex flex-col md:items-start items-center justify-center md:text-left text-center gap-1'>
						<Image
							src='/assets/logo/mobisec-logo-v2-white-nobg.png'
							alt='MobiSec Logo White'
							width={150}
							height={150}
							className='h-20 md:h-24 w-fit'
						/>
						<div>
							<h3 className='text-lg font-semibold text-sail-100'>MobiSec 2025</h3>
							<p className='text-sm text-sail-200'>The 9th International Conference on Mobile Internet Security</p>
						</div>
					</div>
					<div className='grid grid-cols-2 sm:grid-cols-3 gap-8 mb-8 w-full'>
						{/* About Links */}
						<div className='w-full'>
							<h4 className='font-semibold text-sail-100 mb-4'>About</h4>
							<ul className='space-y-2'>
								{footerLinks.about.map((link) => (
									<li key={link.label}>
										<Link
											href={link.href}
											className='text-sm text-sail-300 hover:text-sail-200 transition-colors'>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>

						{/* Program Links */}
						<div>
							<h4 className='font-semibold text-sail-100 mb-4'>Program</h4>
							<ul className='space-y-2'>
								{footerLinks.program.map((link) => (
									<li key={link.label}>
										<Link
											href={link.href}
											className='text-sm text-sail-300 hover:text-sail-200 transition-colors'>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>

						{/* Attend Links */}
						<div>
							<h4 className='font-semibold text-sail-100 mb-4'>Participate</h4>
							<ul className='space-y-2'>
								{footerLinks.forAuthors.map((link) => (
									<li key={link.label}>
										<Link
											href={link.href}
											className='text-sm text-sail-300 hover:text-sail-200 transition-colors'>
											{link.label}
										</Link>
									</li>
								))}
								{footerLinks.attend.map((link) => (
									<li key={link.label}>
										<Link
											href={link.href}
											className='text-sm text-sail-300 hover:text-sail-200 transition-colors'>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>

				{/* Bottom Footer */}
				<div className='border-t border-sail-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4'>
					<p className='text-sm text-sail-400'>© 2025 MobiSec Conference. All rights reserved.</p>
					<div className='flex items-center gap-6'>
						<Link
							href='/privacy'
							className='text-sm text-sail-300 hover:text-sail-100 transition-colors'>
							Privacy Policy
						</Link>
						<Link
							href='/terms'
							className='text-sm text-sail-300 hover:text-sail-100 transition-colors'>
							Terms of Service
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
