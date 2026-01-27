"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    LayoutDashboard, Upload, DollarSign, TrendingUp, Package,
    Settings, LogOut, Bell, Search, Eye, Users, ShoppingBag
} from 'lucide-react';

const SellerDashboard = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [stats, setStats] = useState({
        totalUploads: 0,
        totalEarnings: 0,
        totalViews: 0,
        totalSales: 0
    });
    const [recentUploads, setRecentUploads] = useState([]);

    useEffect(() => {
        const user = checkAuthAndRole();
        if (user) {
            fetchDashboardData(user);
        }
    }, []);

    const checkAuthAndRole = () => {
        try {
            const token = localStorage.getItem('token');
            const userRole = localStorage.getItem('userRole');
            const user = JSON.parse(localStorage.getItem('user') || '{}');

            // Check authentication
            if (!token) {
                console.log('No token found, redirecting to login');
                router.push('/login');
                return null;
            }

            // Check if user is seller
            if (userRole !== 'seller') {
                console.log('User is not a seller, redirecting to activation page');
                router.push('/seller');
                return null;
            }

            // User is authenticated and is a seller
            setUserData(user);
            setIsLoading(false);
            return user;

        } catch (error) {
            console.error('Auth check error:', error);
            router.push('/login');
            return null;
        }
    };

    const fetchDashboardData = async (user) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/seller/my-images/${user.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (data.success) {
                const uploads = data.data || []; // Note: Access data.data based on controller response
                setRecentUploads(uploads);

                // Calculate stats
                const totalViews = uploads.reduce((acc, curr) => acc + (curr.views || 0), 0);
                const totalSales = uploads.reduce((acc, curr) => acc + (curr.downloads || 0), 0); // Assuming downloads = sales for now
                const totalEarnings = totalSales * 5; // Placeholder logic: $5 per sale

                setStats({
                    totalUploads: uploads.length,
                    totalEarnings: totalEarnings,
                    totalViews: totalViews,
                    totalSales: totalSales
                });
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('user');
        localStorage.removeItem('userName');

        // Clear cookies
        document.cookie = 'token=; path=/; max-age=0';
        document.cookie = 'userRole=; path=/; max-age=0';

        router.push('/login');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-600">Loading seller dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
                {/* Logo */}
                <div className="p-6 border-b border-gray-200">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Package size={24} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Special Stocks</h1>
                            <p className="text-xs text-gray-500">Seller Portal</p>
                        </div>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    <NavItem href="/seller-dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" active />
                    <NavItem href="/seller-dashboard/upload" icon={<Upload size={20} />} label="Upload New" />
                    <NavItem href="/seller-dashboard/uploads" icon={<Package size={20} />} label="My Uploads" />
                    <NavItem href="/seller-dashboard/earnings" icon={<DollarSign size={20} />} label="Earnings" />
                    <NavItem href="/seller-dashboard/analytics" icon={<TrendingUp size={20} />} label="Analytics" />
                    <NavItem href="/seller-dashboard/settings" icon={<Settings size={20} />} label="Settings" />
                </nav>

                {/* User Section */}
                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-bold">
                                {userData?.firstName?.[0]}{userData?.lastName?.[0]}
                            </span>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-gray-900">
                                {userData?.firstName} {userData?.lastName}
                            </p>
                            <p className="text-xs text-gray-500">Seller Account</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <LogOut size={18} />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 p-8">
                {/* Header */}
                <header className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Welcome back, {userData?.firstName}!
                            </h1>
                            <p className="text-gray-600">Here's what's happening with your store today</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                                <Bell size={24} className="text-gray-600" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <Link
                                href="/seller-dashboard/upload"
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg"
                            >
                                <Upload size={20} />
                                Upload New
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        icon={<Package size={32} />}
                        iconBg="bg-blue-100"
                        iconColor="text-blue-600"
                        title="Total Uploads"
                        value={stats.totalUploads}
                        trend="+12%"
                        trendUp={true}
                    />
                    <StatCard
                        icon={<DollarSign size={32} />}
                        iconBg="bg-green-100"
                        iconColor="text-green-600"
                        title="Total Earnings"
                        value={`$${stats.totalEarnings.toFixed(2)}`}
                        trend="+23%"
                        trendUp={true}
                    />
                    <StatCard
                        icon={<Eye size={32} />}
                        iconBg="bg-purple-100"
                        iconColor="text-purple-600"
                        title="Total Views"
                        value={stats.totalViews}
                        trend="+8%"
                        trendUp={true}
                    />
                    <StatCard
                        icon={<ShoppingBag size={32} />}
                        iconBg="bg-orange-100"
                        iconColor="text-orange-600"
                        title="Total Sales"
                        value={stats.totalSales}
                        trend="+15%"
                        trendUp={true}
                    />
                </div>

                {/* Content Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Uploads */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Recent Uploads</h2>
                            <Link href="/seller-dashboard/uploads" className="text-blue-600 text-sm font-bold hover:underline">
                                View All
                            </Link>
                        </div>

                        {recentUploads.length > 0 ? (
                            <div className="space-y-4">
                                {recentUploads.slice(0, 5).map((upload) => (
                                    <div key={upload.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100">
                                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                            <img
                                                src={`http://localhost:5000${upload.thumbnailPath || upload.filepath}`}
                                                alt={upload.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-gray-900 truncate">{upload.title}</h4>
                                            <p className="text-xs text-gray-500 truncate">{new Date(upload.created_at).toLocaleDateString()}</p>
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${upload.status === 'approved' ? 'bg-green-100 text-green-700' :
                                                upload.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {upload.status ? upload.status.charAt(0).toUpperCase() + upload.status.slice(1) : 'Pending'}
                                            </span>
                                            <span className="text-xs font-bold text-gray-700">${upload.price}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <Upload size={48} className="mx-auto text-gray-300 mb-4" />
                                <p className="text-gray-500 mb-4">No uploads yet</p>
                                <Link
                                    href="/seller-dashboard/upload"
                                    className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline"
                                >
                                    <Upload size={18} />
                                    Upload your first item
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
                        <div className="text-center py-12">
                            <TrendingUp size={48} className="mx-auto text-gray-300 mb-4" />
                            <p className="text-gray-500">No recent activity</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

// Sub-components
const NavItem = ({ href, icon, label, active = false }) => (
    <Link
        href={href}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${active
            ? 'bg-blue-50 text-blue-600 font-bold'
            : 'text-gray-600 hover:bg-gray-50'
            }`}
    >
        {icon}
        <span className="text-sm">{label}</span>
    </Link>
);

const StatCard = ({ icon, iconBg, iconColor, title, value, trend, trendUp }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
            <div className={`w-14 h-14 ${iconBg} rounded-xl flex items-center justify-center ${iconColor}`}>
                {icon}
            </div>
            {trend && (
                <span className={`text-sm font-bold ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
                    {trend}
                </span>
            )}
        </div>
        <h3 className="text-2xl font-black text-gray-900 mb-1">{value}</h3>
        <p className="text-sm text-gray-500">{title}</p>
    </div>
);

export default SellerDashboard;
