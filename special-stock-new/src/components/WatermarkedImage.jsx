"use client";
import React from 'react';

const WatermarkedImage = ({
    src,
    alt,
    watermarkSrc,
    watermarkText,
    className,
    imgClassName,
    opacity = 0.7,
    ...props
}) => {
    return (
        <div
            className={`relative overflow-hidden ${className || 'w-full'}`}
            {...props}
        >
            {/* Main Image */}
            <img
                src={src}
                alt={alt || 'Image'}
                className={`block ${imgClassName || 'w-full h-auto object-cover'}`}
            />

            {/* Watermark Container */}
            <div
                className="absolute top-1/2 -translate-y-1/2 left-1/2 right-0 flex items-center justify-end pointer-events-none z-10"
                style={{ opacity: opacity }}
            >
                {watermarkSrc ? (
                    <img
                        src={watermarkSrc}
                        alt="Watermark"
                        className={`h-auto object-contain p-4 ${props.watermarkClassName || 'w-1/2'}`}
                    />
                ) : (
                    <div className="w-full text-center px-4">
                        <span className="text-white/80 font-bold text-lg sm:text-2xl lg:text-4xl uppercase tracking-widest drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] break-words">
                            {watermarkText || 'Watermark'}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WatermarkedImage;
