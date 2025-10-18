import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteRegistrationRequest {
  id: string;
}

interface DeleteRegistrationResponse {
  success: boolean;
  message?: string;
}

const deleteRegistration = async ({ id }: DeleteRegistrationRequest): Promise<DeleteRegistrationResponse> => {
  const response = await fetch(`/api/v1/registration/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Registration deletion failed: ${response.status}`);
  }

  return response.json();
};

export const useDeleteRegistration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRegistration,
    onSuccess: (data, variables) => {
      // Remove the specific registration from the cache
      queryClient.removeQueries({
        queryKey: ['registration', variables.id],
      });
      
      // Invalidate the registrations list to refetch updated data
      queryClient.invalidateQueries({
        queryKey: ['registrations'],
      });
    },
    onError: (error) => {
      console.error('Registration deletion failed:', error);
    },
  });
}; 