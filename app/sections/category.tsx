import React from 'react';
import { Button } from '@/components/ui/button';
import { FaBaby, FaChair, FaDoorOpen } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";


interface Props {
    className?: string;
}

export const Category: React.FC<Props> = ({ }) => {
    return (
        <div className='category '>
            <div className='category-title'>
                <h1 className='category-title-text'>Featured Category</h1>
                <Button className='hero-left-button-item btn'>
                    View Detail
                </Button>
            </div>
            <div className='category-container'>
                <div className='category-container-item'>
                    <FaBed className='category-container-item-icon'/>
                    <p className='category-container-item-text'>Bedroom</p>
                </div>
                <div className='category-container-item'>
                    <FaBriefcase className='category-container-item-icon'/>
                    <p className='category-container-item-text'>Office</p>
                </div>
                <div className='category-container-item'>
                    <FaBath className='category-container-item-icon'/>
                    <p className='category-container-item-text'>Bathroom</p>
                </div>
                <div className='category-container-item'>
                    <FaBaby className='category-container-item-icon'/>
                    <p className='category-container-item-text'>Nursery</p>
                </div>
                <div className='category-container-item'>
                    <FaChair  className='category-container-item-icon'/>
                    <p className='category-container-item-text'>Lounge</p>
                </div>
                <div className='category-container-item'>
                    <FaDoorOpen className='category-container-item-icon'/>
                    <p className='category-container-item-text'>Hallways</p>
                </div>
            </div>
        </div>
    );      
};