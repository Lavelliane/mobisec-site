import { Metadata } from 'next';
import PaperValidationPage from '@/modules/papers/components/PaperValidationPage';

export const metadata: Metadata = {
	title: 'Paper Validation - MobiSec',
	description: 'Validate your research paper against Springer formatting guidelines',
};

export default function PaperValidation() {
	return <PaperValidationPage />;
}
