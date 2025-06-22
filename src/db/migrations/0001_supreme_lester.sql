CREATE TABLE "user_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"prefix" text,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"institution" text,
	"nationality" text,
	"receive_emails" boolean DEFAULT true,
	CONSTRAINT "user_profiles_email_unique" UNIQUE("email")
);
