import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Heart } from "lucide-react";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { state: wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const inWishlist = wishlist.items.some((i) => i.id === product.id);

  return (
    <div className="border rounded-lg p-4 flex flex-col relative hover:shadow-md transition">
      {/* Wishlist Heart */}
      <button
        className="absolute bottom-5 right-37"
        onClick={() =>
          inWishlist ? removeFromWishlist(product.id) : addToWishlist(product)
        }
      >
        <Heart
          size={22}
          className={
            inWishlist ? "text-red-500" : "text-black-500 hover:text-red-500"
          }
          fill={inWishlist ? "currentColor" : "none"}
        />
      </button>

      {/* Clickable Area (image + text) */}
      <Link to={`/product/${product.id}`} className="flex flex-col flex-1">
        <img
          src={product.image}
          alt={product.title}
          className="h-44 w-full object-cover rounded"
        />
        <h3 className="mt-3 text-lg font-semibold">{product.title}</h3>
        <p className="mt-1 text-gray-600 text-sm flex-grow">
          {product.description}
        </p>
      </Link>

      {/* Price + Cart Button */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-lg font-bold">₹{product.price}</div>
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
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
    </div>
  );
}
