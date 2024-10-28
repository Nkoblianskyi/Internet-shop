import React from 'react';
import { CardProducts } from '../shop/products/[id]/card-products';

interface Props {
    className?: string;
}

export const PopularItem: React.FC<Props> = ({ }) => {
    return (
        <div className='container popular'>
            <div className='popular-title'>
                <h1 className='popular-title-text'>Popular Items</h1>
            </div>
            <div className='popular-list'>
                <div className='popular-list-item'>
                    <CardProducts />
                </div>
                <div className='popular-list-item'>
                    <CardProducts />
                </div>
                <div className='popular-list-item'>
                    <CardProducts />
                </div>
                <div className='popular-list-item'>
                    <CardProducts />
                </div>
                <div className='popular-list-item'>
                    <CardProducts />
                </div>
                <div className='popular-list-item'>
                    <CardProducts />
                </div>
                <div className='popular-list-item'>
                    <CardProducts />
                </div>
                <div className='popular-list-item'>
                    <CardProducts />
                </div>
            </div>
        </div>
    );
};