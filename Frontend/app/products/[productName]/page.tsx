"use client";

import { ProductCard } from "@/app/Components/ProductCard";
import { products } from "@/app/data/products";
import { useToast } from "@/app/hooks/use-toast";
import { addToCart, CartItem } from "@/app/store/cart/cartSlice";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const sizes = ["XS", "S", "M", "L", "XL"] as const;

export default function ProductPage({ params }: { params: Promise<{ productName: string }> }) {
  const dispatch=useDispatch();
  const { productName } = React.use(params);
  const product = products.find((p) => p.name === productName.replaceAll("-", " "));
    const [wishlistedItems, setWishlistedItems] = useState<Set<string>>(new Set());
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState<string | null>("M");
  const price = 16905.56;
    const { toast } = useToast();
  const handleAddToCart = (productId: string, size: string) => {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const cartItem: CartItem = {
    id: product.id,
    name: product.name,
    price: Number(product.price),   // make sure `products` has price
    size,
    quantity: 1,            // default to 1
    images: product.images,   // or `product.images[0]` if multiple
  };

  dispatch(addToCart(cartItem));

  toast({
    title: "Added to cart",
    description: `${product.name} (Size: ${size}) added to your cart.`,
  });
};

  const handleWishlistToggle = (productId: string) => {
    setWishlistedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
        toast({ title: "Removed from wishlist", description: "Item removed from your wishlist." });
      } else {
        newSet.add(productId);
        toast({ title: "Added to wishlist", description: "Item added to your wishlist." });
      }
      return newSet;
    });
  };
  return (
    <main className="mx-auto w-full px-4 md:px-6 lg:px-8 text-gray-900">
      {/* Breadcrumbs */}
      <nav className="py-3 text-xs text-gray-500">
        <ol className="flex flex-wrap gap-1">
          <li><Link href="/" className="hover:underline">Home</Link></li>
          <li>/</li>
          <li><Link href="/summer" className="hover:underline">Scent of Summer</Link></li>
          <li>/</li>
          <li className="font-medium text-gray-900">{product?.name}</li>
        </ol>
      </nav>

      <section className="grid gap-6 lg:grid-cols-12">
        {/* Gallery */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
            {product?.images.map((img, idx) => (
              <button
                key={idx}
                className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100"
                onClick={() => setActiveImage(idx)}
              >
                <Image src={img} alt="Product Image" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

       {/* Purchase panel */}
<aside className="lg:col-span-4 space-y-6">
  <h1 className="text-lg font-semibold uppercase tracking-wide">{product?.name}</h1>
  <div className="mt-1 text-sm text-gray-700">
    Rs.{price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
  </div>

 {/* Horizontal Images Card */}
<div className="mt-6">
  <h2 className="text-sm font-medium text-gray-900 mb-2">More Images</h2>
  <div className="flex gap-2 overflow-x-auto scrollbar-hide">
    {product?.images.map((img, idx) => (
      <div key={idx} className="relative w-24 h-32 flex-shrink-0 rounded border overflow-hidden">
        <Image src={img} alt={`Product image ${idx + 1}`} fill className="object-cover" />
      </div>
    ))}
  </div>
</div>


  {/* Sizes */}
  <div className="mt-5">
    <div className="mb-2 text-xs font-medium uppercase text-gray-600">Size</div>
    <div className="grid grid-cols-6 gap-2 sm:grid-cols-8">
      {sizes.map((s) => (
        <button
          key={s}
          onClick={() => setSize(s)}
          className={`h-9 rounded border text-xs ${
            size === s ? "bg-gray-900 text-white" : "hover:bg-gray-100 text-gray-700"
          }`}
        >
          {s}
        </button>
      ))}
    </div>
  </div>

  {/* Actions */}
  <div className="mt-5 flex gap-2">
    <button
      onClick={() => product && size && handleAddToCart(product.id, size)}
      className="flex-1 rounded bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90"
    >
      Add to cart
    </button>
    <button className="rounded border px-3 text-sm hover:bg-gray-100" aria-label="Add to wishlist">
      ☆
    </button>
  </div>

{/* Highlights */}
<ul className="mt-4 space-y-2 text-xs text-gray-600">
  <li className="flex items-center gap-2 text-red-400">
    {/* Clock Icon */}
    <svg
      className="w-4 h-4"
      strokeWidth="1"
      aria-hidden="true"
      focusable="false"
      role="presentation"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="8" cy="8" r="6.7097588" fill="none" />
      <polyline
        points="12 6 12 12 16 14"
        transform="matrix(0.67097581,0,0,0.67097581,-0.01963672,-0.01963672)"
      />
    </svg>
    4 in stock – Limited stock
  </li>

  <li className="flex items-center gap-2">
    {/* Award Icon */}
    <svg
      className="w-4 h-4"
      strokeWidth="1"
      aria-hidden="true"
      focusable="false"
      role="presentation"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="8.108" cy="5.666" r="4.374" fill="none" />
      <polyline
        points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"
        transform="matrix(0.624895,0,0,0.624895,0.60942571,0.66666362)"
      />
    </svg>
    Free shipping on orders over 99€
  </li>

  <li className="flex items-center gap-2">
    {/* Box Icon */}
    <svg
      className="w-4 h-4"
      strokeWidth="1"
      aria-hidden="true"
      focusable="false"
      role="presentation"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path d="M14.41 3.37L8.27 1.41a1 1 0 00-.61 0L1.52 3.37a1 1 0 00-.7.95v7.86c0 .41.25.78.63.93l6.14 2.46c.24.1.5.1.75 0l6.14-2.46a1 1 0 00.62-.93V4.32a1 1 0 00-.69-.95zM7.96 2.36l6.05 1.93-2.7.9L5.35 3.2l2.63-.84zm-.46 12.1l-5.68-2.28V5.3L7.5 7.2v7.26zM8 6.3L1.96 4.28l2.58-.82 5.99 2L8 6.3zm6.1 5.89l-5.6 2.24V7.19l5.6-1.87v6.87z" />
    </svg>
    Free returns for select regions
  </li>
</ul>


  {/* Description */}
  <div className="mt-6 border-t pt-4">
    <h2 className="text-sm font-semibold text-gray-900">Description</h2>
    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
      <li>Relaxed fit</li>
      <li>100% cotton</li>
      <li>Large discharge print on the back</li>
      <li>Logo print on chest</li>
      <li>270 GSM</li>
    </ul>
  </div>

{/* Accordions */}
<div className="mt-4 border-t border-b divide-y divide-gray-200">
  {[
    {
      title: "Material & Care",
      body: "100% cotton. Machine wash cold, inside out.",
      icon: (
        <svg
          className="w-4 h-4 mr-2 flex-shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16v16H4V4z" />
        </svg>
      ),
    },
    {
      title: "Further information",
      body: "Designed in EU. Imported.",
      icon: (
        <svg
          className="w-4 h-4 mr-2 flex-shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
    },
  ].map((a, i) => (
    <details key={i} className="p-3 group">
      <summary className="cursor-pointer text-sm font-medium text-gray-900 flex items-center justify-between">
        <div className="flex items-center">
          {a.icon}
          {a.title}
        </div>
        <span className="transition-transform group-open:rotate-45 text-gray-500 font-bold">+</span>
      </summary>
      <p className="mt-2 text-sm text-gray-600">{a.body}</p>
    </details>
  ))}
</div>


</aside>




      </section>

      {/* Cross-sell sections */}
      <section className="mt-16 space-y-10">
        <div>
          <h3 className="mb-4 text-center text-xs uppercase tracking-wider text-gray-600">
            Style it with
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.slice(0,4).map((product, i) => (
              <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            images={product.images}
                            sizes={product.size}
                            isNew={product.isNew}
                            isWishlisted={wishlistedItems.has(product.id)}
                            onWishlistToggle={handleWishlistToggle}
                            onAddToCart={handleAddToCart}
                          />
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-center text-xs uppercase tracking-wider text-gray-600">
            You might also like
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.slice(0,4).map((product, i) => (
              <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            images={product.images}
                            sizes={product.size}
                            isNew={product.isNew}
                            isWishlisted={wishlistedItems.has(product.id)}
                            onWishlistToggle={handleWishlistToggle}
                            onAddToCart={handleAddToCart}
                          />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
