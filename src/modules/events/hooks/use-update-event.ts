import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Event } from '@/context/event/domain/event.schema';

interface UpdateEventRequest {
	id: string;
	event: Partial<Omit<Event, 'id' | 'createdAt' | 'updatedAt'>>;
}

interface UpdateEventResponse {
	success: boolean;
	event: Event;
	message?: string;
}

const updateEvent = async ({ id, event }: UpdateEventRequest): Promise<UpdateEventResponse> => {
	const response = await fetch(`/api/v1/event/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(event),
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.message || `Event update failed: ${response.status}`);
	}

	return response.json();
};

export const useUpdateEvent = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateEvent,
		onSuccess: (data) => {
			// Update the specific event in the cache
			queryClient.setQueryData(['event', data.event.id], data.event);

			// Invalidate events list to refetch updated data
			queryClient.invalidateQueries({
				queryKey: ['events'],
			});
		},
		onError: (error) => {
			console.error('Event update failed:', error);
		},
	});
};
