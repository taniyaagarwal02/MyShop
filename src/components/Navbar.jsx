import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function Navbar() {
  const categories = ["all", "fashion", "electronics", "beauty", "books"];
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";

  const [open, setOpen] = useState(false);

  // Cart state
  const { state: cartState } = useCart();
  const cartCount = cartState.items.reduce((sum, item) => sum + item.qty, 0);

  // Wishlist state
  const { state: wishlistState } = useWishlist();
  const wishlistCount = wishlistState.items.length;

  return (
    <nav className="sticky top-0 bg-white  shadow-md px-6 py-3 flex items-center justify-between  z-50">
      <h1 className="text-2xl font-bold text-blue-600">🛒 MyStore</h1>

      {/* Main links */}
      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-blue-600">
          Home
        </Link>
        <Link to="/wishlist" className="relative hover:text-blue-600">
          Wishlist
          {wishlistCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
              {wishlistCount}
            </span>
          )}
        </Link>

        {/* Cart with badge */}
        <Link to="/cart" className="relative hover:text-blue-600">
          Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
              {cartCount}
            </span>
          )}
        </Link>

        <Link to="/about" className="hover:text-blue-600">
          About
        </Link>
        <Link to="/contact" className="hover:text-blue-600">
          Contact
        </Link>
        <Link to="/login" className="hover:text-blue-600">
          Login
        </Link>
      </div>

      {/* Categories Dropdown */}
      <div className="ml-8 relative">
        <button
          onClick={() => setOpen(!open)}
          className="font-semibold hover:text-blue-600"
        >
          Categories ⬇
        </button>

        {open && (
          <div className="absolute bg-white shadow-lg rounded mt-2 w-40 z-50">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/?category=${cat}`}
                className={`block px-4 py-2 transition ${
                  activeCategory === cat
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setOpen(false)} // close menu after click
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
