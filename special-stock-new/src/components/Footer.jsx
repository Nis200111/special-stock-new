"use client";

import React from "react";
import Link from "next/link";
import { Globe, ChevronDown } from "lucide-react";
import IMGLOGO from "../assets/speciallogo.png";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-black text-gray-300 pt-12 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Top Text Section */}
                <p className="text-center text-sm text-gray-400 mb-10 border-b border-gray-700 pb-6 tracking-wider">
                    We have more than 35 assets on Special Stocks.com as of January 9, 2026.
                </p>

                {/* Main Grid Section */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-sm">

                    {/* Column 1: Logo, Language & Contact */}
                    <div className="col-span-2 md:col-span-1">
                        <div className="mb-6">
                            <Link href="/">
                                <img
                                    src={IMGLOGO.src}
                                    alt="Stock Media"
                                    className="max-h-[42px] w-auto invert"
                                />
                            </Link>
                        </div>

                        <button className="flex items-center gap-2 border border-gray-600 px-3 py-1 rounded bg-black text-white mb-8 hover:border-gray-400 transition">
                            <Globe className="h-4 w-4" /> English
                            <ChevronDown className="h-4 w-4" />
                        </button>

                        <div>
                            <h4 className="text-white font-bold mb-3">Contact us</h4>
                            <ul className="space-y-2">
                                <li><Link href="#" className="hover:underline text-gray-400 hover:text-white">Help center</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Column 2: Our Company */}
                    <div>
                        <h4 className="text-white font-bold mb-4">Our company</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link href="#" className="hover:underline hover:text-white">About us</Link></li>
                            <li><Link href="#" className="hover:underline hover:text-white">Careers</Link></li>
                            <li><Link href="#" className="hover:underline hover:text-white">Press/media</Link></li>
                            <li><Link href="#" className="hover:underline hover:text-white">Investor relations</Link></li>
                            <li><Link href="#" className="hover:underline hover:text-white">Special Stocks blog</Link></li>
                            <li><Link href="#" className="hover:underline hover:text-white">Coupons</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Browse */}
                    <div>
                        <h4 className="text-white font-bold mb-4">Browse</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link href="/images" className="hover:underline hover:text-white">Images</Link></li>
                            <li><Link href="/video" className="hover:underline hover:text-white">Videos</Link></li>
                            <li><Link href="#" className="hover:underline hover:text-white">Advanced Search</Link></li>
                            <li><Link href="#" className="hover:underline hover:text-white">Free Assets</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Products and services */}
                    <div>
                        <h4 className="text-white font-bold mb-4">Products and services</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link href="/images" className="hover:underline hover:text-white">Images</Link></li>
                            <li><Link href="/video" className="hover:underline hover:text-white">Video</Link></li>
                            <li><Link href="#" className="hover:underline hover:text-white">Music</Link></li>
                            <li><Link href="#" className="hover:underline hover:text-white">Editorial</Link></li>
                            <li><Link href="#" className="hover:underline hover:text-white">3D</Link></li>
                            <li><Link href="#" className="hover:underline hover:text-white">AI solutions</Link></li>
                        </ul>
                    </div>

                    {/* Column 5: Legal */}
                    <div>
                        <h4 className="text-white font-bold mb-4">Legal</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link href="#" className="hover:underline hover:text-white">Website terms of use</Link></li>
                            <li><Link href="#" className="hover:underline hover:text-white">Terms of service</Link></li>
                            <li><Link href="#" className="hover:underline hover:text-white">Privacy policy</Link></li>
                            <li><Link href="#" className="hover:underline hover:text-white">Modern slavery statement</Link></li>
                            <li><Link href="#" className="hover:underline hover:text-white">Patents</Link></li>
                            <li><Link href="#" className="hover:underline hover:text-white">Cookie preferences</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Footer Section */}
                <div className="mt-16 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 border-t border-gray-800 pt-8 pb-8">
                    <p className="mb-4 md:mb-0">© 2026 Special Stocks, Inc. All rights reserved.</p>

                    <div className="flex gap-6 text-xl">
                        <a href="https://www.facebook.com/Specialstocks" target="_blank" className="hover:text-white transition"><FaFacebook /></a>
                        <a href="https://www.instagram.com/special_stocks/" target="_blank" className="hover:text-white transition"><FaInstagram /></a>
                        <a href="https://www.linkedin.com/company/109615206" target="_blank" className="hover:text-white transition"><FaLinkedin /></a>
                        <a href="http://www.youtube.com/@SpecialStocks" target="_blank" className="hover:text-white transition"><FaYoutube /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
