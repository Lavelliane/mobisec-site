import {
	conferenceRegistrations,
	registrationStatusEnum,
	attendeeTypeEnum,
} from '@/context/registration/domain/registration.schema';

import { userProfiles } from '@/context/profile/domain/profile.schema';

// Export enums
export { registrationStatusEnum, attendeeTypeEnum, userProfiles };

// Export tables
export const registration = conferenceRegistrations;
export const profile = userProfiles;
