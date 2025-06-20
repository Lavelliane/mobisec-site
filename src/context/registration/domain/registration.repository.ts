import { Registration } from "@/context/registration/domain/registration.schema";

export interface RegistrationRepository {
    create(registration: Registration): Promise<Registration>;
    findAll(): Promise<Registration[]>;
    findById(id: string): Promise<Registration | null>;
    update(id: string, registration: Registration): Promise<Registration>;
    delete(id: string): Promise<void>;
}