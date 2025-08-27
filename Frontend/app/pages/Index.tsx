"use client";
import { useState, useMemo } from "react";
import { ProductCard } from "@/app/Components/ProductCard";
import { FilterSidebar } from "@/app/Components/FilterSidebar";
import { SortDropdown, type SortOption } from "@/app/Components/SortDropdown";
import { ProductPagination } from "@/app/Components/ProductPagination";
import { Button } from "@/app/Components/ui/button";
import { products, filterGroups, sortOptions, type Product } from "@/app/data/products";
import { useToast } from "@/app/hooks/use-toast";

const PRODUCTS_PER_PAGE = 8;

const Index = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [selectedSort, setSelectedSort] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlistedItems, setWishlistedItems] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Apply filters
    Object.entries(selectedFilters).forEach(([filterGroupId, selectedOptions]) => {
      if (selectedOptions.length > 0) {
        filtered = filtered.filter((product) => {
          switch (filterGroupId) {
            case "category":
              return selectedOptions.includes(product.category);
            case "size":
              return selectedOptions.some(size => product.size.includes(size));
            case "color":
              return selectedOptions.some(color => 
                product.color.toLowerCase().includes(color.toLowerCase())
              );
            case "material":
              return selectedOptions.some(material =>
                product.material.toLowerCase().replace(" ", "-").includes(material)
              );
            default:
              return true;
          }
        });
      }
    });

    // Apply sorting
    switch (selectedSort) {
      case "price-low-high":
        filtered.sort((a, b) => parseFloat(a.price.replace("$", "")) - parseFloat(b.price.replace("$", "")));
        break;
      case "price-high-low":
        filtered.sort((a, b) => parseFloat(b.price.replace("$", "")) - parseFloat(a.price.replace("$", "")));
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
      default: // featured
        // Keep original order
        break;
    }

    return filtered;
  }, [selectedFilters, selectedSort]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredAndSortedProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  const handleFilterChange = (groupId: string, optionId: string, checked: boolean) => {
    setSelectedFilters(prev => {
      const groupOptions = prev[groupId] || [];
      const newOptions = checked
        ? [...groupOptions, optionId]
        : groupOptions.filter(id => id !== optionId);
      
      return {
        ...prev,
        [groupId]: newOptions,
      };
    });
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleClearAllFilters = () => {
    setSelectedFilters({});
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    setCurrentPage(1); // Reset to first page when sort changes
  };

  const handleWishlistToggle = (productId: string) => {
    setWishlistedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
        toast({
          title: "Removed from wishlist",
          description: "Item has been removed from your wishlist.",
        });
      } else {
        newSet.add(productId);
        toast({
          title: "Added to wishlist",
          description: "Item has been added to your wishlist.",
        });
      }
      return newSet;
    });
  };

  const handleAddToCart = (productId: string, size: string) => {
    const product = products.find(p => p.id === productId);
    toast({
      title: "Added to cart",
      description: `${product?.name} (Size: ${size}) has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-collection-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            EVERYDAY AMBITION | MEN
          </h1>
          <p className="text-muted-foreground">
            {filteredAndSortedProducts.length} Product{filteredAndSortedProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div 
            className={`flex-shrink-0 transition-all duration-300 ease-in-out ${
              isFilterOpen ? 'w-64 mr-8' : 'w-0 mr-0'
            } overflow-hidden`}
          >
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
            <div className="flex justify-between items-center mb-6">
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                </svg>
                Filter
              </Button>
              
              <SortDropdown
                options={sortOptions}
                selectedSort={selectedSort}
                onSortChange={handleSortChange}
              />
            </div>

            {/* Products Grid */}
            <div className={`grid gap-4 md:gap-6 mb-8 transition-all duration-300 ${
              isFilterOpen ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5'
            }`}>
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
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">
                  No products found matching your criteria.
                </p>
                <button
                  onClick={handleClearAllFilters}
                  className="text-primary hover:underline"
                >
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
};

export default Index;
