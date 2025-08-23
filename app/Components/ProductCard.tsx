"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Heart, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/app/Components/ui/button";

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  images: (string | StaticImageData)[];
  sizes: string[];
  isNew?: boolean;
  isWishlisted?: boolean;
  onWishlistToggle?: (id: string) => void;
  onAddToCart?: (id: string, size: string) => void;
}

export const ProductCard = ({
  id,
  name,
  price,
  images,
  sizes,
  isNew = false,
  isWishlisted = false,
  onWishlistToggle,
  onAddToCart,
}: ProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showSizes, setShowSizes] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleSizeClick = (size: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart?.(id, size);
    setShowSizes(false);
  };

  const getImageSrc = (img: string | StaticImageData) =>
    typeof img === "string" ? img : img.src;

  const displayImageIndex = isHovered && images.length > 1
    ? (currentImageIndex + 1) % images.length
    : currentImageIndex;

  return (
   <div
  className="group relative rounded-lg overflow-hidden transition-all duration-300 cursor-pointer"
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => {
    setIsHovered(false);
    setShowSizes(false);
  }}
>
  {/* Product Image */}
  <div className="relative aspect-[3/4] overflow-hidden">
    <Image
      src={getImageSrc(images[displayImageIndex])}
      alt={name}
      fill
      className="object-cover transition-all duration-500 group-hover:scale-105"
    />

    {/* Image Navigation */}
    {images.length > 1 && (
      <>
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-transparent hover:bg-gray-200/40 opacity-0 group-hover:opacity-100 transition-all duration-200"
          onClick={prevImage}
        >
          <ChevronLeft className="w-3 h-3 text-gray-800" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-transparent hover:bg-gray-200/40 opacity-0 group-hover:opacity-100 transition-all duration-200"
          onClick={nextImage}
        >
          <ChevronRight className="w-3 h-3 text-gray-800" />
        </Button>
      </>
    )}

    {/* New Badge */}
    {isNew && (
      <div className="absolute top-3 left-3 bg-black text-white text-xs font-semibold px-3 py-1 min-w-[24px] h-6 flex items-center justify-center">
        NEW
      </div>
    )}

    {/* Wishlist Button */}
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-3 right-3 w-8 h-8 bg-transparent hover:bg-gray-200/40 transition-all duration-200"
      onClick={() => onWishlistToggle?.(id)}
    >
      <Heart
        className={`w-4 h-4 transition-colors ${
          isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
        }`}
      />
    </Button>

    {/* Size Selector */}
    {showSizes && (
      <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-3 flex flex-wrap gap-2 justify-center border-t border-gray-200">
        {sizes.map((size) => (
          <Button
            key={size}
            variant="outline"
            size="sm"
            className="h-8 px-3 text-xs text-gray-700 border-gray-400 hover:bg-gray-700 hover:text-white"
            onClick={(e) => handleSizeClick(size, e)}
          >
            {size}
          </Button>
        ))}
      </div>
    )}

    {/* Add to Cart Button */}
    <Button
      variant="ghost"
      size="icon"
      className="absolute bottom-3 right-3 w-8 h-8 bg-transparent hover:bg-gray-200/40 transition-all duration-200 opacity-0 group-hover:opacity-100"
      onClick={() => setShowSizes(!showSizes)}
    >
      <ShoppingBag className="w-4 h-4 text-gray-700" />
    </Button>
  </div>

  {/* Product Info */}
  <div className="p-4">
    <h3 className="text-sm font-medium text-gray-800 leading-tight line-clamp-2">
      {name}
    </h3>
    <p className="text-sm font-semibold text-gray-700">{price}</p>
  </div>
</div>

  );
};
