'use client';

import PaperValidationComponent from './PaperValidation';
import Footer from '@/components/Footer';

export default function PaperValidationPage() {
	return (
		<div className='container mx-auto px-4 py-8 max-w-6xl'>
			<div className='mb-8'>
				<h1 className='text-3xl font-bold text-gray-900 mb-2'>EasyChair LaTeX Paper Validation</h1>
				<p className='text-gray-600'>
					Upload your LaTeX paper to validate it against EasyChair format requirements. This tool checks for required
					elements, proper structure, and formatting guidelines for EasyChair conference submissions.
				</p>
			</div>

			<PaperValidationComponent showGuidelines={true} />

			<Footer />
		</div>
	);
}
