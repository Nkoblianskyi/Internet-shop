
'use client';

import React, { useEffect, useState } from 'react';
import { CardProducts } from '../../components/shared/card-products';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from '@/components/ui/carousel';
import { EmblaCarouselType } from 'embla-carousel';
import { Button } from '@/components/ui/button';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    rating: number;
    reviewCount: number;
    image: string[];
    mainImage: string;
    specialOffer: boolean;
}

interface Props {
    className?: string;
}

export const SpecialOffer: React.FC<Props> = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [carouselApi, setCarouselApi] = useState<EmblaCarouselType | undefined>(undefined);

    useEffect(() => {
        fetch('/mocks/products.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load data');
                }
                return response.json();
            })
            .then(data => {
                const specialOffers = data.filter((product: Product) => product.specialOffer);
                setProducts(specialOffers);
            })
            .catch(error => console.error('Error loading products:', error));
    }, []);

    const handleNextSlide = () => {
        if (carouselApi) {
            carouselApi.scrollNext();
        }
    };

    return (
        <div className='offer'>
            <div className='offer-left'>
                <Carousel setApi={setCarouselApi} opts={{ loop: true }} className='carousel'>
                    <CarouselContent className='carousel-content'>
                        {products.length > 0 ? (
                            products.map((product, index) => (
                                <CarouselItem key={`${product.id}-${index}`} className='flex justify-center items-center'>
                                    <CardProducts 
                                        product={{
                                            id: product.id, // Передача ID
                                            image: [product.mainImage],
                                            name: product.name,
                                            price: product.price,
                                            description: product.description,
                                            rating: product.rating,
                                            reviewCount: product.reviewCount,
                                        }} 
                                    />
                                </CarouselItem>
                            ))
                        ) : (
                            <p>Special offers are not available</p>
                        )}
                    </CarouselContent>
                    <CarouselPrevious className="carousel-prev" onClick={handleNextSlide} />
                    <CarouselNext className="carousel-next" onClick={handleNextSlide} />
                </Carousel>
            </div>
            <div className='offer-right'>
                <div className='offer-right-info'>
                    <h1 className='offer-right-title'>Special Offer</h1>
                    <p className='offer-right-text'>Limited-time offer at a great price. The offer lasts until December 1, 2025. Hurry to order</p>
                </div>
                <div className='offer-right-button'>
                    <Button className='btn'>Buy</Button>
                    <Button className='btn'>View Details</Button>
                </div>
            </div>
        </div>
    );
};
