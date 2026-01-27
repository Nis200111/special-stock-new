"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GoogleSignInButton } from "@/components";
import { Inter } from "next/font/google";
import styles from "./login.module.css";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
});

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [logoFailed, setLogoFailed] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear error when user types
        if (error) setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("http://localhost:5000/api/customers/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Login failed");
            }


            // Store user data
            localStorage.setItem("user", JSON.stringify(data));
            localStorage.setItem("token", data.accessToken);
            localStorage.setItem("userName", data.firstName);

            // Check role - fallback to email check if not provided by backend
            let userRole = data.role;

            if (!userRole) {
                // Fallback: Check if email is admin
                const adminEmails = ['admin@example.com', 'nisansalarasanjali512@gmail.com', 'admin@stockmedia.com'];
                userRole = adminEmails.includes(data.email || formData.email) ? 'admin' : 'buyer';
            }

            localStorage.setItem("userRole", userRole);

            // Also set cookies for middleware (server-side access)
            document.cookie = `token=${data.accessToken}; path=/; max-age=86400`; // 24 hours
            document.cookie = `userRole=${userRole}; path=/; max-age=86400`;



            // Redirect based on role
            console.log('Login successful! User role:', userRole, 'Email:', data.email);

            if (userRole === 'admin') {
                console.log('Redirecting to admin dashboard...');
                router.push("/dashboard");
            } else if (userRole === 'seller') {
                console.log('Redirecting to seller activation page...');
                router.push("/seller");
            } else {
                console.log('Redirecting to buyer dashboard...');
                router.push("/buyer-dashboard");
            }


        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`${styles.page} ${inter.className}`}>
            <div className={styles.wrapper}>
                <div className={styles.card}>
                    {/* Header with Logo */}
                    <div className={styles.header}>
                        <div className={styles.logoContainer}>
                            <a
                                href="https://www.specialstocks.us/"
                                className={styles.logoLink}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {!logoFailed ? (
                                    <img
                                        src="/speciallogo.png"
                                        alt="Special Stocks"
                                        className={styles.logoImg}
                                        onError={() => setLogoFailed(true)}
                                    />
                                ) : (
                                    <h1 className={styles.logoText}>
                                        Special <span>Stocks</span>
                                    </h1>
                                )}
                            </a>
                        </div>

                        <h2 className={styles.title}>Welcome back</h2>
                        <p className={styles.subtitle}>Sign in to access your account</p>
                    </div>


                    {/* Form */}
                    <form className={styles.form} onSubmit={handleSubmit}>
                        {error && (
                            <div style={{
                                color: "#ef4444",
                                background: "#fee2e2",
                                padding: "0.75rem",
                                borderRadius: "0.5rem",
                                marginBottom: "1rem",
                                fontSize: "0.875rem",
                                textAlign: "center"
                            }}>
                                {error}
                            </div>
                        )}
                        {/* Email */}
                        <div className={styles.field}>
                            <label htmlFor="email" className={styles.label}>
                                Email Address
                            </label>
                            <div className={styles.inputWrap}>
                                <span className={styles.leftIcon} aria-hidden="true">
                                    <svg viewBox="0 0 24 24" className={styles.iconSvg}>
                                        <path
                                            d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.2-8 5.3-8-5.3V6l8 5.2L20 6v2.2z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </span>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className={styles.input}
                                    placeholder="Enter your email address"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className={styles.field}>
                            <label htmlFor="password" className={styles.label}>
                                Password
                            </label>
                            <div className={styles.inputWrap}>
                                <span className={styles.leftIcon} aria-hidden="true">
                                    <svg viewBox="0 0 24 24" className={styles.iconSvg}>
                                        <path
                                            d="M17 9h-1V7a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2zm-7-2a2 2 0 1 1 4 0v2h-4V7z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </span>

                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className={`${styles.input} ${styles.inputWithRight}`}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />

                                <button
                                    type="button"
                                    className={styles.rightIconBtn}
                                    onClick={() => setShowPassword((s) => !s)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    <svg viewBox="0 0 24 24" className={styles.iconSvg}>
                                        <path
                                            d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Remember + Forgot */}
                        <div className={styles.rowBetween}>
                            <label className={styles.remember}>
                                <input type="checkbox" name="remember_me" className={styles.checkbox} />
                                <span>Remember me</span>
                            </label>

                            <Link href="/auth/forgot_password" className={styles.linkBlue}>
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit */}
                        <button type="submit" className={styles.signInBtn} disabled={isLoading}>
                            {isLoading ? (
                                "Signing In..."
                            ) : (
                                <>
                                    <span className={styles.btnIcon} aria-hidden="true">
                                        <svg viewBox="0 0 24 24" className={styles.iconSvgWhite}>
                                            <path
                                                d="M10 17v-3H3v-4h7V7l5 5-5 5zm9-14h-8v2h8v14h-8v2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </span>
                                    Sign In
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className={styles.divider}>
                        <div className={styles.dividerLine} />
                        <span className={styles.dividerText}>Or continue with</span>
                        <div className={styles.dividerLine} />
                    </div>

                    {/* Google */}
                    {/* Google */}
                    <div className={styles.googleBtnWrapper}>
                        <GoogleSignInButton />
                    </div>

                    {/* Register */}
                    <div className={styles.register}>
                        <p>
                            Don&apos;t have an account?{" "}
                            <Link href="/register" className={styles.linkBlue}>
                                Create new one
                            </Link>
                        </p>
                    </div>

                    {/* Footer */}
                    <div className={styles.footer}>
                        <a href="https://www.specialstocks.us/" className={styles.backLink}>
                            <span className={styles.backIcon} aria-hidden="true">
                                <svg viewBox="0 0 24 24" className={styles.iconSvgMuted}>
                                    <path d="M14 7l-5 5 5 5V7z" fill="currentColor" />
                                </svg>
                            </span>
                            Back to Gallery
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
