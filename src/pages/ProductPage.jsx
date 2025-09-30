import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Heart, Star } from "lucide-react";

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const { state: wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const inWishlist = wishlist.items.some((i) => i.id === product?.id);

  const [reviews, setReviews] = useState([
    {
      name: "Tanya",
      rating: 5,
      comment: "Loved this product!",
      date: "2025-09-20",
    },
    {
      name: "Rahul",
      rating: 4,
      comment: "Good quality, worth the price.",
      date: "2025-09-25",
    },
  ]);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

  if (!product)
    return <div className="text-center py-10">❌ Product not found</div>;

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : "0";

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.comment) {
      setReviews([
        ...reviews,
        { ...newReview, date: new Date().toISOString().split("T")[0] },
      ]);
      setNewReview({ name: "", rating: 5, comment: "" });
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Image */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-96 object-cover rounded-lg shadow hover:scale-105 transition"
        />
        <button
          className="absolute top-3 right-3"
          onClick={() =>
            inWishlist ? removeFromWishlist(product.id) : addToWishlist(product)
          }
        >
          <Heart
            size={28}
            className={
              inWishlist ? "text-red-500" : "text-gray-500 hover:text-red-500"
            }
            fill={inWishlist ? "currentColor" : "none"}
          />
        </button>
      </div>

      {/* Details */}
      <div>
        <h2 className="text-3xl font-bold">{product.title}</h2>

        {/* Rating Summary */}
        <div className="flex items-center mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={20}
              className={
                i < Math.round(avgRating)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }
            />
          ))}
          <span className="ml-2 text-gray-600">({avgRating} / 5)</span>
        </div>

        <p className="mt-4 text-gray-700">{product.description}</p>

        {/* Product highlights */}
        <ul className="mt-3 list-disc pl-5 text-gray-700">
          <li>100% Original product</li>
          <li>Cash on delivery available</li>
          <li>Easy return within 7 days</li>
        </ul>

        {/* Price + Actions */}
        <div className="mt-6 flex items-center gap-4">
          <div className="text-3xl font-bold text-green-600">
            ₹{product.price}
          </div>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() =>
              addItem({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                qty: 1,
              })
            }
          >
            Add to Cart
          </button>
        </div>

        {/* Extra details */}
        <div className="mt-6 text-sm text-gray-600 space-y-2">
          <p>
            <b>Category:</b>{" "}
            <Link
              to={`/?category=${product.category}`}
              className="text-blue-600 hover:underline"
            >
              {product.category}
            </Link>
          </p>
          <p>
            <b>Availability:</b> ✅ In Stock
          </p>
          <p>
            <b>Delivery:</b> Free delivery in 3–5 days
          </p>
        </div>
      </div>

      {/* Reviews */}
      <div className="md:col-span-2 mt-10">
        <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
        <div className="space-y-4">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="border rounded-lg p-4 bg-gray-50 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center font-bold text-sm">
                    {r.name[0]}
                  </div>
                  <span className="font-semibold">{r.name}</span>
                  <span className="text-xs text-gray-500">({r.date})</span>
                </div>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < r.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mt-2">{r.comment}</p>
            </div>
          ))}
        </div>

        {/* Add review */}
        <form onSubmit={handleReviewSubmit} className="mt-6 space-y-3">
          <h4 className="font-semibold">Write a Review</h4>
          <input
            type="text"
            placeholder="Your Name"
            value={newReview.name}
            onChange={(e) =>
              setNewReview({ ...newReview, name: e.target.value })
            }
            className="w-full border px-3 py-2 rounded"
            required
          />
          <select
            value={newReview.rating}
            onChange={(e) =>
              setNewReview({ ...newReview, rating: Number(e.target.value) })
            }
            className="w-full border px-3 py-2 rounded"
          >
            {[5, 4, 3, 2, 1].map((val) => (
              <option key={val} value={val}>
                {val} Star{val > 1 ? "s" : ""}
              </option>
            ))}
          </select>
          <textarea
            placeholder="Your Review"
            value={newReview.comment}
            onChange={(e) =>
              setNewReview({ ...newReview, comment: e.target.value })
            }
            className="w-full border px-3 py-2 rounded"
            rows="3"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}
