
import React, { useState } from "react";
import { CryptoNewsItem } from "@/utils/cryptoNewsApi";
import { FALLBACK_IMAGES } from "@/utils/news/utils";

interface BlogPostContentProps {
  content: string;
  isLoading: boolean;
}

const BlogPostContent = ({ content, isLoading }: BlogPostContentProps) => {
  const [imageFallbackIndex, setImageFallbackIndex] = useState(0);
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="h-8 w-8 border-4 border-t-apearmor-teal border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-muted-foreground">Fetching the latest crypto news...</p>
      </div>
    );
  }

  // Process content to add error handling for images
  const processedContent = content.replace(
    /<img[^>]*src=["']([^"']+)["'][^>]*>/g, 
    (match, src) => {
      return `<img src="${src}" onerror="this.onerror=null; this.src='${FALLBACK_IMAGES[0]}'; this.classList.add('fallback-image')" class="w-full h-auto rounded-lg" alt="Blog post image" />`;
    }
  );

  return (
    <div className="prose prose-invert max-w-none prose-headings:text-foreground prose-headings:font-bold prose-p:text-foreground/90 prose-strong:text-foreground prose-strong:font-semibold">
      <div 
        dangerouslySetInnerHTML={{ __html: processedContent }} 
      />
    </div>
  );
};

export default BlogPostContent;
