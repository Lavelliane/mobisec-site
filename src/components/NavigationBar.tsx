'use client';
import React, { useState } from 'react';
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
import { useRouter } from 'next/navigation';
import { Session } from '@/lib/auth';

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
			// { label: 'Author Registration', href: '/author-registration', description: 'Register as an author' },
			// { label: 'Paper Submission', href: '/paper-submission', description: 'Submit your paper' },
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
	// {
	// 	label: 'Admin',
	// 	items: [
	// 		{ label: 'Emails', href: '/emails', description: 'View and manage emails' },
	// 		{ label: 'Events', href: '/events', description: 'View and manage events' },
	// 		{ label: 'Registrations', href: '/registration', description: 'View and manage registrations' },
	// 		{ label: 'Paper Validation', href: '/paper-validation', description: 'Validate papers' },
	// 	],
	// },

	// {
	// 	label: 'Registration',
	// 	href: '/registration',
	// 	disabled: true,
	// 	isStandalone: true,
	// },
	{
		label: 'Registration Guide',
		href: '/registration-guide',
		disabled: false,
		isStandalone: true,
	},
	{
		label: 'Proceedings',
		href: '/proceedings',
		disabled: false,
		isStandalone: true,
	},
	{
		label: 'Contact Us',
		href: '/contact',
		disabled: false,
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
	isSubitem = false,
	...props
}: {
	title: string;
	href: string;
	disabled?: boolean;
	onClick: () => void;
	isSubitem?: boolean;
} & React.ComponentPropsWithoutRef<'a'>) {
	return (
		<Link
			{...props}
			href={disabled ? '#' : href}
			onClick={onClick}
			className={`${
				isSubitem ? 'ml-6' : 'ml-3'
			} block px-4 py-3 text-sm font-medium border-b border-border hover:bg-accent transition-colors ${
				disabled
					? 'opacity-50 cursor-not-allowed text-muted-foreground'
					: isSubitem
					? 'text-muted-foreground hover:text-foreground'
					: 'text-foreground'
			}`}>
			{title}
		</Link>
	);
}

