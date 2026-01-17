"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./seller.module.css";

export default function SellerPage() {
    const slides = useMemo(
        () => [
            {
                poster:
                    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000&auto=format&fit=crop",
                sources: [
                    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                ],
            },
            {
                poster:
                    "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=2000&auto=format&fit=crop",
                sources: [
                    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
                ],
            },
            {
                poster:
                    "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=2000&auto=format&fit=crop",
                sources: [
                    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
                ],
            },
        ],
        []
    );

    const [active, setActive] = useState(0);

    useEffect(() => {
        const t = setInterval(() => {
            setActive((i) => (i + 1) % slides.length);
        }, 6500);
        return () => clearInterval(t);
    }, [slides.length]);

    return (
        <div className={styles.page}>
            {/* HERO */}
            <section className={styles.hero}>
                <div className={styles.heroMedia}>
                    {slides.map((s, idx) => (
                        <video
                            key={idx}
                            className={`${styles.heroVideo} ${idx === active ? styles.heroVideoActive : ""
                                }`}
                            autoPlay
                            muted
                            loop
                            playsInline
                            poster={s.poster}
                        >
                            {s.sources.map((src) => (
                                <source key={src} src={src} type="video/mp4" />
                            ))}
                        </video>
                    ))}
                    <div className={styles.heroOverlay} />
                </div>

                <header className={styles.navbar}>
                    <div className={styles.navInner}>
                        <div className={styles.navLeft}>
                            <a href="/" className={styles.brand}>
                                Special Stocks
                            </a>
                            <nav className={styles.navLinks}>
                                <a href="#" className={styles.navLink}>
                                    BLOG
                                </a>
                                <a href="#" className={styles.navLink}>
                                    SUPPORT CENTER
                                </a>
                                <a href="#" className={styles.navLink}>
                                    Buy stock photos
                                </a>
                            </nav>
                        </div>

                        <div className={styles.navRight}>
                            <button type="button" className={styles.langBtn}>
                                English <span className={styles.langChev}>▾</span>
                            </button>
                            <a href="/login" className={styles.outlineBtn}>
                                Log in
                            </a>
                            <a href="/register" className={styles.whiteBtn}>
                                Sign up
                            </a>
                        </div>
                    </div>
                </header>

                <div className={styles.heroContent}>
                    <div className={styles.heroTextWrap}>
                        <h1 className={styles.heroTitle}>
                            Share your work <br /> and start earning.
                        </h1>

                        <p className={styles.heroDesc}>
                            Join Special Stocks&apos; global community of contributors <br />
                            and earn money doing what you love.
                        </p>

                        <button className={styles.ctaBtn} type="button">
                            Get started
                        </button>
                    </div>
                </div>
            </section>

            {/* BECOME CONTRIBUTOR */}
            <section className={styles.become}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Become a Contributor</h2>

                    <div className={styles.cardGrid}>
                        <div className={styles.card}>
                            <CameraIcon className={styles.icon} />
                            <h3 className={styles.cardTitle}>Create</h3>
                            <p className={styles.cardDesc}>
                                Produce high-quality images and videos for our customers to
                                download.
                            </p>
                        </div>

                        <div className={styles.card}>
                            <DocIcon className={styles.icon} />
                            <h3 className={styles.cardTitle}>Submit</h3>
                            <p className={styles.cardDesc}>
                                Upload your content with our easy-to-use platform, and get tips
                                for success.
                            </p>
                        </div>

                        <div className={styles.card}>
                            <MailIcon className={styles.icon} />
                            <h3 className={styles.cardTitle}>Get paid</h3>
                            <p className={styles.cardDesc}>
                                Make money every time your content is downloaded by one of our
                                worldwide customers.
                            </p>
                        </div>

                        <div className={styles.card}>
                            <UserPlusIcon className={styles.icon} />
                            <h3 className={styles.cardTitle}>Refer</h3>
                            <p className={styles.cardDesc}>
                                Earn even more by referring new contributors and customers.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* MORE THAN $1B */}
            <section className={styles.infoSectionLight}>
                <div className={styles.container}>
                    <div className={styles.infoGrid}>
                        <div>
                            <h2 className={styles.infoTitle}>More than $1 billion paid out</h2>
                            <p className={styles.infoDesc}>
                                Over the last 15 years, we&apos;ve paid out a billion dollars to
                                our worldwide community of contributors.
                            </p>
                            <a className={styles.pillBtn} href="/register?type=seller">
                                Join now
                            </a>
                        </div>

                        <div className={styles.infoImageWrapRight}>
                            <img
                                className={styles.infoImage}
                                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1500&auto=format&fit=crop"
                                alt="Financial analytics"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* GLOBAL MARKETPLACE */}
            <section className={styles.infoSectionWhite}>
                <div className={styles.container}>
                    <div className={styles.infoGridReverse}>
                        <div className={styles.infoImageWrapLeft}>
                            <img
                                className={styles.infoImage}
                                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1500&auto=format&fit=crop"
                                alt="Global network"
                            />
                        </div>

                        <div>
                            <h2 className={styles.infoTitle}>Global marketplace</h2>
                            <p className={styles.infoDesc}>
                                Special Stocks gives millions of customers access to your work.
                                See your content around the world — even on billboards or in
                                movies.
                            </p>
                            <a className={styles.pillBtn} href="/register?type=seller">
                                Join now
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* EASY TO USE TOOLS */}
            <section className={styles.infoSectionGray}>
                <div className={styles.container}>
                    <div className={styles.infoGrid}>
                        <div>
                            <h2 className={styles.infoTitle}>Easy-to-use tools</h2>
                            <p className={styles.infoDesc}>
                                Quickly upload and submit your content, create and share your
                                personalized portfolio page, and easily track your earnings with
                                our smart tools.
                            </p>
                            <a className={styles.pillBtn} href="#">
                                Explore tools
                            </a>
                        </div>

                        <div className={styles.infoImageWrapRight}>
                            <img
                                className={styles.infoImage}
                                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1500&auto=format&fit=crop"
                                alt="Dashboard tools"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTRIBUTOR APP */}
            <section className={styles.infoSectionWhite}>
                <div className={styles.container}>
                    <div className={styles.infoGrid}>
                        <div>
                            <h2 className={styles.infoTitle}>Get the contributor app</h2>
                            <p className={styles.infoDesc}>
                                Upload and submit images straight from your mobile device and
                                track your activity and earnings, all while on the go.
                            </p>
                            <a className={styles.pillBtn} href="#">
                                Contributor App
                            </a>
                        </div>

                        <div className={styles.infoImageWrapRight}>
                            <img
                                className={styles.infoImage}
                                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1500&auto=format&fit=crop"
                                alt="Mobile app"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* JOIN OUR COMMUNITY */}
            <section className={styles.infoSectionGray}>
                <div className={styles.container}>
                    <div className={styles.infoGridReverse}>
                        <div className={styles.infoImageWrapLeft}>
                            <img
                                className={styles.infoImage}
                                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1500&auto=format&fit=crop"
                                alt="Community"
                            />
                        </div>

                        <div>
                            <h2 className={styles.infoTitle}>Join our global community</h2>
                            <p className={styles.infoDesc}>
                                Showcase your work and grow your skills by joining our
                                international community. We offer tools, tips, and support to
                                help artists around the world earn even more.
                            </p>
                            <a className={styles.pillBtn} href="#">
                                See global earnings
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* VIEW OUR RESOURCES */}
            <section className={styles.resourcesSection}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>View our resources</h2>

                    <div className={styles.resourcesGrid}>
                        <a href="#" className={`${styles.resourceCard} ${styles.workshopBg}`}>
                            <div className={styles.resourceOverlay} />
                            <div className={styles.resourceText}>
                                <h3 className={styles.resourceTitle}>Video Workshops</h3>
                                <p className={styles.resourceDesc}>Learn from our experts</p>
                            </div>
                        </a>

                        <a href="#" className={`${styles.resourceCard} ${styles.shotlistBg}`}>
                            <div className={styles.resourceOverlay} />
                            <div className={styles.resourceText}>
                                <h3 className={styles.resourceTitle}>The Shot List</h3>
                                <p className={styles.resourceDesc}>What&apos;s in demand now</p>
                            </div>
                        </a>

                        <a href="#" className={`${styles.resourceCard} ${styles.blogBg}`}>
                            <div className={styles.resourceOverlay} />
                            <div className={styles.resourceText}>
                                <h3 className={styles.resourceTitle}>Contributor Blog</h3>
                                <p className={styles.resourceDesc}>Get Inspired</p>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            {/* CTA START EARNING (BACKGROUND FROM PUBLIC FOLDER) */}
            <section className={styles.ctaSection}>
                <div className={styles.ctaOverlay}></div>

                <div className={styles.ctaInner}>
                    <h2 className={styles.ctaTitle}>Start earning today</h2>
                    <p className={styles.ctaSubtitle}>
                        Contribute to Special Stocks and make money doing what you love.
                    </p>

                    <a className={styles.ctaJoinBtn} href="/register?type=seller">
                        Join now
                    </a>

                    <div className={styles.ctaDivider}></div>

                    <p className={styles.ctaFooter}>
                        Already have an account?{" "}
                        <a className={styles.ctaLink} href="/login">
                            Sign in.
                        </a>
                    </p>
                </div>
            </section>

            {/* FOOTER */}
            <footer className={styles.footer}>
                <div className={styles.container}>
                    {/* Top footer row */}
                    <div className={styles.footerTopRow}>
                        <p className={styles.footerTopText}>
                            Over $1 billion paid to contributors since 2003.
                        </p>

                        <button className={styles.footerLangBtn} type="button">
                            <GlobeIcon className={styles.footerLangIcon} />
                            English
                            <span className={styles.footerLangChev}>▾</span>
                        </button>
                    </div>

                    {/* Links */}
                    <div className={styles.footerGrid}>
                        <div>
                            <h4 className={styles.footerTitle}>Special Stocks Contributor</h4>
                            <ul className={styles.footerList}>
                                <li>
                                    <a href="#" className={styles.footerLink}>
                                        Contributor blog
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className={styles.footerLink}>
                                        Contributor mobile app
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className={styles.footerLink}>
                                        Earnings breakdown
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className={styles.footerLink}>
                                        Submission guidelines
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className={styles.footerTitle}>Help</h4>
                            <ul className={styles.footerList}>
                                <li>
                                    <a href="#" className={styles.footerLink}>
                                        Contact us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className={styles.footerLink}>
                                        Support center
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className={styles.footerColWide}>
                            <h4 className={styles.footerTitle}>Legal &amp; Compliance</h4>
                            <ul className={styles.footerList}>
                                <li>
                                    <a href="#" className={styles.footerLink}>
                                        Tax center
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className={styles.footerLink}>
                                        Model &amp; property releases
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className={styles.footerLink}>
                                        Privacy policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className={styles.footerLink}>
                                        Terms of service
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className={styles.footerLink}>
                                        Editorial Content Supply Agreement
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom footer row */}
                    <div className={styles.footerBottomRow}>
                        <p className={styles.footerCopy}>© 2003-2025 Special Stocks, Inc.</p>

                        <div className={styles.footerSocial}>
                            <a href="#" className={styles.socialBtn} aria-label="Facebook">
                                <FacebookIcon />
                            </a>
                            <a href="#" className={styles.socialBtn} aria-label="YouTube">
                                <YoutubeIcon />
                            </a>
                            <a href="#" className={styles.socialBtn} aria-label="Instagram">
                                <InstagramIcon />
                            </a>
                            <a href="#" className={styles.socialBtn} aria-label="Play">
                                <PlayIcon />
                            </a>
                            <a href="#" className={styles.socialBtn} aria-label="Check">
                                <CheckIcon />
                            </a>
                            <a href="#" className={styles.socialBtn} aria-label="LinkedIn">
                                <LinkedInIcon />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

