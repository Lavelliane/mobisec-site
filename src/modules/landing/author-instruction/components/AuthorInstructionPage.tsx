import { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FileText } from 'lucide-react';

export const metadata: Metadata = {
	title: 'Author Instructions | MobiSec',
	description: 'Author instructions for MobiSec',
};

const AuthorInstructionPage = () => {
	return (
		<div className='container mx-auto py-12 px-4'>
			<div className='max-w-5xl mx-auto'>
				<div className='flex flex-col items-center justify-center mb-12'>
					<h1 className='text-4xl font-bold text-foreground text-center mb-4'>Author Instructions</h1>
					<p className='text-lg text-muted-foreground text-center max-w-3xl'>
						Guidelines for submitting papers and posters to MobiSec 2025
					</p>
				</div>

				<div className='space-y-8'>
					{/* General Requirements */}
					<div className='bg-white border border-border rounded-lg p-6'>
						<h2 className='text-2xl font-semibold text-foreground mb-4'>General Requirements</h2>
						<div className='prose max-w-none'>
							<p className='text-foreground leading-relaxed'>
								All papers must be original and not simultaneously submitted to another journal or conference. The
								contributions to MobiSec 2025 must be submitted to the conference submission system:{' '}
								<strong>TBD</strong>
							</p>
						</div>
					</div>

					{/* Regular Papers */}
					<div className='bg-white border border-border rounded-lg p-6'>
						<h2 className='text-2xl font-semibold text-foreground mb-4'>
							<span className='bg-primary text-primary-foreground px-3 py-1 rounded-md text-lg mr-3'>1</span>
							Regular Paper
						</h2>

						<div className='prose max-w-none'>
							<p className='text-foreground leading-relaxed mb-6'>
								Authors are invited to submit original papers: they must not substantially duplicate work that any of
								the authors have published elsewhere or have submitted in parallel to any other conferences that have
								proceedings. An accepted paper must be registered before the registration deadline and presented at the
								symposium. Failure to register before the deadline will result in automatic withdrawal of the paper from
								the conference proceedings and the program.
							</p>

							<h3 className='text-xl font-medium text-foreground mb-4'>Submission Requirements</h3>

							<div className='bg-accent rounded-lg p-4 mb-4'>
								<h4 className='font-medium text-foreground mb-3'>File Format:</h4>
								<ul className='space-y-2 text-foreground'>
									<li>• PDF or PS file format produced via:</li>
									<li className='ml-4'>
										◦ <strong>Easychair Latex Class file</strong> (US letter size) -
										<a
											href='https://easychair.org/publications/easychair.zip'
											className='text-primary hover:text-primary/80 underline ml-1'>
											Available here
										</a>
									</li>
									<li className='ml-4'>
										◦ <strong>Easychair Microsoft Word file</strong> -
										<a
											href='https://easychair.org/publications/easychair.docx'
											className='text-primary hover:text-primary/80 underline ml-1'>
											Available here
										</a>
									</li>
								</ul>
							</div>

							<div className='space-y-3 text-foreground'>
								<div className='flex items-start'>
									<span className='bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5'>
										✓
									</span>
									<span>
										Each paper should be <strong>at least 5 pages long</strong> based on the Easychair style.
									</span>
								</div>
								<div className='flex items-start'>
									<span className='bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5'>
										✓
									</span>
									<span>
										Submission of a paper implies that should the paper be accepted, at least one of the authors will
										register and present the paper at the conference.
									</span>
								</div>
								<div className='flex items-start'>
									<span className='bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5'>
										✓
									</span>
									<span>
										During submission, authors need to select <strong>&quot;MobiSec 2025 - Main Track&quot;</strong> for
										their paper.
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Poster Papers */}
					<div className='bg-white border border-border rounded-lg p-6'>
						<h2 className='text-2xl font-semibold text-foreground mb-4'>
							<span className='bg-primary text-primary-foreground px-3 py-1 rounded-md text-lg mr-3'>2</span>
							Poster Paper
						</h2>

						<div className='prose max-w-none'>
							<p className='text-foreground leading-relaxed mb-6'>
								The submission should be a single PDF document consisting of (i) the poster abstract and (ii) the poster
								draft.
							</p>

							<div className='grid md:grid-cols-2 gap-6 mb-6'>
								{/* Poster Abstract */}
								<div className='bg-accent rounded-lg p-5'>
									<h3 className='text-lg font-medium text-foreground mb-3 flex items-center'>
										<span className='bg-accent text-accent-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-2'>
											A
										</span>
										Poster Abstract
									</h3>
									<p className='text-foreground mb-4'>
										Poster abstract should provide sufficient details about your research showing that you have adequate
										information to fill a poster.
									</p>

									<h4 className='font-medium text-foreground mb-2'>Requirements:</h4>
									<ul className='space-y-2 text-foreground'>
										<li>
											• <strong>No more than 2 pages</strong>, including references and figures
										</li>
										<li>
											• Submission should <strong>not be anonymized</strong>
										</li>
										<li>• PDF or PS format using Easychair style (same as Regular Paper)</li>
									</ul>
								</div>

								{/* Poster Draft */}
								<div className='bg-accent rounded-lg p-5'>
									<h3 className='text-lg font-medium text-foreground mb-3 flex items-center'>
										<span className='bg-accent text-accent-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-2'>
											B
										</span>
										Poster Draft
									</h3>
									<p className='text-foreground mb-4'>
										All submissions must also include draft of the poster to receive feedback from the committee before
										the symposium.
									</p>

									<h4 className='font-medium text-foreground mb-2'>Specifications:</h4>
									<ul className='space-y-2 text-foreground'>
										<li>
											• Poster size should be <strong>32&times;40 inches</strong>
										</li>
										<li>• Can be scaled down to &quot;letter&quot; paper size for submission</li>
									</ul>
								</div>
							</div>

							<Alert
								variant='warning'
								className='mb-4'>
								<FileText className='h-4 w-4' />
								<AlertTitle>Important Note</AlertTitle>
								<AlertDescription>
									The accepted posters will <strong>not be formally published</strong>, and their copyright will be
									owned by their authors. Therefore, authors can present or publish any content of their poster in other
									conferences or journals. Moreover, we welcome the latest research outcomes, which were introduced at
									other venues.
								</AlertDescription>
							</Alert>

							<div className='flex items-start'>
								<span className='bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5'>
									✓
								</span>
								<span className='text-foreground'>
									During submission, please select <strong>&quot;MobiSec 2025 - Poster Track&quot;</strong>
								</span>
							</div>
						</div>
					</div>

					{/* Quick Reference */}
					<div className='bg-white border border-border rounded-lg p-6'>
						<h2 className='text-xl font-semibold text-foreground mb-4'>Quick Reference</h2>
						<div className='grid md:grid-cols-2 gap-6'>
							<div>
								<h3 className='font-medium text-foreground mb-2'>Regular Papers</h3>
								<ul className='text-sm text-muted-foreground space-y-1'>
									<li>• Minimum 5 pages (Easychair style)</li>
									<li>• PDF/PS format</li>
									<li>• Select &quot;Main Track&quot; during submission</li>
									<li>• Must be original work</li>
								</ul>
							</div>
							<div>
								<h3 className='font-medium text-foreground mb-2'>Poster Papers</h3>
								<ul className='text-sm text-muted-foreground space-y-1'>
									<li>• Abstract: max 2 pages</li>
									<li>• Include poster draft (32&times;40 inches)</li>
									<li>• Select &quot;Poster Track&quot; during submission</li>
									<li>• Not anonymized</li>
								</ul>
							</div>
						</div>
					</div>

					{/* Registration Call-to-Action */}
					<div className='bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-8 text-center'>
						<h2 className='text-2xl font-semibold text-foreground mb-4'>Ready to Submit?</h2>
						<p className='text-muted-foreground mb-6 max-w-2xl mx-auto'>
							Register for MobiSec 2025 to submit your paper and be part of the premier mobile security symposium.
						</p>
						<Link
							href='/registration'
							className='inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors duration-200'>
							Register Now
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthorInstructionPage;
