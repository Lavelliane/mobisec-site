import * as z from 'zod';

// Validation schema for profile forms
export const profileSchema = z.object({
	title: z.string().optional(),
	firstName: z.string().min(2, 'First name must be at least 2 characters'),
	lastName: z.string().min(2, 'Last name must be at least 2 characters'),
	email: z.string().email('Please enter a valid email address'),
	affiliation: z.string().optional(),
	nationality: z.string().optional(),
	receiveEmails: z.boolean(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

export const titleOptions = [
	{ value: 'Mr.', label: 'Mr.' },
	{ value: 'Mrs.', label: 'Mrs.' },
	{ value: 'Ms.', label: 'Ms.' },
	{ value: 'Dr.', label: 'Dr.' },
	{ value: 'Prof.', label: 'Prof.' },
	{ value: 'Other', label: 'Other' },
];
