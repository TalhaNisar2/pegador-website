"use client";

import { useState } from "react";
import { X, Minus, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Product, products } from "../data/products";
import { ProductCard } from "./ProductCard";
import { useToast } from "@/app/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { StaticImageData } from "next/image";
import { CartItem, updateQuantity } from "../store/cart/cartSlice";
interface ShoppingCartSidebarProps {
  isCartOpen: boolean;
  onClose: () => void;
}

export function ShoppingCartSidebar({
  isCartOpen,
  onClose,
}: ShoppingCartSidebarProps) {
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const [wishlistedItems, setWishlistedItems] = useState<Set<string>>(
    new Set()
  );
  const { toast } = useToast();

  const [recommendedProducts] = useState<Product[]>(products);
  const getImageSrc = (img: string | StaticImageData) =>
    typeof img === "string" ? img : img.src;

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleWishlistToggle = (productId: string) => {
    setWishlistedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
        toast({
          title: "Removed from wishlist",
          description: "Item removed from your wishlist.",
        });
      } else {
        newSet.add(productId);
        toast({
          title: "Added to wishlist",
          description: "Item added to your wishlist.",
        });
      }
      return newSet;
    });
  };

  const handleAddToCart = (productId: string, size: string) => {
    const product = products.find((p) => p.id === productId);
    toast({
      title: "Added to cart",
      description: `${product?.name} (Size: ${size}) added to your cart.`,
    });
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
          <h2 className="text-lg font-bold text-gray-900">
            YOUR SHOPPING CART ({items.length})
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 text-gray-800"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 border-b border-gray-200 pb-4"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={getImageSrc(item.images[0]) || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-700 mb-2">
                    Size: {item.size}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: item.quantity - 1,
                          })
                        )
                      }
                    >
                      <Minus className="h-3 w-3" />
                    </Button>

                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: Number.parseInt(e.target.value) || 1,
                          })
                        )
                      }
                      className="w-16 h-8 text-center text-gray-900 font-semibold"
                      min="1"
                    />

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: item.quantity + 1,
                          })
                        )
                      }
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-gray-900">
                    Rs.
                    {(item.price * item.quantity).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Recommendations Section */}
          <div className="border-t border-gray-300 bg-gray-50 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">
                You might also like
              </h3>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-800"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-800"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2">
              {recommendedProducts.map((product) => (
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
        </div>

        {/* Footer */}
        <div className="border-t border-gray-300 p-4 space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-800">SUBTOTAL:</span>
            <span className="font-bold text-lg text-gray-900">
              Rs.
              {subtotal.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>

          <Button className="w-full bg-gray-900 hover:bg-black text-white py-3 font-semibold">
            CHECKOUT
          </Button>
        </div>
      </div>
    </>
  );
}
