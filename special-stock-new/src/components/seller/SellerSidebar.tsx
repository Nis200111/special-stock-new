"use client";

import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Upload,
    DollarSign,
    TrendingUp,
    Package,
    Settings,
    LogOut,
} from "lucide-react";

const NAV_ITEMS = [
    { href: "/seller-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/seller-dashboard/upload", label: "Upload New", icon: Upload },
    { href: "/seller-dashboard/uploads", label: "My Uploads", icon: Package },
    { href: "/seller-dashboard/earnings", label: "Earnings", icon: DollarSign },
    { href: "/seller-dashboard/analytics", label: "Analytics", icon: TrendingUp },
    { href: "/seller-dashboard/settings", label: "Settings", icon: Settings },
];

export default function SellerSidebar({ userData, onLogout }) {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
        if (onLogout) return onLogout();

        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("user");
        localStorage.removeItem("userName");

        document.cookie = "token=; path=/; max-age=0";
        document.cookie = "userRole=; path=/; max-age=0";

        router.push("/login");
    };

    const initials =
        `${(userData?.firstName || "").charAt(0)}${(userData?.lastName || "").charAt(0)}` || "S";

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-gray-200">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
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
                {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;

                    let active = false;
                    if (item.href === "/seller-dashboard") {
                        active = pathname === "/seller-dashboard";
                    } else {
                        active = pathname === item.href || pathname?.startsWith(item.href + "/");
                    }

                    return (
                        <NavItem
                            key={item.href}
                            href={item.href}
                            icon={<Icon size={20} />}
                            label={item.label}
                            active={active}
                        />
                    );
                })}
            </nav>

            {/* User Section */}
            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold">{initials}</span>
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
    );
}

function NavItem({ href, icon, label, active }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${active ? "bg-blue-50 text-blue-600 font-bold" : "text-gray-600 hover:bg-gray-50"
                }`}
        >
            {icon}
            <span className="text-sm">{label}</span>
        </Link>
    );
}
