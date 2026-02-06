"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Store, ArrowRight, CheckCircle, Upload, TrendingUp, Shield, Users, DollarSign
} from 'lucide-react';

const BecomeSellerPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isActivating, setIsActivating] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        checkUserStatus();
    }, []);

    const checkUserStatus = async () => {
        try {
            const token = localStorage.getItem('token');
            const storedRole = localStorage.getItem('userRole');
            const storedName = localStorage.getItem('userName');

            if (!token) {
                router.push('/login');
                return;
            }

            setUserRole(storedRole || 'buyer');
            setUserName(storedName || 'User');

            // If already a seller, redirect directly
            if (storedRole === 'seller') {
                setTimeout(() => {
                    router.push('/seller-dashboard');
                }, 1000);
            }
        } catch (err) {
            console.error('Error checking user status:', err);
            setError('Failed to verify user status');
        } finally {
            setIsLoading(false);
        }
    };

    const handleActivateSeller = async () => {
        setIsActivating(true);
        setError('');

        try {
            const token = localStorage.getItem('token');
            const userEmail = JSON.parse(localStorage.getItem('user') || '{}').email;

            // Call backend to verify seller role
            const response = await fetch('http://localhost:5000/api/seller/verify-and-activate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ email: userEmail })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Activation failed');
            }

            // Update localStorage with seller role
            localStorage.setItem('userRole', 'seller');

            // Redirect to seller dashboard
            setTimeout(() => {
                router.push('/seller-dashboard');
            }, 1500);

        } catch (err) {
            console.error('Activation error:', err);
            setError(err.message || 'You do not have seller privileges. Please contact admin.');
        } finally {
            setIsActivating(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // If already a seller, show redirecting message
    if (userRole === 'seller') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center bg-white p-12 rounded-2xl shadow-lg border border-gray-200 max-w-md">
                    <CheckCircle size={64} className="mx-auto text-green-600 mb-6" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">You're Already a Seller!</h2>
                    <p className="text-gray-600 mb-6">Redirecting to your seller dashboard...</p>
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <Store size={32} className="text-blue-600" />
                        <span className="text-xl font-bold text-gray-900">Special Stocks</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <p className="text-sm text-gray-600">Welcome, <span className="font-bold">{userName}</span></p>
                        <Link
                            href="/buyer-dashboard"
                            className="text-sm text-gray-600 hover:text-gray-900"
                        >
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 py-16">
                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-8 max-w-2xl mx-auto">
                        <p className="text-red-900 font-medium">{error}</p>
                    </div>
                )}

                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="inline-block p-4 bg-blue-100 rounded-full mb-6">
                        <Store size={48} className="text-blue-600" />
                    </div>
                    <h1 className="text-5xl font-black text-gray-900 mb-6">
                        Become a Seller
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                        Join our marketplace and start earning by selling your digital content to thousands of buyers worldwide.
                    </p>
                    <button
                        onClick={handleActivateSeller}
                        disabled={isActivating}
                        className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-2xl ${isActivating
                                ? 'bg-gray-400 text-white cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:shadow-3xl transform hover:scale-105'
                            }`}
                    >
                        {isActivating ? (
                            <>
                                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Activating Your Seller Account...
                            </>
                        ) : (
                            <>
                                <Store size={24} />
                                Activate Seller Dashboard
                                <ArrowRight size={24} />
                            </>
                        )}
                    </button>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    <BenefitCard
                        icon={<Upload size={32} />}
                        iconBg="bg-blue-100"
                        iconColor="text-blue-600"
                        title="Easy Uploads"
                        description="Upload your content in minutes with our simple interface"
                    />
                    <BenefitCard
                        icon={<DollarSign size={32} />}
                        iconBg="bg-green-100"
                        iconColor="text-green-600"
                        title="Earn Money"
                        description="Get paid for every download and sale of your content"
                    />
                    <BenefitCard
                        icon={<Users size={32} />}
                        iconBg="bg-purple-100"
                        iconColor="text-purple-600"
                        title="Global Reach"
                        description="Access thousands of potential buyers worldwide"
                    />
                    <BenefitCard
                        icon={<Shield size={32} />}
                        iconBg="bg-orange-100"
                        iconColor="text-orange-600"
                        title="Protected Rights"
                        description="Your content is secure and copyright protected"
                    />
                </div>

                {/* Features List */}
                <div className="bg-white rounded-2xl p-10 shadow-xl border border-gray-200 max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">What You Get as a Seller</h2>
                    <div className="space-y-4">
                        <FeatureItem text="Personal seller dashboard with analytics" />
                        <FeatureItem text="Upload unlimited images, videos, and files" />
                        <FeatureItem text="Set your own prices and manage your content" />
                        <FeatureItem text="Track your earnings and download statistics" />
                        <FeatureItem text="Get paid monthly via secure payment methods" />
                        <FeatureItem text="24/7 seller support and assistance" />
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center mt-16">
                    <p className="text-gray-600 mb-4">
                        Already activated?
                        <Link href="/seller-dashboard" className="text-blue-600 font-bold hover:underline ml-2">
                            Go to Seller Dashboard
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

// Sub-components
const BenefitCard = ({ icon, iconBg, iconColor, title, description }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
        <div className={`w-16 h-16 ${iconBg} rounded-xl flex items-center justify-center mb-4 ${iconColor}`}>
            {icon}
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
    </div>
);

const FeatureItem = ({ text }) => (
    <div className="flex items-center gap-3">
        <CheckCircle size={24} className="text-green-600 flex-shrink-0" />
        <p className="text-gray-700">{text}</p>
    </div>
);

export default BecomeSellerPage;
