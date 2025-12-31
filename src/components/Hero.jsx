"use client";

import { useState } from "react";
import { FaImage, FaVideo, FaMusic, FaSearch, FaCamera, FaChevronDown, FaRobot } from "react-icons/fa";

const Hero = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedType, setSelectedType] = useState("All images");

    return (
        <section className="relative min-h-[500px] sm:min-h-[600px] flex flex-col justify-center items-center text-white overflow-hidden bg-gray-900">
            {/* Background - using a placeholder or color since original image 'resources/bg1.png' might not exist */}
            <div className="absolute inset-0 z-0">
                {/* Replace with actual image or proper CSS background */}
                <div className="w-full h-full bg-gradient-to-r from-gray-900 to-gray-800 opacity-90"></div>
                {/* Optional: Add an actual Next.js Image component here if you have the asset */}
            </div>

            <div className="relative z-10 text-center px-4 sm:px-6 max-w-6xl w-full">
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
                            <div className="absolute left-0 top-full w-full lg:w-48 bg-white border shadow-lg z-20 mt-1 rounded-lg text-left">
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

export default Hero;
