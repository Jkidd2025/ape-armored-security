
import React from 'react';
import { Button } from "@/components/ui/button";
import BlogPostCard from "./BlogPostCard";
import { BlogPost } from "@/types/blog";

interface BlogPostGridProps {
  filteredPosts: BlogPost[];
  searchQuery: string;
  selectedCategory: string;
  onClearSearch: () => void;
  onResetCategory: () => void;
}

const BlogPostGrid = ({ 
  filteredPosts, 
  searchQuery, 
  selectedCategory, 
  onClearSearch, 
  onResetCategory 
}: BlogPostGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <p className="text-muted-foreground">No articles found matching your search or category filter.</p>
          <div className="flex gap-2 justify-center mt-4">
            {searchQuery && (
              <Button 
                variant="outline" 
                className="text-apearmor-teal border-apearmor-teal hover:bg-apearmor-teal/10"
                onClick={onClearSearch}
              >
                Clear search
              </Button>
            )}
            {selectedCategory !== "All" && (
              <Button 
                variant="outline" 
                className="text-apearmor-teal border-apearmor-teal hover:bg-apearmor-teal/10"
                onClick={onResetCategory}
              >
                Reset category
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPostGrid;
