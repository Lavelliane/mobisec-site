import React from 'react';
import ImageCarousel from './ImageCarousel';
import CallForPapers from './CallForPapers';

const HomePage = () => {
	return (
		<section className='py-4 sm:py-8'>
			<ImageCarousel />
			<CallForPapers />
		</section>
	);
};

export default HomePage;
