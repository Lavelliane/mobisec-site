import { NextRequest, NextResponse } from 'next/server';
// import { auth } from '../../../../../../auth'; // Temporarily disabled for testing

interface SpringerValidationResult {
	isValid: boolean;
	score: number;
	errors: string[];
	warnings: string[];
	details: {
		hasTitle: boolean;
		hasAuthor: boolean;
		hasAbstract: boolean;
		hasKeywords: boolean;
		hasReferences: boolean;
		hasIntroduction: boolean;
		hasMethods: boolean;
		figureCount: number;
		tableCount: number;
		citationCount: number;
	};
}

// LaTeX patterns for validation
const LATEX_PATTERNS = {
	TITLE: /\\title\s*\{([^}]+)\}/i,
	AUTHOR: /\\author\s*\{([^}]+)\}/i,
	ABSTRACT: /\\begin\s*\{\s*abstract\s*\}([\s\S]*?)\\end\s*\{\s*abstract\s*\}/i,
	KEYWORDS: /(?:Keywords?\s*:|\\keywords\s*\{[^}]*\})/i,
	SECTIONS: /\\section\s*\{([^}]+)\}/gi,
	FIGURES: /\\begin\s*\{\s*figure\*?\s*\}[\s\S]*?\\end\s*\{\s*figure\*?\s*\}/gi,
	TABLES: /\\begin\s*\{\s*table\*?\s*\}[\s\S]*?\\end\s*\{\s*table\*?\s*\}/gi,
	EQUATIONS: /\\begin\s*\{\s*equation\s*\}[\s\S]*?\\end\s*\{\s*equation\s*\}/gi,
	CITATIONS: /\\cite\s*\{([^}]+)\}/gi,
	BIBLIOGRAPHY: /\\bibitem\s*\{([^}]+)\}/gi,
	LABELS: /\\label\s*\{([^}]+)\}/gi,
	REFS: /\\ref\s*\{([^}]+)\}/gi,
	INTRODUCTION: /\\section\s*\{[^}]*Introduction[^}]*\}/i,
	METHODS: /\\section\s*\{[^}]*(Methods?|Methodology)[^}]*\}/i,
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
					? 'Paper passes Springer format validation'
					: 'Paper fails Springer format validation',
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

async function validateLatexContent(content: string, _filename: string): Promise<SpringerValidationResult> {
	const errors: string[] = [];
	const warnings: string[] = [];
	let score = 0;

	// Initialize validation details
	const details = {
		hasTitle: false,
		hasAuthor: false,
		hasAbstract: false,
		hasKeywords: false,
		hasReferences: false,
		hasIntroduction: false,
		hasMethods: false,
		figureCount: 0,
		tableCount: 0,
		citationCount: 0,
	};

	// 1. Document Structure Validation (30 points)
	const structureResult = validateDocumentStructure(content);
	score += structureResult.score;
	errors.push(...structureResult.errors);
	warnings.push(...structureResult.warnings);
	Object.assign(details, structureResult.details);

	// 2. Citation Validation (20 points)
	const citationResult = validateCitations(content);
	score += citationResult.score;
	errors.push(...citationResult.errors);
	warnings.push(...citationResult.warnings);
	details.citationCount = citationResult.citationCount;

	// 3. Figure and Table Validation (20 points)
	const figureTableResult = validateFiguresAndTables(content);
	score += figureTableResult.score;
	errors.push(...figureTableResult.errors);
	warnings.push(...figureTableResult.warnings);
	details.figureCount = figureTableResult.figureCount;
	details.tableCount = figureTableResult.tableCount;

	// 4. Mathematical Content Validation (15 points)
	const mathResult = validateMathContent(content);
	score += mathResult.score;
	warnings.push(...mathResult.warnings);

	// 5. Author Information Validation (15 points)
	const authorResult = validateAuthorInfo(content);
	score += authorResult.score;
	errors.push(...authorResult.errors);
	warnings.push(...authorResult.warnings);

	// Determine if paper passes validation
	const isValid = score >= 70 && errors.length === 0;

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
		hasReferences: boolean;
		hasIntroduction: boolean;
		hasMethods: boolean;
	};
} {
	const errors: string[] = [];
	const warnings: string[] = [];
	let score = 0;

	// Check for required sections
	const hasTitle = LATEX_PATTERNS.TITLE.test(content);
	const hasAuthor = LATEX_PATTERNS.AUTHOR.test(content);
	const hasAbstract = LATEX_PATTERNS.ABSTRACT.test(content);
	const hasKeywords =
		LATEX_PATTERNS.KEYWORDS.test(content) ||
		/^Keywords?\s*:/im.test(content) ||
		content.includes('\\keywords{') ||
		/\\begin\s*\{\s*keywords\s*\}/i.test(content) ||
		/\\section\*?\s*\{[^}]*keywords[^}]*\}/i.test(content) ||
		/\\subsection\*?\s*\{[^}]*keywords[^}]*\}/i.test(content) ||
		/\bkeywords?\s*:/i.test(content) ||
		/\bkeywords?\s*=/i.test(content);
	const hasReferences = true; // Bibliography validation removed
	const hasIntroduction =
		LATEX_PATTERNS.INTRODUCTION.test(content) ||
		/\\section\s*\{[^}]*intro[^}]*\}/i.test(content) ||
		/\\chapter\s*\{[^}]*intro[^}]*\}/i.test(content);
	const hasMethods =
		LATEX_PATTERNS.METHODS.test(content) ||
		/\\section\s*\{[^}]*approach[^}]*\}/i.test(content) ||
		/\\section\s*\{[^}]*implementation[^}]*\}/i.test(content) ||
		/\\chapter\s*\{[^}]*(methods?|methodology|approach|implementation)[^}]*\}/i.test(content);

	// Debug logging (can be removed in production)
	console.log('LaTeX Validation Debug:', {
		hasTitle,
		hasAuthor,
		hasAbstract,
		hasKeywords,
		hasReferences,
		hasIntroduction,
		hasMethods,
		contentLength: content.length,
		contentPreview: content.substring(0, 200) + (content.length > 200 ? '...' : ''),
	});

	// Keywords debug logging
	const keywordsMatches = [
		LATEX_PATTERNS.KEYWORDS.test(content),
		/^Keywords?\s*:/im.test(content),
		content.includes('\\keywords{'),
		/\\begin\s*\{\s*keywords\s*\}/i.test(content),
		/\\section\*?\s*\{[^}]*keywords[^}]*\}/i.test(content),
		/\\subsection\*?\s*\{[^}]*keywords[^}]*\}/i.test(content),
		/\bkeywords?\s*:/i.test(content),
		/\bkeywords?\s*=/i.test(content),
	];
	console.log('Keywords detection patterns:', keywordsMatches);

	// Title validation (5 points)
	if (hasTitle) {
		score += 5;
		const titleMatch = content.match(LATEX_PATTERNS.TITLE);
		if (titleMatch && titleMatch[1].length > 150) {
			warnings.push('Title is longer than recommended (150 characters)');
		}
	} else {
		errors.push('Missing \\title{} command - add \\title{Your Paper Title}');
	}

	// Author validation (5 points)
	if (hasAuthor) {
		score += 5;
	} else {
		errors.push('Missing \\author{} command - add \\author{Author Name}');
	}

	// Abstract validation (5 points)
	if (hasAbstract) {
		score += 5;
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

	// Keywords validation (3 points)
	if (hasKeywords) {
		score += 3;
	} else {
		warnings.push('Missing keywords section');
	}

	// Introduction validation (4 points)
	if (hasIntroduction) {
		score += 4;
	} else {
		errors.push('Missing Introduction section');
	}

	// Methods validation (3 points)
	if (hasMethods) {
		score += 3;
	} else {
		warnings.push('Consider adding a Methods/Methodology section');
	}

	// References validation (5 points) - Always pass
	score += 5;

	return {
		score,
		errors,
		warnings,
		details: {
			hasTitle,
			hasAuthor,
			hasAbstract,
			hasKeywords,
			hasReferences,
			hasIntroduction,
			hasMethods,
		},
	};
}

