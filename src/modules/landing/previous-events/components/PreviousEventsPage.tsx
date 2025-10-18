import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Calendar, Location } from '@carbon/icons-react';
import { Button } from '@/components/ui/button';
import previousEventsData from '@/data/previous-events.json';
import Link from 'next/link';

const PreviousEventsPage = () => {
	const { conferences, statistics, regionalDistribution } = previousEventsData;

	return (
		<div className='container mx-auto py-8 sm:py-12 px-4'>
			<div className='max-w-7xl mx-auto'>
				{/* Header Section */}
				<div className='flex flex-col items-center justify-center mb-8 sm:mb-12 gap-3 sm:gap-4'>
					<h1 className='text-3xl sm:text-4xl font-bold text-foreground text-center'>Previous Events</h1>
					<p className='text-lg sm:text-xl text-muted-foreground text-center max-w-2xl px-4 sm:px-0'>
						A journey through MobiSec Conference history - connecting mobile security experts across Asia-Pacific since
						2016
					</p>
				</div>

				{/* Main Content Grid */}
				<div className='flex flex-col lg:grid lg:grid-cols-3 gap-8 lg:gap-12 items-start'>
					{/* Timeline Section */}
					<div className='lg:col-span-2 order-2 lg:order-1'>
						<div className='relative'>
							{/* Timeline Line - Hidden on mobile */}
							<div className='absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/70 to-muted hidden sm:block'></div>

							{/* Timeline Items */}
							<div className='space-y-6 sm:space-y-8'>
								{conferences.map((event) => (
									<div
										key={event.year}
										className='relative flex flex-col sm:flex-row items-start'>
										{/* Timeline Dot */}
										<div
											className={`relative z-10 flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 shadow-lg flex-shrink-0 mb-4 sm:mb-0 ${
												event.status === 'upcoming'
													? 'bg-primary border-primary text-white'
													: event.status === 'recent'
														? 'bg-card border-primary text-foreground'
														: 'bg-card border-primary/40 text-foreground'
											}`}>
											<span className='font-bold text-xs sm:text-sm'>{event.year.slice(-2)}</span>
										</div>

										{/* Event Card with Background Image */}
										<div className='sm:ml-6 lg:ml-8 flex-1 w-full'>
											<Card
												className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg border-none rounded-lg ${
													event.status === 'upcoming'
														? 'border-primary/30 shadow-primary/5'
														: event.status === 'recent'
															? 'border-primary/25 shadow-primary/5'
															: 'border-border hover:border-primary/20'
												}`}>
												{/* Background Image */}
												<Image
													className='absolute w-full h-full object-cover top-0 left-0'
													width={600}
													height={600}
													src={event.image}
													alt={`MobiSec ${event.year}`}
												/>

												{/* Gradient Overlay */}
												<div
													className={`absolute inset-0 ${
														event.status === 'upcoming'
															? 'bg-gradient-to-r from-primary via-primary/70 to-transparent'
															: event.status === 'recent'
																? 'bg-gradient-to-r from-primary via-primary/70 to-transparent'
																: 'bg-gradient-to-r from-primary via-primary/70 to-transparent'
													}`}></div>

												{/* Content */}
												<div className='relative z-10'>
													<CardHeader className='pb-2 sm:pb-3'>
														<CardTitle className='flex flex-col sm:flex-row items-start sm:items-center justify-between text-white gap-2'>
															<span className='text-xl sm:text-2xl font-semibold drop-shadow-sm'>
																MobiSec {event.year}
															</span>
															{event.status === 'upcoming' && (
																<span className='px-3 py-1 text-xs font-medium bg-primary/60 text-white rounded-full border border-primary/30 backdrop-blur-sm self-start'>
																	Upcoming
																</span>
															)}
															{event.status === 'recent' && (
																<span className='px-3 py-1 text-xs font-medium bg-secondary/60 text-white rounded-full border border-primary/25 backdrop-blur-sm self-start'>
																	Recent
																</span>
															)}
														</CardTitle>
													</CardHeader>
													<CardContent className='pb-4 sm:pb-6'>
														<div className='space-y-2'>
															<div className='flex items-center text-muted drop-shadow-sm'>
																<Calendar className='w-4 h-4 mr-2 flex-shrink-0' />
																<span className='font-medium text-sm sm:text-base'>{event.dates}</span>
															</div>
															<div className='flex items-center text-muted drop-shadow-sm'>
																<Location className='w-4 h-4 mr-2 flex-shrink-0' />
																<span className='text-sm sm:text-base'>{event.location}</span>
															</div>
														</div>
													</CardContent>
												</div>
											</Card>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Sidebar with Image and Stats */}
					<div className='lg:col-span-1 order-1 lg:order-2 w-full'>
						<div className='lg:sticky lg:top-8 space-y-6 lg:space-y-8'>
							{/* Conference Image Placeholder */}
							<Card className='overflow-hidden bg-primary border-none'>
								<CardContent className='relative text-center flex flex-col items-center justify-center gap-6 sm:gap-8 p-6'>
									<div className='flex flex-col items-center justify-center'>
										<Image
											src='/assets/logo/mobisec-logo-v2-white-nobg.png'
											alt='MobiSec 2025'
											width={100}
											height={100}
											className='w-20 sm:w-24 lg:w-28'
										/>
										<h3 className='text-lg sm:text-xl font-semibold text-white mt-2'>MobiSec 2025</h3>
										<p className='text-muted text-sm sm:text-base'>Call for Papers</p>
									</div>
									<div className='flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center justify-center gap-3 sm:gap-4 w-full'>
										<Button
											asChild
											variant='outline'
											className='w-full sm:w-auto lg:w-full xl:w-auto'>
											<Link href='/author-instruction'>Author Instructions</Link>
										</Button>
										<Button
											asChild
											variant='secondary'
											className='w-full sm:w-auto lg:w-full xl:w-auto'>
											<Link target='_blank' rel='noopener noreferrer' href='https://easychair.org/conferences?conf=mobisec2025'>Submit your paper</Link>
										</Button>
									</div>
								</CardContent>
							</Card>

							{/* Conference Statistics */}
							<Card className='border-primary/20 bg-white'>
								<CardHeader>
									<CardTitle className='text-lg sm:text-xl text-card-foreground'>Conference Statistics</CardTitle>
								</CardHeader>
								<CardContent className='space-y-3 sm:space-y-4'>
									<div className='flex justify-between items-center'>
										<span className='text-muted-foreground text-sm sm:text-base'>Years Active</span>
										<span className='font-semibold text-card-foreground text-sm sm:text-base'>
											{statistics.yearsActive} Years
										</span>
									</div>
									<div className='flex justify-between items-center'>
										<span className='text-muted-foreground text-sm sm:text-base'>Countries Hosted</span>
										<span className='font-semibold text-card-foreground text-sm sm:text-base'>
											{statistics.countries} Countries
										</span>
									</div>
									<div className='flex justify-between items-center'>
										<span className='text-muted-foreground text-sm sm:text-base'>Next Event</span>
										<span className='font-semibold text-primary text-sm sm:text-base'>{statistics.nextEvent}</span>
									</div>
									<div className='pt-3 sm:pt-4 border-t border-border'>
										<p className='text-xs sm:text-sm text-muted-foreground leading-relaxed'>{statistics.description}</p>
									</div>
								</CardContent>
							</Card>

							{/* Regional Distribution */}
							<Card className='border-primary/20 bg-white'>
								<CardHeader>
									<CardTitle className='text-lg sm:text-xl text-card-foreground'>Regional Distribution</CardTitle>
								</CardHeader>
								<CardContent className='space-y-2 sm:space-y-3'>
									{regionalDistribution.map((region, index) => (
										<div
											key={index}
											className='flex justify-between items-center'>
											<span className='text-muted-foreground text-sm sm:text-base'>{region.country}</span>
											<span className='font-medium text-card-foreground text-sm sm:text-base'>
												{region.events} event{region.events !== 1 ? 's' : ''}
											</span>
										</div>
									))}
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PreviousEventsPage;
