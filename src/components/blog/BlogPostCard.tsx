
import React from 'react';
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, ArrowRight } from "lucide-react";
import { BlogPost } from "@/types/blog";

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard = ({ post }: BlogPostCardProps) => {
  return (
    <Card key={post.id} className="bg-card/50 backdrop-blur-sm border-apearmor-darkbronze hover:border-apearmor-teal transition-all duration-300 overflow-hidden">
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <Badge className="bg-apearmor-teal/10 text-apearmor-teal border-none hover:bg-apearmor-teal/20">
            {post.category}
          </Badge>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            {post.readTime}
          </div>
        </div>
        <CardTitle className="text-xl hover:text-apearmor-teal transition-colors">
          <Link to={`/ape-wire/${post.slug}`}>{post.title}</Link>
        </CardTitle>
        <CardDescription className="text-muted-foreground">{post.date}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{post.excerpt}</p>
      </CardContent>
      <CardFooter>
        <Link to={`/ape-wire/${post.slug}`} className="text-apearmor-teal hover:text-apearmor-teal/80 flex items-center group">
          <span className="mr-2">Read more</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogPostCard;
