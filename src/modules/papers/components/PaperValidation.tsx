'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert } from '@/components/ui/alert';

import { FileText, Upload, CheckCircle, XCircle, AlertTriangle, Loader2, Copy, Code } from 'lucide-react';
import { ValidationResult, ValidationResponse } from '../types';
import GuidelinesDrawer from './GuidelinesDrawer';

interface PaperValidationComponentProps {
	onValidationComplete?: (result: ValidationResult) => void;
	onPdfUpload?: (pdfFile: File) => void;
	showGuidelines?: boolean;
	className?: string;
}

// Sample LaTeX code for different validation errors
const SAMPLE_CODES = {
	documentClass: `\\documentclass{easychair}`,
	title: `\\title{Your Research Paper Title}`,
	abstract: `\\begin{abstract}
This is your abstract text. Write a concise summary of your research including 
objectives, methodology, key findings, and conclusions. Aim for 150-250 words.
\\end{abstract}`,
	keywords: `\\keywords{keyword1, keyword2, keyword3, keyword4, keyword5}`,
	author: `\\author{
    Author Name\\inst{1}
\\and
    Author Name\\inst{2}
\\and
    Author Name\\inst{3}
}`,
	authorRunning: `\\authorrunning{Author Names}`,
	titleRunning: `\\titlerunning{Paper Title}`,
	institute: `\\institute{
   Department Name, University Name,
   City, Country\\\\
   \\email{author1@university.edu}
\\and
   Department Name, University Name,
   City, Country\\\\
   \\email{author2@university.edu}
\\and
   Department Name, University Name,
   City, Country\\\\
   \\email{author3@university.edu}
}`,
	introduction: `\\section{Introduction}
Provide background information, state the research problem, 
and outline your objectives in this section.`,
	footnote: `\\footnote{Proceedings of the 8th International Conference on Mobile Internet Security (MobiSec'24), Article No. 42, December 17-19, 2024, Sapporo, Japan. © The copyright of this paper remains with the author(s).}`,
	email: `\\email{author@university.edu}`,
	thanks: `% INCORRECT: Using \\thanks{} commands
\\author{
    John Smith\\thanks{This work was supported by the National Science Foundation under Grant No. 1234567.}
\\and
    Jane Doe\\thanks{The authors would like to thank the anonymous reviewers for their valuable feedback.}
}

% CORRECT: Replace with acknowledgements section
\\author{
    John Smith\\inst{1}
\\and
    Jane Doe\\inst{2}
}

% Later in the document, add:
\\section{Acknowledgements}
This work was supported by the National Science Foundation under Grant No. 1234567. 
The authors would like to thank the anonymous reviewers for their valuable feedback 
and constructive suggestions that helped improve the quality of this paper. 
We also acknowledge the support of our research group and the computing resources 
provided by our institution.`,
};

