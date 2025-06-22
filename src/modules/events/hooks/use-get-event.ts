import { useQuery } from '@tanstack/react-query';
import { Event } from '@/context/event/domain/event.schema';

interface GetEventResponse {
	success: boolean;
	event: Event;
	message?: string;
}

const getEvent = async (id: string): Promise<GetEventResponse> => {
	const response = await fetch(`/api/v1/event/${id}`);

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.message || `Failed to fetch event: ${response.status}`);
	}

	return response.json();
};

export const useGetEvent = (id: string, enabled: boolean = true) => {
	return useQuery({
		queryKey: ['event', id],
		queryFn: () => getEvent(id),
		enabled: enabled && !!id,
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	});
};
