import * as z from 'zod';

// Validation schema for registration forms
export const registrationSchema = z.object({
	title: z.string().optional(),
	firstName: z.string().min(2, 'First name must be at least 2 characters'),
	lastName: z.string().min(2, 'Last name must be at least 2 characters'),
	email: z.string().email('Please enter a valid email address'),
	affiliation: z.string().optional(),
	attendeeType: z.enum(['student', 'academic', 'industry', 'speaker'], {
		required_error: 'Please select an attendee type',
	}),
	isPresenting: z.boolean(),
	dietaryRequirements: z.string().optional(),
	accessibilityNeeds: z.string().optional(),
	notes: z.string().optional(),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

export const titleOptions = [
	{ value: 'Mr.', label: 'Mr.' },
	{ value: 'Mrs.', label: 'Mrs.' },
	{ value: 'Ms.', label: 'Ms.' },
	{ value: 'Dr.', label: 'Dr.' },
	{ value: 'Prof.', label: 'Prof.' },
	{ value: 'Engr.', label: 'Engr.' },
];

export const attendeeTypeOptions = [
	{ value: 'student', label: 'Student' },
	{ value: 'academic', label: 'Academic' },
	{ value: 'industry', label: 'Industry' },
	{ value: 'speaker', label: 'Speaker' },
];

export type RegistrationType = 'self' | 'other';
