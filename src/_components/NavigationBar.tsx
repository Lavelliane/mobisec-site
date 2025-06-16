'use client';
import React from 'react';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';

const navigationCategories = [
	{
		label: 'Home',
		href: '/',
		isStandalone: true,
	},
	{
		label: 'About',
		items: [
			{ label: 'Overview', href: '/overview' },
			{ label: 'About Us', href: '/about' },
			{ label: 'Committees', href: '/committees' },
			{ label: 'Previous Events', href: '/previous-events' },
		],
	},
	{
		label: 'For Authors',
		items: [
			{ label: 'Author Instructions', href: '/author-instruction' },
			{ label: 'Fast Publication', href: '/fast-publication' },
		],
	},
	{
		label: 'Program',
		items: [
			{ label: 'Program Schedule', href: '/program' },
			{ label: 'Keynotes', href: '/keynotes' },
			{ label: 'Special Sessions', href: '/special-sessions' },
			{ label: 'Workshops', href: '/workshops' },
			{ label: 'Lifetime Achievement Award', href: '/lifetime-achievement-award' },
		],
	},
	{
		label: 'Attend',
		items: [
			{ label: 'Registration', href: '/registration' },
			{ label: 'Contact', href: '/contact' },
		],
	},
];

const NavigationBar = () => {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				{navigationCategories.map((category) => (
					<NavigationMenuItem key={category.label}>
						{category.isStandalone ? (
							<Link
								href={category.href!}
								legacyBehavior
								passHref>
								<NavigationMenuLink className='group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50'>
									{category.label}
								</NavigationMenuLink>
							</Link>
						) : (
							<>
								<NavigationMenuTrigger className='group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50'>
									{category.label}
								</NavigationMenuTrigger>
								<NavigationMenuContent>
									<div className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
										{category.items?.map((item) => (
											<Link
												key={item.label}
												href={item.href}
												legacyBehavior
												passHref>
												<NavigationMenuLink className='block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'>
													<div className='text-sm font-medium leading-none'>{item.label}</div>
												</NavigationMenuLink>
											</Link>
										))}
									</div>
								</NavigationMenuContent>
							</>
						)}
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	);
};

export default NavigationBar;
