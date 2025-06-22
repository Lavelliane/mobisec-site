'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useUpdateRegistration } from '@/modules/registrations/hooks';
import { Registration } from '@/context/registration/domain/registration.schema';
import {
	RegistrationFormData,
	registrationSchema,
	titleOptions,
	attendeeTypeOptions,
} from '@/modules/registrations/types';
import { AlertTriangle, Edit, X, Check } from 'lucide-react';
import Link from 'next/link';

interface EditRegistrationCardProps {
	registration: Registration | null;
	onRegistrationUpdate?: (registration: Registration) => void;
}

const EditRegistrationCard: React.FC<EditRegistrationCardProps> = ({ registration, onRegistrationUpdate }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [showRestrictedAlert, setShowRestrictedAlert] = useState(false);
	const updateRegistrationMutation = useUpdateRegistration();

	const registrationForm = useForm<RegistrationFormData>({
		resolver: zodResolver(registrationSchema),
		defaultValues: {
			title: '',
			firstName: '',
			lastName: '',
			email: '',
			affiliation: '',
			attendeeType: 'student',
			isPresenting: false,
			dietaryRequirements: '',
			accessibilityNeeds: '',
			notes: '',
		},
	});

	// Populate form with registration data
	useEffect(() => {
		if (registration) {
			registrationForm.reset({
				title: registration.title || '',
				firstName: registration.firstName,
				lastName: registration.lastName,
				email: registration.email,
				affiliation: registration.affiliation || '',
				attendeeType: registration.attendeeType,
				isPresenting: registration.isPresenting || false,
				dietaryRequirements: registration.dietaryRequirements || '',
				accessibilityNeeds: registration.accessibilityNeeds || '',
				notes: registration.notes || '',
			});
		}
	}, [registration, registrationForm]);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleCancelClick = () => {
		setIsEditing(false);
		// Reset form to original values
		if (registration) {
			registrationForm.reset({
				title: registration.title || '',
				firstName: registration.firstName,
				lastName: registration.lastName,
				email: registration.email,
				affiliation: registration.affiliation || '',
				attendeeType: registration.attendeeType,
				isPresenting: registration.isPresenting || false,
				dietaryRequirements: registration.dietaryRequirements || '',
				accessibilityNeeds: registration.accessibilityNeeds || '',
				notes: registration.notes || '',
			});
		}
		setShowRestrictedAlert(false);
	};

	const handleRestrictedFieldFocus = () => {
		setShowRestrictedAlert(true);
		setTimeout(() => setShowRestrictedAlert(false), 5000);
	};

	const handleRegistrationUpdate = (data: RegistrationFormData) => {
		if (!registration) return;

		const updateData = {
			// Only allow updates to non-restricted fields
			title: data.title || null,
			affiliation: data.affiliation || null,
			isPresenting: data.isPresenting,
			dietaryRequirements: data.dietaryRequirements || null,
			accessibilityNeeds: data.accessibilityNeeds || null,
			notes: data.notes || null,
		};

		updateRegistrationMutation.mutate(
			{
				id: registration.id,
				registration: updateData,
			},
			{
				onSuccess: (response) => {
					setIsEditing(false);
					onRegistrationUpdate?.(response.registration);
				},
				onError: (error) => {
					console.error('Registration update error:', error);
				},
			}
		);
	};

	// Helper function to get attendee type label
	const getAttendeeTypeLabel = (value: string) => {
		const option = attendeeTypeOptions.find((opt) => opt.value === value);
		return option ? option.label : value;
	};

	// Helper function to get title label
	const getTitleLabel = (value: string | null) => {
		if (!value) return 'Not specified';
		const option = titleOptions.find((opt) => opt.value === value);
		return option ? option.label : value;
	};

	if (!registration) {
		return (
			<Card className='w-full h-fit'>
				<CardHeader>
					<h3 className='text-lg font-semibold'>Registration Information</h3>
				</CardHeader>
				<CardContent>
					<div className='text-center'>
						<p className='text-muted-foreground'>No registration found</p>
						<p className='text-sm text-muted-foreground mt-2'>You haven&apos;t registered for the conference yet.</p>
					</div>
					<div className='flex justify-center gap-4 mt-4'>
						<Button
							asChild
							variant='secondary'>
							<Link href='/author-instruction'>Author Instructions</Link>
						</Button>
						<Button asChild>
							<Link href='/registration'>Register</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className='w-full h-fit'>
			<CardHeader>
				<div className='flex justify-between items-center'>
					<div>
						<h3 className='text-lg font-semibold'>Registration Information</h3>
						<p className='text-sm text-muted-foreground'>
							{isEditing ? 'Edit your conference registration details' : 'View your conference registration details'}
						</p>
					</div>
					{!isEditing && (
						<Button
							onClick={handleEditClick}
							variant='secondary'
							size='sm'>
							<Edit className='w-4 h-4 mr-2' />
							Update Registration
						</Button>
					)}
				</div>
			</CardHeader>
			<CardContent>
				{isEditing && showRestrictedAlert && (
					<Alert
						variant='warning'
						className='mb-4'>
						<AlertTriangle className='h-4 w-4' />
						<AlertTitle>Field Restriction</AlertTitle>
						<AlertDescription>
							Name, email, and attendee type cannot be changed here. Please contact the administrator if you need to
							modify these fields.
						</AlertDescription>
					</Alert>
				)}

				{!isEditing ? (
					// Display Mode
					<div className='space-y-6'>
						{/* Personal Information Section */}
						<div className='space-y-4'>
							<h4 className='text-lg font-medium text-foreground border-b pb-2'>Personal Information</h4>

							<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
								<div>
									<label className='text-sm font-medium text-muted-foreground'>Title</label>
									<p className='text-sm mt-1'>{getTitleLabel(registration.title)}</p>
								</div>
								<div>
									<label className='text-sm font-medium text-muted-foreground'>First Name</label>
									<p className='text-sm mt-1'>{registration.firstName}</p>
								</div>
								<div>
									<label className='text-sm font-medium text-muted-foreground'>Last Name</label>
									<p className='text-sm mt-1'>{registration.lastName}</p>
								</div>
							</div>

							<div>
								<label className='text-sm font-medium text-muted-foreground'>Email Address</label>
								<p className='text-sm mt-1'>{registration.email}</p>
							</div>

							<div>
								<label className='text-sm font-medium text-muted-foreground'>Affiliation/Organization</label>
								<p className='text-sm mt-1'>{registration.affiliation || 'Not specified'}</p>
							</div>
						</div>

						{/* Registration Details Section */}
						<div className='space-y-4'>
							<h4 className='text-lg font-medium text-foreground border-b pb-2'>Registration Details</h4>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div>
									<label className='text-sm font-medium text-muted-foreground'>Attendee Type</label>
									<p className='text-sm mt-1'>{getAttendeeTypeLabel(registration.attendeeType)}</p>
								</div>

								<div>
									<label className='text-sm font-medium text-muted-foreground'>Presenting at Conference</label>
									<p className='text-sm mt-1'>{registration.isPresenting ? 'Yes' : 'No'}</p>
								</div>
							</div>
						</div>

						{/* Additional Information Section */}
						<div className='space-y-4'>
							<h4 className='text-lg font-medium text-foreground border-b pb-2'>Additional Information</h4>

							<div>
								<label className='text-sm font-medium text-muted-foreground'>Dietary Requirements</label>
								<p className='text-sm mt-1'>{registration.dietaryRequirements || 'None specified'}</p>
							</div>

							<div>
								<label className='text-sm font-medium text-muted-foreground'>Accessibility Needs</label>
								<p className='text-sm mt-1'>{registration.accessibilityNeeds || 'None specified'}</p>
							</div>

							<div>
								<label className='text-sm font-medium text-muted-foreground'>Additional Notes</label>
								<p className='text-sm mt-1'>{registration.notes || 'None specified'}</p>
							</div>
						</div>
					</div>
				) : (
					// Edit Mode
					<Form {...registrationForm}>
						<form
							onSubmit={registrationForm.handleSubmit(handleRegistrationUpdate)}
							className='space-y-6'>
							{/* Personal Information Section */}
							<div className='space-y-4'>
								<h4 className='text-lg font-medium text-foreground border-b pb-2'>Personal Information</h4>

								<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
									<FormField
										control={registrationForm.control}
										name='title'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Title</FormLabel>
												<Select
													onValueChange={field.onChange}
													value={field.value}>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder='Select title' />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{titleOptions.map((option) => (
															<SelectItem
																key={option.value}
																value={option.value}>
																{option.label}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</FormItem>
										)}
									/>

									<FormField
										control={registrationForm.control}
										name='firstName'
										render={({ field }) => (
											<FormItem>
												<FormLabel>First Name *</FormLabel>
												<FormControl>
													<Input
														{...field}
														placeholder='First name'
														disabled
														className='bg-muted cursor-not-allowed'
														onFocus={handleRestrictedFieldFocus}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={registrationForm.control}
										name='lastName'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Last Name *</FormLabel>
												<FormControl>
													<Input
														{...field}
														placeholder='Last name'
														disabled
														className='bg-muted cursor-not-allowed'
														onFocus={handleRestrictedFieldFocus}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<FormField
									control={registrationForm.control}
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email Address *</FormLabel>
											<FormControl>
												<Input
													{...field}
													type='email'
													placeholder='your.email@example.com'
													disabled
													className='bg-muted cursor-not-allowed'
													onFocus={handleRestrictedFieldFocus}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={registrationForm.control}
									name='affiliation'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Affiliation/Organization</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder='Your affiliation or organization'
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>

							{/* Registration Details Section */}
							<div className='space-y-4'>
								<h4 className='text-lg font-medium text-foreground border-b pb-2'>Registration Details</h4>

								<FormField
									control={registrationForm.control}
									name='attendeeType'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Attendee Type *</FormLabel>
											<Select
												onValueChange={field.onChange}
												value={field.value}
												disabled>
												<FormControl>
													<SelectTrigger
														className='bg-muted cursor-not-allowed'
														onFocus={handleRestrictedFieldFocus}>
														<SelectValue placeholder='Select attendee type' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{attendeeTypeOptions.map((option) => (
														<SelectItem
															key={option.value}
															value={option.value}>
															{option.label}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={registrationForm.control}
									name='isPresenting'
									render={({ field }) => (
										<FormItem className='flex flex-row items-center space-x-3 space-y-0'>
											<FormControl>
												<input
													type='checkbox'
													checked={field.value}
													onChange={field.onChange}
													className='h-4 w-4 rounded border border-input bg-background text-primary focus:ring-2 focus:ring-ring'
												/>
											</FormControl>
											<div className='space-y-1 leading-none'>
												<FormLabel>I will be presenting at the conference</FormLabel>
											</div>
										</FormItem>
									)}
								/>
							</div>

							{/* Additional Information Section */}
							<div className='space-y-4'>
								<h4 className='text-lg font-medium text-foreground border-b pb-2'>Additional Information</h4>

								<FormField
									control={registrationForm.control}
									name='dietaryRequirements'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Dietary Requirements</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder='Any special dietary needs'
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={registrationForm.control}
									name='accessibilityNeeds'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Accessibility Needs</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder='Any accessibility accommodations needed'
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={registrationForm.control}
									name='notes'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Additional Notes</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder='Any additional information'
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>

							<div className='flex justify-end gap-3 pt-4'>
								<Button
									type='button'
									variant='outline'
									onClick={handleCancelClick}
									disabled={updateRegistrationMutation.isPending}>
									<X className='w-4 h-4' />
									Cancel
								</Button>
								<Button
									type='submit'
									disabled={updateRegistrationMutation.isPending}>
									<Check className='w-4 h-4' />
									{updateRegistrationMutation.isPending ? 'Saving...' : 'Finish'}
								</Button>
							</div>
						</form>
					</Form>
				)}
			</CardContent>
		</Card>
	);
};

export default EditRegistrationCard;
