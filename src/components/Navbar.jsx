"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Globe, Heart, ShoppingCart, ChevronDown } from "lucide-react"
import { FaCartShopping } from "react-icons/fa6";
import IMGLOGO from "../assets/speciallogo.png";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            {/* Top Announcement */}
            <div className="bg-[#3477a2] text-white text-center text-small sm:text-sm py-1 sm:py-1.99 px-2 tracking-[0.02rem]">
                <span className="block sm:inline">
                    Get 10 royalty-free image downloads each month with a cost-saving subscription.
                </span>
                <Link
                    href="/register"
                    className="bg-white text-black px-2 py-2 rounded-full ml-0 sm:ml-2 mt-2 sm:mt-0 text-xs font-bold hover:bg-gray-100 transition-colors inline-block"
                >
                    Buy Now
                </Link>
            </div>

            {/* Main Navbar */}
            <header className="text-white px-4 sm:px-6 py-3 bg-[#131313] relative">
                <div className="flex items-center justify-between w-full">
                    {/* Mobile button */}
                    <div className="flex lg:hidden items-center">
                        <button
                            className="text-white p-2 hover:bg-gray-800 rounded"
                            onClick={() => setMobileOpen(true)}
                            aria-label="Open menu"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>

                    <div />

                    {/* Logo center */}
                    <div className="flex-grow flex justify-center lg:absolute lg:left-1/2 lg:-translate-x-1/2">
                        <Link href="/" className="flex items-center">
                            <img
                                src={IMGLOGO.src}
                                alt="Special Stocks"
                                className="max-h-[32px] sm:max-h-[40px] lg:max-h-[48px] w-auto mt-5 invert"
                            />
                        </Link>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <div className="hidden sm:flex items-center space-x-1 hover:text-gray-300 cursor-pointer">
                            <span className="text-sm">Pricing</span>
                            <ChevronDown className="h-4 w-4 opacity-80" />
                        </div>

                        <Globe className="h-5 w-5 hover:text-gray-300 cursor-pointer hidden sm:block" strokeWidth={2.5} />
                        <Heart className="h-5 w-5 hover:text-gray-300 cursor-pointer hidden sm:block" />

                        <Link href="/cart" aria-label="Cart">
                            <FaCartShopping className="h-5 w-5 hover:text-gray-300 cursor-pointer" />
                        </Link>

                        <Link
                            href="/login"
                            className="bg-white text-black px-3 sm:px-4 py-2 sm:py-2.5 rounded-md font-bold text-sm hover:bg-gray-100 transition-colors hidden sm:flex"
                        >
                            Log in
                        </Link>
                    </div>
                </div>

                {/* Desktop nav */}
                <div className="hidden lg:flex justify-center mt-5">
                    <nav className="flex items-center space-x-6 xl:space-x-8 text-sm relative">
                        <div className="relative group">
                            <Link href="/images" className="flex items-center space-x-1 hover:text-gray-300">
                                <span>Images</span>
                                <ChevronDown className="h-4 w-4 opacity-80" />
                            </Link>

                            <div className="absolute top-full left-0 mt-2 bg-black text-white rounded-lg shadow-xl hidden min-w-[200px] z-50 group-hover:block">
                                <Link href="/images" className="block px-6 py-3 hover:bg-gray-800">
                                    <div className="font-semibold">Images home</div>
                                </Link>
                                <Link href="/search?type=vector" className="block px-6 py-3 hover:bg-gray-800">
                                    <div className="font-semibold">Vectors</div>
                                </Link>
                                <Link href="/search?type=photo" className="block px-6 py-3 hover:bg-gray-800">
                                    <div className="font-semibold">Photos</div>
                                </Link>
                                <Link href="/search?type=premium" className="block px-6 py-3 hover:bg-gray-800">
                                    <div className="font-semibold">Premium Images</div>
                                </Link>
                                <Link href="/collections" className="block px-6 py-3 hover:bg-gray-800 rounded-b-lg">
                                    <div className="font-semibold">Collections</div>
                                </Link>
                            </div>
                        </div>

                        <div className="relative group">
                            <Link href="/video" className="flex items-center space-x-1 hover:text-gray-300">
                                <span>Video</span>
                                <ChevronDown className="h-4 w-4 opacity-80" />
                            </Link>

                            <div className="absolute top-full left-0 mt-2 bg-black text-white rounded-lg shadow-xl hidden min-w-[200px] z-50 group-hover:block">
                                <Link href="/video" className="block px-6 py-3 hover:bg-gray-800">
                                    <div className="font-semibold">Video home</div>
                                </Link>
                                <Link href="/search?type=premium-video" className="block px-6 py-3 hover:bg-gray-800">
                                    <div className="font-semibold">Premium video</div>
                                </Link>
                                <Link href="/collections?type=video" className="block px-6 py-3 hover:bg-gray-800 rounded-b-lg">
                                    <div className="font-semibold">Collections</div>
                                </Link>
                            </div>
                        </div>

                        <Link href="/search?type=music" className="flex items-center space-x-1 hover:text-gray-300">
                            <span>Music</span>
                            <ChevronDown className="h-4 w-4 opacity-80" />
                        </Link>

                        <Link href="/exclusive-images" className="hover:text-gray-300">
                            <span className="font-medium">Exclusive Images</span>
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Mobile overlay */}
            {mobileOpen && (
                <button
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close overlay"
                />
            )}

            {/* Mobile menu */}
            <aside
                className={`fixed top-0 left-0 h-full w-80 bg-white z-50 shadow-lg overflow-y-auto transform transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <img src="/speciallogo.png" alt="Special Stocks" className="h-8 w-auto" />
                        <button
                            onClick={() => setMobileOpen(false)}
                            className="text-gray-500 hover:text-gray-700 p-2"
                            aria-label="Close menu"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm text-gray-500 mb-4">Browse our assets</p>

                        <Link
                            href="/images"
                            className="flex items-center justify-between py-3 border-b border-gray-100 hover:bg-gray-50 px-2 rounded"
                            onClick={() => setMobileOpen(false)}
                        >
                            <span className="text-gray-900 font-medium">Images</span>
                        </Link>

                        <Link
                            href="/video"
                            className="flex items-center justify-between py-3 border-b border-gray-100 hover:bg-gray-50 px-2 rounded"
                            onClick={() => setMobileOpen(false)}
                        >
                            <span className="text-gray-900 font-medium">Video</span>
                        </Link>

                        <Link
                            href="/search?type=music"
                            className="flex items-center justify-between py-3 border-b border-gray-100 hover:bg-gray-50 px-2 rounded"
                            onClick={() => setMobileOpen(false)}
                        >
                            <span className="text-gray-900 font-medium">Music</span>
                        </Link>

                        <Link
                            href="/exclusive-images"
                            className="flex items-center justify-between py-3 border-b border-gray-100 hover:bg-gray-50 px-2 rounded"
                            onClick={() => setMobileOpen(false)}
                        >
                            <span className="text-gray-900 font-medium">Exclusive Images</span>
                        </Link>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <Link
                            href="/login"
                            className="block w-full bg-gray-100 text-gray-900 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors text-center"
                            onClick={() => setMobileOpen(false)}
                        >
                            Log in
                        </Link>
                    </div>
                </div>
            </aside>
        </>
    );
}
