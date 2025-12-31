"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Crown, ChevronDown, Search, Star, ChevronLeft, ChevronRight } from "lucide-react";

export default function exclusiveImages() {
    const router = useRouter();

    // progress bar
    const [progress, setProgress] = useState(0);

    // search
    const [searchMenuOpen, setSearchMenuOpen] = useState(false);
    const [q, setQ] = useState("");
    const [searchType, setSearchType] = useState({ value: "exclusive_images", label: "Exclusive images" });

    // image skeleton/blur
    const [loadedMap, setLoadedMap] = useState({});
    const dropdownRef = useRef(null);
    const sliderRef = useRef(null);

    const exclusiveImages = useMemo(
        () => [
            { id: 4, title: "A photograph of a German Shepherd dog captured in a moment of exuberant play", featured: true, thumbUrl: "https://www.specialstocks.us/serve_public.php?id=4&type=thumbnail&content=exclusive", href: "/exclusive-image-details?id=4" },
            { id: 6, title: "A Joyful German Shepherd", featured: true, thumbUrl: "https://www.specialstocks.us/serve_public.php?id=6&type=thumbnail&content=exclusive", href: "/exclusive-image-details?id=6" },
            { id: 3, title: "A photograph of a spirited German Shepherd mid-leap", thumbUrl: "https://www.specialstocks.us/serve_public.php?id=3&type=thumbnail&content=exclusive", href: "/exclusive-image-details?id=3" },
            { id: 9, title: "A Spirited German Shephed", thumbUrl: "https://www.specialstocks.us/serve_public.php?id=9&type=thumbnail&content=exclusive", href: "/exclusive-image-details?id=9" },
            { id: 8, title: "A Photograph Of A Lively German Shepherd", thumbUrl: "https://www.specialstocks.us/serve_public.php?id=8&type=thumbnail&content=exclusive", href: "/exclusive-image-details?id=8" },
            { id: 10, title: "German Shepherd Dog", thumbUrl: "https://www.specialstocks.us/serve_public.php?id=10&type=thumbnail&content=exclusive", href: "/exclusive-image-details?id=10" },
            { id: 11, title: "A Photograph Of A German Shepherd Dog", thumbUrl: "https://www.specialstocks.us/serve_public.php?id=11&type=thumbnail&content=exclusive", href: "/exclusive-image-details?id=11" },
            { id: 5, title: "A Joyful German Shepherd", thumbUrl: "https://www.specialstocks.us/serve_public.php?id=5&type=thumbnail&content=exclusive", href: "/exclusive-image-details?id=5" },
            { id: 12, title: "Happy German Shepherd Dog", thumbUrl: "https://www.specialstocks.us/serve_public.php?id=12&type=thumbnail&content=exclusive", href: "/exclusive-image-details?id=12" },
        ],
        []
    );

    // simulate progress to 95
    useEffect(() => {
        setProgress(0);
        const interval = setInterval(() => {
            setProgress((prev) => {
                const next =
                    prev < 30 ? prev + Math.random() * 10 :
                        prev < 60 ? prev + Math.random() * 5 :
                            prev < 90 ? prev + Math.random() * 2 :
                                prev;
                return Math.min(next, 95);
            });
        }, 200);

        return () => clearInterval(interval);
    }, []);

    // complete when all loaded
    useEffect(() => {
        const total = exclusiveImages.length;
        const loadedCount = Object.values(loadedMap).filter(Boolean).length;

        if (total > 0) {
            const pct = Math.min((loadedCount / total) * 100, 95);
            setProgress((prev) => Math.max(prev, pct));
        }

        if (total > 0 && loadedCount === total) {
            setProgress(100);
            const t = setTimeout(() => setProgress(0), 500);
            return () => clearTimeout(t);
        }
    }, [loadedMap, exclusiveImages]);

    // close dropdown outside click
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setSearchMenuOpen(false);
        };
        document.addEventListener("click", handler);
        return () => document.removeEventListener("click", handler);
    }, []);

    const onSubmitSearch = (e) => {
        e.preventDefault();
        // frontend-only routing (no backend)
        router.push(`/search?type=${encodeURIComponent(searchType.value)}&q=${encodeURIComponent(q)}`);
    };

    const handleLoaded = (id) => setLoadedMap((p) => ({ ...p, [id]: true }));

    const scrollSlider = (dir) => {
        const el = sliderRef.current;
        if (!el) return;
        const amount = 340;
        el.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth" });
    };

    return (
        <div className="bg-white text-gray-900">
            {/* progress bar */}
            <div
                className="fixed top-0 left-0 h-[3px] z-[9999]"
                style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg,#ef4444,#dc2626)",
                    transition: "width 0.3s ease",
                    boxShadow: "0 0 10px rgba(239,68,68,0.5)",
                }}
            />

            <Navbar />

            {/* HERO */}
            <section
                className="relative min-h-[400px] sm:min-h-[500px] flex flex-col justify-center items-center text-white overflow-hidden bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url(/resources/bg2.png)" }}
            >
                <div className="relative z-10 text-center px-4 sm:px-6 max-w-6xl w-full">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 leading-tight">
                        Premium Exclusive Images
                    </h2>

                    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-6 sm:mb-8 text-sm">
                        <span>Access our curated collection of exclusive, high-quality system graphics and marketing materials.</span>
                    </div>

                    <div className="bg-black/40 backdrop-blur-sm p-4 sm:p-6">
                        <form onSubmit={onSubmitSearch} className="flex flex-col lg:flex-row items-center gap-3 bg-white rounded-md p-3 sm:p-5">
                            <div className="flex flex-col lg:flex-row items-center justify-center gap-3 w-full max-w-5xl">
                                {/* dropdown */}
                                <div className="relative w-full sm:w-auto" ref={dropdownRef}>
                                    <button
                                        type="button"
                                        onClick={() => setSearchMenuOpen((v) => !v)}
                                        className="w-full sm:w-auto px-4 py-3 bg-white text-gray-700 rounded-lg text-sm flex items-center justify-between sm:justify-start gap-2 border"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Crown className="h-4 w-4 text-purple-600" />
                                            <span className="whitespace-nowrap">{searchType.label}</span>
                                        </div>
                                        <ChevronDown className="h-4 w-4 opacity-70" />
                                    </button>

                                    {!searchMenuOpen ? null : (
                                        <div className="absolute left-0 top-full w-full sm:w-48 bg-white border shadow-lg z-10 mt-1 rounded-md overflow-hidden">
                                            <button
                                                type="button"
                                                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-gray-700"
                                                onClick={() => { setSearchType({ value: "exclusive_images", label: "Exclusive images" }); setSearchMenuOpen(false); }}
                                            >
                                                <Crown className="h-4 w-4 text-purple-600" /> Exclusive images
                                            </button>

                                            <button
                                                type="button"
                                                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-gray-700"
                                                onClick={() => { setSearchType({ value: "image", label: "All images" }); setSearchMenuOpen(false); }}
                                            >
                                                All images
                                            </button>

                                            <button
                                                type="button"
                                                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-gray-700"
                                                onClick={() => { setSearchType({ value: "video", label: "Video" }); setSearchMenuOpen(false); }}
                                            >
                                                Video
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* input */}
                                <div className="relative flex-1 w-full">
                                    <input
                                        value={q}
                                        onChange={(e) => setQ(e.target.value)}
                                        placeholder="Search exclusive images..."
                                        className="w-full px-4 py-3 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2"
                                >
                                    <Search className="h-4 w-4" /> Search
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* GRID */}
            <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50 text-gray-900">
                <div className="max-w-7xl mx-auto">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8">
                        Browse exclusive content
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
                        {exclusiveImages.map((item) => {
                            const isLoaded = !!loadedMap[item.id];

                            return (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    className="relative group cursor-pointer block rounded-lg overflow-hidden h-64"
                                >
                                    {!isLoaded && <div className="absolute inset-0 z-[1] skeleton-loader" />}

                                    <img
                                        src={item.thumbUrl}
                                        alt={item.title}
                                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${isLoaded ? "opacity-100 blur-0" : "opacity-0 blur-[20px]"
                                            }`}
                                        loading="lazy"
                                        onLoad={() => handleLoaded(item.id)}
                                        onError={() => handleLoaded(item.id)}
                                    />

                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all">
                                        <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                            <Crown className="h-3 w-3" /> Show Rate
                                        </div>

                                        {item.featured && (
                                            <div className="absolute top-2 left-2 bg-yellow-400 text-gray-900 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                                                <Star className="h-3 w-3" /> FEATURED
                                            </div>
                                        )}

                                        <div className="absolute bottom-4 left-4 text-white">
                                            <h5 className="font-semibold text-sm line-clamp-2">{item.title}</h5>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="mt-10 text-center">
                        <Link href="/search?type=exclusive_images" className="px-8 py-3 border rounded-full hover:bg-gray-100 inline-block">
                            See More Exclusive Images
                        </Link>
                    </div>
                </div>
            </section>

            {/* SLIDER */}
            <section className="py-16 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-8">Featured exclusive images</h2>

                    <div className="relative">
                        <div
                            ref={sliderRef}
                            className="flex overflow-x-auto scroll-smooth scrollbar-hide -mx-4 px-4 space-x-4 sm:space-x-6 pb-4"
                        >
                            {exclusiveImages.filter((x) => x.featured).map((item) => (
                                <div key={item.id} className="flex-shrink-0 w-72 sm:w-80">
                                    <Link href={item.href} className="block relative w-full h-[450px] overflow-hidden group shadow-lg rounded-lg">
                                        <img
                                            src={item.thumbUrl}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end">
                                            <div className="p-5 text-white">
                                                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded text-xs font-bold inline-flex items-center gap-1 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                                    <Crown className="h-3 w-3" /> Show Rate
                                                </div>
                                                <h3 className="font-bold text-2xl leading-tight mb-2 line-clamp-3">{item.title}</h3>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => scrollSlider("prev")}
                            className="absolute top-1/2 left-0 -translate-y-1/2 bg-white rounded-full p-3 shadow-xl hover:bg-gray-100 transition z-10 hidden sm:flex items-center justify-center w-12 h-12"
                            aria-label="Previous"
                        >
                            <ChevronLeft className="h-5 w-5 text-gray-800" />
                        </button>

                        <button
                            onClick={() => scrollSlider("next")}
                            className="absolute top-1/2 right-0 -translate-y-1/2 bg-white rounded-full p-3 shadow-xl hover:bg-gray-100 transition z-10 hidden sm:flex items-center justify-center w-12 h-12"
                            aria-label="Next"
                        >
                            <ChevronRight className="h-5 w-5 text-gray-800" />
                        </button>
                    </div>
                </div>
            </section>

            <Footer />

            {/* global helpers */}
            <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

        .skeleton-loader {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: skeleton-loading 1.5s infinite;
        }
        @keyframes skeleton-loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
        </div>
    );
}
