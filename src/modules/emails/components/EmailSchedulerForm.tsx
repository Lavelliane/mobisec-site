'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Send, CalendarDays, Mail, FileText, Loader2 } from 'lucide-react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { EmailRecipient } from '@/types/EmailTypes';

const emailSchedulerSchema = z
	.object({
		templateType: z.enum(['custom', 'newsletter'], {
			required_error: 'Please select a template type',
		}),
		subject: z.string(),
		body: z.string(),
		sendOption: z.enum(['now', 'schedule'], {
			required_error: 'Please select when to send the email',
		}),
		scheduledDate: z.date().optional(),
		scheduledTime: z.string().optional(),
	})
	.refine(
		(data) => {
			if (data.sendOption === 'schedule') {
				return data.scheduledDate && data.scheduledTime;
			}
			return true;
		},
		{
			message: 'Date and time are required when scheduling',
			path: ['scheduledDate'],
		}
	)
	.refine(
		(data) => {
			if (data.sendOption === 'schedule' && data.scheduledDate && data.scheduledTime) {
				const correctedDate = new Date(data.scheduledDate.getTime() + 3600 * 1000 * 24).toISOString().split('T')[0];
				const scheduledDateTime = new Date(`${correctedDate}T${data.scheduledTime}`);

				const now = new Date();
				return scheduledDateTime > now;
			}
			return true;
		},
		{
			message: 'Scheduled time must be in the future',
			path: ['scheduledTime'],
		}
	)
	.refine(
		(data) => {
			if (data.templateType === 'custom') {
				return data.subject.trim().length > 0;
			}
			return true;
		},
		{
			message: 'Subject is required for custom emails',
			path: ['subject'],
		}
	)
	.refine(
		(data) => {
			if (data.templateType === 'custom') {
				return data.body.trim().length >= 10;
			}
			return true;
		},
		{
			message: 'Message body must be at least 10 characters for custom emails',
			path: ['body'],
		}
	);

type EmailSchedulerFormData = z.infer<typeof emailSchedulerSchema>;

interface EmailSchedulerFormProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	onSubmit: (data: EmailSchedulerFormData & { recipients: number[]; totalRecipients: number }) => Promise<void>;
	trigger: React.ReactNode;
	recipients: EmailRecipient[];
}

