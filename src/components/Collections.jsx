"use client";

import Link from "next/link";
import { FaFolderOpen, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { collections } from "@/data/mockData";
import { useRef } from "react";

const Collections = () => {
    const sliderRef = useRef(null);

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    return (
        <section className="py-16 bg-white overflow-hidden text-black">
            <div className="max-w-7xl mx-auto px-6 relative">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold">Curated collections backed by AI</h2>
                    <Link href="/collections" className="px-5 py-3 text-sm border-2 rounded-full hover:bg-gray-100 whitespace-nowrap text-lg">
                        See all collections
                    </Link>
                </div>

                <div className="relative group/slider">
                    <div
                        ref={sliderRef}
                        className="flex overflow-x-auto scroll-smooth scrollbar-hide -mx-4 px-4 space-x-4 sm:space-x-6 pb-4"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {collections.map((collection) => (
                            <div key={collection.id} className="flex-shrink-0 w-72 sm:w-80 cursor-pointer snap-start">
                                <Link href={`/collections/${collection.id}`} className="block relative w-full h-[450px] overflow-hidden group shadow-lg rounded-lg">
                                    <img
                                        src={collection.cover_image_path}
                                        alt={collection.name}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end">
                                        <div className="p-5 text-white">
                                            <h3 className="font-bold text-2xl leading-tight mb-1">
                                                {collection.name}
                                            </h3>
                                            <p className="text-sm opacity-80">{collection.asset_count} assets</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={scrollLeft}
                        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-xl hover:bg-gray-100 transition z-10 hidden sm:flex items-center justify-center w-12 h-12 opacity-0 group-hover/slider:opacity-100 duration-300 -ml-4"
                    >
                        <FaChevronLeft className="text-gray-800" />
                    </button>
                    <button
                        onClick={scrollRight}
                        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-xl hover:bg-gray-100 transition z-10 hidden sm:flex items-center justify-center w-12 h-12 opacity-0 group-hover/slider:opacity-100 duration-300 -mr-4"
                    >
                        <FaChevronRight className="text-gray-800" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Collections;
