import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Profile } from '@/context/profile/domain/profile.schema';
import { profileSchema, ProfileFormData, titleOptions } from '@/modules/profile/types';

interface EditProfileDialogProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	userProfile: Profile | null;
	onSubmit: (data: ProfileFormData) => void;
	isLoading: boolean;
}

const EditProfileDialog: React.FC<EditProfileDialogProps> = ({
	isOpen,
	onOpenChange,
	userProfile,
	onSubmit,
	isLoading,
}) => {
	const profileForm = useForm<ProfileFormData>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			title: '',
			firstName: '',
			lastName: '',
			email: '',
			affiliation: '',
			nationality: '',
			receiveEmails: true,
		},
	});

	// Update form when userProfile changes
	useEffect(() => {
		if (userProfile) {
			profileForm.reset({
				title: userProfile.title || '',
				firstName: userProfile.firstName,
				lastName: userProfile.lastName,
				email: userProfile.email,
				affiliation: userProfile.affiliation || '',
				nationality: userProfile.nationality || '',
				receiveEmails: userProfile.receiveEmails ?? false,
			});
		}
	}, [userProfile, profileForm]);

	return (
		<Dialog
			open={isOpen}
			onOpenChange={onOpenChange}>
			<DialogContent className='sm:max-w-[500px] bg-white'>
				<DialogHeader>
					<DialogTitle>Edit Profile</DialogTitle>
					<DialogDescription>Update your profile information.</DialogDescription>
				</DialogHeader>
				<Form {...profileForm}>
					<form
						onSubmit={profileForm.handleSubmit(onSubmit)}
						className='space-y-4'>
						<FormField
							control={profileForm.control}
							name='title'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<Select
										onValueChange={field.onChange}
										value={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Select title' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{titleOptions.map((option) => (
												<SelectItem
													key={option.value}
													value={option.value}>
													{option.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<FormField
								control={profileForm.control}
								name='firstName'
								render={({ field }) => (
									<FormItem>
										<FormLabel>First Name *</FormLabel>
										<FormControl>
											<Input
												placeholder='Enter first name'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={profileForm.control}
								name='lastName'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Last Name *</FormLabel>
										<FormControl>
											<Input
												placeholder='Enter last name'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={profileForm.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email *</FormLabel>
									<FormControl>
										<Input
											type='email'
											placeholder='Enter email address'
											{...field}
											disabled
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={profileForm.control}
							name='affiliation'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Affiliation</FormLabel>
									<FormControl>
										<Input
											placeholder='Enter affiliation'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={profileForm.control}
							name='nationality'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nationality</FormLabel>
									<FormControl>
										<Input
											placeholder='Enter nationality'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={profileForm.control}
							name='receiveEmails'
							render={({ field }) => (
								<FormItem className='flex flex-row items-center space-x-3 space-y-0'>
									<FormControl>
										<input
											type='checkbox'
											checked={field.value}
											onChange={field.onChange}
											className='h-4 w-4 rounded border border-input bg-background text-primary focus:ring-2 focus:ring-ring'
										/>
									</FormControl>
									<div className='space-y-1 leading-none'>
										<FormLabel>Receive email notifications</FormLabel>
									</div>
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button
								type='button'
								variant='outline'
								onClick={() => onOpenChange(false)}
								disabled={isLoading}>
								Cancel
							</Button>
							<Button
								type='submit'
								disabled={isLoading}>
								{isLoading ? 'Updating...' : 'Update Profile'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default EditProfileDialog;
