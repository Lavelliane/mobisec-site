import { NextRequest, NextResponse } from 'next/server';
import { EventApi } from '@/context/event/infrastructure/event.api';
import { deleteEvent, findEventById, updateEvent } from '@/context/event/application/create-event.application';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await params;
		const eventRepository = EventApi();
		const event = await findEventById(eventRepository, id);

		if (!event) {
			return NextResponse.json(
				{
					success: false,
					message: 'Event not found',
				},
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{
				success: true,
				event,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Get event error:', error);
		return NextResponse.json(
			{
				success: false,
				message: error instanceof Error ? error.message : 'Failed to fetch event',
			},
			{ status: 500 }
		);
	}
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await params;
		const body = await request.json();
		const eventRepository = EventApi();

		// Convert date strings to Date objects if they exist
		if (body.startDate) {
			body.startDate = new Date(body.startDate);
		}
		if (body.endDate) {
			body.endDate = new Date(body.endDate);
		}

		const updatedEvent = await updateEvent(eventRepository, id, body);

		return NextResponse.json(
			{
				success: true,
				event: updatedEvent,
				message: 'Event updated successfully',
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Update event error:', error);
		return NextResponse.json(
			{
				success: false,
				message: error instanceof Error ? error.message : 'Failed to update event',
			},
			{ status: 500 }
		);
	}
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await params;
		const eventRepository = EventApi();

		// Check if event exists before deleting
		const existingEvent = await findEventById(eventRepository, id);
		if (!existingEvent) {
			return NextResponse.json(
				{
					success: false,
					message: 'Event not found',
				},
				{ status: 404 }
			);
		}

		await deleteEvent(eventRepository, id);

		return NextResponse.json(
			{
				success: true,
				message: 'Event deleted successfully',
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Delete event error:', error);
		return NextResponse.json(
			{
				success: false,
				message: error instanceof Error ? error.message : 'Failed to delete event',
			},
			{ status: 500 }
		);
	}
}
