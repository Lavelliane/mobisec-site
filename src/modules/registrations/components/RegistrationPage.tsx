'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { useCreateRegistration, useGetRegistrationByEmail } from '@/modules/registrations/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { useGetProfiles } from '@/modules/profile/hooks';
import { Profile } from '@/context/profile/domain/profile.schema';
import { Registration } from '@/context/registration/domain/registration.schema';
import { useSession } from 'next-auth/react';
import { RegistrationFormData, RegistrationType } from '@/modules/registrations/types';
import RegistrationTypeSelector from './RegistrationTypeSelector';
import RegistrationForm from './RegistrationForm';
import EditRegistrationCard from '@/modules/registrations/components/EditRegistrationCard';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

const RegistrationPage = () => {
	const router = useRouter();
	const { data: session } = useSession();
	const queryClient = useQueryClient();
	const [registrationType, setRegistrationType] = useState<RegistrationType>('self');
	const [userProfile, setUserProfile] = useState<Profile | null>(null);
	const [existingRegistration, setExistingRegistration] = useState<Registration | null>(null);

	// Hooks for API operations
	const { data: profilesData, isLoading: profilesLoading } = useGetProfiles();
	const createRegistrationMutation = useCreateRegistration();

	// Check for existing registration when user email is available
	const { data: existingRegData, isLoading: existingRegLoading } = useGetRegistrationByEmail(
		session?.user?.email || ''
	);

	const profiles = useMemo(() => profilesData?.profiles || [], [profilesData]);

	// Find current user's profile
	useEffect(() => {
		if (session?.user?.email && profiles.length > 0) {
			const currentUserProfile = profiles.find((p) => p.email === session.user?.email);
			setUserProfile(currentUserProfile || null);
		}
	}, [session?.user?.email, profiles]);

	// Set existing registration if found
	useEffect(() => {
		if (existingRegData) {
			setExistingRegistration(existingRegData);
		}
	}, [existingRegData]);

	// Handle registration submission for new registrations
	const handleRegistrationSubmit = (data: RegistrationFormData) => {
		const registrationData = {
			...data,
			title: data.title || null,
			affiliation: data.affiliation || null,
			dietaryRequirements: data.dietaryRequirements || null,
			accessibilityNeeds: data.accessibilityNeeds || null,
			notes: data.notes || null,
			registrationStatus: 'pending' as const,
		};

		createRegistrationMutation.mutate(
			{ registration: registrationData },
			{
				onSuccess: () => {
					toast.success('Registration submitted successfully!');
					router.push('/profile');
				},
				onError: (error: Error & { existingRegistration?: Registration; errorCode?: string }) => {
					console.error('Registration error:', error);

					// Handle specific error cases
					if (error.message?.includes('already exists') || error.errorCode === 'REGISTRATION_EXISTS') {
						toast.error(
							'You are already registered for this conference. Please update your existing registration instead.'
						);

						// If we have the existing registration data from the error, use it directly
						if (error.existingRegistration && registrationType === 'self') {
							setExistingRegistration(error.existingRegistration);
						} else {
							// Otherwise, refetch the registration data to get the existing registration
							if (session?.user?.email) {
								queryClient.invalidateQueries({
									queryKey: ['registration', 'email', session.user.email],
								});
							}
						}

						// For "other" registrations, show additional helpful message
						if (registrationType === 'other') {
							toast.info(
								'The person you are trying to register already has an account. Please ask them to update their own registration.'
							);
						}
					} else {
						toast.error(error.message || 'Failed to submit registration. Please try again.');
					}
				},
			}
		);
	};

	// Handle registration update
	const handleRegistrationUpdate = (registration: Registration) => {
		setExistingRegistration(registration);
		toast.success('Registration updated successfully!');
	};

	// Show loading state
	if (profilesLoading || existingRegLoading) {
		return (
			<div className='container mx-auto py-12 px-4'>
				<div className='max-w-4xl mx-auto'>
					<Card>
						<CardContent className='py-12'>
							<div className='text-center'>
								<p className='text-muted-foreground'>Loading...</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	// Show normal registration form with type selector
	return (
		<div className='container mx-auto py-12 px-4'>
			<div className='max-w-4xl mx-auto'>
				<div className='flex flex-col items-center justify-center gap-4 mb-8'>
					<h1 className='text-4xl font-bold text-foreground text-center'>
						{existingRegistration && registrationType === 'self'
							? 'Update Your Registration'
							: 'Conference Registration'}
					</h1>
					<h2 className='text-xl text-muted-foreground text-center'>
						{existingRegistration && registrationType === 'self'
							? 'You are already registered for the MobiSec conference'
							: 'Register for the upcoming MobiSec conference'}
					</h2>

					{/* Show warning for existing registration */}
					{existingRegistration && registrationType === 'self' && (
						<Alert
							variant='warning'
							className='flex-1'>
							<AlertTriangle className='h-4 w-4' />
							<AlertTitle>Existing Registration Found</AlertTitle>
							<AlertDescription>You can only update your existing registration below.</AlertDescription>
						</Alert>
					)}
				</div>

				{/* Registration Type Selector - Always show this */}
				<RegistrationTypeSelector
					selectedType={registrationType}
					onTypeChange={setRegistrationType}
				/>

				{/* Conditional rendering based on registration type and existing registration */}
				{existingRegistration && registrationType === 'self' ? (
					// Show edit form for existing self registration
					<div className='mt-6'>
						<EditRegistrationCard
							registration={existingRegistration}
							onRegistrationUpdate={handleRegistrationUpdate}
						/>
					</div>
				) : (
					// Show normal registration form for new registrations or "other" type
					<RegistrationForm
						onSubmit={handleRegistrationSubmit}
						isLoading={createRegistrationMutation.isPending}
						registrationType={registrationType}
						userProfile={registrationType === 'self' ? userProfile : null}
					/>
				)}
			</div>
		</div>
	);
};

export default RegistrationPage;
