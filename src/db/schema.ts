import { 
  conferenceRegistrations, 
  registrationStatusEnum, 
  attendeeTypeEnum 
} from "@/context/registration/domain/registration.schema";

// Export enums
export { registrationStatusEnum, attendeeTypeEnum };

// Export tables
export const registration = conferenceRegistrations;