'use client';

import { Button } from '@/components/ui/button';
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import { FileText } from 'lucide-react';

interface GuidelinesDrawerProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

export default function GuidelinesDrawer({ isOpen, onOpenChange }: GuidelinesDrawerProps) {
	return (
		<Drawer
			open={isOpen}
			onOpenChange={onOpenChange}>
			<DrawerTrigger asChild>
				<Button
					variant='outline'
					size='sm'>
					<FileText className='h-4 w-4 mr-2' />
					View Guidelines
				</Button>
			</DrawerTrigger>
			<DrawerContent className='max-w-6xl mx-auto rounded-t-4xl'>
				<DrawerHeader>
					<DrawerTitle>EasyChair LaTeX Validation Guidelines</DrawerTitle>
					<DrawerDescription>
						Complete guide for formatting your LaTeX paper according to EasyChair requirements.
					</DrawerDescription>
				</DrawerHeader>
				<div className='px-8 pb-8 space-y-6 max-h-[60vh] overflow-y-auto'>
					<div>
						<h3 className='font-semibold text-secondary mb-2'>📁 File Upload Options</h3>
						<ul className='text-sm text-secondary/60 space-y-1'>
							<li>
								• <strong>.tex files:</strong> Single LaTeX document
							</li>
							<li>
								• <strong>.zip files:</strong> LaTeX project with multiple files (main.tex, chapters, etc.)
							</li>
						</ul>
					</div>

					<div>
						<h3 className='font-semibold text-destructive mb-2'>⚠️ Required Elements (1 Point Each)</h3>
						<p className='text-sm text-destructive mb-3'>
							These elements are mandatory for EasyChair submissions. Each element is worth 1 point (12 total points: 6
							document structure + 3 author info + 3 EasyChair format).
						</p>
						<ul className='text-sm text-secondary/60 space-y-2'>
							<li className='flex items-start gap-2'>
								<span className='text-destructive font-bold'>•</span>
								<span>
									<strong>\\documentclass{'{easychair}'}</strong> - Document class
								</span>
							</li>
							<li className='flex items-start gap-2'>
								<span className='text-destructive font-bold'>•</span>
								<span>
									<strong>\\title{}</strong> - Paper title
								</span>
							</li>
							<li className='flex items-start gap-2'>
								<span className='text-destructive font-bold'>•</span>
								<span>
									<strong>\\author{}</strong> - Author information with \\inst{} commands
								</span>
							</li>
							<li className='flex items-start gap-2'>
								<span className='text-destructive font-bold'>•</span>
								<span>
									<strong>\\inst{}</strong> - Author institution links
								</span>
							</li>
							<li className='flex items-start gap-2'>
								<span className='text-destructive font-bold'>•</span>
								<span>
									<strong>\\institute{}</strong> - Author affiliations
								</span>
							</li>
							<li className='flex items-start gap-2'>
								<span className='text-destructive font-bold'>•</span>
								<span>
									<strong>\\email{}</strong> - Author email addresses
								</span>
							</li>
							<li className='flex items-start gap-2'>
								<span className='text-destructive font-bold'>•</span>
								<span>
									<strong>\\authorrunning{}</strong> - Short author names
								</span>
							</li>
							<li className='flex items-start gap-2'>
								<span className='text-destructive font-bold'>•</span>
								<span>
									<strong>\\titlerunning{}</strong> - Short title
								</span>
							</li>
							<li className='flex items-start gap-2'>
								<span className='text-destructive font-bold'>•</span>
								<span>
									<strong>
										\\begin{'{abstract}'}...\\end{'{abstract}'}
									</strong>{' '}
									- Abstract section
								</span>
							</li>
							<li className='flex items-start gap-2'>
								<span className='text-destructive font-bold'>•</span>
								<span>
									<strong>\\keywords{}</strong> - Keywords section
								</span>
							</li>
							<li className='flex items-start gap-2'>
								<span className='text-destructive font-bold'>•</span>
								<span>
									<strong>\\section{'{Introduction}'}</strong> - Introduction section
								</span>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='font-semibold text-destructive mb-2'>📝 Conditional Requirements</h3>
						<ul className='text-sm text-secondary/60 space-y-2'>
							<li className='flex items-start gap-2'>
								<span className='text-destructive font-bold'>•</span>
								<span>
									<strong>\\footnote{}</strong> - Conference proceedings footnote (required only for final submission)
								</span>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='font-semibold text-destructive mb-2'>🚫 Prohibited Elements</h3>
						<ul className='text-sm text-secondary/60 space-y-2'>
							<li className='flex items-start gap-2'>
								<span className='text-destructive font-bold'>•</span>
								<span>
									<strong>\\thanks{}</strong> - Use \\section{'{Acknowledgements}'} instead
								</span>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='font-semibold text-destructive mb-2'>📋 Document Structure Best Practices</h3>
						<ul className='text-sm text-secondary/60 space-y-1'>
							<li>
								• Use proper section headers with <strong>\\section{'{}'}</strong>
							</li>
							<li>
								• Add figures with{' '}
								<strong>
									\\begin{'{figure}'}...\\end{'{figure}'}
								</strong>
							</li>
							<li>
								• Add tables with{' '}
								<strong>
									\\begin{'{table}'}...\\end{'{table}'}
								</strong>
							</li>
							<li>
								• Use <strong>\\cite{'{}'}</strong> for citations
							</li>
							<li>• Add captions for all figures and tables</li>
							<li>• Use labels for cross-referencing</li>
							<li>• Write clear, descriptive section titles</li>
						</ul>
					</div>

					<div className='p-4 bg-warning/5 border border-warning rounded-lg'>
						<p className='text-sm text-destructive'>
							<strong>💡 Tip:</strong> Click &quot;Show Details&quot; on any validation error to see sample LaTeX code
							and copy it directly to your document.
						</p>
					</div>

					<div className='p-4 bg-warning/5 border border-warning rounded-lg'>
						<p className='text-sm text-warning'>
							<strong>⚠️ Important:</strong> This validation tool analyzes LaTeX source code structure and formatting.
							It does not validate content quality or research methodology. Always review your paper content separately
							before submission.
						</p>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
