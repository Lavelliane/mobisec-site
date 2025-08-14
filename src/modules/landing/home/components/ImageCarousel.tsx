'use client';
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';

const images = [
	{
		src: '/assets/sapporo/1.jpg',
		alt: 'Sapporo 1',
	},
	{
		src: '/assets/sapporo/2.jpg',
		alt: 'Sapporo 2',
	},
	{
		src: '/assets/sapporo/3.jpg',
		alt: 'Sapporo 3',
	},
	{
		src: '/assets/sapporo/4.jpg',
		alt: 'Sapporo 4',
	},
	{
		src: '/assets/sapporo/5.jpg',
		alt: 'Sapporo 5',
	},
	{
		src: '/assets/sapporo/6.jpg',
		alt: 'Sapporo 6',
	},
	{
		src: '/assets/sapporo/7.jpg',
		alt: 'Sapporo 7',
	},
	{
		src: '/assets/sapporo/8.jpg',
		alt: 'Sapporo 8',
	},
	{
		src: '/assets/sapporo/9.jpg',
		alt: 'Sapporo 9',
	},
	{
		src: '/assets/sapporo/10.jpg',
		alt: 'Sapporo 10',
	},
];

const ImageCarousel = () => {
	return (
		<Carousel
			className='w-full shadow-xl'
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
									<p className='text-white text-lg'>Sapporo, Japan | December 16-18, 2025</p>
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
