'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { FileText, Upload, CheckCircle, XCircle, AlertTriangle, Loader2, Download, Info } from 'lucide-react';
import { ValidationResult, ValidationResponse } from '../types';

export default function PaperValidationPage() {
	const [file, setFile] = useState<File | null>(null);
	const [isValidating, setIsValidating] = useState(false);
	const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
	const [error, setError] = useState<string>('');
	const [dragOver, setDragOver] = useState(false);

	const handleFileSelect = (selectedFile: File) => {
		const allowedTypes = [
			'text/x-tex',
			'application/x-tex',
			'text/plain',
			'application/zip',
			'application/x-zip-compressed',
		];
		const allowedExtensions = ['.tex', '.zip'];
		const fileExtension = selectedFile.name.toLowerCase().substring(selectedFile.name.lastIndexOf('.'));

		if (!allowedTypes.includes(selectedFile.type) && !allowedExtensions.includes(fileExtension)) {
			setError('Please select a LaTeX (.tex) or ZIP file.');
			return;
		}

		if (selectedFile.size > 10 * 1024 * 1024) {
			setError('File size must be less than 10MB.');
			return;
		}

		setFile(selectedFile);
		setError('');
		setValidationResult(null);
	};

	const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0];
		if (selectedFile) {
			handleFileSelect(selectedFile);
		}
		// Reset the input value to allow selecting the same file again
		e.target.value = '';
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setDragOver(false);

		const droppedFile = e.dataTransfer.files[0];
		if (droppedFile) {
			handleFileSelect(droppedFile);
		}
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setDragOver(true);
	};

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setDragOver(false);
	};

	const handleDragEnter = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setDragOver(true);
	};

	const handleBrowseClick = () => {
		// Trigger the file input click
		const fileInput = document.getElementById('file-upload') as HTMLInputElement;
		if (fileInput) {
			fileInput.click();
		}
	};

	const validatePaper = async () => {
		if (!file) return;

		setIsValidating(true);
		setError('');

		try {
			const formData = new FormData();
			formData.append('paper', file);

			const response = await fetch('/api/v1/papers/validate', {
				method: 'POST',
				body: formData,
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const contentType = response.headers.get('content-type');
			if (!contentType || !contentType.includes('application/json')) {
				throw new Error('Server returned invalid response format');
			}

			const data: ValidationResponse = await response.json();

			if (data.success && data.validation) {
				setValidationResult(data.validation);
			} else {
				setError(data.message || 'Validation failed');
			}
		} catch (err) {
			setError('An error occurred during validation. Please try again.');
			console.error('Validation error:', err);
		} finally {
			setIsValidating(false);
		}
	};

	const resetForm = () => {
		setFile(null);
		setValidationResult(null);
		setError('');
	};

	const getScoreColor = (score: number) => {
		if (score >= 80) return 'text-green-600';
		if (score >= 60) return 'text-yellow-600';
		return 'text-red-600';
	};

	const getScoreBadgeVariant = (score: number) => {
		if (score >= 80) return 'default';
		if (score >= 60) return 'secondary';
		return 'destructive';
	};

	return (
		<div className='container mx-auto px-4 py-8 max-w-4xl'>
			<div className='mb-8'>
				<h1 className='text-3xl font-bold text-gray-900 mb-2'>LaTeX Paper Validation</h1>
				<p className='text-gray-600'>
					Upload your LaTeX research paper to validate structure and compliance with Springer formatting guidelines.
				</p>
				<div className='mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
					<p className='text-sm text-blue-800'>
						<strong>Note:</strong> This validation analyzes LaTeX source code for document structure, citations,
						figures, and academic formatting requirements.
					</p>
				</div>
			</div>

			{/* Upload Section */}
			<Card className='mb-8'>
				<CardHeader>
					<CardTitle className='flex items-center gap-2'>
						<Upload className='h-5 w-5' />
						Upload Paper
					</CardTitle>
				</CardHeader>
				<CardContent>
					{!file ? (
						<div
							className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
								dragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
							}`}
							onDrop={handleDrop}
							onDragOver={handleDragOver}
							onDragEnter={handleDragEnter}
							onDragLeave={handleDragLeave}>
							<FileText className='h-12 w-12 text-gray-400 mx-auto mb-4' />
							<p className='text-lg font-medium text-gray-900 mb-2'>
								Drop your LaTeX file here or click the button below to browse
							</p>
							<p className='text-gray-600 mb-4'>
								Accepted formats: .tex (single file), .zip (LaTeX project) | Maximum file size: 10MB
							</p>
							<div className='space-y-4'>
								<Input
									type='file'
									accept='.tex,.zip'
									onChange={handleFileInputChange}
									className='hidden'
									id='file-upload'
								/>
								<Button
									variant='outline'
									onClick={handleBrowseClick}
									className='cursor-pointer hover:bg-gray-50 hover:border-gray-400 transition-colors px-6 py-2'>
									Browse Files
								</Button>
							</div>
						</div>
					) : (
						<div className='space-y-4'>
							<div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
								<div className='flex items-center gap-3'>
									<FileText className='h-8 w-8 text-blue-600' />
									<div>
										<p className='font-medium text-gray-900'>{file.name}</p>
										<p className='text-sm text-gray-600'>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
									</div>
								</div>
								<Button
									variant='outline'
									size='sm'
									onClick={resetForm}>
									Remove
								</Button>
							</div>

							<div className='flex gap-3'>
								<Button
									onClick={validatePaper}
									disabled={isValidating}
									className='flex-1'>
									{isValidating ? (
										<>
											<Loader2 className='h-4 w-4 mr-2 animate-spin' />
											Validating...
										</>
									) : (
										<>
											<CheckCircle className='h-4 w-4 mr-2' />
											Validate Paper
										</>
									)}
								</Button>
							</div>
						</div>
					)}

					{error && (
						<Alert className='mt-4 border-red-200 bg-red-50'>
							<XCircle className='h-4 w-4' />
							<div className='ml-2'>
								<p className='text-red-800'>{error}</p>
							</div>
						</Alert>
					)}
				</CardContent>
			</Card>

			{/* Validation Results */}
			{validationResult && (
				<Card className='mb-8'>
					<CardHeader>
						<CardTitle className='flex items-center justify-between'>
							<span className='flex items-center gap-2'>
								{validationResult.isValid ? (
									<CheckCircle className='h-5 w-5 text-green-600' />
								) : (
									<XCircle className='h-5 w-5 text-red-600' />
								)}
								Validation Results
							</span>
							<Badge variant={getScoreBadgeVariant(validationResult.score)}>Score: {validationResult.score}/100</Badge>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='space-y-6'>
							{/* Overall Status */}
							<div
								className={`p-4 rounded-lg ${
									validationResult.isValid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
								}`}>
								<div className='flex items-center gap-2 mb-2'>
									{validationResult.isValid ? (
										<CheckCircle className='h-5 w-5 text-green-600' />
									) : (
										<XCircle className='h-5 w-5 text-red-600' />
									)}
									<span className={`font-semibold ${validationResult.isValid ? 'text-green-800' : 'text-red-800'}`}>
										{validationResult.isValid ? 'PASS' : 'FAIL'}
									</span>
								</div>
								<p className={`text-sm ${validationResult.isValid ? 'text-green-700' : 'text-red-700'}`}>
									{validationResult.isValid
										? 'Your paper meets the Springer formatting requirements.'
										: 'Your paper does not meet all Springer formatting requirements.'}
								</p>
							</div>

							{/* Validation Details */}
							<div>
								<h3 className='font-semibold text-gray-900 mb-3'>Validation Details</h3>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<div className='space-y-2'>
										<div className='flex justify-between'>
											<span>Title Command</span>
											{validationResult.details.hasTitle ? (
												<CheckCircle className='h-4 w-4 text-green-600' />
											) : (
												<XCircle className='h-4 w-4 text-red-600' />
											)}
										</div>
										<div className='flex justify-between'>
											<span>Author Command</span>
											{validationResult.details.hasAuthor ? (
												<CheckCircle className='h-4 w-4 text-green-600' />
											) : (
												<XCircle className='h-4 w-4 text-red-600' />
											)}
										</div>
										<div className='flex justify-between'>
											<span>Abstract Environment</span>
											{validationResult.details.hasAbstract ? (
												<CheckCircle className='h-4 w-4 text-green-600' />
											) : (
												<XCircle className='h-4 w-4 text-red-600' />
											)}
										</div>
										<div className='flex justify-between'>
											<span>Keywords Section</span>
											{validationResult.details.hasKeywords ? (
												<CheckCircle className='h-4 w-4 text-green-600' />
											) : (
												<XCircle className='h-4 w-4 text-red-600' />
											)}
										</div>
									</div>
									<div className='space-y-2'>
										<div className='flex justify-between'>
											<span>Introduction Section</span>
											{validationResult.details.hasIntroduction ? (
												<CheckCircle className='h-4 w-4 text-green-600' />
											) : (
												<XCircle className='h-4 w-4 text-red-600' />
											)}
										</div>
										<div className='flex justify-between'>
											<span>Methods Section</span>
											{validationResult.details.hasMethods ? (
												<CheckCircle className='h-4 w-4 text-green-600' />
											) : (
												<Info className='h-4 w-4 text-gray-400' />
											)}
										</div>
										<div className='flex justify-between'>
											<span>Figures Count</span>
											<span>{validationResult.details.figureCount}</span>
										</div>
										<div className='flex justify-between'>
											<span>Tables Count</span>
											<span>{validationResult.details.tableCount}</span>
										</div>
										<div className='flex justify-between'>
											<span>Citations Count</span>
											<span>{validationResult.details.citationCount}</span>
										</div>
										<div className='flex justify-between'>
											<span>Easychair Document Class</span>
											{validationResult.details.isEasychair ? (
												<CheckCircle className='h-4 w-4 text-green-600' />
											) : (
												<Info className='h-4 w-4 text-gray-400' />
											)}
										</div>
									</div>
								</div>
							</div>

							{/* Errors */}
							{validationResult.errors.length > 0 && (
								<div>
									<h3 className='font-semibold text-red-800 mb-3 flex items-center gap-2'>
										<XCircle className='h-4 w-4' />
										Errors ({validationResult.errors.length})
									</h3>
									<ul className='space-y-2'>
										{validationResult.errors.map((error, index) => (
											<li
												key={index}
												className='flex items-start gap-2 text-red-700 text-sm'>
												<XCircle className='h-4 w-4 mt-0.5 flex-shrink-0' />
												{error}
											</li>
										))}
									</ul>
								</div>
							)}

							{/* Warnings */}
							{validationResult.warnings.length > 0 && (
								<div>
									<h3 className='font-semibold text-yellow-800 mb-3 flex items-center gap-2'>
										<AlertTriangle className='h-4 w-4' />
										Warnings ({validationResult.warnings.length})
									</h3>
									<ul className='space-y-2'>
										{validationResult.warnings.map((warning, index) => (
											<li
												key={index}
												className='flex items-start gap-2 text-yellow-700 text-sm'>
												<AlertTriangle className='h-4 w-4 mt-0.5 flex-shrink-0' />
												{warning}
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
					</CardContent>
				</Card>
			)}

			{/* Guidelines */}
			<Card>
				<CardHeader>
					<CardTitle className='flex items-center gap-2'>
						<Info className='h-5 w-5' />
						LaTeX Validation Guidelines
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='space-y-4'>
						<div>
							<h4 className='font-semibold text-gray-900 mb-2'>File Upload Options:</h4>
							<ul className='list-disc list-inside text-sm text-gray-700 space-y-1'>
								<li>
									<strong>.tex files:</strong> Single LaTeX source file
								</li>
								<li>
									<strong>.zip files:</strong> LaTeX project with multiple files (main .tex file will be automatically
									detected)
								</li>
							</ul>
						</div>
						<Separator />
						<div>
							<h4 className='font-semibold text-gray-900 mb-2'>Required LaTeX Elements:</h4>
							<ul className='list-disc list-inside text-sm text-gray-700 space-y-1'>
								<li>\title{'{}'} command with paper title</li>
								<li>\author{'{}'} command with author information</li>
								<li>
									\begin{'{abstract}'} ... \end{'{abstract}'} environment
								</li>
								<li>Keywords section (Keywords: or \keywords{'{}'})</li>
								<li>\section{'{Introduction}'} section</li>
							</ul>
						</div>
						<Separator />
						<div>
							<h4 className='font-semibold text-gray-900 mb-2'>Document Structure:</h4>
							<ul className='list-disc list-inside text-sm text-gray-700 space-y-1'>
								<li>Proper section hierarchy with \section{'{}'} commands</li>
								<li>
									Figures with \begin{'{figure}'} and \caption{'{}'}
								</li>
								<li>
									Tables with \begin{'{table}'} and \caption{'{}'}
								</li>
								<li>Citations using \cite{'{}'} commands</li>
								<li>
									Labels for cross-references (\label{'{}'}, \ref{'{}'})
								</li>
							</ul>
						</div>
						<Separator />
						<div>
							<h4 className='font-semibold text-gray-900 mb-2'>Best Practices:</h4>
							<ul className='list-disc list-inside text-sm text-gray-700 space-y-1'>
								<li>Use \[ \] instead of $$ for display mathematics</li>
								<li>Include \label{'{}'} for equations, figures, and tables</li>
								<li>Ensure all \cite{'{}'} references exist in bibliography</li>
								<li>Add Methods/Methodology section for research papers</li>
								<li>Keep abstract concise and informative</li>
							</ul>
						</div>
						<Separator />
						<div className='p-3 bg-yellow-50 border border-yellow-200 rounded'>
							<p className='text-sm text-yellow-800'>
								<strong>Important:</strong> This tool analyzes LaTeX source code structure and formatting. Ensure your
								document compiles correctly and follows Springer's specific class requirements and style guidelines for
								final submission.
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
