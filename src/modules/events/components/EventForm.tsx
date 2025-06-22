'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { EventFormData, eventSchema } from '@/modules/events/types';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface EventFormProps {
	onSubmit: (data: EventFormData) => void;
	isLoading: boolean;
	initialData?: Partial<EventFormData>;
	title?: string;
	description?: string;
}

const EventForm: React.FC<EventFormProps> = ({
	onSubmit,
	isLoading,
	initialData,
	title = 'Create New Event',
	description = 'Fill in the details to create a new event',
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm<EventFormData>({
		resolver: zodResolver(eventSchema),
		defaultValues: {
			name: initialData?.name || '',
			description: initialData?.description || '',
			location: initialData?.location || '',
			startDate: initialData?.startDate || new Date(),
			endDate: initialData?.endDate || new Date(),
			isActiveEvent: initialData?.isActiveEvent || false,
			isActiveRegistration: initialData?.isActiveRegistration || false,
		},
	});

	const startDate = watch('startDate');
	const endDate = watch('endDate');

	const handleFormSubmit = (data: EventFormData) => {
		onSubmit(data);
	};

	return (
		<form
			onSubmit={handleSubmit(handleFormSubmit)}
			className='space-y-6'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				{/* Event Name */}
				<div className='space-y-2'>
					<Label htmlFor='name'>Event Name *</Label>
					<Input
						id='name'
						{...register('name')}
						placeholder='Enter event name'
					/>
					{errors.name && <p className='text-sm text-red-500'>{errors.name.message}</p>}
				</div>

				{/* Location */}
				<div className='space-y-2'>
					<Label htmlFor='location'>Location</Label>
					<Input
						id='location'
						{...register('location')}
						placeholder='Enter event location'
					/>
					{errors.location && <p className='text-sm text-red-500'>{errors.location.message}</p>}
				</div>
			</div>

			{/* Description */}
			<div className='space-y-2'>
				<Label htmlFor='description'>Description</Label>
				<textarea
					id='description'
					{...register('description')}
					placeholder='Enter event description'
					rows={4}
					className='flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
				/>
				{errors.description && <p className='text-sm text-red-500'>{errors.description.message}</p>}
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				{/* Start Date */}
				<div className='space-y-2'>
					<Label>
						Start Date <span className='text-red-500'>*</span>
					</Label>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant='outline'
								className={cn('w-full justify-start text-left font-normal', !startDate && 'text-muted-foreground')}>
								<CalendarIcon className='mr-2 h-4 w-4' />
								{startDate ? format(startDate, 'PPP') : <span>Pick start date</span>}
							</Button>
						</PopoverTrigger>
						<PopoverContent className='w-auto p-0'>
							<Calendar
								mode='single'
								captionLayout='dropdown'
								selected={startDate}
								onSelect={(date) => setValue('startDate', date || new Date())}
								initialFocus
							/>
						</PopoverContent>
					</Popover>
					{errors.startDate && <p className='text-sm text-red-500'>{errors.startDate.message}</p>}
				</div>

				{/* End Date */}
				<div className='space-y-2'>
					<Label>
						End Date <span className='text-red-500'>*</span>
					</Label>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant='outline'
								className={cn('w-full justify-start text-left font-normal', !endDate && 'text-muted-foreground')}>
								<CalendarIcon className='mr-2 h-4 w-4' />
								{endDate ? format(endDate, 'PPP') : <span>Pick end date</span>}
							</Button>
						</PopoverTrigger>
						<PopoverContent className='w-auto p-0'>
							<Calendar
								mode='single'
								captionLayout='dropdown'
								selected={endDate}
								onSelect={(date) => setValue('endDate', date || new Date())}
								initialFocus
								disabled={(date) => startDate && date < startDate}
							/>
						</PopoverContent>
					</Popover>
					{errors.endDate && <p className='text-sm text-red-500'>{errors.endDate.message}</p>}
				</div>
			</div>

			{/* Checkboxes */}
			<div className='space-y-4'>
				<div className='flex items-center space-x-2'>
					<input
						type='checkbox'
						id='isActiveEvent'
						{...register('isActiveEvent')}
						className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary'
					/>
					<Label htmlFor='isActiveEvent'>Active Event</Label>
				</div>

				<div className='flex items-center space-x-2'>
					<input
						type='checkbox'
						id='isActiveRegistration'
						{...register('isActiveRegistration')}
						className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary'
					/>
					<Label htmlFor='isActiveRegistration'>Registration Open</Label>
				</div>
			</div>

			{/* Submit Button */}
			<div className='flex justify-end'>
				<Button
					type='submit'
					disabled={isLoading}
					className='min-w-[150px]'>
					{isLoading ? (
						<>
							<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							{title.includes('Update') ? 'Updating...' : 'Creating...'}
						</>
					) : title.includes('Update') ? (
						'Update Event'
					) : (
						'Create Event'
					)}
				</Button>
			</div>
		</form>
	);
};

export default EventForm;
