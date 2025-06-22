import React from 'react';
import { UserIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { profileSchema, ProfileFormData, titleOptions } from '@/modules/profile/types';

interface CreateProfileFormProps {
	onSubmit: (data: ProfileFormData) => void;
	isLoading: boolean;
	defaultEmail?: string;
}

const CreateProfileForm: React.FC<CreateProfileFormProps> = ({ onSubmit, isLoading, defaultEmail }) => {
	const profileForm = useForm<ProfileFormData>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			title: '',
			firstName: '',
			lastName: '',
			email: defaultEmail || '',
			affiliation: '',
			nationality: '',
			receiveEmails: true,
		},
	});

	return (
		<Card>
			<CardHeader>
				<div className='text-center'>
					<div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4'>
						<UserIcon className='w-8 h-8 text-primary' />
					</div>
					<h3 className='text-xl font-semibold mb-2'>Create Your Profile</h3>
					<p className='text-muted-foreground'>Let&apos;s set up your profile to get started</p>
				</div>
			</CardHeader>
			<CardContent>
				<Form {...profileForm}>
					<form
						onSubmit={profileForm.handleSubmit(onSubmit)}
						className='space-y-6'>
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
											disabled={!!defaultEmail}
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

						<Button
							type='submit'
							className='w-full'
							disabled={isLoading}>
							{isLoading ? 'Creating Profile...' : 'Create Profile'}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};

export default CreateProfileForm;
