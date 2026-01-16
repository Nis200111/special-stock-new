"use client";

import { useState } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import styles from "./login.module.css";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
});

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [logoFailed, setLogoFailed] = useState(false);

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
                    <form className={styles.form} method="POST" action="">
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
                        <button type="submit" className={styles.signInBtn}>
                            <span className={styles.btnIcon} aria-hidden="true">
                                <svg viewBox="0 0 24 24" className={styles.iconSvgWhite}>
                                    <path
                                        d="M10 17v-3H3v-4h7V7l5 5-5 5zm9-14h-8v2h8v14h-8v2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </span>
                            Sign In
                        </button>
                    </form>

                    {/* Divider */}
                    <div className={styles.divider}>
                        <div className={styles.dividerLine} />
                        <span className={styles.dividerText}>Or continue with</span>
                        <div className={styles.dividerLine} />
                    </div>

                    {/* Google */}
                    <a href="/auth/google_login" className={styles.googleBtn}>
                        <svg className={styles.googleIcon} viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        Continue with Google
                    </a>

                    {/* Register */}
                    <div className={styles.register}>
                        <p>
                            Don&apos;t have an account?{" "}
                            <Link href="/register" className={styles.linkBlue}>
                                Create one now
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
