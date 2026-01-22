"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    LayoutDashboard, Users, Image, Box,
    Layers, LogOut, Search, Bell, Check, X, Clock, DollarSign, Heart, Package
} from 'lucide-react';

const DashboardPage = () => {
    const router = useRouter();
    const [role, setRole] = useState('buyer');
    const [userName, setUserName] = useState('User');

    useEffect(() => {
        const storedRole = localStorage.getItem("userRole");
        const storedName = localStorage.getItem("userName");
        if (storedRole) setRole(storedRole);
        if (storedName) setUserName(storedName);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("userName");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("userRole");
        router.push("/login");
    };

    // ADMIN VIEW
    if (role === 'admin') {
        return (
            <div className="flex min-h-screen bg-[#F3F4F6] font-sans text-[#1A1C1E]">
                {/* Side Navigation - Admin */}
                <aside className="w-64 bg-[#0d3b66] text-white flex flex-col p-6 sticky top-0 h-screen">
                    <div className="flex items-center gap-2 mb-10 px-2">
                        <div className="w-8 h-8 bg-[#1e5a8e] rounded-lg flex items-center justify-center">
                            <Layers className="text-white" size={20} />
                        </div>
                        <span className="text-xl font-bold tracking-tight">Special Stocks</span>
                    </div>

                    <nav className="flex-1 space-y-1">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4 px-2">Admin Menu</p>
                        <SidebarItem href="/dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" active isAdmin />
                        <SidebarItem href="/admin/users" icon={<Users size={18} />} label="Manage Users" isAdmin />
                        <SidebarItem href="/admin/products" icon={<Package size={18} />} label="Manage Products" isAdmin />
                        <SidebarItem href="/admin/sales" icon={<DollarSign size={18} />} label="View Sales" isAdmin />
                        <SidebarItem href="/content" icon={<Box size={18} />} label="Content" isAdmin />
                        <SidebarItem href="/exclusiveImages" icon={<Layers size={18} />} label="Exclusive" isAdmin />
                    </nav>

                    <div className="mt-auto pt-6 border-t border-white/10">
                        <div className="flex items-center gap-3 px-2 mb-6">
                            <div className="w-10 h-10 rounded-full bg-[#1e5a8e] flex items-center justify-center text-white font-bold">
                                {userName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="text-sm font-bold">{userName}</p>
                                <p className="text-[10px] text-gray-300 font-mono">Administrator</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors px-2 cursor-pointer w-full text-left"
                            type="button"
                        >
                            <LogOut size={18} />
                            <span className="text-sm font-medium">Logout</span>
                        </button>
                    </div>
                </aside>

                {/* Main Content - Admin */}
                <main className="flex-1 overflow-y-auto">
                    <header className="px-8 py-5 bg-[#0d3b66] text-white border-b border-[#1e5a8e] flex justify-between items-center sticky top-0 z-10">
                        <div>
                            <h1 className="text-2xl font-bold">Admin Control Panel</h1>
                            <p className="text-sm text-gray-200 mt-1">Manage your platform</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-10 pr-4 py-2 bg-[#1e5a8e] border-none rounded-full text-sm w-64 text-white placeholder-gray-300 focus:ring-2 focus:ring-white"
                                />
                            </div>
                            <button className="p-2 bg-[#1e5a8e] rounded-full text-white hover:bg-[#2a6ba8]">
                                <Bell size={18} />
                            </button>
                        </div>
                    </header>

                    <div className="p-8 space-y-8">
                        {/* Admin Action Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Link href="/admin/users" className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center group">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Users size={32} className="text-white" />
                                </div>
                                <span className="font-bold text-lg text-gray-800">Manage Users</span>
                                <span className="text-sm text-gray-500 mt-2">View and manage all users</span>
                            </Link>

                            <Link href="/admin/products" className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center group">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Package size={32} className="text-white" />
                                </div>
                                <span className="font-bold text-lg text-gray-800">Manage Products</span>
                                <span className="text-sm text-gray-500 mt-2">Add, edit, or remove products</span>
                            </Link>

                            <Link href="/admin/sales" className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center group">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <DollarSign size={32} className="text-white" />
                                </div>
                                <span className="font-bold text-lg text-gray-800">View Sales</span>
                                <span className="text-sm text-gray-500 mt-2">Track revenue and analytics</span>
                            </Link>
                        </div>

                        {/* Stats Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <StatCard label="Total Users" value="156" icon={<Users className="text-blue-500" />} />
                            <StatCard label="Total Products" value="342" icon={<Package className="text-purple-500" />} />
                            <StatCard label="Revenue" value="$12,450" icon={<DollarSign className="text-green-500" />} />
                            <StatCard label="Pending" value="8" icon={<Clock className="text-orange-500" />} />
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    // BUYER VIEW (DEFAULT)
    return (
        <div className="flex min-h-screen bg-[#F3F4F6] font-sans text-[#1A1C1E]">
            {/* Side Navigation - Buyer */}
            <aside className="w-64 bg-[#1A0505] text-white flex flex-col p-6 sticky top-0 h-screen">
                <div className="flex items-center gap-2 mb-10 px-2">
                    <div className="w-8 h-8 bg-[#EF4444] rounded-lg flex items-center justify-center">
                        <Layers className="text-white" size={20} />
                    </div>
                    <span className="text-xl font-bold tracking-tight">Special Stocks</span>
                </div>

                <nav className="flex-1 space-y-1">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-4 px-2">Menu</p>
                    <SidebarItem href="/dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" active />
                    <SidebarItem href="/user" icon={<Users size={18} />} label="Profile" />
                    <SidebarItem href="/content" icon={<Box size={18} />} label="Content" />
                    <SidebarItem href="/images" icon={<Image size={18} />} label="Gallery" />
                    <SidebarItem href="/exclusiveImages" icon={<Layers size={18} />} label="Exclusive" />
                </nav>

                <div className="mt-auto pt-6 border-t border-white/10">
                    <div className="flex items-center gap-3 px-2 mb-6">
                        <div className="w-10 h-10 rounded-full bg-[#EF4444] flex items-center justify-center text-white font-bold">
                            {userName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className="text-sm font-bold">{userName}</p>
                            <p className="text-[10px] text-gray-400 font-mono">Buyer Account</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors px-2 cursor-pointer w-full text-left"
                        type="button"
                    >
                        <LogOut size={18} />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content - Buyer */}
            <main className="flex-1 overflow-y-auto">
                <header className="px-8 py-5 bg-white border-b border-gray-100 flex justify-between items-center sticky top-0 z-10">
                    <div>
                        <h1 className="text-2xl font-bold">User Dashboard</h1>
                        <p className="text-sm text-gray-500 mt-1">Welcome back, {userName}!</p>
                    </div>
                </header>

                <div className="p-8 space-y-8">
                    {/* Buyer Action Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link href="/downloads" className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center group">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Box size={32} className="text-white" />
                            </div>
                            <span className="font-bold text-lg text-gray-800">My Downloads</span>
                            <span className="text-sm text-gray-500 mt-2">Access your purchased items</span>
                        </Link>

                        <Link href="/history" className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center group">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Clock size={32} className="text-white" />
                            </div>
                            <span className="font-bold text-lg text-gray-800">Purchase History</span>
                            <span className="text-sm text-gray-500 mt-2">View your order history</span>
                        </Link>

                        <Link href="/saved" className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center group">
                            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Heart size={32} className="text-white" />
                            </div>
                            <span className="font-bold text-lg text-gray-800">Saved Items</span>
                            <span className="text-sm text-gray-500 mt-2">Your favorite collections</span>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

// Reusable Components
const SidebarItem = ({ icon, label, href = "#", active = false, isAdmin = false }) => (
    <Link
        href={href}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm ${active
                ? isAdmin
                    ? 'bg-[#1e5a8e] text-white shadow-lg font-bold'
                    : 'bg-[#EF4444] text-white shadow-lg shadow-[#EF4444]/20 font-bold'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
    >
        {icon}
        <span>{label}</span>
    </Link>
);

const StatCard = ({ label, value, icon }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-gray-400 uppercase">{label}</p>
            <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
        </div>
        <h4 className="text-3xl font-black text-gray-800">{value}</h4>
    </div>
);

export default DashboardPage;