'use client';

import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Clock, ChevronDown, ChevronRight } from 'lucide-react';
import { Event } from '@/context/event/domain/event.schema';
import { Registration } from '@/context/registration/domain/registration.schema';
import { format } from 'date-fns';

interface JoinedEventsHistoryCardProps {
	userRegistrations: Registration[];
	events: Event[];
}

interface JoinedEventDisplay {
	event: Event;
	registration: Registration;
	status: 'pending' | 'confirmed' | 'cancelled';
	joinedDate: Date;
}

const JoinedEventsHistoryCard: React.FC<JoinedEventsHistoryCardProps> = ({ userRegistrations, events }) => {
	// State to track which events are expanded
	const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());

	// Combine registrations with their corresponding events
	const joinedEvents = useMemo(() => {
		const joined = userRegistrations
			.map((registration) => {
				const event = events.find((e) => e.id === registration.eventId);
				if (!event) return null;

				return {
					event,
					registration,
					status: registration.registrationStatus as 'pending' | 'confirmed' | 'cancelled',
					joinedDate: new Date(registration.createdAt),
				};
			})
			.filter((item): item is JoinedEventDisplay => item !== null)
			// Sort by event start date (most recent first)
			.sort((a, b) => new Date(b.event.startDate).getTime() - new Date(a.event.startDate).getTime());

		return joined;
	}, [userRegistrations, events]);

	const formatEventDate = (startDate: Date, endDate: Date) => {
		const start = format(startDate, 'MMM dd, yyyy');
		const end = format(endDate, 'MMM dd, yyyy');

		if (start === end) {
			return start;
		}
		return `${start} - ${end}`;
	};

	// Toggle expanded state for an event
	const toggleEventExpansion = (eventId: string) => {
		setExpandedEvents((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(eventId)) {
				newSet.delete(eventId);
			} else {
				newSet.add(eventId);
			}
			return newSet;
		});
	};

	return (
		<Card className='w-full'>
			<CardHeader>
				<div className='flex items-center gap-2'>
					<Calendar className='h-5 w-5' />
					<h3 className='text-lg font-semibold'>Joined Events History</h3>
					<Badge
						variant='secondary'
						className='ml-auto'>
						{joinedEvents.length} {joinedEvents.length === 1 ? 'Event' : 'Events'}
					</Badge>
				</div>
			</CardHeader>
			<CardContent>
				{joinedEvents.length === 0 ? (
					<div className='text-center py-8 text-muted-foreground'>
						<Calendar className='h-12 w-12 mx-auto mb-4 opacity-50' />
						<p>No events joined yet</p>
						<p className='text-sm'>Register for events to see your history here</p>
					</div>
				) : (
					<div className='space-y-4'>
						{joinedEvents.map(({ event, registration, joinedDate }) => {
							const isExpanded = expandedEvents.has(event.id);

							return (
								<div
									key={`${event.id}-${registration.id}`}
									className='border rounded-lg hover:shadow-sm transition-shadow'>
									{/* Clickable header section */}
									<div
										className='p-4 cursor-pointer hover:bg-muted/50 transition-colors'
										onClick={() => toggleEventExpansion(event.id)}>
										<div className='flex items-start justify-between'>
											<div className='flex-1 flex items-start gap-3'>
												<div className='mt-1'>
													{isExpanded ? (
														<ChevronDown className='h-4 w-4 text-muted-foreground' />
													) : (
														<ChevronRight className='h-4 w-4 text-muted-foreground' />
													)}
												</div>
												<div className='flex-1'>
													<h4 className='font-semibold text-base mb-1'>{event.name}</h4>
													<div className='flex items-center gap-2 text-sm text-muted-foreground'>
														<Calendar className='h-4 w-4' />
														<span>{formatEventDate(event.startDate, event.endDate)}</span>
													</div>
													{event.location && (
														<div className='flex items-center gap-2 text-sm text-muted-foreground'>
															<MapPin className='h-4 w-4' />
															<span>{event.location}</span>
														</div>
													)}
												</div>
											</div>
										</div>
									</div>

									{/* Expanded content */}
									{isExpanded && (
										<div className='px-4 pb-4 border-t bg-muted/20'>
											<div className='pt-4 space-y-4'>
												{/* Description */}
												{event.description && (
													<div>
														<p className='font-medium text-sm mb-2'>Description</p>
														<p className='text-muted-foreground text-sm'>{event.description}</p>
													</div>
												)}

												{/* Event Details Grid */}
												<div className='flex flex-col gap-4 text-sm'>
													<div className='space-y-3'>
														<p className='font-medium text-sm'>Registration Details</p>
														<div className='space-y-2'>
															<div className='flex items-center gap-2 text-sm text-muted-foreground'>
																<Users className='h-4 w-4' />
																<span>
																	{registration.attendeeType.charAt(0).toUpperCase() +
																		registration.attendeeType.slice(1)}
																	{registration.isPresenting && ' • Presenter'}
																</span>
															</div>
															<div className='flex items-center gap-2 text-muted-foreground'>
																<Clock className='h-4 w-4' />
																<span>Joined {format(joinedDate, 'MMM dd, yyyy')}</span>
															</div>
														</div>
													</div>
												</div>

												{/* Additional Registration Info */}
												{(registration.dietaryRequirements ||
													registration.accessibilityNeeds ||
													registration.notes) && (
													<div className='space-y-3'>
														<p className='font-medium text-sm'>Additional Information</p>
														<div className='space-y-2 text-sm'>
															{registration.dietaryRequirements && (
																<div>
																	<span className='font-medium'>Dietary Requirements:</span>
																	<span className='text-muted-foreground ml-2'>{registration.dietaryRequirements}</span>
																</div>
															)}
															{registration.accessibilityNeeds && (
																<div>
																	<span className='font-medium'>Accessibility Needs:</span>
																	<span className='text-muted-foreground ml-2'>{registration.accessibilityNeeds}</span>
																</div>
															)}
															{registration.notes && (
																<div>
																	<span className='font-medium'>Notes:</span>
																	<span className='text-muted-foreground ml-2'>{registration.notes}</span>
																</div>
															)}
														</div>
													</div>
												)}
											</div>
										</div>
									)}
								</div>
							);
						})}
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default JoinedEventsHistoryCard;
