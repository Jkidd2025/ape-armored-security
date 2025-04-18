
import { BlogPostData } from "@/types/blogTypes";
import { getStaticBlogPost } from "./staticBlogPosts";
import { getDynamicBlogPost } from "./dynamicBlogPosts";
import { getDynamicBlogPostConfig } from "./dynamicBlogConfig";

/**
 * Get the blog post data by slug, combining static and dynamic content configurations
 */
export const getBlogPost = (slug: string): BlogPostData => {
  const staticPost = getStaticBlogPost(slug);
  const dynamicPost = getDynamicBlogPost(slug);
  
  return {
    ...staticPost,
    ...dynamicPost
  };
};

export { getStaticBlogPost } from "./staticBlogPosts";
export { getDynamicBlogPostConfig } from "./dynamicBlogConfig";
export type { BlogPostData };