/* ---- Inline SVG Icons ---- */
function CameraIcon({ className }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
        </svg>
    );
}

function DocIcon({ className }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
    );
}

function MailIcon({ className }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
        </svg>
    );
}

function UserPlusIcon({ className }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <line x1="20" y1="8" x2="20" y2="14" />
            <line x1="23" y1="11" x2="17" y2="11" />
        </svg>
    );
}

/* Footer icons */
function GlobeIcon({ className }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 5h2m14 0h2M7 5H5m14 0h2m-7 0a8 8 0 100 16 8 8 0 000-16z" />
            <path d="M3 10h2m14 0h2M3 15h2m14 0h2M7 15H5m14 0h2" />
        </svg>
    );
}

function FacebookIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.25 12.012c0-5.52-4.72-10.012-10.512-10.012S1.226 6.492 1.226 12.012c0 4.908 3.552 9.03 8.32 9.878v-6.994h-2.5V12.01h2.5v-2.18c0-2.472 1.492-3.834 3.738-3.834 1.054 0 2.148.192 2.148.192v2.36h-1.228c-1.218 0-1.602.756-1.602 1.53v1.884h2.616l-.418 2.894h-2.198v6.996c4.768-.848 8.32-4.97 8.32-9.878z" />
        </svg>
    );
}

function YoutubeIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.633 7.994a3.896 3.896 0 00-2.738-2.738C15.688 5 12 5 12 5s-3.688 0-4.895.256A3.896 3.896 0 004.367 7.994c-.256 1.207-.256 3.018-.256 3.018s0 1.811.256 3.018a3.896 3.896 0 002.738 2.738C8.312 17 12 17 12 17s3.688 0 4.895-.256a3.896 3.896 0 002.738-2.738c.256-1.207.256-3.018.256-3.018s0-1.811-.256-3.018zM10.5 14.5v-5l5 2.5-5 2.5z" />
        </svg>
    );
}

function InstagramIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.98 0H7.02C3.132 0 0 3.132 0 7.02v9.96C0 20.868 3.132 24 7.02 24h9.96c3.888 0 7.02-3.132 7.02-7.02V7.02C24 3.132 20.868 0 16.98 0zM12 18a6 6 0 110-12 6 6 0 010 12zm7.5-12.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>
    );
}

function PlayIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm-8.5 13.5v-9L17 12l-5.5 5.5z" />
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.34 5.46a1.5 1.5 0 011.06 2.56L12 18 5.6 13.6a1.5 1.5 0 111.8-2.32L12 14l3.9-2.56a1.5 1.5 0 011.44-6z" />
        </svg>
    );
}

function LinkedInIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.9 14.938v5.82h-3.92v-5.46c0-1.3-.46-2.18-1.64-2.18-1.34 0-2.13.91-2.48 1.78-.13.31-.17.75-.17 1.19v5.18H8.818s.05-10.74 0-11.838h3.92v1.68h.02c.51-.78 1.4-1.92 3.51-1.92 2.56 0 4.54 1.68 4.54 5.33zM5 19.868c1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5-2.5 1.12-2.5 2.5 1.12 2.5 2.5 2.5zm0-11.838h.02v11.838H2.5V8.03z" />
        </svg>
    );
}
