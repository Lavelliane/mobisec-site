import { createProfile, findAllProfiles } from '@/context/profile/application/create-profile.application';
import { Profile } from '@/context/profile/domain/profile.schema';
import { ProfileApi } from '@/context/profile/infrastructure/profile.api';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const profile = body.profile as Omit<Profile, 'id' | 'createdAt' | 'updatedAt'>;
		const profileRepository = ProfileApi();
		const response = await createProfile(profileRepository, profile as Profile);
		return NextResponse.json(
			{
				success: true,
				profile: response,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error('Create profile error:', error);
		return NextResponse.json(
			{
				success: false,
				message: 'Failed to create profile',
			},
			{ status: 500 }
		);
	}
}

export async function GET() {
	try {
		const profileRepository = ProfileApi();
		const profiles = await findAllProfiles(profileRepository);
		return NextResponse.json(
			{
				success: true,
				profiles,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Get profiles error:', error);
		return NextResponse.json(
			{
				success: false,
				message: 'Failed to fetch profiles',
			},
			{ status: 500 }
		);
	}
}
