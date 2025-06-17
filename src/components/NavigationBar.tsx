'use client';
import React from 'react';
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
		label: 'Attend',
		items: [
			{ label: 'Registration', href: '/registration', description: 'Register for the conference' },
			{ label: 'Contact', href: '/contact', description: 'Get in touch with organizers' },
		],
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

const NavigationBar = () => {
	return (
		<div className='flex flex-col justify-between w-full'>
			<div className='h-fit w-full flex items-center justify-between gap-4 max-w-7xl mx-auto p-4'>
				<div className='flex items-center gap-2'>
					<Image
						src='/assets/mobisec-logo.png'
						alt='MobiSec Logo'
						width={100}
						height={100}
						className='h-12 w-fit'
					/>
					<h2 className='text-5xl font-bold'>MobiSec 2025</h2>
				</div>
				<h4 className='text-lg font-semibold text-end'>
					The 9th IFIP WG 8.4/KIISC International Conference
					<br />
					on Mobile Internet Security
				</h4>
			</div>
			<div className='w-full border-y-1 border-primary/20 bg-secondary-foreground text-secondary-background'>
				<div className='max-w-7xl mx-auto'>
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
				</div>
			</div>
		</div>
	);
};

export default NavigationBar;
