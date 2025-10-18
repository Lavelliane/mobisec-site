import { db } from '@/db/drizzle';
import { Event } from '../domain/event.schema';
import { events } from '../domain/event.schema';
import { EventRepository } from '../domain/event.repository';
import { eq } from 'drizzle-orm';

export const EventApi = (): EventRepository => {
	return {
		create: createEvent,
		findAll: findAllEvents,
		findById: findEventById,
		update: updateEvent,
		delete: deleteEvent,
	};
};

/**
 * Creates a new event in the database
 * @param {Event} event - The event data to create
 * @returns {Promise<Event>} The created event with generated ID
 */
async function createEvent(event: Event): Promise<Event> {
	const result = await db.insert(events).values(event).returning();
	return result[0];
}

/**
 * Retrieves all events from the database
 * @returns {Promise<Event[]>} Array of all events
 */
async function findAllEvents(): Promise<Event[]> {
	const result = await db.select().from(events);
	return result;
}

/**
 * Finds an event by its unique identifier
 * @param {string} id - The unique identifier of the event
 * @returns {Promise<Event | null>} The found event or null if not found
 */
async function findEventById(id: string): Promise<Event | null> {
	const result = await db.select().from(events).where(eq(events.id, id));
	return result[0] || null;
}

/**
 * Updates an existing event in the database
 * @param {string} id - The unique identifier of the event to update
 * @param {Event} event - The updated event data
 * @returns {Promise<Event>} The updated event
 */
async function updateEvent(id: string, event: Event): Promise<Event> {
	const result = await db.update(events).set(event).where(eq(events.id, id)).returning();
	return result[0];
}

/**
 * Deletes an event from the database
 * @param {string} id - The unique identifier of the event to delete
 * @returns {Promise<void>}
 */
async function deleteEvent(id: string): Promise<void> {
	await db.delete(events).where(eq(events.id, id));
}
