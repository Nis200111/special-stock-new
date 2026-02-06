"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./seller-dashboard.module.css";

export default function SellerDashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalUploads: 0,
        totalSales: 0,
        totalEarnings: 0,
        pendingReviews: 0
    });

    useEffect(() => {
        // Check authentication and role
        const userData = localStorage.getItem("user");
        const userRole = localStorage.getItem("userRole");
        const token = localStorage.getItem("token");

        if (!userData || !token) {
            router.push("/login");
            return;
        }

        const parsedUser = JSON.parse(userData);

        // Check if user is a seller
        if (userRole !== "seller") {
            // Redirect based on role
            if (userRole === "admin") {
                router.push("/dashboard");
            } else {
                router.push("/buyer-dashboard");
            }
            return;
        }

        setUser(parsedUser);
        setLoading(false);

        // TODO: Fetch seller stats from your backend
        // fetchSellerStats(token);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("userRole");
        document.cookie = "token=; path=/; max-age=0";
        document.cookie = "userRole=; path=/; max-age=0";
        router.push("/login");
    };

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Loading your dashboard...</p>
            </div>
        );
    }

    return (
        <div className={styles.dashboard}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <h2>Seller Dashboard</h2>
                    <p className={styles.userName}>{user?.firstName || "Seller"}</p>
                </div>

                <nav className={styles.nav}>
                    <Link href="/seller/dashboard" className={styles.navItemActive}>
                        <svg viewBox="0 0 24 24" className={styles.icon}>
                            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" fill="currentColor" />
                        </svg>
                        <span>Dashboard</span>
                    </Link>

                    <Link href="/seller-dashboard/upload" className={styles.navItem}>
                        <svg viewBox="0 0 24 24" className={styles.icon}>
                            <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" fill="currentColor" />
                        </svg>
                        <span>Upload Content</span>
                    </Link>

                    <Link href="/seller-dashboard/uploads" className={styles.navItem}>
                        <svg viewBox="0 0 24 24" className={styles.icon}>
                            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" fill="currentColor" />
                        </svg>
                        <span>My Uploads</span>
                    </Link>

                    <Link href="/seller/dashboard/sales" className={styles.navItem}>
                        <svg viewBox="0 0 24 24" className={styles.icon}>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" fill="currentColor" />
                        </svg>
                        <span>Sales & Earnings</span>
                    </Link>

                    <Link href="/seller/dashboard/settings" className={styles.navItem}>
                        <svg viewBox="0 0 24 24" className={styles.icon}>
                            <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" fill="currentColor" />
                        </svg>
                        <span>Settings</span>
                    </Link>

                    <button onClick={handleLogout} className={styles.navItem}>
                        <svg viewBox="0 0 24 24" className={styles.icon}>
                            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" fill="currentColor" />
                        </svg>
                        <span>Logout</span>
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className={styles.mainContent}>
                <div className={styles.header}>
                    <h1>Welcome back, {user?.firstName || "Seller"}!</h1>
                    <p className={styles.subtitle}>Here's what's happening with your content today</p>
                </div>

                {/* Stats Grid */}
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon} style={{ background: "#e0f2fe" }}>
                            <svg viewBox="0 0 24 24" style={{ color: "#0284c7" }}>
                                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" fill="currentColor" />
                            </svg>
                        </div>
                        <div className={styles.statContent}>
                            <h3>{stats.totalUploads}</h3>
                            <p>Total Uploads</p>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statIcon} style={{ background: "#dcfce7" }}>
                            <svg viewBox="0 0 24 24" style={{ color: "#16a34a" }}>
                                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" fill="currentColor" />
                            </svg>
                        </div>
                        <div className={styles.statContent}>
                            <h3>{stats.totalSales}</h3>
                            <p>Total Sales</p>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statIcon} style={{ background: "#fef3c7" }}>
                            <svg viewBox="0 0 24 24" style={{ color: "#ca8a04" }}>
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" fill="currentColor" />
                            </svg>
                        </div>
                        <div className={styles.statContent}>
                            <h3>${stats.totalEarnings.toFixed(2)}</h3>
                            <p>Total Earnings</p>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statIcon} style={{ background: "#f3e8ff" }}>
                            <svg viewBox="0 0 24 24" style={{ color: "#9333ea" }}>
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor" />
                            </svg>
                        </div>
                        <div className={styles.statContent}>
                            <h3>{stats.pendingReviews}</h3>
                            <p>Pending Reviews</p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className={styles.quickActions}>
                    <h2>Quick Actions</h2>
                    <div className={styles.actionsGrid}>
                        <Link href="/seller-dashboard/upload" className={styles.actionCard}>
                            <svg viewBox="0 0 24 24" className={styles.actionIcon}>
                                <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" fill="currentColor" />
                            </svg>
                            <h3>Upload New Content</h3>
                            <p>Share your images, videos, or music</p>
                        </Link>

                        <Link href="/seller-dashboard/uploads" className={styles.actionCard}>
                            <svg viewBox="0 0 24 24" className={styles.actionIcon}>
                                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" fill="currentColor" />
                            </svg>
                            <h3>Manage Uploads</h3>
                            <p>View and edit your existing content</p>
                        </Link>

                        <Link href="/seller/dashboard/sales" className={styles.actionCard}>
                            <svg viewBox="0 0 24 24" className={styles.actionIcon}>
                                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" fill="currentColor" />
                            </svg>
                            <h3>View Analytics</h3>
                            <p>Track your sales and performance</p>
                        </Link>

                        <Link href="/seller/dashboard/settings" className={styles.actionCard}>
                            <svg viewBox="0 0 24 24" className={styles.actionIcon}>
                                <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" fill="currentColor" />
                            </svg>
                            <h3>Account Settings</h3>
                            <p>Update your profile and preferences</p>
                        </Link>
                    </div>
                </div>

                {/* Recent Activity (Placeholder) */}
                <div className={styles.recentActivity}>
                    <h2>Recent Activity</h2>
                    <div className={styles.activityPlaceholder}>
                        <p>No recent activity to display</p>
                        <Link href="/seller-dashboard/upload" className={styles.uploadBtn}>
                            Upload Your First Content
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
