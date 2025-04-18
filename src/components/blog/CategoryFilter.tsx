import React from 'react';
import { Badge } from "@/components/ui/badge";
import { categories } from "@/utils/blog/constants";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const CategoryFilter = ({ selectedCategory, onCategorySelect }: CategoryFilterProps) => {
  return (
    <div className="flex justify-center items-center w-full max-w-5xl mx-auto mb-6">
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className={`px-3 py-1.5 cursor-pointer text-sm ${
              selectedCategory === category 
                ? "bg-apearmor-teal text-black" 
                : "hover:bg-muted/50"
            }`}
            onClick={() => onCategorySelect(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
