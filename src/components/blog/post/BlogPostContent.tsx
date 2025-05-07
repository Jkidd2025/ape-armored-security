
import { CryptoNewsItem } from "@/utils/cryptoNewsApi";
import { FALLBACK_IMAGES } from "@/utils/news/utils";

interface BlogPostContentProps {
  content: string;
  isLoading: boolean;
}

const BlogPostContent = ({ content, isLoading }: BlogPostContentProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="h-8 w-8 border-4 border-t-apearmor-teal border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-muted-foreground">Fetching the latest crypto news...</p>
      </div>
    );
  }

  return (
    <div className="prose prose-invert max-w-none prose-headings:text-foreground prose-headings:font-bold prose-p:text-foreground/90 prose-strong:text-foreground prose-strong:font-semibold">
      <div 
        dangerouslySetInnerHTML={{ __html: content }} 
      />
    </div>
  );
};

export default BlogPostContent;
