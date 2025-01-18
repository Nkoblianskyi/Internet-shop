import { Button } from '@/components/ui/button';
import React from 'react';
import Image from 'next/image';

interface Props {
    className?: string;
}

export const Hero: React.FC<Props> = ({ }) => {
    return (
        <div className="hero container mx-auto">
            <div className="hero-left">
                <h1 className="hero-left-title">
                    Welcome NJY Design
                </h1>
                <p className="hero-left-title-text">
                    Elevate your space with NJY Design.
                </p>
                <div className="hero-left-button">
                    <Button className="hero-left-button-item btn">
                        Shop Now
                    </Button>
                    <Button className="hero-left-button-item btn">
                        View Detail
                    </Button>
                </div>
            </div>
            <div className="hero-right">
                <Image
                    src='/hero.jpg'
                    alt='product-gallery'
                    width={1420}
                    height={620}
                    priority
                    className='hero-right-image'
                />
            </div>
        </div>
    );
};
