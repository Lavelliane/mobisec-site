import { createEvent, findAllEvents } from '@/context/event/application/create-event.application';
import { Event } from '@/context/event/domain/event.schema';
import { EventApi } from '@/context/event/infrastructure/event.api';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		// Extract the event data from the request body
		const eventData = body.event || body;

		const eventRepository = EventApi();

		// Map form fields to database schema
		const event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'> = {
			name: eventData.name,
			description: eventData.description || null,
			location: eventData.location || null,
			startDate: new Date(eventData.startDate),
			endDate: new Date(eventData.endDate),
			isActiveEvent: eventData.isActiveEvent || false,
			isActiveRegistration: eventData.isActiveRegistration || false,
		};

		const response = await createEvent(eventRepository, event as Event);

		return NextResponse.json(
			{
				success: true,
				event: response,
				message: 'Event created successfully',
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error('Event creation error:', error);
		return NextResponse.json(
			{
				success: false,
				message: error instanceof Error ? error.message : 'Failed to create event',
			},
			{ status: 500 }
		);
	}
}

export async function GET(request: NextRequest) {
	try {
		const eventRepository = EventApi();
		const { searchParams } = new URL(request.url);
		const activeOnly = searchParams.get('active');

		// Get all events
		const events = await findAllEvents(eventRepository);

		// Filter for active events if requested
		const filteredEvents = activeOnly === 'true' ? events.filter((event) => event.isActiveEvent) : events;

		return NextResponse.json(
			{
				success: true,
				events: filteredEvents,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Get events error:', error);
		return NextResponse.json(
			{
				success: false,
				message: 'Failed to fetch events',
			},
			{ status: 500 }
		);
	}
}
