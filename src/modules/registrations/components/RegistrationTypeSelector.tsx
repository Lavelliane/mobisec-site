import React from 'react';
import { UserIcon, UsersIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { RegistrationType } from '@/modules/registrations/types';

interface RegistrationTypeSelectorProps {
	selectedType: RegistrationType;
	onTypeChange: (type: RegistrationType) => void;
}

const RegistrationTypeSelector: React.FC<RegistrationTypeSelectorProps> = ({ selectedType, onTypeChange }) => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
			<Card
				className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
					selectedType === 'self' ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-muted/50'
				}`}
				onClick={() => onTypeChange('self')}>
				<CardContent className='p-6'>
					<div className='flex items-center gap-4'>
						<div
							className={`w-12 h-12 rounded-full flex items-center justify-center ${
								selectedType === 'self' ? 'bg-primary text-primary-foreground' : 'bg-muted'
							}`}>
							<UserIcon className='w-6 h-6' />
						</div>
						<div>
							<h3 className='font-semibold text-lg'>Self Registration</h3>
							<p className='text-sm text-muted-foreground'>Register yourself for the conference</p>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card
				className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
					selectedType === 'other' ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-muted/50'
				}`}
				onClick={() => onTypeChange('other')}>
				<CardContent className='p-6'>
					<div className='flex items-center gap-4'>
						<div
							className={`w-12 h-12 rounded-full flex items-center justify-center ${
								selectedType === 'other' ? 'bg-primary text-primary-foreground' : 'bg-muted'
							}`}>
							<UsersIcon className='w-6 h-6' />
						</div>
						<div>
							<h3 className='font-semibold text-lg'>Register for Others</h3>
							<p className='text-sm text-muted-foreground'>Register someone else for the conference</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default RegistrationTypeSelector;
