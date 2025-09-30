import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { formatINR } from "../utils/formatCurrency";
import { Link } from "react-router-dom";

export default function CheckoutPage() {
  const { state, clearCart, totalPrice } = useCart();

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    pincode: "",
    phone: "",
    payment: "cod",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.address ||
      !form.city ||
      !form.pincode ||
      !form.phone
    ) {
      alert("⚠️ Please fill all required fields.");
      return;
    }

    console.log("Order placed:", { ...form, items: state.items });

    clearCart();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="text-center py-12">
        <h2 className="text-3xl font-bold mb-4">Order Placed 🎉</h2>
        <p className="text-lg text-gray-700">
          Thank you <span className="font-semibold">{form.name}</span>. <br />
          Your order will be shipped to{" "}
          <span className="font-semibold">
            {form.address}, {form.city} - {form.pincode}
          </span>
          . <br />
          We’ll contact you at{" "}
          <span className="font-semibold">{form.phone}</span>.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (state.items.length === 0) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <p className="text-gray-600">
          Your cart is empty.{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            Go shopping
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Order Summary */}
      <div>
        <h2 className="text-xl font-bold mb-4">🛒 Order Summary</h2>
        <div className="space-y-4 border rounded-lg p-4 bg-gray-50">
          {state.items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>
                {item.title} × {item.qty}
              </span>
              <span>{formatINR(item.price * item.qty)}</span>
            </div>
          ))}
          <hr />
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>{formatINR(totalPrice)}</span>
          </div>
        </div>
      </div>

      {/* Checkout Form */}
      <div>
        <h2 className="text-xl font-bold mb-4">📦 Shipping Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <textarea
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />

          <div>
            <label className="font-semibold block mb-1">Payment Method</label>
            <select
              name="payment"
              value={form.payment}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="cod">Cash on Delivery</option>
              <option value="card">Credit/Debit Card</option>
              <option value="upi">UPI</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Place Order ✅
          </button>
        </form>
      </div>
    </div>
  );
}
