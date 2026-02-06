"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Package, DollarSign, CheckCircle, Image as LucideImage, Search, ShoppingCart } from 'lucide-react';

const BuyerDashboardPage = () => {
    const router = useRouter();
    const [userName, setUserName] = useState('nisansala rasanjali');
    const [userEmail, setUserEmail] = useState('nisansalarasanjali512@gmail.com');

    useEffect(() => {
        const storedName = localStorage.getItem("userName");
        const storedUser = localStorage.getItem("user");
        const storedRole = localStorage.getItem("userRole");

        if (storedName) setUserName(storedName);

        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                if (user.email) setUserEmail(user.email);
            } catch (e) {
                console.error("Error parsing user data:", e);
            }
        }

        // Redirect admins to admin dashboard
        if (storedRole === 'admin') {
            router.push('/dashboard');
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("userName");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("userRole");
        router.push("/logout");
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navigation Bar */}
            <nav className="bg-white border-b border-gray-200 px-8 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <h1 className="text-2xl font-bold text-gray-900">Special Stocks</h1>
                        <div className="flex items-center gap-6">
                            <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                                Gallery
                            </Link>
                            <Link href="/search" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                                Search
                            </Link>
                            <Link href="/cart" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                                Cart
                            </Link>
                            <Link href="/buyer-dashboard" className="text-gray-900 font-bold border-b-2 border-gray-900 pb-1">
                                Dashboard
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">Welcome, <span className="font-semibold text-gray-900">{userName}</span></span>
                        <button
                            onClick={handleLogout}
                            className="px-6 py-2 border-2 border-gray-900 text-gray-900 rounded font-bold hover:bg-gray-900 hover:text-white transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Buyer Dashboard</h2>
                    <p className="text-blue-600 text-sm">Manage your purchases and account settings</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Total Purchases */}
                    <div className="bg-white border-2 border-gray-900 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-xs font-medium mb-2 uppercase">Total Purchases</p>
                                <p className="text-4xl font-bold text-gray-900">0</p>
                            </div>
                            <div className="w-12 h-12 bg-gray-900 rounded flex items-center justify-center">
                                <Package size={24} className="text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Total Spent */}
                    <div className="bg-white border-2 border-gray-900 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-xs font-medium mb-2 uppercase">Total Spent</p>
                                <p className="text-4xl font-bold text-gray-900">$0.00</p>
                            </div>
                            <div className="w-12 h-12 bg-gray-900 rounded flex items-center justify-center">
                                <DollarSign size={24} className="text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Account Status */}
                    <div className="bg-white border-2 border-gray-900 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-xs font-medium mb-2 uppercase">Account Status</p>
                                <p className="text-4xl font-bold text-gray-900">Active</p>
                            </div>
                            <div className="w-12 h-12 bg-gray-900 rounded flex items-center justify-center">
                                <CheckCircle size={24} className="text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Recent Purchases */}
                    <div className="bg-white border-2 border-gray-900 rounded-lg">
                        <div className="border-b-2 border-gray-900 px-6 py-4">
                            <h3 className="text-lg font-bold text-gray-900">Recent Purchases</h3>
                        </div>
                        <div className="p-12 text-center">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ShoppingCart size={40} className="text-gray-400" />
                            </div>
                            <p className="text-gray-900 font-bold mb-2">No purchases yet</p>
                            <p className="text-gray-600 text-sm mb-6">Start browsing our gallery to find amazing stock media.</p>
                            <Link href="/" className="inline-block bg-gray-900 text-white px-8 py-2.5 rounded font-bold hover:bg-gray-800 transition-colors">
                                Browse Gallery
                            </Link>
                        </div>
                    </div>

                    {/* Account Information */}
                    <div className="bg-white border-2 border-gray-900 rounded-lg">
                        <div className="border-b-2 border-gray-900 px-6 py-4">
                            <h3 className="text-lg font-bold text-gray-900">Account Information</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <p className="text-sm text-gray-600 font-semibold mb-1">Full Name</p>
                                <p className="text-blue-600 font-medium">{userName}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 font-semibold mb-1">Email Address</p>
                                <p className="text-blue-600 font-medium">{userEmail}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 font-semibold mb-1">Account Type</p>
                                <p className="text-gray-900 font-medium">Buyer</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 font-semibold mb-1">Member Since</p>
                                <p className="text-gray-900 font-medium">Jan 26, 2026</p>
                            </div>
                            <div className="pt-4">
                                <Link href="/profile" className="inline-block border-2 border-blue-600 text-blue-600 px-6 py-2 rounded font-bold hover:bg-blue-600 hover:text-white transition-colors">
                                    Edit Profile
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link href="/" className="bg-white border-2 border-gray-900 rounded-lg p-6 flex items-center gap-4 hover:bg-gray-50 transition-colors group">
                            <div className="w-10 h-10 bg-white border-2 border-gray-900 rounded flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                                <LucideImage size={20} className="text-gray-900 group-hover:text-white" />
                            </div>
                            <span className="text-gray-900 font-bold text-base">Browse Gallery</span>
                        </Link>

                        <Link href="/search" className="bg-white border-2 border-gray-900 rounded-lg p-6 flex items-center gap-4 hover:bg-gray-50 transition-colors group">
                            <div className="w-10 h-10 bg-white border-2 border-gray-900 rounded flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                                <Search size={20} className="text-gray-900 group-hover:text-white" />
                            </div>
                            <span className="text-gray-900 font-bold text-base">Search Assets</span>
                        </Link>

                        <Link href="/cart" className="bg-white border-2 border-gray-900 rounded-lg p-6 flex items-center gap-4 hover:bg-gray-50 transition-colors group">
                            <div className="w-10 h-10 bg-white border-2 border-gray-900 rounded flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                                <ShoppingCart size={20} className="text-gray-900 group-hover:text-white" />
                            </div>
                            <span className="text-gray-900 font-bold text-base">View Cart</span>
                        </Link>
                    </div>
                </div>

                {/* Become a Seller Section */}
                <div className="bg-blue-50 border-2 border-blue-100 rounded-lg p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Interested in <span className="text-blue-600">Selling</span>?
                    </h3>
                    <p className="text-gray-700 mb-4 text-sm">
                        Join our marketplace as a seller and start monetizing your creative work. Upload your photos and videos to reach thousands of potential buyers.
                    </p>
                    <Link href="/become-seller" className="inline-block bg-gray-900 text-white px-8 py-2.5 rounded font-bold hover:bg-gray-800 transition-colors">
                        Become a Seller →
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-12 py-6">
                <div className="max-w-7xl mx-auto px-8 text-center">
                    <p className="text-gray-600 text-sm">© 2026 Special Stocks. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default BuyerDashboardPage;
