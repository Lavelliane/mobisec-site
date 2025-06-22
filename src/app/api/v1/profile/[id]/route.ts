import { NextRequest, NextResponse } from 'next/server';
import { ProfileApi } from '@/context/profile/infrastructure/profile.api';
import {
	deleteProfile,
	findProfileById,
	updateProfile,
} from '@/context/profile/application/create-profile.application';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await params;
		const profileRepository = ProfileApi();
		const profile = await findProfileById(profileRepository, id);

		if (!profile) {
			return NextResponse.json(
				{
					success: false,
					message: 'Profile not found',
				},
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{
				success: true,
				profile,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Get profile error:', error);
		return NextResponse.json(
			{
				success: false,
				message: 'Failed to fetch profile',
			},
			{ status: 500 }
		);
	}
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await params;
		const body = await request.json();
		const profileRepository = ProfileApi();
		const updatedProfile = await updateProfile(profileRepository, id, body);

		return NextResponse.json(
			{
				success: true,
				profile: updatedProfile,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Update profile error:', error);
		return NextResponse.json(
			{
				success: false,
				message: 'Failed to update profile',
			},
			{ status: 500 }
		);
	}
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await params;
		const profileRepository = ProfileApi();

		// Check if profile exists before deleting
		const existingProfile = await findProfileById(profileRepository, id);
		if (!existingProfile) {
			return NextResponse.json(
				{
					success: false,
					message: 'Profile not found',
				},
				{ status: 404 }
			);
		}

		await deleteProfile(profileRepository, id);

		return NextResponse.json(
			{
				success: true,
				message: 'Profile deleted successfully',
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Delete profile error:', error);
		return NextResponse.json(
			{
				success: false,
				message: 'Failed to delete profile',
			},
			{ status: 500 }
		);
	}
}
