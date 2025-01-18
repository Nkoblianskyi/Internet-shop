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
import { Product } from '@/app/types/types';

interface Props {
    className?: string;
}

export const SpecialOffer: React.FC<Props> = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [carouselApi, setCarouselApi] = useState<EmblaCarouselType | undefined>(undefined);

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load data');
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    const specialOffers = data.filter((product: Product) => product.specialOffer);
                    setProducts(specialOffers);
                }
            })
            .catch(error => {
                console.error('Error loading products:', error);
            });
    }, []);

    const handleNextSlide = () => {
        if (carouselApi) {
            carouselApi.scrollNext();
        }
    };

    const handlePreviousSlide = () => {
        if (carouselApi) {
            carouselApi.scrollPrev();
        }
    };

    return (
        <section className="offer">
            <header className="offer-left">
                <Carousel setApi={setCarouselApi} opts={{ loop: true }} className="carousel">
                    <CarouselContent className="carousel-content">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <CarouselItem key={product.id} className="flex justify-center items-center">
                                    <CardProducts
                                        product={product}
                                    />
                                </CarouselItem>
                            ))
                        ) : (
                            <p>No special offers available</p>
                        )}
                    </CarouselContent>
                    <CarouselPrevious className="carousel-prev" onClick={handlePreviousSlide} />
                    <CarouselNext className="carousel-next" onClick={handleNextSlide} />
                </Carousel>
            </header>

            <aside className="offer-right">
                <header className="offer-right-info">
                    <h2 className="offer-right-title">Special Offer</h2>
                    <p className="offer-right-text">
                        Limited time offer at a great price. Available until December 1, 2025. Hurry up and place your order!
                    </p>
                </header>
                <footer className="offer-right-button">
                    <Button className="btn">Buy Now</Button>
                    <Button className="btn">View Details</Button>
                </footer>
            </aside>
        </section>
    );
};
