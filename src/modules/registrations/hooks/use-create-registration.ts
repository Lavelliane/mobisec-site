import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Registration } from '@/context/registration/domain/registration.schema';

interface CreateRegistrationRequest {
	registration: Omit<Registration, 'id' | 'createdAt' | 'updatedAt'>;
}

interface CreateRegistrationResponse {
	success: boolean;
	registration: Registration;
	message?: string;
}

const createRegistration = async (data: CreateRegistrationRequest): Promise<CreateRegistrationResponse> => {
	const response = await fetch('/api/v1/registration', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));

		// Create a more detailed error for conflict cases
		if (response.status === 409 && errorData.existingRegistration) {
			const error = new Error(errorData.message || 'Registration already exists') as Error & {
				existingRegistration?: Registration;
				errorCode?: string;
			};
			error.existingRegistration = errorData.existingRegistration;
			error.errorCode = errorData.error;
			throw error;
		}

		throw new Error(errorData.message || `Registration failed: ${response.status}`);
	}

	return response.json();
};

export const useCreateRegistration = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createRegistration,
		onSuccess: (data) => {
			// Invalidate any registration-related queries to refetch updated data
			queryClient.invalidateQueries({
				queryKey: ['registrations'],
			});

			// Optionally set the new registration in the cache
			queryClient.setQueryData(['registration', data.registration.id], data.registration);
		},
		onError: (error) => {
			console.error('Registration creation failed:', error);
		},
	});
};
