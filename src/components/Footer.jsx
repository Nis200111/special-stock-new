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
                <p className="text-center text-sm text-gray-400 mb-10 border-b border-gray-700 pb-6 tracking-wider">
                    Access exclusive premium content available only to registered users.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 text-sm">
                    <div className="col-span-2">
                        <div className="mb-6">
                            <Link href="/">
                                <img
                                    src={IMGLOGO.src}
                                    alt="Stock Media"
                                    className="max-h-[42px] w-auto invert"
                                />
                            </Link>
                        </div>

                        <button className="flex items-center gap-2 border px-3 py-1 rounded bg-black text-white">
                            <Globe className="h-4 w-4" /> English
                            <ChevronDown className="h-4 w-4" />
                        </button>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-3">Our company</h4>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:underline">About us</Link></li>
                            <li><Link href="#" className="hover:underline">Careers</Link></li>
                            <li><Link href="#" className="hover:underline">Press/media</Link></li>
                            <li><Link href="#" className="hover:underline">Blog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-3">Products</h4>
                        <ul className="space-y-2">
                            <li><Link href="/images" className="hover:underline">Images</Link></li>
                            <li><Link href="/video" className="hover:underline">Video</Link></li>
                            <li><Link href="/exclusive-images" className="hover:underline text-purple-400">Exclusive</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-2">Legal</h4>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:underline">Terms of service</Link></li>
                            <li><Link href="#" className="hover:underline">Privacy policy</Link></li>
                            <li><Link href="#" className="hover:underline">Cookie preferences</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-3">Contact us</h4>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:underline">Help center</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 border-t border-gray-700 pt-6">
                    <p className="mb-3">© 2025 Stock Media Platform. All rights reserved.</p>

                    <div className="flex gap-4 text-sm mt-4 md:mt-0 mb-5">
                        <a href="https://www.facebook.com/Specialstocks" className="hover:text-white"><FaFacebook className="w-4.5 h-4.5" /></a>
                        <a href="https://www.instagram.com/special_stocks/" className="hover:text-white"><FaInstagram className="w-4.5 h-4.5" /></a>
                        <a href="https://www.linkedin.com/company/109615206" className="hover:text-white"><FaLinkedin className="w-4.5 h-4.5" /></a>
                        <a href="http://www.youtube.com/@SpecialStocks" className="hover:text-white"><FaYoutube className="w-4.5 h-4.5" /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
