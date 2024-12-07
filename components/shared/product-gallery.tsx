import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // або 'react-image', якщо використовуєте звичайні зображення
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
    CarouselApi
} from '@/components/ui/carousel'; // Ваш компонент каруселі

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    rating: number;
    reviewCount: number;
    image: string[]; // Масив з іменами файлів зображень
    mainImage: string; // Основне зображення
}

interface Props {
    productId: number; // Передаємо тільки productId
}

export const ProductGallery: React.FC<Props> = ({ productId }) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

    // Функція для отримання даних продукту з API
    const fetchProduct = async (id: number) => {
        try {
            const res = await fetch(`http://localhost:5000/api/products/${id}`); // Шлях до вашого API
            if (!res.ok) {
                throw new Error('Failed to fetch product data');
            }
            const data = await res.json();
            setProduct(data); // Збереження даних про продукт
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    useEffect(() => {
        fetchProduct(productId); // Викликаємо fetchProduct при зміні productId
    }, [productId]);

    if (!product) {
        return <div>Продукт не знайдено</div>;
    }

    const images = Array.isArray(product.image) ? product.image : [product.image];

    // Функція для побудови URL для кожного зображення
    const getImageUrl = (image: string) => {
        // Для S3 використовуємо таку URL-структуру:
        return `https://furniture.s3.eu-north-1.amazonaws.com/images/${image}`; // Ваш AWS S3 URL
    };

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
                                    src={getImageUrl(img)} // Використовуємо правильний шлях
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
                            src={getImageUrl(img)} // Використовуємо правильний шлях
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
