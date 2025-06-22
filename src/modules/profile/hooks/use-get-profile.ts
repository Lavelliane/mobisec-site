import { useQuery } from '@tanstack/react-query';
import { Profile } from '@/context/profile/domain/profile.schema';

interface GetProfileResponse {
	success: boolean;
	profile: Profile;
	message?: string;
}

const getProfile = async (id: string): Promise<GetProfileResponse> => {
	const response = await fetch(`/api/v1/profile/${id}`);

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.message || `Failed to fetch profile: ${response.status}`);
	}

	return response.json();
};

export const useGetProfile = (id: string | undefined) => {
	return useQuery({
		queryKey: ['profile', id],
		queryFn: () => getProfile(id!),
		enabled: !!id,
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	});
};
