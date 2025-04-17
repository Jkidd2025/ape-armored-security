
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogPostHeaderProps {
  title: string;
  publishDate: string;
  readTime: string;
  category: string;
  author: string;
}

const BlogPostHeader = ({ title, publishDate, readTime, category, author }: BlogPostHeaderProps) => {
  return (
    <div className="max-w-3xl">
      <Link to="/ape-wire" className="inline-flex items-center text-apearmor-teal hover:text-apearmor-teal/80 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Ape Wire
      </Link>
      
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
      
      <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-4 mb-6">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{publishDate}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2" />
          <span>{readTime} read</span>
        </div>
        <div className="flex items-center">
          <Tag className="h-4 w-4 mr-2" />
          <span>{category}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mr-3">
            <img 
              src="/lovable-uploads/e90abdba-dcb2-49b7-b896-f8d7a491bc5c.png" 
              alt="ApeArmor Logo" 
              className="h-8 w-8" 
            />
          </div>
          <span className="font-medium">{author}</span>
        </div>
        
        <Button variant="outline" size="sm" className="border-apearmor-darkbronze">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  );
};

export default BlogPostHeader;
