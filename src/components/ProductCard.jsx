// import { Link } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";
// import { Heart } from "lucide-react";

// export default function ProductCard({ product }) {
//   const { addItem } = useCart();
//   const { state: wishlist, addToWishlist, removeFromWishlist } = useWishlist();

//   const inWishlist = wishlist.items.some((i) => i.id === product.id);

//   return (
//     <div className="border rounded-lg p-4 flex flex-col relative hover:shadow-md transition">
//       {/* Wishlist Heart */}
//       <button
//         className="absolute bottom-5 right-37"
//         onClick={() =>
//           inWishlist ? removeFromWishlist(product.id) : addToWishlist(product)
//         }
//       >
//         <Heart
//           size={22}
//           className={
//             inWishlist ? "text-red-500" : "text-black-500 hover:text-red-500"
//           }
//           fill={inWishlist ? "currentColor" : "none"}
//         />
//       </button>

//       {/* Clickable Area (image + text) */}
//       <Link to={`/product/${product.id}`} className="flex flex-col flex-1">
//         <img
//           src={product.image}
//           alt={product.title}
//           className="h-44 w-full object-cover rounded"
//         />
//         <h3 className="mt-3 text-lg font-semibold">{product.title}</h3>
//         <p className="mt-1 text-gray-600 text-sm flex-grow">
//           {product.description}
//         </p>
//       </Link>

//       {/* Price + Cart Button */}
//       <div className="mt-4 flex items-center justify-between">
//         <div className="text-lg font-bold">₹{product.price}</div>
//         <button
//           className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//           onClick={() =>
//             addItem({
//               id: product.id,
//               title: product.title,
//               price: product.price,
//               image: product.image,
//               qty: 1,
//             })
//           }
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const HeartIcon = ({ filled }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const BagIcon = () => (
  <svg
    width="14"
    height="14"
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

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { state: wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const inWishlist = wishlist.items.some((i) => i.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      qty: 1,
    });
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    inWishlist ? removeFromWishlist(product.id) : addToWishlist(product);
  };

  return (
    <>
      <style>{`
        .npc {
          position: relative;
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          transition: transform .3s cubic-bezier(.4,0,.2,1), box-shadow .3s cubic-bezier(.4,0,.2,1);
          cursor: pointer;
        }
        .npc:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0,0,0,.09);
        }

        /* image wrap */
        .npc-img-wrap {
          position: relative;
          overflow: hidden;
          aspect-ratio: 3/4;
          background: #f5f4f2;
        }
        .npc-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform .55s cubic-bezier(.4,0,.2,1);
          display: block;
        }
        .npc:hover .npc-img { transform: scale(1.05); }

        /* dark overlay on hover */
        .npc-overlay {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0);
          transition: background .35s ease;
          pointer-events: none;
        }
        .npc:hover .npc-overlay { background: rgba(0,0,0,.07); }

        /* wishlist btn */
        .npc-wish {
          position: absolute;
          top: .85rem; right: .85rem;
          z-index: 2;
          background: none; border: none;
          color: #bbb;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color .25s ease, transform .25s ease;
          line-height: 1;
        }
        .npc-wish:hover { color: #000; transform: scale(1.1); }
        .npc-wish.active { color: #000; }
        .npc-wish.active:hover { color: #c0392b; }

        /* add to cart — hidden, slides up on hover */
        .npc-cart {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          background: #000;
          color: #fff;
          border: none;
          padding: .75rem 1rem;
          font-family: 'DM Sans', sans-serif;
          font-size: .68rem;
          font-weight: 500;
          letter-spacing: .14em;
          text-transform: uppercase;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: .5rem;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity .28s ease, transform .28s ease, background .22s ease;
        }
        .npc:hover .npc-cart { opacity: 1; transform: translateY(0); }
        .npc-cart:hover { background: #c8a97e; color: #000; }

        /* info */
        .npc-info {
          padding: .9rem 1rem 1rem;
          display: flex;
          flex-direction: column;
          gap: .3rem;
        }
        .npc-name {
          font-family: 'DM Sans', sans-serif;
          font-size: .82rem;
          font-weight: 400;
          color: #0a0a0a;
          letter-spacing: .04em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-decoration: none;
        }
        .npc-price {
          font-family: 'DM Sans', sans-serif;
          font-size: .9rem;
          font-weight: 600;
          color: #0a0a0a;
          letter-spacing: .02em;
        }
        .npc-cat {
          font-size: .62rem;
          font-weight: 400;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: #c8a97e;
        }
      `}</style>

      <div className="npc">
        {/* ── IMAGE ── */}
        <div className="npc-img-wrap">
          <Link to={`/product/${product.id}`} tabIndex={-1}>
            <img src={product.image} alt={product.title} className="npc-img" />
            <div className="npc-overlay" />
          </Link>

          {/* Wishlist */}
          <button
            className={`npc-wish${inWishlist ? " active" : ""}`}
            onClick={handleWishlist}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <HeartIcon filled={inWishlist} />
          </button>

          {/* Add to Cart — hover reveal */}
          <button className="npc-cart" onClick={handleAddToCart}>
            <BagIcon /> Add to Cart
          </button>
        </div>

        {/* ── INFO ── */}
        <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
          <div className="npc-info">
            {product.category && (
              <span className="npc-cat">{product.category}</span>
            )}
            <span className="npc-name">{product.title}</span>
            <span className="npc-price">₹{product.price}</span>
          </div>
        </Link>
      </div>
    </>
  );
}
