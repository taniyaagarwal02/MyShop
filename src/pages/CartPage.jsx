import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatINR } from "../utils/formatCurrency";

export default function CartPage() {
  const { state, updateQty, removeItem, totalPrice } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-600">
          Your cart is empty.{" "}
          <Link className="text-blue-600 hover:underline" to="/">
            Go shopping
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Your Cart 🛒</h1>

      <div className="space-y-4">
        {state.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border p-4 rounded-lg shadow-sm"
          >
            {/* Product link (image + title) */}
            <Link
              to={`/product/${item.id}`}
              className="flex items-center gap-4 flex-1"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover rounded hover:scale-105 transition"
              />
              <div>
                <div className="font-semibold hover:text-blue-600">
                  {item.title}
                </div>
                <div className="text-sm text-gray-600">
                  {formatINR(item.price)}
                </div>
              </div>
            </Link>

            {/* Qty controls + subtotal */}
            <div className="flex items-center gap-4">
              <input
                type="number"
                min="1"
                className="w-16 border rounded px-2 py-1"
                value={item.qty}
                onChange={(e) =>
                  updateQty(item.id, Math.max(1, parseInt(e.target.value || 1)))
                }
              />
              <div className="font-semibold">
                {formatINR(item.price * item.qty)}
              </div>
              <button
                className="text-red-600 hover:underline"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total + Checkout */}
      <div className="mt-6 flex justify-end items-center gap-6">
        <div className="text-lg font-bold">Total: {formatINR(totalPrice)}</div>
        <Link
          to="/checkout"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
