"use client";

import React, { useMemo, useState } from "react";
import styles from "./asset_details.module.css";

export default function AssetDetailsPage() {
    // ---- Demo data (replace with your real data later) ----
    const asset = useMemo(
        () => ({
            id: 3,
            title: "Golden Gate Engineering Marvel Simple",
            category: "Travel",
            description: "cdsadn dasd sa dasdas dasdsad dsadas sadasd",
            uploadDate: "August 2, 2025",
            releaseInfo: "Signed model release on file with Special Stocks, Inc.",
            views: 124,
            downloads: 4,
            creator: "chamathka prasad",
            videoUrl:
                "https://www.specialstocks.us/serve_public.php?id=3&type=watermarked&content=asset",
            thumbUrl:
                "https://www.specialstocks.us/serve_public.php?id=3&type=thumbnail&content=asset",
            fileMeta: "9.64 MB • MP4",
            keywords: ["business", "university", "chamaht", "bmw", "bbaas"],
        }),
        []
    );

    const similarVideos = useMemo(
        () => [
            { id: 1, type: "image", title: "Watermarked Preview", thumb: "https://www.specialstocks.us/serve_public.php?id=1&type=thumbnail&content=asset" },
            { id: 8, type: "image", title: "test tsesyy", thumb: "https://www.specialstocks.us/serve_public.php?id=8&type=thumbnail&content=asset" },
            { id: 2, type: "video", title: "remembering tiananmen square", thumb: "https://www.specialstocks.us/serve_public.php?id=2&type=thumbnail&content=asset" },
            { id: 34, type: "image", title: "Avatar Male", thumb: "https://www.specialstocks.us/serve_public.php?id=34&type=thumbnail&content=asset" },
            { id: 33, type: "image", title: "Admin Icon", thumb: "https://www.specialstocks.us/serve_public.php?id=33&type=thumbnail&content=asset" },
            { id: 4, type: "image", title: "Tourist image Sri lnaka", thumb: "https://www.specialstocks.us/serve_public.php?id=4&type=thumbnail&content=asset" },
        ],
        []
    );

    const moreFromCreator = useMemo(
        () => [
            { id: 34, type: "image", title: "Avatar Male", thumb: "https://www.specialstocks.us/serve_public.php?id=34&type=thumbnail&content=asset" },
            { id: 33, type: "image", title: "Admin Icon", thumb: "https://www.specialstocks.us/serve_public.php?id=33&type=thumbnail&content=asset" },
            { id: 27, type: "image", title: "Gemini Generated", thumb: "https://www.specialstocks.us/serve_public.php?id=27&type=thumbnail&content=asset" },
            { id: 14, type: "video", title: "video generation ducks", thumb: "https://www.specialstocks.us/serve_public.php?id=14&type=thumbnail&content=asset" },
            { id: 8, type: "image", title: "test tsesyy", thumb: "https://www.specialstocks.us/serve_public.php?id=8&type=thumbnail&content=asset" },
        ],
        []
    );

    // ---- UI state ----
    const [descExpanded, setDescExpanded] = useState(false);
    const [copied, setCopied] = useState(false);

    function copyAssetId() {
        navigator.clipboard.writeText(String(asset.id));
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1200);
    }

    function openFullscreen(url) {
        window.open(url, "_blank");
    }

    return (
        <div className={styles.page}>
            {/* PROMO BAR */}
            <div className={styles.promoBar}>
                <div className={styles.promoInner}>
                    <span className={styles.promoText}>
                        Get 10 royalty-free image downloads each month with a cost-saving subscription.
                    </span>
                    <a className={styles.promoBtn} href="https://www.specialstocks.us/register.php">
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
                        <a href="https://www.specialstocks.us/index.php" className={styles.logoLink}>
                            <img
                                src="/speciallogo.png"
                                alt="Special Stocks"
                                className={styles.navbarLogo}
                            />
                        </a>
                    </div>

                    <div className={styles.headerRight}>
                        <div className={styles.pricingWrap}>
                            <span>Pricing</span>
                            <i className="fas fa-chevron-down"></i>
                        </div>

                        <i className={`fas fa-globe ${styles.headerIcon}`}></i>
                        <i className={`far fa-heart ${styles.headerIcon}`}></i>

                        <a href="https://www.specialstocks.us/cart.php" className={styles.iconLink} aria-label="Cart">
                            <i className={`fas fa-shopping-cart ${styles.headerIcon}`}></i>
                        </a>

                        <a href="https://www.specialstocks.us/login.php" className={styles.loginBtn}>
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
                        <a href="https://www.specialstocks.us/index.php">Gallery</a>
                        <span>&gt;</span>
                        <a href={`https://www.specialstocks.us/search.php?category=${asset.category.toLowerCase()}`}>
                            {asset.category}
                        </a>
                        <span>&gt;</span>
                        <span className={styles.breadcrumbCurrent}>{asset.title}</span>
                    </div>
                </div>
            </div>

            {/* SEARCH */}
            <div className={styles.container}>
                <div className={styles.searchRow}>
                    <form className={styles.searchForm} action="https://www.specialstocks.us/search.php" method="GET" role="search">
                        <select name="type" className={styles.searchSelect} aria-label="Asset type">
                            <option value="">All assets</option>
                            <option value="image">Images</option>
                            <option value="video">Videos</option>
                        </select>

                        <input
                            type="text"
                            name="q"
                            className={styles.searchInput}
                            placeholder="Start your next project"
                            aria-label="Search for assets"
                        />

                        <button type="submit" className={styles.searchBtn} aria-label="Search">
                            <i className="fas fa-search"></i>
                        </button>
                    </form>

                    <button className={styles.searchByImageBtn} type="button" aria-label="Search by image">
                        <i className="fas fa-camera"></i>
                        <span>Search by image</span>
                    </button>
                </div>

                {/* MAIN GRID */}
                <div className={styles.mainGrid}>
                    {/* LEFT: ASSET PREVIEW */}
                    <article className={styles.leftCol}>
                        <div className={styles.previewCard}>
                            <div className={styles.videoWrap}>
                                <video
                                    className={styles.video}
                                    controls
                                    preload="metadata"
                                    onClick={() => openFullscreen(asset.videoUrl)}
                                >
                                    <source src={asset.videoUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>

                                <div className={styles.fullscreenHint}>
                                    <i className="fas fa-expand"></i> Click to view full screen
                                </div>
                            </div>
                        </div>

                        <div className={styles.metaRow}>
                            <span className={styles.fileBadge}>{asset.fileMeta}</span>
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
                                <div className={styles.freeTitle}>FREE Download</div>
                                <div className={styles.freeSub}>No cost required</div>
                            </div>

                            <a
                                href={`https://www.specialstocks.us/login.php?redirect=%2Fasset_details.php%3Fid%3D${asset.id}`}
                                className={styles.greenBtn}
                            >
                                Login to Download
                            </a>

                            <div className={styles.seeAllWrap}>
                                <a href="https://www.specialstocks.us/search.php" className={styles.seeAllLink}>
                                    See all assets
                                </a>
                            </div>
                        </section>

                        {/* Video details */}
                        <section className={styles.sidebarCard}>
                            <h3 className={styles.detailsTitle}>Video details</h3>

                            <div className={styles.assetIdRow}>
                                <span className={styles.assetIdText}>Asset id: {asset.id}</span>
                                <button className={styles.copyBtn} type="button" onClick={copyAssetId} aria-label="Copy asset ID">
                                    <i className="fas fa-copy"></i>
                                </button>
                                {copied && <span className={styles.copied}>Copied</span>}
                            </div>

                            <div className={styles.descWrap}>
                                <p className={`${styles.descText} ${descExpanded ? styles.descExpanded : styles.descCollapsed}`}>
                                    {asset.description}
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
                                <strong>Release information:</strong> {asset.releaseInfo}
                            </div>

                            <div className={styles.detailLine}>
                                <strong>Upload date:</strong> {asset.uploadDate}
                            </div>

                            <div className={styles.detailLine}>
                                <strong>Categories:</strong>
                                <div className={styles.badgeRow}>
                                    <a
                                        href={`https://www.specialstocks.us/search.php?category=${asset.category.toLowerCase()}`}
                                        className={styles.categoryBadge}
                                    >
                                        {asset.category}
                                    </a>
                                </div>

                                <div className={styles.tagRow}>
                                    {asset.keywords.map((k) => (
                                        <a key={k} href={`https://www.specialstocks.us/search.php?q=${k}`} className={styles.tagLink}>
                                            #{k}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.creatorRow}>
                                <div className={styles.avatarCircle}>C</div>
                                <span className={styles.creatorName}>{asset.creator}</span>
                            </div>

                            <div className={styles.stats}>
                                <div>Views: {asset.views}</div>
                                <div>Downloads: {asset.downloads}</div>
                            </div>
                        </section>
                    </aside>
                </div>

                {/* SIMILAR VIDEOS */}
                <section className={styles.section}>
                    <div className={styles.sectionHead}>
                        <h2 className={styles.sectionTitle}>Similar videos</h2>
                        <a href={`https://www.specialstocks.us/search.php?seller_id=${asset.id}`} className={styles.sectionLink}>
                            See all
                        </a>
                    </div>

                    <div className={styles.cardsGrid6}>
                        {similarVideos.map((item) => (
                            <div key={item.id} className={styles.imgCard}>
                                {item.type === "video" ? (
                                    <video className={styles.cardMedia} muted>
                                        <source src={item.thumb} type="video/mp4" />
                                    </video>
                                ) : (
                                    <img className={styles.cardMedia} src={item.thumb} alt={item.title} loading="lazy" />
                                )}

                                <button className={styles.saveBtn} type="button" aria-label="Add to favorites">
                                    <i className="fa-regular fa-heart"></i>
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* MORE FROM CREATOR */}
                <section className={styles.section}>
                    <div className={styles.sectionHead}>
                        <h2 className={styles.sectionTitle}>More from {asset.creator}</h2>
                        <a href={`https://www.specialstocks.us/search.php?seller_id=${asset.id}`} className={styles.sectionLink}>
                            See all
                        </a>
                    </div>

                    <div className={styles.cardsGrid5}>
                        {moreFromCreator.map((item) => (
                            <div key={item.id} className={styles.imgCard}>
                                {item.type === "video" ? (
                                    <video className={styles.cardMedia} muted>
                                        <source src={item.thumb} type="video/mp4" />
                                    </video>
                                ) : (
                                    <img className={styles.cardMedia} src={item.thumb} alt={item.title} loading="lazy" />
                                )}

                                <button className={styles.saveBtn} type="button" aria-label="Add to favorites">
                                    <i className="fa-regular fa-heart"></i>
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* FOOTER */}
            <footer className={styles.footer} role="contentinfo">
                <div className={styles.footerInner}>
                    <p className={styles.footerTopText}>
                        We have more than <span className={styles.footerUnderline}>34 assets</span> on Special Stocks.com as of January 3, 2026.
                    </p>

                    <div className={styles.footerGrid}>
                        <div className={styles.footerBrand}>
                            <div className={styles.footerLogoWrap}>
                                <img src="/speciallogo.png" alt="Special Stocks Logo" className={styles.footerLogo} />
                                <h2 className={styles.footerLogoFallback}>Special Stocks</h2>
                            </div>

                            <button className={styles.langBtn} aria-label="Language selection" type="button">
                                <i className="fas fa-globe"></i>
                                <span>English</span>
                                <i className="fa-solid fa-chevron-down"></i>
                            </button>
                        </div>

                        <div>
                            <h3 className={styles.footerTitle}>Our company</h3>
                            <ul className={styles.footerList}>
                                <li><a href="#" className={styles.footerLink}>About us</a></li>
                                <li><a href="#" className={styles.footerLink}>Careers</a></li>
                                <li><a href="#" className={styles.footerLink}>Press/media</a></li>
                                <li><a href="#" className={styles.footerLink}>Investor relations</a></li>
                                <li><a href="#" className={styles.footerLink}>Special Stocks blog</a></li>
                                <li><a href="#" className={styles.footerLink}>Coupons</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className={styles.footerTitle}>Browse</h3>
                            <ul className={styles.footerList}>
                                <li><a href="https://www.specialstocks.us/images.php" className={styles.footerLink}>Images</a></li>
                                <li><a href="https://www.specialstocks.us/videos.php" className={styles.footerLink}>Videos</a></li>
                                <li><a href="https://www.specialstocks.us/search.php" className={styles.footerLink}>Advanced Search</a></li>
                                <li><a href="#" className={styles.footerLink}>Free Assets</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className={styles.footerTitle}>Products and services</h3>
                            <ul className={styles.footerList}>
                                <li><a href="https://www.specialstocks.us/images.php" className={styles.footerLink}>Images</a></li>
                                <li><a href="https://www.specialstocks.us/videos.php" className={styles.footerLink}>Video</a></li>
                                <li><a href="#" className={styles.footerLink}>Music</a></li>
                                <li><a href="#" className={styles.footerLink}>Editorial</a></li>
                                <li><a href="#" className={styles.footerLink}>3D</a></li>
                                <li><a href="#" className={styles.footerLink}>AI solutions</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className={styles.footerTitle}>Legal</h3>
                            <ul className={styles.footerList}>
                                <li><a href="#" className={styles.footerLink}>Website terms of use</a></li>
                                <li><a href="#" className={styles.footerLink}>Terms of service</a></li>
                                <li><a href="#" className={styles.footerLink}>Privacy policy</a></li>
                                <li><a href="#" className={styles.footerLink}>Modern slavery statement</a></li>
                                <li><a href="#" className={styles.footerLink}>Patents</a></li>
                                <li><a href="#" className={styles.footerLink}>Cookie preferences</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className={styles.footerTitle}>Contact us</h3>
                            <ul className={styles.footerList}>
                                <li><a href="#" className={styles.footerLink}>Help center</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.footerBottom}>
                        <p className={styles.copyText}>© 2003-2026 Special Stocks, Inc.</p>
                        <div className={styles.socialRow}>
                            <a href="#" aria-label="Facebook" className={styles.socialLink}><i className="fab fa-facebook"></i></a>
                            <a href="#" aria-label="Instagram" className={styles.socialLink}><i className="fab fa-instagram"></i></a>
                            <a href="#" aria-label="LinkedIn" className={styles.socialLink}><i className="fab fa-linkedin"></i></a>
                            <a href="#" aria-label="YouTube" className={styles.socialLink}><i className="fab fa-youtube"></i></a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
