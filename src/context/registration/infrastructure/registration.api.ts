import { db } from "@/db/drizzle";
import { Registration } from "../domain/registration.schema";
import { conferenceRegistrations } from "../domain/registration.schema";
import { RegistrationRepository } from "../domain/registration.repository";
import { eq } from 'drizzle-orm';

export const RegistrationApi = (): RegistrationRepository => {
    return {
        create: createRegistration,
        findAll: findAllRegistrations,
        findById: findRegistrationById,
        update: updateRegistration,
        delete: deleteRegistration
    }
}

/**
 * Creates a new registration in the database
 * @param {Registration} registration - The registration data to create
 * @returns {Promise<Registration>} The created registration with generated ID
 */
async function createRegistration(registration: Registration): Promise<Registration> {
    const result = await db.insert(conferenceRegistrations).values(registration).returning();
    return result[0];
}

/**
 * Retrieves all registrations from the database
 * @returns {Promise<Registration[]>} Array of all registrations
 */
async function findAllRegistrations(): Promise<Registration[]> {
    const result = await db.select().from(conferenceRegistrations);
    return result;
}

/**
 * Finds a registration by its unique identifier
 * @param {string} id - The unique identifier of the registration
 * @returns {Promise<Registration | null>} The found registration or null if not found
 */
async function findRegistrationById(id: string): Promise<Registration | null> {
    const result = await db.select().from(conferenceRegistrations).where(eq(conferenceRegistrations.id, id));
    return result[0] || null;
}

/**
 * Updates an existing registration in the database
 * @param {string} id - The unique identifier of the registration to update
 * @param {Registration} registration - The updated registration data
 * @returns {Promise<Registration>} The updated registration
 */
async function updateRegistration(id: string, registration: Registration): Promise<Registration> {
    const result = await db.update(conferenceRegistrations).set(registration).where(eq(conferenceRegistrations.id, id)).returning();
    return result[0];
}

/**
 * Deletes a registration from the database
 * @param {string} id - The unique identifier of the registration to delete
 * @returns {Promise<void>}
 */
async function deleteRegistration(id: string): Promise<void> {
    await db.delete(conferenceRegistrations).where(eq(conferenceRegistrations.id, id));
}

