export interface EmailRecipient {
	id: number;
	name: string;
	email: string;
	nationality: string;
	role: 'Author' | 'Student' | 'Reviewer';
	receiveEmails: boolean;
}

export interface EmailScheduleData {
	templateType: 'custom' | 'newsletter';
	subject: string;
	body: string;
	sendOption: 'now' | 'schedule';
	scheduledDate?: Date;
	scheduledTime?: string;
	recipients: number[];
	totalRecipients: number;
	recipientEmails: string[];
}

export interface ScheduledEmail {
	id: string;
	subject: string;
	body: string;
	recipientEmails: string[];
	scheduledFor: Date;
	status: 'pending' | 'sent' | 'failed';
	createdAt: Date;
}
