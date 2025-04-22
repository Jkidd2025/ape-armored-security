
export interface BlogPostData {
  title: string;
  publishDate: string;
  author: string;
  readTime: string;
  category: string;
  imageUrl: string;
  content: string;
  useRealTimeData?: boolean;
  useNFTData?: boolean;
  keywords?: string[]; // <-- Added for SEO
  relatedPosts: {
    id: string;
    title: string;
    slug: string;
  }[];
}
