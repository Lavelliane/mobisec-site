'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarIcon, MapPinIcon, Edit, Trash2, Check, X } from 'lucide-react';
import { format } from 'date-fns';
import { Event } from '@/context/event/domain/event.schema';
import { useUpdateEvent, useDeleteEvent } from '@/modules/events/hooks';
import { EventFormData } from '@/modules/events/types';
import { toast } from 'sonner';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import EventForm from './EventForm';

interface EventCardProps {
	event: Event;
	onEventUpdate?: (event: Event) => void;
	onEventDelete?: (eventId: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onEventUpdate, onEventDelete }) => {
	const [showEditDialog, setShowEditDialog] = useState(false);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

	const updateEventMutation = useUpdateEvent();
	const deleteEventMutation = useDeleteEvent();

	const handleEdit = (data: EventFormData) => {
		const updateData = {
			name: data.name,
			description: data.description || null,
			location: data.location || null,
			startDate: data.startDate,
			endDate: data.endDate,
			isActiveEvent: data.isActiveEvent || false,
			isActiveRegistration: data.isActiveRegistration || false,
		};

		updateEventMutation.mutate(
			{
				id: event.id,
				event: updateData,
			},
			{
				onSuccess: (response) => {
					toast.success('Event updated successfully!');
					setShowEditDialog(false);
					onEventUpdate?.(response.event);
				},
				onError: (error: Error) => {
					console.error('Event update error:', error);
					toast.error(error.message || 'Failed to update event');
				},
			}
		);
	};

	const handleDelete = () => {
		deleteEventMutation.mutate(
			{ id: event.id },
			{
				onSuccess: () => {
					toast.success('Event deleted successfully!');
					setShowDeleteConfirm(false);
					onEventDelete?.(event.id);
				},
				onError: (error: Error) => {
					console.error('Event deletion error:', error);
					toast.error(error.message || 'Failed to delete event');
				},
			}
		);
	};

	return (
		<Card className='w-full'>
			<CardHeader>
				<div className='flex justify-between items-center'>
					<div className='flex gap-2'>
						{event.isActiveEvent ? (
							<span className='px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full'>Active</span>
						) : (
							<span className='px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full'>Inactive</span>
						)}
						{event.isActiveRegistration ? (
							<span className='px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full'>Registration Open</span>
						) : (
							<span className='px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full'>Registration Closed</span>
						)}
					</div>
					<div className='flex gap-2 ml-4'>
						<Dialog
							open={showEditDialog}
							onOpenChange={setShowEditDialog}>
							<DialogTrigger asChild>
								<Button
									variant='outline'
									size='sm'>
									<Edit className='h-4 w-4' />
								</Button>
							</DialogTrigger>
							<DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto'>
								<DialogHeader>
									<DialogTitle>Edit Event</DialogTitle>
									<DialogDescription>Update the event details below.</DialogDescription>
								</DialogHeader>
								<EventForm
									onSubmit={handleEdit}
									isLoading={updateEventMutation.isPending}
									initialData={{
										name: event.name,
										description: event.description || '',
										location: event.location || '',
										startDate: new Date(event.startDate),
										endDate: new Date(event.endDate),
										isActiveEvent: event.isActiveEvent,
										isActiveRegistration: event.isActiveRegistration,
									}}
									title='Update Event'
								/>
							</DialogContent>
						</Dialog>

						{showDeleteConfirm ? (
							<div className='flex gap-2'>
								<Button
									variant='destructive'
									size='sm'
									onClick={handleDelete}
									disabled={deleteEventMutation.isPending}>
									<Check className='h-4 w-4' />
								</Button>
								<Button
									variant='outline'
									size='sm'
									onClick={() => setShowDeleteConfirm(false)}>
									<X className='h-4 w-4' />
								</Button>
							</div>
						) : (
							<Button
								variant='destructive'
								size='sm'
								onClick={() => setShowDeleteConfirm(true)}>
								<Trash2 className='h-4 w-4' />
							</Button>
						)}
					</div>
				</div>
				<CardTitle className='text-xl'>{event.name}</CardTitle>
				{event.description && <CardDescription>{event.description}</CardDescription>}
			</CardHeader>
			<CardContent>
				<div className='space-y-3'>
					{event.location && (
						<div className='flex items-center text-sm text-muted-foreground'>
							<MapPinIcon className='mr-2 h-4 w-4' />
							{event.location}
						</div>
					)}
					<div className='flex items-center text-sm text-muted-foreground'>
						<CalendarIcon className='mr-2 h-4 w-4' />
						{format(new Date(event.startDate), 'PPP')} - {format(new Date(event.endDate), 'PPP')}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default EventCard;
