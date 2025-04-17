import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, Tag, ArrowLeft, Share2 } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

const getBlogPost = (slug: string) => {
  const foundPost = blogPosts.find(post => post.slug === slug);
  
  if (slug === "crypto-news-today-april-2025") {
    return {
      title: "Crypto Coin News Today: Market Shifts and Regulatory Updates",
      publishDate: "April 17, 2025",
      author: "ApeArmor Research Team",
      readTime: "3 min",
      category: "Crypto News",
      imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=2232&auto=format&fit=crop",
      content: `
        <p class="mb-4">The cryptocurrency market has experienced significant volatility in the past 24 hours, with major coins showing mixed performance. Bitcoin briefly surpassed the $75,000 mark before retracing to $72,400, while Ethereum has maintained steady growth at $4,800, approaching its all-time high.</p>
        
        <p class="mb-4">According to data from CoinMarketCap, global crypto market capitalization currently stands at $2.8 trillion, reflecting a 2.3% increase over yesterday. Trading volume has surged by 15%, indicating heightened market activity.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Regulatory Developments</h2>
        <p class="mb-4">The European Central Bank has announced plans to accelerate its digital euro project, with test implementations scheduled for Q3 2025. Meanwhile, in the United States, the SEC has approved three additional spot Ethereum ETFs, following the successful launch of Bitcoin ETFs earlier this year.</p>
        
        <p class="mb-4">As reported by Bloomberg, these regulatory developments are expected to bring more institutional capital into the cryptocurrency ecosystem, potentially stabilizing prices and reducing volatility over time.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Notable Project Updates</h2>
        <p class="mb-4">Layer-2 scaling solutions continue to gain traction, with Polygon announcing a major upgrade to its zkEVM technology. The update promises to reduce transaction costs by up to 40% while maintaining Ethereum-equivalent security guarantees.</p>
        
        <p class="mb-4">In DeFi news, decentralized exchange volumes have reached new highs, with Uniswap reporting over $15 billion in weekly trading volume. This surge coincides with the launch of several innovative financial products catering to institutional investors entering the space.</p>
        
        <p class="mb-4">The ApeArmor team continues to monitor these developments closely, providing our users with the security tools and insights needed to navigate the ever-evolving cryptocurrency landscape safely.</p>
      `,
      relatedPosts: [
        {
          id: "7",
          title: "Top Crypto News of the Week",
          slug: "crypto-news-weekly"
        },
        {
          id: "5",
          title: "Latest Market Trends in Cryptocurrency",
          slug: "market-trends-crypto"
        }
      ]
    };
  }
  
  if (slug === "understanding-rug-pulls" || !foundPost) {
    return {
      title: "Understanding Rug Pulls: How to Identify and Avoid Them",
      publishDate: "April 10, 2025",
      author: "ApeArmor Security Team",
      readTime: "5 min",
      category: "Security",
      imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2232&auto=format&fit=crop",
      content: `
        <p class="mb-4">The crypto space is filled with opportunities, but also with risks. One of the most notorious risks is the "rug pull" - a type of scam where developers abandon a project and run away with investors' funds.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">What is a Rug Pull?</h2>
        <p class="mb-4">A rug pull occurs when crypto developers create what appears to be a legitimate cryptocurrency project, build community interest and investment, then disappear with the investors' money, leaving them with worthless tokens.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Common Signs of a Potential Rug Pull</h2>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Anonymous team with no verifiable backgrounds</li>
          <li>Unrealistic promises of returns</li>
          <li>Lack of clear roadmap or whitepaper</li>
          <li>No code audits from reputable security firms</li>
          <li>Limited or locked liquidity</li>
          <li>Aggressive marketing tactics with little substance</li>
        </ul>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">How ApeArmor Protects You</h2>
        <p class="mb-4">ApeArmor's protection services are designed to identify these warning signs before you invest. Our team conducts thorough analyses of project fundamentals, team credibility, code security, and tokenomics to provide you with comprehensive protection against potential rug pulls.</p>
        
        <p class="mb-4">By subscribing to ApeArmor, you get access to:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Real-time alerts about suspicious projects</li>
          <li>Detailed security reports for projects you're interested in</li>
          <li>Claims process if you're affected despite our protection</li>
          <li>Educational resources to help you spot scams yourself</li>
        </ul>
        
        <p class="mb-4">Remember, the best defense against rug pulls is education and vigilance. Stay informed, do your research, and consider ApeArmor as your extra layer of security in the unpredictable world of cryptocurrency.</p>
      `,
      relatedPosts: [
        {
          id: "2",
          title: "The Evolution of DeFi Security in 2025",
          slug: "defi-security-evolution"
        },
        {
          id: "3",
          title: "Smart Contract Audits: Why They Matter for Every Project",
          slug: "smart-contract-audits"
        }
      ]
    };
  }
  
  return {
    title: foundPost?.title || "Blog Post",
    publishDate: foundPost?.date || "April 2025",
    author: "ApeArmor Team",
    readTime: foundPost?.readTime || "5 min",
    category: foundPost?.category || "Crypto News",
    imageUrl: foundPost?.imageUrl || "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2232&auto=format&fit=crop",
    content: `<p class="mb-4">This is a placeholder for the full content of "${foundPost?.title}". In a production environment, this would be fetched from a CMS or database.</p>`,
    relatedPosts: [
      {
        id: "1",
        title: "Understanding Rug Pulls: How to Identify and Avoid Them",
        slug: "understanding-rug-pulls"
      },
      {
        id: "2",
        title: "The Evolution of DeFi Security in 2025",
        slug: "defi-security-evolution"
      }
    ]
  };
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPost(slug || "");

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <article className="container px-4 md:px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <Link to="/ape-wire" className="inline-flex items-center text-apearmor-teal hover:text-apearmor-teal/80 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Ape Wire
            </Link>
            
            <div className="mb-8 max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
              
              <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-4 mb-6">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{post.publishDate}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{post.readTime} read</span>
                </div>
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-2" />
                  <span>{post.category}</span>
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
                  <span className="font-medium">{post.author}</span>
                </div>
                
                <Button variant="outline" size="sm" className="border-apearmor-darkbronze">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
            
            <div className="aspect-video w-full overflow-hidden rounded-lg mb-10">
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div 
              className="prose prose-invert max-w-none prose-headings:text-foreground prose-headings:font-bold prose-p:text-foreground/90 prose-strong:text-foreground prose-strong:font-semibold"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            <Separator className="my-12" />
            
            <div className="mb-16">
              <h3 className="text-xl font-bold mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {post.relatedPosts.map((relatedPost) => (
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
                ))}
              </div>
            </div>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
