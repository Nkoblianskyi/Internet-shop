'use client';

import React, { useState, useEffect } from 'react';
import { CardProducts } from '../../components/shared/card-products';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    rating: number;
    reviewCount: number;
    image: string[];
    popular: boolean;
}

export const PopularItem: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [visibleCount, setVisibleCount] = useState(4);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch('/mocks/products.json')
            .then((response) => {
                if (!response.ok) throw new Error('Failed to load');
                return response.json();
            })
            .then((data) => {
                console.log('Fetched data:', data); // Log the fetched data
                // Make sure to extract products array correctly if the data structure is nested
                if (Array.isArray(data.products)) {
                    setProducts(data.products); // Ensure products is an array
                } else {
                    console.error('Expected products to be an array, but got:', data.products);
                }
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error loading products:', error);
                setIsLoading(false);
            });
    }, []);

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 4);
    };


    const visibleProducts = Array.isArray(products) ? products.slice(0, visibleCount) : [];

    return (
        <div className='container popular'>
            <div className='popular-title'>
                <h1 className='popular-title-text'>Popular Items</h1>
            </div>
            <div className='popular-list'>
                {isLoading
                    ? Array.from({ length: visibleCount }).map((_, index) => (
                        <div key={`skeleton-${index}`} className='popular-list-item'>
                            <Skeleton className="skeleton-item" />
                        </div>
                    ))
                    : visibleProducts.map((product) => (
                        <div key={product.id} className='popular-list-item'>
                            <CardProducts product={product} />
                        </div>
                    ))}
            </div>
            {!isLoading && visibleCount < products.length && (
                <Button className='btn popular-button' onClick={handleLoadMore}>
                    Load More
                </Button>
            )}
        </div>
    );
};
