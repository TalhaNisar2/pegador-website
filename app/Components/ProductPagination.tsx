import { Button } from "@/app/Components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const ProductPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: ProductPaginationProps) => {
  const getVisiblePages = () => {
    const delta = 2;
    const pages: (number | string)[] = [];
    pages.push(1);

    if (currentPage > delta + 2) pages.push("...");
    
    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - delta - 1) pages.push("...");

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {/* Previous Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="border-black text-black hover:bg-black hover:text-white disabled:opacity-50"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {/* Page Numbers */}
      {getVisiblePages().map((page, index) => (
        <div key={index}>
          {page === "..." ? (
            <span className="px-3 py-2 text-gray-500 select-none">...</span>
          ) : (
            <Button
              variant={currentPage === page ? "default" : "outline"}
              size="icon"
              onClick={() => onPageChange(page as number)}
              className={`w-10 h-10 flex items-center justify-center ${
                currentPage === page
                  ? "bg-black text-white font-semibold"
                  : "border-black text-black hover:bg-black hover:text-white"
              }`}
            >
              {page}
            </Button>
          )}
        </div>
      ))}

      {/* Next Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="border-black text-black hover:bg-black hover:text-white disabled:opacity-50"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};
