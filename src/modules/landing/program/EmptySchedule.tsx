'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

interface EmptyScheduleProps {
	conferenceName: string;
}

const EmptySchedule: React.FC<EmptyScheduleProps> = ({ conferenceName }) => {
	return (
		<div className="flex items-center justify-center min-h-[400px] py-12">
			<Card className="max-w-md w-full">
				<CardContent className="flex flex-col items-center justify-center p-12 text-center">
					<Calendar className="h-16 w-16 text-muted-foreground mb-4" />
					<h3 className="text-xl font-semibold mb-2">Schedule Coming Soon</h3>
					<p className="text-muted-foreground">
						The {conferenceName} program schedule will be available here soon. Please check back
						later for updates.
					</p>
				</CardContent>
			</Card>
		</div>
	);
};

export default EmptySchedule;

