import {
	conferenceRegistrations,
	registrationStatusEnum,
	attendeeTypeEnum,
} from '@/context/registration/domain/registration.schema';

import { userProfiles } from '@/context/profile/domain/profile.schema';
import { events } from '@/context/event/domain/event.schema';
import { user as userSchema, session as sessionSchema, verification as verificationSchema, account as accountSchema } from './auth-schema';

// Export enums
export { registrationStatusEnum, attendeeTypeEnum, userProfiles };

// Export tables
export const registration = conferenceRegistrations;
export const profile = userProfiles;
export const event = events;
export const user = userSchema;
export const session = sessionSchema;
export const verification = verificationSchema;
export const account = accountSchema;
