'use client';

import React, { useState, useEffect } from 'react';
import { CardProducts } from '../shop/products/[id]/card-products';
import { Button } from '@/components/ui/button';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    rating: number;
    reviewCount: number;
    image: string;
}

interface Props {
    className?: string;
}

export const PopularItem: React.FC<Props> = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [visibleCount, setVisibleCount] = useState(4);
    
    useEffect(() => {
        fetch('/mocks/products.json')
            .then((response) => {
                if (!response.ok) throw new Error('Failed to load');
                return response.json();
            })
            .then((data) => {
                console.log('Loaded products:', data);
                setProducts(data);
            })
            .catch((error) => console.error('Error loading products:', error));
    }, []);

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 4);
    };

    const visibleProducts = products.slice(0, visibleCount);
    
    return (
        <div className='container popular'>
            <div className='popular-title'>
                <h1 className='popular-title-text'>Popular Items</h1>
            </div>
            <div className='popular-list'>
                {visibleProducts.map((product) => (
                    <div key={product.id} className='popular-list-item'>
                        <CardProducts product={product} />
                    </div>
                ))}
            </div>
            {visibleCount < products.length && (
                <Button className='btn popular-button' onClick={handleLoadMore}>
                    Load More
                </Button>
            )}
        </div>
    );
};
