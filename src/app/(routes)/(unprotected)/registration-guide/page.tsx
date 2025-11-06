import RegistrationPage from "@/modules/registration-guide/MobisecRegistrationGuidePage";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: 'Registration Guide | MobiSec',
	description: 'Registration guide for MobiSec',
};

export default function RegistrationPageComponent() {
	return <RegistrationPage />;
}