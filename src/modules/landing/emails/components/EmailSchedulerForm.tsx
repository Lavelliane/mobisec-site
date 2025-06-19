'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock, Send, CalendarDays, Mail, FileText } from 'lucide-react';
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
	onSubmit: (data: EmailSchedulerFormData & { recipients: number[]; totalRecipients: number }) => void;
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

	const handleSubmit = (data: EmailSchedulerFormData) => {
		const emailData = {
			...data,
			recipients: selectedRecipients,
			totalRecipients: selectedRecipients.length,
		};
		onSubmit(emailData);
		form.reset({
			templateType: 'custom',
			subject: '',
			body: '',
			sendOption: 'now',
			scheduledDate: undefined,
			scheduledTime: '',
		});
		setSelectedRecipients([]);
	};

	const toggleRecipient = (recipientId: number) => {
		setSelectedRecipients((prev) =>
			prev.includes(recipientId) ? prev.filter((id) => id !== recipientId) : [...prev, recipientId]
		);
	};

	const selectAllRecipients = () => {
		setSelectedRecipients(subscribedRecipients.map((r) => r.id));
	};

	const clearAllRecipients = () => {
		setSelectedRecipients([]);
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={onOpenChange}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className='sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-white'>
				<DialogHeader>
					<DialogTitle>Schedule Email</DialogTitle>
					<DialogDescription>Compose and schedule your email to be sent to selected recipients.</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className='space-y-4'>
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
												/>
												<FileText className='w-4 h-4' />
												<div className='flex flex-col'>
													<span className='font-medium'>Newsletter</span>
													<span className='text-xs text-gray-500'>MobiSec conference template</span>
												</div>
											</label>
										</div>
									</FormControl>
									<FormMessage />
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
											{...field}
										/>
									</FormControl>
									<FormMessage />
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
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}

						{templateType === 'newsletter' && (
							<div className='bg-blue-50 border border-blue-200 rounded-md p-4'>
								<div className='flex items-center gap-2 mb-2'>
									<FileText className='w-4 h-4 text-blue-600' />
									<span className='font-medium text-blue-800'>Newsletter Template Selected</span>
								</div>
								<p className='text-sm text-blue-700'>
									The MobiSec 2025 conference newsletter template will be used with the default content about the
									conference invitation, research topics, and call for papers.
								</p>
							</div>
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
												/>
												<CalendarDays className='w-4 h-4' />
												<span>Schedule</span>
											</label>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Schedule Date and Time */}
						{sendOption === 'schedule' && (
							<div className='grid grid-cols-2 gap-4'>
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
														disabled={(date) => date < new Date() || date < new Date('1900-01-01')}
														initialFocus
													/>
												</PopoverContent>
											</Popover>
											<FormMessage />
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
														{...field}
													/>
													<Clock className='absolute right-3 top-2.5 h-4 w-4 opacity-50' />
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
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
										onClick={selectAllRecipients}>
										Select All
									</Button>
									<Button
										type='button'
										variant='outline'
										size='sm'
										onClick={clearAllRecipients}>
										Clear All
									</Button>
								</div>
							</div>
							<div className='max-h-40 overflow-y-auto border rounded-md p-3 space-y-2'>
								{subscribedRecipients.map((recipient) => (
									<label
										key={recipient.id}
										className='flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded'>
										<input
											type='checkbox'
											checked={selectedRecipients.includes(recipient.id)}
											onChange={() => toggleRecipient(recipient.id)}
											className='w-4 h-4 text-primary'
										/>
										<div className='flex-1'>
											<div className='font-medium'>{recipient.name}</div>
											<div className='text-sm text-gray-500'>{recipient.email}</div>
										</div>
										<span className='text-xs bg-gray-100 px-2 py-1 rounded'>{recipient.role}</span>
									</label>
								))}
							</div>
							{selectedRecipients.length === 0 && (
								<p className='text-sm text-red-500'>Please select at least one recipient</p>
							)}
						</div>

						{/* Preview */}
						{selectedRecipients.length > 0 && (
							<div className='bg-gray-50 p-4 rounded-md'>
								<h4 className='font-medium mb-2'>Email Preview:</h4>
								<div className='text-sm space-y-1'>
									<p>
										<strong>To:</strong> {selectedRecipients.length} recipients
									</p>
									<p>
										<strong>Subject:</strong> {form.watch('subject') || 'No subject'}
									</p>
									{sendOption === 'schedule' && form.watch('scheduledDate') && (
										<p>
											<strong>Scheduled:</strong> {format(form.watch('scheduledDate')!, 'PPP')} at{' '}
											{form.watch('scheduledTime')}
										</p>
									)}
								</div>
							</div>
						)}

						<DialogFooter>
							<Button
								type='button'
								variant='outline'
								onClick={() => onOpenChange(false)}>
								Cancel
							</Button>
							<Button
								type='submit'
								disabled={selectedRecipients.length === 0}
								className='flex items-center gap-2'>
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
