'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
	FileText,
	CheckCircle,
	AlertTriangle,
	Plus,
	Trash2,
	User,
	Send,
	Presentation,
	FileText as FileTextIcon,
} from 'lucide-react';
import { ValidationResult } from '../types';
import PaperValidationComponent from './PaperValidation';

interface Author {
	id: string;
	name: string;
	email: string;
	affiliation: string;
	isCorresponding: boolean;
}

export default function PaperSubmissionPage() {
	const [authors, setAuthors] = useState<Author[]>([
		{
			id: '1',
			name: '',
			email: '',
			affiliation: '',
			isCorresponding: true,
		},
	]);
	const [submissionType, setSubmissionType] = useState<'regular' | 'poster'>('regular');
	const [paperTitle, setPaperTitle] = useState('');
	const [paperAbstract, setPaperAbstract] = useState('');
	const [paperKeywords, setPaperKeywords] = useState('');
	const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
	const [pdfFile, setPdfFile] = useState<File | null>(null);

	const addAuthor = () => {
		const newAuthor: Author = {
			id: Date.now().toString(),
			name: '',
			email: '',
			affiliation: '',
			isCorresponding: false,
		};
		setAuthors([...authors, newAuthor]);
	};

	const removeAuthor = (id: string) => {
		if (authors.length > 1) {
			const updatedAuthors = authors.filter((author) => author.id !== id);
			// Ensure at least one corresponding author
			if (!updatedAuthors.some((author) => author.isCorresponding)) {
				updatedAuthors[0].isCorresponding = true;
			}
			setAuthors(updatedAuthors);
		}
	};

	const updateAuthor = (id: string, field: keyof Author, value: string | boolean) => {
		const updatedAuthors = authors.map((author) => {
			if (author.id === id) {
				if (field === 'isCorresponding' && value === true) {
					// Set all other authors to non-corresponding
					return { ...author, [field]: value };
				}
				return { ...author, [field]: value };
			}
			// If setting this author as corresponding, set others to false
			if (field === 'isCorresponding' && value === true) {
				return { ...author, isCorresponding: false };
			}
			return author;
		});
		setAuthors(updatedAuthors);
	};

	const isFormValid = () => {
		return (
			paperTitle.trim() !== '' &&
			paperAbstract.trim() !== '' &&
			paperKeywords.trim() !== '' &&
			authors.every(
				(author) => author.name.trim() !== '' && author.email.trim() !== '' && author.affiliation.trim() !== ''
			) &&
			authors.some((author) => author.isCorresponding) &&
			validationResult?.isValid &&
			pdfFile !== null
		);
	};

	return (
		<div className='container mx-auto px-4 py-8 max-w-6xl'>
			<div className='mb-8'>
				<h1 className='text-3xl font-bold text-gray-900 mb-2'>
					{submissionType === 'regular' ? 'Paper' : 'Poster'} Submission
				</h1>
				<p className='text-gray-600'>
					Submit your {submissionType === 'regular' ? 'research paper' : 'poster paper'} for the Call for Papers. Please
					ensure all required information is provided and your {submissionType === 'regular' ? 'paper' : 'poster paper'}{' '}
					passes validation.
				</p>
			</div>

			{/* Paper Information */}
			<Card className='mb-8'>
				<CardHeader>
					<CardTitle className='flex items-center gap-2'>
						<FileText className='h-5 w-5' />
						Paper Information
					</CardTitle>
				</CardHeader>
				<CardContent className='space-y-6'>
					{/* Submission Type Toggle */}
					<div>
						<Label className='text-sm font-medium mb-3 block'>Submission Type</Label>
						<div className='flex items-center space-x-6'>
							<label className='flex items-center space-x-2 cursor-pointer'>
								<input
									type='radio'
									name='submissionType'
									value='regular'
									checked={submissionType === 'regular'}
									onChange={(e) => setSubmissionType(e.target.value as 'regular' | 'poster')}
									className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500'
								/>
								<FileTextIcon className='h-5 w-5 text-blue-600' />
								<span className='text-sm font-medium'>Regular Paper</span>
							</label>
							<label className='flex items-center space-x-2 cursor-pointer'>
								<input
									type='radio'
									name='submissionType'
									value='poster'
									checked={submissionType === 'poster'}
									onChange={(e) => setSubmissionType(e.target.value as 'regular' | 'poster')}
									className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500'
								/>
								<Presentation className='h-5 w-5 text-green-600' />
								<span className='text-sm font-medium'>Poster Paper</span>
							</label>
						</div>
						<p className='text-xs text-gray-500 mt-2'>
							{submissionType === 'regular'
								? 'Full research papers for oral presentation and publication in proceedings.'
								: 'Poster papers for showcasing research work in poster format.'}
						</p>
					</div>

					<div>
						<Label
							htmlFor='title'
							className='text-sm font-medium'
							required>
							{submissionType === 'regular' ? 'Paper' : 'Poster'} Title
						</Label>
						<Input
							id='title'
							value={paperTitle}
							onChange={(e) => setPaperTitle(e.target.value)}
							placeholder='Enter the title of your paper'
							className='mt-1'
						/>
					</div>

					<div>
						<Label
							htmlFor='abstract'
							className='text-sm font-medium'
							required>
							Abstract
						</Label>
						<Textarea
							id='abstract'
							value={paperAbstract}
							onChange={(e) => setPaperAbstract(e.target.value)}
							placeholder='Enter the abstract of your paper'
							className='mt-1'
							rows={4}
						/>
					</div>

					<div>
						<Label
							htmlFor='keywords'
							className='text-sm font-medium'
							required>
							Keywords
						</Label>
						<Input
							id='keywords'
							value={paperKeywords}
							onChange={(e) => setPaperKeywords(e.target.value)}
							placeholder='Enter keywords separated by commas'
							className='mt-1'
						/>
					</div>
				</CardContent>
			</Card>

			{/* Author Information */}
			<Card className='mb-8'>
				<CardHeader>
					<CardTitle className='flex items-center gap-2'>
						<User className='h-5 w-5' />
						Author Information
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='space-y-6'>
						{authors.map((author, index) => (
							<div
								key={author.id}
								className='border rounded-lg p-4'>
								<div className='flex items-center justify-between mb-4'>
									<h4 className='font-medium'>Author {index + 1}</h4>
									{authors.length > 1 && (
										<Button
											variant='outline'
											size='sm'
											onClick={() => removeAuthor(author.id)}
											className='text-red-600 hover:text-red-700'>
											<Trash2 className='h-4 w-4 mr-1' />
											Remove
										</Button>
									)}
								</div>

								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<div>
										<Label
											htmlFor={`name-${author.id}`}
											className='text-sm font-medium'
											required>
											Full Name
										</Label>
										<Input
											id={`name-${author.id}`}
											value={author.name}
											onChange={(e) => updateAuthor(author.id, 'name', e.target.value)}
											placeholder='Enter full name'
											className='mt-1'
										/>
									</div>

									<div>
										<Label
											htmlFor={`email-${author.id}`}
											className='text-sm font-medium'
											required>
											Email
										</Label>
										<Input
											id={`email-${author.id}`}
											type='email'
											value={author.email}
											onChange={(e) => updateAuthor(author.id, 'email', e.target.value)}
											placeholder='Enter email address'
											className='mt-1'
										/>
									</div>

									<div className='md:col-span-2'>
										<Label
											htmlFor={`affiliation-${author.id}`}
											className='text-sm font-medium'
											required>
											Affiliation
										</Label>
										<Input
											id={`affiliation-${author.id}`}
											value={author.affiliation}
											onChange={(e) => updateAuthor(author.id, 'affiliation', e.target.value)}
											placeholder='Enter institution/organization'
											className='mt-1'
										/>
									</div>

									<div className='md:col-span-2'>
										<label className='flex items-center space-x-2'>
											<input
												type='checkbox'
												checked={author.isCorresponding}
												onChange={(e) => updateAuthor(author.id, 'isCorresponding', e.target.checked)}
												className='rounded'
											/>
											<span className='text-sm font-medium'>Corresponding Author</span>
										</label>
									</div>
								</div>
							</div>
						))}

						<Button
							variant='outline'
							onClick={addAuthor}
							className='w-full'>
							<Plus className='h-4 w-4 mr-2' />
							Add Author
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* Paper Validation Component */}
			<PaperValidationComponent
				onValidationComplete={(result) => setValidationResult(result)}
				onPdfUpload={(file) => setPdfFile(file)}
				showGuidelines={false}
			/>

			{/* Submit Button */}
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-2'>
					{isFormValid() ? (
						<CheckCircle className='h-5 w-5 text-green-600' />
					) : (
						<AlertTriangle className='h-5 w-5 text-yellow-600' />
					)}
					<span className='text-sm text-gray-600'>
						{isFormValid()
							? 'All requirements met. Ready to submit.'
							: `Please complete all required fields and ensure ${submissionType === 'regular' ? 'paper' : 'poster paper'} validation passes.`}
					</span>
				</div>
				<Button
					disabled={!isFormValid()}
					className='px-8'>
					<Send className='h-4 w-4 mr-2' />
					Submit {submissionType === 'regular' ? 'Paper' : 'Poster'}
				</Button>
			</div>
		</div>
	);
}
