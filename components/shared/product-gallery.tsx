'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
    CarouselApi
} from '@/components/ui/carousel';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    rating: number;
    reviewCount: number;
    image: string[];
    specialOffer?: boolean;
}

interface Props {
    product: Product | null | undefined;
}

export const ProductGallery: React.FC<Props> = ({ product }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

    if (!product) {
        return <div>Продукт не знайдено</div>;
    }

    const images = Array.isArray(product.image) ? product.image : [product.image];

    const handleThumbnailClick = (index: number) => {
        setCurrentIndex(index);
        if (carouselApi) {
            carouselApi.scrollTo(index);
        }
    };

    return (
        <div className="product-gallery">
            {/* Основне зображення з каруселлю */}
            <div className="product-gallery-main-image-container">
                <Carousel
                    opts={{ loop: true }}
                    setApi={(api) => {
                        if (api) {
                            setCarouselApi(api);
                            api.on('select', () => {
                                setCurrentIndex(api.selectedScrollSnap());
                            });
                        }
                    }}
                >
                    <div className="product-gallery-previous">
                        <CarouselPrevious />
                    </div>
                    <CarouselContent>
                        {images.map((img, index) => (
                            <CarouselItem key={index}>
                                <Image
                                    src={img}
                                    alt={product.name}
                                    width={585}
                                    height={460}
                                    className="main-image"
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="product-gallery-next">
                        <CarouselNext />
                    </div>
                </Carousel>
            </div>

            {/* Мініатюри під основним зображенням */}
            <div className="product-gallery-thumbnail-container">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className="product-gallery-thumbnail-wrapper"
                        onClick={() => handleThumbnailClick(index)}
                    >
                        <Image
                            src={img}
                            alt={`${product.name} thumbnail ${index + 1}`}
                            width={132}
                            height={132}
                            className={`product-gallery-thumbnail ${index === currentIndex ? 'product-gallery-thumbnail-active' : ''}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
