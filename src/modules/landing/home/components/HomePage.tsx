import React from 'react';
import ImageCarousel from './ImageCarousel';
import CallForPapers from './CallForPapers';

const HomePage = () => {
	return (
		<section className='p-8'>
			<ImageCarousel />
			<CallForPapers />
		</section>
	);
};

export default HomePage;
