import * as React from "react";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";
import { Search, ChevronDown, Check, Grid, X } from "lucide-react";

interface FilteredSectionProps {
  setSearchMedi: (value: string) => void;
  categories: any[];
  setSelectedCategories: (value: string) => void;
  selectedCategories: string;
}

const FilteredSection = ({
  setSearchMedi,
  categories,
  setSelectedCategories,
  selectedCategories,
}: FilteredSectionProps) => {
  // Dropdown open/close state
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearchMedi(value);
  }, 400);

  // Category selection handler
  const handleSelect = (categoryType: string) => {
    if (selectedCategories === categoryType) {
      setSelectedCategories(""); // Clear selection if clicked again
    } else {
      setSelectedCategories(categoryType);
    }
    setIsOpen(false); // Close dropdown after selection
  };

  // Close dropdown when clicking outside the component
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full max-w-md space-y-4" ref={dropdownRef}>
      
      {/* 1. Main Fancy Custom Select Trigger Button */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex h-12 w-full items-center justify-between rounded-xl border bg-white px-4 py-2 text-sm font-medium transition-all shadow-sm
            ${isOpen 
              ? "border-[#0b5e4e] ring-2 ring-[#0b5e4e]/20" 
              : "border-gray-200 hover:border-gray-300 hover:bg-gray-55"
            }`}
        >
          <div className="flex items-center gap-2.5 text-gray-700">
            <Grid className="h-4 w-4 text-[#0b5e4e]" />
            {selectedCategories ? (
              <span className="font-semibold text-gray-900 uppercase tracking-wide">
                {selectedCategories}
              </span>
            ) : (
              <span className="text-gray-400">Select Category...</span>
            )}
          </div>
          
          <div className="flex items-center gap-1.5">
            {/* Quick Clear Button (X) appears only when a category is active */}
            {selectedCategories && (
              <X
                className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
                onClick={(e) => {
                  e.stopPropagation(); // Prevents opening the menu when clicking clear
                  setSelectedCategories("");
                }}
              />
            )}
            <ChevronDown 
              className={`h-4 w-4 text-gray-400 transition-transform duration-200 
                ${isOpen ? "rotate-180 text-[#0b5e4e]" : ""}`} 
            />
          </div>
        </button>

        {/* 2. Dropdown Menu Window (shadcn Popover Style) */}
        {isOpen && (
          <div className="absolute top-[calc(100%+6px)] z-50 w-full rounded-xl border border-gray-100 bg-white p-2 shadow-xl animate-in fade-in-50 slide-in-from-top-1 duration-200">
            
            {/* Search Box integrated inside the Dropdown Panel */}
            <div className="relative flex items-center mb-2 p-1">
              <Search className="absolute left-4 text-gray-400 w-4 h-4 pointer-events-none" />
              <Input
                placeholder="Search medicines, brands..."
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-9 pr-4 py-4 w-full h-9 rounded-lg bg-gray-50 border border-gray-100 focus:border-[#0b5e4e] focus:ring-0 text-sm placeholder:text-gray-400"
              />
            </div>

            {/* Scrollable Category List Container */}
            <div className="max-h-60 overflow-y-auto space-y-1 pr-1 scrollbar-thin scrollbar-thumb-gray-200">
              {categories && categories.length > 0 ? (
                categories.map((category: any, index: any) => {
                  const isSelected = selectedCategories === category.category_type;
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSelect(category.category_type)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm text-left transition-colors cursor-pointer select-none
                        ${isSelected 
                          ? "bg-[#0b5e4e] text-white font-semibold" 
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                    >
                      <span className="uppercase tracking-wide">{category.category_type}</span>
                      {isSelected && <Check className="h-4 w-4 text-white" />}
                    </button>
                  );
                })
              ) : (
                <div className="py-6 text-center text-sm text-gray-400">
                  No categories found.
                </div>
              )}
            </div>

          </div>
        )}
      </div>

    </div>
  );
};

export default FilteredSection;
