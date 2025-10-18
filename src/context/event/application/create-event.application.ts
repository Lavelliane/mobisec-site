import { EventRepository } from '../domain/event.repository';
import { Event } from '../domain/event.schema';

export const createEvent = async (eventRepository: EventRepository, event: Event) => {
	return eventRepository.create(event);
};

export const findAllEvents = async (eventRepository: EventRepository) => {
	return eventRepository.findAll();
};

export const findEventById = async (eventRepository: EventRepository, id: string) => {
	return eventRepository.findById(id);
};

export const updateEvent = async (eventRepository: EventRepository, id: string, event: Event) => {
	return eventRepository.update(id, event);
};

export const deleteEvent = async (eventRepository: EventRepository, id: string) => {
	return eventRepository.delete(id);
};
