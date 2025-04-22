
import React, { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogHeader from "@/components/blog/BlogHeader";
import CategoryFilter from "@/components/blog/CategoryFilter";
import SearchBar from "@/components/blog/SearchBar";
import BlogPostGrid from "@/components/blog/BlogPostGrid";
// Remove LoadMoreButton import
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { BlogPost } from "@/types/blog";

const ApeWire = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  
  const allPosts = useBlogPosts();
  
  useEffect(() => {
    const filtered = allPosts.filter(post => {
      const matchesSearch = searchQuery.trim() === "" || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredPosts(filtered);
  }, [searchQuery, selectedCategory, allPosts]);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleResetCategory = () => {
    setSelectedCategory("All");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <section className="container px-4 md:px-6 py-12">
          <BlogHeader />
          
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
          
          <SearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onClearSearch={handleClearSearch}
            setIsSearchFocused={setIsSearchFocused}
          />
          
          <BlogPostGrid 
            filteredPosts={filteredPosts}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            onClearSearch={handleClearSearch}
            onResetCategory={handleResetCategory}
          />
          
          {/* Remove LoadMoreButton */}
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ApeWire;
