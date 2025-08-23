import { Button } from "@/app/Components/ui/button";
import { Checkbox } from "@/app/Components/ui/checkbox";
import { Label } from "@/app/Components/ui/label";
import { Separator } from "@/app/Components/ui/separator";
import { ChevronDown, Filter, X } from "lucide-react";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/Components/ui/collapsible";

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterGroup {
  id: string;
  title: string;
  options: FilterOption[];
  isOpen?: boolean;
}

interface FilterSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  filters: FilterGroup[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (groupId: string, optionId: string, checked: boolean) => void;
  onClearAll: () => void;
}

export const FilterSidebar = ({
  isOpen,
  onToggle,
  filters,
  selectedFilters,
  onFilterChange,
  onClearAll,
}: FilterSidebarProps) => {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(
    filters.reduce((acc, filter) => ({
      ...acc,
      [filter.id]: filter.isOpen ?? true,
    }), {})
  );

  const toggleGroup = (groupId: string) => {
    setOpenGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const hasActiveFilters = Object.values(selectedFilters).some(
    options => options.length > 0
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Filter Button */}
      <Button
        variant="outline"
        onClick={onToggle}
        className="flex items-center gap-2 border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-800"
      >
        <Filter className="w-4 h-4" />
        Filter
        {hasActiveFilters && (
          <span className="ml-1 w-2 h-2 bg-blue-500 rounded-full" />
        )}
      </Button>

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-80 bg-gray-50 border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:w-64 md:h-auto md:bg-transparent md:border-r-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:hidden'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 md:hidden">
          <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
          <Button variant="ghost" size="icon" onClick={onToggle}>
            <X className="w-4 h-4 text-gray-600" />
          </Button>
        </div>

        <div className="p-4 md:p-0">
          {/* Clear All */}
          {hasActiveFilters && (
            <div className="mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearAll}
                className="text-xs text-gray-500 hover:text-gray-800"
              >
                Clear all filters
              </Button>
            </div>
          )}

          {/* Filter Groups */}
          <div className="space-y-4">
            {filters.map((group, index) => (
              <div key={group.id}>
                <Collapsible
                  open={openGroups[group.id]}
                  onOpenChange={() => toggleGroup(group.id)}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between p-0 h-auto font-medium text-left text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    >
                      {group.title}
                      <ChevronDown className={`w-4 h-4 transition-transform ${openGroups[group.id] ? 'rotate-180' : ''}`} />
                    </Button>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="space-y-3 mt-3">
                    {group.options.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`${group.id}-${option.id}`}
                          checked={selectedFilters[group.id]?.includes(option.id) || false}
                          onCheckedChange={(checked) =>
                            onFilterChange(group.id, option.id, checked as boolean)
                          }
                          className="accent-gray-700"
                        />
                        <Label
                          htmlFor={`${group.id}-${option.id}`}
                          className="text-sm font-normal cursor-pointer flex-1 flex justify-between text-gray-700"
                        >
                          <span>{option.label}</span>
                          {option.count && (
                            <span className="text-gray-500">({option.count})</span>
                          )}
                        </Label>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
                
                {index < filters.length - 1 && (
                  <Separator className="mt-4 border-gray-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
