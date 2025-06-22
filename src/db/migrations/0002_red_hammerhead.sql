-- Rename columns in user_profiles table to preserve data
ALTER TABLE "user_profiles" RENAME COLUMN "prefix" TO "title";--> statement-breakpoint
ALTER TABLE "user_profiles" RENAME COLUMN "institution" TO "affiliation";--> statement-breakpoint

-- Rename columns in conference_registrations table to preserve data
ALTER TABLE "conference_registrations" RENAME COLUMN "prefix" TO "title";--> statement-breakpoint
ALTER TABLE "conference_registrations" RENAME COLUMN "institution" TO "affiliation";