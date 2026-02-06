"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Inter } from "next/font/google";
import styles from "./logout.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function LogoutPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        name: "Guest User",
        email: "guest@example.com"
    });

    useEffect(() => {
        const storedName = localStorage.getItem("userName");
        const storedEmail = localStorage.getItem("userEmail");

        if (storedName) {
            setUser({
                name: storedName,
                email: storedEmail || "user@stockmedia.com"
            });
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        router.push("/login");
    };

    const handleCancel = () => {
        router.push("/dashboard");
    };

    return (
        <div className={`${styles.container} ${inter.className}`}>
            <div className={styles.card}>

                {/* 1. Special Stocks Logo (Modern Font Style) */}
                <h1 className={styles.logoText}>Special <span>Stocks</span></h1>

                {/* 2. Title Section */}
                <h2 className={styles.title}>Confirm Logout</h2>
                <p className={styles.subtitle}>Are you sure you want to sign out of your account?</p>

                {/* 3. User Info Box (Modern Glass/Card Effect) */}
                <div className={styles.infoBox}>
                    <p className={styles.infoLabel}>Currently signed in as:</p>
                    <div className={styles.userDetails}>
                        <div className={styles.avatar}>
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h3 className={styles.userName}>{user.name}</h3>
                            <p className={styles.userEmail}>{user.email}</p>
                        </div>
                    </div>
                    <div className={styles.badgeContainer}>
                        <span className={styles.accountBadge}>Buyer Account</span>
                    </div>
                </div>

                {/* 4. Buttons (Modern & Big) */}
                <div className={styles.buttonGroup}>
                    <button onClick={handleCancel} className={styles.cancelBtn}>
                        Cancel
                    </button>
                    <button onClick={handleLogout} className={styles.signOutBtn}>
                        Sign Out
                    </button>
                </div>

                {/* 5. Links */}
                <div className={styles.footerLinks}>
                    <button onClick={handleLogout} className={styles.textLink}>
                        Or <span>logout immediately</span>
                    </button>
                </div>

                <div className={styles.backLinkContainer}>
                    <Link href="/dashboard" className={styles.backLink}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
                        Back to Dashboard
                    </Link>
                </div>

            </div>
        </div>
    );
}