import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
	title: 'Proceedings | MobiSec',
	description: 'MobiSec 2024 Conference Proceedings',
};

export default async function ProceedingsPage() {
	// Check for proceedings session cookie
	const cookieStore = await cookies();
	const proceedingsSession = cookieStore.get('proceedings-session');

	// If no valid session, redirect to login
	if (!proceedingsSession || proceedingsSession.value !== 'authenticated') {
		redirect('/proceedings/login');
	}

	return (
		<div className='min-h-[calc(100vh-132px)] flex items-center justify-center bg-white px-4'>
			<div className='w-full max-w-4xl text-center space-y-8'>
				<div className='space-y-4'>
					<h1 className='text-4xl font-bold text-gray-900'>
						MobiSec 2024 Conference Proceedings
					</h1>
					<p className='text-lg text-gray-600'>
						Access the official proceedings of the 8th International Conference on Mobile Internet Security
					</p>
				</div>

				<div className='bg-gray-50 p-8 rounded-lg border'>
					<h2 className='text-2xl font-semibold text-gray-800 mb-4'>
						Conference Details
					</h2>
					<p className='text-gray-700 mb-6'>
						Mobile Internet Security - The 8th International Conference, MobiSec 2024, Sapporo, Japan, December 17–19, 2024, Revised Selected Papers
					</p>

					<a
						href='https://link.springer.com/book/10.1007/978-981-95-0172-4'
						target='_blank'
						rel='noopener noreferrer'
						className='inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200'
					>
						View Proceedings on Springer
						<svg
							className='ml-2 w-5 h-5'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
							/>
						</svg>
					</a>
				</div>

				<div className='text-sm text-gray-500'>
					<p>© 2024 MobiSec Conference. All rights reserved.</p>
				</div>
			</div>
		</div>
	);
}
