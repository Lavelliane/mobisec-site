import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, MapPinIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Event } from '@/context/event/domain/event.schema';
import Image from 'next/image';

interface EventDetailsCardProps {
	event: Event;
}

const EventDetailsCard: React.FC<EventDetailsCardProps> = ({ event }) => {
	return (
		<Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg border-none rounded-none`}>
			<div className='z-10 flex flex-col gap-4'>
				{/* Background Image */}
				<CardHeader className='text-white'>
					<div className='flex items-center gap-2 mb-2'>
						<span className='px-3 py-1 bg-accent text-primary text-sm font-medium rounded-full'>Active Event</span>
						{event.isActiveRegistration && (
							<span className='px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full'>
								Registration Open
							</span>
						)}
					</div>
					<CardTitle className='text-xl'>{event.name}</CardTitle>
					{event.description && <CardDescription className='text-accent'>{event.description}</CardDescription>}
				</CardHeader>
				<CardContent>
					<div className='space-y-2 text-white'>
						{event.location && (
							<div className='flex items-center text-sm'>
								<MapPinIcon className='mr-2 h-4 w-4' />
								<span className='font-medium'>Location:</span>
								<span className='ml-2'>{event.location}</span>
							</div>
						)}
						<div className='flex items-center text-sm'>
							<CalendarIcon className='mr-2 h-4 w-4' />
							<span className='font-medium'>Event Dates:</span>
							<span className='ml-2'>
								{format(new Date(event.startDate), 'PPP')} - {format(new Date(event.endDate), 'PPP')}
							</span>
						</div>
						<div className='flex items-center text-sm'>
							<Clock className='mr-2 h-4 w-4' />
							<span className='font-medium'>Duration:</span>
							<span className='ml-2'>
								{Math.ceil(
									(new Date(event.endDate).getTime() - new Date(event.startDate).getTime()) / (1000 * 60 * 60 * 24)
								)}{' '}
								days
							</span>
						</div>
					</div>
				</CardContent>
			</div>
			<Image
				className='absolute w-full h-full object-cover top-0 left-0'
				width={600}
				height={600}
				src={'/assets/previous-events/okinawa-25.png'}
				alt={`MobiSec ${event.name}`}
			/>
			{/* Gradient Overlay */}
			<div className={`absolute inset-0 bg-gradient-to-r from-primary via-primary/70 to-transparent`}></div>
		</Card>
	);
};

export default EventDetailsCard;
