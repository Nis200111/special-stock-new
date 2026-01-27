"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft, Upload, DollarSign, Users, TrendingUp,
    CheckCircle, Camera, Video, FileImage, Shield
} from 'lucide-react';

const BecomeSellerPage = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        experience: '',
        contentType: [],
        termsAccepted: false
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleContentTypeToggle = (type) => {
        setFormData(prev => ({
            ...prev,
            contentType: prev.contentType.includes(type)
                ? prev.contentType.filter(t => t !== type)
                : [...prev.contentType, type]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate
        if (!formData.termsAccepted) {
            alert('Please accept the terms and conditions');
            return;
        }

        try {
            // Here you would send data to backend
            console.log('Seller application:', formData);
            alert('Application submitted successfully! We will review and contact you soon.');
            router.push('/dashboard');
        } catch (error) {
            console.error('Error submitting application:', error);
            alert('Failed to submit application. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.back()}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft size={24} className="text-gray-700" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Become a Seller</h1>
                            <p className="text-sm text-gray-500">Join our marketplace and start earning</p>
                        </div>
                    </div>
                    <Link
                        href="/"
                        className="text-sm font-medium text-gray-600 hover:text-gray-900"
                    >
                        Back to Home
                    </Link>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Benefits */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Why Sell With Us?</h3>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <DollarSign size={20} className="text-green-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm">Earn Money</h4>
                                        <p className="text-xs text-gray-600">Get paid for every download</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Users size={20} className="text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm">Global Reach</h4>
                                        <p className="text-xs text-gray-600">Access to thousands of buyers</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <TrendingUp size={20} className="text-purple-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm">Grow Your Brand</h4>
                                        <p className="text-xs text-gray-600">Build your portfolio online</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Shield size={20} className="text-orange-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm">Protected Rights</h4>
                                        <p className="text-xs text-gray-600">Your content is secure</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-lg">
                            <h3 className="text-lg font-bold mb-4">Platform Stats</h3>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-gray-300 text-xs">Active Sellers</p>
                                    <p className="text-2xl font-bold">500+</p>
                                </div>
                                <div>
                                    <p className="text-gray-300 text-xs">Total Downloads</p>
                                    <p className="text-2xl font-bold">10K+</p>
                                </div>
                                <div>
                                    <p className="text-gray-300 text-xs">Average Earnings</p>
                                    <p className="text-2xl font-bold">$250/mo</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Application Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Seller Application</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Personal Information */}
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Personal Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                placeholder="John Doe"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                placeholder="john@example.com"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Phone Number *
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                placeholder="+1 234 567 8900"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Content Type */}
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">What will you sell?</h3>
                                    <p className="text-sm text-gray-600 mb-4">Select all that apply</p>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <button
                                            type="button"
                                            onClick={() => handleContentTypeToggle('photos')}
                                            className={`p-6 border-2 rounded-xl transition-all ${formData.contentType.includes('photos')
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-300 hover:border-gray-400'
                                                }`}
                                        >
                                            <Camera size={32} className={`mx-auto mb-3 ${formData.contentType.includes('photos') ? 'text-blue-600' : 'text-gray-400'
                                                }`} />
                                            <p className="font-bold text-gray-900">Photos</p>
                                            <p className="text-xs text-gray-600 mt-1">Stock images</p>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleContentTypeToggle('videos')}
                                            className={`p-6 border-2 rounded-xl transition-all ${formData.contentType.includes('videos')
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-300 hover:border-gray-400'
                                                }`}
                                        >
                                            <Video size={32} className={`mx-auto mb-3 ${formData.contentType.includes('videos') ? 'text-blue-600' : 'text-gray-400'
                                                }`} />
                                            <p className="font-bold text-gray-900">Videos</p>
                                            <p className="text-xs text-gray-600 mt-1">Stock footage</p>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleContentTypeToggle('graphics')}
                                            className={`p-6 border-2 rounded-xl transition-all ${formData.contentType.includes('graphics')
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-300 hover:border-gray-400'
                                                }`}
                                        >
                                            <FileImage size={32} className={`mx-auto mb-3 ${formData.contentType.includes('graphics') ? 'text-blue-600' : 'text-gray-400'
                                                }`} />
                                            <p className="font-bold text-gray-900">Graphics</p>
                                            <p className="text-xs text-gray-600 mt-1">Illustrations</p>
                                        </button>
                                    </div>
                                </div>

                                {/* Experience */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Experience Level *
                                    </label>
                                    <select
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    >
                                        <option value="">Select your experience level</option>
                                        <option value="beginner">Beginner (0-1 years)</option>
                                        <option value="intermediate">Intermediate (1-3 years)</option>
                                        <option value="advanced">Advanced (3-5 years)</option>
                                        <option value="expert">Expert (5+ years)</option>
                                    </select>
                                </div>

                                {/* Terms */}
                                <div className="bg-gray-50 rounded-xl p-6">
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="termsAccepted"
                                            checked={formData.termsAccepted}
                                            onChange={handleInputChange}
                                            required
                                            className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-700">
                                            I agree to the{' '}
                                            <Link href="/terms" className="text-blue-600 font-medium hover:underline">
                                                Terms and Conditions
                                            </Link>{' '}
                                            and{' '}
                                            <Link href="/privacy" className="text-blue-600 font-medium hover:underline">
                                                Privacy Policy
                                            </Link>
                                            . I understand that my content will be reviewed before being published.
                                        </span>
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <div className="flex gap-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                    >
                                        <CheckCircle size={24} />
                                        Submit Application
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => router.back()}
                                        className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BecomeSellerPage;
