"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function TopBanner() {
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        const storedName = localStorage.getItem("userName");
        if (storedName) setUserName(storedName);
    }, []);

    return (
        <div className="bg-[#3477a2] text-white text-center text-small sm:text-sm py-3 sm:py-4 px-2 tracking-[0.02rem] flex items-center justify-center gap-4">
            <span className="block sm:inline">
                Get 10 royalty-free image downloads each month with a cost-saving subscription.
            </span>
            {userName ? (
                <div className="bg-white text-black px-4 py-1.5 rounded-full text-xs font-bold inline-block">
                    Welcome, {userName}
                </div>
            ) : (
                <Link
                    href="/register"
                    className="bg-white text-black px-4 py-1.5 rounded-full text-xs font-bold hover:bg-gray-100 transition-colors inline-block"
                >
                    Buy Now
                </Link>
            )}
        </div>
    );
}
