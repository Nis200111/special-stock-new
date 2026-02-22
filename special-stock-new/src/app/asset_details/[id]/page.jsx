"use client";

import React, { useMemo, useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import styles from "./asset_details.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, X, Search, Camera, ChevronDown, ShoppingCart, Zap } from "lucide-react";
import ConfirmationModal from "@/components/ui/ConfirmationModal";
import { deleteItem } from "@/app/actions/itemActions";
import { Navbar } from "@/components";

export default function AssetDetailsPage() {
    const params = useParams();
    const { id } = params;

    const [asset, setAsset] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setIsImageModalOpen(false);
        };
        if (isImageModalOpen) window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isImageModalOpen]);

    const [descExpanded, setDescExpanded] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                const storedRole = localStorage.getItem("userRole");
                if (!user.role && storedRole) user.role = storedRole;
                setCurrentUser(user);
            } catch (e) {
                console.error("Failed to parse user", e);
            }
        }

        if (!id) return;

        const fetchAsset = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/public/image/${id}`);
                const data = await response.json();
                if (data.success) setAsset(data.data);
                else setError("Asset not found");
            } catch (err) {
                setError("Failed to load asset details");
            } finally {
                setLoading(false);
            }
        };
        fetchAsset();
    }, [id]);

    const isVideo = asset?.contentType === 'video' || asset?.filename?.match(/\.(mp4|mov|quicktime)$/i);

    const previewUrl = useMemo(() => {
        if (!asset) return '';
        let pathStr = asset.watermarkedFilepath || asset.imageUrl || asset.filepath;
        if (!pathStr) return '';
        return pathStr.startsWith('http') ? pathStr : `http://localhost:5000${pathStr.startsWith('/') ? '' : '/'}${pathStr}`;
    }, [asset]);

    function copyAssetId() {
        if (asset) {
            navigator.clipboard.writeText(String(asset.id));
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1200);
        }
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
            link.download = asset.filename || `special-stock-${asset.id}.${isVideo ? 'mp4' : 'jpg'}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            alert("Failed to download file.");
        }
    };

    const canRemove = asset && currentUser && (
        String(currentUser.id) === String(asset.sellerId) ||
        (currentUser.role && ['admin', 'super_admin', 'manager'].includes(currentUser.role.toLowerCase().trim()))
    );

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error || !asset) return <div className="flex justify-center items-center h-screen text-red-500">{error || "Asset not found"}</div>;

    return (
        <div className={styles.page}>
            {/* PROMO BAR */}
            <div className={styles.promoBar}>
                <div className={styles.promoInner}>
                    <span className={styles.promoText}>
                        Get 10 royalty-free image downloads each month with a cost-saving subscription.
                    </span>
                    <a className={styles.promoBtn} href="#">Buy now</a>
                </div>
            </div>

            <Navbar />

            {/* BREADCRUMB */}
            <div className={styles.breadcrumbWrap}>
                <div className={styles.container}>
                    <div className={styles.breadcrumb}>
                        <Link href="/">Gallery</Link>
                        <span>&gt;</span>
                        <a href="#">{asset.category || "Uncategorized"}</a>
                        <span>&gt;</span>
                        <span className={styles.breadcrumbCurrent}>{asset.title}</span>
                    </div>
                </div>
            </div>

            <div className={styles.container}>
                {/* SEARCH ROW */}
                <div className={styles.searchRow}>
                    <div className={styles.searchForm}>
                        <button className={styles.searchSelect}>
                            All assets <ChevronDown size={14} className="inline ml-1 opacity-60" />
                        </button>
                        <input
                            type="text"
                            className={styles.searchInput}
                            placeholder="Start your next project"
                        />
                        <button className={styles.searchBtn}>
                            <Search size={18} strokeWidth={2.5} />
                        </button>
                    </div>
                    <button className={styles.searchByImageBtn}>
                        <Camera size={18} />
                        <span>Search by image</span>
                    </button>
                </div>

                {/* MAIN GRID */}
                <div className={styles.mainGrid}>
                    <article className={styles.leftCol}>
                        <div className={styles.previewCard}>
                            <div className={styles.videoWrap} style={{ width: '100%', height: '100%' }}>
                                {isVideo ? (
                                    <video
                                        className={styles.video}
                                        controls autoPlay muted loop playsInline
                                        src={previewUrl}
                                    />
                                ) : (
                                    <img
                                        src={previewUrl}
                                        alt={asset.title}
                                        className={styles.assetImage}
                                        onClick={() => setIsImageModalOpen(true)}
                                    />
                                )}
                            </div>
                        </div>

                        <div className={styles.metaRow}>
                            <span className={styles.fileBadge}>{isVideo ? "VIDEO" : "IMAGE"}</span>
                        </div>

                        <div className={styles.previewWarning}>
                            <div className={styles.warnIcon}>⚠️</div>
                            <div>
                                <div className={styles.warnTitle}>Preview Version</div>
                                <div className={styles.warnText}>
                                    This is a watermarked preview. Purchase to get the original high-quality file without watermarks.
                                </div>
                            </div>
                        </div>
                    </article>

                    <aside className={styles.rightCol}>
                        <section className={styles.purchaseCard}>
                            <h2 className={styles.sidebarLabel}>Purchase options</h2>

                            <div className={styles.priceOptionBox}>
                                <div className={styles.radioCircleSelected}></div>
                                <div className={styles.priceDetails}>
                                    <div className={styles.mainPrice}>
                                        ${asset.price || "1.99"} <span className="text-lg font-normal">— One time</span>
                                    </div>
                                    <span className="text-xs text-gray-500">No commitment</span>
                                </div>
                            </div>

                            <button className={styles.addToCartBtn}>
                                <ShoppingCart size={18} />
                                <span>Add to Cart</span>
                            </button>

                            <button className={styles.buyNowBtn}>
                                <Zap size={18} fill="currentColor" />
                                <span>Buy Now</span>
                            </button>

                            <div className="bg-gray-50 p-3 rounded-lg text-center text-[11px] text-gray-500 leading-relaxed mt-2">
                                After purchase, you&apos;ll get the original high-quality file without watermarks
                            </div>

                            <div className="text-center mt-3">
                                <Link href="/gallery" className="text-xs text-gray-500 hover:underline">
                                    See all assets
                                </Link>
                            </div>

                            {/* REMOVE BUTTON SECTION REMOVED AS REQUESTED */}
                        </section>

                        <section className={styles.sidebarCard}>
                            <h3 className={styles.detailsTitle}>Asset details</h3>
                            <div className={styles.assetIdRow}>
                                <span className={styles.assetIdText}>Asset id: {asset.id}</span>
                                <button className={styles.copyBtn} onClick={copyAssetId}>📋</button>
                                {copied && <span className={styles.copied}>Copied</span>}
                            </div>
                            <div className={styles.descWrap}>
                                <p className={`${styles.descText} ${descExpanded ? styles.descExpanded : styles.descCollapsed}`}>
                                    {asset.description || "No description provided."}
                                </p>
                                <button className={styles.seeMoreBtn} onClick={() => setDescExpanded(!descExpanded)}>
                                    {descExpanded ? "See less" : "See more"}
                                </button>
                            </div>
                            <div className={styles.detailLine}>
                                <strong>Tags:</strong>
                                <div className={styles.tagRow}>
                                    {asset.tags ? asset.tags.split(',').map((k, i) => (
                                        <span key={i} className={styles.tagLink}>#{k.trim()}</span>
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

            <footer className={styles.footer}>
                <div className={styles.footerInner}>
                    <p className={styles.copyText}>© 2003-2026 Special Stocks, Inc.</p>
                </div>
            </footer>

            <ConfirmationModal
                isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
                itemId={asset.id} itemTitle={asset.title}
                sellerId={currentUser?.id} userRole={currentUser?.role}
            />

            {/* LIGHTBOX */}
            {isImageModalOpen && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(12px)' }}>
                    <button onClick={() => setIsImageModalOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}>
                        <X size={32} />
                    </button>
                    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setIsImageModalOpen(false)}>
                        <h1 style={{ position: 'absolute', top: '20px', left: '20px', color: 'white', fontWeight: 'bold', fontSize: '24px', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                            {asset.title}
                        </h1>
                        <img src={previewUrl} style={{ maxWidth: '90%', maxHeight: '85%', objectFit: 'contain' }} />
                        <div style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
                            Press ESC to close
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}