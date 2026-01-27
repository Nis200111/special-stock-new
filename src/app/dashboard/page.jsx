"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    LayoutDashboard, Users, Image as LucideImage, Box,
    Layers, LogOut, Search, Bell, AlertTriangle, UserCircle, CheckCircle, XCircle, UserPlus
} from 'lucide-react';

// Sidebar Item Component
const SidebarItem = ({ href, icon, label, active = false }) => (
    <Link
        href={href}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active
            ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
            : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
    >
        {icon}
        <span className="font-medium">{label}</span>
    </Link>
);

const AdminDashboard = () => {
    const router = useRouter();
    const [userName, setUserName] = useState('User');
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const [uploadedImages, setUploadedImages] = useState([]);

    useEffect(() => {
        const storedRole = localStorage.getItem("userRole");
        const storedName = localStorage.getItem("userName");
        if (storedName) setUserName(storedName);

        // Redirect buyers to buyer dashboard
        if (storedRole === 'buyer') {
            router.push('/buyer-dashboard');
        }

        // Load uploaded images from localStorage
        const storedImages = localStorage.getItem('uploadedImages');
        if (storedImages) {
            try {
                setUploadedImages(JSON.parse(storedImages));
            } catch (e) {
                console.error('Error loading images:', e);
            }
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("userName");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("userRole");
        router.push("/login");
    };

    // Image upload handlers
    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
            setUploadError('');
            setUploadSuccess(false);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
            setUploadError('');
            setUploadSuccess(false);
        }
    };

    const handleClearFile = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        setUploadError('');
        setUploadSuccess(false);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        setIsUploading(true);
        setUploadError('');
        setUploadSuccess(false);

        try {
            const formData = new FormData();
            formData.append('image', selectedFile);
            formData.append('title', selectedFile.name.split('.')[0]);
            formData.append('uploadedBy', userName);

            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:5000/api/images/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Upload failed');
            }

            const data = await response.json();
            console.log('Upload successful:', data);

            // Success!
            setUploadSuccess(true);

            // Add to uploaded images list
            const newImage = {
                id: Date.now(),
                name: selectedFile.name,
                size: selectedFile.size,
                uploadDate: new Date().toISOString(),
                preview: previewUrl
            };

            const updatedImages = [newImage, ...uploadedImages];
            setUploadedImages(updatedImages);
            localStorage.setItem('uploadedImages', JSON.stringify(updatedImages));

            // Clear form after 2 seconds
            setTimeout(() => {
                handleClearFile();
                setUploadSuccess(false);
            }, 2000);

        } catch (error) {
            console.error('Upload error:', error);
            setUploadError(error.message || 'Failed to upload image. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Left Sidebar */}
            <aside className="w-64 bg-gray-900 text-white flex flex-col fixed h-screen">
                {/* Logo */}
                <div className="flex items-center gap-3 p-6 border-b border-gray-800">
                    <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                        <Layers className="text-white" size={24} />
                    </div>
                    <span className="text-xl font-bold">Special Stocks</span>
                </div>

                {/* Menu */}
                <div className="flex-1 px-4 py-6">
                    <p className="text-xs text-gray-500 font-bold uppercase mb-4 px-4">MENU</p>
                    <div className="space-y-1">
                        <SidebarItem href="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" active />
                        <SidebarItem href="/profile" icon={<UserCircle size={20} />} label="Profile" />
                        <SidebarItem href="/content" icon={<Box size={20} />} label="Content" />
                        <SidebarItem href="/gallery" icon={<LucideImage size={20} />} label="Gallery" />
                        <SidebarItem href="/exclusive" icon={<Layers size={20} />} label="Exclusive" />
                    </div>
                </div>

                {/* User Section at Bottom */}
                <div className="p-4 border-t border-gray-800">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg">{userName.charAt(0).toUpperCase()}</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-white">{userName}</p>
                            <p className="text-xs text-gray-400">Admin Account</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-red-600 text-white px-3 py-2 rounded-lg cursor-pointer hover:bg-red-700">
                        <AlertTriangle size={16} />
                        <span className="text-sm font-bold">1 Issue</span>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 bg-gray-50">
                {/* Top Header */}
                <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                            <p className="text-sm text-gray-500 mt-1">Welcome back, {userName}!</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm w-80 text-gray-700 focus:ring-2 focus:ring-red-500/20 outline-none"
                                />
                            </div>
                            <button className="p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-100 relative">
                                <Bell size={20} />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all"
                            >
                                <LogOut size={18} />
                                <span className="font-medium">Logout</span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="p-8 space-y-6">
                    {/* Success/Error Notifications */}
                    {uploadSuccess && (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-5 flex items-center gap-4 animate-fadeIn">
                            <CheckCircle size={24} className="text-green-600" />
                            <div>
                                <h3 className="text-green-900 font-bold">Upload Successful!</h3>
                                <p className="text-green-700 text-sm">Your image has been uploaded successfully.</p>
                            </div>
                        </div>
                    )}

                    {uploadError && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-5 flex items-center gap-4">
                            <XCircle size={24} className="text-red-600" />
                            <div>
                                <h3 className="text-red-900 font-bold">Upload Failed</h3>
                                <p className="text-red-700 text-sm">{uploadError}</p>
                            </div>
                        </div>
                    )}

                    {/* Alert Banner */}
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center">
                                <AlertTriangle size={24} />
                            </div>
                            <div>
                                <h3 className="text-amber-900 font-bold text-base">1 item(s) awaiting review</h3>
                                <p className="text-amber-700 text-sm">1 regular assets + 0 exclusive images</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Link
                                href="/dashboard/manage-sellers"
                                className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
                            >
                                <Users size={20} />
                                Manage Sellers
                            </Link>
                            <Link
                                href="/dashboard/add-seller"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
                            >
                                <UserPlus size={20} />
                                Add Seller
                            </Link>
                        </div>
                    </div>

                    {/* Upload New Image Section */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                                <LucideImage size={18} className="text-red-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Upload New Image</h3>
                        </div>

                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`border-2 border-dashed rounded-xl p-12 transition-all ${isDragging
                                ? 'border-red-500 bg-red-50'
                                : 'border-gray-300 bg-gray-50'
                                }`}
                        >
                            {!previewUrl ? (
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <LucideImage size={32} className="text-white" />
                                    </div>
                                    <h4 className="text-base font-bold text-gray-900 mb-2">
                                        Drag and drop your image here
                                    </h4>
                                    <p className="text-sm text-gray-500 mb-6">
                                        or click the button below to browse
                                    </p>
                                    <label className="inline-block">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileSelect}
                                            className="hidden"
                                        />
                                        <span className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold cursor-pointer transition-all inline-block">
                                            Choose Image
                                        </span>
                                    </label>
                                    <p className="text-xs text-gray-400 mt-4">
                                        Supported formats: JPG, PNG, GIF, WebP
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="relative rounded-xl overflow-hidden max-w-md mx-auto border-2 border-gray-200">
                                        <img
                                            src={previewUrl}
                                            alt="Preview"
                                            className="w-full h-auto"
                                        />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-bold text-gray-900 mb-1">
                                            {selectedFile?.name}
                                        </p>
                                        <p className="text-xs text-gray-500 mb-4">
                                            {(selectedFile?.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                        <div className="flex gap-3 justify-center">
                                            <button
                                                onClick={handleUpload}
                                                disabled={isUploading}
                                                className={`px-6 py-2 rounded-xl font-bold transition-all ${isUploading
                                                    ? 'bg-gray-400 text-white cursor-not-allowed'
                                                    : 'bg-green-600 hover:bg-green-700 text-white'
                                                    }`}
                                            >
                                                {isUploading ? 'Uploading...' : 'Upload Image'}
                                            </button>
                                            <button
                                                onClick={handleClearFile}
                                                disabled={isUploading}
                                                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-xl font-bold transition-all disabled:opacity-50"
                                            >
                                                Clear
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Pending Review */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                                    <AlertTriangle size={24} className="text-amber-600" />
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">Pending Review</p>
                            <p className="text-3xl font-bold text-gray-900">1</p>
                        </div>

                        {/* Exclusive Pending */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                    <LucideImage size={24} className="text-purple-600" />
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">Exclusive Pending</p>
                            <p className="text-3xl font-bold text-gray-900">0</p>
                        </div>

                        {/* Total Users */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                                    <Users size={24} className="text-white" />
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">Total Users</p>
                            <p className="text-3xl font-bold text-gray-900">14</p>
                        </div>

                        {/* Total Uploaded */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                    <CheckCircle size={24} className="text-green-600" />
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">Total Uploaded</p>
                            <p className="text-3xl font-bold text-gray-900">{uploadedImages.length}</p>
                        </div>
                    </div>

                    {/* Recently Uploaded Images */}
                    {uploadedImages.length > 0 && (
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Recently Uploaded ({uploadedImages.length})</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                {uploadedImages.slice(0, 8).map((img) => (
                                    <div key={img.id} className="group relative aspect-square rounded-xl overflow-hidden border-2 border-gray-200 hover:border-red-500 transition-all">
                                        <img
                                            src={img.preview}
                                            alt={img.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <div className="text-center text-white p-2">
                                                <p className="text-xs font-bold truncate">{img.name}</p>
                                                <p className="text-xs">{(img.size / 1024 / 1024).toFixed(2)} MB</p>
                                            </div>
                                        </div>
                                        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                                            <CheckCircle size={14} className="inline" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;