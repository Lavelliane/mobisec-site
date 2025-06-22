import { pgTable, text, timestamp, boolean, uuid } from 'drizzle-orm/pg-core';

export const events = pgTable('events', {
	id: uuid('id').defaultRandom().primaryKey(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),

	// Event information
	name: text('name').notNull(),
	description: text('description'),
	location: text('location'),
	startDate: timestamp('start_date').notNull(),
	endDate: timestamp('end_date').notNull(),
	isActiveEvent: boolean('is_active_event').default(false).notNull(),
	isActiveRegistration: boolean('is_active_registration').default(false).notNull(),
});

export type Event = typeof events.$inferSelect;
