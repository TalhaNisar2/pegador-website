"use client";

import { useState } from "react";
import { ProductCard } from "@/app/Components/ProductCard";

// Example products (replace with real data from backend or context)
const mockWishlistProducts = [
  {
    id: "1",
    name: "Signar Rib Polo Longsleeve Vintage Grey Black",
    price: "$71.68",
    images: ["/navbar/lookbooks1.webp", "/navbar/men_essentials.webp"],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    isWishlisted: true,
  },
  {
    id: "2",
    name: "Oversized Hoodie Black",
    price: "$89.90",
    images: ["/navbar/men_essentials.webp"],
    sizes: ["M", "L", "XL"],
    isNew: false,
    isWishlisted: true,
  },
];

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(mockWishlistProducts);

  const handleWishlistToggle = (id: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddToCart = (id: string, size: string) => {
    alert(`Added product ${id} in size ${size} to cart ✅`);
  };

  return (
    <div className="px-6 md:px-16 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Your Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-600 mb-4">Your wishlist is empty 💔</p>
          <a
            href="/products"
            className="bg-black text-white px-6 py-2 uppercase font-semibold hover:bg-gray-900 transition cursor-pointer"
          >
            Shop Now
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onWishlistToggle={handleWishlistToggle}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}

