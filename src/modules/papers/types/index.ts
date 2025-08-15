export interface ValidationResult {
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

export interface ValidationResponse {
	success: boolean;
	validation?: ValidationResult;
	message: string;
}

export interface SpringerCriteria {
	minPages: number;
	maxPages: number;
	requiredSections: string[];
	recommendedSections: string[];
	minAbstractWords: number;
	maxAbstractWords: number;
}