const EmailSchedulerForm: React.FC<EmailSchedulerFormProps> = ({
	isOpen,
	onOpenChange,
	onSubmit,
	trigger,
	recipients,
}) => {
	const [selectedRecipients, setSelectedRecipients] = useState<number[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<EmailSchedulerFormData>({
		resolver: zodResolver(emailSchedulerSchema),
		defaultValues: {
			templateType: 'custom',
			subject: '',
			body: '',
			sendOption: 'now',
			scheduledDate: undefined,
			scheduledTime: '',
		},
	});

	const sendOption = form.watch('sendOption');
	const templateType = form.watch('templateType');
	const subscribedRecipients = recipients.filter((r) => r.receiveEmails);

	const handleSubmit = async (data: EmailSchedulerFormData) => {
		if (selectedRecipients.length === 0) {
			return;
		}

		setIsLoading(true);

		try {
			const emailData = {
				...data,
				recipients: selectedRecipients,
				totalRecipients: selectedRecipients.length,
			};

			await onSubmit(emailData);

			// Reset form and close dialog on success
			form.reset({
				templateType: 'custom',
				subject: '',
				body: '',
				sendOption: 'now',
				scheduledDate: undefined,
				scheduledTime: '',
			});
			setSelectedRecipients([]);
			onOpenChange(false);
		} catch (error) {
			// Error handling is done by parent component
			console.error('Email submission failed:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const toggleRecipient = (recipientId: number) => {
		if (isLoading) return;
		setSelectedRecipients((prev) =>
			prev.includes(recipientId) ? prev.filter((id) => id !== recipientId) : [...prev, recipientId]
		);
	};

	const selectAllRecipients = () => {
		if (isLoading) return;
		setSelectedRecipients(subscribedRecipients.map((r) => r.id));
	};

	const clearAllRecipients = () => {
		if (isLoading) return;
		setSelectedRecipients([]);
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(open) => !isLoading && onOpenChange(open)}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className='sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-white'>
				<DialogHeader>
					<DialogTitle className='flex items-center gap-2'>
						Schedule Email {isLoading && <Loader2 className='w-4 h-4 animate-spin' />}
					</DialogTitle>
					<DialogDescription>Compose and schedule your email to be sent to selected recipients.</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className={cn('space-y-4', isLoading && 'opacity-50 pointer-events-none')}>
						{/* Template Type */}
						<FormField
							control={form.control}
							name='templateType'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email Template</FormLabel>
									<FormControl>
										<div className='flex gap-4'>
											<label className='flex items-center gap-2 cursor-pointer'>
												<input
													type='radio'
													value='custom'
													checked={field.value === 'custom'}
													onChange={(e) => field.onChange(e.target.value)}
													className='w-4 h-4 text-primary'
													disabled={isLoading}
												/>
												<Mail className='w-4 h-4' />
												<div className='flex flex-col'>
													<span className='font-medium'>Custom Email</span>
													<span className='text-xs text-gray-500'>Use your custom content</span>
												</div>
											</label>
											<label className='flex items-center gap-2 cursor-pointer'>
												<input
													type='radio'
													value='newsletter'
													checked={field.value === 'newsletter'}
													onChange={(e) => field.onChange(e.target.value)}
													className='w-4 h-4 text-primary'
													disabled={isLoading}
												/>
												<FileText className='w-4 h-4' />
												<div className='flex flex-col'>
													<span className='font-medium'>Newsletter</span>
													<span className='text-xs text-gray-500'>MobiSec conference template</span>
												</div>
											</label>
										</div>
									</FormControl>
									{!isLoading && <FormMessage />}
								</FormItem>
							)}
						/>

						{/* Subject */}
						<FormField
							control={form.control}
							name='subject'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Subject{' '}
										{templateType === 'newsletter' && (
											<span className='text-xs text-gray-500'>(Optional - will use default newsletter subject)</span>
										)}
									</FormLabel>
									<FormControl>
										<Input
											placeholder={
												templateType === 'newsletter'
													? 'Leave empty to use default newsletter subject'
													: 'Enter email subject'
											}
											disabled={isLoading}
											{...field}
										/>
									</FormControl>
									{!isLoading && <FormMessage />}
								</FormItem>
							)}
						/>

						{/* Email Body */}
						{templateType === 'custom' && (
							<FormField
								control={form.control}
								name='body'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Message</FormLabel>
										<FormControl>
											<textarea
												placeholder='Enter your email message...'
												className='flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
												disabled={isLoading}
												{...field}
											/>
										</FormControl>
										{!isLoading && <FormMessage />}
									</FormItem>
								)}
							/>
						)}

						{templateType === 'newsletter' && (
							<Alert>
								<FileText className='h-4 w-4' />
								<AlertTitle>Newsletter Template Selected</AlertTitle>
								<AlertDescription>
									The MobiSec 2025 conference newsletter template will be used with the default content about the
									conference invitation, research topics, and call for papers.
								</AlertDescription>
							</Alert>
						)}

						{/* Send Option */}
						<FormField
							control={form.control}
							name='sendOption'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Send Option</FormLabel>
									<FormControl>
										<div className='flex gap-4'>
											<label className='flex items-center gap-2 cursor-pointer'>
												<input
													type='radio'
													value='now'
													checked={field.value === 'now'}
													onChange={(e) => field.onChange(e.target.value)}
													className='w-4 h-4 text-primary'
													disabled={isLoading}
												/>
												<Send className='w-4 h-4' />
												<span>Send Now</span>
											</label>
											<label className='flex items-center gap-2 cursor-pointer'>
												<input
													type='radio'
													value='schedule'
													checked={field.value === 'schedule'}
													onChange={(e) => field.onChange(e.target.value)}
													className='w-4 h-4 text-primary'
													disabled={isLoading}
												/>
												<CalendarDays className='w-4 h-4' />
												<span>Schedule</span>
											</label>
										</div>
									</FormControl>
									{!isLoading && <FormMessage />}
								</FormItem>
							)}
						/>

						{/* Schedule Date and Time */}
						{sendOption === 'schedule' && (
							<div className='space-y-4'>
								<div className='grid grid-cols-2 gap-4 items-start'>
									<FormField
										control={form.control}
										name='scheduledDate'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Date</FormLabel>
												<Popover>
													<PopoverTrigger asChild>
														<FormControl>
															<Button
																variant='outline'
																disabled={isLoading}
																className={cn(
																	'w-full pl-3 text-left font-normal',
																	!field.value && 'text-muted-foreground'
																)}>
																{field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
																<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
															</Button>
														</FormControl>
													</PopoverTrigger>
													<PopoverContent
														className='w-auto p-0'
														align='start'>
														<Calendar
															mode='single'
															selected={field.value}
															onSelect={field.onChange}
															disabled={(date) => {
																const today = new Date();
																today.setHours(0, 0, 0, 0);
																return date < today || date < new Date('1900-01-01');
															}}
															initialFocus
														/>
													</PopoverContent>
												</Popover>
												{!isLoading && <FormMessage />}
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name='scheduledTime'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Time</FormLabel>
												<FormControl>
													<div className='relative'>
														<Input
															type='time'
															placeholder='Select time'
															disabled={isLoading}
															className='bg-background appearance-none'
															{...field}
														/>
													</div>
												</FormControl>
												{!isLoading && <FormMessage />}
											</FormItem>
										)}
									/>
								</div>
							</div>
						)}

						{/* Recipients Selection */}
						<div className='space-y-3'>
							<div className='flex items-center justify-between'>
								<FormLabel>Recipients ({selectedRecipients.length} selected)</FormLabel>
								<div className='flex gap-2'>
									<Button
										type='button'
										variant='outline'
										size='sm'
										disabled={isLoading}
										onClick={selectAllRecipients}>
										Select All
									</Button>
									<Button
										type='button'
										variant='outline'
										size='sm'
										disabled={isLoading}
										onClick={clearAllRecipients}>
										Clear All
									</Button>
								</div>
							</div>
							<div className='max-h-40 overflow-y-auto border rounded-md p-3 space-y-2'>
								{subscribedRecipients.map((recipient) => (
									<label
										key={recipient.id}
										className={cn(
											'flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded',
											isLoading && 'cursor-not-allowed opacity-50'
										)}>
										<input
											type='checkbox'
											checked={selectedRecipients.includes(recipient.id)}
											onChange={() => toggleRecipient(recipient.id)}
											className='w-4 h-4 text-primary'
											disabled={isLoading}
										/>
										<div className='flex-1'>
											<div className='font-medium'>{recipient.name}</div>
											<div className='text-sm text-gray-500'>{recipient.email}</div>
										</div>
										<span className='text-xs bg-gray-100 px-2 py-1 rounded'>{recipient.role}</span>
									</label>
								))}
							</div>
							{!isLoading && selectedRecipients.length === 0 && (
								<p className='text-sm text-red-500'>Please select at least one recipient</p>
							)}
						</div>

						<DialogFooter>
							<Button
								type='button'
								variant='outline'
								disabled={isLoading}
								onClick={() => onOpenChange(false)}>
								Cancel
							</Button>
							<Button
								type='submit'
								disabled={selectedRecipients.length === 0 || isLoading}
								className='flex items-center gap-2'>
								{isLoading ? (
									<>
										<Loader2 className='w-4 h-4 animate-spin' />
										{sendOption === 'now' ? 'Sending...' : 'Scheduling...'}
									</>
								) : (
									<>
										{sendOption === 'now' ? (
											<>
												<Send className='w-4 h-4' />
												Send Now
											</>
										) : (
											<>
												<CalendarDays className='w-4 h-4' />
												Schedule Email
											</>
										)}
									</>
								)}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default EmailSchedulerForm;
export type { EmailSchedulerFormData };
