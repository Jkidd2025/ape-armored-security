
import { useState, useEffect } from 'react';
import { BlogPost } from "@/types/blog";
import { getEducationPosts } from "@/data/blog-posts/education";
import { getMarketsPosts } from "@/data/blog-posts/markets";
import { getCryptoNewsPosts } from "@/data/blog-posts/crypto-news";
import { getNFTPosts } from "@/data/blog-posts/nfts";

export const useBlogPosts = () => {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);

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
  }, []);

  return allPosts;
};
