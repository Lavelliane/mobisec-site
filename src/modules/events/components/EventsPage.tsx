'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useCreateEvent, useGetEvents } from '@/modules/events/hooks';
import { EventFormData } from '@/modules/events/types';
import EventForm from './EventForm';
import EventCard from './EventCard';
import { PlusIcon, Settings } from 'lucide-react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

const EventsPage = () => {
	const [showCreateDialog, setShowCreateDialog] = useState(false);
	const [showActiveOnly, setShowActiveOnly] = useState(false);

	// Hooks for API operations
	const { data: eventsData, isLoading: eventsLoading, refetch } = useGetEvents(showActiveOnly);
	const createEventMutation = useCreateEvent();

	const events = eventsData?.events || [];

	// Handle event creation
	const handleEventSubmit = (data: EventFormData) => {
		const eventData = {
			name: data.name,
			description: data.description || null,
			location: data.location || null,
			startDate: data.startDate,
			endDate: data.endDate,
			isActiveEvent: data.isActiveEvent || false,
			isActiveRegistration: data.isActiveRegistration || false,
		};

		createEventMutation.mutate(
			{ event: eventData },
			{
				onSuccess: () => {
					toast.success('Event created successfully!');
					setShowCreateDialog(false);
					refetch();
				},
				onError: (error: Error) => {
					console.error('Event creation error:', error);
					toast.error(error.message || 'Failed to create event. Please try again.');
				},
			}
		);
	};

	// Handle event update
	const handleEventUpdate = () => {
		refetch();
	};

	// Handle event delete
	const handleEventDelete = () => {
		refetch();
	};

	// Show loading state
	if (eventsLoading) {
		return (
			<div className='container mx-auto py-12 px-4'>
				<div className='max-w-6xl mx-auto'>
					<Card>
						<CardContent className='py-12'>
							<div className='text-center'>
								<p className='text-muted-foreground'>Loading events...</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	return (
		<div className='container mx-auto py-12 px-4'>
			<div className='max-w-6xl mx-auto'>
				<div className='flex flex-col items-center justify-center gap-4 mb-8'>
					<div className='flex items-center gap-3'>
						<Settings className='h-8 w-8 text-primary' />
						<h1 className='text-4xl font-bold text-foreground text-center'>Events Management</h1>
					</div>
					<h2 className='text-xl text-muted-foreground text-center'>
						Admin panel for managing MobiSec conference events
					</h2>
				</div>

				{/* Action buttons */}
				<div className='flex justify-between mb-6'>
					<div className='flex gap-2'>
						<Button
							variant={showActiveOnly ? 'default' : 'outline'}
							onClick={() => setShowActiveOnly(!showActiveOnly)}>
							{showActiveOnly ? 'Show All Events' : 'Show Active Only'}
						</Button>
					</div>
					<Dialog
						open={showCreateDialog}
						onOpenChange={setShowCreateDialog}>
						<DialogTrigger asChild>
							<Button className='flex items-center gap-2'>
								<PlusIcon className='h-4 w-4' />
								Create Event
							</Button>
						</DialogTrigger>
						<DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto'>
							<DialogHeader>
								<DialogTitle>Create New Event</DialogTitle>
								<DialogDescription>Add a new event to the MobiSec conference.</DialogDescription>
							</DialogHeader>
							<EventForm
								onSubmit={handleEventSubmit}
								isLoading={createEventMutation.isPending}
							/>
						</DialogContent>
					</Dialog>
				</div>

				{/* Events Grid */}
				{events.length === 0 ? (
					<Card>
						<CardContent className='py-12'>
							<div className='text-center'>
								<p className='text-muted-foreground'>
									{showActiveOnly ? 'No active events found.' : 'No events found.'}
								</p>
								<p className='text-sm text-muted-foreground mt-2'>
									{showActiveOnly
										? 'Create a new event or switch to show all events.'
										: 'Get started by creating your first event.'}
								</p>
								<Dialog
									open={showCreateDialog}
									onOpenChange={setShowCreateDialog}>
									<DialogTrigger asChild>
										<Button className='mt-4'>Create Your First Event</Button>
									</DialogTrigger>
									<DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto'>
										<DialogHeader>
											<DialogTitle>Create New Event</DialogTitle>
											<DialogDescription>Add a new event to the MobiSec conference.</DialogDescription>
										</DialogHeader>
										<EventForm
											onSubmit={handleEventSubmit}
											isLoading={createEventMutation.isPending}
										/>
									</DialogContent>
								</Dialog>
							</div>
						</CardContent>
					</Card>
				) : (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{events.map((event) => (
							<EventCard
								key={event.id}
								event={event}
								onEventUpdate={handleEventUpdate}
								onEventDelete={handleEventDelete}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default EventsPage;
