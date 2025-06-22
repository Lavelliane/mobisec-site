import { ProfileRepository } from '../domain/profile.repository';
import { Profile } from '../domain/profile.schema';

export const createProfile = async (profileRepository: ProfileRepository, profile: Profile) => {
	return profileRepository.create(profile);
};

export const findAllProfiles = async (profileRepository: ProfileRepository) => {
	return profileRepository.findAll();
};

export const findProfileById = async (profileRepository: ProfileRepository, id: string) => {
	return profileRepository.findById(id);
};

export const updateProfile = async (profileRepository: ProfileRepository, id: string, profile: Profile) => {
	return profileRepository.update(id, profile);
};

export const deleteProfile = async (profileRepository: ProfileRepository, id: string) => {
	return profileRepository.delete(id);
};
