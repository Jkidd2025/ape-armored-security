
import { useState, useEffect } from 'react';
import { BlogPost } from "@/types/blog";
import { getEducationPosts } from "@/data/blog-posts/education";
import { getMarketsPosts } from "@/data/blog-posts/markets";
import { getCryptoNewsPosts } from "@/data/blog-posts/crypto-news";
import { getNFTPosts } from "@/data/blog-posts/nfts";

export const useBlogPosts = () => {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get posts from each category
    const educationPosts = Object.entries(getEducationPosts()).map(([slug, post]) => ({
      id: slug,
      title: post.title,
      excerpt: post.content.substring(0, 150).replace(/<[^>]*>/g, '') + '...',
      date: post.publishDate,
      category: post.category,
      imageUrl: post.imageUrl,
      readTime: post.readTime,
      slug: slug
    }));

    const marketsPosts = Object.entries(getMarketsPosts()).map(([slug, post]) => ({
      id: slug,
      title: post.title,
      excerpt: post.content.substring(0, 150).replace(/<[^>]*>/g, '') + '...',
      date: post.publishDate,
      category: post.category,
      imageUrl: post.imageUrl,
      readTime: post.readTime,
      slug: slug
    }));

    const cryptoNewsPosts = Object.entries(getCryptoNewsPosts()).map(([slug, post]) => ({
      id: slug,
      title: post.title,
      excerpt: post.content.substring(0, 150).replace(/<[^>]*>/g, '') + '...',
      date: post.publishDate,
      category: post.category,
      imageUrl: post.imageUrl,
      readTime: post.readTime,
      slug: slug
    }));
    
    const nftPosts = Object.entries(getNFTPosts()).map(([slug, post]) => ({
      id: slug,
      title: post.title,
      excerpt: post.content.substring(0, 150).replace(/<[^>]*>/g, '') + '...',
      date: post.publishDate,
      category: post.category,
      imageUrl: post.imageUrl,
      readTime: post.readTime,
      slug: slug
    }));

    // Combine all posts and sort by date (most recent first)
    const posts = [...educationPosts, ...marketsPosts, ...cryptoNewsPosts, ...nftPosts]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    setAllPosts(posts);
    setFilteredPosts(posts);
    setIsLoading(false);
  }, []);

  // Filter posts when search query or category changes
  useEffect(() => {
    let result = [...allPosts];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query)
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(post => post.category === selectedCategory);
    }
    
    setFilteredPosts(result);
  }, [searchQuery, selectedCategory, allPosts]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  const resetCategory = () => {
    setSelectedCategory('All');
  };

  return {
    posts: filteredPosts,
    isLoading,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    onClearSearch: clearSearch,
    onResetCategory: resetCategory,
  };
};
