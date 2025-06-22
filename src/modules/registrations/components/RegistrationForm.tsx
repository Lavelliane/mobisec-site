import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';
import {
	registrationSchema,
	RegistrationFormData,
	titleOptions,
	attendeeTypeOptions,
	RegistrationType,
} from '@/modules/registrations/types';
import { Profile } from '@/context/profile/domain/profile.schema';
import { useGetRegistrationByEmail } from '@/modules/registrations/hooks';
import { AlertTriangle, Info, Loader2 } from 'lucide-react';
import { useGetEvents } from '@/modules/events/hooks';
import EventDetailsCard from './EventDetailsCard';

interface RegistrationFormProps {
	onSubmit: (data: RegistrationFormData, eventId?: string) => void;
	isLoading: boolean;
	registrationType: RegistrationType;
	userProfile?: Profile | null;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit, isLoading, registrationType, userProfile }) => {
	const userProfileMemo = useMemo(() => userProfile, [userProfile]);
	const [watchedEmail, setWatchedEmail] = useState('');
	const [showExistingWarning, setShowExistingWarning] = useState(false);

	// Get active events
	const { data: eventsData, isLoading: eventsLoading } = useGetEvents(true);

	// Get the active event (latest one that's both active and has registration open)
	const activeEvent = useMemo(() => {
		if (!eventsData?.events) return null;

		return (
			eventsData.events
				.filter((event) => event.isActiveEvent && event.isActiveRegistration)
				.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0] || null
		);
	}, [eventsData]);

	const registrationForm = useForm<RegistrationFormData>({
		resolver: zodResolver(registrationSchema),
		defaultValues: {
			title: userProfileMemo?.title || '',
			firstName: userProfileMemo?.firstName || '',
			lastName: userProfileMemo?.lastName || '',
			email: userProfileMemo?.email || '',
			affiliation: userProfileMemo?.affiliation || '',
			attendeeType: 'student',
			isPresenting: false,
			dietaryRequirements: '',
			accessibilityNeeds: '',
			notes: '',
		},
	});

	// Check for existing registration when email changes (for "other" registration type)
	const { data: existingRegistration, isLoading: checkingExisting } = useGetRegistrationByEmail(
		watchedEmail && registrationType === 'other' ? watchedEmail : ''
	);

	// Watch email field for changes
	const emailValue = registrationForm.watch('email');

	useEffect(() => {
		if (registrationType === 'other' && emailValue && emailValue !== watchedEmail) {
			// Debounce email checking
			const timer = setTimeout(() => {
				setWatchedEmail(emailValue);
			}, 1000);
			return () => clearTimeout(timer);
		}
	}, [emailValue, registrationType, watchedEmail]);

	// Show warning if existing registration found
	useEffect(() => {
		if (existingRegistration && registrationType === 'other') {
			setShowExistingWarning(true);
			toast.warning('This email address is already registered for the conference.');
		} else {
			setShowExistingWarning(false);
		}
	}, [existingRegistration, registrationType]);

	// Pre-populate form with profile data for self registration
	useEffect(() => {
		const timeout = setTimeout(() => {
			if (registrationType === 'self' && userProfileMemo) {
				registrationForm.reset({
					title: userProfileMemo.title || '',
					firstName: userProfileMemo.firstName,
					lastName: userProfileMemo.lastName,
					email: userProfileMemo.email,
					affiliation: userProfileMemo.affiliation || '',
					attendeeType: 'student',
					isPresenting: false,
					dietaryRequirements: '',
					accessibilityNeeds: '',
					notes: '',
				});
			} else if (registrationType === 'other') {
				registrationForm.reset({
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
				});
			}
		}, 200);

		return () => clearTimeout(timeout);
	}, [registrationType, userProfileMemo, registrationForm]);

	const handleSubmit = (data: RegistrationFormData) => {
		// Prevent submission if there's an existing registration for "other" type
		if (registrationType === 'other' && existingRegistration) {
			toast.error(
				'This email address is already registered. Please use a different email address or ask the person to update their own registration.'
			);
			return;
		}

		// Prevent submission if no active event is found
		if (!activeEvent) {
			toast.error('No active event found. Please contact the organizer.');
			return;
		}

		onSubmit(data, activeEvent.id);
	};

	// Show loading state if events are loading
	if (eventsLoading) {
		return (
			<Card className='bg-white'>
				<CardContent className='py-12'>
					<div className='text-center'>
						<Loader2 className='h-8 w-8 animate-spin mx-auto mb-4' />
						<p className='text-muted-foreground'>Loading event information...</p>
					</div>
				</CardContent>
			</Card>
		);
	}

	// Show error if no active event is found
	if (!activeEvent) {
		return (
			<Card className='bg-white'>
				<CardContent className='py-12'>
					<Alert variant='destructive'>
						<AlertTriangle className='h-4 w-4' />
						<AlertTitle>No Active Event</AlertTitle>
						<AlertDescription>
							There is currently no active event with registration open. Please contact the organizer or check back
							later.
						</AlertDescription>
					</Alert>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className='space-y-6'>
			{/* Event Details Section */}
			<EventDetailsCard event={activeEvent} />

			<Card className='bg-white'>
				<CardHeader>
					<div className='text-center'>
						<h3 className='text-xl font-semibold mb-2'>
							{registrationType === 'self' ? 'Your Registration' : 'Registration Details'}
						</h3>
						<p className='text-muted-foreground'>
							{registrationType === 'self'
								? 'Complete your conference registration'
								: 'Fill in the details for the person you are registering'}
						</p>
					</div>
				</CardHeader>
				<CardContent>
					{/* Warning for existing registration */}
					{showExistingWarning && registrationType === 'other' && (
						<Alert
							variant='warning'
							className='mb-6'>
							<AlertTriangle className='h-4 w-4' />
							<AlertTitle>Registration Already Exists</AlertTitle>
							<AlertDescription>
								This email address is already registered for the conference. The person should update their existing
								registration instead of creating a new one.
							</AlertDescription>
						</Alert>
					)}

					{/* Info about self registration */}
					{registrationType === 'self' && (
						<Alert className='mb-6'>
							<Info className='h-4 w-4' />
							<AlertTitle>Self Registration</AlertTitle>
							<AlertDescription>
								Your profile information has been pre-filled. You can modify any details before submitting your
								registration.
							</AlertDescription>
						</Alert>
					)}

					{/* Info about registering for others */}
					{registrationType === 'other' && (
						<Alert className='mb-6'>
							<Info className='h-4 w-4' />
							<AlertTitle>Register for Others</AlertTitle>
							<AlertDescription>
								You are registering someone else for the conference. Please fill in their complete information. We will
								check if they are already registered.
							</AlertDescription>
						</Alert>
					)}

					<Form {...registrationForm}>
						<form
							onSubmit={registrationForm.handleSubmit(handleSubmit)}
							className='space-y-6'>
							{/* Personal Information Section */}
							<div className='space-y-4'>
								<h4 className='text-lg font-medium text-foreground border-b pb-2'>Personal Information</h4>
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

								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<FormField
										control={registrationForm.control}
										name='firstName'
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													First Name <span className='text-red-500'>*</span>
												</FormLabel>
												<FormControl>
													<Input
														placeholder='Enter first name'
														{...field}
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
												<FormLabel>
													Last Name <span className='text-red-500'>*</span>
												</FormLabel>
												<FormControl>
													<Input
														placeholder='Enter last name'
														{...field}
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
											<FormLabel>
												Email <span className='text-red-500'>*</span>
											</FormLabel>
											<FormControl>
												<div className='relative'>
													<Input
														type='email'
														placeholder='Enter email address'
														{...field}
														disabled={registrationType === 'self'}
														className={registrationType === 'self' ? 'bg-muted' : ''}
													/>
													{checkingExisting && registrationType === 'other' && (
														<div className='absolute right-3 top-3'>
															<Loader2 className='h-4 w-4 animate-spin text-primary' />
														</div>
													)}
												</div>
											</FormControl>
											<FormMessage />
											{registrationType === 'self' && (
												<p className='text-sm text-muted-foreground'>Email cannot be changed for self-registration</p>
											)}
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
													placeholder='Enter affiliation or organization'
													{...field}
												/>
											</FormControl>
											<FormMessage />
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
											<FormLabel>
												Attendee Type <span className='text-red-500'>*</span>
											</FormLabel>
											<Select
												onValueChange={field.onChange}
												value={field.value}>
												<FormControl>
													<SelectTrigger>
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
													placeholder='Any dietary restrictions or requirements'
													{...field}
												/>
											</FormControl>
											<FormMessage />
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
													placeholder='Any accessibility accommodations needed'
													{...field}
												/>
											</FormControl>
											<FormMessage />
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
													placeholder='Any additional information or comments'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<Button
								type='submit'
								className='w-full'
								disabled={isLoading || (registrationType === 'other' && !!existingRegistration)}>
								{isLoading
									? 'Submitting Registration...'
									: registrationType === 'other' && existingRegistration
										? 'Email Already Registered'
										: 'Submit Registration'}
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};

export default RegistrationForm;
