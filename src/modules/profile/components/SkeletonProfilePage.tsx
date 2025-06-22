import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

const SkeletonProfilePage = () => {
	return (
		<div className='max-w-6xl w-full h-full py-12 px-4'>
			<div className='flex flex-row gap-8 h-full w-full'>
				{/* Left Column - Registration Card Skeleton */}
				<Card className='w-full h-fit'>
					<CardHeader>
						<div className='flex justify-between items-center'>
							<div className='space-y-2'>
								<Skeleton className='h-5 w-48' /> {/* Registration Information title */}
								<Skeleton className='h-4 w-64' /> {/* Subtitle */}
							</div>
							<Skeleton className='h-9 w-36' /> {/* Update Registration button */}
						</div>
					</CardHeader>
					<CardContent>
						<div className='space-y-6'>
							{/* Personal Information Section */}
							<div className='space-y-4'>
								<Skeleton className='h-5 w-40 border-b' /> {/* Section title */}
								{/* Grid with 3 columns for title, first name, last name */}
								<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
									<div className='space-y-2'>
										<Skeleton className='h-4 w-10' /> {/* Title label */}
										<Skeleton className='h-4 w-16' /> {/* Title value */}
									</div>
									<div className='space-y-2'>
										<Skeleton className='h-4 w-20' /> {/* First Name label */}
										<Skeleton className='h-4 w-24' /> {/* First Name value */}
									</div>
									<div className='space-y-2'>
										<Skeleton className='h-4 w-18' /> {/* Last Name label */}
										<Skeleton className='h-4 w-28' /> {/* Last Name value */}
									</div>
								</div>
								{/* Email field */}
								<div className='space-y-2'>
									<Skeleton className='h-4 w-24' /> {/* Email label */}
									<Skeleton className='h-4 w-56' /> {/* Email value */}
								</div>
								{/* Affiliation field */}
								<div className='space-y-2'>
									<Skeleton className='h-4 w-40' /> {/* Affiliation label */}
									<Skeleton className='h-4 w-48' /> {/* Affiliation value */}
								</div>
							</div>

							{/* Registration Details Section */}
							<div className='space-y-4'>
								<Skeleton className='h-5 w-36 border-b' /> {/* Section title */}
								{/* Attendee Type */}
								<div className='space-y-2'>
									<Skeleton className='h-4 w-28' /> {/* Attendee Type label */}
									<Skeleton className='h-4 w-20' /> {/* Attendee Type value */}
								</div>
								{/* Presenting checkbox */}
								<div className='space-y-2'>
									<Skeleton className='h-4 w-52' /> {/* Presenting label */}
									<Skeleton className='h-4 w-8' /> {/* Yes/No value */}
								</div>
							</div>

							{/* Additional Information Section */}
							<div className='space-y-4'>
								<Skeleton className='h-5 w-44 border-b' /> {/* Section title */}
								{/* Dietary Requirements */}
								<div className='space-y-2'>
									<Skeleton className='h-4 w-36' /> {/* Dietary Requirements label */}
									<Skeleton className='h-4 w-32' /> {/* Dietary Requirements value */}
								</div>
								{/* Accessibility Needs */}
								<div className='space-y-2'>
									<Skeleton className='h-4 w-32' /> {/* Accessibility Needs label */}
									<Skeleton className='h-4 w-28' /> {/* Accessibility Needs value */}
								</div>
								{/* Additional Notes */}
								<div className='space-y-2'>
									<Skeleton className='h-4 w-28' /> {/* Additional Notes label */}
									<Skeleton className='h-4 w-36' /> {/* Additional Notes value */}
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Right Column - Profile Card Skeleton */}
				<Card className='max-w-sm w-full h-full'>
					<CardHeader>
						<div className='flex flex-col gap-2 items-start'>
							<div className='flex items-center gap-3'>
								<Skeleton className='w-10 h-10 rounded-full' /> {/* Avatar */}
								<div className='space-y-1'>
									<Skeleton className='h-6 w-40' /> {/* Full name */}
									<Skeleton className='h-4 w-28' /> {/* "Personal Profile" text */}
								</div>
							</div>
							<Skeleton className='h-9 w-28' /> {/* Edit Profile button */}
						</div>
					</CardHeader>
					<Separator />
					<CardContent className='space-y-4'>
						<div className='grid grid-cols-1 gap-4'>
							{/* Email */}
							<div className='flex items-center gap-3'>
								<Skeleton className='w-5 h-5' /> {/* Email icon */}
								<div className='space-y-1'>
									<Skeleton className='h-4 w-10' /> {/* Email label */}
									<Skeleton className='h-4 w-48' /> {/* Email value */}
								</div>
							</div>

							{/* Affiliation */}
							<div className='flex items-center gap-3'>
								<Skeleton className='w-5 h-5' /> {/* Building icon */}
								<div className='space-y-1'>
									<Skeleton className='h-4 w-16' /> {/* Affiliation label */}
									<Skeleton className='h-4 w-36' /> {/* Affiliation value */}
								</div>
							</div>

							{/* Nationality */}
							<div className='flex items-center gap-3'>
								<Skeleton className='w-5 h-5' /> {/* Flag icon */}
								<div className='space-y-1'>
									<Skeleton className='h-4 w-20' /> {/* Nationality label */}
									<Skeleton className='h-4 w-24' /> {/* Nationality value */}
								</div>
							</div>

							{/* Email Notifications */}
							<div className='flex items-center gap-3'>
								<Skeleton className='w-5 h-5' /> {/* Mail icon */}
								<div className='space-y-1'>
									<Skeleton className='h-4 w-32' /> {/* Email Notifications label */}
									<Skeleton className='h-4 w-16' /> {/* Enabled/Disabled value */}
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default SkeletonProfilePage;
