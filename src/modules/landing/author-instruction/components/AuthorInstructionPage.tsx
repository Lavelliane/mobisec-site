import { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import callForPapersData from '@/data/call-for-papers.json';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
	title: 'Author Instructions | MobiSec',
	description: 'Author instructions for MobiSec',
};

const AuthorInstructionPage = () => {
	return (
		<div className='container mx-auto py-8 sm:py-12 px-4'>
			<div className='max-w-5xl mx-auto'>
				<div className='flex flex-col items-center justify-center mb-8 sm:mb-12'>
					<h1 className='text-3xl sm:text-4xl font-bold text-foreground text-center mb-4'>Author Instructions</h1>
					<p className='text-base sm:text-lg text-muted-foreground text-center max-w-3xl px-4 sm:px-0'>
						Guidelines for submitting papers and posters to MobiSec 2025
					</p>
				</div>

				<div className='space-y-6 sm:space-y-8'>
					{/* General Requirements */}
					<div className='bg-white border border-border rounded-lg p-4 sm:p-6'>
						<h2 className='text-xl sm:text-2xl font-semibold text-foreground mb-4'>General Requirements</h2>
						<div className='prose max-w-none'>
							<p className='text-sm sm:text-base text-foreground leading-relaxed'>
								All papers must be original and not simultaneously submitted to another journal or conference. The
								contributions to MobiSec 2025 must be submitted to the conference submission system:{' '}
								<a
									href='https://easychair.org/conferences?conf=mobisec2025'
									className='text-primary hover:text-primary/80 underline'
									target='_blank'
									rel='noopener noreferrer'>
									https://easychair.org/conferences?conf=mobisec2025
								</a>
							</p>
						</div>
					</div>

					{/* Regular Papers */}
					<div className='bg-white border border-border rounded-lg p-4 sm:p-6'>
						<h2 className='text-xl sm:text-2xl font-semibold text-foreground mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0'>
							<span className='bg-primary text-primary-foreground px-3 py-1 rounded-md text-base sm:text-lg mr-0 sm:mr-3'>
								1
							</span>
							<span>Regular Paper</span>
						</h2>

						<div className='prose max-w-none'>
							<p className='text-sm sm:text-base text-foreground leading-relaxed mb-4 sm:mb-6'>
								Authors are invited to submit original papers: they must not substantially duplicate work that any of
								the authors have published elsewhere or have submitted in parallel to any other conferences that have
								proceedings. An accepted paper must be registered before the registration deadline and presented at the
								conference. Failure to register before the deadline will result in automatic withdrawal of the paper
								from the conference proceedings and the program.
							</p>

							<ul className='space-y-3 text-foreground text-sm sm:text-base mb-4'>
								<li className='flex items-start gap-3'>
									<span className='text-foreground font-medium'>-</span>
									<span>The submission file is in PDF or PS file format produced via</span>
								</li>
								<li className='ml-6'>
									· the Easychair Latex Class file (US letter size)
									<br />
									<a
										href='https://easychair.org/publications/easychair.zip'
										className='text-primary hover:text-primary/80 underline ml-4 break-all text-xs sm:text-sm'>
										[Available at https://easychair.org/publications/easychair.zip]
									</a>
								</li>
								<li className='ml-6'>
									· the Easychair Microsoft Word file
									<br />
									<a
										href='https://easychair.org/publications/easychair.docx'
										className='text-primary hover:text-primary/80 underline ml-4 break-all text-xs sm:text-sm'>
										[Available at https://easychair.org/publications/easychair.docx]
									</a>
								</li>
								<li className='flex items-start gap-3'>
									<span className='text-foreground font-medium'>-</span>
									<span>Each paper should be at least 5 pages long based on the Easychair style.</span>
								</li>
								<li className='flex items-start gap-3'>
									<span className='text-foreground font-medium'>-</span>
									<span>
										Submission of a paper implies that should the paper be accepted, at least one of the authors will
										register and present the paper at the conference.
									</span>
								</li>
							</ul>
							<p className='text-sm sm:text-base text-foreground leading-relaxed mb-4'>
								<strong>
									During submission, authors need to select &quot;MobiSec 2025 - Main Track&quot; for their paper.
								</strong>
							</p>
						</div>
					</div>

					{/* Poster Papers */}
					<div className='bg-white border border-border rounded-lg p-4 sm:p-6'>
						<h2 className='text-xl sm:text-2xl font-semibold text-foreground mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0'>
							<span className='bg-primary text-primary-foreground px-3 py-1 rounded-md text-base sm:text-lg mr-0 sm:mr-3'>
								2
							</span>
							<span>Poster Paper</span>
						</h2>

						<div className='prose max-w-none'>
							<p className='text-sm sm:text-base text-foreground leading-relaxed mb-4'>
								The submission should be a single PDF document consisting of (i) the poster abstract and (ii) the poster
								draft.
							</p>

							<p className='text-sm sm:text-base text-foreground leading-relaxed mb-4'>
								<strong>Poster abstract:</strong> Poster abstract should provide sufficient details about your research
								showing that you have adequate information to fill a poster.
							</p>

							<p className='text-sm sm:text-base text-foreground leading-relaxed mb-4'>
								<strong>Poster abstract should meet the following requirements:</strong>
							</p>

							<ul className='space-y-2 text-foreground text-sm sm:text-base mb-6'>
								<li className='flex items-start gap-3'>
									<span className='text-foreground font-medium'>-</span>
									<span>No more than 2-pages, including references and figures</span>
								</li>
								<li className='flex items-start gap-3'>
									<span className='text-foreground font-medium'>-</span>
									<span>Submission should not be anonymized</span>
								</li>
								<li className='flex items-start gap-3'>
									<span className='text-foreground font-medium'>-</span>
									<span>
										The submission file is in PDF or PS file format produced via the Easychair Latex Class file (US
										letter size) like Regular Paper.
									</span>
								</li>
							</ul>

							<p className='text-sm sm:text-base text-foreground leading-relaxed mb-4'>
								<strong>Poster draft:</strong> All submission must also include draft of the poster to receive feedback
								from the committee before the conference. Poster size should be 32x40 inches but can be scaled down to
								&quot;letter&quot; paper size.
							</p>

							<p className='text-sm sm:text-base text-foreground leading-relaxed mb-4'>
								The accepted posters will not be formally published, and their copyright will be owned by their authors.
								Therefore, authors can present or publish any content of their poster in other conference or journal.
								Moreover, we will welcome the latest research outcomes, which were introduced at other venue.
							</p>

							<p className='text-sm sm:text-base text-foreground leading-relaxed'>
								<strong>During submission, please select &quot;MobiSec 2025 - Poster Track&quot;</strong>
							</p>
						</div>
					</div>

					{/* Quick Reference */}
					<div className='bg-white border border-border rounded-lg p-4 sm:p-6'>
						<h2 className='text-lg sm:text-xl font-semibold text-foreground mb-4'>Quick Reference</h2>
						<div className='flex flex-col sm:grid sm:grid-cols-2 gap-4 sm:gap-6'>
							<div>
								<h3 className='font-medium text-foreground mb-2 text-sm sm:text-base'>Regular Papers</h3>
								<ul className='text-xs sm:text-sm text-muted-foreground space-y-1'>
									<li>• Minimum 5 pages (Easychair style)</li>
									<li>• PDF/PS format</li>
									<li>• Select &quot;Main Track&quot; during submission</li>
									<li>• Must be original work</li>
								</ul>
							</div>
							<div>
								<h3 className='font-medium text-foreground mb-2 text-sm sm:text-base'>Poster Papers</h3>
								<ul className='text-xs sm:text-sm text-muted-foreground space-y-1'>
									<li>• Abstract: max 2 pages</li>
									<li>• Include poster draft (32&times;40 inches)</li>
									<li>• Select &quot;Poster Track&quot; during submission</li>
									<li>• Not anonymized</li>
								</ul>
							</div>
						</div>
					</div>

					{/* Topics */}
					<div className='bg-white border border-border rounded-lg p-4 sm:p-6'>
						<h2 className='text-xl sm:text-2xl font-semibold text-foreground mb-4'>TOPICS (not limited to)</h2>
						<ul className='space-y-2 text-sm sm:text-base text-foreground'>
							{callForPapersData.topics.map((topic, index) => (
								<li
									key={index}
									className='flex items-start gap-2'>
									<span className='text-foreground'>-</span>
									<span className='leading-relaxed'>{topic}</span>
								</li>
							))}
						</ul>
					</div>

					{/* Call to Action Section */}
					<div className='bg-primary p-8'>
						<div className='text-center flex flex-col gap-6'>
							<h2 className='text-2xl text-white font-bold'>{callForPapersData.callToAction.title}</h2>
							<p className='text-muted max-w-2xl mx-auto'>{callForPapersData.callToAction.description}</p>
							<div className='flex flex-col sm:flex-row gap-4 justify-center'>
								<Button
									asChild
									variant='secondary'>
									<Link
										href='https://easychair.org/conferences?conf=mobisec2025'
										target='_blank'
										rel='noopener noreferrer'>
										Submit Your Paper
									</Link>
								</Button>
							</div>
						</div>
					</div>

					{/* Contact Information */}
					<div className='bg-accent rounded-lg p-6 text-center'>
						<p className='text-foreground'>
							{callForPapersData.contact.message}{' '}
							<Link
								href={`mailto:${callForPapersData.contact.email}`}
								className='text-primary hover:text-primary/80 font-medium underline'>
								{callForPapersData.contact.email}
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthorInstructionPage;
