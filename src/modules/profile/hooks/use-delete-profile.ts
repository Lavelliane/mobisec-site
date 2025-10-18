import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteProfileRequest {
	id: string;
}

interface DeleteProfileResponse {
	success: boolean;
	message?: string;
}

const deleteProfile = async ({ id }: DeleteProfileRequest): Promise<DeleteProfileResponse> => {
	const response = await fetch(`/api/v1/profile/${id}`, {
		method: 'DELETE',
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.message || `Profile deletion failed: ${response.status}`);
	}

	return response.json();
};

export const useDeleteProfile = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteProfile,
		onSuccess: (data, variables) => {
			// Remove the specific profile from the cache
			queryClient.removeQueries({
				queryKey: ['profile', variables.id],
			});

			// Invalidate the profiles list to refetch updated data
			queryClient.invalidateQueries({
				queryKey: ['profiles'],
			});
		},
		onError: (error) => {
			console.error('Profile deletion failed:', error);
		},
	});
};
