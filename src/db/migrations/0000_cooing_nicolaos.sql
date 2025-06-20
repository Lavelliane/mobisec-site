CREATE TYPE "public"."attendee_type" AS ENUM('student', 'academic', 'industry', 'speaker');--> statement-breakpoint
CREATE TYPE "public"."registration_status" AS ENUM('pending', 'confirmed', 'cancelled');--> statement-breakpoint
CREATE TABLE "conference_registrations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"prefix" text,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"institution" text,
	"attendee_type" "attendee_type" NOT NULL,
	"registration_status" "registration_status" DEFAULT 'pending' NOT NULL,
	"is_presenting" boolean DEFAULT false,
	"dietary_requirements" text,
	"accessibility_needs" text,
	"notes" text,
	CONSTRAINT "conference_registrations_email_unique" UNIQUE("email")
);
