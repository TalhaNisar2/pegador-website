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
    <main className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8 text-gray-900">
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
        <aside className="lg:col-span-4">
          <h1 className="text-lg font-semibold uppercase tracking-wide">{product?.name}</h1>
          <div className="mt-1 text-sm text-gray-700">
            Rs.{price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
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
                    size === s
                      ? "bg-gray-900 text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-5 flex gap-2">
            <button onClick={()=>product && size && handleAddToCart(product.id, size)} className="flex-1 rounded bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90">
              Add to cart
            </button>
            <button
              className="rounded border px-3 text-sm hover:bg-gray-100"
              aria-label="Add to wishlist"
            >
              ☆
            </button>
          </div>

          {/* Highlights */}
          <ul className="mt-4 space-y-2 text-xs text-gray-600">
            <li>In stock – Limited stock</li>
            <li>Free shipping on orders over 99€</li>
            <li>Free returns for select regions</li>
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

          {/* Accordions (simplified) */}
          <div className="mt-4 divide-y border">
            {[
              { title: "Material & Care", body: "100% cotton. Machine wash cold, inside out." },
              { title: "Further information", body: "Designed in EU. Imported." },
            ].map((a, i) => (
              <details key={i} className="p-3">
                <summary className="cursor-pointer text-sm font-medium text-gray-900">{a.title}</summary>
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
