import { pgTable, text, timestamp, boolean, uuid } from 'drizzle-orm/pg-core';

export const userProfiles = pgTable('user_profiles', {
	id: uuid('id').defaultRandom().primaryKey(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),

	// Personal information
	title: text('title'), // Mr., Mrs., Dr., Prof., etc.
	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull(),
	email: text('email').notNull().unique(),
	affiliation: text('affiliation'),
	nationality: text('nationality'),
	receiveEmails: boolean('receive_emails').default(true),
});

export type Profile = typeof userProfiles.$inferSelect;
