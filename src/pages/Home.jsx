import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

function useReveal(threshold = 0.08) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

const GENDERS = ["Men", "Women", "Kids"];
const VIBES = [
  { id: null, label: "All" },
  { id: "overthinker", label: "Overthinker" },
  { id: "gym", label: "Gym" },
  { id: "spiritual", label: "Spiritual" },
  { id: "customized", label: "Customized" },
];

export default function Home() {
  const [gender, setGender] = useState("Men");
  const [vibe, setVibe] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [maxPrice, setMaxPrice] = useState(4000);

  const [heroRef, heroVis] = useReveal(0.05);
  const [vibeRef, vibeVis] = useReveal(0.1);
  const [gridRef, gridVis] = useReveal(0.05);

  const filtered = products
    .filter((p) => {
      const ms =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const mv = !vibe || (p.category || "").toLowerCase() === vibe;
      const mp = p.price <= maxPrice;
      return ms && mv && mp;
    })
    .sort((a, b) => {
      if (sort === "priceLow") return a.price - b.price;
      if (sort === "priceHigh") return b.price - a.price;
      if (sort === "titleAZ") return a.title.localeCompare(b.title);
      if (sort === "titleZA") return b.title.localeCompare(a.title);
      return 0;
    });

  const scrollToGrid = () =>
    document
      .getElementById("collection")
      ?.scrollIntoView({ behavior: "smooth" });

  const resetAll = () => {
    setSearch("");
    setVibe(null);
    setMaxPrice(4000);
    setSort("default");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --black:   #0a0a0a;
          --white:   #ffffff;
          --gold:    #c8a97e;
          --bg:      #f7f6f4;
          --border:  rgba(0,0,0,.08);
          --bmd:     rgba(0,0,0,.13);
          --grey:    #9a9a9a;
          --greylt:  #c8c8c8;
          --ease:    .3s cubic-bezier(.4,0,.2,1);
          --sans:    'DM Sans', sans-serif;
          --serif:   'Playfair Display', serif;
        }

        .nx { font-family: var(--sans); background: var(--bg); color: var(--black); min-height: 100vh; }

        /* ── REVEAL ──────────────────────────────────────────────────── */
        .rv { opacity: 0; transform: translateY(14px); transition: opacity .65s ease, transform .65s ease; }
        .rv.in { opacity: 1; transform: none; }

        /* ── HERO ────────────────────────────────────────────────────── */
        .nx-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 88svh;
          overflow: hidden;
        }

        .nx-hero-l {
          background: var(--black);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: clamp(2.5rem, 5vw, 5.5rem);
        }

        .nx-kicker {
          font-size: .6rem;
          letter-spacing: .32em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 1.5rem;
          opacity: 0;
          animation: up .6s .1s ease forwards;
        }

        .nx-h1 {
          font-family: var(--serif);
          font-size: clamp(4rem, 7.5vw, 7.5rem);
          font-weight: 900;
          color: var(--white);
          line-height: .9;
          letter-spacing: -.02em;
          margin-bottom: .5rem;
          opacity: 0;
          animation: up .6s .25s ease forwards;
        }

        .nx-italic {
          font-family: var(--serif);
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1rem, 2vw, 1.5rem);
          color: var(--gold);
          letter-spacing: .06em;
          margin-bottom: 2.2rem;
          opacity: 0;
          animation: up .6s .4s ease forwards;
        }

        .nx-hero-body {
          font-size: .82rem;
          font-weight: 300;
          color: rgba(255,255,255,.38);
          line-height: 1.75;
          max-width: 260px;
          margin-bottom: 2.8rem;
          opacity: 0;
          animation: up .6s .55s ease forwards;
        }

        .nx-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border: 1px solid rgba(255,255,255,.2);
          color: var(--white);
          background: transparent;
          padding: .78rem 1.8rem;
          font-family: var(--sans);
          font-size: .7rem;
          font-weight: 500;
          letter-spacing: .14em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 2px;
          transition: var(--ease);
          width: fit-content;
          opacity: 0;
          animation: up .6s .68s ease forwards;
        }
        .nx-cta:hover { background: var(--gold); border-color: var(--gold); color: var(--black); }
        .nx-cta-arr { transition: transform var(--ease); }
        .nx-cta:hover .nx-cta-arr { transform: translateX(4px); }

        .nx-hero-r { position: relative; overflow: hidden; }
        .nx-hero-r img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center top;
          animation: zoom 1.2s ease-out forwards;
        }
        .nx-hero-r::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(to right, rgba(10,10,10,.25), transparent 60%);
        }
        .nx-badge {
          position: absolute; bottom: 2rem; right: 2rem; z-index: 2;
          background: rgba(255,255,255,.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,.15);
          border-radius: 999px;
          padding: .42rem 1rem;
          font-size: .6rem;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: rgba(255,255,255,.65);
          opacity: 0;
          animation: up .6s .9s ease forwards;
        }

        @keyframes up   { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        @keyframes zoom { from { transform: scale(1.05); } to { transform: scale(1); } }

        /* ── GENDER BAR ──────────────────────────────────────────────── */
        {/* .nx-gender {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          padding: 1.4rem 2rem;
          background: var(--white);
          border-bottom: 1px solid var(--border);
        }
        .nx-glabel {
          font-size: .58rem;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: var(--greylt);
          margin-right: 2.5rem;
        }
        .nx-gtab {
          background: none; border: none; cursor: pointer;
          font-family: var(--sans);
          font-size: .7rem;
          font-weight: 500;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: var(--greylt);
          padding: .42rem 1.3rem;
          position: relative;
          transition: color var(--ease);
        }
        .nx-gtab::after {
          content: '';
          position: absolute;
          bottom: 0; left: 50%;
          width: 0; height: 1.5px;
          background: var(--black);
          transform: translateX(-50%);
          transition: width var(--ease);
        }
        .nx-gtab.on  { color: var(--black); }
        .nx-gtab.on::after { width: 55%; }
        .nx-gtab:not(.on):hover { color: #555; }
        .nx-gsep { width: 1px; height: 11px; background: var(--border); margin: 0 .2rem; } */}
        .nx-gender {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .85rem;
  padding: 1.6rem 2rem;
  background: var(--white);
  border-bottom: 1px solid var(--border);
}
.nx-glabel {
  font-size: .58rem;
  letter-spacing: .24em;
  text-transform: uppercase;
  color: var(--greylt);
}
.nx-gender-bar {
  display: flex;
  align-items: stretch;
  border: 1px solid var(--bmd);
  border-radius: 6px;
  overflow: hidden;
}
.nx-gtab {
  background: transparent;
  border: none;
  border-right: 1px solid var(--bmd);
  cursor: pointer;
  font-family: var(--sans);
  font-size: .68rem;
  font-weight: 500;
  letter-spacing: .2em;
  text-transform: uppercase;
  color: var(--grey);
  padding: .68rem 2.2rem;
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  transition: background var(--ease), color var(--ease);
}
.nx-gtab:last-child { border-right: none; }
.nx-gtab:hover:not(.on) { background: var(--bg); color: var(--black); }
.nx-gtab.on { background: var(--black); color: var(--white); }
.nx-gdot {
  display: inline-block;
  width: 4px; height: 4px;
  border-radius: 50%;
  background: var(--gold);
  opacity: 0;
  transition: opacity var(--ease);
  flex-shrink: 0;
}
.nx-gtab.on .nx-gdot { opacity: 1; }

        /* ── VIBE SECTION ────────────────────────────────────────────── */
        .nx-vibe {
          padding: 4.5rem 2rem 3.5rem;
          background: var(--bg);
        }
        .nx-sh {
          display: flex;
          align-items: baseline;
          gap: 1.2rem;
          margin-bottom: 2.2rem;
        }
        .nx-st {
          font-family: var(--serif);
          font-size: clamp(1.55rem, 3vw, 2.1rem);
          font-weight: 700;
          color: var(--black);
          letter-spacing: -.01em;
        }
        .nx-st i { font-style: italic; color: var(--gold); }
        .nx-stline {
          flex: 1; height: 1px;
          background: linear-gradient(to right, var(--bmd), transparent);
        }
        .nx-pills {
          display: flex;
          flex-wrap: wrap;
          gap: .6rem;
          align-items: center;
        }
        .nx-pill {
          background: transparent;
          border: 1px solid var(--bmd);
          border-radius: 999px;
          padding: .45rem 1.2rem;
          font-family: var(--sans);
          font-size: .7rem;
          font-weight: 400;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: #666;
          cursor: pointer;
          transition: background var(--ease), color var(--ease), border-color var(--ease);
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          gap: .45rem;
        }
        .nx-pill:hover { border-color: #888; color: var(--black); }
        .nx-pill.on { background: var(--black); color: var(--white); border-color: var(--black); }
        .nx-pdot {
          display: inline-block;
          width: 4px; height: 4px;
          background: var(--gold);
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* ── COLLECTION ──────────────────────────────────────────────── */
        .nx-col { padding: 1rem 2rem 5rem; background: var(--bg); }
        .nx-col-hd {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .nx-col-left { display: flex; align-items: baseline; gap: 1rem; }
        .nx-count {
          font-size: .62rem;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: #aaa;
        }

        /* Filters */
        .nx-frow {
          display: flex;
          align-items: center;
          gap: .55rem;
          flex-wrap: wrap;
        }
        .nx-fsearch {
          display: flex;
          align-items: center;
          gap: .4rem;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 999px;
          padding: .36rem .85rem;
          transition: border-color var(--ease);
        }
        .nx-fsearch:focus-within { border-color: var(--black); }
        .nx-fsearch input {
          border: none; outline: none; background: transparent;
          font-family: var(--sans); font-size: .7rem; color: var(--black); width: 100px;
        }
        .nx-fsearch input::placeholder { color: #c0c0c0; }
        .nx-fsel {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 999px;
          padding: .36rem .85rem;
          font-family: var(--sans);
          font-size: .7rem;
          color: var(--black);
          outline: none;
          cursor: pointer;
          appearance: none;
        }
        .nx-fprice {
          display: flex; align-items: center; gap: .45rem;
          font-size: .65rem; color: var(--grey); white-space: nowrap;
        }
        .nx-fprice input { accent-color: var(--gold); width: 75px; }
        .nx-freset {
          background: none; border: none; cursor: pointer;
          font-family: var(--sans); font-size: .65rem;
          letter-spacing: .1em; text-transform: uppercase;
          color: #bbb; padding: .36rem .5rem;
          transition: color var(--ease);
        }
        .nx-freset:hover { color: var(--black); }

        /* Grid */
        .nx-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.1rem;
        }
        .nx-empty {
          grid-column: 1 / -1;
          text-align: center;
          padding: 5rem 1rem;
          font-size: .8rem;
          color: #ccc;
          letter-spacing: .06em;
        }
        .nx-empty b {
          display: block;
          font-family: var(--serif);
          font-size: 2.2rem;
          color: #ddd;
          font-weight: 400;
          margin-bottom: .4rem;
        }

        /* ── BRAND STRIP ─────────────────────────────────────────────── */
        .nx-strip { background: var(--black); display: flex; }
        .nx-si {
          flex: 1; padding: 2.8rem 2.5rem;
          border-right: 1px solid rgba(255,255,255,.05);
          display: flex; flex-direction: column; gap: .45rem;
        }
        .nx-si:last-child { border-right: none; }
        .nx-sinum { font-family: var(--serif); font-size: 1.8rem; font-weight: 900; color: var(--gold); line-height: 1; }
        .nx-silbl { font-size: .7rem; font-weight: 500; color: var(--white); letter-spacing: .08em; }
        .nx-sidesc { font-size: .65rem; color: rgba(255,255,255,.3); line-height: 1.6; font-weight: 300; max-width: 190px; }

        /* ── FOOTER ──────────────────────────────────────────────────── */
        .nx-foot {
          padding: 1.4rem 2rem;
          background: var(--bg);
          border-top: 1px solid var(--border);
          display: flex; align-items: center; justify-content: space-between;
          gap: 1rem; flex-wrap: wrap;
        }
        .nx-fbrand { font-family: var(--serif); font-size: .95rem; font-weight: 700; letter-spacing: .1em; }
        .nx-fcopy  { font-size: .62rem; color: #bbb; letter-spacing: .08em; }
        .nx-flinks { display: flex; gap: 1.5rem; }
        .nx-flink {
          font-size: .62rem; letter-spacing: .12em; text-transform: uppercase;
          color: #999; text-decoration: none; transition: color var(--ease);
        }
        .nx-flink:hover { color: var(--black); }

        /* ── RESPONSIVE ──────────────────────────────────────────────── */
        @media (max-width: 1024px) {
          .nx-grid { grid-template-columns: repeat(2, 1fr); }
          .nx-strip { flex-direction: column; }
          .nx-si { border-right: none; border-bottom: 1px solid rgba(255,255,255,.05); }
        }
        @media (max-width: 768px) {
          .nx-hero { grid-template-columns: 1fr; min-height: auto; }
          .nx-hero-l { padding: 3rem 1.5rem 2.5rem; min-height: 390px; }
          .nx-hero-r { height: 250px; }
          .nx-gender { padding: 1.1rem 1.25rem; }
          .nx-glabel { display: none; }
          .nx-vibe, .nx-col { padding-left: 1.25rem; padding-right: 1.25rem; }
        }
        @media (max-width: 540px) {
          .nx-grid { grid-template-columns: repeat(2, 1fr); gap: .75rem; }
          .nx-col-hd { flex-direction: column; align-items: flex-start; }
          .nx-foot { flex-direction: column; text-align: center; }
          .nx-flinks { justify-content: center; }
        }
      `}</style>

      <div className="nx">
        {/* ── GENDER ────────────────────────────────────────────────── */}
        {/* <div className="nx-gender">
          <span className="nx-glabel">Shop for</span>
          {GENDERS.map((g, i) => (
            <React.Fragment key={g}>
              {i > 0 && <div className="nx-gsep" />}
              <button
                className={`nx-gtab${gender === g ? " on" : ""}`}
                onClick={() => setGender(g)}
              >
                {g}
              </button>
            </React.Fragment>
          ))}
        </div> */}
        {/* ── GENDER ────────────────────────────────────────────────────── */}
        <div className="nx-gender">
          <span className="nx-glabel">Shopping for</span>
          <div className="nx-gender-bar">
            {GENDERS.map((g) => (
              <button
                key={g}
                className={`nx-gtab${gender === g ? " on" : ""}`}
                onClick={() => setGender(g)}
              >
                <span className="nx-gdot" />
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* ── VIBE ──────────────────────────────────────────────────── */}
        <section className={`nx-vibe rv${vibeVis ? " in" : ""}`} ref={vibeRef}>
          <div className="nx-sh">
            <h2 className="nx-st">
              Choose Your <i>Vibe</i>
            </h2>
            <div className="nx-stline" />
          </div>
          <div className="nx-pills">
            {VIBES.map((v) => (
              <button
                key={String(v.id)}
                className={`nx-pill${vibe === v.id ? " on" : ""}`}
                onClick={() => {
                  setVibe(v.id);
                  document
                    .getElementById("collection")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {v.id && <span className="nx-pdot" />}
                {v.label}
              </button>
            ))}
          </div>
        </section>

        {/* ── COLLECTION ────────────────────────────────────────────── */}
        <section
          id="collection"
          className={`nx-col rv${gridVis ? " in" : ""}`}
          ref={gridRef}
        >
          <div className="nx-col-hd">
            <div className="nx-col-left">
              <h2 className="nx-st">
                Explore <i>Collection</i>
              </h2>
              <span className="nx-count">{filtered.length} pieces</span>
            </div>
            <div className="nx-frow">
              <div className="nx-fsearch">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#bbb"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <select
                className="nx-fsel"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="default">Sort</option>
                <option value="priceLow">Price ↑</option>
                <option value="priceHigh">Price ↓</option>
                <option value="titleAZ">A–Z</option>
                <option value="titleZA">Z–A</option>
              </select>
              <div className="nx-fprice">
                <span>₹{maxPrice}</span>
                <input
                  type="range"
                  min="0"
                  max="4000"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
              </div>
              <button className="nx-freset" onClick={resetAll}>
                Reset
              </button>
            </div>
          </div>

          <div className="nx-grid">
            {filtered.length > 0 ? (
              filtered.map((p) => <ProductCard key={p.id} product={p} />)
            ) : (
              <div className="nx-empty">
                <b>∅</b>
                No products match your selection.
              </div>
            )}
          </div>
        </section>

        {/* ── BRAND STRIP ───────────────────────────────────────────── */}
        <div className="nx-strip">
          <div className="nx-si">
            <span className="nx-sinum">04</span>
            <span className="nx-silbl">Mood Categories</span>
            <span className="nx-sidesc">
              Designed around emotions, not trends.
            </span>
          </div>
          <div className="nx-si">
            <span className="nx-sinum">100%</span>
            <span className="nx-silbl">Premium Cotton</span>
            <span className="nx-sidesc">
              Fabric chosen for comfort and longevity.
            </span>
          </div>
          <div className="nx-si">
            <span className="nx-sinum">∞</span>
            <span className="nx-silbl">Customized</span>
            <span className="nx-sidesc">
              Your concept. Your design. Fully yours.
            </span>
          </div>
        </div>

        {/* ── FOOTER ────────────────────────────────────────────────── */}
        <footer className="nx-foot">
          <span className="nx-fbrand">NISHYA</span>
          <span className="nx-fcopy">© 2025 Born To Be Unique</span>
          <nav className="nx-flinks">
            <a href="/about" className="nx-flink">
              About
            </a>
            <a href="/contact" className="nx-flink">
              Contact
            </a>
            <a href="/cart" className="nx-flink">
              Cart
            </a>
          </nav>
        </footer>
      </div>
    </>
  );
}
