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
		hasReferences: boolean;
		hasIntroduction: boolean;
		hasMethods: boolean;
		figureCount: number;
		tableCount: number;
		citationCount: number;
		isEasychair: boolean;
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
	maxTitleLength: number;
	minAbstractWords: number;
	maxAbstractWords: number;
}
