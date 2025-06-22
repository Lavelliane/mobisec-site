import { Profile } from '@/context/profile/domain/profile.schema';

export interface ProfileRepository {
	create(profile: Profile): Promise<Profile>;
	findAll(): Promise<Profile[]>;
	findById(id: string): Promise<Profile | null>;
	update(id: string, profile: Profile): Promise<Profile>;
	delete(id: string): Promise<void>;
}
