import { RegistrationRepository } from '../domain/registration.repository';
import { Registration } from '../domain/registration.schema';

export const createRegistration = async (
	registrationRepository: RegistrationRepository,
	registration: Omit<Registration, 'id' | 'createdAt' | 'updatedAt'>
) => {
	return registrationRepository.create(registration);
};

export const findAllRegistrations = async (registrationRepository: RegistrationRepository) => {
	return registrationRepository.findAll();
};

export const findRegistrationById = async (registrationRepository: RegistrationRepository, id: string) => {
	return registrationRepository.findById(id);
};

export const findRegistrationByEmail = async (registrationRepository: RegistrationRepository, email: string) => {
	return registrationRepository.findByEmail(email);
};

export const updateRegistration = async (
	registrationRepository: RegistrationRepository,
	id: string,
	registration: Partial<Registration>
) => {
	return registrationRepository.update(id, registration);
};

export const deleteRegistration = async (registrationRepository: RegistrationRepository, id: string) => {
	return registrationRepository.delete(id);
};
