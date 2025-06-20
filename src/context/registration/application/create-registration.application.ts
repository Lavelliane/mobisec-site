import { RegistrationRepository } from "../domain/registration.repository";
import { Registration } from "../domain/registration.schema";

export const createRegistration = async (registrationRepository: RegistrationRepository, registration: Registration) => {
    return registrationRepository.create(registration);
}

export const findAllRegistrations = async (registrationRepository: RegistrationRepository) => {
    return registrationRepository.findAll();
}

export const findRegistrationById = async (registrationRepository: RegistrationRepository, id: string) => {
    return registrationRepository.findById(id);
}

export const updateRegistration = async (registrationRepository: RegistrationRepository, id: string, registration: Registration) => {
    return registrationRepository.update(id, registration);
}

export const deleteRegistration = async (registrationRepository: RegistrationRepository, id: string) => {
    return registrationRepository.delete(id);
}