const NavigationBar = ({ session }: { session: Session }) => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	console.log('session NAVBA', session);

	const router = useRouter();

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
	};

	// const isAdmin = true;

	// const handleSignIn = useCallback(() => {
	// 	return (
	// 		<>
	// 			{session?.user ? (
	// 				<div className='flex flex-row items-center gap-2'>
	// 					{!isAdmin && (
	// 						<Button
	// 							variant='ghost'
	// 							className='hover:bg-black/20'
	// 							onClick={() => {
	// 								router.push('/profile');
	// 							}}>
	// 							<Avatar>
	// 								<AvatarImage
	// 									src={session.user?.image || ''}
	// 									alt={session.user?.name || ''}
	// 								/>
	// 								<AvatarFallback>{session.user?.name?.charAt(0)}</AvatarFallback>
	// 							</Avatar>
	// 							<p className='text-sm text-white'>{session.user?.name}</p>
	// 						</Button>
	// 					)}

	// 					{isAdmin && (
	// 						<DropdownMenu>
	// 							<DropdownMenuTrigger asChild>
	// 								<Button
	// 									variant='ghost'
	// 									className='hover:bg-black/20'>
	// 									<Avatar>
	// 										<AvatarImage
	// 											src={session.user?.image || ''}
	// 											alt={session.user?.name || ''}
	// 										/>
	// 										<AvatarFallback>{session.user?.name?.charAt(0)}</AvatarFallback>
	// 									</Avatar>
	// 									<p className='text-sm text-white'>{session.user?.name}</p>
	// 								</Button>
	// 							</DropdownMenuTrigger>
	// 							<DropdownMenuContent align='end'>
	// 								<DropdownMenuItem asChild>
	// 									<Link href='/profile'>Profile</Link>
	// 								</DropdownMenuItem>
	// 								<DropdownMenuItem asChild>
	// 									<Link href='/emails'>Emails</Link>
	// 								</DropdownMenuItem>
	// 								<DropdownMenuItem asChild>
	// 									<Link href='/events'>Events</Link>
	// 								</DropdownMenuItem>
	// 								<DropdownMenuItem asChild>
	// 									<Link href='/registration'>Registrations</Link>
	// 								</DropdownMenuItem>
	// 								<DropdownMenuItem asChild>
	// 									<Link href='/paper-validation'>Paper Validation</Link>
	// 								</DropdownMenuItem>
	// 							</DropdownMenuContent>
	// 						</DropdownMenu>
	// 					)}

	// 					<Button
	// 						type='submit'
	// 						className='self-end'
	// 						variant='secondary'
	// 						onClick={async () => {
	// 							await authClient.signOut();
	// 							router.push('/');
	// 						}}>
	// 						Sign Out
	// 					</Button>
	// 				</div>
	// 			) : (
	// 				<Button
	// 					className='self-end'
	// 					variant='secondary'>
	// 					<Link href='/sign-in'>Sign In</Link>
	// 				</Button>
	// 			)}
	// 		</>
	// 	);
	// }, [session, isAdmin, router]);

	return (
		<div className='flex flex-col justify-between w-full z-999'>
			{/* Header Section */}
			<div className='h-fit w-full flex items-center justify-between md:gap-4 gap-0 max-w-7xl mx-auto md:py-4 pt-4 px-4'>
				<div
					className='flex flex-row items-center gap-2 cursor-pointer'
					onClick={() => router.push('/')}>
					<Image
						src='/assets/logo/mobisec-logo-v2-nobg.png'
						alt='MobiSec Logo'
						width={150}
						height={150}
						className='h-10 md:h-12 w-fit'
					/>
					<h2 className='text-xl md:text-4xl font-bold'>MobiSec 2025</h2>
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
			<div className='md:hidden px-4 pb-4'>
				<h4 className='text-sm font-semibold text-start text-muted-foreground'>
					The 9th International Conference on Mobile Internet Security
				</h4>
			</div>

			{/* Desktop Navigation */}
			<div className='hidden md:block w-full py-2 border-primary/20 bg-primary text-primary-foreground relative z-50'>
				<div className='max-w-7xl mx-auto flex flex-row items-center justify-between gap-4'>
					<NavigationMenu delayDuration={0} skipDelayDuration={0} viewport={false}>
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
											<ul className='grid w-[400px] gap-3 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
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
					{/* {handleSignIn()} */}
				</div>
			</div>

			{/* Mobile Navigation Menu */}
			{isMobileMenuOpen && (
				<div className='md:hidden bg-background border-t border-border shadow-lg'>
					<div className='max-h-96 overflow-y-auto'>
						{/* Authentication Section for Mobile - HIDDEN */}
						{/* <div className='border-b border-border p-4'>
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
											<p className='text-sm font-medium text-foreground'>{session.user?.name}</p>
											<p className='text-xs text-muted-foreground'>{session.user?.email}</p>
										</div>
									</div>
									{isAdmin && (
										<div className='pl-4 space-y-2'>
											<Link
												href='/profile'
												onClick={closeMobileMenu}
												className='block text-sm text-muted-foreground hover:text-foreground'>
												Profile
											</Link>
											<Link
												href='/emails'
												onClick={closeMobileMenu}
												className='block text-sm text-muted-foreground hover:text-foreground'>
												Emails
											</Link>
											<Link
												href='/events'
												onClick={closeMobileMenu}
												className='block text-sm text-muted-foreground hover:text-foreground'>
												Events
											</Link>
											<Link
												href='/registration'
												onClick={closeMobileMenu}
												className='block text-sm text-muted-foreground hover:text-foreground'>
												Registrations
											</Link>
											<Link
												href='/paper-validation'
												onClick={closeMobileMenu}
												className='block text-sm text-muted-foreground hover:text-foreground'>
												Paper Validation
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
						</div> */}

						{/* Standalone Navigation Items */}
						{(() => {
							const standaloneItems = navigationCategories.filter(category => category.isStandalone);
							return standaloneItems.map((item) => (
								<MobileNavItem
									key={item.label}
									title={item.label}
									href={item.href!}
									disabled={item.disabled}
									isSubitem={false}
									onClick={closeMobileMenu}
								/>
							));
						})()}

						{/* Navigation Categories */}
						{navigationCategories
							.filter(category => !category.isStandalone)
							.map((category) => (
								<div key={category.label}>
									<div className='px-4 py-3 bg-accent border-b border-border'>
										<h3 className='text-sm font-semibold text-foreground flex items-center'>
											<span className="inline-block w-1 h-4 bg-primary rounded-full mr-2"></span>
											{category.label}
										</h3>
									</div>
									{category.items?.map((item) => (
										<MobileNavItem
											key={item.label}
											title={item.label}
											href={item.href}
											disabled={item.disabled}
											isSubitem={true}
											onClick={closeMobileMenu}
										/>
									))}
								</div>
							))}
					</div>
				</div>
			)}
		</div>
	);
};

export default NavigationBar;
