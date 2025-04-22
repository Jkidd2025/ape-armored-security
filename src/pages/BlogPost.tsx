
import { useParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useBlogPost } from "@/hooks/useBlogPost";
import BlogPostHeader from "@/components/blog/post/BlogPostHeader";
import BlogPostContent from "@/components/blog/post/BlogPostContent";
import RelatedPosts from "@/components/blog/post/RelatedPosts";
import { useEffect } from "react";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { post, isLoading } = useBlogPost(slug || "");

  // Set dynamic meta tags for SEO
  useEffect(() => {
    // Update page title
    document.title = `${post.title} | ApeArmor Blog`;
    
    // Remove any existing meta tags we're about to replace
    document.querySelectorAll('meta[data-dynamic="true"]').forEach(el => el.remove());
    
    // Create and add meta description
    const metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute('content', post.content.substring(0, 160).replace(/<[^>]*>/g, ''));
    metaDescription.setAttribute('data-dynamic', 'true');
    document.head.appendChild(metaDescription);
    
    // Create and add keywords if available
    if (post.keywords && post.keywords.length > 0) {
      const metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      metaKeywords.setAttribute('content', post.keywords.join(', '));
      metaKeywords.setAttribute('data-dynamic', 'true');
      document.head.appendChild(metaKeywords);
    }
    
    // Create and add OpenGraph tags
    const metaTags = [
      { property: 'og:title', content: post.title },
      { property: 'og:description', content: post.content.substring(0, 160).replace(/<[^>]*>/g, '') },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: window.location.href },
      { property: 'og:image', content: post.imageUrl.startsWith('http') ? post.imageUrl : window.location.origin + post.imageUrl },
      { property: 'article:published_time', content: post.publishDate },
      { property: 'article:author', content: post.author },
      { property: 'article:section', content: post.category },
      
      // Twitter Card tags
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:title', content: post.title },
      { property: 'twitter:description', content: post.content.substring(0, 160).replace(/<[^>]*>/g, '') },
      { property: 'twitter:image', content: post.imageUrl.startsWith('http') ? post.imageUrl : window.location.origin + post.imageUrl },
    ];
    
    metaTags.forEach(tag => {
      const metaTag = document.createElement('meta');
      metaTag.setAttribute('property', tag.property);
      metaTag.setAttribute('content', tag.content);
      metaTag.setAttribute('data-dynamic', 'true');
      document.head.appendChild(metaTag);
    });
    
    // Clean up function to remove tags when component unmounts
    return () => {
      document.querySelectorAll('meta[data-dynamic="true"]').forEach(el => el.remove());
      document.title = 'ApeArmor | Web3 Security';
    };
  }, [post]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <article className="container px-4 md:px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <BlogPostHeader 
              title={post.title}
              publishDate={post.publishDate}
              readTime={post.readTime}
              category={post.category}
              author={post.author}
            />

            {/* Show SEO Keywords if present */}
            {post.keywords && post.keywords.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                <div className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                  <span className="uppercase tracking-wide font-bold text-primary">
                    SEO Keywords:
                  </span>
                  {post.keywords.map(k => (
                    <span key={k} className="bg-muted px-2 py-0.5 rounded text-xs text-foreground border border-primary/10">
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="w-full mb-10 bg-muted/20 rounded-lg overflow-hidden">
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-auto max-h-[500px] object-contain mx-auto"
              />
            </div>
            
            <BlogPostContent 
              content={post.content}
              isLoading={isLoading}
            />
            
            <Separator className="my-12" />
            
            {post.relatedPosts && post.relatedPosts.length > 0 && (
              <RelatedPosts relatedPosts={post.relatedPosts} />
            )}
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
