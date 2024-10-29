'use client'

import React from 'react';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';

interface Props {
    className?: string;
}

export const CardProducts: React.FC<Props> = ({ }) => {

    return (
        <>
        <div className='card'>
            <div className='card-item'>
                <Image
                    src='/product.jpg'
                    alt='product'
                    width={280}
                    height={280}
                    className='card-item-image'
                />
            </div>
            <div className='card-item-info'>
                <div className='card-item-info-wrapp'>
                    <h1 className='card-item-info-wrapp-title'>Commode</h1>
                    <p className='card-item-info-wrapp-price'>$ 278</p>
                </div>
                <p className='card-item-info-description'>Living room</p>
                <div className='reviews'>
                    <FaStar
                        className='reviews-star'
                        width={24}
                        height={24}
                    />
                    <span className='reviews-star-rating'>4.8</span>
                    <span className='reviews-star-rating-count'>528</span>
                </div>
            </div>
            
        </div>
        </>
    );
};