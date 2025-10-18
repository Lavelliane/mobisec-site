import * as z from 'zod';

// Validation schema for event forms
export const eventSchema = z
	.object({
		name: z.string().min(3, 'Event name must be at least 3 characters'),
		description: z.string().optional(),
		location: z.string().optional(),
		startDate: z.date({
			required_error: 'Start date is required',
		}),
		endDate: z.date({
			required_error: 'End date is required',
		}),
		isActiveEvent: z.boolean().default(false),
		isActiveRegistration: z.boolean().default(false),
	})
	.refine((data) => data.startDate < data.endDate, {
		message: 'End date must be after start date',
		path: ['endDate'],
	});

export type EventFormData = {
	name: string;
	description?: string;
	location?: string;
	startDate: Date;
	endDate: Date;
	isActiveEvent?: boolean;
	isActiveRegistration?: boolean;
};

export interface EventDisplay {
	id: string;
	name: string;
	description?: string;
	location?: string;
	startDate: Date;
	endDate: Date;
	isActiveEvent: boolean;
	isActiveRegistration: boolean;
	createdAt: Date;
	updatedAt: Date;
}