// Error message mappings with detailed explanations
const ERROR_EXPLANATIONS = {
	'Missing \\title{} command - add \\title{Your Paper Title}': {
		description: 'A title is required for all academic papers. It should clearly describe your research topic.',
		sample: SAMPLE_CODES.title,
		category: 'title',
	},
	'Missing abstract environment - add \\begin{abstract}...\\end{abstract}': {
		description: 'An abstract is required and should summarize your research objectives, methods, and key findings.',
		sample: SAMPLE_CODES.abstract,
		category: 'abstract',
	},
	'Missing keywords section': {
		description: 'Keywords are required to help readers find your paper. Include 3-5 relevant terms.',
		sample: SAMPLE_CODES.keywords,
		category: 'keywords',
	},
	'Missing \\author{} command - add \\author{Author Name}': {
		description: 'Author information is required. Use \\inst{} commands to link authors to their affiliations.',
		sample: SAMPLE_CODES.author,
		category: 'author',
	},
	'Missing Introduction section': {
		description:
			'An Introduction section is required. It should provide background and state your research objectives.',
		sample: SAMPLE_CODES.introduction,
		category: 'introduction',
	},
	'Document must use \\documentclass{easychair} for EasyChair submissions': {
		description: 'EasyChair submissions require the easychair document class.',
		sample: SAMPLE_CODES.documentClass,
		category: 'documentClass',
	},
	'\\authorrunning{} command is mandatory for EasyChair submissions': {
		description: 'The \\authorrunning{} command is required for EasyChair submissions.',
		sample: SAMPLE_CODES.authorRunning,
		category: 'authorRunning',
	},
	'\\titlerunning{} command is mandatory for EasyChair submissions': {
		description: 'The \\titlerunning{} command is required for EasyChair submissions.',
		sample: SAMPLE_CODES.titleRunning,
		category: 'titleRunning',
	},

	'Missing \\inst{} commands - add \\inst{1}, \\inst{2}, etc. to link authors to affiliations': {
		description: '\\inst{} commands are required to link authors to their institutional affiliations.',
		sample: SAMPLE_CODES.author,
		category: 'inst',
	},
	'Missing \\institute{} command - add \\institute{} with author affiliations': {
		description: '\\institute{} command is required to provide detailed institutional information for all authors.',
		sample: SAMPLE_CODES.institute,
		category: 'institute',
	},
	'Missing \\email{} command - add \\email{} for corresponding author contact': {
		description: '\\email{} command is required to provide contact information for the corresponding author.',
		sample: SAMPLE_CODES.email,
		category: 'email',
	},
	'\\thanks{} commands should be replaced with an acknowledgements section. Consider adding \\section{Acknowledgements} and moving the content there.':
		{
			description:
				'\\thanks{} commands are not allowed in EasyChair format. Move all acknowledgements to a dedicated acknowledgements section.',
			sample: SAMPLE_CODES.thanks,
			category: 'thanks',
		},
	'\\thanks{} commands should be removed. Move the content to the acknowledgements section instead.': {
		description: 'Remove all \\thanks{} commands and move their content to the acknowledgements section.',
		sample: SAMPLE_CODES.thanks,
		category: 'thanks',
	},
};

// Warning message mappings
const WARNING_EXPLANATIONS = {
	'Abstract appears to be too short': {
		description: 'Your abstract should be longer to adequately summarize your research (150-250 words).',
		sample: SAMPLE_CODES.abstract,
		category: 'abstract',
	},
};

