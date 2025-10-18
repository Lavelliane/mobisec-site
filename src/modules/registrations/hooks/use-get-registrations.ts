import { useQuery } from '@tanstack/react-query';
import { Registration } from '@/context/registration/domain/registration.schema';

interface GetRegistrationsResponse {
  success: boolean;
  registrations: Registration[];
  message?: string;
}

const getRegistrations = async (): Promise<GetRegistrationsResponse> => {
  const response = await fetch('/api/v1/registration');

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to fetch registrations: ${response.status}`);
  }

  return response.json();
};

export const useGetRegistrations = () => {
  return useQuery({
    queryKey: ['registrations'],
    queryFn: getRegistrations,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}; 