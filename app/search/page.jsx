import styles from "./search.module.css";

export default function SearchPage() {
  return (
    <div className={styles.page}>
      {/* Top promo bar */}
      <div className={styles.promoBar}>
        <div className={styles.promoInner}>
          <span className={styles.promoText}>
            Get 10 royalty-free image downloads each month with a cost-saving subscription.
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
          <div className={styles.logoCenter}>
            <span className={styles.logoLight}>Special</span>{" "}
            <span className={styles.logoBold}>Stocks</span>
          </div>


          {/* Right actions */}
          <div className={styles.headerRight}>
            <button className={styles.pricingBtn}>
              Pricing <span className={styles.chev}>▾</span>
            </button>

            <button className={styles.iconBtn} aria-label="Language"> <i className="fas fa-globe"></i></button>
            <button className={styles.iconBtn} aria-label="Favorites"><i className="far fa-heart"></i></button>
            <button className={styles.iconBtn} aria-label="Cart"> <i className="fas fa-shopping-cart"></i></button>

            <button className={styles.loginBtn}>Log in</button>
          </div>
        </div>

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

      {/* White content area */}
      <main className={styles.main}>
        <div className={styles.searchRow}>
          <select className={styles.select}>
            <option>All images</option>
            <option>Photos</option>
            <option>Videos</option>
            <option>Music</option>
          </select>

          <input className={styles.searchInput} placeholder="Start your next project" />

          <button className={styles.searchBtn} aria-label="Search"><i className="fas fa-search"></i></button>

          <button className={styles.searchByImageBtn}>
            <span className={styles.cameraIcon}><i className="fas fa-camera"></i></span>
            Search by image
          </button>
        </div>

        <div className={styles.titleBlock}>
          <h1 className={styles.title}>Royalty-free images</h1>
          <p className={styles.subTitle}>28 assets available for download.</p>
        </div>

        <div className={styles.pills}>
          <button className={`${styles.pill} ${styles.pillActive}`}>All Categories</button>
          <button className={styles.pill}>Animals (22)</button>
          <button className={styles.pill}>Business (5)</button>
          <button className={styles.pill}>Food (2)</button>
          <button className={styles.pill}>Nature (4)</button>
          <button className={styles.pill}>People (4)</button>
          <button className={styles.pill}>Technology (2)</button>
          <button className={styles.pill}>Travel (3)</button>
        </div>

        <div className={styles.filtersRow}>
          <div className={styles.leftFilters}>
            <button className={styles.filterBtn}><i className="fas fa-filter"></i> Filters</button>
            <button className={styles.filterChip}>Photos</button>
            <button className={styles.filterChip}>Videos</button>
            <button className={styles.filterChip}><i className="fas fa-crown text-purple-600"></i> Exclusive Images</button>
            <button className={styles.filterChip}>Free Only</button>
            <button className={styles.filterChip}>Premium</button>
          </div>

          <select className={styles.sortSelect}>
            <option>Relevance</option>
            <option>Newest</option>
            <option>Popular</option>
          </select>
        </div>

        {/* Screenshot reference section */}
        <div className={styles.ssWrap}>
          <img src="/ss/upper-1.png" alt="upper 1" className={styles.ssImage} />
          <img src="/ss/upper-2.png" alt="upper 2" className={styles.ssImage} />
        </div>
      </main>

      {/* ✅ Footer section (the screenshot part you showed) */}
      <section className={styles.feedbackSection}>
        <div className={styles.feedbackCard}>
          <p className={styles.feedbackTitle}>Did these results match your search?</p>
          <div className={styles.feedbackBtns}>
            <button className={styles.feedbackBtn} aria-label="Yes"><i class="far fa-smile text-xl text-gray-400 hover:text-green-500"></i></button>
            <button className={styles.feedbackBtn} aria-label="No"><i class="far fa-frown text-xl text-gray-400 hover:text-red-500"></i></button>
          </div>
        </div>
      </section>

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

            <button className={styles.langBtn}><i class="fas fa-globe hover:text-gray-300 cursor-pointer hidden sm:block"></i> English ▾</button>
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
            <a className={styles.socialIcon} href="#" aria-label="Facebook"><i class="fab fa-facebook hover:text-white cursor-pointer"></i></a>
            <a className={styles.socialIcon} href="#" aria-label="Instagram"><i class="fab fa-instagram hover:text-white cursor-pointer"></i></a>
            <a className={styles.socialIcon} href="#" aria-label="LinkedIn"><i class="fab fa-linkedin hover:text-white cursor-pointer"></i></a>
            <a className={styles.socialIcon} href="#" aria-label="YouTube"><i class="fab fa-youtube hover:text-white cursor-pointer"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
