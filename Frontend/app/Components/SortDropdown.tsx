"use client";
import { Button } from "@/app/Components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/Components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export type SortOption = {
  value: string;
  label: string;
};

interface SortDropdownProps {
  options: SortOption[];
  selectedSort: string;
  onSortChange: (value: string) => void;
}

export const SortDropdown = ({
  options,
  selectedSort,
  onSortChange,
}: SortDropdownProps) => {
  const selectedOption = options.find(option => option.value === selectedSort);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 border-gray-400 bg-gray-100 hover:bg-gray-800 hover:text-white text-gray-900 min-w-[200px] justify-between transition-colors"
        >
          <span className="text-sm">
            {selectedOption?.label || "Sort by"}
          </span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[200px] bg-gray-100 border border-gray-400 shadow-md">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onSortChange(option.value)}
            className={`text-sm cursor-pointer px-3 py-2 transition-colors ${
              option.value === selectedSort 
                ? "bg-gray-800 text-white font-medium" 
                : "text-gray-900 hover:bg-gray-800 hover:text-white"
            }`}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
