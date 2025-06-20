import { NextRequest, NextResponse } from 'next/server';
import { MobiSecNewsletter } from '@/modules/landing/emails/templates/MobiSecNewsletter';
import { CustomEmail } from '@/modules/landing/emails/templates/CustomEmail';
import { Resend } from 'resend';
import * as cron from 'node-cron';
import { EmailScheduleData, ScheduledEmail } from '@/types/EmailTypes';

const resend = new Resend(process.env.RESEND_API_KEY);

// In-memory storage for scheduled emails (in production, use a database)
const scheduledEmails: Map<string, ScheduledEmail> = new Map();
const scheduledJobs: Map<string, cron.ScheduledTask> = new Map();

export async function POST(request: NextRequest) {
	try {
		const body: EmailScheduleData = await request.json();
		const {
			templateType,
			subject,
			body: emailBody,
			sendOption,
			scheduledDate,
			scheduledTime,
			recipientEmails,
			totalRecipients,
		} = body;

		// Validate required fields
		if (!recipientEmails || recipientEmails.length === 0) {
			return NextResponse.json({ error: 'Recipients are required' }, { status: 400 });
		}

		// Validate template-specific requirements
		if (templateType === 'custom') {
			if (!subject || subject.trim().length === 0) {
				return NextResponse.json({ error: 'Subject is required for custom emails' }, { status: 400 });
			}
			if (!emailBody || emailBody.trim().length < 10) {
				return NextResponse.json(
					{ error: 'Message body must be at least 10 characters for custom emails' },
					{ status: 400 }
				);
			}
		}

		if (sendOption === 'now') {
			// Send email immediately
			const results = await sendEmailToRecipients(templateType, subject, emailBody, recipientEmails);
			return NextResponse.json({
				success: true,
				message: `Email sent immediately to ${totalRecipients} recipients`,
				results,
			});
		} else if (sendOption === 'schedule') {
			// Schedule email for later
			if (!scheduledDate || !scheduledTime) {
				return NextResponse.json(
					{ error: 'Scheduled date and time are required for scheduled emails' },
					{ status: 400 }
				);
			}

			const scheduledFor = new Date(`${scheduledDate}T${scheduledTime}`);

			// Validate the scheduled time is in the future
			if (scheduledFor <= new Date()) {
				return NextResponse.json({ error: 'Scheduled time must be in the future' }, { status: 400 });
			}

			const emailId = generateEmailId();
			const scheduledEmail: ScheduledEmail = {
				id: emailId,
				subject,
				body: emailBody,
				recipientEmails,
				scheduledFor,
				status: 'pending',
				createdAt: new Date(),
			};

			// Store the scheduled email
			scheduledEmails.set(emailId, scheduledEmail);

			// Create cron expression for the specific date/time
			const cronExpression = createCronExpression(scheduledFor);

			// Schedule the email job
			const job = cron.schedule(cronExpression, async () => {
				console.log(`Executing scheduled email: ${emailId}`);
				try {
					const results = await sendEmailToRecipients(templateType, subject, emailBody, recipientEmails);

					// Update email status
					const email = scheduledEmails.get(emailId);
					if (email) {
						email.status = 'sent';
						scheduledEmails.set(emailId, email);
					}

					// Clean up the job
					job.stop();
					scheduledJobs.delete(emailId);

					console.log(`Scheduled email ${emailId} sent successfully`, results);
				} catch (error) {
					console.error(`Failed to send scheduled email ${emailId}:`, error);

					// Update email status to failed
					const email = scheduledEmails.get(emailId);
					if (email) {
						email.status = 'failed';
						scheduledEmails.set(emailId, email);
					}
				}
			});

			// Store the job reference
			scheduledJobs.set(emailId, job);

			// Start the job
			job.start();

			return NextResponse.json({
				success: true,
				message: `Email scheduled for ${scheduledFor.toLocaleString()} to ${totalRecipients} recipients`,
				emailId,
				scheduledFor: scheduledFor.toISOString(),
			});
		}

		return NextResponse.json({ error: 'Invalid send option' }, { status: 400 });
	} catch (error) {
		console.error('Email API error:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}

// Helper function to send emails to recipients
async function sendEmailToRecipients(
	templateType: 'custom' | 'newsletter',
	subject: string,
	body: string,
	recipientEmails: string[]
) {
	const results = [];

	for (const email of recipientEmails) {
		try {
			const emailTemplate =
				templateType === 'newsletter'
					? MobiSecNewsletter({
							recipientName: extractNameFromEmail(email),
							recipientEmail: email,
						})
					: CustomEmail({
							recipientName: extractNameFromEmail(email),
							customSubject: subject,
							customBody: body,
						});

			const emailSubject =
				templateType === 'newsletter' && !subject
					? "You're invited to MobiSec 2025 - Mobile Internet Security Conference"
					: subject;

			const { data, error } = await resend.emails.send({
				from: 'MobiSec Conference <onboarding@resend.dev>', // Test domain
				to: [email],
				subject: emailSubject,
				react: emailTemplate,
			});

			if (error) {
				results.push({ email, success: false, error });
			} else {
				results.push({ email, success: true, data });
			}
		} catch (err) {
			results.push({ email, success: false, error: err });
		}
	}

	return results;
}

// Helper function to extract name from email
function extractNameFromEmail(email: string): string {
	const localPart = email.split('@')[0];
	return localPart.replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

// Helper function to generate unique email ID
function generateEmailId(): string {
	return `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Helper function to create cron expression from Date
function createCronExpression(date: Date): string {
	const minute = date.getMinutes();
	const hour = date.getHours();
	const day = date.getDate();
	const month = date.getMonth() + 1; // JavaScript months are 0-indexed

	// Create a cron expression for the specific date and time
	// Format: minute hour day month dayOfWeek
	return `${minute} ${hour} ${day} ${month} *`;
}

// GET method to check scheduled emails status
export async function GET() {
	const emails = Array.from(scheduledEmails.values());
	return NextResponse.json({
		scheduledEmails: emails,
		totalScheduled: emails.length,
		pendingEmails: emails.filter((e) => e.status === 'pending').length,
	});
}
