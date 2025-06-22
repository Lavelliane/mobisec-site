import { useQuery } from '@tanstack/react-query';
import { Registration } from '@/context/registration/domain/registration.schema';

interface GetRegistrationResponse {
	success: boolean;
	registration: Registration;
	message?: string;
}

const getRegistration = async (id: string): Promise<GetRegistrationResponse> => {
	const response = await fetch(`/api/v1/registration/${id}`);

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.message || `Failed to fetch registration: ${response.status}`);
	}

	return response.json();
};

const getRegistrationByEmail = async (email: string): Promise<Registration | null> => {
	const response = await fetch(`/api/v1/registration?email=${encodeURIComponent(email)}`);

	if (!response.ok) {
		if (response.status === 404) {
			return null; // No registration found
		}
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.message || `Failed to fetch registration: ${response.status}`);
	}

	const data = await response.json();
	return data.registration || null;
};

export const useGetRegistration = (id: string) => {
	return useQuery({
		queryKey: ['registration', id],
		queryFn: () => getRegistration(id),
		enabled: !!id,
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	});
};

export const useGetRegistrationByEmail = (email: string) => {
	return useQuery({
		queryKey: ['registration', 'email', email],
		queryFn: () => getRegistrationByEmail(email),
		enabled: !!email,
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	});
};
