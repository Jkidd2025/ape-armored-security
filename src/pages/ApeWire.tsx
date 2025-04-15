
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { ChevronRight, Search, Clock, ArrowRight } from "lucide-react";

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageUrl: string;
  readTime: string;
  slug: string;
};

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Understanding Rug Pulls: How to Identify and Avoid Them",
    excerpt: "Learn the warning signs of potential rug pulls and how ApeArmor's protection services can keep your investments safe.",
    date: "April 10, 2025",
    category: "Security",
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2232&auto=format&fit=crop",
    readTime: "5 min",
    slug: "understanding-rug-pulls"
  },
  {
    id: "2",
    title: "The Evolution of DeFi Security in 2025",
    excerpt: "Explore how DeFi security measures have evolved and what new threats crypto investors need to be aware of.",
    date: "April 5, 2025",
    category: "DeFi",
    imageUrl: "https://images.unsplash.com/photo-1639762681057-408b52a4c1e2?q=80&w=2232&auto=format&fit=crop",
    readTime: "8 min",
    slug: "defi-security-evolution"
  },
  {
    id: "3",
    title: "Smart Contract Audits: Why They Matter for Every Project",
    excerpt: "Discover the importance of thorough smart contract audits and how they form the foundation of crypto security.",
    date: "March 28, 2025",
    category: "Smart Contracts",
    imageUrl: "https://images.unsplash.com/photo-1639762681057-408b52a4c1e2?q=80&w=2232&auto=format&fit=crop",
    readTime: "6 min",
    slug: "smart-contract-audits"
  },
  {
    id: "4",
    title: "NFT Security: Protecting Your Digital Assets",
    excerpt: "Learn essential strategies to secure your NFT collection against theft and scams in the growing digital art marketplace.",
    date: "March 22, 2025",
    category: "NFTs",
    imageUrl: "https://images.unsplash.com/photo-1646154205624-23b4f248c2c2?q=80&w=2232&auto=format&fit=crop",
    readTime: "7 min",
    slug: "nft-security"
  }
];

const ApeWire = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredPosts = searchQuery.trim() === "" 
    ? blogPosts 
    : blogPosts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <section className="container px-4 md:px-6 py-12">
          <div className="flex flex-col items-center text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gradient-gold mb-4">Ape Wire</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mb-8">
              Your trusted source for crypto security news, education, and insights from the ApeArmor team
            </p>
            <Separator className="w-20 h-1 bg-apearmor-teal mb-8" />
            
            <div className="relative w-full max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="search"
                placeholder="Search articles..."
                className="pl-10 bg-muted/50 border-apearmor-darkbronze focus:border-apearmor-teal"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
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
                      <span className="text-xs font-medium text-apearmor-teal px-2 py-1 rounded-full bg-muted">
                        {post.category}
                      </span>
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
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No articles found matching your search.</p>
                <Button 
                  variant="link" 
                  className="text-apearmor-teal mt-2"
                  onClick={() => setSearchQuery("")}
                >
                  Clear search
                </Button>
              </div>
            )}
          </div>
          
          <div className="flex justify-center">
            <Button className="bg-apearmor-teal hover:bg-apearmor-teal/80 text-black">
              Load More Articles
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ApeWire;
