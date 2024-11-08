import React from 'react';
import productsData from '@/public/mocks/products.json';
import { CardProducts } from './card-products';

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
    popular?: boolean; // Дозволяємо popular бути undefined
    relatedProducts?: number[]; // relatedProducts як масив чисел
}

export const RelatedProduct: React.FC<{ id: number }> = ({ id }) => {
    const product = productsData.products.find((prod: Product) => prod.id === id);

    if (!product) {
        return <p>Product not found</p>;
    }

    const relatedProductsIds = Array.isArray(product.relatedProducts) ? product.relatedProducts : [];
    const relatedProducts = productsData.products.filter((relatedProduct: Product) =>
        relatedProductsIds.includes(relatedProduct.id)
    );

    return (
        <div className='related-product container'>
            <div className='related-product-title'>
                <h1 className='related-product-title-text'>Related Products</h1>
                <button className='related-product-title-button btn'>View All</button>
            </div>
            <div className='related-product-card'>
                {relatedProducts.length > 0 ? (
                    relatedProducts.map((relatedProduct: Product) => (
                        <CardProducts
                            key={relatedProduct.id}
                            product={{
                                ...relatedProduct,
                                popular: relatedProduct.popular ?? false // Задати значення за замовчуванням
                            }}
                        />
                    ))
                ) : (
                    <p>No related products found.</p>
                )}
            </div>
        </div>
    );
};
