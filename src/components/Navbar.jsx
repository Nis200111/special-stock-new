"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes, FaGlobe, FaShoppingCart, FaChevronDown } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { navLinks } from "@/data/mockData";

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const user = null; // Mock user state, set to { name: "Thanuja" } to test logged in state

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <>
            <header className="text-white px-4 sm:px-6 py-3 bg-[#131313]">
                <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
                    {/* Mobile Menu Button - Left Side */}
                    <div className="flex lg:hidden items-center">
                        <button
                            onClick={toggleMobileMenu}
                            className="text-white p-2 hover:bg-gray-800 rounded focus:outline-none"
                        >
                            {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                        </button>
                    </div>

                    <div></div>

                    {/* Logo Center */}
                    <div className="flex-grow flex justify-center lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
                        <Link href="/" className="flex items-center gap-2">
                            {/* Replace with actual logo image if available */}
                            <img src="/speciallogo.png" alt="Special Stocks" className="h-8 sm:h-10 filter invert" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block' }} />
                            <span className="text-xl sm:text-2xl lg:text-3xl font-bold hidden">Special Stocks</span>
                        </Link>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        {/* Pricing Dropdown */}
                        <div className="hidden sm:flex items-center space-x-1 hover:text-gray-300 cursor-pointer">
                            <span className="text-sm">Pricing</span>
                            <FaChevronDown className="text-xs" />
                        </div>

                        <FaGlobe className="hover:text-gray-300 cursor-pointer hidden sm:block" />
                        <FiHeart className="hover:text-gray-300 cursor-pointer text-lg hidden sm:flex" />

                        <Link href="/cart">
                            <FaShoppingCart className="hover:text-gray-300 cursor-pointer text-lg" />
                        </Link>

                        {/* Login/Dashboard Button */}
                        {user ? (
                            <Link
                                href="/dashboard"
                                className="bg-white text-black px-3 sm:px-4 py-2 sm:py-2.5 rounded-md font-bold text-sm sm:text-md hover:bg-gray-100 transition-colors hidden sm:flex"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="bg-white text-black px-3 sm:px-4 py-2 sm:py-2.5 rounded-md font-bold text-sm sm:text-md hover:bg-gray-100 transition-colors hidden sm:flex"
                            >
                                Log in
                            </Link>
                        )}
                    </div>
                </div>

                {/* Desktop Navigation Menu */}
                <div className="hidden lg:flex justify-center mt-4">
                    <nav className="flex items-center space-x-6 xl:space-x-8 text-sm relative">
                        <div className="group relative">
                            <Link href="/images" className="flex items-center space-x-1 hover:text-gray-300 cursor-pointer py-2">
                                <span>Images</span>
                                <FaChevronDown className="text-xs" />
                            </Link>
                            {/* Dropdown would go here, simplified for now */}
                        </div>

                        <div className="group relative">
                            <Link href="/video" className="flex items-center space-x-1 hover:text-gray-300 cursor-pointer py-2">
                                <span>Video</span>
                                <FaChevronDown className="text-xs" />
                            </Link>
                        </div>

                        <div className="group relative">
                            <Link href="/music" className="flex items-center space-x-1 hover:text-gray-300 cursor-pointer py-2">
                                <span>Music</span>
                                <FaChevronDown className="text-xs" />
                            </Link>
                        </div>

                        <Link href="/exclusive-images" className="hover:text-gray-300 cursor-pointer font-medium">
                            Exclusive Images
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 flex">
                    <div className="relative flex-1 w-80 max-w-[80%] bg-white h-full shadow-xl overflow-y-auto pl-6 pr-6 pt-6 pb-6 text-black">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-xl font-bold">Menu</span>
                            <button onClick={toggleMobileMenu} className="text-gray-500 hover:text-gray-700">
                                <FaTimes className="text-xl" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="pb-4 border-b border-gray-100">
                                <p className="text-sm text-gray-500 mb-4">Browse our assets</p>
                                {navLinks.map((link) => (
                                    <Link key={link.name} href={link.href} className="block py-3 text-gray-900 border-b border-gray-100 font-medium">
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="pt-4">
                                {user ? (
                                    <Link href="/dashboard" className="block w-full bg-blue-600 text-white py-3 rounded-lg font-medium text-center hover:bg-blue-700">
                                        Dashboard
                                    </Link>
                                ) : (
                                    <div className="space-y-3">
                                        <Link href="/register" className="block w-full bg-red-500 text-white py-3 rounded-lg font-medium text-center hover:bg-red-600">
                                            Sign up
                                        </Link>
                                        <Link href="/login" className="block w-full bg-gray-100 text-gray-900 py-3 rounded-lg font-medium text-center hover:bg-gray-200">
                                            Log in
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-black bg-opacity-50" onClick={toggleMobileMenu}></div>
                </div>
            )}
        </>
    );
};

export default Navbar;
