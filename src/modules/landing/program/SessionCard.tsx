'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Session, Speaker } from '@/types/conference-schedule';
import { MapPin, User, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SessionCardProps {
	session: Session;
	roomName?: string;
	onSpeakerClick?: (speaker: Speaker) => void;
	className?: string;
}

const SessionCard: React.FC<SessionCardProps> = ({
	session,
	roomName,
	onSpeakerClick,
	className,
}) => {
	const getTypeColor = (type: Session['type']) => {
		const colors: Record<string, string> = {
			keynote: 'bg-purple-100 text-purple-800 border border-purple-400',
			workshop: 'bg-blue-100 text-blue-800 border border-blue-400',
			panel: 'bg-green-100 text-green-800 border border-green-400',
			session: 'bg-primary/10 text-primary border border-primary/30',
			break: 'bg-gray-100 text-gray-700 border border-gray-400',
			lunch: 'bg-orange-100 text-orange-800 border border-orange-400',
			banquet: 'bg-pink-100 text-pink-800 border border-pink-400',
			ceremony: 'bg-yellow-100 text-yellow-800 border border-yellow-400',
			poster: 'bg-indigo-100 text-indigo-800 border border-indigo-400',
			forum: 'bg-teal-100 text-teal-800 border border-teal-400',
			roundtable: 'bg-cyan-100 text-cyan-800 border border-cyan-400',
			special: 'bg-rose-100 text-rose-800 border border-rose-400',
		};
		return colors[type] || 'bg-gray-100 text-gray-700 border border-gray-400';
	};

	const getCardBorderColor = (type: Session['type']) => {
		const colors: Record<string, string> = {
			keynote: 'border-l-purple-500',
			workshop: 'border-l-blue-500',
			panel: 'border-l-green-500',
			session: 'border-l-primary',
			break: 'border-l-gray-400',
			lunch: 'border-l-orange-500',
			banquet: 'border-l-pink-500',
			ceremony: 'border-l-yellow-500',
			poster: 'border-l-indigo-500',
			forum: 'border-l-teal-500',
			roundtable: 'border-l-cyan-500',
			special: 'border-l-rose-500',
		};
		return colors[type] || 'border-l-gray-500';
	};

	const getCardBackground = (type: Session['type']) => {
		const backgrounds: Record<string, string> = {
			break: 'bg-gray-50',
			lunch: 'bg-orange-50',
			banquet: 'bg-pink-50',
		};
		return backgrounds[type] || 'bg-background';
	};

	return (
		<Card className={cn(
			'transition-all hover:shadow-lg border-l-4',
			getCardBorderColor(session.type),
			getCardBackground(session.type),
			className
		)}>
			<CardContent className="p-3 space-y-2">
				{/* Header Row: Title and Badge */}
				<div className="flex items-start justify-between gap-2">
					<div className="flex-1 min-w-0">
						<h3 className="text-sm font-bold leading-tight break-words">
							{session.title}
						</h3>
						{session.sessionId && (
							<span className="text-xs font-mono text-muted-foreground mt-0.5 inline-block">
								{session.sessionId}
							</span>
						)}
					</div>
					<Badge className={cn('shrink-0 px-1.5 py-0.5 text-xs font-medium', getTypeColor(session.type))}>
						{session.type}
					</Badge>
				</div>

				{/* Room */}
				{roomName && session.room !== 'common' && (
					<div className="flex items-center gap-1.5 px-2 py-1 bg-muted/30 rounded-md w-fit">
						<MapPin className="h-3 w-3 shrink-0 text-primary" />
						<span className="text-xs font-medium text-foreground">{roomName}</span>
					</div>
				)}

				{/* Topic */}
				{session.topic && (
					<p className="text-xs text-muted-foreground leading-snug break-words">
						{session.topic}
					</p>
				)}

				{/* Chair */}
				{session.chair && (
					<div className="flex items-center gap-1.5 text-xs text-muted-foreground">
						<User className="h-3 w-3 shrink-0" />
						<span>Chair: <span className="font-medium text-foreground">{session.chair}</span></span>
					</div>
				)}

				{/* Speakers */}
				{session.speakers && session.speakers.length > 0 && (
					<div className="pt-1.5 border-t border-border space-y-1">
						<div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
							<Users className="h-3 w-3 shrink-0" />
							<span>{session.speakers.length === 1 ? 'Speaker' : 'Speakers'}</span>
						</div>
						<div className="space-y-1">
							{session.speakers.map((speaker, idx) => (
								<div
									key={idx}
									className={cn(
										'text-xs p-1.5 rounded bg-muted/40',
										onSpeakerClick && 'cursor-pointer hover:bg-primary/10 transition-colors'
									)}
									onClick={() => onSpeakerClick?.(speaker)}
								>
									<div className="font-semibold break-words">{speaker.name}</div>
									<div className="text-muted-foreground break-words">{speaker.affiliation}</div>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Description */}
				{session.description && (
					<p className="text-xs text-muted-foreground leading-snug pt-1.5 border-t border-border break-words">
						{session.description}
					</p>
				)}
			</CardContent>
		</Card>
	);
};

export default SessionCard;

