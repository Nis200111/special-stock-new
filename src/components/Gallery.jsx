"use client";

import { useState } from "react";
import { FaSearch, FaHeart, FaShoppingCart, FaFire, FaVideo, FaImage } from "react-icons/fa";
import { featuredImages, popularContent } from "@/data/mockData";

const Gallery = () => {
    const [activeTab, setActiveTab] = useState("handpicked");

    const categories = ["Autumn", "Business", "Fitness", "Portrait", "Aerial", "Cityscape", "Dance", "Technology", "Forest"];

    return (
        <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50 text-gray-900">
            <div className="max-w-7xl mx-auto relative">
                <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-6 sm:mb-8">
                    Explore popular and handpicked visuals
                </h2>

                <nav className="flex gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto pb-2 scrollbar-hide">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className="px-3 sm:px-4 py-2 rounded-full text-sm border-2 bg-white hover:bg-gray-100 transition-colors flex items-center space-x-2 whitespace-nowrap"
                        >
                            <FaSearch className="text-gray-400 text-xs" />
                            <span>{cat}</span>
                        </button>
                    ))}
                </nav>

                <div className="flex space-x-6 sm:space-x-8 mb-6 sm:mb-8 border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab("handpicked")}
                        className={`pb-3 border-b-2 font-semibold text-sm sm:text-base transition-colors ${activeTab === "handpicked" ? "border-black text-black" : "border-transparent text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        Handpicked content
                    </button>
                    <button
                        onClick={() => setActiveTab("popular")}
                        className={`pb-3 border-b-2 font-semibold text-sm sm:text-base transition-colors ${activeTab === "popular" ? "border-black text-black" : "border-transparent text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        Most Popular
                    </button>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {(activeTab === "handpicked" ? featuredImages : popularContent).map((item) => (
                        <div key={item.id} className="relative group cursor-pointer rounded-lg overflow-hidden bg-white shadow-md">
                            <div className="relative overflow-hidden aspect-[4/3]">
                                <img
                                    src={item.thumbnail_path}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />

                                {/* Overlay on Hover */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                                    <div className="flex justify-between items-start">
                                        <span className="text-white text-sm font-medium truncate w-[85%]">{item.title}</span>
                                    </div>

                                    <div className="flex justify-between items-center mt-auto">
                                        <button className="bg-white/20 backdrop-blur-md border border-white/40 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 hover:bg-white/30 transition">
                                            <FaHeart /> <span>Save</span>
                                        </button>
                                        {item.price > 0 && (
                                            <button className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition">
                                                <FaShoppingCart className="text-xs" />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Popular Badge */}
                                {activeTab === "popular" && (
                                    <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                        <FaFire /> POPULAR
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <button className="px-8 py-3 border-2 border-gray-300 rounded-full hover:bg-gray-100 transition-colors font-medium">
                        See More Images
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Gallery;
