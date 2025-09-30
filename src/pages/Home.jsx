import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [searchParams] = useSearchParams();
  const categoryFromURL = searchParams.get("category") || "all";

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(categoryFromURL);
  const [priceRange, setPriceRange] = useState([0, 4000]);
  const [sort, setSort] = useState("default");

  // Whenever URL changes → sync category filter
  useEffect(() => {
    setCategory(categoryFromURL);
  }, [categoryFromURL]);

  const categories = [
    "all",
    ...new Set(products.map((p) => p.category || "others")),
  ];

  const filteredProducts = products
    .filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "all" || (p.category || "others") === category;

      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      if (sort === "priceLow") return a.price - b.price;
      if (sort === "priceHigh") return b.price - a.price;
      if (sort === "titleAZ") return a.title.localeCompare(b.title);
      if (sort === "titleZA") return b.title.localeCompare(a.title);
      return 0;
    });

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setPriceRange([0, 4000]);
    setSort("default");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">🛍️ Explore Products</h1>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-4 mb-8 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">
            Price: ₹{priceRange[0]} - ₹{priceRange[1]}
          </label>
          <input
            type="range"
            min="0"
            max="4000"
            step="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            className="w-full accent-blue-600"
          />
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-500"
        >
          <option value="default">Sort: Default</option>
          <option value="priceLow">Price: Low → High</option>
          <option value="priceHigh">Price: High → Low</option>
          <option value="titleAZ">Name: A → Z</option>
          <option value="titleZA">Name: Z → A</option>
        </select>

        <button
          onClick={clearFilters}
          className="bg-gray-100 border border-gray-300 text-gray-700 px-3 py-2 rounded hover:bg-gray-200 transition"
        >
          Reset ✨
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => <ProductCard key={p.id} product={p} />)
        ) : (
          <p className="text-gray-500 col-span-full text-center py-10">
            ❌ No products match your filters.
          </p>
        )}
      </div>
    </div>
  );
}
