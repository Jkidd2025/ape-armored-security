
import { useParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useBlogPost } from "@/hooks/useBlogPost";
import BlogPostHeader from "@/components/blog/post/BlogPostHeader";
import BlogPostContent from "@/components/blog/post/BlogPostContent";
import RelatedPosts from "@/components/blog/post/RelatedPosts";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { post, isLoading } = useBlogPost(slug || "");

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
            
            <div className="aspect-video w-full overflow-hidden rounded-lg mb-10">
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-full object-cover"
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
