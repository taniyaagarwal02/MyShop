// import { useState } from "react";
// import { Link, useSearchParams } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";

// export default function Navbar() {
//   const categories = ["all", "fashion", "electronics", "beauty", "books"];
//   const [searchParams] = useSearchParams();
//   const activeCategory = searchParams.get("category") || "all";

//   const [open, setOpen] = useState(false);

//   // Cart state
//   const { state: cartState } = useCart();
//   const cartCount = cartState.items.reduce((sum, item) => sum + item.qty, 0);

//   // Wishlist state
//   const { state: wishlistState } = useWishlist();
//   const wishlistCount = wishlistState.items.length;

//   return (
//     <nav className="sticky top-0 bg-white  shadow-md px-6 py-3 flex items-center justify-between  z-50">
//       <h1 className="text-2xl font-bold text-blue-600 font-Luminous-BC">
//         {" "}
//         Nitana{" "}
//       </h1>

//       {/* Main links */}
//       <div className="flex gap-6 items-center">
//         <Link to="/" className="hover:text-blue-600">
//           Home
//         </Link>
//         <Link to="/wishlist" className="relative hover:text-blue-600">
//           Wishlist
//           {wishlistCount > 0 && (
//             <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
//               {wishlistCount}
//             </span>
//           )}
//         </Link>

//         {/* Cart with badge */}
//         <Link to="/cart" className="relative hover:text-blue-600">
//           Cart
//           {cartCount > 0 && (
//             <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
//               {cartCount}
//             </span>
//           )}
//         </Link>

//         <Link to="/about" className="hover:text-blue-600">
//           About
//         </Link>
//         <Link to="/contact" className="hover:text-blue-600">
//           Contact
//         </Link>
//         <Link to="/login" className="hover:text-blue-600">
//           Login
//         </Link>
//       </div>

//       {/* Categories Dropdown */}
//       <div className="ml-8 relative">
//         <button
//           onClick={() => setOpen(!open)}
//           className="font-semibold hover:text-blue-600"
//         >
//           Categories ⬇
//         </button>

//         {open && (
//           <div className="absolute bg-white shadow-lg rounded mt-2 w-40 z-50">
//             {categories.map((cat) => (
//               <Link
//                 key={cat}
//                 to={`/?category=${cat}`}
//                 className={`block px-4 py-2 transition ${
//                   activeCategory === cat
//                     ? "bg-blue-100 text-blue-600 font-semibold"
//                     : "hover:bg-gray-100"
//                 }`}
//                 onClick={() => setOpen(false)} // close menu after click
//               >
//                 {cat.charAt(0).toUpperCase() + cat.slice(1)}
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

// Inline SVG Icons (Lucide-style outline)
const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);
const HeartIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const CartIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);
const UserIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const MenuIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const CloseIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// NISHYA Monogram SVG Logo (N with wings)
const NishyaLogo = () => (
  <svg
    width="38"
    height="38"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Left stroke of N */}
    <path
      d="M18 75 L18 25"
      stroke="#c8a97e"
      strokeWidth="7"
      strokeLinecap="round"
    />
    {/* Diagonal of N */}
    <path
      d="M18 25 L52 75"
      stroke="#c8a97e"
      strokeWidth="7"
      strokeLinecap="round"
    />
    {/* Right stroke of N */}
    <path
      d="M52 75 L52 25"
      stroke="#c8a97e"
      strokeWidth="7"
      strokeLinecap="round"
    />
    {/* Wing feathers - right side */}
    <path
      d="M52 28 Q68 18 82 10"
      stroke="#c8a97e"
      strokeWidth="5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M52 36 Q67 26 80 20"
      stroke="#c8a97e"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M52 44 Q65 36 76 30"
      stroke="#c8a97e"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/?category=all" },
  { label: "T-Shirts", to: "/?category=fashion" },
  { label: "New Arrivals", to: "/new-arrivals" },
  { label: "About", to: "/about" },
];

