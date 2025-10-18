import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Profile } from '@/context/profile/domain/profile.schema';

interface CreateProfileRequest {
	profile: Omit<Profile, 'id' | 'createdAt' | 'updatedAt'>;
}

interface CreateProfileResponse {
	success: boolean;
	profile: Profile;
	message?: string;
}

const createProfile = async (data: CreateProfileRequest): Promise<CreateProfileResponse> => {
	const response = await fetch('/api/v1/profile', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.message || `Profile creation failed: ${response.status}`);
	}

	return response.json();
};

export const useCreateProfile = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createProfile,
		onSuccess: (data) => {
			// Invalidate any profile-related queries to refetch updated data
			queryClient.invalidateQueries({
				queryKey: ['profiles'],
			});

			// Optionally set the new profile in the cache
			queryClient.setQueryData(['profile', data.profile.id], data.profile);
		},
		onError: (error) => {
			console.error('Profile creation failed:', error);
		},
	});
};
