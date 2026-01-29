"use client";

import React, { useMemo, useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import styles from "./asset_details.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import ConfirmationModal from "@/components/ui/ConfirmationModal";
import { deleteItem } from "@/app/actions/itemActions";

export default function AssetDetailsPage() {
    const params = useParams();
    const { id } = params;

    const [asset, setAsset] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    const router = useRouter();

    // ---- Confirmation Modal state ----
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ---- UI state ----
    const [descExpanded, setDescExpanded] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        // Get user from localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                // Ensure role is present (it might be in a separate key)
                const storedRole = localStorage.getItem("userRole");
                if (!user.role && storedRole) {
                    user.role = storedRole;
                }
                setCurrentUser(user);
            } catch (e) {
                console.error("Failed to parse user from localStorage", e);
            }
        }

        if (!id) return;

        const fetchAsset = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/public/image/${id}`);
                const data = await response.json();

                if (data.success) {
                    setAsset(data.data);
                } else {
                    setError("Asset not found");
                }
            } catch (err) {
                console.error("Error fetching asset:", err);
                setError("Failed to load asset details");
            } finally {
                setLoading(false);
            }
        };

        fetchAsset();
    }, [id]);

    // Mock data for sidebars (keep as placeholders for now)
    const similarVideos = useMemo(() => [], []);
    const moreFromCreator = useMemo(() => [], []);

    function copyAssetId() {
        if (asset) {
            navigator.clipboard.writeText(String(asset.id));
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1200);
        }
    }

    function openFullscreen(url) {
        window.open(url, "_blank");
    }

    const handleDownload = async () => {
        if (!asset || !asset.filepath) return;

        try {
            const originalUrl = `http://localhost:5000${asset.filepath}`;
            const response = await fetch(originalUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            // Use the original filename or a reasonable default
            link.download = asset.filename || `special-stock-${asset.id}.${asset.contentType === 'video' ? 'mp4' : 'jpg'}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download failed:', error);
            alert("Failed to download file.");
        }
    };

    const canRemove = asset && currentUser && (
        String(currentUser.id) === String(asset.sellerId) ||
        (currentUser.role && ['admin', 'super_admin', 'manager'].includes(currentUser.role.toLowerCase().trim()))
    );

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error || !asset) return <div className="flex justify-center items-center h-screen text-red-500">{error || "Asset not found"}</div>;

    // Determine URLs
    // For video, we might want the original filepath if it's a preview video, 
    // or if we had a watermarked video path. 
    // Based on previous steps, 'filepath' is exposed now for videos.
    // For images, prioritize watermarked path.
    const isVideo = asset.contentType === 'video' || asset.filename?.match(/\.(mp4|mov|quicktime)$/i);

    const previewUrl = isVideo
        ? `http://localhost:5000${asset.filepath}`
        : (asset.watermarkedFilepath ? `http://localhost:5000${asset.watermarkedFilepath}` : `http://localhost:5000${asset.filepath}`);

    return (
        <div className={styles.page}>
            {/* PROMO BAR */}
            <div className={styles.promoBar}>
                <div className={styles.promoInner}>
                    <span className={styles.promoText}>
                        Get 10 royalty-free image downloads each month with a cost-saving subscription.
                    </span>
                    <a className={styles.promoBtn} href="#">
                        Buy now
                    </a>
                </div>
            </div>

            {/* HEADER */}
            <header className={styles.header}>
                <div className={styles.headerInner}>
                    <button className={styles.mobileMenuBtn} type="button" aria-label="Open menu">
                        <i className="fas fa-bars"></i>
                    </button>

                    <div className={styles.logoWrap}>
                        <Link href="/" className={styles.logoLink}>
                            <img
                                src="/speciallogo.png"
                                alt="Special Stocks"
                                className={styles.navbarLogo}
                            />
                        </Link>
                    </div>

                    <div className={styles.headerRight}>
                        <div className={styles.pricingWrap}>
                            <span>Pricing</span>
                            <i className="fas fa-chevron-down"></i>
                        </div>

                        <i className={`fas fa-globe ${styles.headerIcon}`}></i>
                        <i className={`far fa-heart ${styles.headerIcon}`}></i>

                        <a href="#" className={styles.iconLink} aria-label="Cart">
                            <i className={`fas fa-shopping-cart ${styles.headerIcon}`}></i>
                        </a>

                        <a href="#" className={styles.loginBtn}>
                            Log in
                        </a>
                    </div>
                </div>

                {/* MAIN NAV */}
                <nav className={styles.mainNav}>
                    <a href="#" className={styles.navItem}>
                        Images <i className="fas fa-chevron-down"></i>
                    </a>
                    <a href="#" className={styles.navItem}>
                        Video <i className="fas fa-chevron-down"></i>
                    </a>
                    <a href="#" className={styles.navItem}>
                        Music <i className="fas fa-chevron-down"></i>
                    </a>
                    <a href="#" className={styles.navItem}>
                        Exclusive Images
                    </a>
                </nav>
            </header>

            {/* BREADCRUMB */}
            <div className={styles.breadcrumbWrap}>
                <div className={styles.container}>
                    <div className={styles.breadcrumb}>
                        <Link href="/">Gallery</Link>
                        <span>&gt;</span>
                        <a href="#">
                            {asset.category || "Uncategorized"}
                        </a>
                        <span>&gt;</span>
                        <span className={styles.breadcrumbCurrent}>{asset.title}</span>
                    </div>
                </div>
            </div>

            {/* MAIN GRID */}
            <div className={styles.container}>
                {/* SEARCH (Simplified) */}
                <div className={styles.searchRow}>
                    {/* Search UI can be here */}
                </div>

                <div className={styles.mainGrid}>
                    {/* LEFT: ASSET PREVIEW */}
                    <article className={styles.leftCol}>
                        <div className={styles.previewCard}>
                            <div className={styles.videoWrap}>
                                {isVideo ? (
                                    <video
                                        className={styles.video}
                                        controls
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        src={previewUrl}
                                    />
                                ) : (
                                    <img
                                        src={previewUrl}
                                        alt={asset.title}
                                        className="w-full h-auto object-contain max-h-[600px] bg-black/5"
                                        onClick={() => openFullscreen(previewUrl)}
                                    />
                                )}
                            </div>
                        </div>

                        <div className={styles.metaRow}>
                            <span className={styles.fileBadge}>{isVideo ? "VIDEO" : "IMAGE"}</span>
                        </div>

                        <div className={styles.previewWarning} role="alert">
                            <div className={styles.warnIcon}>
                                <i className="fas fa-exclamation-triangle"></i>
                            </div>
                            <div>
                                <div className={styles.warnTitle}>Preview Version</div>
                                <div className={styles.warnText}>
                                    This is a watermarked preview. Purchase to get the original high-quality file without watermarks.
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* RIGHT: SIDEBAR */}
                    <aside className={styles.rightCol}>
                        {/* Purchase options */}
                        <section className={styles.sidebarCard}>
                            <h2 className={styles.sidebarLabel}>Purchase options</h2>

                            <div className={styles.freeBox}>
                                <div className={styles.freeTitle}>Standard License</div>
                                <div className={styles.freeSub}>${asset.price || 5.00}</div>
                            </div>

                            <button
                                className={styles.greenBtn}
                                onClick={handleDownload}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                                    </svg>
                                    <span>Download Free</span>
                                </div>
                            </button>

                            {canRemove && (
                                <button
                                    className="mt-4 w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl border-2 border-red-600 text-red-600 font-bold hover:bg-red-600 hover:text-white transition-all duration-300 group shadow-sm hover:shadow-red-200 hover:shadow-lg"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
                                    Remove
                                </button>
                            )}
                        </section>

                        {/* Details */}
                        <section className={styles.sidebarCard}>
                            <h3 className={styles.detailsTitle}>Asset details</h3>

                            <div className={styles.assetIdRow}>
                                <span className={styles.assetIdText}>Asset id: {asset.id}</span>
                                <button className={styles.copyBtn} type="button" onClick={copyAssetId} aria-label="Copy asset ID">
                                    <i className="fas fa-copy"></i>
                                </button>
                                {copied && <span className={styles.copied}>Copied</span>}
                            </div>

                            <div className={styles.descWrap}>
                                <p className={`${styles.descText} ${descExpanded ? styles.descExpanded : styles.descCollapsed}`}>
                                    {asset.description || "No description provided."}
                                </p>
                                <button
                                    type="button"
                                    className={styles.seeMoreBtn}
                                    onClick={() => setDescExpanded((v) => !v)}
                                >
                                    {descExpanded ? "See less" : "See more"}
                                </button>
                            </div>

                            <div className={styles.detailLine}>
                                <strong>Tags:</strong>
                                <div className={styles.tagRow}>
                                    {asset.tags ? asset.tags.split(',').map((k, i) => (
                                        <span key={i} className={styles.tagLink}>
                                            #{k.trim()}
                                        </span>
                                    )) : "None"}
                                </div>
                            </div>

                            <div className={styles.stats}>
                                <div>Views: {asset.views}</div>
                                <div>Downloads: {asset.downloads || 0}</div>
                            </div>
                        </section>
                    </aside>
                </div>
            </div>

            {/* FOOTER */}
            <footer className={styles.footer} role="contentinfo">
                <div className={styles.footerInner}>
                    <p className={styles.copyText}>© 2003-2026 Special Stocks, Inc.</p>
                </div>
            </footer>

            {/* CONFIRMATION MODAL */}
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                itemId={asset.id}
                itemTitle={asset.title}
                sellerId={currentUser?.id}
                userRole={currentUser?.role}
            />
        </div>
    );
}
