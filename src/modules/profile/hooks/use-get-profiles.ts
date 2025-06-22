import { useQuery } from '@tanstack/react-query';
import { Profile } from '@/context/profile/domain/profile.schema';

interface GetProfilesResponse {
	success: boolean;
	profiles: Profile[];
	message?: string;
}

const getProfiles = async (): Promise<GetProfilesResponse> => {
	const response = await fetch('/api/v1/profile');

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.message || `Failed to fetch profiles: ${response.status}`);
	}

	return response.json();
};

export const useGetProfiles = () => {
	return useQuery({
		queryKey: ['profiles'],
		queryFn: getProfiles,
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	});
};
