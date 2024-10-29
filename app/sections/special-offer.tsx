
import React from 'react';
import { CardProducts } from '../shop/products/[id]/card-products';

interface Props {
    className?: string;
}


export const SpecialOffer: React.FC<Props> = ({ }) => {
    return (
        <div className='offer'>
            <div className='offer-left'>
                <CardProducts/>
            </div>
            <div className='offer-right'>
                <h1 className='offer-right-title'>
                    Special Offer
                </h1>
                <p className='offer-right-text'>
                    Limited offer with a great price
                </p>
            </div>
        </div>
    );
};