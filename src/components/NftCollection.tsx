
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, ShoppingCart } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const NftCollection = () => {
  const isMobile = useIsMobile();
  
  const nfts = [
    {
      id: 1,
      title: "ApeArmor Chimp",
      description: "First generation of ApeArmor NFTs with unique benefits for holders.",
      image: "/lovable-uploads/02e9a6cd-8406-489d-b332-525d61411216.png",
      rarity: "Rare",
      benefits: ["DAO Access", "Project Review", "Limited Governance Rights", "Only 1,000,000 NFTs Minted"],
      buyLink: "https://magiceden.us/item-details/YPTHLRGpN7CDc4cP2oYmhsKyvZniun2fgVR9edrekHr",
      viewLink: "https://solscan.io/token/YPTHLRGpN7CDc4cP2oYmhsKyvZniun2fgVR9edrekHr"
    },
    {
      id: 2,
      title: "Guardian Gorilla",
      description: "Exclusive protector NFTs that provide enhanced access and benefits for holders.",
      image: "/lovable-uploads/8ce640c7-2f1c-49be-b8bf-61cf35b3271f.png",
      rarity: "Epic",
      benefits: ["DAO Access", "Proposal Submission", "Project Reviews", "Voting w/ Governance Rights", "Only 10,000 NFTs Minted"],
      buyLink: "https://magiceden.us/item-details/HdQ4oBVfmdq14aknv6WeNkirkd9VereH3Rvex3HHb68v",
      viewLink: "https://solscan.io/token/HdQ4oBVfmdq14aknv6WeNkirkd9VereH3Rvex3HHb68v"
    },
    {
      id: 3,
      title: "Sentinel Silverback",
      description: "Legendary tier NFTs that offer the highest level of exclusive perks.",
      image: "/lovable-uploads/2dc0d6ac-52f6-4006-8b18-6e85d298776a.png",
      rarity: "Legendary",
      benefits: ["DAO Access", "Access to All Treasury Projects", "Full Voting Power", "Project Reviews", "Proposal Submission", "Ape Armor Council Seat", "Full Governance Rights", "Only 1,001 NFTs Minted"],
      buyLink: "https://magiceden.us/item-details/AC2JQW9qYTao3wAHxPfrs2cKMpiLq3T7L997Tnqq3cTZ",
      viewLink: "https://solscan.io/token/AC2JQW9qYTao3wAHxPfrs2cKMpiLq3T7L997Tnqq3cTZ"
    }
  ];

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
                  src={nft.image} 
                  alt={nft.title} 
                  className="w-full h-full object-contain p-2 transition-transform duration-300 hover:scale-105"
                />
                <Badge className="absolute top-3 right-3 bg-apearmor-teal text-black">
                  {nft.rarity}
                </Badge>
              </div>
              <CardHeader className={isMobile ? "p-3" : "p-4"}>
                <CardTitle className={isMobile ? "text-lg" : "text-xl"}>{nft.title}</CardTitle>
                <CardDescription className={isMobile ? "text-sm" : ""}>{nft.description}</CardDescription>
              </CardHeader>
              <CardContent className={`flex-grow ${isMobile ? "p-3 pt-0" : "p-4 pt-0"}`}>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Benefits:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {nft.benefits.map((benefit, index) => (
                      <li key={index} className={isMobile ? "text-xs overflow-hidden text-ellipsis" : ""}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className={`flex justify-between ${isMobile ? "p-3" : "p-4"}`}>
                <Button 
                  variant="outline" 
                  size={isMobile ? "sm" : "default"} 
                  className="flex gap-1 items-center"
                  onClick={() => window.open(nft.viewLink, '_blank')}
                >
                  <Eye size={isMobile ? 14 : 16} />
                  <span>{isMobile ? "View" : "View Details"}</span>
                </Button>
                <Button 
                  size={isMobile ? "sm" : "default"} 
                  className="bg-apearmor-teal hover:bg-apearmor-teal/80 text-black flex gap-1 items-center"
                  onClick={() => window.open(nft.buyLink, '_blank')}
                >
                  <ShoppingCart size={isMobile ? 14 : 16} />
                  <span>Buy Now</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NftCollection;
