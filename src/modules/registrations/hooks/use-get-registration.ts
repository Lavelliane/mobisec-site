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

export const useGetRegistration = (id: string | undefined) => {
  return useQuery({
    queryKey: ['registration', id],
    queryFn: () => getRegistration(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}; 