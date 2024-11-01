'use client'

import React, { useEffect, useState } from 'react';
import { CardProducts } from '../shop/products/[id]/card-products';
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
    image: string;
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
                    throw new Error('Failed to load');
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
                            products.map(product => (
                                <CarouselItem key={product.id} className='flex justify-center items-center'>
                                    <CardProducts product={{
                                        image: product.image,
                                        title: product.name,
                                        price: product.price,
                                        description: product.description,
                                        rating: product.rating,
                                        reviewCount: product.reviewCount,
                                    }} />
                                </CarouselItem>
                            ))
                        ) : (
                            <p>No special offers available</p>
                        )}
                    </CarouselContent>
                    <CarouselPrevious className="carousel-prev" onClick={handleNextSlide} />
                    <CarouselNext className="carousel-next" onClick={handleNextSlide} />
                </Carousel>
            </div>
            <div className='offer-right'>
                <div className='offer-right-info'>
                    <h1 className='offer-right-title'>Special Offer</h1>
                    <p className='offer-right-text'>Limited offer at a great price.
                        The promotion will continue until December 1, 2025.
                        Hurry up to order</p>
                </div>
                <div className='offer-right-button'>
                    <Button className='btn'>Buy</Button>
                    <Button className='btn'>View detalies</Button>
                </div>
            </div>
        </div>
    );
}
