'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { ConferenceSchedule } from '@/types/conference-schedule';
import { Search, X } from 'lucide-react';

interface ScheduleFiltersProps {
	schedule: ConferenceSchedule;
	selectedDay: string | null;
	selectedRoom: string | null;
	selectedType: string | null;
	searchQuery: string;
	onDayChange: (day: string | null) => void;
	onRoomChange: (room: string | null) => void;
	onTypeChange: (type: string | null) => void;
	onSearchChange: (query: string) => void;
	onReset: () => void;
}

const ScheduleFilters: React.FC<ScheduleFiltersProps> = ({
	schedule,
	selectedDay,
	selectedRoom,
	selectedType,
	searchQuery,
	onDayChange,
	onRoomChange,
	onTypeChange,
	onSearchChange,
	onReset,
}) => {
	const sessionTypes = [
		'session',
		'keynote',
		'workshop',
		'panel',
		'break',
		'lunch',
		'banquet',
		'ceremony',
		'poster',
		'forum',
		'roundtable',
		'special',
	];

	const hasActiveFilters = selectedDay || selectedRoom || selectedType || searchQuery;

	return (
		<div className="space-y-4">
			<div className="flex flex-col sm:flex-row gap-4">
				{/* Search */}
				<div className="relative flex-1">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Search sessions..."
						value={searchQuery}
						onChange={(e) => onSearchChange(e.target.value)}
						className="pl-9"
					/>
				</div>

				{/* Day Filter */}
				<Select value={selectedDay || 'all'} onValueChange={(v) => onDayChange(v === 'all' ? null : v)}>
					<SelectTrigger className="w-full sm:w-[180px]">
						<SelectValue placeholder="All Days" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Days</SelectItem>
						{schedule.days.map((day) => (
							<SelectItem key={day.date} value={day.date}>
								{day.dayName} ({day.date})
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				{/* Room Filter */}
				<Select
					value={selectedRoom || 'all'}
					onValueChange={(v) => onRoomChange(v === 'all' ? null : v)}
				>
					<SelectTrigger className="w-full sm:w-[180px]">
						<SelectValue placeholder="All Rooms" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Rooms</SelectItem>
						{schedule.rooms.map((room) => (
							<SelectItem key={room.id} value={room.id}>
								{room.name}
							</SelectItem>
						))}
						<SelectItem value="common">Common Areas</SelectItem>
					</SelectContent>
				</Select>

				{/* Type Filter */}
				<Select
					value={selectedType || 'all'}
					onValueChange={(v) => onTypeChange(v === 'all' ? null : v)}
				>
					<SelectTrigger className="w-full sm:w-[180px]">
						<SelectValue placeholder="All Types" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Types</SelectItem>
						{sessionTypes.map((type) => (
							<SelectItem key={type} value={type}>
								{type.charAt(0).toUpperCase() + type.slice(1)}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				{/* Reset Button */}
				{hasActiveFilters && (
					<Button variant="outline" onClick={onReset} className="shrink-0">
						<X className="h-4 w-4" />
						Reset
					</Button>
				)}
			</div>
		</div>
	);
};

export default ScheduleFilters;

