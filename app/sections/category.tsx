import React from 'react';
import { Button } from '@/components/ui/button';
import { FaBaby, FaChair, FaDoorOpen, FaBed, FaBath, FaBriefcase } from "react-icons/fa";
import Link from 'next/link';

interface Props {
    className?: string;
}

export const Category: React.FC<Props> = ({ }) => {
    return (
        <div className='category mx-auto'>
            <div className='category-title'>
                <h1 className='category-title-text'>Featured Category</h1>
                <Link href="/shop">
                    <Button className='category-left-button-item btn'>
                        <p className='category-left-button-item-text'>View All</p>
                    </Button>
                </Link>
            </div>
            <div className='category-container'>
                <Link href={{ pathname: '/shop', query: { category: 'bedroom' } }}>
                    <div className='category-container-item'>
                        <FaBed className='category-container-item-icon' />
                        <p className='category-container-item-text'>Bedroom</p>
                    </div>
                </Link>
                <Link href={{ pathname: '/shop', query: { category: 'office' } }}>
                    <div className='category-container-item'>
                        <FaBriefcase className='category-container-item-icon' />
                        <p className='category-container-item-text'>Office</p>
                    </div>
                </Link>
                <Link href={{ pathname: '/shop', query: { category: 'bathroom' } }}>
                    <div className='category-container-item'>
                        <FaBath className='category-container-item-icon' />
                        <p className='category-container-item-text'>Bathroom</p>
                    </div>
                </Link>
                <Link href={{ pathname: '/shop', query: { category: 'nursery' } }}>
                    <div className='category-container-item'>
                        <FaBaby className='category-container-item-icon' />
                        <p className='category-container-item-text'>Nursery</p>
                    </div>
                </Link>
                <Link href={{ pathname: '/shop', query: { category: 'lounge' } }}>
                    <div className='category-container-item'>
                        <FaChair className='category-container-item-icon' />
                        <p className='category-container-item-text'>Lounge</p>
                    </div>
                </Link>
                <Link href={{ pathname: '/shop', query: { category: 'hallways' } }}>
                    <div className='category-container-item'>
                        <FaDoorOpen className='category-container-item-icon' />
                        <p className='category-container-item-text'>Hallways</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};
