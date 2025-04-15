
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { categories } from "@/data/blogPosts";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const CategoryFilter = ({ selectedCategory, onCategorySelect }: CategoryFilterProps) => {
  return (
    <div className="w-full max-w-3xl flex flex-wrap justify-center gap-3 mb-6">
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
  );
};

export default CategoryFilter;
