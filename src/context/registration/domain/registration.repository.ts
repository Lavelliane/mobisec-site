import { Registration } from '@/context/registration/domain/registration.schema';

export interface RegistrationRepository {
	create(registration: Omit<Registration, 'id' | 'createdAt' | 'updatedAt'>): Promise<Registration>;
	findAll(): Promise<Registration[]>;
	findById(id: string): Promise<Registration | null>;
	findByEmail(email: string): Promise<Registration | null>;
	update(id: string, registration: Partial<Registration>): Promise<Registration>;
	delete(id: string): Promise<void>;
}