export default function Navbar() {
  const [searchParams] = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);

  const { state: cartState } = useCart();
  const cartCount = cartState.items.reduce((sum, item) => sum + item.qty, 0);
  const { state: wishlistState } = useWishlist();
  const wishlistCount = wishlistState.items.length;

  // Sticky scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-focus search input
  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Cormorant+Garamond:wght@300;400;500&family=Poppins:wght@300;400;500&display=swap');

        :root {
          --gold: #c8a97e;
          --gold-light: #d9bc96;
          --black: #0a0a0a;
          --white: #ffffff;
          --cream: #faf8f5;
          --gray: #6b6b6b;
          --border: rgba(200,169,126,0.2);
        }

        .nishya-nav {
          position: sticky;
          top: 0;
          z-index: 9999;
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          transition: box-shadow 0.3s ease, background 0.3s ease;
          font-family: 'Poppins', sans-serif;
        }

        .nishya-nav.scrolled {
          box-shadow: 0 4px 30px rgba(0,0,0,0.07);
          background: rgba(255,255,255,0.99);
        }

        /* Top accent line */
        .nishya-nav::before {
          content: '';
          display: block;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
        }

        .nav-inner {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 2rem;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }

        /* ── LOGO ── */
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }

        .nav-brand {
          font-family: 'Playfair Display', serif;
          font-size: 1.45rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          color: var(--black);
          line-height: 1;
          transition: color 0.3s ease;
        }

        .nav-brand span {
          color: var(--gold);
        }

        .nav-logo:hover .nav-brand {
          color: var(--gold);
        }

        /* ── CENTER LINKS ── */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          position: relative;
          text-decoration: none;
          font-family: 'Poppins', sans-serif;
          font-size: 0.78rem;
          font-weight: 400;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--black);
          transition: color 0.3s ease;
          padding: 4px 0;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0%;
          height: 1px;
          background: var(--gold);
          transition: width 0.35s cubic-bezier(0.4,0,0.2,1);
        }

        .nav-link:hover {
          color: var(--gold);
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        .nav-link.active {
          color: var(--gold);
        }

        /* ── RIGHT ICONS ── */
        .nav-icons {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          flex-shrink: 0;
        }

        .nav-icon-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: transparent;
          border: none;
          cursor: pointer;
          color: var(--black);
          transition: color 0.3s ease, background 0.3s ease;
          text-decoration: none;
        }

        .nav-icon-btn:hover {
          color: var(--gold);
          background: rgba(200,169,126,0.08);
        }

        .icon-badge {
          position: absolute;
          top: 4px;
          right: 4px;
          min-width: 16px;
          height: 16px;
          background: var(--gold);
          color: white;
          font-size: 0.6rem;
          font-weight: 600;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 3px;
          font-family: 'Poppins', sans-serif;
          line-height: 1;
        }

        /* ── SEARCH BAR ── */
        .search-overlay {
          position: fixed;
          top: 74px;
          left: 0;
          right: 0;
          background: rgba(255,255,255,0.98);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          padding: 1.2rem 2rem;
          z-index: 9998;
          display: flex;
          align-items: center;
          gap: 1rem;
          transform: translateY(-10px);
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
        }

        .search-overlay.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: all;
        }

        .search-input {
          flex: 1;
          max-width: 600px;
          margin: 0 auto;
          border: none;
          border-bottom: 1.5px solid var(--gold);
          background: transparent;
          font-family: 'Poppins', sans-serif;
          font-size: 1rem;
          letter-spacing: 0.05em;
          color: var(--black);
          padding: 0.5rem 0;
          outline: none;
        }

        .search-input::placeholder {
          color: #aaa;
          font-weight: 300;
          letter-spacing: 0.1em;
          font-size: 0.9rem;
        }

        /* ── DIVIDER ── */
        .nav-divider {
          width: 1px;
          height: 18px;
          background: var(--border);
          margin: 0 0.5rem;
        }

        /* ── HAMBURGER ── */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          color: var(--black);
          transition: color 0.3s ease;
        }

        .hamburger:hover { color: var(--gold); }

        /* ── MOBILE DRAWER ── */
        .mobile-drawer {
          position: fixed;
          top: 0;
          right: 0;
          width: min(340px, 100vw);
          height: 100vh;
          background: var(--white);
          z-index: 99999;
          display: flex;
          flex-direction: column;
          padding: 2rem;
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.4,0,0.2,1);
          border-left: 1px solid var(--border);
        }

        .mobile-drawer.open {
          transform: translateX(0);
          box-shadow: -20px 0 60px rgba(0,0,0,0.12);
        }

        .drawer-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.35);
          z-index: 99998;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.4s ease;
        }

        .drawer-overlay.open {
          opacity: 1;
          pointer-events: all;
        }

        .drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border);
        }

        .drawer-close {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--black);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          transition: color 0.3s ease, background 0.3s ease;
        }

        .drawer-close:hover {
          color: var(--gold);
          background: rgba(200,169,126,0.08);
        }

        .drawer-links {
          display: flex;
          flex-direction: column;
          gap: 0;
          flex: 1;
        }

        .drawer-link {
          display: flex;
          align-items: center;
          text-decoration: none;
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          font-weight: 400;
          color: var(--black);
          padding: 1rem 0;
          border-bottom: 1px solid rgba(200,169,126,0.12);
          transition: color 0.3s ease, padding-left 0.3s ease;
          letter-spacing: 0.04em;
        }

        .drawer-link:hover {
          color: var(--gold);
          padding-left: 8px;
        }

        .drawer-icons {
          display: flex;
          gap: 1rem;
          margin-top: 2.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .nav-links { display: none; }
          .hamburger { display: flex; }
          .nav-inner { gap: 1rem; }
        }

        @media (max-width: 480px) {
          .nav-inner { padding: 0 1.25rem; }
          .nav-brand { font-size: 1.2rem; letter-spacing: 0.14em; }
        }
      `}</style>

      <nav className={`nishya-nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          {/* ── LEFT: LOGO ── */}
          <Link to="/" className="nav-logo">
            <NishyaLogo />
            <span className="nav-brand">
              NISH<span>YA</span>
            </span>
          </Link>

          {/* ── CENTER: NAV LINKS ── */}
          <ul className="nav-links">
            {navLinks.map(({ label, to }) => {
              const isActive =
                to === "/"
                  ? window.location.pathname === "/" &&
                    !searchParams.get("category")
                  : window.location.pathname + window.location.search === to ||
                    window.location.pathname === to;
              return (
                <li key={label}>
                  <Link
                    to={to}
                    className={`nav-link${isActive ? " active" : ""}`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ── RIGHT: ICONS ── */}
          <div className="nav-icons">
            {/* Search */}
            <button
              className="nav-icon-btn"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Search"
              title="Search"
            >
              <SearchIcon />
            </button>

            <div className="nav-divider" />

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="nav-icon-btn"
              aria-label="Wishlist"
              title="Wishlist"
            >
              <HeartIcon />
              {wishlistCount > 0 && (
                <span className="icon-badge">{wishlistCount}</span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="nav-icon-btn"
              aria-label="Cart"
              title="Cart"
            >
              <CartIcon />
              {cartCount > 0 && <span className="icon-badge">{cartCount}</span>}
            </Link>

            {/* Profile */}
            <Link
              to="/login"
              className="nav-icon-btn"
              aria-label="Account"
              title="Account"
            >
              <UserIcon />
            </Link>

            {/* Hamburger — mobile only */}
            <button
              className="hamburger"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </nav>

      {/* ── SEARCH OVERLAY ── */}
      <div className={`search-overlay${searchOpen ? " open" : ""}`}>
        <input
          ref={searchRef}
          type="text"
          className="search-input"
          placeholder="Search for styles, products, collections..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setSearchOpen(false);
            if (e.key === "Enter" && searchQuery.trim()) {
              window.location.href = `/?search=${encodeURIComponent(searchQuery.trim())}`;
              setSearchOpen(false);
            }
          }}
        />
      </div>

      {/* ── MOBILE DRAWER OVERLAY ── */}
      <div
        className={`drawer-overlay${mobileOpen ? " open" : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* ── MOBILE DRAWER ── */}
      <div
        className={`mobile-drawer${mobileOpen ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="drawer-header">
          <Link
            to="/"
            className="nav-logo"
            onClick={() => setMobileOpen(false)}
          >
            <NishyaLogo />
            <span className="nav-brand">
              NISH<span>YA</span>
            </span>
          </Link>
          <button
            className="drawer-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="drawer-links">
          {navLinks.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className="drawer-link"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="drawer-icons">
          <Link
            to="/wishlist"
            className="nav-icon-btn"
            onClick={() => setMobileOpen(false)}
            aria-label="Wishlist"
          >
            <HeartIcon />
            {wishlistCount > 0 && (
              <span className="icon-badge">{wishlistCount}</span>
            )}
          </Link>
          <Link
            to="/cart"
            className="nav-icon-btn"
            onClick={() => setMobileOpen(false)}
            aria-label="Cart"
          >
            <CartIcon />
            {cartCount > 0 && <span className="icon-badge">{cartCount}</span>}
          </Link>
          <Link
            to="/login"
            className="nav-icon-btn"
            onClick={() => setMobileOpen(false)}
            aria-label="Account"
          >
            <UserIcon />
          </Link>
        </div>
      </div>
    </>
  );
}
