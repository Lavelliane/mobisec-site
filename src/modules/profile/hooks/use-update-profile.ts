import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Profile } from '@/context/profile/domain/profile.schema';

interface UpdateProfileRequest {
	id: string;
	profile: Partial<Omit<Profile, 'id' | 'createdAt' | 'updatedAt'>>;
}

interface UpdateProfileResponse {
	success: boolean;
	profile: Profile;
	message?: string;
}

const updateProfile = async ({ id, profile }: UpdateProfileRequest): Promise<UpdateProfileResponse> => {
	const response = await fetch(`/api/v1/profile/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(profile),
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.message || `Profile update failed: ${response.status}`);
	}

	return response.json();
};

export const useUpdateProfile = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateProfile,
		onSuccess: (data, variables) => {
			// Update the specific profile in the cache
			queryClient.setQueryData(['profile', variables.id], data.profile);

			// Invalidate the profiles list to refetch updated data
			queryClient.invalidateQueries({
				queryKey: ['profiles'],
			});
		},
		onError: (error) => {
			console.error('Profile update failed:', error);
		},
	});
};
