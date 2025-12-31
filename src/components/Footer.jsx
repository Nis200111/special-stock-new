"use client";

import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    // Assuming SITE_NAME is "Special Stocks" based on context
    return (
        <footer className="bg-[#131313] text-white py-12 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div>
                    <Link href="/" className="flex items-center gap-2 mb-4">
                        <img src="/speciallogo.png" alt="Special Stocks" className="h-8 filter invert" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block' }} />
                        <span className="text-xl font-bold hidden">Special Stocks</span>
                    </Link>
                    <p className="text-gray-400 text-sm">
                        Leading platform for premium stock photos, videos, and creative digital assets.
                    </p>
                </div>

                <div>
                    <h4 className="font-bold mb-4">Content</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><Link href="/images" className="hover:text-white">Images</Link></li>
                        <li><Link href="/video" className="hover:text-white">Video</Link></li>
                        <li><Link href="/music" className="hover:text-white">Music</Link></li>
                        <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-4">Legal</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                        <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                        <li><Link href="/license" className="hover:text-white">License Agreement</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-4">Connect</h4>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white text-xl"><FaFacebook /></a>
                        <a href="#" className="text-gray-400 hover:text-white text-xl"><FaTwitter /></a>
                        <a href="#" className="text-gray-400 hover:text-white text-xl"><FaInstagram /></a>
                        <a href="#" className="text-gray-400 hover:text-white text-xl"><FaLinkedin /></a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Special Stocks. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
