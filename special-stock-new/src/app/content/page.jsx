'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    LayoutDashboard, Users, Box, Image, Layers, LogOut,
    Search, Filter, Bell, Plus, Download, RefreshCw,
    CheckCircle2, XCircle, Clock, ShieldCheck, Bug,
    Star, Flame, ChevronDown, MoreHorizontal, ImageIcon, Video
} from 'lucide-react';

const ContentManagement = () => {
    return (
        <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#1A1C1E]">

            {/* --- SIDEBAR (Siohioma Style) --- */}
            <aside className="w-64 bg-[#0B1A13] text-white flex flex-col p-6 sticky top-0 h-screen">
                <div className="flex items-center gap-3 mb-10 px-2">
                    <div className="w-8 h-8 bg-[#A3E635] rounded-lg flex items-center justify-center">
                        <Layers className="text-[#0B1A13]" size={20} />
                    </div>
                    <span className="text-xl font-bold tracking-tight">Special Stocks</span>
                </div>

                <nav className="flex-1 space-y-1">
                    <SidebarItem href="/dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" />
                    <SidebarItem href="/user" icon={<Users size={18} />} label="Users" />
                    <SidebarItem href="/content" icon={<Box size={18} />} label="Content" active />
                    <SidebarItem href="#" icon={<Image size={18} />} label="Gallery" />
                    <SidebarItem href="/exclusiveImages" icon={<Layers size={18} />} label="Exclusive" />
                </nav>

                <div className="mt-auto pt-6 border-t border-white/10">
                    <button className="flex w-full items-center gap-3 text-gray-400 hover:text-white transition-colors px-2 py-3 rounded-xl hover:bg-white/5">
                        <LogOut size={18} />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <main className="flex-1 flex flex-col overflow-hidden">

                {/* HEADER */}
                <header className="px-8 py-5 bg-white border-b border-gray-100 flex justify-between items-center sticky top-0 z-20">
                    <div>
                        <h1 className="text-2xl font-bold">Content Management</h1>
                        <p className="text-xs text-gray-400 font-medium">Manage all platform content with secure file serving via serve_asset.php</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold border border-emerald-100">
                            <ShieldCheck size={14} /> Secure File Serving Active
                        </div>
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0B1A13] text-white rounded-xl font-bold text-sm hover:scale-[1.02] transition-transform">
                            <Plus size={18} /> Add Content
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 space-y-8">

                    {/* TOP METRICS (All 10 features from original) */}
                    <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-3">
                        <MiniStat label="Total" value="37" color="bg-gray-900" />
                        <MiniStat label="Pending" value="1" color="bg-amber-500" />
                        <MiniStat label="Approved" value="35" color="bg-emerald-500" />
                        <MiniStat label="Rejected" value="1" color="bg-rose-500" />
                        <MiniStat label="Images" value="31" color="bg-blue-500" />
                        <MiniStat label="Videos" value="6" color="bg-purple-500" />
                        <MiniStat label="Watermarked" value="36" color="bg-indigo-500" />
                        <MiniStat label="New/Old" value="0" color="bg-orange-400" />
                        <MiniStat label="Handpicked" value="12" color="bg-yellow-500" />
                        <MiniStat label="Popular" value="5" color="bg-pink-500" />
                    </div>

                    {/* FILTER SECTION (Original feature set) */}
                    <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                            <div className="md:col-span-2 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input type="text" placeholder="Search title, description, tags..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#A3E635]" />
                            </div>
                            <SelectFilter label="Status" options={["All Statuses", "Pending", "Approved", "Rejected"]} />
                            <SelectFilter label="Type" options={["All Types", "Images", "Videos"]} />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
                            <SelectFilter label="Watermark" options={["All", "Yes", "No"]} />
                            <SelectFilter label="Handpicked" options={["All", "Yes", "No"]} />
                            <SelectFilter label="Popular" options={["All", "Yes", "No"]} />
                            <SelectFilter label="Categories" options={["All Categories", "Animals", "Business", "People"]} />
                            <div className="md:col-span-2">
                                <input type="text" placeholder="Seller name..." className="w-full px-4 py-2.5 bg-gray-50 border-gray-200 rounded-xl text-sm" />
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-50">
                            <div className="flex items-center gap-3">
                                <input type="date" className="bg-gray-50 border-gray-200 rounded-lg px-3 py-2 text-xs" />
                                <span className="text-gray-400 text-xs font-bold uppercase">To</span>
                                <input type="date" className="bg-gray-50 border-gray-200 rounded-lg px-3 py-2 text-xs" />
                                <button className="ml-2 px-6 py-2 bg-[#0B1A13] text-white rounded-lg text-xs font-bold">Filter</button>
                                <button className="text-gray-400 text-xs font-bold px-3">Clear</button>
                            </div>

                            <div className="flex gap-2">
                                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold">Bulk Approve + Watermark</button>
                                <button className="px-4 py-2 bg-rose-600 text-white rounded-lg text-xs font-bold">Bulk Reject</button>
                            </div>
                        </div>
                    </div>

                    {/* ASSET LIST */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-2">
                            <h2 className="text-lg font-bold">Content Assets <span className="text-sm font-medium text-gray-400 ml-2">Showing 37 of 37 assets</span></h2>
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase">
                                <input type="checkbox" className="rounded border-gray-300" /> Select All
                            </div>
                        </div>

                        {/* Example Card (Mapping data from your image) */}
                        <AssetCard
                            status="Pending"
                            title="A photograph of a German Shepherd mid-leap against a stark white backdrop"
                            author="Ambient pixel"
                            type="Image"
                            size="1.07 MB"
                            res="1280x800"
                            price="$9.99"
                            date="1 month ago"
                            category="Animals"
                            tags={["dog", "dogs", "german shepherd", "pink tongue", "dynamic pose"]}
                            isHandpicked={false}
                            isPopular={false}
                        />

                        <AssetCard
                            status="Approved"
                            title="A high-quality studio photograph of a fluffy Persian cat with luxurious..."
                            author="Ambient pixel"
                            type="Image"
                            size="1.14 MB"
                            res="1280x833"
                            price="$6.99"
                            date="1 month ago"
                            category="Animals"
                            tags={["cat", "cats", "persian cat", "pink tongue", "poses"]}
                            reviewedBy="Administrator"
                            reviewDate="Dec 1, 2024 7:40 AM"
                            isHandpicked={true}
                            isPopular={true}
                            enhanced={true}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

// --- SUB-COMPONENTS ---

const SidebarItem = ({ icon, label, href = "#", active = false }) => (
    <Link
        href={href}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm ${active ? 'bg-[#A3E635] text-[#0B1A13] font-bold shadow-lg shadow-[#A3E635]/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
    >
        {icon} <span>{label}</span>
    </Link>
);

const MiniStat = ({ label, value, color }) => (
    <div className="bg-white p-3 rounded-2xl border border-gray-100 flex flex-col items-center justify-center shadow-sm">
        <span className="text-[10px] font-black uppercase text-gray-400 tracking-tighter mb-1">{label}</span>
        <span className={`text-sm font-black ${color.replace('bg-', 'text-')}`}>{value}</span>
        <div className={`h-1 w-6 rounded-full mt-2 ${color}`}></div>
    </div>
);

const SelectFilter = ({ label, options }) => (
    <div className="relative">
        <select className="w-full appearance-none px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-600 outline-none focus:ring-2 focus:ring-[#A3E635]">
            {options.map(opt => <option key={opt}>{opt === label ? label : opt}</option>)}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
    </div>
);

const AssetCard = ({ status, title, author, type, size, res, price, date, category, tags, reviewedBy, reviewDate, isHandpicked, isPopular, enhanced }) => (
    <div className="bg-white rounded-[28px] p-5 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 transition-all hover:shadow-md">
        <div className="flex gap-4 items-start">
            <input type="checkbox" className="mt-1 rounded border-gray-300" />
            <div className="w-32 h-32 bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center border border-gray-50 shrink-0">
                <ImageIcon className="text-gray-300" size={32} />
            </div>
        </div>

        <div className="flex-1 space-y-3">
            <div className="flex justify-between items-start gap-4">
                <div>
                    <h3 className="text-lg font-extrabold leading-snug text-[#0B1A13]">{title}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-tight">
                        <span>By <span className="text-[#0B1A13]">{author}</span></span>
                        <span>{type}</span>
                        <span>{size}</span>
                        <span>{res}</span>
                        <span className="text-emerald-600">{price}</span>
                        <span>{date}</span>
                    </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${status === 'Pending' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>
                    {status}
                </span>
            </div>

            <div className="flex flex-wrap gap-2 py-1">
                <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">{category}</span>
                {tags.map(tag => (
                    <span key={tag} className="border border-gray-100 text-gray-400 text-[9px] font-bold px-2 py-0.5 rounded-md">#{tag}</span>
                ))}
            </div>

            <div className="flex items-center gap-4 py-2 border-y border-gray-50">
                <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" defaultChecked={isHandpicked} className="rounded border-gray-300 text-amber-500 focus:ring-amber-500" />
                    <span className="text-[10px] font-bold text-gray-500 group-hover:text-amber-600 uppercase">Handpicked</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" defaultChecked={isPopular} className="rounded border-gray-300 text-pink-500 focus:ring-pink-500" />
                    <span className="text-[10px] font-bold text-gray-500 group-hover:text-pink-600 uppercase">Popular</span>
                </label>
                {enhanced && (
                    <div className="flex items-center gap-1 text-emerald-600 text-[10px] font-bold uppercase ml-auto">
                        <CheckCircle2 size={12} /> Enhanced/Watermarked
                    </div>
                )}
            </div>

            {reviewedBy && (
                <p className="text-[10px] text-gray-400 font-medium">
                    Reviewed by <span className="text-gray-900 font-bold">{reviewedBy}</span> on {reviewDate}
                </p>
            )}
        </div>

        <div className="md:w-48 flex flex-col gap-2 justify-center">
            {status === 'Pending' ? (
                <>
                    <button className="w-full py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-[11px] uppercase tracking-wider hover:bg-emerald-700 transition-colors">Approve + Watermark</button>
                    <button className="w-full py-2.5 bg-rose-600 text-white rounded-xl font-bold text-[11px] uppercase tracking-wider hover:bg-rose-700 transition-colors">Reject</button>
                </>
            ) : (
                <button className="w-full py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-[11px] uppercase tracking-wider">Regenerate Enhanced</button>
            )}
            <button className="w-full py-2.5 bg-gray-100 text-gray-600 rounded-xl font-bold text-[11px] uppercase tracking-wider hover:bg-gray-200">Details</button>
        </div>
    </div>
);

export default ContentManagement;