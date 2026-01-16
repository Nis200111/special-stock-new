"use client";

import styles from "./legal.module.css";

export default function LegalPage() {
    return (
        <div className={styles.page}>
            {/* Top promo bar */}
            <div className={styles.promoBar}>
                <div className={styles.promoInner}>
                    <span className={styles.promoText}>
                        Get 10 royalty-free image downloads each month with a cost-saving
                        subscription.
                    </span>
                    <button className={styles.promoBtn}>Buy now</button>
                </div>
            </div>

            {/* Black header */}
            <header className={styles.header}>
                <div className={styles.headerInner}>
                    {/* Left spacer */}
                    <div className={styles.headerLeft} />

                    {/* Center logo */}
                    <div className={styles.logoCenter} aria-label="Special Stocks">
                        <span className={styles.logoLight}>Special</span>{" "}
                        <span className={styles.logoBold}>Stocks</span>
                    </div>

                    {/* Right actions */}
                    <div className={styles.headerRight}>
                        <button className={styles.pricingBtn}>
                            Pricing <span className={styles.chev}>▾</span>
                        </button>

                        <button className={styles.iconBtn} aria-label="Language">
                            <i className="fas fa-globe"></i>
                        </button>
                        <button className={styles.iconBtn} aria-label="Favorites">
                            <i className="far fa-heart"></i>
                        </button>
                        <button className={styles.iconBtn} aria-label="Cart">
                            <i className="fas fa-shopping-cart"></i>
                        </button>

                        <button className={styles.loginBtn}>Log in</button>
                    </div>
                </div>

                {/* Nav */}
                <nav className={styles.nav}>
                    <a className={styles.navItem} href="#">
                        Images <span className={styles.chev}>▾</span>
                    </a>
                    <a className={styles.navItem} href="#">
                        Video <span className={styles.chev}>▾</span>
                    </a>
                    <a className={styles.navItem} href="#">
                        Music <span className={styles.chev}>▾</span>
                    </a>
                    <a className={styles.navItem} href="#">
                        Exclusive Images
                    </a>
                </nav>
            </header>

            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.heroInner}>
                    <h1 className={styles.heroTitle}>Terms and Policies</h1>
                    <p className={styles.heroSub}>Last updated: September 25, 2025</p>
                </div>
            </section>

            {/* Main */}
            <main className={styles.legalMain}>
                <div className={styles.legalWrap}>
                    {/* Sidebar */}
                    <aside className={styles.sidebar}>
                        <div className={styles.sidebarSticky}>
                            <h3 className={styles.sidebarTitle}>Legal Policies</h3>

                            <nav aria-label="Jump to legal sections">
                                <ul className={styles.sidebarList}>
                                    <li>
                                        <a className={`${styles.sidebarLink} ${styles.active}`} href="#terms-of-service">
                                            Terms of Service
                                        </a>
                                    </li>
                                    <li>
                                        <a className={styles.sidebarLink} href="#privacy-policy">
                                            Privacy Policy
                                        </a>
                                    </li>
                                    <li>
                                        <a className={styles.sidebarLink} href="#buyer-licenses">
                                            Buyer License Agreements
                                        </a>
                                    </li>
                                    <li>
                                        <a className={styles.sidebarLink} href="#content-ai-policy">
                                            Content &amp; AI Policy
                                        </a>
                                    </li>
                                    <li>
                                        <a className={styles.sidebarLink} href="#cookie-policy">
                                            Cookie Policy
                                        </a>
                                    </li>
                                    <li>
                                        <a className={styles.sidebarLink} href="#contributor-agreement">
                                            Contributor Agreement
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </aside>

                    {/* Content */}
                    <article className={styles.content}>
                        {/* Terms of Service */}
                        <section id="terms-of-service" className={styles.section}>
                            <h2 className={styles.contentH2}>Terms of Service</h2>
                            <p className={styles.strongLine}>
                                <strong>Last Updated: 09/20/2025</strong>
                            </p>

                            <p className={styles.p}>
                                Welcome to Special Stocks LLC (“Company”, “we”, “our”, or “us”).
                                These Terms of Service (“Terms”) govern your access to and use of
                                our website, mobile applications, and related services
                                (collectively, the “Platform”).
                            </p>

                            <p className={styles.p}>
                                By accessing, browsing, registering, or otherwise using the
                                Platform, you (“you” or “user”) agree to be bound by these Terms,
                                our Privacy Policy, our Contributor Agreement, our Buyer License
                                Agreements, and any other policies referenced herein. If you do
                                not agree, please discontinue use of the Platform.
                            </p>

                            <h3 className={styles.h3}>1. Eligibility</h3>
                            <p className={styles.p}>
                                You must be at least 18 years old to create an account, purchase
                                content, or contribute content to the Platform.
                            </p>
                            <p className={styles.p}>
                                By using the Platform on behalf of a company or other entity,
                                you represent that you have the authority to bind that entity.
                            </p>

                            <h3 className={styles.h3}>2. Accounts</h3>
                            <h4 className={styles.h4}>2.1 Registration</h4>
                            <p className={styles.p}>
                                To access certain features, including purchasing or uploading
                                content, you must register for an account. You agree to provide
                                accurate, complete, and updated information.
                            </p>

                            <h4 className={styles.h4}>2.2 Account Security</h4>
                            <p className={styles.p}>
                                You are responsible for maintaining the confidentiality of your
                                login credentials and for all activities under your account. Any
                                unauthorized use must be reported immediately.
                            </p>

                            <h4 className={styles.h4}>2.3 Account Suspension or Termination</h4>
                            <p className={styles.p}>
                                We reserve the right to suspend, restrict, or terminate your
                                account at our discretion, including for violations of these
                                Terms, fraudulent activity, or intellectual property
                                infringement.
                            </p>

                            <h3 className={styles.h3}>3. Use of the Platform</h3>
                            <h4 className={styles.h4}>3.1 Permitted Use</h4>
                            <p className={styles.p}>The Platform allows users to:</p>
                            <ul className={styles.ul}>
                                <li>Purchase licenses to digital assets.</li>
                                <li>Upload content for distribution to buyers.</li>
                                <li>
                                    Access account dashboards for transaction history, licensing
                                    records, and payouts.
                                </li>
                            </ul>

                            <h4 className={styles.h4}>3.2 Prohibited Use</h4>
                            <p className={styles.p}>You may not:</p>
                            <ul className={styles.ul}>
                                <li>Use content in violation of the Buyer License Agreements.</li>
                                <li>Redistribute or resell content “as is” on competing platforms.</li>
                                <li>Upload unlawful, defamatory, obscene, infringing, or misleading content.</li>
                                <li>Misrepresent AI-generated outputs as authentic human photography of real events.</li>
                                <li>Interfere with the operation of the Platform (hacking, scraping, bots).</li>
                            </ul>

                            <h3 className={styles.h3}>4. Content Types</h3>
                            <p className={styles.p}>Contributors must designate uploaded content as one of the following:</p>
                            <ul className={styles.ul}>
                                <li>Original Photography – Taken with a camera and owned by the contributor.</li>
                                <li>Vector / Illustration – Created digitally using design software.</li>
                                <li>AI-Generated Content – Created using artificial intelligence tools.</li>
                            </ul>

                            <h3 className={styles.h3}>5. Buying Content</h3>
                            <h4 className={styles.h4}>5.1 Licenses</h4>
                            <p className={styles.p}>
                                Purchases grant you a license to use content, not ownership. All
                                use is subject to the applicable Buyer License Agreement
                                (Standard or Extended).
                            </p>

                            <h4 className={styles.h4}>5.2 Restrictions</h4>
                            <ul className={styles.ul}>
                                <li>
                                    Content may not be used in ways that violate the law, infringe
                                    trademarks, or harm third parties.
                                </li>
                                <li>
                                    Certain uses (e.g., resale on merchandise, large print runs,
                                    broadcasting) may require an Extended License.
                                </li>
                            </ul>

                            <h4 className={styles.h4}>5.3 No Refunds</h4>
                            <p className={styles.p}>
                                Due to the digital nature of the content, all sales are final
                                except where files are defective, corrupted, or misrepresented.
                            </p>

                            <h3 className={styles.h3}>6. Selling Content (Contributors)</h3>
                            <h4 className={styles.h4}>6.1 Grant of Rights</h4>
                            <p className={styles.p}>
                                By uploading, you grant Special Stocks LLC a worldwide,
                                royalty-free, sublicensable license to market, distribute, and
                                issue licenses to buyers on your behalf.
                            </p>

                            <h4 className={styles.h4}>6.2 Representations and Warranties</h4>
                            <p className={styles.p}>Contributors warrant that:</p>
                            <ul className={styles.ul}>
                                <li>They own or control the rights to uploaded content.</li>
                                <li>
                                    They have secured necessary model and property releases for
                                    identifiable people or property.
                                </li>
                                <li>AI content is properly disclosed as such.</li>
                            </ul>

                            <h4 className={styles.h4}>6.3 Payouts</h4>
                            <ul className={styles.ul}>
                                <li>Contributors will receive royalties as specified in the Contributor Agreement.</li>
                                <li>
                                    Payments are subject to minimum payout thresholds and may be delayed
                                    in cases of fraud investigation or chargebacks.
                                </li>
                            </ul>

                            <h3 className={styles.h3}>7. AI-Generated Content</h3>
                            <ul className={styles.ul}>
                                <li>AI content may not be unique; other users may generate similar or identical outputs.</li>
                                <li>No copyright ownership is transferred to buyers; instead, a contractual commercial license is granted.</li>
                                <li>Buyers must not use AI content in ways that are misleading (e.g., presenting as a genuine news photo).</li>
                                <li>
                                    Contributors uploading AI content are solely responsible for ensuring
                                    compliance with the originating tool’s terms of service.
                                </li>
                            </ul>

                            <h3 className={styles.h3}>8. Intellectual Property</h3>
                            <h4 className={styles.h4}>8.1 Platform Ownership</h4>
                            <p className={styles.p}>
                                All trademarks, branding, and software code of the Platform are owned
                                by Special Stocks LLC.
                            </p>

                            <h4 className={styles.h4}>8.2 User Content</h4>
                            <p className={styles.p}>
                                Contributors retain ownership of their content but license it to Special
                                Stocks LLC as described in Section 6.
                            </p>

                            <h4 className={styles.h4}>8.3 DMCA Policy</h4>
                            <p className={styles.p}>
                                We comply with the Digital Millennium Copyright Act (DMCA). Copyright
                                owners may submit takedown requests to our designated agent at
                                [Insert Contact Info]. Repeat infringers may have accounts terminated.
                            </p>

                            <h3 className={styles.h3}>9. Payments</h3>
                            <h4 className={styles.h4}>9.1 Buyers</h4>
                            <ul className={styles.ul}>
                                <li>Buyers must pay all applicable fees, taxes, and charges at checkout.</li>
                                <li>Prices are subject to change without prior notice.</li>
                            </ul>

                            <h4 className={styles.h4}>9.2 Contributors</h4>
                            <ul className={styles.ul}>
                                <li>Payouts are calculated based on the number and type of licenses sold.</li>
                                <li>Contributors are responsible for providing accurate tax information.</li>
                                <li>Special Stocks LLC may withhold amounts as required by law.</li>
                            </ul>

                            <h3 className={styles.h3}>10. Refunds &amp; Chargebacks</h3>
                            <ul className={styles.ul}>
                                <li>Refunds are limited to defective, duplicate, or misrepresented files.</li>
                                <li>
                                    If a chargeback occurs, Special Stocks LLC reserves the right to deduct
                                    amounts from contributor earnings.
                                </li>
                            </ul>

                            <h3 className={styles.h3}>11. Termination</h3>
                            <ul className={styles.ul}>
                                <li>Special Stocks LLC may suspend or terminate accounts for violations of these Terms.</li>
                                <li>Termination does not affect licenses already issued to buyers.</li>
                            </ul>

                            <h3 className={styles.h3}>12. Disclaimers</h3>
                            <p className={styles.p}>
                                The Platform and all content are provided “as is.” We make no warranties
                                regarding the uniqueness, fitness for a particular purpose, or
                                merchantability of content.
                            </p>
                            <p className={styles.p}>
                                AI content may not be copyrightable. Licenses are contractual only.
                            </p>

                            <h3 className={styles.h3}>13. Limitation of Liability</h3>
                            <p className={styles.p}>To the maximum extent permitted by law:</p>
                            <ul className={styles.ul}>
                                <li>Special Stocks LLC shall not be liable for indirect, incidental, or consequential damages.</li>
                                <li>
                                    Our total liability to any user shall not exceed the greater of:
                                    USD $100, or the total amount paid by that user in the past six months.
                                </li>
                            </ul>

                            <h3 className={styles.h3}>14. Indemnification</h3>
                            <p className={styles.p}>
                                You agree to indemnify, defend, and hold harmless Special Stocks LLC,
                                its affiliates, officers, and employees against any claims arising from:
                            </p>
                            <ul className={styles.ul}>
                                <li>Your uploaded content,</li>
                                <li>Your misuse of licensed content,</li>
                                <li>Your violation of these Terms or applicable laws.</li>
                            </ul>

                            <h3 className={styles.h3}>15. Governing Law &amp; Disputes</h3>
                            <p className={styles.p}>
                                These Terms shall be governed by and construed in accordance with the
                                laws of the State of New Mexico, United States, without regard to
                                conflict of law principles. Any disputes arising under or relating to
                                these Terms, the Platform, or any Content shall be resolved through
                                binding arbitration conducted in New Mexico under the rules of the
                                American Arbitration Association (AAA) or a similar recognized
                                arbitration body, except for claims that qualify for small claims court.
                                You agree that you may only bring claims against Special Stocks LLC in
                                your individual capacity and not as part of a class action, consolidated
                                action, or representative proceeding.
                            </p>

                            <h3 className={styles.h3}>16. Modifications</h3>
                            <p className={styles.p}>
                                We may update these Terms at any time. Updated versions will be posted
                                on the Platform with a new “Last Updated” date. Continued use of the
                                Platform constitutes acceptance of revised Terms.
                            </p>

                            <h3 className={styles.h3}>17. Contact</h3>
                            <p className={styles.p}>
                                Questions about these Terms may be sent to:
                                <br />
                                Special Stocks LLC
                                <br />
                                Email: info@specialstocks.us
                                <br />
                                Address: 8206 Louisiana Blvd NE, Ste B #10483, Albuquerque, NM 87113.
                            </p>
                        </section>

                        {/* Privacy Policy */}
                        <section id="privacy-policy" className={styles.section}>
                            <h2 className={styles.contentH2}>Privacy Policy</h2>
                            <p className={styles.strongLine}>
                                <strong>Effective Date: 09/20/2025</strong>
                            </p>

                            <p className={styles.p}>
                                This Privacy Policy explains how Special Stocks LLC (“Company”, “we”,
                                “our”, or “us”) collects, uses, stores, and discloses your information
                                when you access or use our website, mobile applications, and related
                                services (collectively, the “Platform”).
                            </p>

                            <p className={styles.p}>
                                By accessing or using the Platform, you acknowledge that you have read,
                                understood, and agree to this Privacy Policy. If you do not agree, you
                                must discontinue use of the Platform.
                            </p>

                            <h3 className={styles.h3}>1. Scope</h3>
                            <p className={styles.p}>This Privacy Policy applies to:</p>
                            <ul className={styles.ul}>
                                <li>Visitors to our Platform.</li>
                                <li>Buyers who purchase and license content.</li>
                                <li>
                                    Contributors who upload and license photographs, illustrations,
                                    vectors, or AI-generated content.
                                </li>
                            </ul>

                            <h3 className={styles.h3}>2. Information We Collect</h3>
                            <p className={styles.p}><strong>2.1 Information You Provide Directly</strong></p>
                            <ul className={styles.ul}>
                                <li>Account details: name, email address, username, password, company details (if applicable).</li>
                                <li>Payment details: billing information, payout preferences, tax forms (we do not store full credit card numbers; payments are processed via third-party providers).</li>
                                <li>Content submissions: uploaded images, vectors, AI-generated content, metadata, and model/property releases.</li>
                                <li>Communications: support requests, feedback, and correspondence.</li>
                                <li>Verification information: government-issued identification and tax information (for contributor payouts and compliance).</li>
                            </ul>

                            <p className={styles.p}><strong>2.2 Information Collected Automatically</strong></p>
                            <ul className={styles.ul}>
                                <li>Device and usage data: IP address, browser type, device identifiers, referral URLs, access times, and activity logs.</li>
                                <li>Cookies and tracking: we use cookies, analytics, and similar technologies to improve functionality, security, and personalization.</li>
                                <li>Location information: approximate geolocation via IP address; precise location if you enable it on your device.</li>
                            </ul>

                            <p className={styles.p}><strong>2.3 Information From Third Parties</strong></p>
                            <ul className={styles.ul}>
                                <li>Payment processors: confirmations of transactions.</li>
                                <li>Social logins: information when you sign in via Google, Facebook, or other third-party accounts.</li>
                                <li>Public records or rights holders: information to verify ownership or investigate intellectual property claims.</li>
                            </ul>

                            <h3 className={styles.h3}>3. How We Use Your Information</h3>
                            <p className={styles.p}>We use your information for the following purposes:</p>
                            <ul className={styles.ul}>
                                <li>To provide services: operating accounts, processing transactions, issuing licenses, and fulfilling contractual obligations.</li>
                                <li>For contributor payments: calculating royalties, verifying identity, and complying with tax/legal obligations.</li>
                                <li>For licensing records: generating certificates and maintaining purchase history.</li>
                                <li>For communications: responding to inquiries, sending confirmations, policy updates, and (with consent) promotional materials.</li>
                                <li>For platform security: monitoring fraud, abuse, or unauthorized activity.</li>
                                <li>For analytics: improving search functionality, user experience, and content relevance.</li>
                                <li>For legal compliance: meeting obligations under U.S. and international laws.</li>
                            </ul>

                            <h3 className={styles.h3}>4. Cookies and Tracking</h3>
                            <p className={styles.p}>We use cookies and related technologies to:</p>
                            <ul className={styles.ul}>
                                <li>Authenticate sessions.</li>
                                <li>Save user preferences.</li>
                                <li>Analyze site traffic and usage.</li>
                                <li>Deliver targeted advertising and promotions.</li>
                            </ul>
                            <p className={styles.p}>
                                You can disable cookies via your browser, but doing so may limit some Platform functionality.
                            </p>

                            <h3 className={styles.h3}>5. Disclosure of Information</h3>
                            <p className={styles.p}>We may share your information with:</p>
                            <ul className={styles.ul}>
                                <li>Service providers: hosting, analytics, customer support, payment processing, and identity verification.</li>
                                <li>Buyers: contributor name (or pseudonym), asset ID, and license details where necessary.</li>
                                <li>Contributors: details of buyer licenses for royalty records.</li>
                                <li>Legal authorities: where required by law, subpoena, or regulatory request.</li>
                                <li>Business transfers: in the event of a merger, acquisition, or sale of assets.</li>
                            </ul>
                            <p className={styles.p}>We do not sell or rent personal information to third parties.</p>

                            <h3 className={styles.h3}>6. AI-Generated Content Transparency</h3>
                            <p className={styles.p}>Contributors must identify AI-generated works during upload.</p>
                            <p className={styles.p}>We may record metadata to indicate whether content is AI, photography, or vector.</p>
                            <p className={styles.p}>
                                Buyers of AI-generated content will be notified that such works are licensed under a contractual commercial license and may not be copyrightable.
                            </p>
                            <p className={styles.p}>
                                Use of AI-generated content in misleading contexts (e.g., fake news, impersonation) is prohibited.
                            </p>

                            <h3 className={styles.h3}>7. Data Retention</h3>
                            <p className={styles.p}>Account information is retained while your account is active.</p>
                            <p className={styles.p}>License and purchase records are retained indefinitely for legal and contractual validation.</p>
                            <p className={styles.p}>Contributor payout records are retained to comply with tax and financial laws.</p>
                            <p className={styles.p}>Certain information may remain in backups after account deletion.</p>

                            <h3 className={styles.h3}>8. Data Security</h3>
                            <p className={styles.p}>
                                We implement reasonable administrative, technical, and physical safeguards to protect your data.
                                However, no system is fully secure, and you are responsible for safeguarding your account credentials.
                            </p>

                            <h3 className={styles.h3}>9. Your Rights</h3>
                            <p className={styles.p}>Depending on your jurisdiction, you may have the right to:</p>
                            <ul className={styles.ul}>
                                <li>Access the personal information we hold about you.</li>
                                <li>Correct or update inaccurate information.</li>
                                <li>Request deletion of your data (subject to license/legal retention).</li>
                                <li>Restrict or object to certain processing.</li>
                                <li>Request portability of your information.</li>
                                <li>Withdraw consent to marketing communications.</li>
                            </ul>
                            <p className={styles.p}>Requests may be submitted to info@specialstocks.us.</p>

                            <h3 className={styles.h3}>10. California Residents (CCPA/CPRA)</h3>
                            <p className={styles.p}>If you are a California resident, you have the right to:</p>
                            <ul className={styles.ul}>
                                <li>Request disclosure of categories of personal information collected.</li>
                                <li>Request deletion of personal information (subject to license/legal obligations).</li>
                                <li>Opt out of any sale or sharing of personal information (we do not sell data as defined by CCPA/CPRA).</li>
                                <li>Not be discriminated against for exercising these rights.</li>
                            </ul>

                            <h3 className={styles.h3}>11. Children’s Privacy</h3>
                            <p className={styles.p}>
                                The Platform is not directed to children under 13 (or 16 in the EU/EEA).
                                We do not knowingly collect personal information from children.
                                Accounts found to be operated by minors will be terminated.
                            </p>

                            <h3 className={styles.h3}>12. International Data Transfers</h3>
                            <p className={styles.p}>
                                Your information may be processed in the United States, including in the State of New Mexico,
                                where Special Stocks LLC is registered. By using the Platform, you consent to such transfers.
                            </p>

                            <h3 className={styles.h3}>13. Third-Party Links</h3>
                            <p className={styles.p}>
                                The Platform may contain links to third-party websites or services.
                                We are not responsible for the privacy practices of those third parties.
                            </p>

                            <h3 className={styles.h3}>14. Changes to this Policy</h3>
                            <p className={styles.p}>
                                We may revise this Privacy Policy from time to time.
                                The updated version will be posted with a new “Effective Date.”
                                Continued use of the Platform constitutes acceptance of the updated Policy.
                            </p>

                            <h3 className={styles.h3}>15. Contact Us</h3>
                            <p className={styles.p}>
                                For questions or requests regarding this Privacy Policy, contact:
                                <br />
                                Special Stocks LLC
                                <br />
                                Email: info@specialstocks.us
                                <br />
                                Address: 8206 Louisiana Blvd NE, Ste B #10483, Albuquerque, NM 87113
                            </p>
                        </section>
                    </article>
                </div>
            </main>

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
