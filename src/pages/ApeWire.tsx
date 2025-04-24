
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogPostGrid from "@/components/blog/BlogPostGrid";
import SearchBar from "@/components/blog/SearchBar";
import CategoryFilter from "@/components/blog/CategoryFilter";
import { useBlogPosts } from "@/hooks/useBlogPosts";

const ApeWire = () => {
  const { posts, isLoading, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useBlogPosts();

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
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <CategoryFilter 
              selectedCategory={selectedCategory} 
              setSelectedCategory={setSelectedCategory} 
            />
          </div>
          
          <BlogPostGrid 
            posts={posts}
            isLoading={isLoading}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApeWire;
