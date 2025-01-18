'use client';

import React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/lib/utils';

type SliderProps = {
    className?: string;
    min: number;
    max: number;
    step: number;
    formatLabel?: (value: number) => string;
    value?: [number, number];
    onValueChange?: (values: [number, number]) => void;
};

export const RangeSlider = React.forwardRef<HTMLDivElement, SliderProps>(
    ({ className, min, max, step, formatLabel, value, onValueChange, ...props }, ref) => {
        const initialValue: [number, number] = Array.isArray(value) && value.length === 2 ? value as [number, number] : [min, max];
        const [localValues, setLocalValues] = React.useState<[number, number]>(initialValue);

        React.useEffect(() => {
            setLocalValues(Array.isArray(value) && value.length === 2 ? value as [number, number] : [min, max]);
        }, [min, max, value]);

        const handleValueChange = (newValues: number[]) => {
            if (newValues.length === 2) {
                setLocalValues([newValues[0], newValues[1]]);
                onValueChange?.([newValues[0], newValues[1]]);
            }
        };

        return (
            <SliderPrimitive.Root
                ref={ref}
                min={min}
                max={max}
                step={step}
                value={localValues}
                onValueChange={handleValueChange}
                className={cn('relative flex w-full touch-none select-none mb-6 items-center', className)}
                {...props}
            >
                <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-primary/20">
                    <SliderPrimitive.Range className="absolute h-full bg-lime-800" />
                </SliderPrimitive.Track>
                {localValues.map((value, index) => (
                    <React.Fragment key={index}>
                        <div
                            className="absolute text-center"
                            style={{
                                left: `calc(${((value - min) / (max - min)) * 100}% + 0px)`,
                                top: `10px`,
                            }}
                        >
                            <span className="range-span text-sm">{formatLabel ? formatLabel(value) : value}</span>
                        </div>
                        <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
                    </React.Fragment>
                ))}
            </SliderPrimitive.Root>
        );
    }
);

RangeSlider.displayName = 'RangeSlider';


