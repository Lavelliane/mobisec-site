'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { useCreateProfile, useGetProfiles, useUpdateProfile } from '@/modules/profile/hooks';
import { useGetRegistrations } from '@/modules/registrations/hooks';
import { Profile } from '@/context/profile/domain/profile.schema';
import { Registration } from '@/context/registration/domain/registration.schema';
import { useSession } from 'next-auth/react';
import { ProfileFormData } from '@/modules/profile/types';
import ProfileCard from './ProfileCard';
import CreateProfileForm from './CreateProfileForm';
import EditProfileDialog from './EditProfileDialog';
import EditRegistrationCard from './EditRegistrationCard';
import SkeletonProfilePage from './SkeletonProfilePage';

const ProfilePage = () => {
	const { data: session } = useSession();
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [userProfile, setUserProfile] = useState<Profile | null>(null);
	const [userRegistration, setUserRegistration] = useState<Registration | null>(null);

	// Hooks for API operations
	const { data: profilesData, isLoading, error } = useGetProfiles();
	const { data: registrationsData, isLoading: registrationsLoading } = useGetRegistrations();
	const createProfileMutation = useCreateProfile();
	const updateProfileMutation = useUpdateProfile();

	const profiles = useMemo(() => profilesData?.profiles || [], [profilesData]);
	const registrations = useMemo(() => registrationsData?.registrations || [], [registrationsData]);

	// Find current user's profile and registration
	useEffect(() => {
		if (session?.user?.email && profiles.length > 0) {
			const currentUserProfile = profiles.find((p) => p.email === session.user?.email);
			setUserProfile(currentUserProfile || null);
		}
	}, [session?.user?.email, profiles]);

	useEffect(() => {
		if (session?.user?.email && registrations.length > 0) {
			const currentUserRegistration = registrations.find((r) => r.email === session.user?.email);
			setUserRegistration(currentUserRegistration || null);
		}
	}, [session?.user?.email, registrations]);

	// Handle creating new profile
	const handleCreateProfile = (data: ProfileFormData) => {
		const profileData = {
			...data,
			title: data.title || null,
			affiliation: data.affiliation || null,
			nationality: data.nationality || null,
			receiveEmails: data.receiveEmails ?? true,
		};

		createProfileMutation.mutate(
			{ profile: profileData },
			{
				onSuccess: (response) => {
					setUserProfile(response.profile);
					toast.success('Profile created successfully!');
				},
				onError: (error) => {
					console.error('Create profile error:', error);
					toast.error('Failed to create profile. Please try again.');
				},
			}
		);
	};

	// Handle editing existing profile
	const handleEditProfile = () => {
		setIsEditDialogOpen(true);
	};

	const handleUpdateProfile = (data: ProfileFormData) => {
		if (!userProfile) return;

		const profileData = {
			...data,
			title: data.title || null,
			affiliation: data.affiliation || null,
			nationality: data.nationality || null,
			receiveEmails: data.receiveEmails ?? true,
		};

		updateProfileMutation.mutate(
			{
				id: userProfile.id,
				profile: profileData,
			},
			{
				onSuccess: (response) => {
					setUserProfile(response.profile);
					setIsEditDialogOpen(false);
					toast.success('Profile updated successfully!');
				},
				onError: (error) => {
					console.error('Update profile error:', error);
					toast.error('Failed to update profile. Please try again.');
				},
			}
		);
	};

	if (error) {
		return (
			<div className='container mx-auto py-12 px-4'>
				<div className='max-w-6xl mx-auto'>
					<Card>
						<CardContent className='py-12'>
							<div className='text-center'>
								<p className='text-red-600'>Error loading data: {error.message}</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	if (isLoading || registrationsLoading) {
		return <SkeletonProfilePage />;
	}

	return (
		<div className='max-w-6xl w-full h-full py-12 px-4'>
			{/* Two-column layout: Profile (left) and Registration (right) */}
			{userProfile ? (
				<div className='flex flex-row gap-8 h-full w-full'>
					{/* Left Column - Registration Information */}

					<EditRegistrationCard
						registration={userRegistration}
						onRegistrationUpdate={setUserRegistration}
					/>

					{/* Right Column - Profile */}

					<ProfileCard
						userProfile={userProfile}
						onEdit={handleEditProfile}
					/>
				</div>
			) : (
				<div className='max-w-2xl mx-auto'>
					<CreateProfileForm
						onSubmit={handleCreateProfile}
						isLoading={createProfileMutation.isPending}
						defaultEmail={session?.user?.email || undefined}
					/>
				</div>
			)}

			{/* Edit Profile Dialog */}
			<EditProfileDialog
				isOpen={isEditDialogOpen}
				onOpenChange={setIsEditDialogOpen}
				userProfile={userProfile}
				onSubmit={handleUpdateProfile}
				isLoading={updateProfileMutation.isPending}
			/>
		</div>
	);
};

export default ProfilePage;
