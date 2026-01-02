"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { FaImage, FaVideo, FaMusic, FaSearch, FaCamera, FaChevronDown, FaRobot, FaHeart, FaShoppingCart, FaFire, FaFolderOpen, FaChevronLeft, FaChevronRight, FaArrowRight } from "react-icons/fa";
import { featuredImages, popularContent, collections, trustedCompanies } from "@/data/mockData";
import HeroBG from "../assets/bg1.png";
import Images from "../assets/Images.jpg";
import Video from "../assets/video.jpg";
import Music from "../assets/music.jpg";
// import IMG1 from "../assets/serve_public1.jpg";

// Re-export Navbar and Footer which remain in separate files
export { default as Navbar } from './Navbar';
export { default as Footer } from './Footer';

// Hero Component
export const Hero = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedType, setSelectedType] = useState("All images");

    return (
        <section className="relative min-h-[500px] sm:min-h-[600px] flex flex-col justify-center items-center text-white overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={HeroBG.src}
                    alt="Background"
                    className="w-full h-full object-cover absolute inset-0"
                />
                <div className="w-100% h-full-to-r from-gray-900 to-gray-800 absolute inset-0"></div>
            </div>

            <div className="relative z-10 text-center px-2 sm:px-6 max-w-6xl w-full">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 leading-tight">
                    One library, millions of ways to tell your story
                </h1>

                <div className="hidden sm:flex flex-wrap justify-center gap-8 sm:gap-10 mb-6 sm:mb-8 text-sm">
                    <div className="flex items-center mx-4 gap-2">
                        <FaImage />
                        <span>Images</span>
                    </div>
                    <div className="flex items-center mx-4 gap-2">
                        <FaVideo />
                        <span>Video</span>
                    </div>
                    <div className="flex items-center mx-4 gap-2">
                        <FaMusic />
                        <span>Music</span>
                    </div>
                    <div className="flex items-center mx-4 gap-2">
                        <FaRobot />
                        <span>Exclusive Images</span>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-center gap-3 max-w-6xl mx-auto w-full">
                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="p-3 px-6 bg-white text-gray-700 rounded-lg shadow-lg text-sm flex items-center gap-2 w-full lg:w-auto justify-between lg:justify-start"
                        >
                            <div className="flex items-center gap-2">
                                <FaImage />
                                <span>{selectedType}</span>
                            </div>
                            <FaChevronDown className="text-xs" />
                        </button>

                        {dropdownOpen && (
                            <div className="absolute left-0 top-full w-full lg:w-48 bg-white border shadow-lg mt-1 rounded-lg text-left">
                                <div
                                    onClick={() => { setSelectedType("All images"); setDropdownOpen(false); }}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-black"
                                >
                                    <FaImage /> All images
                                </div>
                                <div
                                    onClick={() => { setSelectedType("Video"); setDropdownOpen(false); }}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-black"
                                >
                                    <FaVideo /> Video
                                </div>
                                <div
                                    onClick={() => { setSelectedType("Music"); setDropdownOpen(false); }}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-black"
                                >
                                    <FaMusic /> Music
                                </div>
                            </div>
                        )}
                    </div>

                    <form className="flex items-stretch bg-white rounded-lg overflow-hidden shadow-lg flex-grow w-full max-w-2xl">
                        <input
                            type="text"
                            placeholder="Start your next project"
                            className="flex-grow p-3 text-gray-700 outline-none text-sm sm:text-base"
                        />
                        <button type="submit" className="bg-red-600 px-6 py-3 text-white hover:bg-red-700 transition-colors">
                            <FaSearch />
                        </button>
                    </form>

                    <button className="bg-white text-gray-700 px-4 sm:px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 shadow-lg text-sm sm:text-base w-full lg:w-auto">
                        <FaCamera />
                        <span className="hidden sm:inline">Search by image</span>
                    </button>
                </div>

                <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-300 flex flex-wrap justify-center gap-2">
                    <span className="mr-1">Trending:</span>
                    {["dogs", "happy anniversary", "apple clipart", "emoji", "brain clipart", "love"].map((tag, idx) => (
                        <span key={idx} className="cursor-pointer hover:text-white mr-1">{tag},</span>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Features Component
export const Features = () => {
    // Using placeholders for images
    return (
        <section className="py-16 px-6 bg-white text-black fontFamily-poppins">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-semibold mx-5 tracking-[0.02rem]">
                    Your stories aren&apos;t one-dimensional, neither is our content library
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 tracking-[0.01rem]">
                    <Link href="/images" className="flex items-center gap-3 hover:bg-gray-50 p-3 rounded-lg transition group">
                        <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-200 rounded-sm overflow-hidden relative">
                            <img src={Images.src} alt="Images" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <p className="text-sm font-bold text-gray-700 group-hover:text-black">Images</p>
                    </Link>

                    <Link href="/video" className="flex items-center gap-3 hover:bg-gray-50 p-3 rounded-lg transition group">
                        <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-200 rounded-sm overflow-hidden relative">
                            <img src={Video.src} alt="Video" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <p className="text-sm font-bold text-gray-700 group-hover:text-black">Video</p>
                    </Link>

                    <Link href="/music" className="flex items-center gap-3 hover:bg-gray-50 mt-2 p-3 rounded-lg transition group">
                        <div className="w-16 h-16 md:w-25 md:h-25 bg-gray-200 rounded-sm overflow-hidden relative">
                            <img src={Music.src} alt="Music" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <p className="text-sm font-bold text-gray-700 group-hover:text-black">Music</p>
                    </Link>

                    <Link href="/exclusive-images" className="flex items-center gap-3 hover:bg-gray-50 p-3 rounded-lg transition group">
                        <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-200 rounded-sm overflow-hidden relative">
                            <img src={Video.src} alt="Exclusive" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <p className="text-sm font-bold text-gray-700 group-hover:text-black">Exclusive Images</p>
                    </Link>
                </div>
            </div>
        </section>
    );
};

// Gallery Component
export const Gallery = () => {
    const [activeTab, setActiveTab] = useState("handpicked");

    const categories = ["Autumn", "Business", "Fitness", "Portrait", "Aerial", "Cityscape", "Dance", "Technology", "Forest"];

    return (
        <section className="py-12 sm:py-13 px-4 sm:px-6 bg-gray-50 text-gray-900">
            <div className="max-w-7xl mx-auto relative">
                <h2 className="text-2xl sm:text-3xl lg:text-5xl font-semibold mb-6 sm:mb-8">
                    Explore popular and handpicked visuals
                </h2>

                <nav className="flex gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto pb-2 scrollbar-hide">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className="px-3 sm:px-4 py-2 rounded-full text-sm border-2 border-gray-200 bg-white hover:bg-gray-100 transition-colors flex items-center space-x-2 whitespace-nowrap"
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
                        className={`pb-3 border-b-2 font-medium text-sm sm:text-base transition-colors ${activeTab === "popular" ? "border-black text-black" : "border-transparent text-gray-500 hover:text-gray-700 text-semibold"
                            }`}
                    >
                        Most Popular
                    </button>
                </div>

                {/* Gallery Grid - Customizable Masonry Layout (Row-Major Distribution) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-poppins">
                    {/* Distributed Columns Logic */}
                    {[0, 1, 2].map((colIndex) => (
                        <div key={colIndex} className="flex flex-col gap-2">
                            {(activeTab === "handpicked" ? featuredImages : popularContent)
                                .filter((_, i) => i % 3 === colIndex)
                                .map((item) => {
                                    // Find the original index in the full list
                                    const originalIdx = (activeTab === "handpicked" ? featuredImages : popularContent).indexOf(item);

                                    // --- CUSTOMIZE YOUR IMAGES HERE ---
                                    let imageStyle = "h-auto"; // Default natural height
                                    let containerStyle = "";

                                    // Match styles to the User's Screenshot:
                                    // Top Row (0, 1, 2)
                                    if (originalIdx === 0) imageStyle = "aspect-[16/10]"; // Left (Wide)
                                    if (originalIdx === 1) imageStyle = "aspect-[16/9]"; // Middle (Wide - Collage)
                                    if (originalIdx === 2) imageStyle = "aspect-[16/10]";   // Right (Standard)

                                    // Second Row (3, 4, 5)
                                    if (originalIdx === 3) imageStyle = "aspect-[4/3]";   // Left (Standard)
                                    if (originalIdx === 4) imageStyle = "aspect-[16/9]";   // Middle (Portrait/Tall)
                                    if (originalIdx === 5) imageStyle = "aspect-[4/3]";   // Right (Standard)

                                    // ----------------------------------

                                    return (
                                        <div key={item.id} className={`relative group cursor-pointer rounded-lg overflow-hidden bg-white shadow-md ${containerStyle}`}>
                                            <div className={`relative overflow-hidden ${imageStyle}`}>
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
                                    );
                                })}
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

// Collections Component
export const Collections = () => {
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
                    <Link href="/collections" className="px-6 py-1.5 border-gray-200 text-md border-2 rounded-full hover:bg-gray-100 whitespace-nowrap text-lg">
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
                                <Link href={`/collections/${collection.id}`} className="block relative w-full h-[450px] overflow-hidden group shadow-lg">
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

// TrustedBy Component
export const TrustedBy = () => {
    return (
        <section className="py-12 bg-gray-50 text-center text-black">
            <span className="text-gray-700 mb-8 block text-xl font-bold">
                Trusted by the world&apos;s largest companies
            </span>

            {/* Marquee Container */}
            <div className="logo-company-slider overflow-hidden relative w-full m-auto">
                <div className="logo-company-track flex animate-scroll w-[calc(250px*10)]">
                    {/* 
                Original uses 'animate-scroll' which we need to define in global CSS. 
                We duplicate the list to ensure seamless looping. 
            */}
                    {[...trustedCompanies, ...trustedCompanies, ...trustedCompanies].map((company, index) => (
                        <div key={`${company.name}-${index}`} className="flex items-center justify-center mx-10 w-[200px] flex-shrink-0 h-20 opacity-60 hover:opacity-100 transition-opacity">
                            {/* Replace text with img tags if logos are available */}
                            <span className="text-xl font-bold text-gray-400">{company.name}</span>
                            {/* <img src={company.logo} alt={company.name} className="h-full object-contain" /> */}
                        </div>
                    ))}
                </div>
            </div>

            <p className="text-gray-700 mt-8 mb-4 text-lg">
                Need a personalized package for your business?
            </p>
            <a
                href="/register"
                className="inline-block px-12 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors font-medium"
            >
                Request a Quote
            </a>
        </section>
    );
};

// CreativeGuidance Component
export const CreativeGuidance = () => {
    return (
        <section className="py-16 px-6 bg-white text-black">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold mb-8">
                    Creative and Marketing Guidance
                </h2>

                {/* Main Featured Article */}
                <Link href="/blog/post-1" className="grid md:grid-cols-2 gap-6 mb-10 group cursor-pointer rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="overflow-hidden rounded-lg">
                        <img
                            src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80"
                            alt="Featured Article"
                            className="w-full h-32 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    <div className="flex flex-col justify-center p-4 md:p-0">
                        <h4 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors duration-300">
                            In The Wild: TurboSquid x <em>House of Kardashian</em>
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                            TurboSquid is the world&apos;s premier 3D design resource. In the first installment of Special Stocks&apos; digital series <em>In The Wild</em>, watch global creative studio Coffee & TV use TurboSquid&apos;s premium 3D models to craft <em>House of Kardashian</em>&apos;s opening sequence.
                        </p>
                        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-blue-600 font-medium text-sm inline-flex items-center">
                                Read More <FaArrowRight className="ml-2" />
                            </span>
                        </div>
                    </div>
                </Link>

                {/* Blog Articles Grid */}
                <div className="mt-10 grid md:grid-cols-3 gap-8 mb-16">
                    {[
                        {
                            id: 1,
                            title: "Special Stocks Pricing Plans, Demystified",
                            description: "Elevate your creative projects by blending stock images, audio, and video using flexible Special Stocks pricing plans. Let's help you find your best stock media.",
                            image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80"
                        },
                        {
                            id: 2,
                            title: "Introducing Indemnification for AI-Generated Images",
                            description: "Special Stocks is committed to providing financial protections against legal liabilities, ensuring Enterprise customers can confidently license AI images for commercial projects.",
                            image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80"
                        },
                        {
                            id: 3,
                            title: "What Is a Color Scheme? Definitions and Examples",
                            description: "Learn what a color scheme is, explore key types like Complementary and Triadic, and discover how to apply them effectively in your next design project.",
                            image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80"
                        }
                    ].map((post) => (
                        <div key={post.id} className="flex flex-col gap-4 group cursor-pointer bg-white rounded-lg hover:text-blue-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out px-3 py-2">
                            <div className="overflow-hidden rounded-lg h-48 ">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {post.description}
                                </p>
                                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-blue-600 font-medium text-sm inline-flex items-center">
                                        Read More <FaArrowRight className="ml-2" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-12 mb-20">
                    <Link href="/blog" className="px-8 py-3 border-2 border-gray-300 rounded-full hover:bg-gray-100 transition-colors font-semibold text-gray-700">
                        Visit our blog
                    </Link>
                </div>

                {/* --- WEEKLY INSPIRATION SECTION --- */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 py-12 border-t border-gray-100">
                    <div className="md:w-1/2">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                            A weekly dose of inspiration, just for you
                        </h2>
                        <p className="text-gray-500 mb-8 text-lg">
                            Sign up and get a free image or photo every week
                        </p>
                        <button className="bg-[#e84949] text-white px-8 py-3 rounded-full font-bold hover:bg-red-600 transition-colors text-lg shadow-lg shadow-red-200">
                            Get Started
                        </button>
                    </div>

                    <div className="md:w-1/2 flex gap-6">
                        <div className="flex-1">
                            <div className="rounded-xl overflow-hidden mb-3">
                                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80" className="w-full h-40 object-cover" alt="Free Stock Image" />
                            </div>
                            <h4 className="font-bold text-sm">Free stock image of the week</h4>
                            <p className="text-xs text-gray-500 mb-1">By True Touch Lifestyle</p>
                            <a href="#" className="text-blue-500 text-xs font-medium hover:underline">Download</a>
                        </div>
                        <div className="flex-1">
                            <div className="rounded-xl overflow-hidden mb-3">
                                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&q=80" className="w-full h-40 object-cover" alt="Free Stock Vector" />
                            </div>
                            <h4 className="font-bold text-sm">Free stock vector of the week</h4>
                            <p className="text-xs text-gray-500 mb-1">By Mind Pixell</p>
                            <a href="#" className="text-blue-500 text-xs font-medium hover:underline">Download</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
