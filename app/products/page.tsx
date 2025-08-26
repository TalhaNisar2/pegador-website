"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "@/app/Components/ProductCard";
import { FilterSidebar } from "@/app/Components/FilterSidebar";
import { SortDropdown } from "@/app/Components/SortDropdown";
import { ProductPagination } from "@/app/Components/ProductPagination";
import { Button } from "@/app/Components/ui/button";
import { products, filterGroups, sortOptions } from "@/app/data/products";
import { useToast } from "@/app/hooks/use-toast";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cart/cartSlice";

const PRODUCTS_PER_PAGE = 8;

export default function ProductsPage() {
  const dispatch=useDispatch();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [selectedSort, setSelectedSort] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlistedItems, setWishlistedItems] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Apply filters
    Object.entries(selectedFilters).forEach(([groupId, options]) => {
      if (options.length > 0) {
        filtered = filtered.filter((p) => {
          switch (groupId) {
            case "category":
              return options.includes(p.category);
            case "size":
              return options.some((s) => p.size.includes(s));
            case "color":
              return options.some((c) => p.color.toLowerCase().includes(c.toLowerCase()));
            case "material":
              return options.some((m) => p.material.toLowerCase().replace(" ", "-").includes(m));
            default:
              return true;
          }
        });
      }
    });

    // Apply sorting
    switch (selectedSort) {
      case "price-low-high":
        filtered.sort((a, b) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1)));
        break;
      case "price-high-low":
        filtered.sort((a, b) => parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1)));
        break;
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "name-a-z":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-z-a":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return filtered;
  }, [selectedFilters, selectedSort]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredAndSortedProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  const handleFilterChange = (groupId: string, optionId: string, checked: boolean) => {
    setSelectedFilters((prev) => {
      const groupOptions = prev[groupId] || [];
      const newOptions = checked
        ? [...groupOptions, optionId]
        : groupOptions.filter((id) => id !== optionId);
      return { ...prev, [groupId]: newOptions };
    });
    setCurrentPage(1);
  };

  const handleClearAllFilters = () => {
    setSelectedFilters({});
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    setCurrentPage(1);
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

  const handleAddToCart = (productId: string, size: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

  dispatch(
    addToCart({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price.replace("Rs.", "").trim()), // ensure number
      images: product.images,
      size,
      quantity: 1,
    })
  );
    toast({
      title: "Added to cart",
      description: `${product?.name} (Size: ${size}) added to your cart.`,
    });
  };

  return (
  <div className="min-h-screen bg-gray-50">
  <div className="w-full max-w-full mx-auto py-8 px-2 md:px-6 lg:px-8">
    {/* Header */}
    <div className="text-center mb-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
        EVERYDAY AMBITION | MEN
      </h1>
      <p className="text-gray-500">
        {filteredAndSortedProducts.length} Product{filteredAndSortedProducts.length !== 1 ? "s" : ""}
      </p>
    </div>

    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <div className={`flex-shrink-0 transition-all duration-300 ease-in-out ${isFilterOpen ? "w-64" : "w-0"} overflow-hidden`}>
        <FilterSidebar
          isOpen={isFilterOpen}
          onToggle={() => setIsFilterOpen(!isFilterOpen)}
          filters={filterGroups}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          onClearAll={handleClearAllFilters}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 transition-all duration-300">
        {/* Sort Controls */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
          >
            Filter
          </Button>

          <SortDropdown options={sortOptions} selectedSort={selectedSort} onSortChange={handleSortChange} />
        </div>

        {/* Products Grid */}
        <div className={`grid gap-4 md:gap-6 transition-all duration-300 ${isFilterOpen ? "grid-cols-2 md:grid-cols-3" : "grid-cols-2 md:grid-cols-4 lg:grid-cols-5"}`}>
          {paginatedProducts.map((product) => (
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

        {/* No Results */}
        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-12 text-gray-600">
            <p className="text-lg mb-4">No products found matching your criteria.</p>
            <button onClick={handleClearAllFilters} className="text-gray-800 hover:underline font-medium">
              Clear all filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <ProductPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            className="mt-8"
          />
        )}
      </div>
    </div>
  </div>
</div>

  );
}
