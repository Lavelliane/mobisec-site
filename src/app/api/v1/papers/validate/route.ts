import { NextRequest, NextResponse } from 'next/server';
// import { auth } from '../../../../../../auth'; // Temporarily disabled for testing

interface EasyChairValidationResult {
	isValid: boolean;
	score: number;
	errors: string[];
	warnings: string[];
	details: {
		hasTitle: boolean;
		hasAuthor: boolean;
		hasAbstract: boolean;
		hasKeywords: boolean;
		hasIntroduction: boolean;
		hasFootnote: boolean;
		validatedFootnote: boolean;
		// EasyChair specific details
		hasEasyChairClass: boolean;
		hasAuthorRunning: boolean;
		hasTitleRunning: boolean;
		// Author Information details
		hasInst: boolean;
		hasInstitute: boolean;
		hasEmail: boolean;
	};
}

// Environment variable for final submission mode
const IS_FINAL_SUBMISSION = process.env.IS_FINAL_SUBMISSION === 'true';

// LaTeX patterns for validation
const LATEX_PATTERNS = {
	// Basic document structure
	DOCUMENTCLASS: /\\documentclass\s*\{easychair\}/i,
	TITLE: /\\title\s*\{([^}]+)\}/i,
	AUTHOR: /\\author\s*\{([^}]+)\}/i,
	ABSTRACT: /\\begin\s*\{\s*abstract\s*\}([\s\S]*?)\\end\s*\{\s*abstract\s*\}/i,
	KEYWORDS: /(?:Keywords?\s*:|\\keywords\s*\{[^}]*\}|\\section\*?\s*\{[^}]*keywords[^}]*\})/i,

	// EasyChair specific commands
	AUTHORRUNNING: /\\authorrunning\s*\{([^}]+)\}/i,
	TITLERUNNING: /\\titlerunning\s*\{([^}]+)\}/i,
	INSTITUTE: /\\institute\s*\{([^}]+)\}/i,
	EMAIL: /\\email\s*\{([^}]+)\}/i,
	INST: /\\inst\s*\{([^}]+)\}/i,
	THANKS: /\\thanks\s*\{([^}]+)\}/i,

	// Document structure

	// Section detection
	INTRODUCTION: /\\section\s*\{[^}]*(?:Introduction|Intro)[^}]*\}/i,
};

export async function POST(request: NextRequest) {
	try {
		// Check authentication (temporarily disabled for testing)
		// const session = await auth();
		// if (!session?.user) {
		// 	return NextResponse.json(
		// 		{
		// 			success: false,
		// 			message: 'Authentication required',
		// 		},
		// 		{ status: 401 }
		// 	);
		// }

		// Parse multipart form data
		const formData = await request.formData();
		const file = formData.get('paper') as File;

		if (!file) {
			return NextResponse.json(
				{
					success: false,
					message: 'No file uploaded',
				},
				{ status: 400 }
			);
		}

		// Validate file type (accept .tex and .zip files)
		const allowedTypes = [
			'text/x-tex',
			'application/x-tex',
			'text/plain',
			'application/zip',
			'application/x-zip-compressed',
		];
		const allowedExtensions = ['.tex', '.zip'];
		const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));

		if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
			return NextResponse.json(
				{
					success: false,
					message: 'Only LaTeX (.tex) and ZIP files are allowed',
				},
				{ status: 400 }
			);
		}

		// Validate file size (max 10MB)
		const maxSize = 10 * 1024 * 1024; // 10MB
		if (file.size > maxSize) {
			return NextResponse.json(
				{
					success: false,
					message: 'File size too large. Maximum 10MB allowed.',
				},
				{ status: 400 }
			);
		}

		// Extract LaTeX content
		let latexContent: string;

		try {
			if (fileExtension === '.zip') {
				latexContent = await processZipFile(file);
			} else {
				latexContent = await file.text();
			}
		} catch (error) {
			console.error('File processing error:', error);
			return NextResponse.json(
				{
					success: false,
					message: error instanceof Error ? error.message : 'Failed to process file',
				},
				{ status: 400 }
			);
		}

		// Validate content is not empty
		if (!latexContent || latexContent.trim().length < 10) {
			return NextResponse.json(
				{
					success: false,
					message: 'File appears to be empty or too small. Please upload a valid LaTeX file.',
				},
				{ status: 400 }
			);
		}

		// Log file info for debugging
		console.log('Processing LaTeX file:', {
			fileName: file.name,
			fileSize: file.size,
			contentLength: latexContent.length,
			fileType: file.type,
		});

		// Perform LaTeX validation
		const validationResult = await validateLatexContent(latexContent, file.name);

		return NextResponse.json(
			{
				success: true,
				validation: validationResult,
				message: validationResult.isValid
					? 'Paper passes EasyChair format validation'
					: 'Paper fails EasyChair format validation',
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Paper validation error:', error);
		return NextResponse.json(
			{
				success: false,
				message: error instanceof Error ? error.message : 'Failed to validate paper',
			},
			{ status: 500 }
		);
	}
}

