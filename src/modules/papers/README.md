# Paper Validation Module

This module provides functionality for validating research papers against Springer formatting guidelines.

## Features

- **PDF Upload**: Secure file upload with size and type validation
- **Springer Format Validation**: Comprehensive validation against academic formatting standards
- **Real-time Feedback**: Immediate validation results with detailed scoring
- **Error Reporting**: Specific errors and warnings with actionable feedback
- **Progress Tracking**: Visual indicators during validation process

## Validation Criteria

The validation system checks for the following Springer format requirements:

### Required Elements (100 points total)

- **Page Count** (10 points): 4-25 pages
- **Title** (10 points): Present and appropriately sized (≤150 characters)
- **Abstract** (15 points): 100-300 words
- **Keywords** (5 points): Keywords section present
- **Required Sections** (20 points): Introduction, conclusion, references
- **References** (15 points): Properly formatted reference section
- **Figures/Tables** (10 points): Captioned figures and tables
- **Structure** (15 points): Numbered sections and paragraph organization

### Scoring System

- **≥80 points**: Excellent compliance
- **60-79 points**: Good compliance with minor issues
- **<60 points**: Poor compliance requiring significant revision
- **Pass threshold**: 70+ points with no critical errors

## API Endpoints

### POST `/api/v1/papers/validate`

Validates an uploaded PDF paper against Springer format guidelines.

**Request:**

- Method: POST
- Content-Type: multipart/form-data
- Body: File upload with key 'paper'
- Authentication: Required (protected route)

**Response:**

```json
{
	"success": true,
	"validation": {
		"isValid": true,
		"score": 85,
		"errors": [],
		"warnings": ["Minor formatting suggestions..."],
		"details": {
			"pageCount": 12,
			"hasTitle": true,
			"hasAbstract": true,
			"hasKeywords": true,
			"hasReferences": true,
			"fontConsistency": true,
			"lineSpacing": true,
			"margins": true,
			"figuresCaptioned": true,
			"tablesFormatted": false
		}
	},
	"message": "Paper passes Springer format validation"
}
```

## File Structure

```
src/modules/papers/
├── components/
│   ├── PaperValidationPage.tsx    # Main validation interface
│   └── index.ts                   # Component exports
├── types/
│   └── index.ts                   # TypeScript interfaces
└── README.md                      # This documentation
```

## Usage

1. Navigate to `/paper-validation` (requires authentication)
2. Upload a PDF file (max 10MB)
3. Click "Validate Paper" to run the validation
4. Review the detailed results and feedback
5. Address any errors or warnings as needed

## Dependencies

- `pdf-parse`: PDF text extraction
- `pdf-lib`: PDF manipulation and analysis
- `multer`: File upload handling
- `@types/multer`: TypeScript definitions

## Security Features

- Authentication required for access
- File type validation (PDF only)
- File size limits (10MB maximum)
- Secure file upload handling
- Input sanitization and validation
