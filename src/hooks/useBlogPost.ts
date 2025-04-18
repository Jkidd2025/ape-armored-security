import { useState } from "react";
import { getBlogPost, BlogPostData } from "@/utils/blog";
import { useDynamicBlogContent } from "@/hooks/useDynamicBlogContent";

/**
 * Hook for retrieving and managing blog post data 
 */
export const useBlogPost = (slug: string) => {
  const [post, setPost] = useState(getBlogPost(slug || ""));
  
  // Use the dynamic content hook to fetch and format content if needed
  const { content, isLoading, newsItems } = useDynamicBlogContent(post);
  
  // Create the complete post object with potentially updated content
  const completePost = {
    ...post,
    content: content
  };

  return { post: completePost, isLoading, newsItems };
};

// Re-export the BlogPostData interface for components that import it from this file
export type { BlogPostData };
