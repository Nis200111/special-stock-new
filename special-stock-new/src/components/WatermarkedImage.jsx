"use client";
import React from "react";

const WatermarkedImage = ({
    src,
    alt = "Image",

    // ✅ make watermarkSrc required (default to your custom image)
    watermarkSrc = "./public/waterMark.png",

    className = "w-full",
    imgClassName = "w-full h-auto object-cover",
    opacity = 1,

    watermarkClassName = "w-50 md:w-50 justify-end",
    watermarkContainerClassName = "",
    ...rest
}) => {
    return (
        <div className={`relative overflow-hidden ${className}`} {...rest}>
            {/* Main image */}
            <img src={src} alt={alt} className={`block ${imgClassName}`} />

            {/* ✅ Watermark image ONLY */}
            <div
                className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-end ${watermarkContainerClassName}`}
                style={{ opacity }}
            >
                <img
                    src={watermarkSrc}
                    alt="Watermark"
                    className={`select-none object-contain ${watermarkClassName}`}
                    draggable={false}
                />
            </div>
        </div>
    );
};

export default WatermarkedImage;