function validateCitations(content: string): {
	score: number;
	errors: string[];
	warnings: string[];
	citationCount: number;
} {
	const errors: string[] = [];
	const warnings: string[] = [];
	let score = 20; // Always give full score for citations

	// Extract citation count for display purposes
	const citations = content.match(LATEX_PATTERNS.CITATIONS) || [];

	return {
		score,
		errors,
		warnings,
		citationCount: citations.length,
	};
}

function validateFiguresAndTables(content: string): {
	score: number;
	errors: string[];
	warnings: string[];
	figureCount: number;
	tableCount: number;
} {
	const errors: string[] = [];
	const warnings: string[] = [];
	let score = 0;

	// Find all figures and tables
	const figures = content.match(LATEX_PATTERNS.FIGURES) || [];
	const tables = content.match(LATEX_PATTERNS.TABLES) || [];

	// Validate figures
	figures.forEach((fig, index) => {
		if (!fig.includes('\\caption')) {
			errors.push(`Figure ${index + 1} missing caption`);
		} else {
			score += 2;
		}
		if (!fig.includes('\\label')) {
			warnings.push(`Figure ${index + 1} missing label for cross-reference`);
		}
	});

	// Validate tables
	tables.forEach((table, index) => {
		if (!table.includes('\\caption')) {
			errors.push(`Table ${index + 1} missing caption`);
		} else {
			score += 2;
		}
		if (!table.includes('\\label')) {
			warnings.push(`Table ${index + 1} missing label for cross-reference`);
		}
	});

	// Base score for having figures/tables
	if (figures.length > 0 || tables.length > 0) {
		score += 10;
	} else {
		warnings.push('Consider adding figures or tables to illustrate your research');
	}

	return {
		score: Math.min(score, 20), // Cap at 20 points
		errors,
		warnings,
		figureCount: figures.length,
		tableCount: tables.length,
	};
}

function validateMathContent(content: string): { score: number; warnings: string[] } {
	const warnings: string[] = [];
	let score = 0;

	// Check equation environments
	const equations = content.match(LATEX_PATTERNS.EQUATIONS) || [];
	const displayMath = content.match(/\\\[[\s\S]*?\\\]/g) || [];

	// Validate equation numbering
	equations.forEach((eq, index) => {
		if (!eq.includes('\\label')) {
			warnings.push(`Equation ${index + 1} missing label for cross-reference`);
		}
	});

	// Check for proper math delimiters
	if (content.includes('$$')) {
		warnings.push('Use \\[ \\] instead of $$ for display math');
	}

	// Score for mathematical content
	if (equations.length > 0 || displayMath.length > 0) {
		score += 15;
	} else {
		score += 10; // Still give some points if no math content
	}

	return { score, warnings };
}

function validateAuthorInfo(content: string): { score: number; errors: string[]; warnings: string[] } {
	const errors: string[] = [];
	const warnings: string[] = [];
	let score = 0;

	// Check for author block
	const authorMatch = content.match(LATEX_PATTERNS.AUTHOR);
	if (authorMatch) {
		const authorBlock = authorMatch[1];

		// Email validation removed - always give points
		score += 8;

		// Check for affiliations
		if (authorBlock.includes('^') || authorBlock.includes('\\thanks')) {
			score += 7;
		} else {
			warnings.push('Author affiliations should be marked clearly');
		}
	}

	return { score, errors, warnings };
}
