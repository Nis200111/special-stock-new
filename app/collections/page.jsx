"use client";

import { useMemo, useRef, useState } from "react";
import styles from "./collections.module.css";

export default function CollectionsPage() {
    const tags = useMemo(
        () => [
            "photography",
            "vector",
            "ai",
            "abstract",
            "lifestyle",
            "nature",
            "business",
            "design",
            "vintage",
            "modern",
        ],
        []
    );

    // demo data (replace with DB later)
    const collections = useMemo(
        () => [
            {
                id: 1,
                name: "Dogs",
                desc: "A set of high-resolution photographs featuring various dog breeds, Labradors, Huskies, Beagles, and ...",
                image:
                    "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1600",
                type: "regular",
                active: true,
            },
            {
                id: 2,
                name: "AI Generated Portraits",
                desc: "Professional AI-created portrait photography with stunning realism",
                image:
                    "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1600",
                type: "ai",
                active: true,
            },
            {
                id: 3,
                name: "Nature Photography",
                desc: "Breathtaking natural landscapes and wildlife photography",
                image:
                    "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=1600",
                type: "regular",
                active: true,
            },
            {
                id: 4,
                name: "Abstract Digital Art",
                desc: "Modern abstract artworks created with digital tools and AI assistance",
                image:
                    "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1600",
                type: "ai",
                active: true,
            },
            {
                id: 5,
                name: "Business Stock Photos",
                desc: "Professional business and corporate photography for commercial use",
                image:
                    "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1600",
                type: "regular",
                active: true,
            },
            {
                id: 6,
                name: "AI Fashion & Style",
                desc: "Fashion photography and style shots created using AI technology",
                image:
                    "https://images.pexels.com/photos/3182825/pexels-photo-3182825.jpeg?auto=compress&cs=tinysrgb&w=1600",
                type: "ai",
                active: true,
            },
        ],
        []
    );

    const [query, setQuery] = useState("");
    const [type, setType] = useState("all");
    const [sort, setSort] = useState("created_at");
    const [logoBroken, setLogoBroken] = useState(false);

    const inputRef = useRef(null);

    const addTagToSearch = (tag) => {
        setQuery((prev) => {
            const t = prev.trim();
            return t ? `${t} ${tag}` : tag;
        });
        inputRef.current?.focus();
    };

    const filtered = useMemo(() => {
        let list = [...collections];

        if (type !== "all") list = list.filter((c) => c.type === type);

        const q = query.trim().toLowerCase();
        if (q) {
            list = list.filter(
                (c) =>
                    c.name.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)
            );
        }

        if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
        if (sort === "view_count") list.sort((a, b) => b.id - a.id); // placeholder
        if (sort === "asset_count") list.sort((a, b) => a.id - b.id); // placeholder
        return list;
    }, [collections, query, type, sort]);

    const activeCount = filtered.filter((c) => c.active).length;
    const aiCount = filtered.filter((c) => c.type === "ai").length;

    const handleSubmit = (e) => e.preventDefault();

    const clearFilters = () => {
        setQuery("");
        setType("all");
        setSort("created_at");
    };

    return (
        <div className={styles.page}>
            {/* Promo bar */}
            <div className={styles.promoBar}>
                <div className={styles.promoInner}>
                    <span className={styles.promoText}>
                        Get 10 royalty-free image downloads each month with a cost-saving
                        subscription.
                    </span>
                    <button className={styles.promoBtn} type="button">
                        Buy now
                    </button>
                </div>
            </div>

            {/* Header */}
            <header className={styles.header}>
                <div className={styles.headerInner}>
                    <div className={styles.headerLeft} />

                    <div className={styles.logoCenter}>
                        <a href="/" className={styles.logoLink}>
                            {!logoBroken ? (
                                <img
                                    src="/speciallogo.png"
                                    alt="Special Stocks"
                                    className={styles.logoImg}
                                    onError={() => setLogoBroken(true)}
                                />
                            ) : (
                                <h1 className={styles.logoFallback}>
                                    <span className={styles.logoLightText}>Special</span>{" "}
                                    <span className={styles.logoBoldText}>Stocks</span>
                                </h1>
                            )}
                        </a>
                    </div>

                    <div className={styles.headerRight}>
                        <button className={styles.pricingBtn} type="button">
                            Pricing <span className={styles.chev}>▾</span>
                        </button>

                        <button className={styles.iconBtn} aria-label="Language" type="button">
                            <i className="fas fa-globe" />
                        </button>

                        <button className={styles.iconBtn} aria-label="Favorites" type="button">
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
                    <a className={styles.navItem} href="#">
                        Video <span className={styles.navChev}>▾</span>
                    </a>
                    <a className={styles.navItem} href="#">
                        Music <span className={styles.navChev}>▾</span>
                    </a>
                    <a className={styles.navItem} href="#">
                        Collections
                    </a>
                    <a className={styles.navItem} href="#">
                        Editorial <span className={styles.navChev}>▾</span>
                    </a>
                    <a className={styles.navItem} href="#">
                        3D <span className={styles.navChev}>▾</span>
                    </a>
                    <a className={styles.navItem} href="#">
                        AI solutions <span className={styles.navChev}>▾</span>
                    </a>
                </nav>
            </header>

            {/* Purple Hero */}
            <main className={styles.hero}>
                <div className={styles.heroInner}>
                    <div className={styles.heroText}>
                        <h1 className={styles.heroTitle}>Explore Collections</h1>
                        <p className={styles.heroDesc}>
                            Discover hand-picked collections of premium stock media. From
                            AI-generated art to classic photography themes.
                        </p>
                    </div>

                    {/* Search + Filters */}
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.searchBar}>
                            <input
                                ref={inputRef}
                                id="collectionSearch"
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search collections by name, description, or tags..."
                                className={styles.searchInput}
                            />
                            <button type="submit" className={styles.searchBtn} aria-label="Search">
                                <i className="fas fa-search" />
                            </button>
                        </div>

                        <div className={styles.filtersCard}>
                            <div className={styles.filtersGrid}>
                                <div className={styles.field}>
                                    <label className={styles.label}>Collection Type</label>
                                    <select
                                        className={styles.select}
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                    >
                                        <option value="all">All Types</option>
                                        <option value="regular">Curated Collections</option>
                                        <option value="ai">AI Generated</option>
                                    </select>
                                </div>

                                <div className={styles.field}>
                                    <label className={styles.label}>Sort By</label>
                                    <select
                                        className={styles.select}
                                        value={sort}
                                        onChange={(e) => setSort(e.target.value)}
                                    >
                                        <option value="created_at">Newest First</option>
                                        <option value="name">Name A-Z</option>
                                        <option value="view_count">Most Popular</option>
                                        <option value="asset_count">Most Assets</option>
                                    </select>
                                </div>
                            </div>

                            <div className={styles.tagsBlock}>
                                <div className={styles.label}>Popular Tags</div>
                                <div className={styles.tags}>
                                    {tags.map((t) => (
                                        <button
                                            key={t}
                                            type="button"
                                            className={styles.tagBtn}
                                            onClick={() => addTagToSearch(t)}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.actions}>
                                <button type="submit" className={styles.primaryBtn}>
                                    Search Collections
                                </button>
                                <button
                                    type="button"
                                    className={styles.secondaryBtnBtn}
                                    onClick={clearFilters}
                                >
                                    Clear Filters
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>

            {/* Results bar */}
            <div className={styles.resultsBar}>
                <div className={styles.resultsInner}>
                    <div>
                        <strong>{filtered.length}</strong> collections found
                    </div>
                    <div className={styles.resultsRight}>
                        <span>
                            <strong>{activeCount}</strong> Active
                        </span>
                        <span>
                            <strong>{aiCount}</strong> AI Generated
                        </span>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <section className={styles.gridWrap}>
                <div className={styles.grid}>
                    {filtered.map((c) => (
                        <a key={c.id} href="#" className={styles.card}>
                            <div className={styles.cardMedia}>
                                <img className={styles.cardImg} src={c.image} alt={c.name} />
                                <div className={styles.cardOverlay} />
                                <div className={styles.cardText}>
                                    <div className={styles.cardTextMove}>
                                        <h3 className={styles.cardTitle}>{c.name}</h3>
                                        <p className={styles.cardDesc}>{c.desc}</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </section>

            {/* ✅ Footer (same style as Search page) */}
            <footer className={styles.footer}>
                <div className={styles.footerTopNote}>
                    We have more than <u>34 assets</u> on Special Stocks as of December 23, 2025.
                </div>

                <div className={styles.footerInner}>
                    <div className={styles.footerLeft}>
                        <div className={styles.footerLogo}>
                            <span className={styles.footerLogoLight}>Special</span>
                            <span className={styles.footerLogoBold}>Stocks</span>
                        </div>

                        <button className={styles.langBtn} type="button">
                            <i className="fas fa-globe" /> English ▾
                        </button>
                    </div>

                    <div className={styles.footerCols}>
                        <div>
                            <div className={styles.footerColTitle}>Browse</div>
                            <a className={styles.footerLink} href="#">
                                Images
                            </a>
                            <a className={styles.footerLink} href="#">
                                Videos
                            </a>
                            <a className={styles.footerLink} href="#">
                                Advanced Search
                            </a>
                            <a className={styles.footerLink} href="#">
                                Free Assets
                            </a>
                        </div>

                        <div>
                            <div className={styles.footerColTitle}>Products and services</div>
                            <a className={styles.footerLink} href="#">
                                Images
                            </a>
                            <a className={styles.footerLink} href="#">
                                Video
                            </a>
                            <a className={styles.footerLink} href="#">
                                Music
                            </a>
                            <a className={styles.footerLink} href="#">
                                Editorial
                            </a>
                            <a className={styles.footerLink} href="#">
                                3D
                            </a>
                            <a className={styles.footerLink} href="#">
                                AI solutions
                            </a>
                        </div>

                        <div>
                            <div className={styles.footerColTitle}>For Buyers</div>
                            <a className={styles.footerLink} href="#">
                                Browse Gallery
                            </a>
                            <a className={styles.footerLink} href="#">
                                Advanced Search
                            </a>
                            <a className={styles.footerLink} href="#">
                                Create Account
                            </a>
                        </div>

                        <div>
                            <div className={styles.footerColTitle}>For Sellers</div>
                            <a className={styles.footerLink} href="#">
                                Join as Seller
                            </a>
                        </div>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <div>© 2025 Special Stocks. All rights reserved.</div>

                    <div className={styles.socials}>
                        <a className={styles.socialIcon} href="#" aria-label="Facebook">
                            <i className="fab fa-facebook-f" />
                        </a>
                        <a className={styles.socialIcon} href="#" aria-label="Instagram">
                            <i className="fab fa-instagram" />
                        </a>
                        <a className={styles.socialIcon} href="#" aria-label="LinkedIn">
                            <i className="fab fa-linkedin-in" />
                        </a>
                        <a className={styles.socialIcon} href="#" aria-label="YouTube">
                            <i className="fab fa-youtube" />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
