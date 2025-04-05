
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Eye, AlertCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Define NFT type based on our database structure
interface NFT {
  id: string;
  name: string;
  mint_address: string;
  tier: string;
  price: number;
  total_supply: number;
  remaining_supply: number;
  image_url: string;
  created_at: string;
  benefits?: string[]; // Keep existing benefits field for compatibility
}

const NftCollection = () => {
  const isMobile = useIsMobile();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch NFTs from Supabase
  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('nfts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        // If we have data from Supabase, use it
        if (data && data.length > 0) {
          // Map benefits from database if needed
          setNfts(data.map(nft => ({
            ...nft,
            benefits: mapBenefitsByTier(nft.tier)
          })));
        } else {
          // Fallback to hardcoded data for development
          setNfts([
            {
              id: "1",
              name: "ApeArmor Chimp",
              description: "First generation of ApeArmor NFTs with unique benefits for holders.",
              image_url: "/lovable-uploads/02e9a6cd-8406-489d-b332-525d61411216.png",
              tier: "Rare",
              mint_address: "chimp123",
              price: 0.5,
              total_supply: 1000000,
              remaining_supply: 900000,
              created_at: new Date().toISOString(),
              benefits: ["DAO Access", "Project Review", "Limited Governance Rights", "Only 1,000,000 NFTs Minted"]
            },
            {
              id: "2",
              name: "Guardian Gorilla",
              description: "Exclusive protector NFTs that provide enhanced access and benefits for holders.",
              image_url: "/lovable-uploads/8ce640c7-2f1c-49be-b8bf-61cf35b3271f.png",
              tier: "Epic",
              mint_address: "gorilla123",
              price: 1.5,
              total_supply: 10000,
              remaining_supply: 8000,
              created_at: new Date().toISOString(),
              benefits: ["DAO Access", "Proposal Submission", "Project Reviews", "Voting w/ Governance Rights", "Only 10,000 NFTs Minted"]
            },
            {
              id: "3",
              name: "Sentinel Silverback",
              description: "Legendary tier NFTs that offer the highest level of exclusive perks.",
              image_url: "/lovable-uploads/2dc0d6ac-52f6-4006-8b18-6e85d298776a.png",
              tier: "Legendary",
              mint_address: "silverback123",
              price: 5,
              total_supply: 1001,
              remaining_supply: 500,
              created_at: new Date().toISOString(),
              benefits: ["DAO Access", "Access to All Treasury Projects", "Full Voting Power", "Project Reviews", "Proposal Submission", "Ape Armor Council Seat", "Full Governance Rights", "Only 1,001 NFTs Minted"]
            }
          ]);
        }
      } catch (err) {
        console.error('Error fetching NFTs:', err);
        setError('Failed to load NFTs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  // Map benefits based on tier if not provided from database
  const mapBenefitsByTier = (tier: string): string[] => {
    switch (tier.toLowerCase()) {
      case 'rare':
        return ["DAO Access", "Project Review", "Limited Governance Rights", "Only 1,000,000 NFTs Minted"];
      case 'epic':
        return ["DAO Access", "Proposal Submission", "Project Reviews", "Voting w/ Governance Rights", "Only 10,000 NFTs Minted"];
      case 'legendary':
        return ["DAO Access", "Access to All Treasury Projects", "Full Voting Power", "Project Reviews", "Proposal Submission", "Ape Armor Council Seat", "Full Governance Rights", "Only 1,001 NFTs Minted"];
      default:
        return ["DAO Access"];
    }
  };

  // Handle NFT purchase attempt
  const handleMintNFT = async (nft: NFT) => {
    try {
      // For now, just show a toast message
      toast.info("Wallet connection required", {
        description: "Connect your wallet to mint this NFT.",
        action: {
          label: "Connect",
          onClick: () => {
            // This would trigger wallet connection
            console.log("Wallet connection requested");
          }
        }
      });
    } catch (err) {
      console.error('Error minting NFT:', err);
      toast.error("Failed to mint NFT", {
        description: "Please try again later."
      });
    }
  };

  // Show loading state
  if (loading) {
    return (
      <section id="nft-collection" className="py-20 bg-gradient-to-b from-muted to-background">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-gold">Exclusive NFT Collection</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Loading ApeArmor's exclusive NFT collection...
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border border-apearmor-darkbronze overflow-hidden flex flex-col">
                <div className="relative w-full h-48 md:h-64">
                  <Skeleton className="w-full h-full" />
                </div>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
                <CardFooter className="flex justify-between mt-auto">
                  <Skeleton className="h-10 w-28" />
                  <Skeleton className="h-10 w-28" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section id="nft-collection" className="py-20 bg-gradient-to-b from-muted to-background">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-gold">Exclusive NFT Collection</h2>
            <div className="flex flex-col items-center justify-center p-8 bg-muted/50 rounded-lg">
              <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
              <p className="text-lg font-medium">{error}</p>
              <Button 
                onClick={() => window.location.reload()} 
                className="mt-4 bg-apearmor-teal hover:bg-apearmor-teal/80 text-black"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="nft-collection" className="py-20 bg-gradient-to-b from-muted to-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-gold">Exclusive NFT Collection</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Own a piece of ApeArmor's security ecosystem with our exclusive NFT collection. Each NFT provides unique benefits and access to premium features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {nfts.map((nft) => (
            <Card key={nft.id} className="border border-apearmor-darkbronze hover:border-apearmor-teal transition-all duration-300 overflow-hidden flex flex-col">
              <div className="relative overflow-hidden w-full h-48 md:h-64">
                <img 
                  src={nft.image_url} 
                  alt={nft.name} 
                  className="w-full h-full object-contain p-2 transition-transform duration-300 hover:scale-105"
                />
                <Badge className="absolute top-3 right-3 bg-apearmor-teal text-black">
                  {nft.tier}
                </Badge>
              </div>
              <CardHeader className={isMobile ? "p-3" : "p-4"}>
                <CardTitle className={isMobile ? "text-lg" : "text-xl"}>{nft.name}</CardTitle>
                <CardDescription className={isMobile ? "text-sm" : ""}>
                  {nft.description || `Tier ${nft.tier} NFT with exclusive ApeArmor benefits.`}
                </CardDescription>
              </CardHeader>
              <CardContent className={`flex-grow ${isMobile ? "p-3 pt-0" : "p-4 pt-0"}`}>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Benefits:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {nft.benefits?.map((benefit, index) => (
                      <li key={index} className={isMobile ? "text-xs overflow-hidden text-ellipsis" : ""}>{benefit}</li>
                    ))}
                  </ul>
                  <p className="text-sm font-semibold mt-2">
                    Available: {nft.remaining_supply} / {nft.total_supply}
                  </p>
                  <p className="text-sm font-bold text-apearmor-teal">
                    Price: {nft.price} SOL
                  </p>
                </div>
              </CardContent>
              <CardFooter className={`flex justify-between mt-auto ${isMobile ? "p-3" : "p-4"}`}>
                <Button variant="outline" size={isMobile ? "sm" : "default"} className="flex gap-1 items-center">
                  <Eye size={isMobile ? 14 : 16} />
                  <span>{isMobile ? "View" : "View Details"}</span>
                </Button>
                <Button 
                  size={isMobile ? "sm" : "default"} 
                  className="bg-apearmor-teal hover:bg-apearmor-teal/80 text-black flex gap-1 items-center"
                  onClick={() => handleMintNFT(nft)}
                  disabled={nft.remaining_supply <= 0}
                >
                  <ShoppingCart size={isMobile ? 14 : 16} />
                  <span>{nft.remaining_supply <= 0 ? "Sold Out" : "Mint Now"}</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8 md:mt-12 text-center">
          <Button className="bg-apearmor-teal hover:bg-apearmor-teal/80 text-black">
            View Complete Collection
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NftCollection;
