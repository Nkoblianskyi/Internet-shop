'use client'

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

interface ProductGalleryProps {
    productId: number;
    images: { id: number; url: string }[];
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

    const handleThumbnailClick = (index: number) => {
        setCurrentIndex(index);
        carouselApi?.scrollTo(index);
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
                    <CarouselContent className="product-gallery-content">
                        {images.map((img, index) => (
                            <CarouselItem key={index} className="main-item">
                                <Image
                                    src={img.url}
                                    alt={`Product image ${index + 1}`}
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
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="product-gallery-thumbnail-wrapper"
                        onClick={() => handleThumbnailClick(index)}
                    >
                        <Image
                            src={image.url}
                            alt={`Thumbnail ${index + 1}`}
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