async function processZipFile(file: File): Promise<string> {
	try {
		// Dynamically import JSZip to avoid build issues
		const JSZip = (await import('jszip')).default;

		// Read the ZIP file
		const arrayBuffer = await file.arrayBuffer();
		const zip = await JSZip.loadAsync(arrayBuffer);

		// Look for .tex files in the ZIP
		const texFiles: { name: string; content: string }[] = [];
		const allFiles = Object.keys(zip.files);

		console.log('ZIP contents:', allFiles);

		for (const [filename, file] of Object.entries(zip.files)) {
			if (filename.toLowerCase().endsWith('.tex') && !file.dir) {
				const content = await file.async('string');
				texFiles.push({ name: filename, content });
				console.log(`Found .tex file: ${filename} (${content.length} characters)`);
			}
		}

		if (texFiles.length === 0) {
			throw new Error('No .tex files found in the ZIP archive');
		}

		// If there's only one .tex file, use it
		if (texFiles.length === 1) {
			return texFiles[0].content;
		}

		// If multiple .tex files, try to find the main one and combine content
		const mainFile = texFiles.find(
			(file) =>
				file.name.toLowerCase().includes('main') ||
				file.name.toLowerCase().includes('paper') ||
				file.content.includes('\\documentclass')
		);

		if (mainFile) {
			// For multi-file projects, combine main file with chapter content for better validation
			let combinedContent = mainFile.content;

			// Look for \input or \include commands and try to include that content
			const inputMatches = mainFile.content.match(/\\(?:input|include)\{([^}]+)\}/g);
			if (inputMatches) {
				for (const match of inputMatches) {
					const filename = match.match(/\\(?:input|include)\{([^}]+)\}/)?.[1];
					if (filename) {
						// Find the corresponding file (with or without .tex extension)
						const referencedFile = texFiles.find(
							(f) =>
								f.name.includes(filename) ||
								f.name.includes(filename + '.tex') ||
								f.name.endsWith('/' + filename) ||
								f.name.endsWith('/' + filename + '.tex')
						);
						if (referencedFile) {
							combinedContent += '\n\n% Content from ' + referencedFile.name + '\n';
							combinedContent += referencedFile.content;
						}
					}
				}
			}

			// BibTeX processing removed since bibliography validation is disabled

			return combinedContent;
		}

		// If no clear main file, use the first one with documentclass
		const docClassFile = texFiles.find((file) => file.content.includes('\\documentclass'));

		if (docClassFile) {
			return docClassFile.content;
		}

		// Fallback to the first .tex file
		return texFiles[0].content;
	} catch (error) {
		console.error('ZIP processing error:', error);
		throw new Error(`Failed to process ZIP file: ${error instanceof Error ? error.message : 'Unknown error'}`);
	}
}

async function validateLatexContent(content: string, _filename: string): Promise<EasyChairValidationResult> {
	const errors: string[] = [];
	const warnings: string[] = [];
	let score = 0;

	// Initialize validation details
	const details = {
		hasTitle: false,
		hasAuthor: false,
		hasAbstract: false,
		hasKeywords: false,
		hasIntroduction: false,
		hasFootnote: false,
		validatedFootnote: false,
		// EasyChair specific details
		hasEasyChairClass: false,
		hasAuthorRunning: false,
		hasTitleRunning: false,
		// Author Information details
		hasInst: false,
		hasInstitute: false,
		hasEmail: false,
	};

	// 1. Document Structure Validation (Priority Elements) - 6 points
	const structureResult = validateDocumentStructure(content);
	score += structureResult.score;
	errors.push(...structureResult.errors);
	warnings.push(...structureResult.warnings);
	Object.assign(details, structureResult.details);

	// 5. Author Information Validation (3 points)
	const authorResult = validateAuthorInfo(content);
	score += authorResult.score;
	errors.push(...authorResult.errors);
	warnings.push(...authorResult.warnings);
	Object.assign(details, authorResult.details);

	// 6. EasyChair Format Validation (3 points)
	const easychairResult = validateEasyChairFormat(content);
	score += easychairResult.score;
	errors.push(...easychairResult.errors);
	warnings.push(...easychairResult.warnings);

	// Update EasyChair-specific details
	Object.assign(details, easychairResult.details);

	// Determine if paper passes validation
	// All priority elements must be present (no errors) for the paper to be valid
	const isValid = errors.length === 0;

	// If paper passes validation, ensure it gets full score
	if (isValid && score < 12) {
		score = 12;
	}

	return {
		isValid,
		score,
		errors,
		warnings,
		details,
	};
}

