"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Globe, Heart, ChevronDown } from "lucide-react"
import { FaCartShopping } from "react-icons/fa6";
import IMGLOGO from "../assets/speciallogo.png";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userName, setUserName] = useState(null);
    const [userRole, setUserRole] = useState(null);

    React.useEffect(() => {
        const storedName = localStorage.getItem("userName");
        if (storedName) setUserName(storedName);

        const storedRole = localStorage.getItem("userRole");
        if (storedRole) setUserRole(storedRole);
    }, []);

    return (
        <>

            <header className="text-white px-4 sm:px-6 py-4 bg-[#131313] relative border-b border-white/10">
                <div className="flex flex-col lg:items-center w-full">

                    <div className="flex items-center justify-between w-full mb-2">

                        <div className="flex lg:hidden items-center">
                            <button
                                className="text-white p-2 hover:bg-gray-800 rounded"
                                onClick={() => setMobileOpen(true)}
                                aria-label="Open menu"
                            >
                                <Menu className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="hidden lg:block flex-1" />


                        <div className="flex justify-center">
                            <Link href="/" className="flex items-center">
                                <img
                                    src={IMGLOGO.src}
                                    alt="Special Stocks"
                                    className="max-h-[40px] sm:max-h-[50px] lg:max-h-[60px] w-auto invert"
                                />
                            </Link>
                        </div>


                        <div className="flex-1 flex items-center justify-end gap-x-4 sm:gap-x-5">
                            <div className="hidden sm:flex items-center gap-1 hover:text-gray-300 cursor-pointer">
                                <span className="text-xs lg:text-sm font-bold">Pricing</span>
                                <ChevronDown className="h-3 w-3 lg:h-4 lg:w-4 opacity-80" />
                            </div>

                            <Globe className="h-4 w-4 lg:h-5 lg:w-5 hover:text-gray-300 cursor-pointer hidden sm:block" />
                            <Heart className="h-4 w-4 lg:h-5 lg:w-5 hover:text-gray-300 cursor-pointer hidden sm:block" />

                            <Link href="/cart" aria-label="Cart">
                                <FaCartShopping className="h-4 w-4 lg:h-5 lg:w-5 hover:text-gray-300 cursor-pointer" />
                            </Link>

                            {userName ? (
                                <Link
                                    href={userRole === 'admin' ? '/dashboard' : userRole === 'seller' ? '/seller-dashboard' : '/dashboard'}
                                    className="bg-white text-black px-4 lg:px-6 py-1.5 lg:py-2 rounded-lg font-bold text-xs lg:text-sm hover:bg-gray-100 transition-colors hidden sm:flex"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href="/login"
                                    className="bg-white text-black px-4 lg:px-6 py-1.5 lg:py-2 rounded-lg font-bold text-xs lg:text-sm hover:bg-gray-100 transition-colors hidden sm:flex"
                                >
                                    Log in
                                </Link>
                            )}
                        </div>
                    </div>


                    <div className="hidden lg:flex justify-center mt-1">
                        <nav className="flex items-center space-x-6 xl:space-x-8 text-[13px] relative">
                            <div className="relative group py-1">
                                <Link href="/images" className="flex items-center space-x-1 hover:text-gray-300">
                                    <span>Images</span>
                                    <ChevronDown className="h-3 w-3 opacity-80" />
                                </Link>

                            </div>

                            <div className="relative group py-1">
                                <Link href="/video" className="flex items-center space-x-1 hover:text-gray-300">
                                    <span>Video</span>
                                    <ChevronDown className="h-3 w-3 opacity-80" />
                                </Link>
                            </div>

                            <Link href="/search?type=music" className="flex items-center space-x-1 hover:text-gray-300 py-1">
                                <span>Music</span>
                                <ChevronDown className="h-3 w-3 opacity-80" />
                            </Link>

                            <Link href="/exclusiveImages" className="hover:text-gray-300 py-1">
                                <span className="font-medium">Exclusive Images</span>
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Mobile menu logic stays same as your original code */}
            {/* ... rest of the code ... */}
        </>
    );
}