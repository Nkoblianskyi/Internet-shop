import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';
import React from 'react';

interface Props {
    className?: string;
}

export const Hero: React.FC<Props> = ({ }) => {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 p-6 lg:p-12 max-w-[1440px] h-[640px] ">
            {/* Ліва частина */}
            <div className="flex flex-col items-start text-left max-w-lg w-full lg:w-1/2 space-y-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                    Welcome to Our Shop
                </h1>
                <p className="text-md md:text-lg lg:text-xl text-gray-700">
                    Discover the best products with amazing offers and discounts!
                </p>
                <div className="flex space-x-4">
                    <Button className="px-6 py-3 bg-blue-600 text-white rounded-lg">
                        Shop Now
                    </Button>
                    <Button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg">
                        Learn More
                    </Button>
                </div>
            </div>

            {/* Права частина: Карусель */}
            <Carousel className="w-full lg:w-1/2">
                <CarouselContent>
                    <CarouselItem className="relative w-full h-64">
                        <Image src="/product1.jpg" alt="Product 1" layout="fill" objectFit="contain" />
                    </CarouselItem>
                    <CarouselItem className="relative w-full h-64">
                        <Image src="/product2.jpg" alt="Product 2" layout="fill" objectFit="contain" />
                    </CarouselItem>
                    <CarouselItem className="relative w-full h-64">
                        <Image src="/product3.jpg" alt="Product 3" layout="fill" objectFit="contain" />
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
};
