import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Calendar, Location } from '@carbon/icons-react';
import { Button } from '@/components/ui/button';
import previousEventsData from '@/data/previous-events.json';

const PreviousEventsPage = () => {
	const { conferences, statistics, regionalDistribution } = previousEventsData;

	return (
		<div className='container mx-auto py-12 px-4'>
			<div className='max-w-7xl mx-auto'>
				{/* Header Section */}
				<div className='flex flex-col items-center justify-center mb-12 gap-4'>
					<h1 className='text-4xl font-bold text-foreground text-center'>Previous Events</h1>
					<p className='text-xl text-muted-foreground text-center max-w-2xl'>
						A journey through MobiSec Conference history - connecting mobile security experts across Asia-Pacific since
						2016
					</p>
				</div>

				{/* Main Content Grid */}
				<div className='grid lg:grid-cols-3 gap-12 items-start'>
					{/* Timeline Section */}
					<div className='lg:col-span-2'>
						<div className='relative'>
							{/* Timeline Line */}
							<div className='absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/70 to-muted'></div>

							{/* Timeline Items */}
							<div className='space-y-8'>
								{conferences.map((event) => (
									<div
										key={event.year}
										className='relative flex items-start'>
										{/* Timeline Dot */}
										<div
											className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 shadow-lg ${
												event.status === 'upcoming'
													? 'bg-primary border-primary text-white'
													: event.status === 'recent'
													? 'bg-secondary border-primary/40 text-foreground'
													: 'bg-card border-primary/40 text-foreground'
											}`}>
											<span className='font-bold text-sm'>{event.year.slice(-2)}</span>
										</div>

										{/* Event Card with Background Image */}
										<div className='ml-8 flex-1'>
											<Card
												className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg border-none rounded-none ${
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
													<CardHeader className='pb-3'>
														<CardTitle className='flex items-center justify-between text-white'>
															<span className='text-2xl font-semibold drop-shadow-sm'>MobiSec {event.year}</span>
															{event.status === 'upcoming' && (
																<span className='px-3 py-1 text-xs font-medium bg-primary/60 text-white rounded-full border border-primary/30 backdrop-blur-sm'>
																	Upcoming
																</span>
															)}
															{event.status === 'recent' && (
																<span className='px-3 py-1 text-xs font-medium bg-secondary/60 text-primary rounded-full border border-primary/25 backdrop-blur-sm'>
																	Recent
																</span>
															)}
														</CardTitle>
													</CardHeader>
													<CardContent>
														<div className='space-y-2'>
															<div className='flex items-center text-muted drop-shadow-sm'>
																<Calendar className='w-4 h-4 mr-2' />
																<span className='font-medium'>{event.dates}</span>
															</div>
															<div className='flex items-center text-muted drop-shadow-sm'>
																<Location className='w-4 h-4 mr-2' />
																<span>{event.location}</span>
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
					<div className='lg:col-span-1'>
						<div className='sticky top-8 space-y-8'>
							{/* Conference Image Placeholder */}
							<Card className='overflow-hidden bg-primary border-none'>
								<CardContent className='relative text-center flex flex-col items-center justify-center gap-8'>
									<div className='flex flex-col items-center justify-center'>
										<h3 className='text-lg font-semibold text-white'>MobiSec Conference</h3>
										<p className='text-muted'>Call for Papers</p>
									</div>
									<Button variant='secondary'>Submit your paper</Button>
								</CardContent>
							</Card>

							{/* Conference Statistics */}
							<Card className='border-primary/20 bg-white'>
								<CardHeader>
									<CardTitle className='text-lg text-card-foreground'>Conference Statistics</CardTitle>
								</CardHeader>
								<CardContent className='space-y-4'>
									<div className='flex justify-between items-center'>
										<span className='text-muted-foreground'>Years Active</span>
										<span className='font-semibold text-card-foreground'>{statistics.yearsActive} Years</span>
									</div>
									<div className='flex justify-between items-center'>
										<span className='text-muted-foreground'>Countries Hosted</span>
										<span className='font-semibold text-card-foreground'>{statistics.countries} Countries</span>
									</div>
									<div className='flex justify-between items-center'>
										<span className='text-muted-foreground'>Next Event</span>
										<span className='font-semibold text-primary'>{statistics.nextEvent}</span>
									</div>
									<div className='pt-4 border-t border-border'>
										<p className='text-sm text-muted-foreground leading-relaxed'>{statistics.description}</p>
									</div>
								</CardContent>
							</Card>

							{/* Regional Distribution */}
							<Card className='border-primary/20 bg-white'>
								<CardHeader>
									<CardTitle className='text-lg text-card-foreground'>Regional Distribution</CardTitle>
								</CardHeader>
								<CardContent className='space-y-3'>
									{regionalDistribution.map((region, index) => (
										<div
											key={index}
											className='flex justify-between items-center'>
											<span className='text-muted-foreground'>{region.country}</span>
											<span className='font-medium text-card-foreground'>
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
