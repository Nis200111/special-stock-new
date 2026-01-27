"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import styles from "./register.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function RegisterPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Form handling state - UPDATED: fullName ඉවත් කර firstName/lastName දැම්මා
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false
    });

    const handleChange = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Password Check
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // 2. Terms Check
        if (!formData.agreeTerms) {
            alert("Please agree to the Terms & Privacy Policy.");
            return;
        }

        try {
            // 3. Send to Backend - UPDATED: කෙලින්ම firstName, lastName යවනවා
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    phone: "0000000000" // Backend එකට phone අවශ්‍ය නම්
                })
            });

            const data = await res.json();

            if (res.ok) {
                alert("Account created successfully!");
                router.push("/login");
            } else {
                alert(data.message || "Registration failed. Check console for details.");
                console.log("Server Error:", data);
            }

        } catch (err) {
            console.error("Error:", err);
            alert("Connection Error. Backend is not running?");
        }
    };

    return (
        <div className={`${styles.page} ${inter.className}`}>
            <div className={styles.card}>

                {/* 1. Badge */}
                <div className={styles.badgeContainer}>
                    <span className={styles.badge}>Buyer Registration</span>
                </div>

                {/* 2. Logo & Title */}
                <div className={styles.logoContainer}>
                    <h1 className={styles.logoText}>Special <span>Stocks</span></h1>
                </div>
                <h2 className={styles.title}>Create your buyer account</h2>
                <p className={styles.subtitle}>Join our community and discover premium content</p>

                <form onSubmit={handleSubmit} className={styles.form}>

                    {/* --- UPDATED SECTION START: First Name & Last Name Split --- */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>

                        {/* First Name */}
                        <div className={styles.field}>
                            <label className={styles.label}>First Name</label>
                            <div className={styles.inputWrap}>
                                <input
                                    name="firstName"
                                    type="text"
                                    placeholder="First Name"
                                    className={styles.input}
                                    required
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    style={{ paddingLeft: "15px" }} // Icon නැති නිසා padding අඩු කලා
                                />
                            </div>
                        </div>

                        {/* Last Name */}
                        <div className={styles.field}>
                            <label className={styles.label}>Last Name</label>
                            <div className={styles.inputWrap}>
                                <input
                                    name="lastName"
                                    type="text"
                                    placeholder="Last Name"
                                    className={styles.input}
                                    required
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    style={{ paddingLeft: "15px" }} // Icon නැති නිසා padding අඩු කලා
                                />
                            </div>
                        </div>

                    </div>
                    {/* --- UPDATED SECTION END --- */}

                    {/* Email */}
                    <div className={styles.field}>
                        <label className={styles.label}>Email Address</label>
                        <div className={styles.inputWrap}>
                            <span className={styles.leftIcon}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={styles.iconSvg} viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                            </span>
                            <input
                                name="email"
                                type="email"
                                placeholder="Enter your email address"
                                className={styles.input}
                                required
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Buyer Account Box */}
                    <div className={styles.accountTypeBox}>
                        <div className={styles.accountInfo}>
                            <div className={styles.cartIconBg}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={styles.iconSvg} viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                                </svg>
                            </div>
                            <div>
                                <span className={styles.accountTitle}>Buyer Account</span>
                                <span className={styles.accountDesc}>Browse, purchase and download premium stock media</span>
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className={styles.checkIcon} viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    </div>

                    {/* Password */}
                    <div className={styles.field}>
                        <label className={styles.label}>Password</label>
                        <div className={styles.inputWrap}>
                            <span className={styles.leftIcon}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={styles.iconSvg} viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </span>
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a strong password"
                                className={`${styles.input} ${styles.inputWithRight}`}
                                required
                                onChange={handleChange}
                            />
                            <button type="button" className={styles.rightIconBtn} onClick={() => setShowPassword(!showPassword)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={styles.iconSvg} viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>

                        {/* Requirements List */}
                        <div className={styles.reqList}>
                            <p className={styles.reqItem}><span className={styles.bullet}></span> Minimum 8 characters</p>
                            <p className={styles.reqItem}><span className={styles.bullet}></span> Include uppercase letters</p>
                            <p className={styles.reqItem}><span className={styles.bullet}></span> Include lowercase letters</p>
                            <p className={styles.reqItem}><span className={styles.bullet}></span> Include numbers</p>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className={styles.field}>
                        <label className={styles.label}>Confirm Password</label>
                        <div className={styles.inputWrap}>
                            <span className={styles.leftIcon}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={styles.iconSvg} viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </span>
                            <input
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                className={`${styles.input} ${styles.inputWithRight}`}
                                required
                                onChange={handleChange}
                            />
                            <button type="button" className={styles.rightIconBtn} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={styles.iconSvg} viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Checkbox */}
                    <div className={styles.checkboxRow}>
                        <input
                            type="checkbox"
                            id="terms"
                            name="agreeTerms"
                            className={styles.checkbox}
                            onChange={handleChange}
                        />
                        <label htmlFor="terms" className={styles.checkboxLabel}>
                            I agree to the <Link href="/terms" className={styles.linkBlue}>Terms of Service</Link> and <Link href="/privacy" className={styles.linkBlue}>Privacy Policy</Link>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className={styles.submitBtn}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        Create Buyer Account
                    </button>
                </form>

                {/* Footer Section */}
                <div className={styles.sellerSection}>
                    <p className={styles.sellerText}>Want to sell your creative content instead?</p>
                    <Link href="/seller" className={styles.sellerBtn}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            style={{ marginRight: "1px" }}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        Become a Seller
                    </Link>

                    <div className={styles.divider}>
                        <span>Or continue with</span>
                    </div>

                    <button className={styles.googleBtn}>
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width="20" height="20" />
                        Sign up with Google
                    </button>

                    <div className={styles.footerLinks}>
                        <p>Already have an account? <Link href="/login" className={styles.linkBlue}>Sign in here</Link></p>
                        <Link href="/" className={styles.backLink}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            Back to Gallery
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}