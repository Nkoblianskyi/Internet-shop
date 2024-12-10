'use client';

import React, { useState, useEffect } from 'react';
import { CardProducts } from '../../components/shared/card-products';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Product } from '../types/types';

export const PopularItem: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [visibleCount, setVisibleCount] = useState(8);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:5000/api/products')
            .then((response) => {
                if (!response.ok) throw new Error('Failed to load data');
                return response.json();
            })
            .then((data) => {
                if (Array.isArray(data)) {
                    setProducts(data);
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

    const visibleProducts = products.slice(0, visibleCount);

    return (
        <div className="container popular">
            <div className="popular-title">
                <h1 className="popular-title-text">Popular Items</h1>
            </div>
            <div className="popular-list">
                {isLoading
                    ? Array.from({ length: visibleCount }).map((_, index) => (
                        <div key={`skeleton-${index}`} className="popular-list-item">
                            <Skeleton className="skeleton-item" />
                        </div>
                    ))
                    : visibleProducts.map((product) => (
                        <div key={product.id} className="popular-list-item">
                            <CardProducts product={product} />
                        </div>
                    ))}
            </div>
            {!isLoading && visibleCount < products.length && (
                <Button className="btn popular-button" onClick={handleLoadMore}>
                    Load More
                </Button>
            )}
        </div>
    );
};
