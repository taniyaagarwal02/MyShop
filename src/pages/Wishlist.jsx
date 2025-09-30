import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function Wishlist() {
  const { state, removeFromWishlist, clearWishlist } = useWishlist();
  const { addItem } = useCart();

  const moveToCart = (item) => {
    // add to cart (qty 1) then remove from wishlist
    addItem({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      qty: 1,
    });
    removeFromWishlist(item.id);
  };

  if (state.items.length === 0) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
        <p className="text-gray-600">
          No items saved yet.{" "}
          <Link to="/" className="text-blue-600">
            Browse products
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Wishlist ❤️</h1>
        <button
          onClick={clearWishlist}
          className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200"
        >
          Clear Wishlist
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {state.items.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 flex flex-col">
            {/* Clickable image + title */}
            <Link to={`/product/${item.id}`} className="group">
              <img
                src={item.image}
                alt={item.title}
                className="h-40 w-full object-cover rounded group-hover:scale-105 transition-transform"
              />
              <h3 className="mt-3 text-lg font-semibold hover:text-blue-600">
                {item.title}
              </h3>
            </Link>

            <p className="mt-1 text-gray-600 text-sm">₹{item.price}</p>

            {/* Actions: Move to Cart + Remove */}
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => moveToCart(item)}
                className="flex-1 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Move to Cart
              </button>

              <button
                onClick={() => removeFromWishlist(item.id)}
                className="text-red-600 hover:underline px-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
