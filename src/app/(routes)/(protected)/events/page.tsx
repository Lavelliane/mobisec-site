import EventsPage from '@/modules/events/components/EventsPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Events Management | MobiSec',
	description: 'Admin panel for managing MobiSec events',
};

const page = () => {
	return <EventsPage />;
};

export default page;
