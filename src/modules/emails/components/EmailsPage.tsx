'use client';

import React, { useState, useMemo } from 'react';
import { ChevronUpIcon, ChevronDownIcon, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
// import AddRecipientForm, { type RecipientFormData } from './AddRecipientForm';
import EmailSchedulerForm, { type EmailSchedulerFormData } from './EmailSchedulerForm';
import { EmailRecipient } from '@/types/EmailTypes';
import { useGetProfiles } from '@/modules/profile/hooks';
import { useGetRegistrations } from '@/modules/registrations/hooks';
import { Profile } from '@/context/profile/domain/profile.schema';
import { Registration } from '@/context/registration/domain/registration.schema';

type SortKey = keyof EmailRecipient;
type SortOrder = 'asc' | 'desc';

const EmailsPage = () => {
	// Fetch profiles and registrations from database
	const { data: profilesData, isLoading: profilesLoading, error: profilesError } = useGetProfiles();
	const { data: registrationsData, isLoading: registrationsLoading } = useGetRegistrations();

	const [currentPage, setCurrentPage] = useState(1);
	const [sortKey, setSortKey] = useState<SortKey>('name');
	const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
	// const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isEmailSchedulerOpen, setIsEmailSchedulerOpen] = useState(false);
	const recipientsPerPage = 10;

	// Transform profiles to EmailRecipient format
	const recipients = useMemo(() => {
		if (!profilesData?.profiles) return [];

		const profiles = profilesData.profiles;
		const registrations = registrationsData?.registrations || [];

		return profiles.map((profile: Profile, index: number): EmailRecipient => {
			// Find corresponding registration to determine role
			const registration = registrations.find((reg: Registration) => reg.email === profile.email);

			// Derive role from registration attendee type or use default
			let role: 'Author' | 'Student' | 'Reviewer' = 'Author'; // Default
			if (registration) {
				switch (registration.attendeeType) {
					case 'student':
						role = 'Student';
						break;
					case 'academic':
					case 'speaker':
						role = 'Author';
						break;
					case 'industry':
						role = 'Reviewer';
						break;
					default:
						role = 'Author';
				}
			}

			return {
				id: index + 1, // Use index as ID since profile uses UUID
				title: profile.title,
				name: `${profile.firstName} ${profile.lastName}`,
				email: profile.email,
				nationality: profile.nationality || 'Unknown',
				role,
				receiveEmails: profile.receiveEmails ?? true,
			};
		});
	}, [profilesData?.profiles, registrationsData?.registrations]);

	// Sorting logic
	const sortedRecipients = useMemo(() => {
		const sorted = [...recipients].sort((a, b) => {
			const aValue = a[sortKey];
			const bValue = b[sortKey];

			if (typeof aValue === 'string' && typeof bValue === 'string') {
				return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
			}

			// Handle nullable strings (like title)
			if ((typeof aValue === 'string' || aValue === null) && (typeof bValue === 'string' || bValue === null)) {
				const aStr = aValue || '';
				const bStr = bValue || '';
				return sortOrder === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
			}

			if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
				if (sortOrder === 'asc') {
					return aValue === bValue ? 0 : aValue ? 1 : -1;
				} else {
					return aValue === bValue ? 0 : aValue ? -1 : 1;
				}
			}

			// For numbers or other types (with null checks)
			if (aValue != null && bValue != null) {
				if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
				if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
			}

			// Handle null/undefined values
			if (aValue == null && bValue != null) return sortOrder === 'asc' ? -1 : 1;
			if (aValue != null && bValue == null) return sortOrder === 'asc' ? 1 : -1;

			return 0;
		});
		return sorted;
	}, [recipients, sortKey, sortOrder]);

	// Calculate pagination values
	const totalPages = Math.ceil(sortedRecipients.length / recipientsPerPage);
	const startIndex = (currentPage - 1) * recipientsPerPage;
	const endIndex = startIndex + recipientsPerPage;

	// Get current page recipients
	const currentRecipients = useMemo(() => {
		return sortedRecipients.slice(startIndex, endIndex);
	}, [sortedRecipients, startIndex, endIndex]);

	const handleSort = (key: SortKey) => {
		if (sortKey === key) {
			setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
		} else {
			setSortKey(key);
			setSortOrder('asc');
		}
		setCurrentPage(1); // Reset to first page when sorting
	};

	const getSortIcon = (key: SortKey) => {
		if (sortKey !== key) return null;
		return sortOrder === 'asc' ? (
			<ChevronUpIcon className='w-4 h-4 ml-1' />
		) : (
			<ChevronDownIcon className='w-4 h-4 ml-1' />
		);
	};

	const toggleEmailReceive = (id: number) => {
		// Note: This is now read-only since we're using database data
		// In a real implementation, you would update the profile in the database
		console.log('Toggle email receive for recipient ID:', id);
		// You could implement this by calling the update profile API
	};

	// const handleEdit = (id: number) => {
	// 	// Placeholder for edit functionality
	// 	console.log('Edit recipient with ID:', id);
	// 	// In a real application, this would open an edit modal or navigate to an edit page
	// };

	// const handleDelete = (id: number) => {
	// 	// Placeholder for delete functionality
	// 	console.log('Delete recipient with ID:', id);
	// 	// In a real application, this would show a confirmation dialog and then delete
	// };

	// const handleAddRecipient = (data: RecipientFormData) => {
	// 	console.log('Add recipient:', data);
	// 	// This would need to create a new profile in the database
	// 	// For now, this is a placeholder
	// };

	const handleEmailScheduler = async (
		data: EmailSchedulerFormData & { recipients: number[]; totalRecipients: number }
	) => {
		try {
			// Get recipient details from IDs
			const selectedRecipientDetails = recipients.filter((r) => data.recipients.includes(r.id));
			const recipientEmails = selectedRecipientDetails.map((r) => r.email);

			console.log('Selected recipient details:', selectedRecipientDetails);
			const correctedDate =
				data.scheduledDate && new Date(data.scheduledDate.getTime() + 3600 * 1000 * 24).toISOString().split('T')[0];

			// Prepare API payload with recipient details
			const apiPayload = {
				templateType: data.templateType,
				subject: data.subject,
				body: data.body,
				sendOption: data.sendOption,
				scheduledDate: correctedDate,
				scheduledTime: data.scheduledTime,
				recipients: data.recipients,
				totalRecipients: data.totalRecipients,
				recipientEmails: recipientEmails,
				recipientDetails: selectedRecipientDetails.map((r) => ({
					email: r.email,
					title: r.title,
					name: r.name,
				})),
			};

			const response = await fetch('/api/v1/email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(apiPayload),
			});

			const result = await response.json();

			if (response.ok) {
				toast.success(
					`Email ${data.sendOption === 'now' ? 'sent' : 'scheduled'} successfully to ${data.totalRecipients} recipients!`
				);
				setIsEmailSchedulerOpen(false);
			} else {
				toast.error(`Error: ${result.error || 'Failed to send/schedule email'}`);
			}
		} catch (error) {
			console.error('Email scheduler error:', error);
			toast.error('Failed to send/schedule email. Please try again.');
		}
	};

	const getRoleBadgeColor = (role: string) => {
		switch (role) {
			case 'Author':
				return 'bg-blue-100 text-blue-800';
			case 'Reviewer':
				return 'bg-green-100 text-green-800';
			case 'Student':
				return 'bg-purple-100 text-purple-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	// Loading state
	if (profilesLoading || registrationsLoading) {
		return (
			<div className='py-12 px-4'>
				<div className='max-w-7xl mx-auto'>
					<div className='flex flex-col items-center justify-center gap-4 mb-12'>
						<h1 className='text-4xl font-bold text-foreground text-center'>Email Recipients</h1>
						<h2 className='text-xl text-muted-foreground text-center'>Loading recipient data...</h2>
					</div>
				</div>
			</div>
		);
	}

	// Error state
	if (profilesError) {
		return (
			<div className='py-12 px-4'>
				<div className='max-w-7xl mx-auto'>
					<div className='flex flex-col items-center justify-center gap-4 mb-12'>
						<h1 className='text-4xl font-bold text-foreground text-center'>Email Recipients</h1>
						<h2 className='text-xl text-red-600 text-center'>Error loading recipient data</h2>
						<p className='text-muted-foreground text-center'>{profilesError.message}</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='py-12 px-4 w-full'>
			<div className='w-full max-w-6xl mx-auto'>
				<div className='flex flex-col items-center justify-center gap-4 mb-12'>
					<h1 className='text-4xl font-bold text-foreground text-center'>Email Recipients</h1>
					<h2 className='text-xl text-muted-foreground text-center'>Manage newsletter and communication recipients</h2>
				</div>

				{/* Statistics Cards */}
				<div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8'>
					<div className='bg-white rounded-lg p-6 shadow-sm border'>
						<h3 className='text-sm font-medium text-muted-foreground'>Total Recipients</h3>
						<p className='text-2xl font-bold text-foreground'>{recipients.length}</p>
					</div>
					<div className='bg-white rounded-lg p-6 shadow-sm border'>
						<h3 className='text-sm font-medium text-muted-foreground'>Subscribed</h3>
						<p className='text-2xl font-bold text-green-600'>{recipients.filter((r) => r.receiveEmails).length}</p>
					</div>
					<div className='bg-white rounded-lg p-6 shadow-sm border'>
						<h3 className='text-sm font-medium text-muted-foreground'>Authors</h3>
						<p className='text-2xl font-bold text-blue-600'>{recipients.filter((r) => r.role === 'Author').length}</p>
					</div>
					<div className='bg-white rounded-lg p-6 shadow-sm border'>
						<h3 className='text-sm font-medium text-muted-foreground'>Reviewers</h3>
						<p className='text-2xl font-bold text-green-600'>
							{recipients.filter((r) => r.role === 'Reviewer').length}
						</p>
					</div>
				</div>

				{/* Controls */}
				<div className='flex justify-between items-center mb-4'>
					<div className='flex items-center gap-4'>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant='outline'>
									Sort by: {sortKey} {getSortIcon(sortKey)}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem onClick={() => handleSort('name')}>Name {getSortIcon('name')}</DropdownMenuItem>
								<DropdownMenuItem onClick={() => handleSort('email')}>Email {getSortIcon('email')}</DropdownMenuItem>
								<DropdownMenuItem onClick={() => handleSort('nationality')}>
									Nationality {getSortIcon('nationality')}
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => handleSort('role')}>Role {getSortIcon('role')}</DropdownMenuItem>
								<DropdownMenuItem onClick={() => handleSort('receiveEmails')}>
									Email Status {getSortIcon('receiveEmails')}
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>

					{/* Action Buttons */}
					<div className='flex items-center gap-3'>
						{/* Email Scheduler Form */}
						<EmailSchedulerForm
							isOpen={isEmailSchedulerOpen}
							onOpenChange={setIsEmailSchedulerOpen}
							onSubmit={handleEmailScheduler}
							recipients={recipients as EmailRecipient[]}
							trigger={
								<Button
									variant='secondary'
									className='px-6'>
									<Mail className='w-4 h-4' />
									Send Email
								</Button>
							}
						/>

						{/* Add New Recipient Form */}
						{/* <AddRecipientForm
							isOpen={isDialogOpen}
							onOpenChange={setIsDialogOpen}
							onSubmit={handleAddRecipient}
							trigger={
								<Button className='px-6'>
									<PlusIcon className='w-4 h-4' />
									Add New Recipient
								</Button>
							}
						/> */}
					</div>
				</div>

				{/* Recipients Table */}
				<div className='bg-white rounded-lg shadow-sm border'>
					<div className='p-6 border-b bg-secondary'>
						<h3 className='text-lg font-semibold text-background'>Recipients List</h3>
						<p className='text-sm text-muted'>Manage all email recipients and their preferences</p>
					</div>

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead
									className='cursor-pointer select-none'
									onClick={() => handleSort('name')}>
									<div className='flex items-center'>Name {getSortIcon('name')}</div>
								</TableHead>
								<TableHead
									className='cursor-pointer select-none'
									onClick={() => handleSort('email')}>
									<div className='flex items-center'>Email {getSortIcon('email')}</div>
								</TableHead>
								<TableHead
									className='cursor-pointer select-none'
									onClick={() => handleSort('nationality')}>
									<div className='flex items-center'>Nationality {getSortIcon('nationality')}</div>
								</TableHead>
								<TableHead
									className='cursor-pointer select-none'
									onClick={() => handleSort('role')}>
									<div className='flex items-center'>Role {getSortIcon('role')}</div>
								</TableHead>
								<TableHead
									className='cursor-pointer select-none'
									onClick={() => handleSort('receiveEmails')}>
									<div className='flex items-center'>Email Status {getSortIcon('receiveEmails')}</div>
								</TableHead>
								{/* <TableHead className='text-right'>Actions</TableHead> */}
							</TableRow>
						</TableHeader>
						<TableBody>
							{currentRecipients.map((recipient) => (
								<TableRow key={recipient.id}>
									<TableCell>
										<div className='font-medium text-foreground'>{recipient.name}</div>
									</TableCell>
									<TableCell>
										<div className='text-sm text-muted-foreground'>{recipient.email}</div>
									</TableCell>
									<TableCell>
										<div className='text-sm'>{recipient.nationality}</div>
									</TableCell>
									<TableCell>
										<span
											className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(
												recipient.role
											)}`}>
											{recipient.role}
										</span>
									</TableCell>
									<TableCell>
										<button
											onClick={() => toggleEmailReceive(recipient.id)}
											className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors ${
												recipient.receiveEmails
													? 'bg-green-100 text-green-800 hover:bg-green-200'
													: 'bg-red-100 text-red-800 hover:bg-red-200'
											}`}>
											{recipient.receiveEmails ? 'Subscribed' : 'Unsubscribed'}
										</button>
									</TableCell>
									{/* <TableCell className='text-right'>
										<div className='flex gap-2 justify-end'>
											<Button
												variant='outline'
												size='sm'
												onClick={() => handleEdit(recipient.id)}>
												Edit
											</Button>
											<Button
												variant='destructive'
												size='sm'
												onClick={() => handleDelete(recipient.id)}>
												Delete
											</Button>
										</div>
									</TableCell> */}
								</TableRow>
							))}
						</TableBody>
					</Table>

					{/* Pagination Info */}
					<div className='flex items-center justify-between px-6 py-4 border-t'>
						<div className='text-sm text-muted-foreground'>
							Showing {startIndex + 1} to {Math.min(endIndex, recipients.length)} of {recipients.length} recipients
						</div>
						<div className='text-sm text-muted-foreground'>
							Page {currentPage} of {totalPages}
						</div>
					</div>
				</div>

				{/* Pagination Controls */}
				{totalPages > 1 && (
					<div className='mt-4'>
						<Pagination>
							<PaginationContent>
								<PaginationItem>
									<PaginationPrevious
										href='#'
										onClick={(e) => {
											e.preventDefault();
											if (currentPage > 1) {
												setCurrentPage(currentPage - 1);
											}
										}}
										className={currentPage <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
									/>
								</PaginationItem>

								{Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
									<PaginationItem key={pageNumber}>
										<PaginationLink
											href='#'
											onClick={(e) => {
												e.preventDefault();
												setCurrentPage(pageNumber);
											}}
											isActive={currentPage === pageNumber}
											className='cursor-pointer'>
											{pageNumber}
										</PaginationLink>
									</PaginationItem>
								))}

								<PaginationItem>
									<PaginationNext
										href='#'
										onClick={(e) => {
											e.preventDefault();
											if (currentPage < totalPages) {
												setCurrentPage(currentPage + 1);
											}
										}}
										className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
									/>
								</PaginationItem>
							</PaginationContent>
						</Pagination>
					</div>
				)}
			</div>
		</div>
	);
};

export default EmailsPage;
