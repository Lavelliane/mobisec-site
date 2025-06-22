import { db } from '@/db/drizzle';
import { Profile } from '../domain/profile.schema';
import { userProfiles } from '../domain/profile.schema';
import { ProfileRepository } from '../domain/profile.repository';
import { eq } from 'drizzle-orm';

export const ProfileApi = (): ProfileRepository => {
	return {
		create: createProfile,
		findAll: findAllProfiles,
		findById: findProfileById,
		update: updateProfile,
		delete: deleteProfile,
	};
};

/**
 * Creates a new profile in the database
 * @param {Profile} profile - The profile data to create
 * @returns {Promise<Profile>} The created profile with generated ID
 */
async function createProfile(profile: Profile): Promise<Profile> {
	const result = await db.insert(userProfiles).values(profile).returning();
	return result[0];
}

/**
 * Retrieves all profiles from the database
 * @returns {Promise<Profile[]>} Array of all profiles
 */
async function findAllProfiles(): Promise<Profile[]> {
	const result = await db.select().from(userProfiles);
	return result;
}

/**
 * Finds a profile by its unique identifier
 * @param {string} id - The unique identifier of the profile
 * @returns {Promise<Profile | null>} The found profile or null if not found
 */
async function findProfileById(id: string): Promise<Profile | null> {
	const result = await db.select().from(userProfiles).where(eq(userProfiles.id, id));
	return result[0] || null;
}

/**
 * Updates an existing profile in the database
 * @param {string} id - The unique identifier of the profile to update
 * @param {Profile} profile - The updated profile data
 * @returns {Promise<Profile>} The updated profile
 */
async function updateProfile(id: string, profile: Profile): Promise<Profile> {
	const result = await db.update(userProfiles).set(profile).where(eq(userProfiles.id, id)).returning();
	return result[0];
}

/**
 * Deletes a profile from the database
 * @param {string} id - The unique identifier of the profile to delete
 * @returns {Promise<void>}
 */
async function deleteProfile(id: string): Promise<void> {
	await db.delete(userProfiles).where(eq(userProfiles.id, id));
}
