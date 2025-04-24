
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogPostGrid from "@/components/blog/BlogPostGrid";
import SearchBar from "@/components/blog/SearchBar";
import CategoryFilter from "@/components/blog/CategoryFilter";
import { useBlogPosts } from "@/hooks/useBlogPosts";

// Add type declaration for window.gtag
declare global {
  interface Window {
    gtag: (command: string, action: string, params: object) => void;
  }
}

const ApeWire = () => {
  const { 
    posts, 
    isLoading, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory,
    onClearSearch,
    onResetCategory
  } = useBlogPosts();

  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    // Add Google Tag conversion tracking for ApeWire page
    if (window.gtag) {
      window.gtag('event', 'conversion', {'send_to': 'AW-16970844283/dMRwCOfxm7waEPuQqpw_'});
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16 pb-24">
        <BlogHeader />
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
            <SearchBar 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery}
              onClearSearch={onClearSearch}
              setIsSearchFocused={setIsSearchFocused}
            />
            <CategoryFilter 
              selectedCategory={selectedCategory} 
              onCategorySelect={setSelectedCategory} 
            />
          </div>
          
          <BlogPostGrid 
            filteredPosts={posts}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            onClearSearch={onClearSearch}
            onResetCategory={onResetCategory}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApeWire;
