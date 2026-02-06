"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft, UserPlus, Edit, Trash2, Search, CheckCircle, XCircle, AlertCircle
} from 'lucide-react';

const ManageSellersPage = () => {
    const router = useRouter();
    const [sellers, setSellers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        // Check if user is admin
        const userRole = localStorage.getItem('userRole');
        if (userRole !== 'admin') {
            router.push('/login');
            return;
        }

        fetchSellers();
    }, [router]);

    const fetchSellers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/admin/sellers', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch sellers');
            }

            setSellers(data.sellers || []);
        } catch (err) {
            console.error('Error fetching sellers:', err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (sellerId, sellerName) => {
        if (!deleteConfirm || deleteConfirm !== sellerId) {
            setDeleteConfirm(sellerId);
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/admin/sellers/${sellerId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to delete seller');
            }

            setSuccessMessage(`Seller "${sellerName}" deleted successfully`);
            setDeleteConfirm(null);
            fetchSellers(); // Refresh list

            // Clear success message after 3 seconds
            setTimeout(() => setSuccessMessage(''), 3000);

        } catch (err) {
            console.error('Error deleting seller:', err);
            setError(err.message);
        }
    };

    const filteredSellers = sellers.filter(seller =>
        seller.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seller.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seller.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/dashboard"
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft size={24} className="text-gray-700" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Manage Sellers</h1>
                            <p className="text-sm text-gray-500">View and manage all seller accounts</p>
                        </div>
                    </div>
                    <Link
                        href="/dashboard/add-seller"
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
                    >
                        <UserPlus size={20} />
                        Add New Seller
                    </Link>
                </div>
            </header>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Success Message */}
                {successMessage && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 mb-6 animate-fadeIn">
                        <CheckCircle size={24} className="text-green-600" />
                        <p className="text-green-900 font-medium">{successMessage}</p>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 mb-6">
                        <XCircle size={24} className="text-red-600" />
                        <p className="text-red-900 font-medium">{error}</p>
                    </div>
                )}

                {/* Search and Stats */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search sellers by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                            />
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-sm text-gray-500">Total Sellers</p>
                                <p className="text-2xl font-bold text-gray-900">{sellers.length}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500">Showing</p>
                                <p className="text-2xl font-bold text-blue-600">{filteredSellers.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    {isLoading ? (
                        <div className="p-12 text-center">
                            <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            <p className="mt-4 text-gray-500">Loading sellers...</p>
                        </div>
                    ) : filteredSellers.length === 0 ? (
                        <div className="p-12 text-center">
                            <AlertCircle size={48} className="mx-auto text-gray-300 mb-4" />
                            <h3 className="text-lg font-bold text-gray-900 mb-2">No sellers found</h3>
                            <p className="text-gray-500 mb-6">
                                {searchTerm ? 'Try adjusting your search' : 'Start by adding your first seller'}
                            </p>
                            <Link
                                href="/dashboard/add-seller"
                                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all"
                            >
                                <UserPlus size={20} />
                                Add First Seller
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                            #
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                            Seller Information
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                            Role
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                            Joined Date
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredSellers.map((seller, index) => (
                                        <tr key={seller.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                        <span className="text-blue-600 font-bold text-sm">
                                                            {seller.firstName?.charAt(0)}{seller.lastName?.charAt(0)}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900">
                                                            {seller.firstName} {seller.lastName}
                                                        </p>
                                                        <p className="text-xs text-gray-500">ID: {seller.id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {seller.email}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                                                    {seller.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {new Date(seller.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/dashboard/edit-seller/${seller.id}`}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit size={18} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(seller.id, `${seller.firstName} ${seller.lastName}`)}
                                                        className={`p-2 rounded-lg transition-colors ${deleteConfirm === seller.id
                                                                ? 'bg-red-600 text-white hover:bg-red-700'
                                                                : 'text-red-600 hover:bg-red-50'
                                                            }`}
                                                        title={deleteConfirm === seller.id ? 'Click again to confirm' : 'Delete'}
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageSellersPage;
