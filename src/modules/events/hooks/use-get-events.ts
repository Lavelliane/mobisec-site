import { useQuery } from '@tanstack/react-query';
import { Event } from '@/context/event/domain/event.schema';

interface GetEventsResponse {
	success: boolean;
	events: Event[];
	message?: string;
}

const getEvents = async (activeOnly?: boolean): Promise<GetEventsResponse> => {
	const url = activeOnly ? '/api/v1/event?active=true' : '/api/v1/event';
	const response = await fetch(url);

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.message || `Failed to fetch events: ${response.status}`);
	}

	return response.json();
};

export const useGetEvents = (activeOnly?: boolean) => {
	return useQuery({
		queryKey: ['events', { activeOnly }],
		queryFn: () => getEvents(activeOnly),
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	});
};
