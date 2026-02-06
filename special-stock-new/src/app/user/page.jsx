'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    LayoutDashboard, Users, Box, Image, Layers, LogOut,
    Search, Filter, ChevronDown, MoreHorizontal, Download, RefreshCw,
    TrendingUp, TrendingDown
} from 'lucide-react';

// Mock Data representing the rows in your old image_3.png
const MOCK_USERS = [
    { id: 11, name: "Johne H", email: "johneh987@gmail.com", role: "Seller", status: "Active", lastLogin: "Never", itemsApproved: "0/0", assets: 0, earned: "$0.00", joined: "Dec 1, 2024" },
    { id: 10, name: "chamathka kumara", email: "chamathkakumara123@gmail.com", role: "Buyer", status: "Active", lastLogin: "Never", itemsApproved: "0 purchases", assets: 0, earned: "$0.00", joined: "Nov 14, 2024" },
    { id: 9, name: "Lobi li", email: "lobili345@gmail.com", role: "Buyer", status: "Active", lastLogin: "Never", itemsApproved: "0 purchases", assets: 0, earned: "$0.00", joined: "Nov 13, 2024" },
    // ... add more mock rows as needed based on image_3.png
    { id: 1, name: "Administrator", email: "admin@specialstocks.us", role: "Admin", status: "Active", lastLogin: "12 min ago", itemsApproved: "-", assets: "-", earned: "-", joined: "Aug 2, 2024" },
];

