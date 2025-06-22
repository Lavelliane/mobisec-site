import { Event } from '@/context/event/domain/event.schema';

export interface EventRepository {
	create(event: Event): Promise<Event>;
	findAll(): Promise<Event[]>;
	findById(id: string): Promise<Event | null>;
	update(id: string, event: Event): Promise<Event>;
	delete(id: string): Promise<void>;
}
