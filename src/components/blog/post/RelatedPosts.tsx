
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface RelatedPost {
  id: string;
  title: string;
  slug: string;
}

interface RelatedPostsProps {
  relatedPosts: RelatedPost[];
}

const RelatedPosts = ({ relatedPosts }: RelatedPostsProps) => {
  return (
    <div className="mb-16">
      <h3 className="text-xl font-bold mb-6">Related Articles</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {relatedPosts && relatedPosts.length > 0 ? (
          relatedPosts.map((relatedPost) => (
            <Card key={relatedPost.id} className="bg-card/50 backdrop-blur-sm border-apearmor-darkbronze hover:border-apearmor-teal transition-all duration-300">
              <CardContent className="p-6">
                <Link 
                  to={`/ape-wire/${relatedPost.slug}`} 
                  className="text-lg font-medium hover:text-apearmor-teal transition-colors"
                >
                  {relatedPost.title}
                </Link>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground">No related articles found.</p>
        )}
      </div>
    </div>
  );
};

export default RelatedPosts;
