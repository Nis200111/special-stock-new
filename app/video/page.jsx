"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./video.module.css";

export default function VideoPage() {
    const videos = useMemo(
        () => [
            "https://www.specialstocks.us/serve_public.php?id=3&type=watermarked&content=asset",
            "https://www.specialstocks.us/serve_public.php?id=2&type=watermarked&content=asset",
            "https://www.specialstocks.us/serve_public.php?id=6&type=watermarked&content=asset",
            "https://www.specialstocks.us/serve_public.php?id=5&type=watermarked&content=asset",
        ],
        []
    );

    // dropdown
    const [ddOpen, setDdOpen] = useState(false);
    const [ddLabel, setDdLabel] = useState("All videos");
    const [searchType, setSearchType] = useState("video");

    // search
    const [q, setQ] = useState("");

    // hero video rotate
    const [activeVideo, setActiveVideo] = useState(0);

    const ddWrapRef = useRef(null);

    // collections slider
    const collectionsRef = useRef(null);

    const trendingFilters = useMemo(
        () => ["Business", "Business", "University", "Chamaht", "Bmw", "Bbaas", "Banana", "Sdad"],
        []
    );

    const trendingItems = useMemo(
        () => [
            {
                id: 3,
                title: "Golden Gate Engineering Marvel Simple",
                by: "chamathka prasad",
                price: "$0.00",
                duration: "0:16",
                thumb: "https://www.specialstocks.us/serve_public.php?id=3&type=thumbnail&content=asset",
            },
            {
                id: 2,
                title: "Remembering Tiananmen Square Simple Compos",
                by: "chamathka prasad",
                price: "$0.00",
                duration: "0:45",
                thumb: "https://www.specialstocks.us/serve_public.php?id=2&type=thumbnail&content=asset",
            },
            {
                id: 5,
                title: "chamathka prasad image",
                by: "Administrator",
                price: "$0.00",
                duration: "0:27",
                thumb: "https://www.specialstocks.us/serve_public.php?id=5&type=thumbnail&content=asset",
            },
            {
                id: 6,
                title: "Kennedy's Hope and Mourning_simple_compose",
                by: "Administrator",
                price: "$2.00",
                duration: "0:34",
                thumb: "https://www.specialstocks.us/serve_public.php?id=6&type=thumbnail&content=asset",
            },
            {
                id: 11,
                title: "vide watermark",
                by: "Administrator",
                price: "$0.00",
                duration: "0:27",
                thumb: "https://www.specialstocks.us/serve_public.php?id=11&type=thumbnail&content=asset",
            },
            {
                id: 14,
                title: "Video Generation ducks",
                by: "chamathka prasad",
                price: "$0.00",
                duration: "0:28",
                thumb: "https://www.specialstocks.us/serve_public.php?id=14&type=thumbnail&content=asset",
            },
        ],
        []
    );

    const collections = useMemo(
        () => [
            {
                id: 1,
                title: "AI Generated Portraits",
                count: "3 videos",
                cover:
                    "https://www.specialstocks.us/serve_collection_cover.php?f=Gemini_Generated_Image_a2yvsya2yvsya2yv_1759292905_27d6d853.png",
                href: "https://www.specialstocks.us/collection_details.php?id=1",
            },
        ],
        []
    );

    const browseCategories = useMemo(
        () => [
            {
                label: "Business",
                href: "search.php?q=business&type=video",
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=faces",
            },
            {
                label: "Nature",
                href: "search.php?q=nature&type=video",
                img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
            },
            {
                label: "Technology",
                href: "search.php?q=technology&type=video",
                img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
            },
            {
                label: "Lifestyle",
                href: "search.php?q=lifestyle&type=video",
                img: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&h=600&fit=crop",
            },
            {
                label: "Food & Cooking",
                href: "search.php?q=food&type=video",
                img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
            },
            {
                label: "Travel",
                href: "search.php?q=travel&type=video",
                img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
            },
            {
                label: "Abstract",
                href: "search.php?q=abstract&type=video",
                img: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=600&fit=crop",
            },
            {
                label: "Aerial",
                href: "search.php?q=aerial&type=video",
                img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
            },
            {
                label: "Medical",
                href: "search.php?q=medical&type=video",
                img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
            },
            {
                label: "Sports",
                href: "search.php?q=sports&type=video",
                img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop",
            },
            {
                label: "Animation",
                href: "search.php?q=animation&type=video",
                img: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
            },
            {
                label: "Motion Graphics",
                href: "search.php?q=motion+graphics&type=video",
                img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop",
            },
        ],
        []
    );

    const companyLogos = useMemo(
        () => [
            { href: "https://www.digitustec.com.au/", src: "/Digitus.png", alt: "Digitus Logo" },
            { href: "https://thecyol.com/", src: "/CYOL.png", alt: "CYOL Logo" },
            { href: "https://www.jadetimes.com/", src: "/Jadetimes.png", alt: "Jadetimes Logo" },
            { href: "https://www.nyfilms.com", src: "/NYFIlms.png", alt: "NY Films Logo" },
            { href: "https://www.jadetimesuniversity.com/", src: "/JadetimesLogo.png", alt: "Jadetimes University" },
            { href: "https://www.specialbrands.us", src: "/SpecialBrands.png", alt: "Special Brands" },
            { href: "https://www.specialprinters.us/", src: "/SpecialPrinters.png", alt: "Special Printers" },
            { href: "https://www.mysticcompasscoach.com/", src: "/Mistic.png", alt: "Mystic Compass" },
            { href: "https://www.specialgraphics.us", src: "/SPecialGraphgics .png", alt: "Special Graphics" },
        ],
        []
    );

    useEffect(() => {
        const onDown = (e) => {
            if (!ddWrapRef.current) return;
            if (!ddWrapRef.current.contains(e.target)) setDdOpen(false);
        };
        document.addEventListener("mousedown", onDown);
        return () => document.removeEventListener("mousedown", onDown);
    }, []);

    useEffect(() => {
        const t = setInterval(() => {
            setActiveVideo((i) => (i + 1) % videos.length);
        }, 5000);
        return () => clearInterval(t);
    }, [videos.length]);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log({ searchType, q });
    };

    const pickType = (value, label) => {
        setSearchType(value);
        setDdLabel(label);
        setDdOpen(false);
    };

    const scrollCollections = (dir) => {
        if (!collectionsRef.current) return;
        const el = collectionsRef.current;
        const amount = Math.min(520, el.clientWidth * 0.8);
        el.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth" });
    };

    return (
        <div className={styles.page}>
            {/* Promo bar */}
            <div className={styles.promoBar}>
                <div className={styles.promoInner}>
                    <span className={styles.promoText}>
                        Get 10 royalty-free video downloads each month with a cost-saving subscription.
                    </span>
                    <button className={styles.promoBtn} type="button">
                        Buy now
                    </button>
                </div>
            </div>

            {/* Header */}
            <header className={styles.header}>
                <div className={styles.headerInner}>
                    <div className={styles.headerLeft}>
                        <button className={styles.mobileMenuBtn} type="button" aria-label="Menu">
                            <i className="fas fa-bars" />
                        </button>
                    </div>

                    <div className={styles.logoCenter}>
                        <a href="/" className={styles.logoLink}>
                            <img
                                src="/speciallogo.png"
                                alt="Special Stocks"
                                className={styles.logoImg}
                                onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                }}
                            />
                            <span className={styles.logoFallback}>
                                <span className={styles.logoLight}>Special</span>{" "}
                                <span className={styles.logoBold}>Stocks</span>
                            </span>
                        </a>
                    </div>

                    <div className={styles.headerRight}>
                        <button className={styles.pricingBtn} type="button">
                            Pricing <span className={styles.chev}>▾</span>
                        </button>

                        <button className={styles.iconBtn} type="button" aria-label="Language">
                            <i className="fas fa-globe" />
                        </button>

                        <button className={styles.iconBtn} type="button" aria-label="Favorites">
                            <i className="far fa-heart" />
                        </button>

                        <a className={styles.iconLink} href="/cart" aria-label="Cart">
                            <i className="fas fa-shopping-cart" />
                        </a>

                        <a className={styles.loginBtn} href="/login">
                            Log in
                        </a>
                    </div>
                </div>

                <nav className={styles.nav}>
                    <a className={styles.navItem} href="#">
                        Images <span className={styles.navChev}>▾</span>
                    </a>
                    <a className={`${styles.navItem} ${styles.navActive}`} href="#">
                        Video <span className={styles.navChev}>▾</span>
                    </a>
                    <a className={styles.navItem} href="#">
                        Music <span className={styles.navChev}>▾</span>
                    </a>
                    <a className={styles.navItem} href="#">
                        Exclusive Images
                    </a>
                </nav>
            </header>

            {/* HERO */}
            <main className={styles.hero}>
                <div className={styles.heroVideoContainer}>
                    {videos.map((src, idx) => (
                        <video
                            key={src}
                            className={`${styles.heroVideo} ${idx === activeVideo ? styles.active : ""}`}
                            autoPlay
                            muted
                            loop
                            playsInline
                        >
                            <source src={src} type="video/mp4" />
                        </video>
                    ))}
                    <div className={styles.heroOverlay} />
                </div>

                <div className={styles.heroContent}>
                    <h3 className={styles.heroTitle}>
                        Unleash your creativity with unrivaled video <br /> footage
                    </h3>
                    <p className={styles.heroDesc}>
                        From stunning 4K to HD video content. Perfect for social media, commercials, and films.
                    </p>

                    {/* Search Bar (UPDATED to match screenshot: long + less wide) */}
                    <form onSubmit={onSubmit} className={styles.searchWrap}>
                        <div className={styles.searchPanel}>
                            {/* Left dropdown */}
                            <div className={styles.ddWrap} ref={ddWrapRef}>
                                <button
                                    type="button"
                                    className={styles.ddBtn}
                                    onClick={() => setDdOpen((v) => !v)}
                                    aria-haspopup="listbox"
                                    aria-expanded={ddOpen}
                                >
                                    <i className="fas fa-video" />
                                    <span className={styles.ddLabel}>{ddLabel}</span>
                                    <i className={`fas fa-chevron-down ${styles.ddChev}`} />
                                </button>

                                <input type="hidden" name="type" value={searchType} />

                                {ddOpen && (
                                    <div className={styles.ddMenu} role="listbox">
                                        <button type="button" className={styles.ddItem} onClick={() => pickType("video", "All videos")}>
                                            <i className="fas fa-video" /> All videos
                                        </button>
                                        <button type="button" className={styles.ddItem} onClick={() => pickType("image", "Images")}>
                                            <i className="far fa-image" /> Images
                                        </button>
                                        <button type="button" className={styles.ddItem} onClick={() => pickType("music", "Music")}>
                                            <i className="fas fa-music" /> Music
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Middle input */}
                            <div className={styles.searchInputWrap}>
                                <input
                                    className={styles.searchInput}
                                    value={q}
                                    onChange={(e) => setQ(e.target.value)}
                                    placeholder="Search for video footage"
                                />
                            </div>

                            {/* Red search button */}
                            <button className={styles.searchBtn} type="submit" aria-label="Search">
                                <i className="fas fa-search" />
                            </button>

                            {/* Right search by image */}
                            <button type="button" className={styles.byImageBtn}>
                                <i className="fas fa-camera" />
                                <span>Search by image</span>
                            </button>
                        </div>

                        {/* Pills */}
                        <div className={styles.pills}>
                            {["Business", "Nature", "Technology", "People", "Abstract", "Travel"].map((t) => (
                                <button
                                    key={t}
                                    type="button"
                                    className={styles.pill}
                                    onClick={() => setQ((prev) => (prev.trim() ? `${prev} ${t}` : t))}
                                >
                                    <i className="fas fa-search" /> {t}
                                </button>
                            ))}
                        </div>
                    </form>
                </div>
            </main>

            {/* Explore Stock Footage Categories */}
            <section className={styles.exploreCats}>
                <div className={styles.sectionInner}>
                    <h2 className={styles.sectionHeading}>Explore Stock Footage Categories</h2>

                    <div className={styles.exploreGrid}>
                        {[
                            { label: "4K Videos" },
                            { label: "HD Footage" },
                            { label: "Stock Footage" },
                            { label: "Motion Graphics" },
                        ].map((c) => (
                            <a key={c.label} className={styles.exploreCard} href="#">
                                <div className={styles.exploreIcon}>
                                    <i className="fas fa-video" />
                                </div>
                                <span className={styles.exploreLabel}>{c.label}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* See what's trending */}
            <section className={styles.trending}>
                <div className={styles.sectionInner}>
                    <h2 className={styles.sectionHeading}>See what's trending</h2>

                    <div className={styles.filterRow}>
                        {trendingFilters.map((f, idx) => (
                            <a
                                key={`${f}-${idx}`}
                                href="#"
                                className={`${styles.filterPill} ${idx < 2 ? styles.filterPillActive : ""}`}
                            >
                                <i className="fas fa-search" />
                                <span>{f}</span>
                            </a>
                        ))}
                    </div>

                    <div className={styles.tabsRow}>
                        <a href="#" className={`${styles.tab} ${styles.tabActive}`}>
                            Handpicked content
                        </a>
                        <a href="#" className={styles.tab}>
                            Most Popular
                        </a>
                    </div>

                    <div className={styles.trendingGrid}>
                        {trendingItems.map((v) => (
                            <a key={v.id} href={`asset_details.php?id=${v.id}`} className={styles.videoCard}>
                                <div className={styles.videoThumb}>
                                    <img src={v.thumb} alt={v.title} className={styles.videoImg} />
                                    <div className={styles.videoDuration}>{v.duration}</div>
                                </div>

                                <div className={styles.videoOverlay}>
                                    <div className={styles.videoPrice}>{v.price}</div>
                                    <div className={styles.videoMeta}>
                                        <h5 className={styles.videoTitle}>{v.title}</h5>
                                        <p className={styles.videoBy}>By {v.by}</p>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>

                    <div className={styles.centerBtnRow}>
                        <a href="search.php?type=video" className={styles.outlineRoundBtn}>
                            See More Videos
                        </a>
                    </div>
                </div>
            </section>

            {/* Explore fresh video collections */}
            <section className={styles.collections}>
                <div className={styles.sectionInner}>
                    <div className={styles.collectionsHeader}>
                        <h2 className={styles.sectionHeading}>Explore fresh video collections</h2>
                        <a href="https://www.specialstocks.us/collections.php?type=video" className={styles.smallOutlineBtn}>
                            See all collections
                        </a>
                    </div>

                    <div className={styles.collectionsWrap}>
                        <div className={styles.collectionsTrack} ref={collectionsRef}>
                            {collections.map((c) => (
                                <a key={c.id} href={c.href} className={styles.collectionCard}>
                                    <img src={c.cover} alt={c.title} className={styles.collectionImg} />
                                    <div className={styles.collectionGrad} />
                                    <div className={styles.collectionText}>
                                        <h3 className={styles.collectionTitle}>{c.title}</h3>
                                        <p className={styles.collectionCount}>{c.count}</p>
                                    </div>
                                </a>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={() => scrollCollections("prev")}
                            className={`${styles.sliderBtn} ${styles.sliderPrev}`}
                            aria-label="Previous"
                        >
                            <i className="fas fa-chevron-left" />
                        </button>

                        <button
                            type="button"
                            onClick={() => scrollCollections("next")}
                            className={`${styles.sliderBtn} ${styles.sliderNext}`}
                            aria-label="Next"
                        >
                            <i className="fas fa-chevron-right" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Weekly dose */}
            <section className={styles.weekly}>
                <div className={styles.sectionInner}>
                    <div className={styles.weeklyGrid}>
                        <div className={styles.weeklyLeft}>
                            <h2 className={styles.weeklyTitle}>
                                <span>A weekly dose of</span>
                                <span>video inspiration,</span>
                                <span>just for you</span>
                            </h2>
                            <p className={styles.weeklyDesc}>Sign up and get a free video or motion graphics every week</p>
                            <a href="register.php" className={styles.redRoundBtn}>
                                Get Started
                            </a>
                        </div>

                        <div className={styles.weeklyRight}>
                            <div className={styles.freeCard}>
                                <div className={styles.freeThumb}>
                                    <img
                                        src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop"
                                        alt="Free stock video of the week"
                                    />
                                </div>
                                <p className={styles.freeTitle}>Free stock video of the week</p>
                                <p className={styles.freeBy}>By Professional Studios</p>
                                <a className={styles.freeLink} href="#">
                                    Download
                                </a>
                            </div>

                            <div className={styles.freeCard}>
                                <div className={styles.freeThumb}>
                                    <img
                                        src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop"
                                        alt="Free motion graphics of the week"
                                    />
                                </div>
                                <p className={styles.freeTitle}>Free motion graphics of the week</p>
                                <p className={styles.freeBy}>By Creative Studios</p>
                                <a className={styles.freeLink} href="#">
                                    Download
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Browse by category */}
            <section className={styles.browse}>
                <div className={styles.sectionInner}>
                    <h2 className={styles.sectionHeading}>Browse video footage by category</h2>

                    <div className={styles.browseGrid}>
                        {browseCategories.map((c) => (
                            <a key={c.label} href={c.href} className={styles.browseCard}>
                                <div className={styles.browseThumb}>
                                    <img src={c.img} alt={c.label} />
                                </div>
                                <p className={styles.browseLabel}>{c.label}</p>
                            </a>
                        ))}
                    </div>

                    <div className={styles.centerBtnRow}>
                        <a href="search.php?type=video" className={styles.outlineRoundBtn}>
                            See more
                        </a>
                    </div>
                </div>
            </section>

            {/* Tips and tricks */}
            <section className={styles.tips}>
                <div className={styles.sectionInner}>
                    <h2 className={styles.tipsHeading}>Tips and tricks for video content</h2>

                    <div className={styles.tipsBig}>
                        <div className={styles.tipsBigImg}>
                            <img
                                src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&h=800&fit=crop"
                                alt="Video Format Selection"
                            />
                        </div>
                        <div className={styles.tipsBigText}>
                            <h4 className={styles.tipsTitle}>How to Choose the Right Video Format for Your Project</h4>
                            <p className={styles.tipsDesc}>
                                Learn about different video formats, resolutions, and frame rates to pick the perfect footage for your
                                creative content and marketing campaigns.
                            </p>
                        </div>
                    </div>

                    <div className={styles.tipsGrid}>
                        <article className={styles.tipsCard}>
                            <div className={styles.tipsImg}>
                                <img
                                    src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=900&h=700&fit=crop"
                                    alt="Social Media Video"
                                />
                            </div>
                            <h4 className={styles.tipsTitle}>Best Practices for Social Media Video</h4>
                            <p className={styles.tipsDesc}>
                                Discover optimal video lengths, aspect ratios, and content strategies for different social media
                                platforms.
                            </p>
                        </article>

                        <article className={styles.tipsCard}>
                            <div className={styles.tipsImg}>
                                <img
                                    src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=900&h=700&fit=crop"
                                    alt="Video Thumbnails"
                                />
                            </div>
                            <h4 className={styles.tipsTitle}>Creating Engaging Video Thumbnails</h4>
                            <p className={styles.tipsDesc}>
                                Learn how to create compelling thumbnails that boost click-through rates and engagement.
                            </p>
                        </article>

                        <article className={styles.tipsCard}>
                            <div className={styles.tipsImg}>
                                <img
                                    src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=900&h=700&fit=crop"
                                    alt="Video SEO"
                                />
                            </div>
                            <h4 className={styles.tipsTitle}>Video SEO and Optimization Techniques</h4>
                            <p className={styles.tipsDesc}>
                                Optimize your video content for search engines and improve discoverability across platforms.
                            </p>
                        </article>
                    </div>
                </div>
            </section>

            {/* Trusted companies + quote */}
            <section className={styles.trusted}>
                <div className={styles.sectionInner}>
                    <span className={styles.trustedTitle}>Trusted by the world's largest companies</span>

                    <div className={styles.logoSlider}>
                        <div className={styles.logoTrack}>
                            {[...companyLogos, ...companyLogos].map((l, idx) => (
                                <a key={`${l.alt}-${idx}`} href={l.href} target="_blank" rel="noreferrer" className={styles.logoItem}>
                                    <img src={l.src} alt={l.alt} className={styles.logoImg2} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <p className={styles.quoteText}>Need a personalized package for your business?</p>
                    <a href="https://www.specialstocks.us/register.php" className={styles.quoteBtn}>
                        Request a Quote
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className={styles.footerTopNote}>
                    We have more than <u>34 assets</u> on Special Stocks as of December 23, 2025.
                </div>

                <div className={styles.footerInner}>
                    <div className={styles.footerLeft}>
                        {/* ✅ Footer Logo image with fallback */}
                        <a href="/" className={styles.footerBrand} aria-label="Special Stocks home">
                            <img
                                src="/speciallogo.png"
                                alt="Special Stocks"
                                className={styles.footerLogoImg}
                                onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                    const fallback = e.currentTarget.nextElementSibling;
                                    if (fallback) fallback.style.display = "inline-flex";
                                }}
                            />
                            <span className={styles.footerLogoText} style={{ display: "none" }}>
                                <span className={styles.footerLogoLight}>Special</span>{" "}
                                <span className={styles.footerLogoBold}>Stocks</span>
                            </span>
                        </a>

                        {/* ✅ English button BELOW logo */}
                        <button className={styles.langBtn}>
                            <i className="fas fa-globe"></i> English ▾
                        </button>
                    </div>

                    <div className={styles.footerCols}>
                        <div>
                            <div className={styles.footerColTitle}>Browse</div>
                            <a className={styles.footerLink} href="#">Images</a>
                            <a className={styles.footerLink} href="#">Videos</a>
                            <a className={styles.footerLink} href="#">Advanced Search</a>
                            <a className={styles.footerLink} href="#">Free Assets</a>
                        </div>

                        <div>
                            <div className={styles.footerColTitle}>Products and services</div>
                            <a className={styles.footerLink} href="#">Images</a>
                            <a className={styles.footerLink} href="#">Video</a>
                            <a className={styles.footerLink} href="#">Music</a>
                            <a className={styles.footerLink} href="#">Editorial</a>
                            <a className={styles.footerLink} href="#">3D</a>
                            <a className={styles.footerLink} href="#">AI solutions</a>
                        </div>

                        <div>
                            <div className={styles.footerColTitle}>For Buyers</div>
                            <a className={styles.footerLink} href="#">Browse Gallery</a>
                            <a className={styles.footerLink} href="#">Advanced Search</a>
                            <a className={styles.footerLink} href="#">Create Account</a>
                        </div>

                        <div>
                            <div className={styles.footerColTitle}>For Sellers</div>
                            <a className={styles.footerLink} href="#">Join as Seller</a>
                        </div>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <div>© 2025 Special Stocks. All rights reserved.</div>

                    <div className={styles.socials}>
                        <a className={styles.socialIcon} href="#" aria-label="Facebook">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a className={styles.socialIcon} href="#" aria-label="Instagram">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a className={styles.socialIcon} href="#" aria-label="LinkedIn">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a className={styles.socialIcon} href="#" aria-label="YouTube">
                            <i className="fab fa-youtube"></i>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
