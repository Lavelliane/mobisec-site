/**
 * Type definitions for conference schedule data structure
 * Reusable for both MobiSec and EBISION conferences
 */

export interface Speaker {
	name: string;
	affiliation: string;
	role: 'keynote' | 'presenter' | 'chair';
	bio?: string;
	photo?: string;
}

export interface Room {
	id: string;
	name: string;
}

export interface Session {
	room: string;
	type: 'session' | 'keynote' | 'workshop' | 'panel' | 'break' | 'lunch' | 'poster' | 'banquet' | 'ceremony' | 'forum' | 'roundtable' | 'special';
	sessionId?: string;
	title: string;
	topic?: string;
	chair?: string | null;
	speakers?: Speaker[];
	description?: string;
}

export interface TimeSlot {
	startTime: string;
	endTime: string;
	duration: string;
	sessions: Session[];
}

export interface ConferenceDay {
	date: string;
	dayName: string;
	slots: TimeSlot[];
}

export interface ConferenceInfo {
	name: string;
	fullName: string;
	dates: string;
	location: string;
	venue: string;
}

export interface ConferenceSchedule {
	conference: ConferenceInfo;
	rooms: Room[];
	days: ConferenceDay[];
}

