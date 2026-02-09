"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Upload, DollarSign, TrendingUp, Package, Bell, Eye, ShoppingBag } from "lucide-react";

import SellerSidebar from "@/components/seller/SellerSidebar";

export default function SellerDashboard() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    const [stats, setStats] = useState({
        totalUploads: 0,
        totalEarnings: 0,
        totalViews: 0,
        totalSales: 0,
    });

    const [recentUploads, setRecentUploads] = useState([]);

    useEffect(() => {
        const user = checkAuthAndRole();
        if (user) fetchDashboardData(user);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkAuthAndRole = () => {
        try {
            const token = localStorage.getItem("token");
            const userRole = localStorage.getItem("userRole");
            const user = JSON.parse(localStorage.getItem("user") || "{}");

            if (!token) {
                router.push("/login");
                return null;
            }

            if (userRole !== "seller") {
                router.push("/seller");
                return null;
            }

            setUserData(user);
            setIsLoading(false);
            return user;
        } catch (error) {
            console.error("Auth check error:", error);
            router.push("/login");
            return null;
        }
    };

    const fetchDashboardData = async (user) => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`http://localhost:5000/api/seller/my-images/${user.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();

            if (data.success) {
                const uploads = data.data || [];
                setRecentUploads(uploads);

                const totalViews = uploads.reduce((acc, curr) => acc + (curr.views || 0), 0);
                const totalSales = uploads.reduce((acc, curr) => acc + (curr.downloads || 0), 0);
                const totalEarnings = totalSales * 5;

                setStats({
                    totalUploads: uploads.length,
                    totalEarnings,
                    totalViews,
                    totalSales,
                });
            }
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        }
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
            {/* ✅ Re-usable Sidebar */}
            <SellerSidebar userData={userData} onLogout={handleLogout} />

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
                        trendUp
                    />
                    <StatCard
                        icon={<DollarSign size={32} />}
                        iconBg="bg-green-100"
                        iconColor="text-green-600"
                        title="Total Earnings"
                        value={`$${Number(stats.totalEarnings || 0).toFixed(2)}`}
                        trend="+23%"
                        trendUp
                    />
                    <StatCard
                        icon={<Eye size={32} />}
                        iconBg="bg-purple-100"
                        iconColor="text-purple-600"
                        title="Total Views"
                        value={stats.totalViews}
                        trend="+8%"
                        trendUp
                    />
                    <StatCard
                        icon={<ShoppingBag size={32} />}
                        iconBg="bg-orange-100"
                        iconColor="text-orange-600"
                        title="Total Sales"
                        value={stats.totalSales}
                        trend="+15%"
                        trendUp
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
                                    <div
                                        key={upload.id}
                                        className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100"
                                    >
                                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                            <img
                                                src={`http://localhost:5000${upload.thumbnailPath || upload.filepath}`}
                                                alt={upload.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-gray-900 truncate">{upload.title}</h4>
                                            <p className="text-xs text-gray-500 truncate">
                                                {upload.created_at ? new Date(upload.created_at).toLocaleDateString() : "-"}
                                            </p>
                                        </div>

                                        <div className="flex flex-col items-end gap-1">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-bold ${upload.status === "approved"
                                                        ? "bg-green-100 text-green-700"
                                                        : upload.status === "rejected"
                                                            ? "bg-red-100 text-red-700"
                                                            : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {upload.status ? upload.status.charAt(0).toUpperCase() + upload.status.slice(1) : "Pending"}
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
}

function StatCard({ icon, iconBg, iconColor, title, value, trend, trendUp }) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 ${iconBg} rounded-xl flex items-center justify-center ${iconColor}`}>
                    {icon}
                </div>
                {trend && (
                    <span className={`text-sm font-bold ${trendUp ? "text-green-600" : "text-red-600"}`}>
                        {trend}
                    </span>
                )}
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-1">{value}</h3>
            <p className="text-sm text-gray-500">{title}</p>
        </div>
    );
}
