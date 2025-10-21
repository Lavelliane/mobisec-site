'use client';
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';

const images = [
	{
		src: '/assets/sapporo/1.png',
		alt: 'Sapporo 1',
	},
	{
		src: '/assets/sapporo/2.png',
		alt: 'Sapporo 2',
	},
	{
		src: '/assets/sapporo/3.png',
		alt: 'Sapporo 3',
	},
	{
		src: '/assets/sapporo/4.png',
		alt: 'Sapporo 4',
	},
	{
		src: '/assets/sapporo/5.png',
		alt: 'Sapporo 5',
	},
	{
		src: '/assets/sapporo/6.png',
		alt: 'Sapporo 6',
	},
	{
		src: '/assets/sapporo/7.png',
		alt: 'Sapporo 7',
	},
	{
		src: '/assets/sapporo/8.png',
		alt: 'Sapporo 8',
	},
	{
		src: '/assets/sapporo/9.png',
		alt: 'Sapporo 9',
	},
	{
		src: '/assets/sapporo/10.png',
		alt: 'Sapporo 10',
	},
	{
		src: '/assets/sapporo/11.png',
		alt: 'Sapporo 11',
	},
	{
		src: '/assets/sapporo/12.png',
		alt: 'Sapporo 12',
	},
	{
		src: '/assets/sapporo/13.png',
		alt: 'Sapporo 13',
	},
	{
		src: '/assets/sapporo/14.png',
		alt: 'Sapporo 14',
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
									className='w-full h-[280px] sm:h-[400px] lg:h-[560px] object-cover'
								/>
								<div className='absolute inset-0 z-10 flex items-center justify-center sm:justify-start'>
									<div className='w-full max-w-3xs sm:max-w-sm lg:max-w-md ml-0 sm:ml-16 lg:ml-24 p-4 sm:p-4 lg:p-6 bg-black/40 sm:bg-black/30 backdrop-blur-sm rounded-r-lg'>
										<h4 className='text-white text-2xl sm:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2 text-center sm:text-left'>
											MobiSec 2025
										</h4>
										<p className='text-white text-sm sm:text-base lg:text-lg leading-tight flex sm:flex-row flex-col items-center'>
											<span>Sapporo, Japan</span> <span className='mx-1 sm:inline hidden'>|</span> <span>December 16-18, 2025</span>
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious
				variant='ghost'
				className='absolute left-2 sm:left-4 lg:left-12 top-1/2 -translate-y-1/2 cursor-pointer scale-125 sm:scale-150 lg:scale-200 text-white hover:bg-white/20'
			/>
			<CarouselNext
				variant='ghost'
				className='absolute right-2 sm:right-4 lg:right-12 top-1/2 -translate-y-1/2 cursor-pointer scale-125 sm:scale-150 lg:scale-200 text-white hover:bg-white/20'
			/>
		</Carousel>
	);
};

export default ImageCarousel;
