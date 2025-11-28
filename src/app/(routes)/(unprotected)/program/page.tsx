'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProgramNavigationBar from '@/components/ProgramNavigationBar';
import ProgramPage from '@/modules/landing/program/ProgramPage';
import { ConferenceSchedule } from '@/types/conference-schedule';
import mobisecSchedule from '@/data/2025/mobisec-2025.json';
import ebisionSchedule from '@/data/2025/ebision-2025.json';

const conferences = [
	{ id: 'mobisec', name: 'MobiSec 2025' },
	{ id: 'ebision', name: 'EBISION 2025' },
];

const ProgramScheduleContent = () => {
	const searchParams = useSearchParams();
	const conf = searchParams.get('conf')?.toLowerCase() || 'mobisec';

	// Load appropriate schedule data
	const schedule: ConferenceSchedule | null =
		conf === 'mobisec'
			? (mobisecSchedule as ConferenceSchedule)
			: conf === 'ebision'
				? (ebisionSchedule as ConferenceSchedule)
				: null;

	return (
		<div className="min-h-screen bg-background w-full">
			<ProgramNavigationBar conferences={conferences} currentConf={conf} />
			<main className="max-w-7xl mx-auto w-full">
				<ProgramPage schedule={schedule} />
			</main>
		</div>
	);
};

const ProgramSchedulePage = () => {
	return (
		<Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
			<ProgramScheduleContent />
		</Suspense>
	);
};

export default ProgramSchedulePage;

