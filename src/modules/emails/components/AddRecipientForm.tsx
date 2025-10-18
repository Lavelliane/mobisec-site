'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const recipientSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	email: z.string().email('Please enter a valid email address'),
	nationality: z.string().min(2, 'Nationality must be at least 2 characters'),
	role: z.enum(['Author', 'Student', 'Reviewer'], {
		required_error: 'Please select a role',
	}),
	receiveEmails: z.boolean(),
});

type RecipientFormData = z.infer<typeof recipientSchema>;

interface AddRecipientFormProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	onSubmit: (data: RecipientFormData) => void;
	trigger: React.ReactNode;
}

const AddRecipientForm: React.FC<AddRecipientFormProps> = ({ isOpen, onOpenChange, onSubmit, trigger }) => {
	const form = useForm<RecipientFormData>({
		resolver: zodResolver(recipientSchema),
		defaultValues: {
			name: '',
			email: '',
			nationality: '',
			role: 'Author',
			receiveEmails: true,
		},
	});

	const handleSubmit = (data: RecipientFormData) => {
		onSubmit(data);
		form.reset();
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={onOpenChange}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className='sm:max-w-[425px] bg-white'>
				<DialogHeader>
					<DialogTitle>Add New Recipient</DialogTitle>
					<DialogDescription>Add a new email recipient to your list. Fill in all the details below.</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className='space-y-4'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											placeholder='Enter full name'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											placeholder='Enter email address'
											type='email'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='nationality'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nationality</FormLabel>
									<FormControl>
										<Input
											placeholder='Enter nationality'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='role'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Role</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Select a role' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value='Author'>Author</SelectItem>
											<SelectItem value='Reviewer'>Reviewer</SelectItem>
											<SelectItem value='Student'>Student</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button
								type='button'
								variant='outline'
								onClick={() => onOpenChange(false)}>
								Cancel
							</Button>
							<Button type='submit'>Add Recipient</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default AddRecipientForm;
export type { RecipientFormData };