export default function PaperValidationComponent({
	onValidationComplete,
	onPdfUpload,
	showGuidelines = true,
	className = '',
}: PaperValidationComponentProps) {
	const [file, setFile] = useState<File | null>(null);
	const [pdfFile, setPdfFile] = useState<File | null>(null);
	const [isValidating, setIsValidating] = useState(false);
	const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
	const [error, setError] = useState<string>('');
	const [dragOver, setDragOver] = useState(false);
	const [pdfDragOver, setPdfDragOver] = useState(false);
	const [expandedErrors, setExpandedErrors] = useState<Set<number>>(new Set());
	const [expandedWarnings, setExpandedWarnings] = useState<Set<number>>(new Set());
	const [isGuidelinesOpen, setIsGuidelinesOpen] = useState(false);

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
		setExpandedErrors(new Set());
		setExpandedWarnings(new Set());
	};

	const handlePdfFileSelect = (selectedFile: File) => {
		const allowedTypes = ['application/pdf'];
		const allowedExtensions = ['.pdf'];
		const fileExtension = selectedFile.name.toLowerCase().substring(selectedFile.name.lastIndexOf('.'));

		if (!allowedTypes.includes(selectedFile.type) && !allowedExtensions.includes(fileExtension)) {
			setError('Please select a PDF file.');
			return;
		}

		if (selectedFile.size > 10 * 1024 * 1024) {
			setError('PDF file size must be less than 10MB.');
			return;
		}

		setPdfFile(selectedFile);
		setError('');
		onPdfUpload?.(selectedFile);
	};

	const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0];
		if (selectedFile) {
			handleFileSelect(selectedFile);
		}
		e.target.value = '';
	};

	const handlePdfFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0];
		if (selectedFile) {
			handlePdfFileSelect(selectedFile);
		}
		e.target.value = '';
	};

	const handleBrowseClick = () => {
		const fileInput = document.getElementById('paper-validation-file-upload') as HTMLInputElement;
		if (fileInput) {
			fileInput.click();
		}
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

	const handleDragEnter = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setDragOver(true);
	};

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setDragOver(false);
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
				onValidationComplete?.(data.validation);
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
		setExpandedErrors(new Set());
		setExpandedWarnings(new Set());
	};

	const getScoreBadgeVariant = (score: number) => {
		if (score >= 12) return 'success';
		if (score >= 8) return 'secondary';
		return 'destructive';
	};

	const toggleErrorExpansion = (index: number) => {
		const newExpanded = new Set(expandedErrors);
		if (newExpanded.has(index)) {
			newExpanded.delete(index);
		} else {
			newExpanded.add(index);
		}
		setExpandedErrors(newExpanded);
	};

	const toggleWarningExpansion = (index: number) => {
		const newExpanded = new Set(expandedWarnings);
		if (newExpanded.has(index)) {
			newExpanded.delete(index);
		} else {
			newExpanded.add(index);
		}
		setExpandedWarnings(newExpanded);
	};

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
	};

	const renderErrorItem = (error: string, index: number) => {
		const explanation = ERROR_EXPLANATIONS[error as keyof typeof ERROR_EXPLANATIONS];
		const isExpanded = expandedErrors.has(index);

		return (
			<li
				key={index}
				className='border border-red-200 rounded-lg p-4 bg-red-50'>
				<div className='flex items-start gap-3'>
					<div className='flex-1'>
						<div className='flex items-center justify-between'>
							<h4 className='font-medium text-red-800'>{error}</h4>
							<Button
								size='sm'
								variant='destructive'
								onClick={() => toggleErrorExpansion(index)}>
								{isExpanded ? 'Hide Details' : 'Show Details'}
							</Button>
						</div>

						{isExpanded && explanation && (
							<div className='mt-3 space-y-3'>
								<p className='text-sm text-red-700'>{explanation.description}</p>

								{explanation.sample && (
									<div className='bg-gray-900 rounded-lg p-4'>
										<div className='flex items-center justify-between mb-2'>
											<div className='flex items-center gap-2'>
												<Code className='h-4 w-4 text-gray-400' />
												<span className='text-sm font-medium text-gray-300'>Sample LaTeX Code</span>
											</div>
											<Button
												variant='ghost'
												size='sm'
												onClick={() => copyToClipboard(explanation.sample)}
												className='h-6 px-2 text-gray-400 hover:text-gray-200'>
												<Copy className='h-3 w-3 mr-1' />
												Copy
											</Button>
										</div>
										<pre className='text-xs text-gray-300 overflow-x-auto'>
											<code>{explanation.sample}</code>
										</pre>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</li>
		);
	};

	const renderWarningItem = (warning: string, index: number) => {
		const explanation = WARNING_EXPLANATIONS[warning as keyof typeof WARNING_EXPLANATIONS];
		const isExpanded = expandedWarnings.has(index);

		return (
			<li
				key={index}
				className='border border-red-200 rounded-lg p-4 bg-red-50'>
				<div className='flex items-start gap-3'>
					<XCircle className='h-5 w-5 text-red-600 mt-0.5 flex-shrink-0' />
					<div className='flex-1'>
						<div className='flex items-center justify-between mb-2'>
							<h4 className='font-medium text-red-800'>{warning}</h4>
							<Button
								variant='ghost'
								size='sm'
								onClick={() => toggleWarningExpansion(index)}
								className='h-6 px-2 text-red-600 hover:text-red-800'>
								{isExpanded ? 'Hide Details' : 'Show Details'}
							</Button>
						</div>

						{isExpanded && explanation && (
							<div className='mt-3 space-y-3'>
								<p className='text-sm text-red-700'>{explanation.description}</p>

								{explanation.sample && (
									<div className='bg-gray-900 rounded-lg p-4'>
										<div className='flex items-center justify-between mb-2'>
											<div className='flex items-center gap-2'>
												<Code className='h-4 w-4 text-gray-400' />
												<span className='text-sm font-medium text-gray-300'>Sample LaTeX Code</span>
											</div>
											<Button
												variant='ghost'
												size='sm'
												onClick={() => copyToClipboard(explanation.sample)}
												className='h-6 px-2 text-gray-400 hover:text-gray-200'>
												<Copy className='h-3 w-3 mr-1' />
												Copy
											</Button>
										</div>
										<pre className='text-xs text-gray-300 overflow-x-auto'>
											<code>{explanation.sample}</code>
										</pre>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</li>
		);
	};

	return (
		<div className={className}>
			{/* LaTex Validation Upload */}
			<Card className='mb-8'>
				<CardHeader>
					<div className='flex items-center justify-between'>
						<CardTitle className='flex items-center gap-2'>
							<Upload className='h-5 w-5' />
							LaTeX Validation Upload
						</CardTitle>
						<GuidelinesDrawer
							isOpen={isGuidelinesOpen}
							onOpenChange={setIsGuidelinesOpen}
						/>
					</div>
				</CardHeader>
				<CardContent>
					{!file ? (
						<div
							className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
								dragOver ? 'border-primary/50 bg-primary/5' : 'border-secondary/50 hover:border-secondary/100'
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
									id='paper-validation-file-upload'
								/>
								<Button
									variant='secondary'
									onClick={handleBrowseClick}>
									Browse Files
								</Button>
							</div>
						</div>
					) : (
						<div className='space-y-4'>
							<div className='flex items-center justify-between p-4 border border-secondary/5 rounded-lg'>
								<div className='flex items-center gap-3'>
									<FileText className='h-8 w-8 text-primary' />
									<div>
										<p className='font-medium text-primary'>{file.name}</p>
										<p className='text-secondary text-sm'>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
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
						<Alert className='mt-4 border-destructive/50 bg-destructive/5'>
							<XCircle className='h-4 w-4' />
							<div className='ml-2'>
								<p className='text-red-800'>{error}</p>
							</div>
						</Alert>
					)}
				</CardContent>
				<CardFooter>
					{/* Validation Results */}
					{validationResult && (
						<div className='mb-8 w-full'>
							<div className='flex items-center justify-between'>
								<span className='flex items-center gap-2'>
									{validationResult.isValid ? (
										<CheckCircle className='h-5 w-5 text-success' />
									) : (
										<XCircle className='h-5 w-5 text-red-600' />
									)}
									Validation Results
								</span>
								<Badge variant={getScoreBadgeVariant(validationResult.score)}>Score: {validationResult.score}/12</Badge>
							</div>
							<div className='mt-4'>
								<div className='space-y-6'>
									{/* Overall Status */}
									<div
										className={`p-4 rounded-lg ${
											validationResult.isValid
												? 'bg-success/5 border border-success/50'
												: 'bg-destructive/5 border border-destructive/50'
										}`}>
										<div className='flex items-center gap-2 mb-2'>
											{validationResult.isValid ? (
												<CheckCircle className='h-5 w-5 text-success' />
											) : (
												<XCircle className='h-5 w-5 text-destructive' />
											)}
											<span
												className={`font-semibold ${validationResult.isValid ? 'text-success' : 'text-destructive'}`}>
												{validationResult.isValid ? 'PASS' : 'FAIL'}
											</span>
										</div>
										<p className={`text-sm ${validationResult.isValid ? 'text-success' : 'text-destructive'}`}>
											{validationResult.isValid
												? 'Your paper meets all required formatting requirements and can be submitted. Please upload the compiled PDF version of your paper below.'
												: 'Your paper has validation errors that must be fixed before submission.'}
										</p>
									</div>

									{/* Errors */}
									{validationResult.errors.length > 0 && (
										<div>
											<h3 className='font-semibold text-destructive mb-3 flex items-center gap-2'>
												<XCircle className='h-4 w-4' />
												Critical Errors ({validationResult.errors.length})
											</h3>
											<p className='text-sm text-destructive mb-4'>
												These errors must be fixed before your paper can be submitted.
											</p>
											<ul className='space-y-3'>
												{validationResult.errors.map((error, index) => renderErrorItem(error, index))}
											</ul>
										</div>
									)}

									{/* Required Elements */}
									{validationResult.warnings.length > 0 && (
										<div>
											<h3 className='font-semibold text-destructive mb-3 flex items-center gap-2'>
												<XCircle className='h-4 w-4' />
												Required Elements ({validationResult.warnings.length})
											</h3>
											<p className='text-sm text-destructive mb-4'>
												These elements are required for MobiSec submissions. Your paper cannot be submitted without
												addressing these issues.
											</p>
											<ul className='space-y-3'>
												{validationResult.warnings.map((warning, index) => renderWarningItem(warning, index))}
											</ul>
										</div>
									)}

									{/* Validation Details */}
									<div>
										<h3 className='font-semibold text-gray-800 mb-3'>Validation Details</h3>
										<div className='grid grid-cols-3 md:grid-cols-4 gap-4 text-sm'>
											{/* Document Structure (6 points) */}
											<div className='flex items-center gap-2'>
												<span className='font-medium'>Title:</span>
												{validationResult.details.hasTitle ? (
													<CheckCircle className='h-4 w-4 text-success' />
												) : (
													<XCircle className='h-4 w-4 text-destructive' />
												)}
											</div>
											<div className='flex items-center gap-2'>
												<span className='font-medium'>Abstract:</span>
												{validationResult.details.hasAbstract ? (
													<CheckCircle className='h-4 w-4 text-success' />
												) : (
													<XCircle className='h-4 w-4 text-destructive' />
												)}
											</div>
											<div className='flex items-center gap-2'>
												<span className='font-medium'>Keywords:</span>
												{validationResult.details.hasKeywords ? (
													<CheckCircle className='h-4 w-4 text-success' />
												) : (
													<XCircle className='h-4 w-4 text-destructive' />
												)}
											</div>
											<div className='flex items-center gap-2'>
												<span className='font-medium'>Introduction:</span>
												{validationResult.details.hasIntroduction ? (
													<CheckCircle className='h-4 w-4 text-success' />
												) : (
													<XCircle className='h-4 w-4 text-destructive' />
												)}
											</div>
											<div className='flex items-center gap-2'>
												<span className='font-medium'>Author:</span>
												{validationResult.details.hasAuthor ? (
													<CheckCircle className='h-4 w-4 text-success' />
												) : (
													<XCircle className='h-4 w-4 text-destructive' />
												)}
											</div>

											{/* Author Information (3 points) */}
											<div className='flex items-center gap-2'>
												<span className='font-medium'>Author Inst:</span>
												{validationResult.details.hasInst ? (
													<CheckCircle className='h-4 w-4 text-success' />
												) : (
													<XCircle className='h-4 w-4 text-destructive' />
												)}
											</div>
											<div className='flex items-center gap-2'>
												<span className='font-medium'>Institute:</span>
												{validationResult.details.hasInstitute ? (
													<CheckCircle className='h-4 w-4 text-success' />
												) : (
													<XCircle className='h-4 w-4 text-destructive' />
												)}
											</div>
											<div className='flex items-center gap-2'>
												<span className='font-medium'>Email:</span>
												{validationResult.details.hasEmail ? (
													<CheckCircle className='h-4 w-4 text-success' />
												) : (
													<XCircle className='h-4 w-4 text-destructive' />
												)}
											</div>

											<div className='flex items-center gap-2'>
												<span className='font-medium'>Footnote:</span>
												{validationResult.details.validatedFootnote ? (
													<CheckCircle className='h-4 w-4 text-success' />
												) : validationResult.details.hasFootnote ? (
													<AlertTriangle className='h-4 w-4 text-warning' />
												) : (
													<XCircle className='h-4 w-4 text-destructive' />
												)}
											</div>
											{/* EasyChair Format (3 points) */}
											<div className='flex items-center gap-2'>
												<span className='font-medium'>Document Class:</span>
												{validationResult.details.hasEasyChairClass ? (
													<CheckCircle className='h-4 w-4 text-success' />
												) : (
													<XCircle className='h-4 w-4 text-destructive' />
												)}
											</div>
											<div className='flex items-center gap-2'>
												<span className='font-medium'>Author Running:</span>
												{validationResult.details.hasAuthorRunning ? (
													<CheckCircle className='h-4 w-4 text-success' />
												) : (
													<XCircle className='h-4 w-4 text-destructive' />
												)}
											</div>
											<div className='flex items-center gap-2'>
												<span className='font-medium'>Title Running:</span>
												{validationResult.details.hasTitleRunning ? (
													<CheckCircle className='h-4 w-4 text-success' />
												) : (
													<XCircle className='h-4 w-4 text-destructive' />
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</CardFooter>
			</Card>

			{/* PDF Upload Section - Only show after successful validation */}
			{validationResult?.isValid && (
				<Card className='mb-8'>
					<CardHeader>
						<CardTitle className='flex items-center gap-2'>
							<FileText className='h-5 w-5' />
							PDF Upload
						</CardTitle>
					</CardHeader>
					<CardContent>
						{!pdfFile ? (
							<div
								className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
									pdfDragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
								}`}
								onDrop={(e) => {
									e.preventDefault();
									e.stopPropagation();
									setPdfDragOver(false);
									const droppedFile = e.dataTransfer.files[0];
									if (droppedFile) {
										handlePdfFileSelect(droppedFile);
									}
								}}
								onDragOver={(e) => {
									e.preventDefault();
									e.stopPropagation();
									setPdfDragOver(true);
								}}
								onDragEnter={(e) => {
									e.preventDefault();
									e.stopPropagation();
									setPdfDragOver(true);
								}}
								onDragLeave={(e) => {
									e.preventDefault();
									e.stopPropagation();
									setPdfDragOver(false);
								}}>
								<FileText className='h-12 w-12 text-gray-400 mx-auto mb-4' />
								<p className='text-lg font-medium text-secondary mb-2'>
									Drop your PDF file here or click the button below to browse
								</p>
								<p className='text-secondary/60 mb-4'>
									Upload the compiled PDF version of your validated LaTeX paper | Maximum file size: 10MB
								</p>
								<div className='space-y-4'>
									<Input
										type='file'
										accept='.pdf'
										onChange={handlePdfFileInputChange}
										className='hidden'
										id='pdf-file-upload'
									/>
									<Button
										variant='secondary'
										onClick={() => {
											const fileInput = document.getElementById('pdf-file-upload') as HTMLInputElement;
											if (fileInput) {
												fileInput.click();
											}
										}}>
										Browse PDF Files
									</Button>
								</div>
							</div>
						) : (
							<div className='space-y-4'>
								<div className='flex items-center justify-between p-4 border border-secondary/5 rounded-lg'>
									<div className='flex items-center gap-3'>
										<FileText className='h-8 w-8 text-primary' />
										<div>
											<p className='font-medium text-primary'>{pdfFile.name}</p>
											<p className='text-secondary text-sm'>{(pdfFile.size / 1024 / 1024).toFixed(2)} MB</p>
										</div>
									</div>
									<Button
										variant='outline'
										size='sm'
										onClick={() => setPdfFile(null)}>
										Remove
									</Button>
								</div>
								<div className='p-4 border border-success/50 rounded-lg'>
									<div className='flex items-center gap-2'>
										<CheckCircle className='h-5 w-5 text-success' />
										<span className='text-sm font-medium text-success'>
											PDF file uploaded successfully! Your submission is now complete.
										</span>
									</div>
								</div>
							</div>
						)}
					</CardContent>
				</Card>
			)}
		</div>
	);
}
