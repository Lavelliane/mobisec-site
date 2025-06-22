'use client';
import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import SignOut from '@/app/action/sign-out';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useRouter } from 'next/navigation';
import { Session } from 'next-auth';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

const navigationCategories = [
	{
		label: 'Home',
		href: '/',
		isStandalone: true,
	},
	{
		label: 'About',
		items: [
			{ label: 'Overview', href: '/overview', description: 'Learn about our conference and mission' },
			{ label: 'Committees', href: '/committees', description: 'View our organizing committees' },
			{ label: 'Previous Events', href: '/previous-events', description: 'Browse past conference events' },
		],
	},
	{
		label: 'For Authors',
		items: [
			{ label: 'Author Instructions', href: '/author-instruction', description: 'Guidelines for paper submission' },
			{ label: 'Post Publication', href: '/post-publication', description: 'Post-publication process', disabled: true },
		],
	},
	{
		label: 'Program',
		items: [
			{
				label: 'Program Schedule',
				href: '/program',
				description: 'View the complete conference schedule',
				disabled: true,
			},
			{
				label: 'Keynotes',
				href: '/keynotes',
				description: 'Featured keynote speakers and presentations',
				disabled: true,
			},
			{
				label: 'Special Sessions',
				href: '/special-sessions',
				description: 'Specialized conference sessions',
				disabled: true,
			},
			{ label: 'Workshops', href: '/workshops', description: 'Interactive workshop sessions', disabled: true },
			{
				label: 'Lifetime Achievement Award',
				href: '/lifetime-achievement-award',
				description: 'Honoring outstanding contributions',
				disabled: true,
			},
		],
	},
	{
		label: 'Events',
		href: '/events',
		disabled: true,
		isStandalone: true,
	},
	{
		label: 'Registration',
		href: '/registration',
		disabled: true,
		isStandalone: true,
	},
	{
		label: 'Contact Us',
		href: '/contact',
		disabled: true,
		isStandalone: true,
	},
];

function ListItem({
	title,
	children,
	href,
	disabled,
	...props
}: React.ComponentPropsWithoutRef<'li'> & { href: string; disabled?: boolean }) {
	return (
		<li {...props}>
			<NavigationMenuLink asChild>
				<Link
					href={disabled ? '#' : href}
					className={`block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
						disabled ? 'opacity-50 cursor-not-allowed' : ''
					}`}>
					<div className='text-sm font-medium leading-none'>{title}</div>
					<p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>{children}</p>
				</Link>
			</NavigationMenuLink>
		</li>
	);
}

function MobileNavItem({
	title,
	href,
	disabled,
	onClick,
}: {
	title: string;
	href: string;
	disabled?: boolean;
	onClick: () => void;
}) {
	return (
		<Link
			href={disabled ? '#' : href}
			onClick={onClick}
			className={`block px-4 py-3 text-sm font-medium border-b border-gray-200 hover:bg-gray-50 transition-colors ${
				disabled ? 'opacity-50 cursor-not-allowed text-gray-400' : 'text-gray-700'
			}`}>
			{title}
		</Link>
	);
}

