import ImageCarousel from '@/components/ImageCarousel';
import CallForPapers from './_components/CallForPapers';

export default function Home() {
	return (
		<section className='p-8'>
			<ImageCarousel />
			<CallForPapers />
		</section>
	);
}