const UserManagement = () => {
    // State for filters (to show functionality based on old UI)
    const [roleFilter, setRoleFilter] = useState('All Roles');
    const [statusFilter, setStatusFilter] = useState('All Statuses');
    const [sortBy, setSortBy] = useState('Date Joined');

    return (
        <div className="flex min-h-screen bg-[#F3F4F6] font-sans text-[#1A1C1E]">

            {/* --- 1. NEW MODERN SIDEBAR (From image_4.png style) --- */}
            <aside className="w-64 bg-[#0B1A13] text-white flex flex-col p-4 sticky top-0 h-screen">
                <div className="flex items-center gap-3 mb-10 px-2">
                    {/* Placeholder logo based on target image style */}
                    <div className="w-8 h-8 bg-[#A3E635] rounded flex items-center justify-center">
                        <Layers className="text-[#0B1A13]" size={20} />
                    </div>
                    <span className="text-xl font-bold tracking-tight">Special Stocks</span>
                </div>

                <nav className="flex-1 space-y-2">
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-4 px-2">Menu</p>
                    <SidebarItem href="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" />
                    {/* 'Users' is active to match current page */}
                    <SidebarItem href="/user" icon={<Users size={20} />} label="Users" active />
                    <SidebarItem href="/content" icon={<Box size={20} />} label="Content" />
                    <SidebarItem href="#" icon={<Image size={20} />} label="Gallery" />
                    <SidebarItem href="/exclusiveImages" icon={<Layers size={20} />} label="Exclusive" />
                </nav>

                <div className="mt-auto pt-6 border-t border-white/10">
                    <button className="flex w-full items-center gap-3 text-gray-400 hover:text-white transition-colors px-2 py-3 rounded-lg hover:bg-white/5">
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>


            {/* --- 2. MAIN CONTENT AREA --- */}
            <main className="flex-1 flex flex-col overflow-hidden">

                {/* Header & Top Actions (Preserving features from image_3.png) */}
                <header className="px-8 py-6 bg-white border-b border-gray-100 flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                        <p className="text-sm text-gray-500 mt-1">Manage user accounts, roles, and permissions.</p>
                    </div>
                    {/* The original buttons placed in modern layout */}
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                            <Download size={16} /> Export CSV
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#0B1A13] text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors">
                            <RefreshCw size={16} /> Refresh
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 space-y-8">

                    {/* --- 3. STATISTICS SECTION (Data from image_3, Style from image_4) --- */}
                    {/* Note: Added placeholder trend icons to match target visual style */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        <StatCard title="Total Users" value="10" trend={<TrendingUp className="text-emerald-500" size={20} />} />
                        <StatCard title="Active Users" value="10" trend={<TrendingUp className="text-emerald-500" size={20} />} />
                        <StatCard title="Sellers" value="3" trend={<TrendingDown className="text-orange-500" size={20} />} />
                        <StatCard title="New This Month" value="0" trend={<span className="text-gray-400">--</span>} />
                        <StatCard title="Active This Week" value="1" trend={<TrendingUp className="text-emerald-500" size={20} />} />
                    </div>


                    {/* --- 4. FILTER BAR (Redesigned from image_3) --- */}
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap items-center justify-between gap-4">
                        {/* Search Input */}
                        <div className="relative flex-1 min-w-[300px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Name, email, or phone..."
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A3E635] focus:border-transparent"
                            />
                        </div>

                        {/* Dropdown Filters from old UI */}
                        <div className="flex flex-wrap items-center gap-3">
                            <SelectDropdown value={roleFilter} onChange={setRoleFilter} options={['All Roles', 'Seller', 'Buyer', 'Admin']} icon={<Filter size={16} />} />
                            <SelectDropdown value={statusFilter} onChange={setStatusFilter} options={['All Statuses', 'Active', 'Inactive']} />
                            <div className="h-8 w-px bg-gray-200 mx-2"></div> {/* Separator */}
                            <span className="text-sm text-gray-500 font-medium">Sort By:</span>
                            <SelectDropdown value={sortBy} onChange={setSortBy} options={['Date Joined', 'Last Login', 'Name']} />

                            {/* Filter Action Buttons from old UI */}
                            <button className="px-6 py-2.5 bg-[#0B1A13] text-white font-medium rounded-xl hover:bg-opacity-90">Filter</button>
                            <button className="px-6 py-2.5 text-gray-500 font-medium hover:text-gray-700">Clear</button>
                        </div>
                    </div>


                    {/* --- 5. TABLE SECTION (Data from image_3, Style from image_4) --- */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* Pagination Header from Old UI */}
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center text-sm text-gray-500">
                            <p>Showing 10 of 10 users</p>
                            <button className="flex items-center gap-1 font-medium hover:text-gray-900">
                                Sort descending <ChevronDown size={14} />
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                {/* Table Header - Mapping columns from image_3.png */}
                                <thead className="bg-gray-50/50">
                                    <tr>
                                        <th className="p-4 w-12"><input type="checkbox" className="rounded border-gray-300 text-[#0B1A13] focus:ring-[#A3E635]" /></th>
                                        <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                                        <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Role & Status</th>
                                        <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Activity</th>
                                        <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Stats</th>
                                        <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Joined</th>
                                        <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {MOCK_USERS.map((user, index) => (
                                        <tr key={user.id} className="hover:bg-gray-50 transition-colors group">
                                            <td className="p-4"><input type="checkbox" className="rounded border-gray-300 text-[#0B1A13] focus:ring-[#A3E635]" /></td>

                                            {/* USER Column (Combined info) */}
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    {/* Avatar Placeholder using initials */}
                                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-[#0B1A13] font-bold">
                                                        {user.name.substring(0, 2).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900">{user.name}</p>
                                                        <p className="text-sm text-gray-500">{user.email}</p>
                                                        <p className="text-xs text-gray-400 mt-0.5">ID: {user.id}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* ROLE & STATUS Column */}
                                            <td className="p-4">
                                                <div className="flex flex-col items-start gap-2">
                                                    {/* Role Badge */}
                                                    <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full uppercase ${user.role === 'Seller' ? 'bg-purple-100 text-purple-700' :
                                                        user.role === 'Admin' ? 'bg-red-100 text-red-700' :
                                                            'bg-blue-100 text-blue-700'
                                                        }`}>
                                                        {user.role}
                                                    </span>
                                                    {/* Status Indicator (Modern dot style) */}
                                                    <div className="flex items-center gap-2 text-sm font-medium">
                                                        <span className={`block w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-gray-300'}`}></span>
                                                        {user.status}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* ACTIVITY Column (Complex data from old UI) */}
                                            <td className="p-4">
                                                <div className="text-sm">
                                                    <p><span className="text-gray-500">Last login:</span> {user.lastLogin}</p>
                                                    <p className="text-gray-500 text-xs mt-1">{user.itemsApproved}</p>
                                                </div>
                                            </td>

                                            {/* STATS Column (Complex data from old UI) */}
                                            <td className="p-4">
                                                <div className="text-sm">
                                                    <p className="font-medium">{user.assets} {user.role === 'Seller' ? 'Assets' : 'Purchases'}</p>
                                                    <p className="text-xs text-gray-500 mt-1">{user.role === 'Seller' ? 'Earned' : 'Spent'}: <span className="font-bold text-emerald-600">{user.earned}</span></p>
                                                </div>
                                            </td>

                                            {/* JOINED Column */}
                                            <td className="p-4 text-sm font-medium text-gray-500">
                                                {user.joined}
                                            </td>

                                            {/* ACTIONS Column (Modernized dropdown menu) */}
                                            <td className="p-4 text-right">
                                                <div className="relative inline-block text-left">
                                                    {/* In a real app, this button would trigger a dropdown component */}
                                                    <button className="p-2 text-gray-400 hover:text-gray-600 bg-transparent hover:bg-gray-100 rounded-lg transition-colors">
                                                        <MoreHorizontal size={18} />
                                                    </button>
                                                    {/* Visual representation of the dropdown options from the old UI */}
                                                    <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-20 py-2">
                                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">View Details</a>
                                                        <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">Suspend User</a>
                                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Email User</a>
                                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-medium">Login As User</a>
                                                    </div>
                                                </div>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* Simple Footer Copy from old UI */}
                        <div className="px-6 py-4 border-t border-gray-100 text-center text-xs text-gray-400">
                            © 2026 Special Stocks. All rights reserved.
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};


// --- Sub-components for cleaner code ---

const SidebarItem = ({ icon, label, href = "#", active = false }) => {
    // Active state styling matching the target image's bright green
    const activeClasses = active
        ? "bg-[#A3E635] text-[#0B1A13] font-bold shadow-lg shadow-[#A3E635]/20"
        : "text-gray-400 hover:text-white hover:bg-white/5";

    return (
        <Link
            href={href}
            className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeClasses}`}
        >
            {icon}
            <span className="text-sm font-medium">{label}</span>
        </Link>
    );
};

const StatCard = ({ title, value, trend }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-start">
        <div>
            <h3 className="text-2xl font-black text-gray-900 mb-1">{value}</h3>
            <p className="text-sm font-medium text-gray-500">{title}</p>
        </div>
        {/* Placeholder for the sparkline graph area shown in target image */}
        <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-xl">
            {trend}
        </div>
    </div>
);

// A simple styled select meant to mimic the dropdowns
const SelectDropdown = ({ value, onChange, options, icon }) => (
    <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>}
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl py-2.5 ${icon ? 'pl-10' : 'pl-4'} pr-10 focus:outline-none focus:ring-2 focus:ring-[#A3E635] cursor-pointer`}
        >
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
    </div>
);

export default UserManagement;