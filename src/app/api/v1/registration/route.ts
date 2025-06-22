import {
	createRegistration,
	findAllRegistrations,
	findRegistrationByEmail,
} from '@/context/registration/application/create-registration.application';
import { Registration } from '@/context/registration/domain/registration.schema';
import { RegistrationApi } from '@/context/registration/infrastructure/registration.api';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		// Extract the registration data from the request body
		const registrationData = body.registration || body;

		const registrationRepository = RegistrationApi();

		// Check if a registration with this email already exists
		const existingRegistration = await findRegistrationByEmail(registrationRepository, registrationData.email);

		if (existingRegistration) {
			return NextResponse.json(
				{
					success: false,
					message:
						'A registration with this email address already exists. Please update your existing registration instead.',
					error: 'REGISTRATION_EXISTS',
					existingRegistration: existingRegistration,
				},
				{ status: 409 } // Conflict status code
			);
		}

		// Map form fields to database schema
		const registration: Omit<Registration, 'id' | 'createdAt' | 'updatedAt'> = {
			title: registrationData.title || null,
			firstName: registrationData.firstName,
			lastName: registrationData.lastName,
			email: registrationData.email,
			affiliation: registrationData.affiliation || null,
			attendeeType: registrationData.attendeeType,
			registrationStatus: registrationData.registrationStatus || 'pending',
			isPresenting: registrationData.isPresenting || false,
			dietaryRequirements: registrationData.dietaryRequirements || null,
			accessibilityNeeds: registrationData.accessibilityNeeds || null,
			notes: registrationData.notes || null,
		};

		const response = await createRegistration(registrationRepository, registration);

		return NextResponse.json(
			{
				success: true,
				registration: response,
				message: 'Registration created successfully',
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error('Registration creation error:', error);
		return NextResponse.json(
			{
				success: false,
				message: error instanceof Error ? error.message : 'Failed to create registration',
			},
			{ status: 500 }
		);
	}
}

export async function GET(request: NextRequest) {
	try {
		const registrationRepository = RegistrationApi();
		const { searchParams } = new URL(request.url);
		const email = searchParams.get('email');

		// If email query parameter is provided, search by email
		if (email) {
			const registration = await findRegistrationByEmail(registrationRepository, email);
			if (!registration) {
				return NextResponse.json(
					{
						success: false,
						message: 'No registration found with this email address',
					},
					{ status: 404 }
				);
			}
			return NextResponse.json(
				{
					success: true,
					registration,
				},
				{ status: 200 }
			);
		}

		// Otherwise, return all registrations
		const registrations = await findAllRegistrations(registrationRepository);
		return NextResponse.json(
			{
				success: true,
				registrations,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Get registrations error:', error);
		return NextResponse.json(
			{
				success: false,
				message: 'Failed to fetch registrations',
			},
			{ status: 500 }
		);
	}
}
