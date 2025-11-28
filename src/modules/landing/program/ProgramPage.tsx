'use client';

import React, { useState, useMemo } from 'react';
import { ConferenceSchedule } from '@/types/conference-schedule';
import ScheduleGrid from './ScheduleGrid';
import ScheduleFilters from './ScheduleFilters';
import EmptySchedule from './EmptySchedule';
import SpeakerModal from './SpeakerModal';
import { Speaker } from '@/types/conference-schedule';
import { CalendarDays, MapPin, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProgramPageProps {
	schedule: ConferenceSchedule | null;
}

const ProgramPage: React.FC<ProgramPageProps> = ({ schedule }) => {
	const [selectedDay, setSelectedDay] = useState<string | null>(null);
	const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
	const [selectedType, setSelectedType] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
	const [isSpeakerModalOpen, setIsSpeakerModalOpen] = useState(false);

	const handleSpeakerClick = (speaker: Speaker) => {
		setSelectedSpeaker(speaker);
		setIsSpeakerModalOpen(true);
	};

	const handleResetFilters = () => {
		setSelectedDay(null);
		setSelectedRoom(null);
		setSelectedType(null);
		setSearchQuery('');
	};

	const handleExportTimetable = () => {
		if (!schedule) return;
		
		// Determine which timetable image to download based on conference name
		const isMobisec = schedule.conference.name.toLowerCase().includes('mobisec');
		const imageUrl = isMobisec 
			? '/timetable/mobisec2025_timetable.png'
			: '/timetable/ebision_2025_timetable.png';
		const fileName = isMobisec
			? 'MobiSec_2025_Timetable.png'
			: 'EBISION_2025_Timetable.png';

		// Create a temporary link and trigger download
		const link = document.createElement('a');
		link.href = imageUrl;
		link.download = fileName;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	if (!schedule || schedule.days.length === 0) {
		return (
			<div className="container mx-auto px-4 py-8">
				<EmptySchedule conferenceName={schedule?.conference.name || 'Conference'} />
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-b from-background to-muted/20 w-full">
			<div className="container mx-auto px-4 py-6">
				{/* Header Section */}
				<div className="mb-8">
					<div className="flex items-start justify-between gap-4 mb-4">
						<div className="flex-1">
							<h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
								{schedule.conference.fullName}
							</h1>
							<div className="flex flex-col sm:flex-row gap-3 text-muted-foreground text-sm">
								<div className="flex items-center gap-2">
									<CalendarDays className="h-4 w-4 text-primary" />
									<span className="font-medium">{schedule.conference.dates}</span>
								</div>
								<div className="hidden sm:block text-muted-foreground">•</div>
								<div className="flex items-center gap-2">
									<MapPin className="h-4 w-4 text-primary" />
									<span className="font-medium">{schedule.conference.location}</span>
								</div>
							</div>
							<p className="text-xs text-muted-foreground mt-2">
								📍 Venue: {schedule.conference.venue}
							</p>
						</div>
						<Button
							onClick={handleExportTimetable}
							variant="outline"
							size="sm"
							className="shrink-0 gap-2"
						>
							<Download className="h-4 w-4" />
							Export Timetable
						</Button>
					</div>
				</div>

				{/* Filters */}
				<div className="mb-6 w-full">
					<ScheduleFilters
						schedule={schedule}
						selectedDay={selectedDay}
						selectedRoom={selectedRoom}
						selectedType={selectedType}
						searchQuery={searchQuery}
						onDayChange={setSelectedDay}
						onRoomChange={setSelectedRoom}
						onTypeChange={setSelectedType}
						onSearchChange={setSearchQuery}
						onReset={handleResetFilters}
					/>
				</div>

				{/* Schedule Grid */}
				<div className="w-full">
					<ScheduleGrid
						schedule={schedule}
						selectedDay={selectedDay}
						selectedRoom={selectedRoom}
						selectedType={selectedType}
						searchQuery={searchQuery}
						onSpeakerClick={handleSpeakerClick}
					/>
				</div>

				{/* Speaker Modal */}
				<SpeakerModal
					speaker={selectedSpeaker}
					open={isSpeakerModalOpen}
					onOpenChange={setIsSpeakerModalOpen}
				/>
			</div>
		</div>
	);
};

export default ProgramPage;

