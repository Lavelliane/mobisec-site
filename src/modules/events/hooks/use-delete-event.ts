import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteEventRequest {
	id: string;
}

interface DeleteEventResponse {
	success: boolean;
	message?: string;
}

const deleteEvent = async ({ id }: DeleteEventRequest): Promise<DeleteEventResponse> => {
	const response = await fetch(`/api/v1/event/${id}`, {
		method: 'DELETE',
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.message || `Event deletion failed: ${response.status}`);
	}

	return response.json();
};

export const useDeleteEvent = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteEvent,
		onSuccess: (_, { id }) => {
			// Remove the event from cache
			queryClient.removeQueries({
				queryKey: ['event', id],
			});

			// Invalidate events list to refetch updated data
			queryClient.invalidateQueries({
				queryKey: ['events'],
			});
		},
		onError: (error) => {
			console.error('Event deletion failed:', error);
		},
	});
};
