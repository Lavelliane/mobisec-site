import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Registration } from '@/context/registration/domain/registration.schema';

interface UpdateRegistrationRequest {
  id: string;
  registration: Partial<Omit<Registration, 'id' | 'createdAt' | 'updatedAt'>>;
}

interface UpdateRegistrationResponse {
  success: boolean;
  registration: Registration;
  message?: string;
}

const updateRegistration = async ({ id, registration }: UpdateRegistrationRequest): Promise<UpdateRegistrationResponse> => {
  const response = await fetch(`/api/v1/registration/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registration),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Registration update failed: ${response.status}`);
  }

  return response.json();
};

export const useUpdateRegistration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRegistration,
    onSuccess: (data, variables) => {
      // Update the specific registration in the cache
      queryClient.setQueryData(['registration', variables.id], data.registration);
      
      // Invalidate the registrations list to refetch updated data
      queryClient.invalidateQueries({
        queryKey: ['registrations'],
      });
    },
    onError: (error) => {
      console.error('Registration update failed:', error);
    },
  });
}; 