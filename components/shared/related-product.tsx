import React from 'react';
import productsData from '@/public/mocks/products.json';
import { CardProducts } from './card-products';
import { Button } from '../ui/button';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    rating: number;
    reviewCount: number;
    image: string[];
    mainImage: string;
    width?: string[];
    height?: string[];
    color?: string[];
    specialOffer?: boolean;
    popular?: boolean;
    relatedProducts?: number[];
}

export const RelatedProduct: React.FC<{ id: number }> = ({ id }) => {
    const product = productsData.products.find((product: Product) => product.id === id);

    if (!product) {
        return <p>Product not found</p>;
    }


    const relatedProducts = product.relatedProducts
        ? product.relatedProducts.map((relatedId) => 
            productsData.relatedProducts.find(p => p.id === relatedId)
        ).filter(Boolean)
        : [];

    return (
        <div className='related-product container'>
            <div className='related-product-title'>
                <h1 className='related-product-title-text'>
                    Related Products
                </h1>
                <Button className='related-product-title-button btn'>View All</Button>
            </div>
            <div className='related-product-card'>
                {relatedProducts.map((relatedProduct) => (
                    relatedProduct && (
                        <CardProducts key={relatedProduct.id} product={relatedProduct} />
                    )
                ))}
            </div>
        </div>
    );
};
