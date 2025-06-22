import { NextRequest, NextResponse } from 'next/server';
import { RegistrationApi } from '@/context/registration/infrastructure/registration.api';
import {
	deleteRegistration,
	findRegistrationById,
	updateRegistration,
} from '@/context/registration/application/create-registration.application';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await params;
		const registrationRepository = RegistrationApi();
		const response = await findRegistrationById(registrationRepository, id);

		if (!response) {
			return NextResponse.json(
				{
					success: false,
					message: 'Registration not found',
				},
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{
				success: true,
				registration: response,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Get registration error:', error);
		return NextResponse.json(
			{
				success: false,
				message: error instanceof Error ? error.message : 'Failed to get registration',
			},
			{ status: 500 }
		);
	}
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await params;
		const body = await request.json();
		const registrationRepository = RegistrationApi();
		const response = await updateRegistration(registrationRepository, id, body);

		return NextResponse.json(
			{
				success: true,
				registration: response,
				message: 'Registration updated successfully',
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Update registration error:', error);
		return NextResponse.json(
			{
				success: false,
				message: error instanceof Error ? error.message : 'Failed to update registration',
			},
			{ status: 500 }
		);
	}
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await params;
		const registrationRepository = RegistrationApi();
		await deleteRegistration(registrationRepository, id);

		return NextResponse.json(
			{
				success: true,
				message: 'Registration deleted successfully',
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Delete registration error:', error);
		return NextResponse.json(
			{
				success: false,
				message: error instanceof Error ? error.message : 'Failed to delete registration',
			},
			{ status: 500 }
		);
	}
}