function validateDocumentStructure(content: string): {
	score: number;
	errors: string[];
	warnings: string[];
	details: {
		hasTitle: boolean;
		hasAuthor: boolean;
		hasAbstract: boolean;
		hasKeywords: boolean;
		hasIntroduction: boolean;
		hasFootnote: boolean;
		validatedFootnote: boolean;
	};
} {
	const errors: string[] = [];
	const warnings: string[] = [];
	let score = 0;

	// Check for required sections
	const hasTitle = LATEX_PATTERNS.TITLE.test(content);
	const hasAuthor = LATEX_PATTERNS.AUTHOR.test(content);
	const hasAbstract = LATEX_PATTERNS.ABSTRACT.test(content);
	const hasKeywords = LATEX_PATTERNS.KEYWORDS.test(content);
	const hasIntroduction = LATEX_PATTERNS.INTRODUCTION.test(content);

	// Check for footnotes
	// Footnote detection with proper brace matching
	const extractFootnotes = (text: string): string[] => {
		const footnotes: string[] = [];
		const regex = /\\footnote\s*\{/g;
		let match;

		while ((match = regex.exec(text)) !== null) {
			const startIndex = match.index + match[0].length;
			let braceCount = 1;
			let endIndex = startIndex;

			for (let i = startIndex; i < text.length; i++) {
				if (text[i] === '{') braceCount++;
				else if (text[i] === '}') {
					braceCount--;
					if (braceCount === 0) {
						endIndex = i;
						break;
					}
				}
			}

			if (braceCount === 0) {
				const footnoteContent = text.substring(startIndex, endIndex);
				footnotes.push(footnoteContent);
			}
		}

		return footnotes;
	};

	const footnotes = extractFootnotes(content);
	const hasFootnote = footnotes.length > 0;

	// Title validation (1 point)
	if (hasTitle) {
		score += 1;
	} else {
		errors.push('Missing \\title{} command - add \\title{Your Paper Title}');
	}

	// Abstract validation (1 point)
	if (hasAbstract) {
		score += 1;
		const abstractMatch = content.match(LATEX_PATTERNS.ABSTRACT);
		if (abstractMatch) {
			const abstractText = abstractMatch[1].trim();
			if (abstractText.length < 50) {
				warnings.push('Abstract appears to be too short');
			}
		}
	} else {
		errors.push('Missing abstract environment - add \\begin{abstract}...\\end{abstract}');
	}

	// Keywords validation (1 point)
	if (hasKeywords) {
		score += 1;
	} else {
		errors.push('Missing keywords section');
	}

	// Author validation (1 point)
	if (hasAuthor) {
		score += 1;
	} else {
		errors.push('Missing \\author{} command - add \\author{Author Name}');
	}

	// Introduction validation (1 point)
	if (hasIntroduction) {
		score += 1;
	} else {
		errors.push('Missing Introduction section');
	}

	// Methods, Results, Conclusion, References validation removed - authors can freely structure their paper

	// Footnotes validation (1 point)
	let validatedFootnote = false;

	if (hasFootnote) {
		score += 1;

		// Strict validation only for final submission
		if (IS_FINAL_SUBMISSION) {
			// Check for exactly one footnote with conference proceedings format
			if (footnotes.length === 1) {
				const footnoteText = footnotes[0].toLowerCase();

				// Check if the footnote follows the required format
				const hasProceedings = footnoteText.includes('proceedings');
				const hasConference = footnoteText.includes('conference');
				const hasMobiSec = footnoteText.includes('mobisec');
				const hasArticleNo = footnoteText.includes('article no');
				const hasLocation = /\w+,\s*\w+/.test(footnoteText); // Any location format: "City, Country"
				const hasCopyright = footnoteText.includes('copyright') || footnoteText.includes('©');
				const hasDate = /\d{4}/.test(footnoteText); // Check for year

				// All required elements should be present
				const hasCorrectFormat =
					hasProceedings && hasConference && hasMobiSec && hasArticleNo && hasLocation && hasCopyright && hasDate;

				if (hasCorrectFormat) {
					validatedFootnote = true;
				} else {
					warnings.push(
						'Footnote should follow the format: "Proceedings of the nth International Conference on Mobile Internet Security (MobiSec\'YY), Article No. [number], Month DD-DD, YYYY, Location, Country. © The copyright of this paper remains with the author(s)."'
					);
				}
			} else {
				warnings.push('Should have exactly one footnote with conference proceedings information');
			}
		} else {
			// If not final submission, automatically validate footnote
			validatedFootnote = true;
		}
	} else {
		// Only warn about missing footnotes in final submission mode
		if (IS_FINAL_SUBMISSION) {
			warnings.push('Missing required footnote with conference proceedings information');
		} else {
			// If not final submission and no footnotes, still validate and give points
			validatedFootnote = true;
			score += 1;
		}
	}

	// References detection (no scoring - for display only)

	return {
		score,
		errors,
		warnings,
		details: {
			hasTitle,
			hasAuthor,
			hasAbstract,
			hasKeywords,
			hasIntroduction,
			hasFootnote,
			validatedFootnote,
		},
	};
}

function validateAuthorInfo(content: string): {
	score: number;
	errors: string[];
	warnings: string[];
	details: {
		hasInst: boolean;
		hasInstitute: boolean;
		hasEmail: boolean;
	};
} {
	const errors: string[] = [];
	const warnings: string[] = [];
	let score = 0;

	// Check for \inst{} commands
	const hasInst = LATEX_PATTERNS.INST.test(content);
	if (hasInst) {
		score += 1;
	} else {
		errors.push('Missing \\inst{} commands - add \\inst{1}, \\inst{2}, etc. to link authors to affiliations');
	}

	// Check for \institute{} command
	const hasInstitute = LATEX_PATTERNS.INSTITUTE.test(content);
	if (hasInstitute) {
		score += 1;
	} else {
		errors.push('Missing \\institute{} command - add \\institute{} with author affiliations');
	}

	// Check for \email{} commands
	const emailMatches = content.match(LATEX_PATTERNS.EMAIL) || [];
	if (emailMatches.length > 0) {
		score += 1;
	} else {
		errors.push('Missing \\email{} command - add \\email{} for corresponding author contact');
	}

	// Check for \thanks{} commands - they should not be used in EasyChair format
	// Ignore commented out \thanks{} commands
	const thanksMatches = content.match(/^[^%]*\\thanks\s*\{[^}]+\}/gm) || [];
	const hasThanks = thanksMatches.length > 0;

	if (hasThanks) {
		// Check if thanks are used in author block (which is not allowed)
		const authorBlock = content.match(/\\author\s*\{([^}]+)\}/i);
		if (authorBlock && authorBlock[1].includes('\\thanks')) {
			errors.push(
				'\\thanks{} commands should not be used in the author block. Move any acknowledgements to a dedicated acknowledgements section.'
			);
		}

		// Check if thanks are used anywhere (should be moved to acknowledgements)
		const hasAcknowledgements =
			/\\section\s*\{[^}]*acknowledg?ments?[^}]*\}/i.test(content) ||
			/\\chapter\s*\{[^}]*acknowledg?ments?[^}]*\}/i.test(content) ||
			/\\section\s*\{Acknowledgements\}/i.test(content);

		if (!hasAcknowledgements) {
			errors.push(
				'\\thanks{} commands should be replaced with an acknowledgements section. Consider adding \\section{Acknowledgements} and moving the content there.'
			);
		} else {
			errors.push('\\thanks{} commands should be removed. Move the content to the acknowledgements section instead.');
		}
	}

	return {
		score,
		errors,
		warnings,
		details: {
			hasInst,
			hasInstitute,
			hasEmail: emailMatches.length > 0,
		},
	};
}

