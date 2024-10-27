import React from 'react';

interface Props {
    className?: string;
}

export const Admin: React.FC<Props> = ({ className }) => {
    return (
        <div className={className}></div>
    );
};