const NavigationBar = ({ session }: { session: Session }) => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const router = useRouter();

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
	};

	const isAdmin = true;

	const handleSignIn = useCallback(() => {
		return (
			<>
				{session?.user ? (
					<div className='flex flex-row items-center gap-2'>
						{!isAdmin && (
							<Button
								variant='ghost'
								className='hover:bg-gray-600'
								onClick={() => {
									router.push('/profile');
								}}>
								<Avatar>
									<AvatarImage
										src={session.user?.image || ''}
										alt={session.user?.name || ''}
									/>
									<AvatarFallback>{session.user?.name?.charAt(0)}</AvatarFallback>
								</Avatar>
								<p className='text-sm text-white'>{session.user?.name}</p>
							</Button>
						)}

						{isAdmin && (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant='ghost'
										className='hover:bg-gray-600 flex items-center gap-2'>
										<Avatar>
											<AvatarImage
												src={session.user?.image || ''}
												alt={session.user?.name || ''}
											/>
											<AvatarFallback>{session.user?.name?.charAt(0)}</AvatarFallback>
										</Avatar>
										<p className='text-sm text-white'>{session.user?.name}</p>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align='end'>
									<DropdownMenuItem asChild>
										<Link href='/profile'>Profile</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<Link href='/emails'>Emails</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<Link href='/events'>Events</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<Link href='/registration'>Registrations</Link>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						)}

						<Button
							type='submit'
							className='self-end'
							variant='secondary'
							onClick={() => {
								SignOut();
							}}>
							Sign Out
						</Button>
					</div>
				) : (
					<Button
						className='self-end'
						variant='secondary'>
						<Link href='/sign-in'>Sign In</Link>
					</Button>
				)}
			</>
		);
	}, [session, isAdmin, router]);

	return (
		<div className='flex flex-col justify-between w-full'>
			{/* Header Section */}
			<div className='h-fit w-full flex items-center justify-between md:gap-4 gap-0 max-w-7xl mx-auto md:py-4 py-2 px-4'>
				<div className='flex flex-row items-center gap-2'>
					<Image
						src='/assets/logo/mobisec-logo-v2-nobg.png'
						alt='MobiSec Logo'
						width={150}
						height={150}
						className='h-12 md:h-16 w-fit'
					/>
					<h2 className='text-xl md:text-5xl font-bold'>MobiSec 2025</h2>
				</div>
				<div className='hidden md:block'>
					<h4 className='text-sm md:text-lg font-semibold text-end'>
						The 9th International Conference
						<br />
						on Mobile Internet Security
					</h4>
				</div>

				{/* Mobile Menu Button */}
				<Button
					variant='ghost'
					size='sm'
					className='md:hidden'
					onClick={toggleMobileMenu}
					aria-label='Toggle mobile menu'>
					<svg
						className='w-6 h-6'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'>
						{isMobileMenuOpen ? (
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M6 18L18 6M6 6l12 12'
							/>
						) : (
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M4 6h16M4 12h16M4 18h16'
							/>
						)}
					</svg>
				</Button>
			</div>

			{/* Mobile Conference Title */}
			<div className='md:hidden px-4 pb-2'>
				<h4 className='text-xs font-semibold text-center text-gray-600'>
					The 9th International Conference on Mobile Internet Security
				</h4>
			</div>

			{/* Desktop Navigation */}
			<div className='hidden md:block w-full py-2 border-primary/20 bg-primary text-primary-foreground'>
				<div className='max-w-7xl mx-auto flex flex-row items-center justify-between gap-4'>
					<NavigationMenu>
						<NavigationMenuList>
							{navigationCategories.map((category) => {
								if (category.isStandalone) {
									return (
										<NavigationMenuItem key={category.label}>
											<NavigationMenuLink
												asChild
												className={navigationMenuTriggerStyle()}>
												<Link href={category.href!}>{category.label}</Link>
											</NavigationMenuLink>
										</NavigationMenuItem>
									);
								}

								return (
									<NavigationMenuItem key={category.label}>
										<NavigationMenuTrigger>{category.label}</NavigationMenuTrigger>
										<NavigationMenuContent>
											<ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
												{category.items?.map((item) => (
													<ListItem
														key={item.label}
														title={item.label}
														disabled={item.disabled}
														href={item.href}>
														{item.description}
													</ListItem>
												))}
											</ul>
										</NavigationMenuContent>
									</NavigationMenuItem>
								);
							})}
						</NavigationMenuList>
					</NavigationMenu>
					{handleSignIn()}
				</div>
			</div>

			{/* Mobile Navigation Menu */}
			{isMobileMenuOpen && (
				<div className='md:hidden bg-white border-t border-gray-200 shadow-lg'>
					<div className='max-h-96 overflow-y-auto'>
						{/* Authentication Section for Mobile */}
						<div className='border-b border-gray-200 p-4'>
							{session?.user ? (
								<div className='flex flex-col gap-3'>
									<div className='flex items-center gap-3'>
										<Avatar>
											<AvatarImage
												src={session.user?.image || ''}
												alt={session.user?.name || ''}
											/>
											<AvatarFallback>{session.user?.name?.charAt(0)}</AvatarFallback>
										</Avatar>
										<div>
											<p className='text-sm font-medium text-gray-900'>{session.user?.name}</p>
											<p className='text-xs text-gray-500'>{session.user?.email}</p>
										</div>
									</div>
									{isAdmin && (
										<div className='pl-4 space-y-2'>
											<Link
												href='/profile'
												onClick={closeMobileMenu}
												className='block text-sm text-gray-600 hover:text-gray-900'>
												Profile
											</Link>
											<Link
												href='/emails'
												onClick={closeMobileMenu}
												className='block text-sm text-gray-600 hover:text-gray-900'>
												Emails
											</Link>
											<Link
												href='/events'
												onClick={closeMobileMenu}
												className='block text-sm text-gray-600 hover:text-gray-900'>
												Events
											</Link>
											<Link
												href='/registration'
												onClick={closeMobileMenu}
												className='block text-sm text-gray-600 hover:text-gray-900'>
												Registrations
											</Link>
										</div>
									)}
									<Button
										variant='outline'
										size='sm'
										onClick={() => {
											SignOut();
											closeMobileMenu();
										}}
										className='self-start'>
										Sign Out
									</Button>
								</div>
							) : (
								<Button
									variant='default'
									size='sm'
									className='w-full'
									onClick={closeMobileMenu}>
									<Link href='/sign-in'>Sign In</Link>
								</Button>
							)}
						</div>

						{/* Navigation Categories */}
						{navigationCategories.map((category) => {
							if (category.isStandalone) {
								return (
									<MobileNavItem
										key={category.label}
										title={category.label}
										href={category.href!}
										disabled={category.disabled}
										onClick={closeMobileMenu}
									/>
								);
							}

							return (
								<div key={category.label}>
									<div className='px-4 py-3 bg-gray-50 border-b border-gray-200'>
										<h3 className='text-sm font-semibold text-gray-900'>{category.label}</h3>
									</div>
									{category.items?.map((item) => (
										<MobileNavItem
											key={item.label}
											title={item.label}
											href={item.href}
											disabled={item.disabled}
											onClick={closeMobileMenu}
										/>
									))}
								</div>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
};

export default NavigationBar;
