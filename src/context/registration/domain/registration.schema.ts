import { pgTable, text, timestamp, boolean, pgEnum, uuid } from 'drizzle-orm/pg-core';

// Enums for registration status and attendee types
export const registrationStatusEnum = pgEnum('registration_status', ['pending', 'confirmed', 'cancelled']);

export const attendeeTypeEnum = pgEnum('attendee_type', ['student', 'academic', 'industry', 'speaker']);

// Basic registration table with title
export const conferenceRegistrations = pgTable('conference_registrations', {
	id: uuid('id').defaultRandom().primaryKey(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),

	// Personal information
	title: text('title'), // Mr., Mrs., Dr., Prof., etc.
	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull(),
	email: text('email').notNull().unique(),
	affiliation: text('affiliation'),

	// Registration details
	attendeeType: attendeeTypeEnum('attendee_type').notNull(),
	registrationStatus: registrationStatusEnum('registration_status').default('pending').notNull(),

	// Basic conference options
	isPresenting: boolean('is_presenting').default(false),
	dietaryRequirements: text('dietary_requirements'),
	accessibilityNeeds: text('accessibility_needs'),

	// Additional information
	notes: text('notes'),
});

export type Registration = typeof conferenceRegistrations.$inferSelect;
