'use client';

import React, { useMemo } from 'react';
import { ConferenceSchedule, ConferenceDay, TimeSlot, Session } from '@/types/conference-schedule';
import SessionCard from './SessionCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScheduleGridProps {
	schedule: ConferenceSchedule;
	selectedDay: string | null;
	selectedRoom: string | null;
	selectedType: string | null;
	searchQuery: string;
	onSpeakerClick?: (speaker: any) => void;
}

const ScheduleGrid: React.FC<ScheduleGridProps> = ({
	schedule,
	selectedDay,
	selectedRoom,
	selectedType,
	searchQuery,
	onSpeakerClick,
}) => {
	// Filter days
	const filteredDays = useMemo(() => {
		if (!selectedDay) return schedule.days;
		return schedule.days.filter((day) => day.date === selectedDay);
	}, [schedule.days, selectedDay]);

	// Filter sessions within a time slot
	const filterSessions = (sessions: Session[]): Session[] => {
		return sessions.filter((session) => {
			// Room filter
			if (selectedRoom) {
				if (selectedRoom === 'common' && session.room !== 'common') return false;
				if (selectedRoom !== 'common' && session.room !== selectedRoom) return false;
			}

			// Type filter
			if (selectedType && session.type !== selectedType) return false;

			// Search filter
			if (searchQuery) {
				const query = searchQuery.toLowerCase();
				const matchesTitle = session.title.toLowerCase().includes(query);
				const matchesTopic = session.topic?.toLowerCase().includes(query);
				const matchesSpeakers = session.speakers?.some(
					(s) =>
						s.name.toLowerCase().includes(query) ||
						s.affiliation.toLowerCase().includes(query)
				);
				if (!matchesTitle && !matchesTopic && !matchesSpeakers) return false;
			}

			return true;
		});
	};

	const getRoomName = (roomId: string): string => {
		if (roomId === 'common') return 'Common Area';
		const room = schedule.rooms.find((r) => r.id === roomId);
		return room?.name || roomId;
	};

	const formatTabDate = (dateString: string, dayName: string) => {
		const date = new Date(dateString);
		const month = date.toLocaleDateString('en-US', { month: 'short' });
		const day = date.getDate();
		return (
			<div className="flex flex-col items-center gap-1">
				<span className="text-xs font-normal opacity-90">{month} {day}</span>
				<span className="text-sm font-semibold">{dayName}</span>
			</div>
		);
	};

	const renderTimeSlot = (slot: TimeSlot, dayIndex: number) => {
		const filteredSessions = filterSessions(slot.sessions);
		if (filteredSessions.length === 0) return null;

		// Check if this is a common area session (spans all rooms)
		const isCommonSession = filteredSessions.length === 1 && filteredSessions[0].room === 'common';

		return (
			<div key={`${slot.startTime}-${slot.endTime}`} className="mb-6">
				<div className="flex items-center gap-2 mb-4">
					<Clock className="h-4 w-4 text-primary" />
					<span className="text-base font-bold text-foreground">
						{slot.startTime} - {slot.endTime}
					</span>
					<span className="text-sm text-muted-foreground">
						({slot.duration})
					</span>
				</div>
				<div className={cn(
					"grid gap-4",
					isCommonSession ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
				)}>
					{filteredSessions.map((session, idx) => (
						<SessionCard
							key={`${session.room}-${session.title}-${idx}`}
							session={session}
							roomName={getRoomName(session.room)}
							onSpeakerClick={onSpeakerClick}
							className={isCommonSession ? "w-full" : ""}
						/>
					))}
				</div>
			</div>
		);
	};

	const renderDay = (day: ConferenceDay) => {
		const hasSessions = day.slots.some((slot) => filterSessions(slot.sessions).length > 0);
		if (!hasSessions) return null;

		return (
			<TabsContent key={day.date} value={day.date} className="mt-6">
				<div className="mb-6 p-4 bg-primary/5 rounded-lg border border-border">
					<div className="flex items-center gap-2">
						<Calendar className="h-5 w-5 text-primary" />
						<div>
							<h2 className="text-xl font-bold text-foreground">
								{day.dayName}
							</h2>
							<p className="text-sm text-muted-foreground">
								{new Date(day.date).toLocaleDateString('en-US', {
									weekday: 'long',
									month: 'long',
									day: 'numeric',
									year: 'numeric',
								})}
							</p>
						</div>
					</div>
				</div>
				<div className="space-y-6">
					{day.slots.map((slot) => renderTimeSlot(slot, schedule.days.indexOf(day)))}
				</div>
			</TabsContent>
		);
	};

	if (filteredDays.length === 0) {
		return (
			<div className="text-center py-12">
				<p className="text-muted-foreground">No sessions found matching your filters.</p>
			</div>
		);
	}

	// If only one day is selected, show it directly without tabs
	if (filteredDays.length === 1) {
		const day = filteredDays[0];
		return (
			<div>
				<div className="mb-6 p-4 bg-primary/5 rounded-lg border border-border">
					<div className="flex items-center gap-2">
						<Calendar className="h-5 w-5 text-primary" />
						<div>
							<h2 className="text-xl font-bold text-foreground">
								{day.dayName}
							</h2>
							<p className="text-sm text-muted-foreground">
								{new Date(day.date).toLocaleDateString('en-US', {
									weekday: 'long',
									month: 'long',
									day: 'numeric',
									year: 'numeric',
								})}
							</p>
						</div>
					</div>
				</div>
				<div className="space-y-6">
					{day.slots.map((slot) => renderTimeSlot(slot, 0))}
				</div>
			</div>
		);
	}

	// Multiple days - show tabs
	return (
		<Tabs defaultValue={filteredDays[0]?.date} className="w-full">
			<TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-6 h-auto p-1">
				{filteredDays.map((day) => (
					<TabsTrigger 
						key={day.date} 
						value={day.date}
						className="py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
					>
						{formatTabDate(day.date, day.dayName)}
					</TabsTrigger>
				))}
			</TabsList>
			{filteredDays.map((day) => renderDay(day))}
		</Tabs>
	);
};

export default ScheduleGrid;