function validateEasyChairFormat(content: string): {
	score: number;
	errors: string[];
	warnings: string[];
	details: {
		hasEasyChairClass: boolean;
		hasAuthorRunning: boolean;
		hasTitleRunning: boolean;
	};
} {
	const errors: string[] = [];
	const warnings: string[] = [];
	let score = 0;

	// Check for EasyChair document class
	const hasEasyChairClass = LATEX_PATTERNS.DOCUMENTCLASS.test(content);
	if (hasEasyChairClass) {
		score += 1;
	} else {
		errors.push('Document must use \\documentclass{easychair} for EasyChair submissions');
	}

	// Check for required EasyChair commands
	const hasAuthorRunning = LATEX_PATTERNS.AUTHORRUNNING.test(content);
	if (hasAuthorRunning) {
		score += 1;
	} else {
		errors.push('\\authorrunning{} command is mandatory for EasyChair submissions');
	}

	const hasTitleRunning = LATEX_PATTERNS.TITLERUNNING.test(content);
	if (hasTitleRunning) {
		score += 1;
	} else {
		errors.push('\\titlerunning{} command is mandatory for EasyChair submissions');
	}

	// Institute and email validation moved to validateAuthorInfo function

	// Bibliography style validation removed - authors can freely choose their style

	return {
		score: Math.min(score, 3), // Cap at 3 points
		errors,
		warnings,
		details: {
			hasEasyChairClass: LATEX_PATTERNS.DOCUMENTCLASS.test(content),
			hasAuthorRunning: LATEX_PATTERNS.AUTHORRUNNING.test(content),
			hasTitleRunning: LATEX_PATTERNS.TITLERUNNING.test(content),
		},
	};
}
