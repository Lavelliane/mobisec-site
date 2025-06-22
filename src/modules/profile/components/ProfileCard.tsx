import React from 'react';
import { EditIcon, MailIcon, BuildingIcon, FlagIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Profile } from '@/context/profile/domain/profile.schema';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession } from 'next-auth/react';
import { Separator } from '@/components/ui/separator';

interface ProfileCardProps {
	userProfile: Profile;
	onEdit: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ userProfile, onEdit }) => {
	const { data: session } = useSession();

	return (
		<Card className='max-w-sm w-full h-fit'>
			<CardHeader>
				<div className='flex flex-col gap-2 items-start'>
					<div className='flex items-center gap-3'>
						<Avatar className='w-10 h-10'>
							<AvatarImage
								src={session?.user?.image || ''}
								alt={session?.user?.name || ''}
							/>
							<AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
						</Avatar>
						<div>
							<h3 className='text-xl font-semibold'>
								{userProfile.title && `${userProfile.title} `}
								{userProfile.firstName} {userProfile.lastName}
							</h3>
							<p className='text-sm text-muted-foreground'>Personal Profile</p>
						</div>
					</div>
					<Button
						variant='secondary'
						size='sm'
						onClick={onEdit}
						className='gap-2'>
						<EditIcon className='w-4 h-4' />
						Edit Profile
					</Button>
				</div>
			</CardHeader>
			<Separator />
			<CardContent className='space-y-4'>
				<div className='grid grid-cols-1 gap-4'>
					<div className='flex items-center gap-3'>
						<MailIcon className='w-5 h-5 text-muted-foreground' />
						<div>
							<p className='text-sm font-medium'>Email</p>
							<p className='text-sm text-muted-foreground'>{userProfile.email}</p>
						</div>
					</div>

					{userProfile.affiliation && (
						<div className='flex items-center gap-3'>
							<BuildingIcon className='w-5 h-5 text-muted-foreground' />
							<div>
								<p className='text-sm font-medium'>Affiliation</p>
								<p className='text-sm text-muted-foreground'>{userProfile.affiliation}</p>
							</div>
						</div>
					)}

					{userProfile.nationality && (
						<div className='flex items-center gap-3'>
							<FlagIcon className='w-5 h-5 text-muted-foreground' />
							<div>
								<p className='text-sm font-medium'>Nationality</p>
								<p className='text-sm text-muted-foreground'>{userProfile.nationality}</p>
							</div>
						</div>
					)}

					<div className='flex items-center gap-3'>
						<MailIcon className='w-5 h-5 text-muted-foreground' />
						<div>
							<p className='text-sm font-medium'>Email Notifications</p>
							<p className='text-sm text-muted-foreground'>{userProfile.receiveEmails ? 'Enabled' : 'Disabled'}</p>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default ProfileCard;
