import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Event } from '@/context/event/domain/event.schema';

interface CreateEventRequest {
	event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>;
}

interface CreateEventResponse {
	success: boolean;
	event: Event;
	message?: string;
}

const createEvent = async (data: CreateEventRequest): Promise<CreateEventResponse> => {
	const response = await fetch('/api/v1/event', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.message || `Event creation failed: ${response.status}`);
	}

	return response.json();
};

export const useCreateEvent = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createEvent,
		onSuccess: (data) => {
			// Invalidate any event-related queries to refetch updated data
			queryClient.invalidateQueries({
				queryKey: ['events'],
			});

			// Optionally set the new event in the cache
			queryClient.setQueryData(['event', data.event.id], data.event);
		},
		onError: (error) => {
			console.error('Event creation failed:', error);
		},
	});
};
