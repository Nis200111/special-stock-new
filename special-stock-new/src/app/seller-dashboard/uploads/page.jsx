"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft, Upload, Image as ImageIcon, Download, Edit, Trash2, Eye, DollarSign, Tag
} from 'lucide-react';
import ConfirmationModal from '@/components/ui/ConfirmationModal';
import { deleteItem } from '@/app/actions/itemActions';
import SellerSidebar from "@/components/seller/SellerSidebar";


const MyUploadsPage = () => {
    const router = useRouter();
    const [uploads, setUploads] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentUser, setCurrentUser] = useState(null);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                const storedRole = localStorage.getItem('userRole');
                if (!user.role && storedRole) {
                    user.role = storedRole;
                }
                setCurrentUser(user);
            } catch (e) {
                console.error('Error parsing user:', e);
            }
        }
        fetchUploads();
    }, []);

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        try {
            const token = localStorage.getItem("token");
            const role = localStorage.getItem("userRole");
            const user = JSON.parse(localStorage.getItem("user") || "{}");

            if (!token) {
                router.push("/login");
                return;
            }

            if (role !== "seller") {
                router.push("/seller");
                return;
            }

            setUserData(user);
        } catch (e) {
            router.push("/login");
        }
    }, [router]);


    const fetchUploads = async () => {
        try {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user') || '{}');

            if (!user.id) {
                throw new Error('User session invalid. Please log in again.');
            }

            const response = await fetch(`http://localhost:5000/api/seller/my-images/${user.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch uploads');
            }

            setUploads(data.data || []);
        } catch (err) {
            console.error('Error fetching uploads:', err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownload = async (filename) => {
        window.open(`http://localhost:5000/api/seller/download/${filename}`, '_blank');
    };

    const handleOpenDeleteModal = (upload) => {
        setSelectedItem(upload);
        setIsModalOpen(true);
    };

    const handleRemoveSuccess = () => {
        // Refresh the list locally
        setUploads(prev => prev.filter(item => item.id !== selectedItem?.id));
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("user");
        localStorage.removeItem("userName");

        document.cookie = "token=; path=/; max-age=0";
        document.cookie = "userRole=; path=/; max-age=0";

        router.push("/login");
    };


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <SellerSidebar userData={userData} onLogout={handleLogout} />

            {/* ✅ Main Area */}
            <div className="ml-64">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">My Uploads</h1>
                                <p className="text-sm text-gray-500">View and manage your uploaded images</p>
                            </div>
                        </div>

                        <Link
                            href="/seller-dashboard/upload"
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg"
                        >
                            <Upload size={20} />
                            Upload New
                        </Link>
                    </div>
                </header>

                {/* Content */}
                <div className="max-w-7xl mx-auto px-6 py-8">
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                            <p className="text-red-900">{error}</p>
                        </div>
                    )}

                    {isLoading ? (
                        <div className="text-center py-12">
                            <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-gray-600">Loading your uploads...</p>
                        </div>
                    ) : uploads.length === 0 ? (
                        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-200">
                            <ImageIcon size={64} className="mx-auto text-gray-300 mb-6" />
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">No uploads yet</h2>
                            <p className="text-gray-600 mb-8">Start sharing your creative work with buyers</p>
                            <Link
                                href="/seller-dashboard/upload"
                                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg"
                            >
                                <Upload size={24} />
                                Upload Your First Image
                            </Link>
                        </div>
                    ) : (
                        <>
                            {/* Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                                    <p className="text-sm text-gray-600 mb-1">Total Uploads</p>
                                    <p className="text-3xl font-black text-gray-900">{uploads.length}</p>
                                </div>
                                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                                    <p className="text-sm text-gray-600 mb-1">Total Views</p>
                                    <p className="text-3xl font-black text-blue-600">0</p>
                                </div>
                                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                                    <p className="text-sm text-gray-600 mb-1">Total Sales</p>
                                    <p className="text-3xl font-black text-green-600">0</p>
                                </div>
                                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                                    <p className="text-sm text-gray-600 mb-1">Total Earnings</p>
                                    <p className="text-3xl font-black text-purple-600">$0.00</p>
                                </div>
                            </div>

                            {/* Images Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {uploads.map((upload) => (
                                    <div
                                        key={upload.id}
                                        className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-shadow"
                                    >
                                        {/* Image */}
                                        <div className="relative h-48 bg-gray-100">
                                            <img
                                                src={`http://localhost:5000${upload.thumbnailPath || upload.watermarkedFilepath || upload.filepath}`}
                                                alt={upload.title}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.src = "https://via.placeholder.com/400x300?text=Image";
                                                }}
                                            />
                                            <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                                ${upload.price}
                                            </div>
                                            <div
                                                className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${upload.status === "approved"
                                                    ? "bg-green-100 text-green-800"
                                                    : upload.status === "rejected"
                                                        ? "bg-red-100 text-red-800"
                                                        : "bg-yellow-100 text-yellow-800"
                                                    }`}
                                            >
                                                {upload.status ? upload.status.toUpperCase() : "PENDING"}
                                            </div>
                                        </div>

                                        {/* Details */}
                                        <div className="p-5">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{upload.title}</h3>
                                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{upload.description || "No description"}</p>

                                            <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <Tag size={14} />
                                                    {upload.category}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Eye size={14} />0 views
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleDownload(upload.filename)}
                                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                                                >
                                                    <Download size={16} />
                                                    Download
                                                </button>
                                                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleOpenDeleteModal(upload)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                                                    title="Remove Item"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Modal */}
                {selectedItem && (
                    <ConfirmationModal
                        isOpen={isModalOpen}
                        onClose={() => {
                            setIsModalOpen(false);
                            setSelectedItem(null);
                        }}
                        itemId={selectedItem.id}
                        itemTitle={selectedItem.title}
                        sellerId={currentUser?.id}
                        userRole={currentUser?.role}
                        redirectPath={null}
                        onSuccess={handleRemoveSuccess}
                    />
                )}
            </div>
        </div>
    );

};

export default MyUploadsPage;
