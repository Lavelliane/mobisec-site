'use client';
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';

const images = [
	{
		src: '/assets/1.png',
		alt: 'Okinawa 1',
	},
	{
		src: '/assets/2.png',
		alt: 'Okinawa 2',
	},
	{
		src: '/assets/3.png',
		alt: 'Okinawa 3',
	},
	{
		src: '/assets/4.png',
		alt: 'Okinawa 4',
	},
	{
		src: '/assets/5.png',
		alt: 'Okinawa 5',
	},
	{
		src: '/assets/6.png',
		alt: 'Okinawa 6',
	},
];

const ImageCarousel = () => {
	return (
		<Carousel
			className='w-full shadow-md'
			plugins={[Autoplay({ delay: 4000 })]}
			opts={{
				align: 'center',
				loop: true,
			}}>
			<CarouselContent>
				{images.map((image, index) => (
					<CarouselItem key={index}>
						<Card className='p-0 w-full mx-auto flex border-0'>
							<CardContent className='flex object-cover items-center p-0 w-full relative'>
								<Image
									src={image.src}
									alt={image.alt}
									width={1000}
									height={1000}
									className='w-full h-[560px] object-cover'
								/>
								<div className='absolute left-24 z-10 right-0 p-4 bg-black/30 backdrop-blur-xs max-w-sm flex flex-col justify-center items-start'>
									<h4 className='text-white text-5xl font-bold'>MobiSec 2025</h4>
									<p className='text-white text-lg'>Okinawa, Japan | December 16-18, 2025</p>
								</div>
							</CardContent>
						</Card>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious
				variant='ghost'
				className='absolute left-12 top-1/2 -translate-y-1/2 cursor-pointer scale-200 text-white'
			/>
			<CarouselNext
				variant='ghost'
				className='absolute right-12 top-1/2 -translate-y-1/2 cursor-pointer scale-200 text-white'
			/>
		</Carousel>
	);
};

export default ImageCarousel;
