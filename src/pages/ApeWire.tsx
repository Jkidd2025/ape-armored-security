
import React, { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { ChevronRight, Search, Clock, ArrowRight, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

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

const categories = ["All", "Crypto News", "Education", "Insights", "Markets", "Security", "DeFi", "NFTs", "Smart Contracts"];

// Adding more blog posts with the new categories
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
  },
  {
    id: "5",
    title: "Latest Market Trends in Cryptocurrency",
    excerpt: "Analysis of the latest market trends and what they mean for your investment strategy.",
    date: "April 12, 2025",
    category: "Markets",
    imageUrl: "https://images.unsplash.com/photo-1642790551116-18e150f248e5?q=80&w=2232&auto=format&fit=crop",
    readTime: "5 min",
    slug: "market-trends-crypto"
  },
  {
    id: "6",
    title: "Blockchain Basics: Understanding the Technology",
    excerpt: "A beginner's guide to understanding blockchain technology and its applications.",
    date: "April 8, 2025",
    category: "Education",
    imageUrl: "https://images.unsplash.com/photo-1639762681057-408b52a4c1e2?q=80&w=2232&auto=format&fit=crop",
    readTime: "10 min",
    slug: "blockchain-basics"
  },
  {
    id: "7",
    title: "Top Crypto News of the Week",
    excerpt: "Roundup of the most important cryptocurrency news and events from the past week.",
    date: "April 7, 2025",
    category: "Crypto News",
    imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=2232&auto=format&fit=crop",
    readTime: "4 min",
    slug: "crypto-news-weekly"
  },
  {
    id: "8",
    title: "Future of Finance: DeFi and Traditional Banking",
    excerpt: "Exploring how decentralized finance is disrupting traditional banking systems.",
    date: "March 30, 2025",
    category: "Insights",
    imageUrl: "https://images.unsplash.com/photo-1642790551116-18e150f248e5?q=80&w=2232&auto=format&fit=crop",
    readTime: "9 min",
    slug: "defi-vs-banking"
  }
];

const ApeWire = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPosts);
  
  // Filter posts based on search query and selected category
  useEffect(() => {
    const filtered = blogPosts.filter(post => {
      const matchesSearch = searchQuery.trim() === "" || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredPosts(filtered);
  }, [searchQuery, selectedCategory]);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <section className="container px-4 md:px-6 py-12">
          <div className="flex flex-col items-center text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gradient-gold mb-4">Ape Wire</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mb-8">
              Your trusted source for crypto news, education, and insights from the ApeArmor team
            </p>
            <Separator className="w-20 h-1 bg-apearmor-teal mb-8" />
            
            {/* Enhanced search with command palette styling */}
            <div className="w-full max-w-3xl mb-8">
              <div className="relative">
                <Command className="rounded-lg border-apearmor-darkbronze overflow-visible">
                  <div className="flex items-center border-b px-3">
                    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    <CommandInput 
                      placeholder="Search articles..." 
                      value={searchQuery}
                      onValueChange={setSearchQuery}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                      className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
                    />
                    {searchQuery && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleClearSearch}
                        className="h-6 w-6 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </Command>
              </div>
            </div>
            
            {/* Category filter */}
            <div className="w-full max-w-3xl flex flex-wrap justify-center gap-3 mb-10">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`px-3 py-1.5 cursor-pointer text-sm ${
                    selectedCategory === category 
                      ? "bg-apearmor-teal text-black" 
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </Badge>
              ))}
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
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No articles found matching your search or category filter.</p>
                <div className="flex gap-2 justify-center mt-4">
                  {searchQuery && (
                    <Button 
                      variant="outline" 
                      className="text-apearmor-teal border-apearmor-teal hover:bg-apearmor-teal/10"
                      onClick={handleClearSearch}
                    >
                      Clear search
                    </Button>
                  )}
                  {selectedCategory !== "All" && (
                    <Button 
                      variant="outline" 
                      className="text-apearmor-teal border-apearmor-teal hover:bg-apearmor-teal/10"
                      onClick={() => setSelectedCategory("All")}
                    >
                      Reset category
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {filteredPosts.length > 7 && (
            <div className="flex justify-center">
              <Button className="bg-apearmor-teal hover:bg-apearmor-teal/80 text-black">
                Load More Articles
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ApeWire;
