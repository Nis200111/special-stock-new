import React from 'react';
import {
    LayoutDashboard, Users, Image, Box,
    Layers, LogOut, Search, Bell, Check, X, Clock, DollarSign
} from 'lucide-react';

const SpecialStocksDashboard = () => {
    return (
        <div className="flex min-h-screen bg-[#F3F4F6] font-sans text-[#1A1C1E]">

            {/* 1. Side Navigation (Dark Green Theme) */}
            <aside className="w-64 bg-[#0B1A13] text-white flex flex-col p-6 sticky top-0 h-screen">
                <div className="flex items-center gap-2 mb-10 px-2">
                    <div className="w-8 h-8 bg-[#A3E635] rounded-lg flex items-center justify-center">
                        <Layers className="text-[#0B1A13]" size={20} />
                    </div>
                    <span className="text-xl font-bold tracking-tight">Special Stocks</span>
                </div>

                <nav className="flex-1 space-y-1">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-4 px-2">Menu</p>
                    <SidebarItem icon={<LayoutDashboard size={18} />} label="Dashboard" active />
                    <SidebarItem icon={<Users size={18} />} label="Users" />
                    <SidebarItem icon={<Box size={18} />} label="Content" />
                    <SidebarItem icon={<Image size={18} />} label="Gallery" />
                    <SidebarItem icon={<Layers size={18} />} label="Exclusive" />
                    <SidebarItem icon={<Image size={18} />} label="Collections" />
                </nav>

                <div className="mt-auto pt-6 border-t border-white/10">
                    <div className="flex items-center gap-3 px-2 mb-6">
                        <div className="w-10 h-10 rounded-full bg-[#A3E635] flex items-center justify-center text-[#0B1A13] font-bold">A</div>
                        <div>
                            <p className="text-sm font-bold">Administrator</p>
                            <p className="text-[10px] text-gray-400 font-mono">admin@specialstocks.us</p>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors px-2">
                        <LogOut size={18} />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* 2. Main Content Area */}
            <main className="flex-1 overflow-y-auto">

                {/* Header Section */}
                <header className="px-8 py-5 bg-white border-b border-gray-100 flex justify-between items-center sticky top-0 z-10">
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl font-bold">Admin Dashboard</h1>
                        <span className="text-xs text-gray-400 font-medium ml-2">System overview and content moderation</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-[#0B1A13]"
                            />
                        </div>
                        <button className="p-2 bg-gray-100 rounded-full text-gray-500"><Bell size={18} /></button>
                    </div>
                </header>

                <div className="p-8 space-y-8">

                    {/* Top Alert Card (Updating the old yellow bar) */}
                    <div className="bg-[#0B1A13] rounded-[24px] p-6 text-white flex items-center justify-between shadow-xl">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                                <Clock className="text-[#A3E635]" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">1 item(s) awaiting review</h3>
                                <p className="text-sm text-gray-400">1 regular assets + 0 exclusive images</p>
                            </div>
                        </div>
                        <button className="bg-[#A3E635] text-[#0B1A13] px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform">
                            Review Now
                        </button>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <StatCard label="Pending Review" value="1" subtext="Regular Assets" icon={<Clock className="text-orange-500" />} />
                        <StatCard label="Exclusive Pending" value="0" subtext="Exclusive Images" icon={<Image className="text-purple-500" />} />
                        <StatCard label="Total Users" value="10" subtext="0 new this month" icon={<Users className="text-blue-500" />} />
                        <StatCard label="Total Revenue" value="$0.00" subtext="0 sales" icon={<DollarSign className="text-emerald-500" />} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* Queue Section (LHS) */}
                        <div className="lg:col-span-8 bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-xl font-bold">View Queue</h2>
                                    <div className="flex gap-4 mt-4 bg-gray-100 p-1 rounded-xl w-fit">
                                        <button className="px-6 py-2 bg-white rounded-lg shadow-sm text-sm font-bold">Regular Assets (1)</button>
                                        <button className="px-6 py-2 text-gray-500 text-sm font-bold">Exclusive Images (0)</button>
                                    </div>
                                </div>
                            </div>

                            {/* Asset Card */}
                            <div className="border border-gray-100 rounded-3xl p-6 bg-gray-50/50">
                                <div className="flex gap-6">
                                    <div className="w-48 h-36 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-400">
                                        <Image size={40} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="bg-blue-100 text-blue-600 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">Animals</span>
                                            <span className="text-xs text-gray-400 font-medium">1 month ago</span>
                                        </div>
                                        <h3 className="text-lg font-extrabold leading-snug mb-3 text-slate-900">
                                            A photograph of a German Shepherd mid-leap against a stark white backdrop
                                        </h3>
                                        <div className="flex flex-wrap gap-4 text-[11px] font-bold text-gray-500 mb-4">
                                            <span>By <span className="text-[#0B1A13]">Ambient pixel</span></span>
                                            <span>1.07 MB</span>
                                            <span>1280x800</span>
                                            <span className="text-emerald-600 font-black">$9.99</span>
                                        </div>
                                        <p className="text-xs text-gray-500 italic mb-6 line-clamp-1">
                                            A photograph of a German Shepherd mid-leap against a stark white backdrop, captured in a moment...
                                        </p>
                                        <div className="flex gap-3">
                                            <button className="flex-1 bg-[#0B1A13] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2">
                                                <Check size={16} /> Approve
                                            </button>
                                            <button className="flex-1 border border-red-200 text-red-600 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-50">
                                                <X size={16} /> Reject
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Overview Section (RHS) */}
                        <div className="lg:col-span-4 bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-8">Content Overview</h2>
                            <div className="space-y-6">
                                <OverviewRow label="Approved" value="35" color="text-emerald-600" barColor="bg-emerald-500" total={37} />
                                <OverviewRow label="Pending" value="1" color="text-orange-500" barColor="bg-orange-500" total={37} />
                                <OverviewRow label="Rejected" value="1" color="text-red-600" barColor="bg-red-500" total={37} />
                            </div>

                            <div className="mt-10 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-tighter">Quick Action</p>
                                <p className="text-sm font-bold text-slate-800 leading-tight">Review all pending content to keep your database up to date.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

// Reusable Components
const SidebarItem = ({ icon, label, active = false }) => (
    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm ${active ? 'bg-[#A3E635] text-[#0B1A13] shadow-lg shadow-[#A3E635]/20 font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
        {icon}
        <span>{label}</span>
    </button>
);

const StatCard = ({ label, value, subtext, icon }) => (
    <div className="bg-white p-6 rounded-[28px] shadow-sm border border-gray-50 flex items-start justify-between">
        <div>
            <p className="text-xs font-bold text-gray-400 mb-1">{label}</p>
            <h4 className="text-2xl font-black">{value}</h4>
            <p className="text-[10px] text-gray-400 mt-1 font-medium">{subtext}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">{icon}</div>
    </div>
);

const OverviewRow = ({ label, value, color, barColor, total }) => {
    const percentage = (parseInt(value) / total) * 100;
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center font-bold">
                <span className="text-sm text-gray-500">{label}</span>
                <span className={`text-sm ${color}`}>{value}</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${barColor} rounded-full`} style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    );
};

export default SpecialStocksDashboard;